import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigService } from '../../service/config.service';
import { Recent } from '../../model/recent';
import { filter, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-detail-replies',
  templateUrl: './user-detail-replies.component.html',
  styleUrls: ['./user-detail-replies.component.styl']
})
export class UserDetailRepliesComponent implements OnInit {

  recentReplyList$: Observable<Recent[]>;

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadReplyList();
  }

  initParams(): Observable<string> {
    return this._activatedRoute.params
      .pipe(
        filter(x => x['loginname']),
        map(x => x['loginname']),
      );
  }

  loadReplyList() {
    this.recentReplyList$ = this.initParams()
      .pipe(
        switchMap(x => this._httpClient.get(this._configService.getUserDetail() + x)),
        filter(x => x['success']),
        map(x => x['data']['recent_replies']),
      );
      // .switchMap(_ => this._http.get(this._configService.getUserDetail() + _))
      // .filter(_ => _.ok)
      // .map(_ => _.json())
      // .filter(_ => _.success)
      // .map(_ => _.data.recent_replies)
      // .subscribe(_ => this.recentReplyList = _);
  }

}
