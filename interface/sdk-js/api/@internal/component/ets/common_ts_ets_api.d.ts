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

/**
 * AppStorage singleton is sub-class of see LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 * @since 7
 */
declare class AppStorage {
  /**
   * Called when a link is set.
   * @since 7
   */
  static Link(propName: string): any;

  /**
   * Like see Link(), but will create and initialize a new source property in AppStorage if missing
   *
   * Same as see LocalStorage.setAndLink()
   *
   * @param { string } propName name of source property in AppStorage
   * @param { T } defaultValue value to be used for initializing if new creating new property in AppStorage
   *        default value must be of type T, must not be 'undefined' or 'null'.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *
   * @since 7
   */
  static SetAndLink<T>(propName: string, defaultValue: T): SubscribedAbstractProperty<T>;

  /**
   * Called when a property is set.
   * @since 7
   */
  static Prop(propName: string): any;

  /**
   * Like see prop(), will create and initialize a new source property in AppStorage if missing
   *
   * Same as see LocalStorage.setAndProp()
   *
   * @param { string } propName name of source property in AppStorage
   * @param { S } defaultValue value to be used for initializing if new creating new property in AppStorage.
   *        default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           return undefined if named property does not already exist in AppStorage.
   *
   * @since 7
   */
  static SetAndProp<S>(propName: string, defaultValue: S): SubscribedAbstractProperty<S>;

  /**
   * Checks if AppStorage has a property with given name
   * returns true if property with given name exists
   * same as ES6 Map.prototype.has()
   *
   * Same as see LocalStorage.has()
   *
   * @param { string } propName searched property
   * @returns { boolean } true if property with such name exists in AppStorage
   *
   * @since 7
   */
  static Has(propName: string): boolean;

  /**
   * Same as see LocalStorage.get()
   *
   * Obtain the value of property with given name, returns undefined if the property does not exist in AppStorage.
   *
   * @param { string } propName
   * @returns { T | undefined } property value of type T if found or undefined
   *
   * @since 7
   */
  static Get<T>(propName: string): T | undefined;

  /**
   * Set value of given property in AppStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null`.
   *
   * Same as see LocalStorage.set
   *
   * @param { string } propName
   * @param { T } newValue must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   *
   * @since 7
   */
  static Set<T>(propName: string, newValue: T): boolean;

  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name in AppStorage,. yet, and initialize with given value.
   * Do nothing and return false if newValue is undefined or null
   *
   * see LocalStorage.setOrCreate()
   *
   * @param { string } propName
   * @param { T } newValue must be of type T and must not be undefined or null
   *
   * @since 7
   */
  static SetOrCreate<T>(propName: string, newValue: T): void;

  /**
   * Delete property with given name from AppStorage
   * Use with caution:
   * Before deleting a prop from AppStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property name.
   *
   * Developer advise:
   * Subscribers to a property in AppStorage are created with see link(), see prop()
   * and also via @StorageLink and @StorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can not
   * (and also should not!) be deleted from AppStorage.
   *
   * Same as see LocalStorage.delete()
   *
   * @param { string } propName
   * @returns { boolean } false if method failed
   *
   * @since 7
  */
  static Delete(propName: string): boolean;

  /**
   * Provide names of all properties in AppStorage
   * same as ES6 Map.prototype.keys()
   *
   * Same as see LocalStorage.keys()
   *
   * @returns { IterableIterator<string> } return a Map Iterator
   *
   * @since 7
   */
  static Keys(): IterableIterator<string>;

  /**
   * Called when a cleanup occurs.
   * @since 7
   * @deprecated since 9
   * @useinstead AppStorage.Clear
   */
  static staticClear(): boolean;

  /**
   * Delete all properties from the AppStorage.
   *
   * Precondition is that there are no subscribers, see Delete().
   * @returns { boolean } false and deletes no properties if there is any property
   * that still has subscribers.
   *
   * @since 9
   */
  static Clear(): boolean;

  /**
   * Called when the data can be changed.
   * @since 7
   */
  static IsMutable(propName: string): boolean;

  /**
   * Method returns the number of properties currently in AppStorage
   *
   * @returns { number } Returns the number of properties currently in AppStorage
   * @since 7
   */
  static Size(): number;
}

/**
 * Defines the subscribed abstract property.
 * @since 7
 * @systemapi
 */
