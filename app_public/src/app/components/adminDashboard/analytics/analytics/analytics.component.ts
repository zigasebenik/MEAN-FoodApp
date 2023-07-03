import { Component, OnInit } from '@angular/core';
import {FrifoodPodatkiService} from "../../../../services/frifood-podatki.service";
import {User} from "../../../../classes/User";
import {ChartsModule} from "ng2-charts";
import {Analytics} from "../../../../classes/Analytics";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private frifoodPodatkiService: FrifoodPodatkiService) { }

  public analytics: any;
  public lengthAnalytics: number;
  public chartLabels: string[] = [];
  public chartValues: number[] = [];
  public chart: Chart;

  public labelMFL: Array<any> = [
    { data: this.chartValues,
      label: "Analytics for page visits"
    }
  ];

  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          max : 200,
          min : 0,
        }
      }],
      xAxes: [{


      }],
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        //color: "#2756B3",
        color: "#222",

        font: {
          family: 'FontAwesome',
          size: 14
        },

      },
      deferred: false

    },

  };

  _lineChartColors:Array<any> = [{
    backgroundColor: 'red',
    borderColor: 'red',
    pointBackgroundColor: 'red',
    pointBorderColor: 'red',
    pointHoverBackgroundColor: 'red',
    pointHoverBorderColor: 'red'
  }];

  public ChartType = 'bar';

  getAnalytics() {
    this.frifoodPodatkiService.returnAnalytics().then(result => {
      this.analytics = result;
      this.lengthAnalytics = this.analytics.length;
      for(let i = 0; i < this.lengthAnalytics; i++){
        this.chartLabels.push(this.analytics[i].name);
        this.chartValues.push(this.analytics[i].numOfVisits);
      }
    })
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.getAnalytics();
  }

}
