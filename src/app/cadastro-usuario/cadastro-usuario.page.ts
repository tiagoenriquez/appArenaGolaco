import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/models/Usuario';
import { UsuarioService } from 'src/services/UsuarioService';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router, private alert: AlertController) { }

  ngOnInit() {
  }

  criarUsuario() {

    let subscription = this.usuarioService.inserir(this.usuario).subscribe((res) => {}, restwo => {});
    this.mostrarMensagem();
    this.router.navigate(['/login']);

  }

  async mostrarMensagem() {
      const alert = await this.alert.create({
          cssClass: 'alert-padrao',
          header: 'Informação',
          message: 'Usuário cadastrado com sucesso',
          buttons: ['OK']
      });

      await alert.present();
  }

}
