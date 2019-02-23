import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { Observable, of, Subscription } from 'rxjs';

import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail-main',
  templateUrl: './user-detail-main.component.html',
  styleUrls: ['./user-detail-main.component.styl']
})
export class UserDetailMainComponent implements OnInit, OnDestroy {

  loginname: string;

  userDetail: User;

  private _userDetailSubscription: Subscription;

  constructor(
    private _httpClient: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _configService: ConfigService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this._userDetailSubscription && this._userDetailSubscription.unsubscribe();
  }

  initParams(): Observable<string> {
    return this._activatedRoute.params
      .pipe(
        switchMap(x => of(x['loginname'])),
      );
  }

  loadUserDetail(): Observable<any> {
    return this.initParams()
      .pipe(
        switchMap(x => this._httpClient.get(this._configService.getUserDetail()+x)),
      );
  }

  loadData() {
    this._userDetailSubscription = this.loadUserDetail()
      .pipe(
        filter(x => x['success']),
      )
      .subscribe(x => this.userDetail = x['data']);
  }

}
