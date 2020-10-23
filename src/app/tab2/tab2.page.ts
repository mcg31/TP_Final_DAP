import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../model/registro';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { RegistrosService } from '../registros.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  private RegistroActual;
  //public registro;
  public pri_ord: number = 0;
  public seg_ord: number = 0;
  public ter_ord: number = 0;
  public SiEsta = false;
  public idActual = 6;
  public NuevaEntrada: Registro = new Registro;
  public nuevo: boolean = false;
  public fecha: string;
  constructor(private RegistroSrv: RegistrosService, private httpClient: HttpClient, private lodading: LoadingController, private alContrl: AlertController) { }
  

  public async ngOnInit() {
    this.RegistroSrv.fecha = format(new Date(), "dd/MM/yyyy");
    if (this.Esta())
    {
      const loading = await this.lodading.create();
      loading.present();
      await this.RegistroSrv.CargarDia(this.idActual).subscribe(
        datos => {
          this.pri_ord = datos.litros1;
          this.seg_ord = datos.litros2;
          this.ter_ord = datos.litros3;   
      })
      loading.dismiss();
   }
   else {
     this.pri_ord = 0;
     this.seg_ord = 0;
     this.ter_ord = 0;
     }    
  }

  public Esta() {
    for (var i = 0; i < this.RegistroSrv.historial.length; i++)
    {
      if (this.RegistroSrv.historial[i].fecha == format(new Date(), "dd/MM/yyyy"))
      {
        this.idActual = this.RegistroSrv.historial[i].id;
        this.SiEsta = true;
      }  
    }
    return this.SiEsta;
   }

  public async Subir() {
    this.NuevaEntrada.litros1 = this.pri_ord;
    this.NuevaEntrada.litros2 = this.seg_ord;
    this.NuevaEntrada.litros3 = this.ter_ord;
    this.NuevaEntrada.usuario = this.RegistroSrv.usuario;
    this.NuevaEntrada.fecha = this.RegistroSrv.fecha;
         
    if (this.SiEsta) {
      this.Actualizar(this.NuevaEntrada, this.idActual).subscribe(() => console.log("actualizo entrada"));
      this.RegistroSrv.CargarDatos().subscribe(datos => {
        this.RegistroSrv.historial = datos;
      });

    }
    else {
      this.SubirNuevo(this.NuevaEntrada).subscribe(() => console.log("nuevo ingreso"));
      this.RegistroSrv.CargarDatos().subscribe(datos => {
        this.RegistroSrv.historial = datos;
      });//this.RegistroSrv.historial.push(this.NuevaEntrada);  }
    }
    const cuerpoAlerta = {
      header: "Actualización",
      message: "Los datos se han modificado satisfactoriamente",
      buttons: ["OK"]
    };
    const alerta = await this.alContrl.create(cuerpoAlerta);
    await alerta.present();
  }

  public Actualizar(NuevaEntrada: Registro, id: number) { 
    return this.httpClient.put("http://localhost:3000/historial/" + id,this.NuevaEntrada);
  }
  public SubirNuevo(NuevaEntrada: Registro) { 
      return this.httpClient.post("http://localhost:3000/historial",this.NuevaEntrada);
    }
    
}