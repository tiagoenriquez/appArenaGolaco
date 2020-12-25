import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DateFormat } from "src/shared/DateFormat";
import { Global } from "src/shared/Global";
import { ReservaData } from "src/viewsModels/ReservaData";

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
        let dataAtual = DateFormat.convertDateTimePrint(Date());
        let dataDate = new Date(data);
        let dataAtualDate = new Date(dataAtual);
        let horarios: string[] = new Array<string>();
        if (dataDate.getFullYear() < dataAtualDate.getFullYear()
            || dataDate.getFullYear() == dataAtualDate.getFullYear() && dataDate.getMonth() < dataAtualDate.getMonth()
            || dataDate.getFullYear() == dataAtualDate.getFullYear() && dataDate.getMonth() == dataAtualDate.getMonth() && dataDate.getDate() < dataAtualDate.getDate()) {
            return [];
        }
        for (let i = this.obterHorarioInicial(dataDate, dataAtualDate); i < 22; i++) {
            if (i % 2 == 0) horarios.push(this.obterHorario(i));
        }
        let horariosReservados: string[] = new Array<string>();
        let subscribe = this.listarPorData(data).subscribe((reservas) => {
            for (let reserva of reservas) {
                let inicio = new Date(reserva.inicio);
                let horaInicioNumber = inicio.getHours();
                let horaInicio = this.obterHorario(horaInicioNumber);
                if(horariosReservados.indexOf(horaInicio) == -1) horariosReservados.push(horaInicio);
                for(let horario of horariosReservados) {
                    if(horarios.indexOf(horario) != -1) {
                        console.log(horarios);
                        console.log(horario);
                        horarios.splice(horarios.indexOf(horario, 1));
                        console.log(horarios);
                    }
                }
                console.log(horarios);
                console.log(horariosReservados);
                console.log(horaInicio);
                if(horarios.indexOf(horaInicio) > -1) {
                    console.log(horarios);
                    console.log(horaInicio);
                    horarios.splice(horarios.indexOf(horaInicio));
                }
            }
            console.log(horarios);
        });
        console.log(horarios);
        return horarios;
    }

    obterHorarioInicial(data: Date, dataAtual: Date): number {
        if (data.getDate() == dataAtual.getDate()) return dataAtual.getHours() + 1;
        else return 6;
    }

    obterHorario(number: number): string {
        if (number < 10) return "0" + number + ":00:00";
        else return number + ":00:00";
    }

}