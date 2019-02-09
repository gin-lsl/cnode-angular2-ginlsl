import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { User } from '../../../model/user';
import { Dto } from '../../../model/dto';
import { UserAuthService } from '../../../service/subjects/user-auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.styl']
})
export class SettingComponent implements OnInit {

  private userDetailUri: string;

  private userDetail: User;

  private validationUri: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _configService: ConfigService,
    private _userAuthService: UserAuthService,
  ) {
    this.userDetailUri = this._configService.getUserDetail();
    this.validationUri = this._configService.userValidAPI();
  }

  ngOnInit() {
    let _at = this._userAuthService.checkHasLocalStorageOrNot()
    if (_at != null) {
      // 在本地存储有 accessToken
      // 通过 accessToken 验证用户
      this.doValidateAccessToken(_at);
    } else {
      // 在本地没有存储 accessToken
      this.userDetail = null;
    }
  }

  doValidateAccessToken(accessToken: string) {
    this._http.post(this.validationUri, { accesstoken: accessToken }).subscribe(res => {
      if (!res.ok) {
        // 认证失败
        this._userAuthService.resetAccessToken();
        this.userDetail = null;
      } else {
        // 认证成功
        let _json = res.json();
        if (_json.success) {
          // 加载用户信息
          let loginname = _json.loginname;
          this._http.get(this.userDetailUri + loginname).subscribe(resUser => {
            let _jsonUser = resUser.json();
            if (!_jsonUser) {
              throw new Error('请求失败, 请稍后重试...');
            } else {
              this.userDetail = _jsonUser.data;
              this._userAuthService.setAccessTokenToLocalStorage(accessToken);
            }
          });
        }
      }
    });
  }

  submitForm(val: string) {
    // 验证 accessToken
    this.doValidateAccessToken(val);
  }

}
