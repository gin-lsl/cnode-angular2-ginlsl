import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.styl']
})
export class TopicDetailComponent implements OnInit {

  private topicId: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => this.topicId = params['id']);
  }

}
