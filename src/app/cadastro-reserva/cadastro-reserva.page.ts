import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/Usuario';
import { ReservaService } from 'src/services/ReservaService';
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
    this.listar(this.data);
    this.obterHorariosDisponiveis();
  }
  
  obterUsuarioLogado() {
    const usuarioLogado: Usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado) this.usuario = usuarioLogado;
  }

  obterData() {
    const dataObtida: string = JSON.parse(localStorage.getItem('data'));
    if(dataObtida) this.data = dataObtida;
    else this.data = Date();
  }

  listar(data: string) {
    console.log(data);
    let subscribe = this.reservaService.listarPorData(data).subscribe((res) => {
      this.reservas = res;
      console.log(this.reservas);
    });
  }

  obterHorariosDisponiveis() {
    console.log(this.reservas);
  }

}
