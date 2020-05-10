export type FuncValue<T> = T | (() => T)

export function getValue<T>(valueOrFunc: FuncValue<T>): T {
  if (typeof valueOrFunc === 'function') {
    return (valueOrFunc as any)() as T
  }
  return valueOrFunc as T
}
