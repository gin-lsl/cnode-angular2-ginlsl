import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from '../../../service/config.service';
import { UserAuthService } from '../../../service/subjects/user-auth.service';

import { Dto } from '../../../model/dto';
import { TopicDetail } from '../../../model/topic-detail';



import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.styl']
})
export class TopicComponent implements OnInit {
  topicId: string;

  topicDetail: TopicDetail;

  topicDetailUrl: string;

  userAccessToken: string;

  constructor(
    private _http: HttpClient,
    private _domSanitizer: DomSanitizer,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
    private _userAuthService: UserAuthService,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.topicId = params['id'];
      this.checkUserIsLoginOrNot();
      this.topicDetailUrl = this._configService.getTopicDetail() + this.topicId;
      this.loadTopicDetail()
        .subscribe(_topic => this.topicDetail = _topic, err => console.log(err));
    });
  }

  /**
   * 返回 TopicDetail 的 Observable
   *
   * @returns 帖子详细信息，包括内容和回复
   */
  loadTopicDetail(): Observable<TopicDetail> {
    let _params = new HttpParams();
    _params.append('accesstoken', this.userAccessToken);
    return this._http.get(this.topicDetailUrl, { params: _params })
      .pipe(
        filter(_ => _['success']),
        map(_ => _['data'] as TopicDetail),
      )
    // .subscribe(_ => this.topicDetail.replies = _.replies);
  }

  checkUserIsLoginOrNot() {
    this.userAccessToken = this._userAuthService.checkHasLocalStorageOrNot()
  }

  convertToHtml(oldStr: string): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(oldStr);
  }

  toggleFavoriteTopic(wannaFavorite: boolean) {
    if (this.userAccessToken != null) {
      let wannaUrl = wannaFavorite ? this._configService.userDoFavoriteTopic() : this._configService.userDoDeFavoriteTopic();
      this._http.post(wannaUrl, { accesstoken: this.userAccessToken, topic_id: this.topicId })
        .subscribe(res => {
          if (res['success']) {
            this.topicDetail.is_collect = wannaFavorite;
          }
        });
    }
  }

  submitReply(replyContent: string) {
    if (this.userAccessToken != null) {
      let _postReplyUri = this._configService.postReplyInTopic(this.topicId);
      this._http.post(_postReplyUri, { accesstoken: this.userAccessToken, content: replyContent })
        .pipe(
          filter(_ => _['success']),
          map(_ => _['reply_id']),
          switchMap(_ => this.loadTopicDetail()),
        )
        .subscribe(_ => this.topicDetail.replies = _.replies);
    }
  }

  toggleReplyBox(replyBox: HTMLDivElement) {
    replyBox.classList.toggle('active_reply_box');
  }

  replyToSb(replyId: string, replyContent: string) {
    console.log(replyId);
    console.log(replyContent);
    // if (this.userAccessToken != null) {
    //   let _postReplyToSbUri = this._configService.postReplyInTopic(this.topicId);
    //   this._http
    //     .post(_postReplyToSbUri, { accesstoken: this.userAccessToken, content: replyContent, reply_id: replyId })
    //     .subscribe(res => console.log(res));
    // }
  }

  upOrDownReply(replyId: string, replyIndex: number) {
    if (this.userAccessToken != null) {
      this._http
        .post(this._configService.upOrDownReply(replyId), { accesstoken: this.userAccessToken })
        .pipe(
          filter(_ => _['success']),
          map(_ => _['action']),
        )
        .subscribe(_ => {
          // up | down
          if (_ == 'up') {
            this.topicDetail.replies[replyIndex].ups.push({});
          } else {
            this.topicDetail.replies[replyIndex].ups.pop();
          }
        });
    }
  }

}
