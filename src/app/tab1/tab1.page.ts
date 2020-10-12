import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user: string = "";
  /*private contrasenia: string;
  private usuarios: [{ "Nombre": "Ignacio", "contraseña": "Ignacio" }, { "Nombre": "José González", "contraseña": "JoseG" }, { "Nombre": "José Brizio", "contraseña": "JoseB" }];
  */
  constructor(private alContrl: AlertController) { }
  /*
  public async login() {
    let verificador: boolean = false;
    for (var i = 0; i < 3; i++) {
      
      if (this.usuarios[i].Nombre == this.user && this.usuarios[i].contraseña == this.contrasenia) {
        const cuerpoAlerta = {
          header: "Ingreso",
          message: "Ingreso exitoso como usuario: " + this.user,
          buttons: ["OK"]
        };
        verificador = true;
        const alerta = await this.alContrl.create(cuerpoAlerta);
        await alerta.present();
      }
    }
    if (!verificador) {
      const cuerpoAlertaF = {
        header: "Ingreso",
        message: "Verifique los datos ingresados",
        buttons: ["OK"]
      };
      const alertaF = await this.alContrl.create(cuerpoAlertaF);
      await alertaF.present();
    }
  }
  */
}
