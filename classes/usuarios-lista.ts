import { Usuario } from './usuario';
export class UsuarioLista{
    private lista:Usuario[]=[];

    constructor(){}

    agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    actualizarNombre(id:string,nombre:string){

        const usuario = this.lista.find((usuario)=>usuario.id === id);
        if(usuario){usuario.nombre = nombre};

        console.log('=====Actualizando usuario=====');
        console.log(this.lista)
    }

    getLista(){
        return this.lista.filter((item)=>item.nombre != 'sin-nombre');
    }

    getUsuario(id:string){
        return this.lista.find((usuario)=>usuario.id === id);
    }

    // Obtener usuarios en una sala en particular
    getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario=>usuario.sala === sala);
    }

    // Borrar usuario
    borrarUsuario(id:string){
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario=>usuario.id !== id);

        return tempUsuario;

    }
}