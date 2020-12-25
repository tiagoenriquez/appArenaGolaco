import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/Usuario';
import { ReservaService } from 'src/services/ReservaService';
import { DateFormat } from 'src/shared/DateFormat';
import { ReservaData } from 'src/viewsModels/ReservaData';

@Component({
  selector: 'app-cadastro-reserva',
  templateUrl: './cadastro-reserva.page.html',
  styleUrls: ['./cadastro-reserva.page.scss'],
})
export class CadastroReservaPage implements OnInit {

  constructor(private reservaService: ReservaService) { }

  public usuario: Usuario = new Usuario();
  public data: string;
  public reservas: ReservaData[] = new Array<ReservaData>();
  public horarios: string[] = new Array<string>();

  ngOnInit() {
    this.obterUsuarioLogado();
    this.obterData();
    this.obterHorariosDisponiveis();
  }
  
  obterUsuarioLogado() {
    const usuarioLogado: Usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado) this.usuario = usuarioLogado;
  }

  obterData() {
    const dataObtida: string = JSON.parse(localStorage.getItem('data'));
    if(dataObtida) this.data = dataObtida;
    else this.data = DateFormat.convertDateTimePrint(Date());
  }

  obterHorariosDisponiveis() {
    this.horarios = this.reservaService.listarHorariosDisponiveis(this.data);
  }

}
