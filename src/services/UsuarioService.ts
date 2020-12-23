import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "src/models/Login";
import { Usuario } from "src/models/Usuario";
import { Global } from "src/shared/Global";

@Injectable({
    'providedIn': 'root'
})

export class UsuarioService {

    apiUrl = Global.ApiUrl + "usuario";

    constructor(private http: HttpClient) {

    }

    inserir(usuario: Usuario): Observable<Response> {

        if(!usuario.nome) throw new Error("O campo Nome não foi preenchido");
        if(!usuario.cpf) throw new Error("O campo CPF não foi preenchido");
        if(!usuario.telefone) throw new Error("O Telefone Nome não foi preenchido");
        if(!usuario.email) throw new Error("O campo E-mail não foi preenchido");
        if(!usuario.senha) throw new Error("O campo Senha não foi preenchido");
        if(!usuario.senhaConfirmacao) throw new Error("O campo Confirmar Senha não foi preenchido");
        if(usuario.senha != usuario.senhaConfirmacao) throw new Error("Senha e Confirmar Senha não são equivalentes");
        
        return this.http.post<Response>(this.apiUrl, usuario);

    }

    logar(login: Login): Observable<Usuario> {

        if(!login.email) throw new Error("O campo E-mail não foi preenchido");
        if(!login.senha) throw new Error("O campo Senha não foi preenchido");
        
        return this.http.post<Usuario>(`${this.apiUrl}/login`, login);

    }
    
}