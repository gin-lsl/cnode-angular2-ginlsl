import { HttpClient } from '@angular/common/http';
import { Recent } from '../../../model/recent';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { UserAuthService } from '../../../service/subjects/user-auth.service';

@Component({
  selector: 'app-my-topic',
  templateUrl: './my-topic.component.html',
  styleUrls: ['./my-topic.component.styl']
})
export class MyTopicComponent implements OnInit {

  private myRecentTopicList: Recent[];

  private errorMsg: string;

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
        .switchMap(res => this._http.get(this._configService.getUserDetail() + res.json().loginname/*'alsotang'*/))
        .subscribe(res => { this.myRecentTopicList = res.json().data.recent_topics }, err => this.errorMsg = err);
    }
  }

}