/**
 *   SubscribedAbstractProperty<T> is the return value of
 *   - AppStorage static functions Link(), Prop(), SetAndLink(), and SetAndProp()
 *   - LocalStorage member methods link(), prop(), setAndLink(), and setAndProp()
 *   'T' can be boolean, string, number or custom class.
 *
 * Main functions
 *   see get() reads the linked AppStorage/LocalStorage property value,
 *   see set(newValue) write a new value to the synched AppStorage/LocalStorage property
 *   see aboutToBeDeleted() ends the sync relationship with the AppStorage/LocalStorage property
 *        The app must call this function before the SubscribedAbstractProperty<T> object
 *        goes out of scope.
 * @since 9
 */
declare abstract class SubscribedAbstractProperty<T> {
  /**
   * Setting Subscribers.
   * @since 7
   * @systemapi
   */
  protected subscribers_: Set<number>;

  /**
   * Private user ID.
   * @since 7
   * @systemapi
   */
  private id_;

  /**
   * Private user information.
   * @since 7
   * @systemapi
   */
  private info_?;

  /**
   * @since 7
   * @systemapi
   */
  constructor(
    /**
     * Subscriber IPropertySubscriber.
     * @since 7
     * @systemapi
     */
    subscribeMe?: IPropertySubscriber,
    /**
     * Subscriber info.
     * @since 7
     * @systemapi
     */
    info?: string,
  );

  /**
   * Called when the subscriber ID is entered.
   * @since 7
   * @systemapi
   */
  id(): number;

  /**
   * Called when a subscriber information description is entered.
   * @since 7
   * @systemapi
   */
  info(): string;

  /**
   * Reads value of the sync'ed AppStorage/LocalStorage property.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.get()` returns the value of "foo" property in AppStorage.
   * @returns { T } the value of the sync'ed AppStorage/LocalStorage property.
   *
   * @since 9
   */
  abstract get(): T;

  /**
   * Updates the value of value of the sync'ed AppStorage/LocalStorage property.
   * Sets new value, must be of type T, and must not be 'undefined' or 'null'.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.set("Hello")` will set the value of "foo" property in AppStorage.
   *
   * @param { T } newValue
   * @since 9
   */
  abstract set(newValue: T): void;

  /**
   * Called when a two-way synchronization is created.
   * @since 7
   * @systemapi
   */
  createTwoWaySync(subscribeMe?: IPropertySubscriber, info?: string): SyncedPropertyTwoWay<T>;

  /**
   * Called when a one-way synchronization is created.
   * @since 7
   * @systemapi
   */
  createOneWaySync(subscribeMe?: IPropertySubscriber, info?: string): SyncedPropertyOneWay<T>;

  /**
   * Called when the subscriber is unlinked.
   * @since 7
   * @systemapi
   */
  unlinkSuscriber(subscriberId: number): void;

  /**
   * Called when the notification has changed.
   * @since 7
   * @systemapi
   */
  protected notifyHasChanged(newValue: T): void;

  /**
   * Called when the notification property is read.
   * @since 7
   * @systemapi
   */
  protected notifyPropertyRead(): void;

  /**
   * Called when the number of users is queried.
   * @since 7
   * @systemapi
   */
  numberOfSubscrbers(): number;
}

/**
 * Provides an interface for attribute subscribers.
 * @since 7
 * @systemapi
 */
interface IPropertySubscriber {
  /**
   * Called when the ID of the property subscriber is queried.
   * @since 7
   * @systemapi
   */
  id(): number;

  /**
   * Provides a single attribute change user interface.
   * @since 7
   * @systemapi
   */
  aboutToBeDeleted(owningView?: IPropertySubscriber): void;
}

/**
 * Defines the state value.
 * @since 7
 * @systemapi
 */
declare class SyncedPropertyTwoWay<T> extends SubscribedAbstractProperty<T>
  implements ISinglePropertyChangeSubscriber<T> {
  /**
   * Sources of synchronization attributes bidirectionally.
   * @since 7
   * @systemapi
   */
  private source_;

  /**
   * constructor parameters.
   * @since 7
   * @systemapi
   */
  constructor(source: SubscribedAbstractProperty<T>, subscribeMe?: IPropertySubscriber, info?: string);

  /**
   * Called when processing information about to be deleted.
   * @since 7
   * @systemapi
   */
  aboutToBeDeleted(unsubscribeMe?: IPropertySubscriber): void;

  /**
   * Information Changed.
   * @since 7
   * @systemapi
   */
  hasChanged(newValue: T): void;

  /**
   * Called when data is obtained.
   * @since 7
   * @systemapi
   */
  get(): T;

  /**
   * Called when data is created.
   * @since 7
   * @systemapi
   */
  set(newValue: T): void;
}

