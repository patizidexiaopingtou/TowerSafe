#define _GNU_SOURCE
#include <stdarg.h>
#include <unistd.h>
#include <sched.h>
#include <signal.h>
#include "pthread_impl.h"
#include "syscall.h"
#include "libc.h"

struct __clone_args {
	int (*func)(void *);
	void *arg;
};

static int __start_child(void *clone_args)
{
	int status;
	sigset_t set;
	int (*func)(void *) = ((struct __clone_args *)clone_args)->func;
	void *arg = ((struct __clone_args *)clone_args)->arg;
	free(clone_args);

	__block_all_sigs(&set);
	pthread_t self = __pthread_self();
	self->tid = __syscall(SYS_gettid);
	self->robust_list.off = 0;
	self->robust_list.pending = 0;
	self->next = self->prev = self;
	__thread_list_lock = 0;
	libc.threads_minus_1 = 0;
	__restore_sigs(&set);

	status = func(arg);
	exit(status);
}

int clone(int (*func)(void *), void *stack, int flags, void *arg, ...)
{
	int ret;
	va_list ap;
	pid_t *ptid, *ctid;
	void  *tls;
	int (*clone_func)(void *) = func;
	struct __clone_args *clone_args = (struct __clone_args *)arg;

	va_start(ap, arg);
	ptid = va_arg(ap, pid_t *);
	tls  = va_arg(ap, void *);
	ctid = va_arg(ap, pid_t *);
	va_end(ap);
	if (!(flags & (CLONE_VM | CLONE_VFORK)) && func) {
		clone_args = (struct __clone_args *)malloc(sizeof(struct __clone_args));
		if (clone_args == NULL) {
			errno = ENOMEM;
			return -1;
		}
		clone_args->func = clone_func;
		clone_args->arg = arg;
		clone_func = __start_child;
	}
	ret = __syscall_ret(__clone(clone_func, stack, flags, (void *)clone_args, ptid, tls, ctid));
	if (!(flags & (CLONE_VM | CLONE_VFORK)) && func) {
		free(clone_args);
	}
	return ret;
}
