import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { ActivatedRoute, Params } from '@angular/router';


import { UserAuthService } from '../../../service/subjects/user-auth.service';
import { Observable } from "rxjs";
import { Topic } from '../../../model/topic';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.styl']
})
export class FavoriteComponent implements OnInit {

  private userFavoriteUri: string;

  userLoginName: string;

  collectTopicList: Topic[];

  constructor(
    private _http: HttpClient,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
    private _userAuthService: UserAuthService,
  ) {
    this.userFavoriteUri = _configService.getTopicListForUserCollected();
  }

  private initLoginName(): Observable<string> {
    return this._activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          let _loginName = params['loginname'];
          if (_loginName == null) {
            let _at = this._userAuthService.checkHasLocalStorageOrNot();
            return this._http.post(this._configService.userValidAPI(), { accesstoken: _at })
              .pipe(
                map(resUser => {
                  if (resUser['success']) {
                    return resUser['loginname'];
                  }
                })
              )
          } else {
            return _loginName;
          }
        }),
      );
  }

  ngOnInit() {
    this.initLoginName().subscribe(_loginname => {
      this._http.get(this._configService.getTopicListForUserCollected() + _loginname).subscribe(x => {
        if (x['success']) {
          this.collectTopicList = x['data'];
        }
      });
    });
  }

}
