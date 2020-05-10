export type ValueOrFunc<T> = T | (() => T)

export function getValue<T>(valueOrFunc: ValueOrFunc<T>): T {
  if (typeof valueOrFunc === 'function') {
    return (valueOrFunc as any)() as T
  }
  return valueOrFunc as T
}
