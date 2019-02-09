import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigService } from '../../service/config.service';
import { Recent } from '../../model/recent';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-user-detail-replies',
  templateUrl: './user-detail-replies.component.html',
  styleUrls: ['./user-detail-replies.component.styl']
})
export class UserDetailRepliesComponent implements OnInit {

  private recentReplyList: Recent[];

  constructor(
    private _http: HttpClient,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadReplyList();
  }

  initParams(): Observable<string> {
    return this._activatedRoute.params.filter(_ => _['loginname']).map(_ => _['loginname']);
  }

  loadReplyList() {
    this.initParams()
      .switchMap(_ => this._http.get(this._configService.getUserDetail() + _))
      .filter(_ => _.ok)
      .map(_ => _.json())
      .filter(_ => _.success)
      .map(_ => _.data.recent_replies)
      .subscribe(_ => this.recentReplyList = _);
  }

}
