import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigService } from '../../service/config.service';
import { Recent } from '../../model/recent';
import { filter, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-detail-topics',
  templateUrl: './user-detail-topics.component.html',
  styleUrls: ['./user-detail-topics.component.styl']
})
export class UserDetailTopicsComponent implements OnInit {

  recentTopicList$: Observable<Recent[]>;

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initTopics();
  }

  initParams(): Observable<string> {
    return this._activatedRoute.params
      .pipe(
        filter(x => x['loginname']),
        map(x => x['loginname']),
      );
  }

  initTopics() {
    this.recentTopicList$ = this.initParams()
      .pipe(
        switchMap(x => this._httpClient.get(this._configService.getUserDetail()+x)),
        filter(x => x['success']),
        map(x => x['data']['recent_topics']),
      );
  }
}
