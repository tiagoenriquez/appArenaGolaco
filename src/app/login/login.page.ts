import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login = new Login();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logar() {

  }

  cadastrar() {
    this.router.navigate(['/cadastro-usuario']);
  }

}
