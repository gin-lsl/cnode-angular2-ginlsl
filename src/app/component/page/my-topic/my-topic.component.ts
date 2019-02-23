import { HttpClient } from '@angular/common/http';
import { Recent } from '../../../model/recent';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { UserAuthService } from '../../../service/subjects/user-auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-topic',
  templateUrl: './my-topic.component.html',
  styleUrls: ['./my-topic.component.styl']
})
export class MyTopicComponent implements OnInit {

  myRecentTopicList: Recent[];

  errorMsg: string;

  constructor(
    private _http: HttpClient,
    private _userAuthService: UserAuthService,
    private _configService: ConfigService,
  ) {

  }

  ngOnInit() {
    let _at = this._userAuthService.checkHasLocalStorageOrNot();
    if (_at != null) {
      this._http
        .post(this._configService.userValidAPI(), { accesstoken: _at })
        .pipe(
          switchMap(res => this._http.get(this._configService.getUserDetail() + res['loginname']/*'alsotang'*/))
        )
        .subscribe(res => { this.myRecentTopicList = res['data']['recent_topics'] }, err => this.errorMsg = err);
    }
  }

}
