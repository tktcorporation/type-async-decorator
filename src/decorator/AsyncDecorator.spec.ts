import { AsyncDecorator } from './AsyncDecorator';

const delayLog = async (str: string, ms: number) => {
    await delay(ms);
    // console.log(str);
};
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('AsyncDecorator', () => {
    class User {
        @AsyncDecorator(
            async () => delayLog('まえ', 4000),
            async () => delayLog('あと', 2000),
            async () => delayLog('しっぱい', 1000),
        )
        async hello() {
            // console.log('こんにちは');
        }

        @AsyncDecorator(
            async () => delayLog('まえ', 4000),
            async () => delayLog('あと', 2000),
            async () => delayLog('しっぱい', 1000),
        )
        async nothello() {
            // console.log('こんにちは');
            throw 'えらー';
        }
    }
    it('せいこう', async () => {
        await new User().hello();
    }, 10000);
    it('しっぱい', async () => {
        await new User().nothello();
    }, 10000);
});
