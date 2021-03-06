import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets';

//aplico el patron singleton para instanciar una sola vez a server
export default class Server{
    private static _instance: Server;
    public app:express.Application;
    public port: number;
    public io: socketIO.Server;//encargado de los eventos
    private httpServer: http.Server;
    private constructor(){
        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer=new http.Server(this.app);
        this.io=require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
              },            
          });
        this.escucharSockets();
    }
    
    public static get instance(){
        return this._instance||(this._instance=new this());
    }
 
    private escucharSockets(){
        console.log('Escuchando conexiones');
        this.io.on('connection',(cliente)=>{

            // ConectarCliente
            socket.conectarCliente(cliente,this.io);

            // Obtener usuarios
            socket.obtenerUsuarios(cliente,this.io);

            // Configurar usuario
            socket.configUsuario(cliente,this.io);
            
            // Mensaje
            socket.mensaje(cliente,this.io);
            
            // Desconectar
            socket.desconectar(cliente,this.io);
        });
    }
 
    iniciar(callback:any){
        this.httpServer.listen(this.port,callback);
    }
}