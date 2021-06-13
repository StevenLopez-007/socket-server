import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente:Socket)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente:Socket)=>{
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
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

export const configUsuario = (cliente:Socket,io:socketIO.Server)=>{
    cliente.on('configurar-usuairo',(payload:{nombre:string},callback:any)=>{
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre)
        callback({
            ok:true,
            msg:`Usuario ${payload.nombre} configurado`
        })
    })
}