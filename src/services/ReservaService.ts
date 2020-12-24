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

    constructor(private http: HttpClient) {}

    listarPorData(data: string): Observable<ReservaData[]> {
        data = DateFormat.convertDateApi(data) + "%";
        return this.http.get<ReservaData[]>(`${this.apiUrl}/data=${data}`);
    }
    
}