import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../model/registro';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { RegistrosService } from '../registros.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  private RegistroActual;
  public pri_ord: number = 0;
  public seg_ord: number = 0;
  public ter_ord: number = 0;
  public registro;
  public NuevaEntrada: Registro = new Registro;
  public hoy = format(new Date(), "dd/MM/yyyy");
  constructor(private RegistroSrv: RegistrosService, private httpClient: HttpClient) { }
  

  public async ngOnInit() {
    /*this.registro = this.RegistroSrv.registro;
    this.RegistroSrv.CargarDia(this.hoy).subscribe(datos => {
      this.registro = datos;
    });
    this.pri_ord = this.registro.litros1;
    this.seg_ord = this.registro.litros2;
    this.ter_ord = this.registro.litros3;      */
  }

  public Subir() {
    this.NuevaEntrada.litros1 = this.pri_ord;
    this.NuevaEntrada.litros2 = this.seg_ord;
    this.NuevaEntrada.litros3 = this.ter_ord;
    this.NuevaEntrada.usuario = this.RegistroSrv.usuario;
    this.NuevaEntrada.fecha = this.hoy;
    //if (!this.httpClient.get("http://localhost:3000/historial/" + this.NuevaEntrada.fecha ))
    this.SubirNuevo(this.NuevaEntrada).subscribe(() => console.log("nuevo ingreso"));
    }

    public SubirNuevo(NuevaEntrada: Registro) { 
      return this.httpClient.post("http://localhost:3000/historial",this.NuevaEntrada);
    }
    public Actualizar(NuevaEntrada: Registro) { 
      return this.httpClient.put("http://localhost:3000/historial",this.NuevaEntrada.fecha);
    }
  
}