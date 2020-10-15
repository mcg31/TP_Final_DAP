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
  public CheckLogin: boolean = false;
  private usuarios= [{ "Nombre": "Ignacio", "contraseña": "Ignacio" }, { "Nombre": "José González", "contraseña": "JoseG" }, { "Nombre": "José Brizio", "contraseña": "JoseB" }];
  
  constructor(private alContrl: AlertController, RegistroSrv: RegistrosService) { }
  
  public async login() {
    
    for (var i = 0; i < 3; i++) {
      
      if (this.usuarios[i].Nombre == this.user && this.usuarios[i].contraseña == this.contrasenia) {
        const cuerpoAlerta = {
          header: "Ingreso",
          message: "Ingreso exitoso como usuario: " + this.user,
          buttons: ["OK"]
        };
        this.CheckLogin= true;
        const alerta = await this.alContrl.create(cuerpoAlerta);
        await alerta.present();
      }
    }
    if (!this.CheckLogin) {
      const cuerpoAlertaF = {
        header: "Ingreso",
        message: "Verifique los datos ingresados",
        buttons: ["OK"]
      };
      const alertaF = await this.alContrl.create(cuerpoAlertaF);
      await alertaF.present();
    }
  }
}
