import { tryPromise, delay, getAllPages } from '../src/promises';

describe('promises.ts', () => {
  describe('tryPromise', () => {
    it('should be a function', () =>
      expect(typeof tryPromise).toBe('function'));

    describe('when a value is returned immediatelly', () => {
      const testValue = 'test value';
      const action = () => testValue;
      it('should return the same value', async () =>
        expect(await tryPromise(action)).toBe(testValue));
    });

    describe('when a resolved Promise is returned immediatelly', () => {
      const testValue = 'test value';
      const action = () => Promise.resolve(testValue);
      it('should return the same value', async () =>
        expect(await tryPromise(action)).toBe(testValue));
    });

    describe('when a Promise is returned after a while', () => {
      const testValue = 'test value';
      const action = () => delay(10).then(() => testValue);
      it('should return the same value', async () =>
        expect(await tryPromise(action)).toBe(testValue));
    });

    describe('when an exception is raised immediatelly', () => {
      const action = (): string => {
        throw new Error('Failed');
      };
      it('should throw the exception back', () =>
        expect(tryPromise(action)).rejects.toEqual(new Error('Failed')));
    });

    describe('when an exception is used as rejection', () => {
      const action = () => Promise.reject(new Error('Failed'));
      it('should throw the exception back', () =>
        expect(tryPromise(action)).rejects.toEqual(new Error('Failed')));
    });

    describe('when an error happens after a while', () => {
      const testValue = 'test value';
      const action = async () => {
        await delay(10);
        throw new Error('Failed');
      };
      it('should return the same value', () =>
        expect(tryPromise(action)).rejects.toEqual(new Error('Failed')));
    });
  });

  describe('getAllPages', () => {
    it('should be a function', () =>
      expect(typeof getAllPages).toBe('function'));

    describe('when there are no pages', () => {
      const fetckMock = jest.fn()
        .mockResolvedValue([[], undefined])
      it('should return an empty collection', async () =>
        {
          expect(await getAllPages(fetckMock)).toEqual([]);
          expect(fetckMock).toHaveBeenCalledTimes(1)
          expect(fetckMock).toHaveBeenCalledWith(undefined)
        });
    });

    describe('when there is one page', () => {
      const fetckMock = jest.fn()
        .mockResolvedValue([['A', 'B', 'C'], undefined])
      it('should return an empty collection', async () =>
        {
          expect(await getAllPages(fetckMock)).toEqual(['A', 'B', 'C']);
          expect(fetckMock).toHaveBeenCalledTimes(1)
          expect(fetckMock).toHaveBeenCalledWith(undefined)
        });
    });

    describe('when there are many pages', () => {
      const fetckMock = jest.fn()
        .mockResolvedValueOnce([['A', 'B', 'C'], 1])
        .mockResolvedValueOnce([['a', 'b', 'c'], 2])
        .mockResolvedValueOnce([['1', '2', '3'], undefined])
      it('should return an empty collection', async () =>
        {
          expect(await getAllPages(fetckMock)).toEqual(['A', 'B', 'C', 'a', 'b', 'c', '1', '2', '3']);
          expect(fetckMock).toHaveBeenCalledTimes(3)
          expect(fetckMock).toHaveBeenNthCalledWith(1, undefined)
          expect(fetckMock).toHaveBeenNthCalledWith(2, 1)
          expect(fetckMock).toHaveBeenNthCalledWith(3, 2)
        });
    });
  });
});
