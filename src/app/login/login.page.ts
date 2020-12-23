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

  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }

  logar() {
    let subscribe = this.usuarioService.logar(this.login).subscribe((usuario) => {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      this.menu.swipeGesture(true);
      this.router.navigate(['/lista-reservas']);
    })
  }

  cadastrar() {
    this.router.navigate(['/cadastro-usuario']);
  }

}
