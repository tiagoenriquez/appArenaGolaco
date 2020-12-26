import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/models/Reserva';
import { Usuario } from 'src/models/Usuario';
import { ReservaService } from 'src/services/ReservaService';
import { DateFormat } from 'src/shared/DateFormat';
import { ReservaUsuario } from 'src/viewsModels/ReservaUsuario';
import { ListaReservasPage } from '../lista-reservas/lista-reservas.page';

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
    this.usuario = this.obterUsuarioLogado();
    this.listar(this.reserva, this.usuario);
  }
  
  obterUsuarioLogado() {
    const usuarioLogado: Usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado) return usuarioLogado;
  }

  listar(reserva: Reserva, usuario: Usuario) {
    reserva.inicio = Date();
    reserva.usuario_id = usuario.id;
    let subscribe = this.reservaService.listarPorUsuario(reserva).subscribe(reservas => {
      this.reservas = reservas;
    });
  }

  excluir(inicio: string) {
    let subscribe = this.reservaService.excluir(inicio).subscribe(res => {}, restwo => {});
  }

  obterData(data: string) {
    return DateFormat.convertDateApi(data);
  }

  obterHorario(data: string): string {
    return DateFormat.convertTimePrint(data);
  }

}
