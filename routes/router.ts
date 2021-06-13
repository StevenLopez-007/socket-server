import {Router,Request,Response} from 'express';
import Server from '../classes/server';

export const router = Router();

router.post('/mensajes',(req:Request,res:Response)=>{

    const payload= {...req.body}

    const server = Server.instance;

    server.io.emit('mensaje-nuevo',payload)

    res.json({
        ok:true,
        payload
    });
});

router.post('/mensajes/:id',(req:Request,res:Response)=>{
    const id = req.params.id;

    const payload = {...req.body}

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',payload)
    res.json({
        ok:true,
        payload
    });
});