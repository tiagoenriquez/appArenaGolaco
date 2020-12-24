import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/services/ReservaService';
import { DateFormat } from 'src/shared/DateFormat';
import { ReservaData } from 'src/viewsModels/ReservaData';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.page.html',
  styleUrls: ['./lista-reservas.page.scss'],
})
export class ListaReservasPage implements OnInit {

  public reservas: ReservaData[] = new Array<ReservaData>();
  public data: string;
  public horariosDisponiveis: string[] = new Array<string>();

  constructor(private reservaService: ReservaService, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.data = Date();
    this.data = DateFormat.convertDateTimePrint(this.data);
    this.listar(this.data);
    this.obterHorariosDisponiveis();
  }

  listar(data: string) {
    let subscribe = this.reservaService.listarPorData(data).subscribe((res) => {
      this.reservas = res;
    });
  }

  reservar() {
    console.log(this.data);
    localStorage.setItem('data', JSON.stringify(this.data));
    this.router.navigate(['/cadastro-reserva']);
  }

  obterHorario(data: string) {
    return DateFormat.convertTimePrint(data);
  }

  obterHorariosDisponiveis() {
    let subscribe = this.reservaService.listarPorData(this.data).subscribe((res) => {
      this.reservas = res;
      let data = Date();
      let dataAtual = Number(data[8] + data[9]);
      let horaAtual = Number(data[16] + data[17]);
      let horariosPossiveis = [6, 8, 10, 12, 14, 16, 18, 20];
      for(let reserva of this.reservas) {
        let data = Number(reserva.inicio[8] + reserva.inicio[9]);
        let hora = Number(reserva.inicio[11] + reserva.inicio[12]);
        for(let i = 0; i < horariosPossiveis.length; i++) {
          console.log(horariosPossiveis[i]);
          if(horariosPossiveis[i] != hora || (horariosPossiveis[i] < horaAtual && data == dataAtual) || data < dataAtual) {
            horariosPossiveis.splice(horariosPossiveis[i]);
          }
        }
        console.log(horariosPossiveis);
      }
    });
  }

}