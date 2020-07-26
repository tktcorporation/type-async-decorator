# type-async-decorator

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Build Status](https://travis-ci.org/tktcorporation/type-async-decorator.svg?branch=master)](https://travis-ci.org/tktcorporation/type-async-decorator)

## Usage

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
