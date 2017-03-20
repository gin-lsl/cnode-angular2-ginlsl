import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { UserAuthService } from '../../../service/subjects/user-auth.service';
import { Observable } from "rxjs/Observable";
import { URLSearchParams } from '@angular//http';
import { Topic } from '../../../model/topic';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  private userFavoriteUri: string;

  private userLoginName: string;

  private collectTopicList: Topic[];

  constructor(
    private _http: Http,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
    private _userAuthService: UserAuthService,
  ) {
    this.userFavoriteUri = _configService.getTopicListForUserCollected();
  }

  private initLoginName(): Observable<string> {
    return this._activatedRoute.params.switchMap((params: Params) => {
      let _loginName = params['loginname'];
      if (_loginName == null) {
        let _at = this._userAuthService.checkHasLocalStorageOrNot();
        return this._http.post(this._configService.userValidAPI(), { accesstoken: _at }).map(resUser => {
          if (resUser.ok) {
            let _json = resUser.json();
            if (_json.success) {
              return _json.loginname;
            }
          }
        })
      } else {
        return _loginName;
      }
    });
  }

  ngOnInit() {
    this.initLoginName().subscribe(_loginname => {
      this._http.get(this._configService.getTopicListForUserCollected() + _loginname).subscribe(x => {
        if (x.ok) {
          this.collectTopicList = x.json().data;
        }
      });
    });
  }

}
