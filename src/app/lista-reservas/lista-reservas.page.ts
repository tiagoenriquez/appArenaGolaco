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

  constructor(private reservaService: ReservaService, private router: Router) { }

  ngOnInit() {
    this.data = DateFormat.convertDateTimePrint(Date());
    this.listar(this.data);
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

}