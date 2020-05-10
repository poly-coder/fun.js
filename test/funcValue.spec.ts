import { getValue, getValueOrDefault, getValueAsync, getValueAsyncOrDefault } from "../src/funcValue";

describe('funcValue.ts', () => {
  describe('getValue', () => {
    it('should be a function', () => expect(typeof getValue).toBe('function'))

    describe('when a non-function value is provided', () => {
      const testValue = 'test value'
      it('should return the same value', () =>
      expect(getValue(testValue)).toBe(testValue)
      )
    })
    
    describe('when a function value is provided', () => {
      const testValue = 'test value'
      const testFunc = () => testValue
      it('should return the same value', () =>
        expect(getValue(testFunc)).toBe(testValue)
      )
    })
  })

  describe('getValueOrDefault', () => {
    it('should be a function', () => expect(typeof getValueOrDefault).toBe('function'))

    describe('when undefined value is provided', () => {
      it('should return undefined', () =>
        expect(getValueOrDefault(undefined)).toBeUndefined()
      )
    })

    describe('when null value is provided', () => {
      it('should return null', () =>
        expect(getValueOrDefault(null)).toBe(null)
      )
    })

    describe('when a non-function value is provided', () => {
      const testValue = 'test value'
      it('should return the same value', () =>
      expect(getValueOrDefault(testValue)).toBe(testValue)
      )
    })
    
    describe('when a function value is provided', () => {
      const testValue = 'test value'
      const testFunc = () => testValue
      it('should return the resulting value', () =>
        expect(getValueOrDefault(testFunc)).toBe(testValue)
      )
    })
  })

  describe('getValueAsync', () => {
    it('should be a function', () => expect(typeof getValueAsync).toBe('function'))

    describe('when a non-function sync value is provided', () => {
      const testValue = 'test value'
      it('should return the same value', async () =>
        expect(await getValueAsync(testValue)).toBe(testValue)
      )
    })

    describe('when a non-function async value is provided', () => {
      const testValue = 'test value'
      it('should return the same value', async () =>
        expect(await getValueAsync(Promise.resolve(testValue))).toBe(testValue)
      )
    })
    
    describe('when a sync function value is provided', () => {
      const testValue = 'test value'
      const testFunc = () => testValue
      it('should return the same value', async () =>
        expect(await getValueAsync(testFunc)).toBe(testValue)
      )
    })
    
    describe('when a async function value is provided', () => {
      const testValue = 'test value'
      const testFunc = async () => testValue
      it('should return the same value', async () =>
        expect(await getValueAsync(testFunc)).toBe(testValue)
      )
    })
  })

  describe('getValueAsyncOrDefault', () => {
    it('should be a function', () => expect(typeof getValueAsyncOrDefault).toBe('function'))

    describe('when undefined value is provided', () => {
      it('should return undefined', async () =>
        expect(await getValueAsyncOrDefault(undefined)).toBeUndefined()
      )
    })

    describe('when null value is provided', () => {
      it('should return null', async () =>
        expect(await getValueAsyncOrDefault(null)).toBe(null)
      )
    })

    describe('when a non-function sync value is provided', () => {
      const testValue = 'test value'
      it('should return the same value', async () =>
        expect(await getValueAsyncOrDefault(testValue)).toBe(testValue)
      )
    })

    describe('when a non-function async value is provided', () => {
      const testValue = 'test value'
      it('should return the same value', async () =>
        expect(await getValueAsyncOrDefault(Promise.resolve(testValue))).toBe(testValue)
      )
    })
    
    describe('when a sync function value is provided', () => {
      const testValue = 'test value'
      const testFunc = () => testValue
      it('should return the resulting value', async () =>
        expect(await getValueAsyncOrDefault(testFunc)).toBe(testValue)
      )
    })
    
    describe('when a async function value is provided', () => {
      const testValue = 'test value'
      const testFunc = async () => testValue
      it('should return the resulting value', async () =>
        expect(await getValueAsyncOrDefault(testFunc)).toBe(testValue)
      )
    })
  })
})
