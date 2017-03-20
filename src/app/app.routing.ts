import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './component/page/home/home.component';
import { TopicComponent } from './component/page/topic/topic.component';
import { AboutComponent } from './component/page/about/about.component';
import { MenuComponent } from './component/common/menus/menu/menu.component';
import { SettingComponent } from './component/page/setting/setting.component';
import { CommentComponent } from './component/page/comment/comment.component';
import { TopNavComponent } from './component/common/top-nav/top-nav.component';
import { FavoriteComponent } from './component/page/favorite/favorite.component';
import { MenuItemComponent } from './component/common/menus/menu-item/menu-item.component';
import { SearchResultComponent } from './component/page/search-result/search-result.component';
import { MenuHeaderComponent } from './component/common/menus/menu-header/menu-header.component';
import { NotFoundPageComponent } from './component/page/not-found-page/not-found-page.component';
import { SplitViewComponent } from './component/common/split-views/split-view/split-view.component';
import { SplitViewPaneComponent } from './component/common/split-views/split-view-pane/split-view-pane.component';
import { SplitViewContentComponent } from './component/common/split-views/split-view-content/split-view-content.component';
import { MyTopicComponent } from './component/page/my-topic/my-topic.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'topic', component: MyTopicComponent },
  { path: 'topic/:id', component: TopicComponent },
  { path: 'about', component: AboutComponent },
  { path: 'comment/:type', component: CommentComponent },
  { path: 'comment', redirectTo: 'comment/to_other', pathMatch: 'full' },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'search', component: SearchResultComponent },
  { path: '**', component: NotFoundPageComponent },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
