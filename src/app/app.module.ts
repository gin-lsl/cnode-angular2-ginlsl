import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { PaginationModule, PaginationComponent } from 'ngx-bootstrap';

import { ConfigService } from './service/config.service';
import { UserAuthService } from './service/subjects/user-auth.service';
import { AppBarButtonTappedService } from './service/subjects/app-bar-button-tapped.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/page/home/home.component';
import { TopicComponent } from './component/page/topic/topic.component';
import { AboutComponent } from './component/page/about/about.component';
import { MenuComponent } from './component/common/menus/menu/menu.component';
import { CommentComponent } from './component/page/comment/comment.component';
import { SettingComponent } from './component/page/setting/setting.component';
import { TopNavComponent } from './component/common/top-nav/top-nav.component';
import { MyTopicComponent } from './component/page/my-topic/my-topic.component';
import { FavoriteComponent } from './component/page/favorite/favorite.component';
import { TopicDetailComponent } from './component/page/topic-detail/topic-detail.component';
import { MenuItemComponent } from './component/common/menus/menu-item/menu-item.component';
import { SearchResultComponent } from './component/page/search-result/search-result.component';
import { MenuHeaderComponent } from './component/common/menus/menu-header/menu-header.component';
import { NotFoundPageComponent } from './component/page/not-found-page/not-found-page.component';
import { SplitViewComponent } from './component/common/split-views/split-view/split-view.component';
import { SplitViewPaneComponent } from './component/common/split-views/split-view-pane/split-view-pane.component';
import { SplitViewContentComponent } from './component/common/split-views/split-view-content/split-view-content.component';
import { UserDetailModule } from './user-detail/user-detail.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    TopicComponent,
    AboutComponent,
    TopNavComponent,
    CommentComponent,
    SettingComponent,
    MyTopicComponent,
    MenuItemComponent,
    FavoriteComponent,
    SplitViewComponent,
    MenuHeaderComponent,
    TopicDetailComponent,
    SearchResultComponent,
    NotFoundPageComponent,
    SplitViewPaneComponent,
    SplitViewContentComponent,
    // PaginationComponent,
  ],
  imports: [
    UserDetailModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    PaginationModule.forRoot(),
  ],
  providers: [
    ConfigService,
    UserAuthService,
    AppBarButtonTappedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
