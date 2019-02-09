import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../../model/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private menuItemListddd: MenuItem[] = [
    { index: 0, title: '全部', routerLink: '/all' },
    { index: 1, title: '精华', routerLink: '/good' },
    { index: 2, title: '分享', routerLink: '/share' },
    { index: 3, title: '问答', routerLink: '/ask' },
    { index: 4, title: '招聘', routerLink: '/job' }
  ]

  private menuItemList: MenuItem[] = [
    { index: 0, title: '首页', routerLink: '/home' },
    { index: 1, title: '收藏', routerLink: '/favorite' },
    { index: 2, title: '评论', routerLink: '/comment' },
    { index: 3, title: '主题', routerLink: '/topic' },
    { index: 4, title: '设置', routerLink: '/setting' },
    { index: 5, title: '关于', routerLink: '/about' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
