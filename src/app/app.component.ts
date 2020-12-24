import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Usuario } from 'src/models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public usuario = new Usuario();
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Lista de Reservas',
      url: '/lista-reservas',
      icon: 'list'
    },
    {
      title: 'Reservar horário',
      url: '/cadastro-reserva',
      icon: 'time'
    },
    {
      title: 'Desistir de Reservas',
      url: '/desistir-reserva',
      icon: 'trash'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  obterUsuarioLogado() {
    const usuarioLogado: Usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado) this.usuario = usuarioLogado;
  }

  sair() {
    localStorage.clear();
    this.menu.swipeGesture(false);
    this.router.navigate(['/login']);
  }
}
