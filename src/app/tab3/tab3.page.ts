import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {
  fechaI = new Date();
  fechaF = new Date();
  //POR ORDEÑE  
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: '1er ordeñe' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: '2do ordeñe' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: '3er ordeñe' }
  ];
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

  constructor() {

    var aux = 0;
    var arr = [];
    for (let j = 0; j < this.lineChartData[0].data.length; j++) {
      aux = this.lineChartData[0].data[j] + this.lineChartData[1].data[j] + this.lineChartData[2].data[j];
      arr.push(aux);
      this.lineChartDataT[0].data.push(aux);
    }
    //this.lineChartDataT[0].val = arr; 
    console.log(this.lineChartDataT[0].data)
  }
  
/*  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  */
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
}
