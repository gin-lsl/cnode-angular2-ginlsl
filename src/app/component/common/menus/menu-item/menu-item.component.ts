import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../../../model/menu-item';
import { AppBarButtonTappedService } from '../../../../service/subjects/app-bar-button-tapped.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  private isMenuPaneOpen: boolean = true;

  @Input()
  private menuItemObj: MenuItem;

  constructor(
    private _appBarButtonTappedService: AppBarButtonTappedService,
  ) {
    _appBarButtonTappedService.appBarButtonTapped$.subscribe(x => this.isMenuPaneOpen = x);
  }

  ngOnInit() {
  }

}
