import { AsyncMethodDecorator } from './AsyncMethodDecorator';
const TEST_TIMEOUT = 20000;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const delayPush = async (arr: string[], str: string, ms: number) => {
  await delay(ms);
  arr.push(str);
};
const delayPushAndThrow = async (
  error: any,
  arr: string[],
  str: string,
  ms: number,
) => {
  await delay(ms);
  arr.push(str);
  throw error;
};

enum Timing {
  before = 'before',
  after = 'after',
  catched = 'catched',
  finaly = 'finaly',
}

// This is not so useful.
describe('AsyncMethodDecorator', () => {
  it(
    'validate timing of before, after, finaly',
    async () => {
      class Sample {
        static resultArray: string[] = [];
        @AsyncMethodDecorator(
          async () => delayPush(Sample.resultArray, Timing.before, 4000),
          async () => delayPush(Sample.resultArray, Timing.after, 2000),
          async () => delayPush(Sample.resultArray, Timing.catched, 1000),
          async () => delayPush(Sample.resultArray, Timing.finaly, 1000),
        )
        async hello() {
          await delayPush(Sample.resultArray, 'hello', 5000);
        }
      }
      await new Sample().hello();
      expect(Sample.resultArray).toStrictEqual([
        Timing.before,
        'hello',
        Timing.after,
        Timing.finaly,
      ]);
    },
    TEST_TIMEOUT,
  );
  it(
    'validate timing of before, catched, finaly',
    async () => {
      class Sample {
        static resultArray: string[] = [];
        @AsyncMethodDecorator(
          async () => delayPush(Sample.resultArray, Timing.before, 4000),
          async () => delayPush(Sample.resultArray, Timing.after, 2000),
          async () => delayPush(Sample.resultArray, Timing.catched, 1000),
          async () => delayPush(Sample.resultArray, Timing.finaly, 1000),
        )
        async fail() {
          await delayPush(Sample.resultArray, 'fail', 5000);
          throw new Error();
        }
      }
      await new Sample().fail();
      expect(Sample.resultArray).toStrictEqual([
        Timing.before,
        'fail',
        Timing.catched,
        Timing.finaly,
      ]);
    },
    TEST_TIMEOUT,
  );
  it(
    'validate timing of before, catched, finaly, throw',
    async () => {
      class Sample {
        static resultArray: string[] = [];
        @AsyncMethodDecorator(
          async () => delayPush(Sample.resultArray, Timing.before, 4000),
          async () => delayPush(Sample.resultArray, Timing.after, 2000),
          async e =>
            delayPushAndThrow(e, Sample.resultArray, Timing.catched, 1000),
          async () => delayPush(Sample.resultArray, Timing.finaly, 1000),
        )
        async fail() {
          await delayPush(Sample.resultArray, 'fail', 5000);
          throw new Error();
        }
      }
      await expect(new Sample().fail).rejects.toThrowError(Error);
      expect(Sample.resultArray).toStrictEqual([
        Timing.before,
        'fail',
        Timing.catched,
        Timing.finaly,
      ]);
    },
    TEST_TIMEOUT,
  );
});
