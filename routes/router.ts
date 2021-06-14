import { usuariosConectados } from './../sockets/sockets';
import {Router,Request,Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';

export const router = Router();

const server = Server.instance;

router.post('/mensajes',(req:Request,res:Response)=>{

    const payload= {...req.body}

    // const server = Server.instance;

    server.io.emit('mensaje-nuevo',payload)

    res.json({
        ok:true,
        payload
    });
});

router.post('/mensajes/:id',(req:Request,res:Response)=>{
    const id = req.params.id;

    const payload = {...req.body}

    // const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',payload)
    res.json({
        ok:true,
        payload
    });
});


// Servicios para obtener todos los IDS de los usuarios
router.get('/usuarios',async(req:Request,res:Response)=>{

    const clients = await server.io.allSockets();
    let ids = [];
    for(let item of clients) ids.push(item);
    res.json({ok:true,ids})

});

// Obtener usuarios con sus nombres
router.get('/usuarios/detalles',(req:Request,res:Response)=>{

    

    res.json({ok:true,clientes:usuariosConectados.getLista()})
});