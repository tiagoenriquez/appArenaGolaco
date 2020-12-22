import { Injectable } from "@angular/core";
import { Global } from "src/shared/Global";

@Injectable({
    'providedIn': 'root'
})

export class ReservaService {

    apiUrl = Global.ApiUrl + "reserva";
    
}