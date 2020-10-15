import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../model/registro';
import { LoadingController } from '@ionic/angular';
import { RegistrosService } from '../registros.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

/*<ion-content [fullscreen]="true">
  <ion-item>
    <ion-radio-group value ="MO" [(ngModel)]="seleccion" >
      <ion-label position="start">Opciones de Visualización</ion-label>
      <ion-item>
        <ion-label>Mostrar Total</ion-label>
        <ion-radio slot="start" value="MT" color="dark"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Mostrar por ordeñe</ion-label>
        <ion-radio slot="start" value="MO" color="dark"></ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-item>
  */
export class Tab3Page implements OnInit {
  
  public historial;
  public seleccion ;
  public DatosCompletos: Array<any> = [
    { data: [], label: '1er ordeñe' },
    { data: [], label: '2do ordeñe' },
    { data: [], label: '3er ordeñe' }
  ];
  public DatosCompletosT:Array<any> = [{ data:[], label: "Total Diario" }];
  
  //POR ORDEÑE
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: '1er ordeñe' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: '2do ordeñe' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: '3er ordeñe' }
  ];
  public Fechas: Array<any> = [];
  public lineChartLabels: Array<any> = ['día 1', 'día 2', 'día 3', 'día 4', 'día 5', 'día 6', 'día 7'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,1)',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(255,255,255,1)',
      borderColor: 'rgba(0,255,0,1)',
      pointBackgroundColor: 'rgba(0, 255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      backgroundColor: 'rgba(255,255,255,1)',
      borderColor: 'rgba(0,0,255, 1)',
      pointBackgroundColor: 'rgba(0,0,255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  
  //TOTALES
  public lineChartDataT:Array<any> = [{ data:[], label: "Total Diario" }];
  
public lineChartColorsT:Array<any> = [
  { 
    backgroundColorT: 'rgba(255,255,255,1)',
    borderColorT: 'rgba(55,155,255,1)',
    pointBackgroundColorT: 'rgba(155,155,155,1)',
    pointBorderColorT: '#fff',
    pointHoverBackgroundColorT: '#fff',
    pointHoverBorderColorT: 'rgba(148,159,177,0.8)'
  },
];

  constructor(private httpClient: HttpClient, private lodading: LoadingController, private RegistroSrv: RegistrosService) { }

  public async ngOnInit() {
    const loading = await this.lodading.create();
    loading.present();
    this.RegistroSrv.CargarDatos().subscribe(datos => {
      this.historial = datos
      loading.dismiss();
      this.GenerarEntradas();
      this.GraficoTotal();
      });
    
   }
 
  public GenerarEntradas()
  {
    for (var i = 0; i < this.historial.length; i++)
    {
      this.DatosCompletos[0].data.push(this.historial[i].litros1);
      this.DatosCompletos[1].data.push(this.historial[i].litros2);
      this.DatosCompletos[2].data.push(this.historial[i].litros3);
       
      this.DatosCompletosT[0].data.push(this.historial[i].litros3 + this.historial[i].litros3 + this.historial[i].litros3); 
      this.Fechas.push(this.historial[i].fecha);   
    }
  }

  public GraficoTotal() {
    this.lineChartData= this.DatosCompletos;
    this.lineChartDataT = this.DatosCompletosT;  
    this.lineChartLabels = this.Fechas;
  }
  
  public chartClicked(e:any):void {
    console.log(e);}
  
  public chartHovered(e:any):void {
    console.log(e);}
}
/* Agregar filtardo por fechas:
ts
  public obtenerPorFechas(FechaI: Date, FechaF: Date) {
    
    //var aux = moment().calendar();

    //range(1, 20);

    //FechaI, FechaF);
    
    var Fechas = [FechaI, new Date(FechaI.getFullYear(), FechaI.getMonth(), FechaI.getDate() + 6, 23, 59)];

    for (var int = FechaI; int <= FechaF; FechaI) {
      for (var i = 0; i < this.historial.length; i++) {
        this.DatosCompletos[0].data.push(this.historial[i].litros1);
        this.DatosCompletos[1].data.push(this.historial[i].litros2);
        this.DatosCompletos[2].data.push(this.historial[i].litros3);
       
        this.DatosCompletosT[0].data.push(this.historial[i].litros3 + this.historial[i].litros3 + this.historial[i].litros3);
        this.Fechas.push(this.historial[i].fecha);
      };
    };
  }

html
 <div class="ion-padding">
    <ion-item>
    <ion-label position="center"> Inicio: </ion-label>
    <ion-datetime  [(ngModel)]= "fechaI" displayFormat="DD/MM/YYYY" display-timezone="utc"></ion-datetime>
  </ion-item>
  <ion-item>
    <ion-label position="center"> Fin: </ion-label>
    <ion-datetime  [(ngModel)]= "fechaF" displayFormat="DD/MM/YYYY" display-timezone="utc"></ion-datetime>
  </ion-item>
  </div>*/