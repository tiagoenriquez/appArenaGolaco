import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/Usuario';
import { UsuarioService } from 'src/services/UsuarioService';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  criarUsuario() {

    let subscription = this.usuarioService.inserir(this.usuario).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/login']);

  }

}
