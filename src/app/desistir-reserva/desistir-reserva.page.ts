import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Reserva } from 'src/models/Reserva';
import { Usuario } from 'src/models/Usuario';
import { ReservaService } from 'src/services/ReservaService';
import { DateFormat } from 'src/shared/DateFormat';
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

  constructor(private reservaService: ReservaService, private alert: AlertController,) { }

  ngOnInit() {
    this.usuario = this.obterUsuarioLogado();
    this.listar(this.reserva, this.usuario);
  }

  obterUsuarioLogado() {
    const usuarioLogado: Usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) return usuarioLogado;
  }

  listar(reserva: Reserva, usuario: Usuario) {
    reserva.inicio = Date();
    reserva.usuario_id = usuario.id;
    let subscribe = this.reservaService.listarPorUsuario(reserva).subscribe(reservas => {
      this.reservas = reservas;
    });
  }

  excluir(inicio: string) {
    let subscribe = this.reservaService.excluir(inicio).subscribe(res => {}, restwo => {
      this.listar(this.reserva, this.usuario);
    });
  }


  obterData(data: string) {
    return DateFormat.convertDatePrint(data);
  }

  obterHorario(data: string): string {
    return DateFormat.convertTimePrint(data);
  }

  async presentAlertConfirm(inicio: string) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Desistência de reserva',
      message: 'Tem certeza de que deseja realmente desistir de reservar este horário?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluir(inicio);
          }
        }
      ]
    });

    await alert.present();
  }

}
