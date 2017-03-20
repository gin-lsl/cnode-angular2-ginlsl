import { Component, OnInit } from '@angular/core';
import { AppBarButtonTappedService } from '../../../../service/subjects/app-bar-button-tapped.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  private isMenuPaneOpen: boolean = true;

  constructor(
    private _appBarButtonTappedService: AppBarButtonTappedService,
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.isMenuPaneOpen = !this.isMenuPaneOpen;
    this._appBarButtonTappedService.nextAppBarButtonTapped(this.isMenuPaneOpen);
  }

}
