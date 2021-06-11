import express from 'express';
import Server from './classes/server';
import { router } from './routes/router';
//guardar las instalaciones con --save-dev para que sea solo usado en el desarrollo
 
const server=Server.instance;
 
server.app.use(express.urlencoded({extended:true}));
server.app.use(express.json());//siemopre antes de las rutas
//server.app.use(cors({origin:'*',credentials:true}));//cors permite que personas externas al dominio accedan al servicio
server.app.use('/',router)
 
server.iniciar(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})