import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { HttpBaseService } from '../../../service/base/http-base.service';
import { ConfigService } from '../../../service/config.service';
import { Topic } from '../../../model/topic';
import { Dto } from '../../../model/dto';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  /**
   * 页面所需数据是否加载完成
   */
  private dataLoadFinish: boolean = false;

  /**
   * 查询参数： 标签 tab
   *
   * tab=?
   */
  private tab: string;

  /**
   * 话题列表
   */
  private topicList: Topic[];

  /**
   * topics 的api接口
   */
  private topicDetailUrl: string;

  /**
   * 错误消息
   */
  private errorMsg: string;

  /**
   * 分页用数据
   */
  public totalItems: number = 64;

  /**
   * 页面查询参数 && 分页所需数据，当前页
   *
   * page=?
   */
  public currentPage: number = 1;

  public smallnumPages: number = 0;

  /**
   * 分页用数据 最大显示的页数
   */
  public maxSize: number = 5;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _configService: ConfigService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.topicDetailUrl = _configService.getTopicDetail();
  }

  ngOnInit() {
    this.loadTopicList();
  }

  /**
   * 加载页面的参数（可选参数）
   */
  initCurrentPage_TabAnd_Page(): Observable<Topic[]> {
    return this._activatedRoute.queryParams.switchMap(_params$ => {
      this.tab = _params$['tab'];
      let _page = _params$['page'];
      if (_page != null) {
        this.currentPage = +_page;
      } else {
        this.currentPage = 1;
      }
      return this.loadTopicListData();
    });
  }

  /**
   * 请求页面的数据，返回 Observable 对象，需要订阅才真正执行
   */
  loadTopicListData(): Observable<Topic[]> {
    let _params = new HttpParams();
    _params.append('tab', this.tab);
    if (this.currentPage != null) {
      _params.append('page', '' + this.currentPage)
    }
    return this._http.get(this._configService.getTopics(), { params: _params })
      .filter(_ => _.ok)
      .map(_ => _.json())
      .filter(_ => _.success)
      .map(_ => _.data as Topic[]);
  }

  /**
   * 对获取数据的方法返回的 Observable 对象订阅并处理结果
   */
  loadTopicList() {
    this.initCurrentPage_TabAnd_Page().subscribe(_ => { this.topicList = _; this.dataLoadFinish = true; });
  }

  /**
   * 切换页
   *
   * @param event 分页组件传入的参数，{ page: '变换到的页数', itemsPerPage: ''}
   */
  goAnotherPage(event) {
    this._router.navigate(['/home'], { queryParams: { tab: this.tab, page: event.page } });
  }

}
