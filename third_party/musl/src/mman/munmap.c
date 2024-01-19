#include <sys/mman.h>
#include "syscall.h"

static void dummy(void) { }
weak_alias(dummy, __vm_wait);

int __munmap(void *start, size_t len)
{
	__vm_wait();
	return syscall(SYS_munmap, start, len);
}

#ifdef HOOK_ENABLE
int __libc_munmap(void*, size_t);
weak_alias(__munmap, __libc_munmap);
#else
weak_alias(__munmap, munmap);
#endif