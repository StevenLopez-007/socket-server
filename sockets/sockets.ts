import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente:Socket)=>{
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado')
    })
}

// Escuchar mensajes
export const mensaje = (cliente:Socket,io:socketIO.Server)=>{
    cliente.on('mensaje',(payload:{de:string,cuerpo:string})=>{
        console.log(`De: ${payload.de} \nCuerpo: ${payload.cuerpo}`,);

        console.log(io)
        io.emit('mensaje-nuevo',payload)
    })
}