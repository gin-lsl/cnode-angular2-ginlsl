import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { Observable } from 'rxjs';

import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-detail-main',
  templateUrl: './user-detail-main.component.html',
  styleUrls: ['./user-detail-main.component.styl']
})
export class UserDetailMainComponent implements OnInit {

  private loginname: string;

  private userDetail: User;

  constructor(
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _configService: ConfigService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  initParams(): Observable<string> {
    return this._activatedRoute.params.switchMap(x => Observable.of(x['loginname']));
  }

  loadUserDetail(): Observable<any> {
    return this.initParams().switchMap(x => this._http.get(this._configService.getUserDetail() + x)).filter(x => x.ok).map(x => x.json());
  }

  loadData() {
    this.loadUserDetail().filter(x => x.success).subscribe(x => this.userDetail = x.data);
  }

}
