import { compareFnFromGetKey, invertCompareFn, sortBy, sortByDesc } from "../src/collections";

describe('collections.ts', () => {
  describe('compareFnFromGetKey', () => {
    it('should be a function', () => expect(typeof compareFnFromGetKey).toBe('function'))
  
    describe('Given a function to get the length of strings', () => {
      const getLength = (str: string) => str.length;
      const comparer = compareFnFromGetKey(getLength)

      it('comparing strings of the same length should return 0', () =>
        expect(comparer('hello', 'abcde')).toBe(0))

      it('comparing strings of the different length should return -1', () =>
        expect(comparer('hi', 'abcde')).toBe(-1))

      it('comparing strings of the different length should return 1', () =>
        expect(comparer('hello', 'abc')).toBe(1))
    })
  })

  describe('invertCompareFn', () => {
    it('should be a function', () => expect(typeof invertCompareFn).toBe('function'))
  
    describe('Given a function to get the length of strings, and using the inverted comparer', () => {
      const getLength = (str: string) => str.length;
      const comparer = invertCompareFn(compareFnFromGetKey(getLength))

      it('comparing strings of the same length should return 0', () =>
        expect(comparer('hello', 'abcde')).toBe(0))

      it('comparing strings of the different length should return 1', () =>
        expect(comparer('hi', 'abcde')).toBe(1))

      it('comparing strings of the different length should return -1', () =>
        expect(comparer('hello', 'abc')).toBe(-1))
    })
  })

  describe('sortBy', () => {
    it('should be a function', () => expect(typeof sortBy).toBe('function'))
  
    describe('Given an array and a function to get the string length', () => {
      const arr = ["This", "is", "an", "array", "with", "words", "of", "different", "lengths"]
      const getLength = (str: string) => str.length;

      it('sorting the array by length should return the array sorted by string length', () =>
        expect(sortBy(arr, getLength))
          .toEqual(["is", "an", "of", "This", "with", "array", "words", "lengths", "different"]))
    })
  })

  describe('sortByDesc', () => {
    it('should be a function', () => expect(typeof sortByDesc).toBe('function'))
  
    describe('Given an array and a function to get the string length', () => {
      const arr = ["This", "is", "an", "array", "with", "words", "of", "different", "lengths"]
      const getLength = (str: string) => str.length;

      it('sorting the array by length should return the array sorted by string length', () =>
        expect(sortByDesc(arr, getLength))
          .toEqual(["different", "lengths", "array", "words", "This", "with", "is", "an", "of"]))
    })
  })
})
