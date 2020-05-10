export type CompareFn<T> = (a: T, b: T) => number;
export type GetKeyFn<T, K> = (item: T) => K;

export function compareFnFromGetKey<T, K>(getKey: GetKeyFn<T, K>): CompareFn<T> {
    return (a, b) => {
        var aKey = getKey(a);
        var bKey = getKey(b);
        if (aKey < bKey) {
            return -1;
        }
        if (aKey > bKey) {
            return 1
        }
        return 0;
    }
}

export function invertCompareFn<T>(compareFn: CompareFn<T>): CompareFn<T> {
    return (a, b) => compareFn(b, a);
}

export function sortBy<T, K>(items: T[], getKey: GetKeyFn<T, K>): T[] {
    return items.sort(compareFnFromGetKey(getKey));
}

export function sortByDesc<T, K>(items: T[], getKey: GetKeyFn<T, K>): T[] {
    return items.sort(invertCompareFn(compareFnFromGetKey(getKey)));
}