/**
* Defines the prop state value.
* @since 7
* @systemapi
*/
declare class SyncedPropertyOneWay<T> extends SubscribedAbstractProperty<T>
  implements ISinglePropertyChangeSubscriber<T> {
  /**
   * Pack value for single-item binding.
   * @since 7
   * @systemapi
   */
  private wrappedValue_;

  /**
   * Sources of synchronization attributes bidirectionally.
   * @since 7
   * @systemapi
   */
  private source_;

  /**
   * Constructor parameters.
   * @since 7
   * @systemapi
   */
  constructor(source: SubscribedAbstractProperty<T>, subscribeMe?: IPropertySubscriber, info?: string);

  /**
   * Called when processing information about to be deleted.
   * @since 7
   * @systemapi
   */
  aboutToBeDeleted(unsubscribeMe?: IPropertySubscriber): void;

  /**
   * Information Changed.
   * @since 7
   * @systemapi
   */
  hasChanged(newValue: T): void;

  /**
   * Called when data is obtained.
   * @since 7
   * @systemapi
   */
  get(): T;

  /**
   * Called when data is created.
   * @since 7
   * @systemapi
   */
  set(newValue: T): void;
}

/**
 * Defines the subscriber.
 * @since 7
 * @systemapi
 */
interface ISinglePropertyChangeSubscriber<T> extends IPropertySubscriber {
  /**
   * Provides a single attribute change user interface.
   * @since 7
   * @systemapi
   */
  hasChanged(newValue: T): void;
}

/**
 * Defines the Subscribale base class.
 * @since 7
 * @systemapi
 */
declare abstract class SubscribaleAbstract {
  /**
   * Returns the ownership attribute set by the.
   * @since 7
   * @systemapi
   */
  private owningProperties_: Set<number>;

  /**
   * Constructor.
   * @since 7
   * @systemapi
   */
  constructor();

  /**
   * Called when the notification property has changed.
   * @since 7
   * @systemapi
   */
  protected notifyPropertyHasChanged(propName: string, newValue: any): void;

  /**
   * Called when adding an already owned property.
   * @since 7
   * @systemapi
   */
  public addOwningProperty(subscriber: IPropertySubscriber): void;

  /**
   * Called when an already owned property is deleted.
   * @since 7
   * @systemapi
   */
  public removeOwningProperty(property: IPropertySubscriber): void;

  /**
   * Called when an already owned property is deleted by ID
   * @since 7
   * @systemapi
   */
  public removeOwningPropertyById(subscriberId: number): void;
}

/**
 * Defines the Environment interface.
 * @since 7
 */
declare class Environment {
  /**
   * Constructor.
   * @since 7
   * @systemapi
   */
  constructor();

  /**
   * Called when a property value is checked.
   * @since 7
   */
  static EnvProp<S>(key: string, value: S): boolean;

  /**
   * Called when multiple property values are checked.
   * @since 7
   */
  static EnvProps(
    props: {
      key: string;
      defaultValue: any;
    }[],
  ): void;

  /**
   * Set the key value.
   * @since 7
   */
  static Keys(): Array<string>;
}

/**
 * Defines the PersistentStorage interface.
 * @since 7
 */
declare class PersistentStorage {
  /**
   * Constructor parameters.
   * @since 7
   * @systemapi
   */
  constructor(appStorage: AppStorage, storage: Storage);

  /**
   * Called when a persistence property is stored.
   * @since 7
   */
  static PersistProp<T>(key: string, defaultValue: T): void;

  /**
   * Called when a property is deleted.
   * @since 7
   */
  static DeleteProp(key: string): void;

  /**
   * Called when multiple persistence properties are stored.
   * @since 7
   */
  static PersistProps(
    properties: {
      key: string;
      defaultValue: any;
    }[],
  ): void;

  /**
   * Set the key value.
   * @since 7
   */
  static Keys(): Array<string>;
}

/**
 * Used for ide.
 * @since 7
 * @systemapi
 */
declare const appStorage: AppStorage;

/**
 *
 * LocalStorage
 *
 * Class implements a Map of ObservableObjectBase UI state variables.
 * Instances can be created to manage UI state within a limited "local"
 * access, and life cycle as defined by the app.
 * AppStorage singleton is sub-class of LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 *
 * @form
 * @since 9
 */
