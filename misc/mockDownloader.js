import { EventEmitter } from 'events'


function createMockStream() {
    const mock = new EventEmitter();
    let progress = 0;

   const id= setInterval(() => {
        if (progress >= 100) {
            clearInterval(id);
            mock.emit('finish');
            return;
        }
        mock.emit('progress', progress++)
    }, 100)

    return mock;
}

export default createMockStream;