import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../model/registro';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public pri_ord: number = 0;
  public seg_ord: number = 0;
  public ter_ord: number = 0;
  public NuevaEntrada: Registro;

  public ngOnInit() {
    this.NuevaEntrada.fecha = new Date(); 
  }
   
  constructor(private httpClient: HttpClient) { }

  public SubirEntrada() {
    //this.NuevaEntrada.usuario1 = Tab1Page.user;
    //this.NuevaEntrada.litros1 = this.pri_ord;
    //this.NuevaEntrada.litros2 = this.seg_ord;
    //this.NuevaEntrada.litros3 = this.ter_ord;
    //this.NuevaEntrada.fecha = new Date();
    return this.httpClient.put("http://localhost:3000/historial",this.NuevaEntrada);
  }
  

}
