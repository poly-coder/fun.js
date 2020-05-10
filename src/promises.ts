export function delay(ms: number): Promise<void> {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export const tryPromise = <T>(action: () => T | Promise<T>): Promise<T> => {
  return new Promise<T>(async (r, x) => {
    try {
      r(await action());
    } catch (error) {
      x(error);
    }
  });
};

export async function getAllPages<TItem, TContinuationToken>(
  fetchPage: (
    continuationToken: TContinuationToken | undefined
  ) => Promise<[TItem[], TContinuationToken | undefined]>
): Promise<TItem[]> {
  let continuationToken: TContinuationToken | undefined = undefined;
  const items: TItem[] = [];

  do {
    const [page, nextToken]: [
      TItem[],
      TContinuationToken | undefined
    ] = await fetchPage(continuationToken);

    items.push(...page);

    if (!nextToken) {
      break;
    }

    continuationToken = nextToken;
  } while (continuationToken);

  return items;
}
