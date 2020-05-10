export type FuncValue<T> = T | (() => T);
export type FuncPromise<T> = FuncValue<T> | FuncValue<Promise<T>>;

export function getValue<T>(funcValue: FuncValue<T>): T {
  if (typeof funcValue === 'function') {
    return (funcValue as any)() as T;
  }
  return funcValue as T;
}

export function getValueOrDefault<T>(
  funcValue?: FuncValue<T> | null
): T | null | undefined {
  if (funcValue === undefined) return undefined;
  if (funcValue === null) return null;
  return getValue(funcValue);
}

export async function getValueAsync<T>(
  funcPromise: FuncPromise<T>
): Promise<T> {
  const response =
    typeof funcPromise === 'function'
      ? ((await (funcPromise as any)()) as T | Promise<T>)
      : funcPromise;

  return await response;
}

export async function getValueAsyncOrDefault<T>(
  funcPromise?: FuncPromise<T> | null
): Promise<T | null | undefined> {
  if (funcPromise === undefined) return undefined;
  if (funcPromise === null) return null;
  return await getValueAsync(funcPromise);
}
