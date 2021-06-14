import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente:Socket,io:socketIO.Server)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente:Socket,io:socketIO.Server
    )=>{
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos',usuariosConectados.getLista());
    });
}

// Escuchar mensajes
export const mensaje = (cliente:Socket,io:socketIO.Server)=>{
    cliente.on('mensaje',(payload:{de:string,cuerpo:string})=>{
        console.log(`De: ${payload.de} \nCuerpo: ${payload.cuerpo}`,);

        console.log(io)
        io.emit('mensaje-nuevo',payload)
    })
}

// Configurar usuarios
export const configUsuario = (cliente:Socket,io:socketIO.Server)=>{
    cliente.on('configurar-usuairo',(payload:{nombre:string},callback:any)=>{
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        io.emit('usuarios-activos',usuariosConectados.getLista());
        callback({
            ok:true,
            msg:`Usuario ${payload.nombre} configurado`
        })
    })
}

export const obtenerUsuarios = (cliente:Socket,io:socketIO.Server)=>{
    cliente.on('obtener-usuarios',()=>{
        io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLista());
    });
}