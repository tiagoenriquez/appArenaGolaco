import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reserva } from "src/models/Reserva";
import { DateFormat } from "src/shared/DateFormat";
import { Global } from "src/shared/Global";
import { ReservaData } from "src/viewsModels/ReservaData";
import { ReservaUsuario } from "src/viewsModels/ReservaUsuario";

@Injectable({
    'providedIn': 'root'
})

export class ReservaService {

    apiUrl = Global.ApiUrl + "reserva";

    constructor(private http: HttpClient) { }

    listarPorData(data: string): Observable<ReservaData[]> {
        data = DateFormat.convertDateApi(data) + "%";
        return this.http.get<ReservaData[]>(`${this.apiUrl}/data=${data}`);
    }

    listarHorariosDisponiveis(data: string): string[] {
        let dataAtual = DateFormat.convertDateTimeApi(Date());
        let dataDate = new Date(data);
        let dataAtualDate = new Date(dataAtual);
        let horarios: string[] = new Array<string>();
        if (dataDate.getFullYear() < dataAtualDate.getFullYear()
            || dataDate.getFullYear() == dataAtualDate.getFullYear() && dataDate.getMonth() < dataAtualDate.getMonth()
            || dataDate.getFullYear() == dataAtualDate.getFullYear() && dataDate.getMonth() == dataAtualDate.getMonth() && dataDate.getDate() < dataAtualDate.getDate()) {
            return [];
        }
        for (let i = this.obterHorarioInicial(dataDate, dataAtualDate); i < 22; i++) {
            if (i % 2 == 0) horarios.push(this.formatarHorario(i));
        }
        let horariosReservados: string[] = new Array<string>();
        let subscribe = this.listarPorData(data).subscribe((reservas) => {
            for (let reserva of reservas) {
                let inicio = new Date(reserva.inicio);
                let horaInicioNumber = inicio.getHours();
                let horaInicio = this.formatarHorario(horaInicioNumber);
                if (horariosReservados.indexOf(horaInicio) == -1) horariosReservados.push(horaInicio);
            }
            for (let i = 0; i < horariosReservados.length; i++) {
                let indice = horarios.indexOf(horariosReservados[i]);
                if (indice != -1) {
                    horarios.splice(indice, 1);
                }
            }
        });
        return horarios;
    }

    cadastrarReserva(reserva: Reserva): Observable<Response> {
        return this.http.post<Response>(this.apiUrl, reserva);
    }

    listarPorUsuario(reserva: Reserva): Observable<ReservaUsuario[]> {
        reserva.inicio = DateFormat.convertDateTimeApi(reserva.inicio);
        return this.http.get<ReservaUsuario[]>(`${this.apiUrl}/usuario=${reserva.usuario_id}&inicio=${reserva.inicio}`);
    }

    excluir(inicio: string): Observable<Response> {
        return this.http.delete<Response>(`${this.apiUrl}/${inicio}`);
    }

    obterHorarioInicial(data: Date, dataAtual: Date): number {
        if (data.getDate() == dataAtual.getDate()) return dataAtual.getHours() + 1;
        else return 6;
    }

    formatarHorario(number: number): string {
        if (number < 10) return "0" + number + ":00:00";
        else return number + ":00:00";
    }

}