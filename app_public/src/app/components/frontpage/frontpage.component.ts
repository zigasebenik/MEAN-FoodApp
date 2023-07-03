import { Component, OnInit } from '@angular/core';
import {Analytics} from "../../classes/Analytics";
import { FrifoodPodatkiService} from "../../services/frifood-podatki.service";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  constructor(private frifoodPodatkiService: FrifoodPodatkiService) { }

  ngOnInit() {
    let analytics: Analytics;
    analytics = {
      _id: '',
      name: 'FrontPageViews',
      numAPICalls: 0,
    };
    this.frifoodPodatkiService.updateAnalyticsByName(analytics).then(r =>
      console.log(r)
    );
  }

}
