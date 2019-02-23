import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfigService } from '../../../service/config.service';
import { UserAuthService } from '../../../service/subjects/user-auth.service';
import { User } from '../../../model/user';
import { Topic } from '../../../model/topic';
import { Recent } from '../../../model/recent';
import { Observable, of, pipe } from 'rxjs';

import 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap, filter, map } from 'rxjs/operators';

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

  userDetail: User;

  private userDetailUri: string;

  myRecentReplyList: Recent[];

  type: string = 'to_me';

  private userAccessToken: string;

  userLoginName: string;

  errorMsg: string;

  replyToMeHasNotRead: any[];

  replyToMeHasRead: any[];

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
    private _userAuthService: UserAuthService,
    private _domSanitizer: DomSanitizer,
  ) {
    this.userDetailUri = _configService.getUserDetail();
  }

  private initUserLoginName(): Observable<string> {
    return this.checkUserIsLoginOrNot()
      .pipe(
        switchMap(x => this._httpClient.post(this._configService.userValidAPI(), {accessToken: x})),
        filter(x => x['success']),
        map(x => x['loginname']),
      );
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
    return this._activatedRoute.params
      .pipe(
        switchMap(x => {
          this.type = x['type'];
          return of(x['type']);
        }),
      );
  }

  loadMessages_HasRead() {

  }

  loadMessages_NotHasRead() {

  }

  loadMessageListToMe(accessToken: string): Observable<any> {
    let _params = new HttpParams();
    _params.append('accesstoken', accessToken);
    _params.append('mdrender', 'false');
    return this._httpClient.get(this._configService.getMessages(), {params: _params});
  }

  loadMessageListToOtherOne(loginname: string): Observable<any> {
    return this._httpClient.get(this._configService.getUserDetail() + loginname);
  }

  loadData() {
    this.initParams().subscribe(_ => {
      if (_ == 'to_me_has_read') {
        this.checkUserIsLoginOrNot()
          .pipe(
            switchMap(x => this.loadMessageListToMe(x)),
            filter(x => x['success']),
          )
          .subscribe(x => this.replyToMeHasRead = x['data']['has_read_messages']);
      } else if (_ == 'to_me_has_not_read') {
        this.checkUserIsLoginOrNot()
          .pipe(
            switchMap(x => this.loadMessageListToMe(x)),
            filter(x => x['success']),
          )
          .subscribe(x => this.replyToMeHasNotRead = x['data']['hasnot_read_messages']);
      } else if (_ == 'to_other') {
        this.initUserLoginName()
          .pipe(
            switchMap(x => this.loadMessageListToOtherOne(x)),
            filter(x => x['success']),
          )
          .subscribe(x => this.myRecentReplyList = x['data']['recent_replies']);
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
