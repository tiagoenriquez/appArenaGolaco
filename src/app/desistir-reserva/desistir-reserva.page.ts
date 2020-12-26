import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/models/Reserva';
import { Usuario } from 'src/models/Usuario';
import { ReservaService } from 'src/services/ReservaService';
import { ReservaUsuario } from 'src/viewsModels/ReservaUsuario';

@Component({
  selector: 'app-desistir-reserva',
  templateUrl: './desistir-reserva.page.html',
  styleUrls: ['./desistir-reserva.page.scss'],
})
export class DesistirReservaPage implements OnInit {

  public usuario: Usuario = new Usuario();
  public reserva: Reserva = new Reserva();
  public reservas: ReservaUsuario[] = new Array<ReservaUsuario>();

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.obterUsuarioLogado();
    this.listar();
  }
  
  obterUsuarioLogado() {
    const usuarioLogado: Usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado) this.usuario = usuarioLogado;
  }

  listar() {
    this.reserva.inicio = Date();
    this.reserva.usuario_id = this.usuario.id;
    let subscribe = this.reservaService.listarPorUsuario(this.reserva).subscribe(reservas => {
      this.reservas = reservas;
      console.log(reservas);
    });
  }

}
