import Server from "./classes/server";
import { router } from "./routes/router";
import express from 'express';
import cors from 'cors';

const server = new Server();


// Body Parser
server.app.use(express.urlencoded({extended:true,limit:'25mb'}));
server.app.use(express.json({limit:'25mb'}));

// Cors
server.app.use(cors({origin:true,credentials:true}))

// Rutas
server.app.use('/',router);


server.start(()=>{
    console.log(`El servidor esta en el puerto ${server.port}`)
})