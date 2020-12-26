import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Reserva } from 'src/models/Reserva';
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

  constructor(private reservaService: ReservaService, private alert: AlertController) { }

  public usuario: Usuario = new Usuario();
  public data: string;
  public reservas: ReservaData[] = new Array<ReservaData>();
  public horarios: string[] = new Array<string>();

  ngOnInit() {
    this.obterUsuarioLogado();
    this.obterData();
    this.obterHorariosDisponiveis();
    console.log(this.data);
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

  mudarData(data: string) {
    this.data = data;
    console.log(this.data);
    this.obterHorariosDisponiveis();
  }

  reservar(horario: string) {
    let reserva = new Reserva();
    reserva.inicio = DateFormat.convertDateApi(this.data) + " " + horario;
    reserva.usuario_id = this.usuario.id;
    let subscribe = this.reservaService.cadastrarReserva(reserva).subscribe(res => {}, restwo => {
      this.mostrarMensagem("Horário reservado com sucesso!");
      this.obterHorariosDisponiveis();
    });
  }

  async mostrarMensagem(mensagem: string) {
      const alert = await this.alert.create({
          cssClass: 'alert-padrao',
          header: 'Informação',
          message: mensagem,
          buttons: ['OK']
      });

      await alert.present();
  }


}
