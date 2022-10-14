import { Readable } from 'stream'

export default class MockStream extends Readable {
    constructor(options) {
        super(options)
        this.value = 0
    }
    async _read(size) {
        await sleep(0.1)
        this.push(++this.value + "", 'utf-8')
        if (this.value >= 100) {
            this.push(null)
        }
    }
}

function sleep(n) {
    return new Promise(r => setTimeout(r, n * 1000))
}