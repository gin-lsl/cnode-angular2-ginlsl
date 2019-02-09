import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfigService } from '../../../service/config.service';
import { UserAuthService } from '../../../service/subjects/user-auth.service';
import { User } from '../../../model/user';
import { Topic } from '../../../model/topic';
import { Recent } from '../../../model/recent';
import { Observable } from 'rxjs';

import 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.styl']
})
export class CommentComponent implements OnInit {

  /*
  此页面需要显示
    1 我的评论
    2 别人给我的回复
   */

  private userDetail: User;

  private userDetailUri: string;

  private myRecentReplyList: Recent[];

  private type: string = 'to_me';

  private userAccessToken: string;

  private userLoginName: string;

  private errorMsg: string;

  private replyToMeHasNotRead: any[];

  private replyToMeHasRead: any[];

  constructor(
    private _http: HttpClient,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
    private _userAuthService: UserAuthService,
    private _domSanitizer: DomSanitizer,
  ) {
    this.userDetailUri = _configService.getUserDetail();
  }

  private initUserLoginName(): Observable<string> {
    return this.checkUserIsLoginOrNot().switchMap(_ => {
      return this._http.post(this._configService.userValidAPI(), { accesstoken: _ })
        .filter(_ => _.ok)
        .map(_ => _.json())
        .filter(_ => _.success)
        .map(_ => _.loginname);
    });
  }

  checkUserIsLoginOrNot(): Observable<string> {
    return Observable.create(observer => {
      this.userAccessToken = this._userAuthService.checkHasLocalStorageOrNot()
      if (this.userAccessToken != null) {
        observer.next(this.userAccessToken);
      } else {
        // observer.complete();
        observer.error('没有权限，请登录...');
      }
    });
  }

  initParams(): Observable<string> {
    return this._activatedRoute.params.switchMap(_ => {
      this.type = _['type'];
      return Observable.of(_['type']);
    });
  }

  loadMessages_HasRead() {

  }

  loadMessages_NotHasRead() {

  }

  loadMessageListToMe(accessToken: string): Observable<any> {
    let _params = new URLSearchParams();
    _params.append('accesstoken', accessToken);
    _params.append('mdrender', 'false');
    return this._http.get(this._configService.getMessages(), { search: _params })
      .filter(_ => _.ok).map(_ => _.json());
  }

  loadMessageListToOtherOne(loginname: string): Observable<any> {
    return this._http.get(this._configService.getUserDetail() + loginname)
      .filter(_ => _.ok)
      .map(_ => _.json());
  }

  loadData() {
    this.initParams().subscribe(_ => {
      if (_ == 'to_me_has_read') {
        this.checkUserIsLoginOrNot()
          .switchMap(x => this.loadMessageListToMe(x))
          .filter(x => x.success)
          .subscribe(x => this.replyToMeHasRead = x.data.has_read_messages);
      } else if (_ == 'to_me_has_not_read') {
        this.checkUserIsLoginOrNot()
          .switchMap(x => this.loadMessageListToMe(x))
          .filter(x => x.success)
          .subscribe(x => this.replyToMeHasNotRead = x.data.hasnot_read_messages);
      } else if (_ == 'to_other') {
        this.initUserLoginName()
          .switchMap(x => this.loadMessageListToOtherOne(x))
          .filter(x => x.success)
          .subscribe(x => this.myRecentReplyList = x.data.recent_replies);
      } else {
        // error
      }
    })
  }

  ngOnInit() {
    this.loadData();
  }

  convertToHTML(val: string): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(val);
  }

}
