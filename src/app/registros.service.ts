import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { Registro } from './model/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  public registro:Registro = new Registro;
  public NuevaEntrada: Registro = new Registro;
  public usuario: string;
  public litros1;
  public litros2;
  public litros3;
  public fecha;

  constructor(private httpClient: HttpClient) { }

  public eliminar(registro: Registro) { 
    this.registro.fecha = format(new Date("4/10/2020"), "dd/MM/yyyy");
    this.borrar(this.registro).subscribe(() => console.log("entrada borrada"));
  }
  
  public borrar(registro: Registro) {  
    return this.httpClient.delete("http://localhost:3000/historial/"+this.registro.fecha);
    } 

  public CargarDatos() {
    return this.httpClient.get<Registro[]>("http://localhost:3000/historial");
  }
  public CargarDia(fecha:string) {
    return this.httpClient.get<Registro[]>("http://localhost:3000/historial"+this.fecha);
  }

}
