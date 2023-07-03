import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {Restaurant} from "../../classes/Restaurant";
import { FrifoodPodatkiService} from "../../services/frifood-podatki.service";
import {ActivatedRoute} from "@angular/router";
import {KeyValue} from "@angular/common";
import {Analytics} from "../../classes/Analytics";


@Component({
  selector: 'app-restaurantview',
  templateUrl: './restaurantview.component.html',
  styleUrls: ['./restaurantview.component.css']
})
export class RestaurantviewComponent implements OnInit {

  restavracija: Restaurant;

  restaurantPathID: string;


  constructor(private frifoodPodatkiService: FrifoodPodatkiService, private route: ActivatedRoute) { }

  ngOnInit() {

    let analytics: Analytics;
    analytics = {
      _id: '',
      name: 'RestaurantAddPageViews',
      numAPICalls: 0,
    };
    this.frifoodPodatkiService.updateAnalyticsByName(analytics).then(r =>
      console.log(r)
    );

    this.route.paramMap.subscribe(params => {
      this.restaurantPathID = params.get("id");
      //5debddcf5fc3683918ae71a6
      this.frifoodPodatkiService.getRestaurantById(this.restaurantPathID).then(
        (data) => {
          console.log(data.timeTable);

          this.restavracija = data;
          console.log(this.restavracija.front)
        }
      );

    });

  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

}
