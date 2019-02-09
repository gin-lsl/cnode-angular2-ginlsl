import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/page/home/home.component';
import { MyTopicComponent } from './component/page/my-topic/my-topic.component';
import { TopicComponent } from './component/page/topic/topic.component';
import { AboutComponent } from './component/page/about/about.component';
import { CommentComponent } from './component/page/comment/comment.component';
import { FavoriteComponent } from './component/page/favorite/favorite.component';
import { SettingComponent } from './component/page/setting/setting.component';
import { SearchResultComponent } from './component/page/search-result/search-result.component';
import { NotFoundPageComponent } from './component/page/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'topic',
    component: MyTopicComponent,
  },
  {
    path: 'topic/:id',
    component: TopicComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'comment/:type',
    component: CommentComponent,
  },
  {
    path: 'comment',
    redirectTo: 'comment/to_other',
    pathMatch: 'full',
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
  {
    path: 'search',
    component: SearchResultComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
