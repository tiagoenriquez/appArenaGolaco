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
    this.data = DateFormat.convertDateTimePrint(Date());
    this.listar(this.data);
    this.obterHorariosDisponiveis(this.data);
  }

  ionViewDidEnter() {
  }

  listar(data: string){
    let reservas: ReservaData[] = new Array<ReservaData>();
    let subscribe = this.reservaService.listarPorData(data).subscribe(res => this.reservas = res);
    console.log(this.reservas);
  }

  reservar() {
    console.log(this.data);
    localStorage.setItem('data', JSON.stringify(this.data));
    this.router.navigate(['/cadastro-reserva']);
  }

  obterHorario(data: string) {
    return DateFormat.convertTimePrint(data);
  }

  obterHorariosDisponiveis(data: string) {
    let subscribe = this.reservaService.listarPorData(this.data).subscribe((res) => {
      let reservas = res;
      console.log(reservas);
      let dataAtual = Number(data[8] + data[9]);
      let horaAtual = Number(data[16] + data[17]);
      let horariosPossiveis = [6, 8, 10, 12, 14, 16, 18, 20];
      for(let reserva of reservas) {
        let data = Number(reserva.inicio[8] + reserva.inicio[9]);
        let hora = Number(reserva.inicio[11] + reserva.inicio[12]);
        for(let i = 0; i < horariosPossiveis.length; i++) {
          console.log(horariosPossiveis[i]);
          if(horariosPossiveis[i] == hora || (horariosPossiveis[i] < horaAtual && data == dataAtual) || data < dataAtual) {
            console.log(horariosPossiveis[i]);
            console.log(reserva);
            horariosPossiveis.splice(horariosPossiveis[i]);
          }
        }
      }
    });
  }

}