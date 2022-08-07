import * as String from './string'
export { String }
export type Chunk<T, N extends number> = N extends N ? number extends N ? T[] : _Chunk<T, N, []> : never
export type _Chunk<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _Chunk<T, N, [T, ...R]>
export type Class<T> = new(...args: any[]) => T
export type Ctor = new(...args: any[]) => unknown
export interface EventHandler<T, E> {
  (this: T, event: E & { currentTarget: T; target: Element }): any
}
export type EventKeys<T> = keyof EventsOf<T>
export type Fn<T extends unknown[], R> = (...args: T) => R
export type Get<T, K> = T[NarrowKey<K, T>]
export type Key = number | string | symbol
export type Keys<T> = keyof { [K in keyof T]: StringOf<K> }
export type Mixable<T extends Ctor> = { new(...args: any[]): InstanceType<T> } & Omit<T, 'constructor'>
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }
export type NarrowKey<K, T> = Narrow<K, keyof T>
export type Narrow<K, T> = K extends T ? K : never
export type NonNull<T> = { [K in Keys<T> as T[K] extends Null ? never : K]: T[K] }
export type Null = null | undefined | void
// https://stackoverflow.com/a/67942573
export type ObjectFromList<T extends ReadonlyArray<Key>, V = Key> = {
  [K in (T extends ReadonlyArray<infer U> ? U : never)]: V
}
export type Prefix<S extends string, T> = `${S}${StringOf<T>}`
export type SansOn<T> = String.Split<StringOf<T>, ' on'>
export type StringKeys<T> = StringOf<keyof T>
export type StringLiteral<T> = T extends string ? string extends T ? never : T : never
export type StringOf<T> = Narrow<T, string>
export type Target = HTMLElement | SVGElement | Window | Document | ShadowRoot
export type ValuesOf<T> = T[keyof T]

export type EventsOf<T> = {
  [
    K in Keys<T> as NonNullable<T[K]> extends Fn<any, any>
      ? String.At<StringOf<K>, 0> extends StringLiteral<'o'>
        ? String.At<StringOf<K>, 1> extends StringLiteral<'n'> ? SansOn<` ${StringOf<K>}`>[1] : never
      : never
      : never
  ]-?: Narrow<
    Parameters<
      Narrow<
        Get<
          T,
          K
        >,
        Fn<any, any>
      >
    >[0],
    Event
  >
}

export type DetailOf<T, K> = Narrow<
  Parameters<Narrow<Get<T, K>, Fn<any, any>>>[0],
  CustomEvent
>['detail']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any

export interface SafeMap<K extends object, T> extends Map<K, T> {
  has(v: K): boolean
  get(v: K): T
}

export interface SafeWeakMap<K extends object, T> extends WeakMap<K, T> {
  has(v: K): boolean
  get(v: K): T
}

export type ValueConstructor = StringConstructor | NumberConstructor | BooleanConstructor

export type CustomElementConstructor = Class<CustomElement> & {
  /**
   * The attribute keys in this list are observed by the DOM
   * and invoke {@link attributeChangedCallback} when they change.
   * @private
   */
  observedAttributes?: string[]
}

export interface CustomElement extends HTMLElement {
  /**
   * Callback that is invoked when one of the {@link withProperties} changes.
   *
   * @param name Name of attribute
   * @param oldValue Old value
   * @param newValue New value
   */
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void

  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   *
   * ```ts
   * connectedCallback() {
   *   super.connectedCallback();
   *   this.addEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * Typically, anything done in `connectedCallback()` should be undone when the
   * element is disconnected, in `disconnectedCallback()`.
   */
  connectedCallback?(): void

  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * ```ts
   * disconnectedCallback() {
   *   super.disconnectedCallback();
   *   window.removeEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * An element may be re-connected after being disconnected.
   */
  disconnectedCallback?(): void
}
