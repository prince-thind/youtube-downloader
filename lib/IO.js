export default function IOConnectionHandler(socket){
    const error= new Error('Sample Error')
    socket.emit('error',error.message)
}