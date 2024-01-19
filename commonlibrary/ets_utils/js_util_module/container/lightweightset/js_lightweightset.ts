/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
declare function requireNapi(s: string): any;
interface ArkPrivate {
  LightWeightSet: number;
  Load(key: number): Object;
}
let flag: boolean = false;
let fastLightWeightSet: Object = undefined;
let arkPritvate: ArkPrivate = globalThis['ArkPrivate'] || undefined;
if (arkPritvate !== undefined) {
  fastLightWeightSet = arkPritvate.Load(arkPritvate.LightWeightSet);
} else {
  flag = true;
}
if (flag || fastLightWeightSet === undefined) {
  const LightWeightAbility = requireNapi('util.struct');
  const ErrorUtil = LightWeightAbility.ErrorUtil;
  interface IterableIterator<T> {
    next: () => {
      value: T | undefined;
      done: boolean;
    };
  }
  class HandlerLightWeightSet<T> {
    set(target: LightWeightSet<T>, p: any, value: any): boolean {
      if (p in target) {
        target[p] = value;
        return true;
      }
      return false;
    }
    defineProperty(): boolean {
      throw new Error(`Can't define Property on LightWeightSet Object`);
    }
    deleteProperty(): boolean {
      throw new Error(`Can't delete Property on LightWeightSet Object`);
    }
    setPrototypeOf(): boolean {
      throw new Error(`Can't set Prototype on LightWeightSet Object`);
    }
  }
  class LightWeightSet<T> extends LightWeightAbility.LightWeightClass<T, T> {
    constructor() {
      ErrorUtil.checkNewTargetIsNullError("LightWeightSet", !new.target);
      super();
      return new Proxy(this, new HandlerLightWeightSet());
    }
    get length(): number {
      return this.memberNumber;
    }
    add(obj: T): boolean {
      ErrorUtil.checkBindError("add", LightWeightSet, this);
      if (this.members.keys.indexOf(obj) > 0) {
        return false;
      }
      this.addmember(obj);
      return true;
    }
    addAll(set: LightWeightSet<T>): boolean {
      ErrorUtil.checkBindError("addAll", LightWeightSet, this);
      ErrorUtil.checkTypeError("set", "LightWeightSet", set);
      if (!(set instanceof LightWeightSet)) {
        throw new TypeError('Incoming object is not JSAPILightWeightSet');
      }
      let change: boolean = false;
      if (set.memberNumber === 0) {
        change = false;
      } else {
        for (let i: number = 0; i < set.memberNumber; i++) {
          change = this.add(set.members.keys[i]) || change;
        }
      }
      return change;
    }
    hasAll(set: LightWeightSet<T>): boolean {
      ErrorUtil.checkBindError("hasAll", LightWeightSet, this);
      ErrorUtil.checkTypeError("set", "LightWeightSet", set);
      if (set.memberNumber > this.memberNumber) {
        return false;
      }
      if (LightWeightAbility.isIncludeToArray(this.members.keys, set.members.keys)) {
        return true;
      }
      return false;
    }
    has(key: T): boolean {
      ErrorUtil.checkBindError("has", LightWeightSet, this);
      return this.members.keys.indexOf(key) > -1;
    }
    equal(obj: Object): boolean {
      ErrorUtil.checkBindError("equal", LightWeightSet, this);
      if (this.memberNumber === 0) {
        return false;
      }
      if (obj instanceof LightWeightSet) {
        return JSON.stringify(obj.members.keys) === JSON.stringify(this.members.keys);
      }
      if (JSON.stringify(obj) === JSON.stringify(this.members.keys)) {
        return true;
      }
      return false;
    }
    increaseCapacityTo(minimumCapacity: number): void {
      ErrorUtil.checkBindError("increaseCapacityTo", LightWeightSet, this);
      ErrorUtil.checkTypeError("minimumCapacity", "Integer", minimumCapacity);
      ErrorUtil.checkRangeError("minimumCapacity", minimumCapacity, this.capacity,
                                undefined, "!=min");
      super.ensureCapacity(minimumCapacity);
    }
    getIndexOf(key: T): number {
      ErrorUtil.checkBindError("getIndexOf", LightWeightSet, this);
      return super.getIndexByKey(key);
    }
    isEmpty(): boolean {
      ErrorUtil.checkBindError("isEmpty", LightWeightSet, this);
      return this.memberNumber === 0;
    }
    remove(key: T): T {
      ErrorUtil.checkBindError("remove", LightWeightSet, this);
      return super.deletemember(key);
    }
    removeAt(index: number): boolean {
      ErrorUtil.checkBindError("removeAt", LightWeightSet, this);
      ErrorUtil.checkTypeError("index", "Integer", index);
      if (index > this.memberNumber--) {
        return false;
      }
      this.members.hashs.splice(index, 1);
      this.members.values.splice(index, 1);
      this.members.keys.splice(index, 1);
      this.memberNumber--;
      return true;
    }
    clear(): void {
      ErrorUtil.checkBindError("clear", LightWeightSet, this);
      if (this.memberNumber != 0 || this.capacity > 8) {
        this.members.hashs = [];
        this.members.keys = [];
        this.members.values = [];
        this.memberNumber = 0;
        this.capacity = 8;
      }
    }
    forEach(callbackfn: (value?: T, key?: T, set?: LightWeightSet<T>) => void,
      thisArg?: Object): void {
      ErrorUtil.checkBindError("forEach", LightWeightSet, this);
      ErrorUtil.checkTypeError("callbackfn", "callable", callbackfn);
      let data: LightWeightSet<T> = this;
      for (let i: number = 0; i < data.memberNumber; i++) {
        callbackfn.call(thisArg, data.members.keys[i], data.members.keys[i], data);
      }
    }
    [Symbol.iterator](): IterableIterator<T> {
      ErrorUtil.checkBindError("Symbol.iterator", LightWeightSet, this);
      let data: LightWeightSet<T> = this;
      let count: number = 0;
      return {
        next: function () {
          let done: boolean = false;
          let value: T = undefined;
          done = count >= data.memberNumber;
          value = done ? undefined : data.members.keys[count];
          count++;
          return {
            done: done,
            value: value,
          };
        },
      };
    }
    toString(): string {
      ErrorUtil.checkBindError("toString", LightWeightSet, this);
      return this.members.keys.join(',');
    }
    toArray(): Array<T> {
      ErrorUtil.checkBindError("toArray", LightWeightSet, this);
      return this.members.keys.slice();
    }
    getValueAt(index: number): T {
      ErrorUtil.checkBindError("getValueAt", LightWeightSet, this);
      ErrorUtil.checkTypeError("index", "Integer", index);
      return this.members.keys[index];
    }
    values(): IterableIterator<T> {
      ErrorUtil.checkBindError("values", LightWeightSet, this);
      return this.members.keys.values() as IterableIterator<T>;
    }
    entries(): IterableIterator<[T, T]> {
      ErrorUtil.checkBindError("entries", LightWeightSet, this);
      let data: LightWeightSet<T> = this;
      let count: number = 0;
      return {
        next: function () {
          let done: boolean = false;
          let value: [T, T] = undefined;
          let tempValue: T = undefined;
          done = count >= data.memberNumber;
          tempValue = data.members.keys[count];
          value = done ? undefined : ([tempValue, tempValue] as [T, T]);
          count++;
          return {
            done: done,
            value: value,
          };
        },
      };
    }
  }
  Object.freeze(LightWeightSet);
  fastLightWeightSet = LightWeightSet;
}
export default fastLightWeightSet;
