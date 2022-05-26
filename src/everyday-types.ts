import * as String from './string'
export { String }
export type Class<T> = new(...args: any[]) => T
export type Ctor = new(...args: any[]) => unknown
export interface EventHandler<T, E> {
  (this: T, event: E & { currentTarget: T }): any
}
export type EventKeys<T> = keyof EventsOf<T>
export type Fn<T extends unknown[], R> = (...args: T) => R
export type Get<T, K> = T[NarrowKey<K, T>]
export type Key = number | string | symbol
export type Keys<T> = keyof { [K in keyof T]: StringOf<K> }
export type Mixable<T extends Ctor> = { new(...args: any[]): InstanceType<T> } & Omit<T, 'constructor'>
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
