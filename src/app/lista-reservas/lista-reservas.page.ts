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
  }

  ionViewDidEnter() {
    this.data = Date();
    this.data = DateFormat.convertDateTimePrint(this.data);
    console.log(this.data);
    this.listar(this.data);
  }

  listar(data: string) {
    console.log(data);
    let subscribe = this.reservaService.listarPorData(data).subscribe((res) => {
      this.reservas = res;
    });
  }

  reservar(data: string) {
    localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate(['/cadastro-reserva']);
  }

  obterHorario(data: string) {
    return DateFormat.convertTimePrint(data);
  }

}