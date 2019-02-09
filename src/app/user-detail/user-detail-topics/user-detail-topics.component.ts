import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigService } from '../../service/config.service';
import { Http } from '@angular/http';
import { Recent } from '../../model/recent';

@Component({
  selector: 'app-user-detail-topics',
  templateUrl: './user-detail-topics.component.html',
  styleUrls: ['./user-detail-topics.component.css']
})
export class UserDetailTopicsComponent implements OnInit {

  private recentTopicList: Recent[];

  constructor(
    private _http: Http,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initTopics();
  }

  initParams(): Observable<string> {
    return this._activatedRoute.params.filter(x => x['loginname']).map(x => x['loginname']);
  }

  initTopics() {
    this.initParams()
      .switchMap(x => this._http.get(this._configService.getUserDetail() + x))
      .filter(x => x.ok).map(x => x.json())
      .filter(x => x.success)
      .map(x => x.data.recent_topics)
      .subscribe(x => this.recentTopicList = x);
  }

}