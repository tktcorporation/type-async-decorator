# type-async-decorator

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Build Status](https://travis-ci.org/tktcorporation/type-async-decorator.svg?branch=master)](https://travis-ci.org/tktcorporation/type-async-decorator)

## Usage

For using async func by decorator.

```ts
function AsyncMethodDecorator(
  beforeFunc?: (() => Promise<void>) | (() => void) | undefined,
  afterFunc?: (() => Promise<void>) | (() => void) | undefined,
  catchFunc?: ((error: any) => Promise<void>) | (() => void) | undefined,
  finalFunc?: (() => Promise<void>) | (() => void) | undefined,
): MethodDecorator;
```

## Samples

```ts
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const delayLog = async (str: string, ms: number) => {
  await delay(ms);
  console.log(str);
};
```

```ts
@AsyncMethodDecorator(
    async () => delayLog('before', 4000),
    async () => delayLog('after', 2000),
    async () => delayLog('failed', 1000),
    async () => delayLog('fainaly', 1000),
)
async function hello() {
    console.log('Hello.');
}

await hello();
// before
// Hello.
// after
// fainaly
```

```ts
@AsyncMethodDecorator(
    async () => delayLog('before', 4000),
    async () => delayLog('after', 2000),
    async () => delayLog('failed', 1000),
    async () => delayLog('fainaly', 1000),
)
async function fail() {
    console.log('Hello.');
    throw new Error()
}

await fail();
// before
// Hello.
// failed
// fainaly
```
