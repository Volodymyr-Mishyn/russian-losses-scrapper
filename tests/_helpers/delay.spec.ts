import { delay } from 'src/_helpers/delay';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should delay for the specified amount of time', () => {
    const resolvedValue = 'test';
    const delayTime = 1000;
    const delayPromise = delay(delayTime).then(() => resolvedValue);
    jest.advanceTimersByTime(delayTime);
    return expect(delayPromise).resolves.toEqual(resolvedValue);
  });
});
