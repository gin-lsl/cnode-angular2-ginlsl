import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../../../model/menu-item';
import { AppBarButtonTappedService } from '../../../../service/subjects/app-bar-button-tapped.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.styl']
})
export class MenuItemComponent implements OnInit {

  isMenuPaneOpen: boolean = true;

  @Input()
  menuItemObj: MenuItem;

  constructor(
    private _appBarButtonTappedService: AppBarButtonTappedService,
  ) {
    _appBarButtonTappedService.appBarButtonTapped$.subscribe(x => this.isMenuPaneOpen = x);
  }

  ngOnInit() {
  }

}
