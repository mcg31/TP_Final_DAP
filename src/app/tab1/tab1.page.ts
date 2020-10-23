import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistrosService } from '../registros.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public user: string = "";
  private contrasenia: string = "";
  private usuarios= [{ "Nombre": "Ignacio", "contraseña": "Ignacio" }, { "Nombre": "José González", "contraseña": "JoseG" }, { "Nombre": "José Brizio", "contraseña": "JoseB" }];

  constructor(private alContrl: AlertController, private RegistroSrv: RegistrosService) { }
    
  public ngOnInit() {}
  public async login() {
    for (var i = 0; i < 3; i++) {
      if (this.usuarios[i].Nombre == this.RegistroSrv.usuario && this.usuarios[i].contraseña == this.contrasenia) {
        const cuerpoAlerta = {
          header: "Ingreso",
          message: "Ingreso exitoso como usuario: " + this.RegistroSrv.usuario,
          buttons: ["OK"]
        };
        this.RegistroSrv.CheckLogin = true;
        const alerta = await this.alContrl.create(cuerpoAlerta);
        await alerta.present();
        this.RegistroSrv.CargarDatos().subscribe(datos => {
          this.RegistroSrv.historial = datos;
        });
      }
    }
    if (!this.RegistroSrv.CheckLogin) {
      const cuerpoAlertaF = {
        header: "Ingreso",
        message: "Verifique los datos ingresados",
        buttons: ["OK"]  };
      const alertaF = await this.alContrl.create(cuerpoAlertaF);
      await alertaF.present();
    }
  }

  public async logout() {
    
    const cuerpoAlerta = {
      header: "Gracias " + this.RegistroSrv.usuario,
      message: "Su sesión se ha cerrado correctamente",
      buttons: ["OK"]
    };
    this.RegistroSrv.CheckLogin = false;
    this.RegistroSrv.usuario = "";
    const alerta = await this.alContrl.create(cuerpoAlerta);
    await alerta.present();  
    }
  }