declare class LocalStorage {
  /**
   * Construct new instance of LocalStorage
   * initialize with all properties and their values that Object.keys(params) returns
   * Property values must not be undefined.
   * @param initializingProperties Object containing keys and values. see set() for valid values
   *
   * @form
   * @since 9
   */
  constructor(initializingProperties?: Object);

  /**
   * Get current LocalStorage shared from stage.
   * @StageModelOnly
   * @form
   * @since 9
   */
  static GetShared(): LocalStorage;

  /**
   * Check if LocalStorage has a property with given name
   * return true if property with given name exists
   * same as ES6 Map.prototype.has()
   * @param propName searched property
   * @returns true if property with such name exists in LocalStorage
   *
   * @form
   * @since 9
   */
  has(propName: string): boolean;

  /**
   * Provide names of all properties in LocalStorage
   * same as ES6 Map.prototype.keys()
   * @returns return a Map Iterator
   *
   * @form
   * @since 9
   */
  keys(): IterableIterator<string>;

  /**
   * Returns number of properties in LocalStorage
   * same as Map.prototype.size()
   * @returns return number of properties
   *
   * @form
   * @since 9
   */
  size(): number;

  /**
   * Returns value of given property
   * return undefined if no property with this name
   * @param propName
   * @returns property value if found or undefined
   *
   * @form
   * @since 9
   */
  get<T>(propName: string): T | undefined;

  /**
   * Set value of given property in LocalStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null` (`undefined`, `null` value are not allowed for state variables).
   * @param propName
   * @param newValue must be of type T and must not be undefined or null
   * @returns true on success, i.e. when above conditions are satisfied, otherwise false
   *
   * @form
   * @since 9
   */
  set<T>(propName: string, newValue: T): boolean;

  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name and initialize with given value.
   * Do nothing and return false if newValue is undefined or null
   * (undefined, null value is not allowed for state variables)
   * @param propName
   * @param newValue must be of type T and must not be undefined or null
   * @returns true on success, i.e. when above conditions are satisfied, otherwise false
   *
   * @form
   * @since 9
   */
  setOrCreate<T>(propName: string, newValue: T): boolean;

  /**
   * Create and return a two-way sync "(link") to named property
   * @param propName name of source property in LocalStorage
   * @returns  instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedPropertyAbstract<T>
   *
   * @form
   * @since 9
   */
  link<T>(propName: string): SubscribedAbstractProperty<T>;

  /**
   * Like see link(), but will create and initialize a new source property in LocalStorage if missing
   * @param propName name of source property in LocalStorage
   * @param defaultValue value to be used for initializing if new creating new property in LocalStorage
   *        default value must be of type T, must not be undefined or null.
   * @returns  instance of  SubscribedAbstractProperty<T>
   *          Apps can use SDK functions of base class SubscribedAbstractProperty<T>
   *
   * @form
   * @since 9
   */
  setAndLink<T>(propName: string, defaultValue: T): SubscribedAbstractProperty<T>;

  /**
   * Create and return a one-way sync ('prop') to named property
   * @param { string } propName name of source property in LocalStorage
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   *
   * @form
   * @since 9
   */
  prop<S>(propName: string): SubscribedAbstractProperty<S>;

  /**
   * Like see prop(), will create and initialize a new source property in LocalStorage if missing
   * @param { string } propName name of source property in LocalStorage
   * @param { S } defaultValue value to be used for initializing if new creating new property in LocalStorage. 
   *         Default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   *
   * @form
   * @since 9
   */
  setAndProp<S>(propName: string, defaultValue: S): SubscribedAbstractProperty<S>;

  /**
   * Delete property from StorageBase
   * Use with caution:
   * Before deleting a prop from LocalStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property.
   *
   * Developer advise:
   * Subscribers are created with see link(), see prop()
   * and also via @LocalStorageLink and @LocalStorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can nit
   * (and also should not!) be deleted from LocalStorage.
   *
   * @param propName
   * @returns false if method failed
   *
   * @form
   * @since 9
  */
  delete(propName: string): boolean;

  /**
   * Delete all properties from the LocalStorage instance
   * Precondition is that there are no subscribers.
   * method returns false and deletes no properties if there is any property
   * that still has subscribers
   *
   * @form
   * @since 9
   */
  clear(): boolean;
}

declare module "StateManagement" {
  module "StateManagement" {
    // @ts-ignore
    export { LocalStorage };
  }
}
