import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Login } from 'src/models/Login';
import { Usuario } from 'src/models/Usuario';
import { UsuarioService } from 'src/services/UsuarioService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login = new Login();

  constructor(private router: Router, private usuarioService: UsuarioService, private menu: MenuController) { }

  ngOnInit() {
  }

  /**
   * Fecha o menu lateral.
   */
  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }

  /**
  * Loga o usuário no sistema guardando suas informações para utilização em outras telas.
  * Abre o menu laterall.
  * Encaminha o usuário para a tela de lista de reservas.
  */
  logar() {
    let subscribe = this.usuarioService.logar(this.login).subscribe((usuario) => {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      this.menu.swipeGesture(true);
      this.router.navigate(['/lista-reservas']);
    })
  }

  /**
  * Encaminha o usuário para a tela de cadastro de usuário.
  */
  cadastrar() {
    this.router.navigate(['/cadastro-usuario']);
  }

}
