# PolyCoder Fun for Typescript/Javascript

## Functional

### FuncValue

A `FuncValue<T>` represents a value that could require to call a function 
to be obtained. Function `getValue` allows to get the actual value from a 
`FuncValue`, whether it is a direct value or a function that returns the 
value.

#### Examples:
```typescript
const value1: FuncValue<string> = "directValue"
const value2: FuncValue<string> = () => "deferredValue"

interface MyConfig {
  connectionString: FuncValue<string>;
  maxConnections: FuncValue<number>;
}
```

### getValue

Returns the actual value from a given `FuncValue`.

#### Examples:
```typescript
console.log(getValue('directValue'))
// Prints: 'directValue'

console.log(getValue(() => 'deferredValue'))
// Prints: 'deferredValue'
```

### getValueOrDefault

Returns the actual value from a given `FuncValue`, if given. In the case 
of `null` or `undefined` are given, the same falsy value is returned.

#### Examples:
```typescript
console.log(getValue(undefined))
// Prints: undefined

console.log(getValue(null))
// Prints: null

console.log(getValue('directValue'))
// Prints: 'directValue'

console.log(getValue(() => 'deferredValue'))
// Prints: 'deferredValue'
```


### FuncPromise

Works the same as `FuncValue<T>` but with the possibility to be a 
`Promise<T>` or a function that returns one. In fact it is defined as:

```typescript
type FuncPromise<T> = FuncValue<T> | FuncValue<Promise<T>>;
```

#### Examples:
```typescript
const value1: FuncPromise<string> = "directValue"
const value2: FuncPromise<string> = () => "deferredValue"
const value3: FuncPromise<string> = Promise.resolve("deferredValue")
const value4: FuncPromise<string> = async () => "deferredValue"
```

### getValueAsync

Returns a promise for the actual value from a given `FuncPromise`.

#### Examples:
```typescript
console.log(await getValue('directValue'))
// Prints: 'directValue'

console.log(await getValue(() => 'deferredValue'))
// Prints: 'deferredValue'

console.log(await getValue(Promise.resolve('directPromise')))
// Prints: 'directPromise'

console.log(await getValue(() => Promise.resolve('deferredPromise')))
// Prints: 'deferredPromise'
```

### getValueAsyncOrDefault

Returns the actual value from a given `FuncPromise`, if given. In the case 
of `null` or `undefined` are given, the same falsy value is returned.

#### Examples:
```typescript
console.log(getValue(undefined))
// Prints: undefined

console.log(getValue(null))
// Prints: null

console.log(getValue('directValue'))
// Prints: 'directValue'

console.log(getValue(() => 'deferredValue'))
// Prints: 'deferredValue'
```

## Promises

### delay

Returns a promise that resolves after given milliseconds

#### Examples
```typescript
await delay(500)
// awaits for 500 ms
```

### tryPromise

Wraps the execution of a function to capture any result or thrown error 
into a Promise.

#### Examples
```typescript
tryPromise(() => a / b))
  .then(response => ...)
  .catch(error => ...)
// When b is zero, the error is captured into the promise
```

### getAllPages

Given a function that is capable of retrieving a page of items and a 
continuation token, loops until the continuation token gets `undefined`, 
in which case all the pages get concatenated into the result.

#### Examples
```typescript
async function fetchPage(continuationToken) {
  const response = await fetch(`http://.../items?token=${continuationToken}`)
  const result = await response.json()
  return [result.items, result.nextToken || undefined]
}

const allItems = await getAllPages(fetchPage)
```
