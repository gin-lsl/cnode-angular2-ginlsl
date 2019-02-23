import { Component, OnInit } from '@angular/core';
import { AppBarButtonTappedService } from '../../../../service/subjects/app-bar-button-tapped.service';

@Component({
  selector: 'app-split-view',
  templateUrl: './split-view.component.html',
  styleUrls: ['./split-view.component.styl']
})
export class SplitViewComponent implements OnInit {

  isMenuPaneOpen: boolean = true;

  constructor(
    private _appBarButtonTappedService: AppBarButtonTappedService,
  ) {
    _appBarButtonTappedService.appBarButtonTapped$.subscribe(x => this.isMenuPaneOpen = x);
  }

  ngOnInit() {
  }

}
