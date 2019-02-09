import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { Route, RouterModule } from '@angular/router';
import { UserDetailRepliesComponent } from './user-detail-replies/user-detail-replies.component';
import { UserDetailTopicsComponent } from './user-detail-topics/user-detail-topics.component';
import { UserDetailMainComponent } from './user-detail-main/user-detail-main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'user/:loginname/replies', component: UserDetailRepliesComponent },
      { path: 'user/:loginname/topics', component: UserDetailTopicsComponent },
      { path: 'user/:loginname', component: UserDetailMainComponent },
    ]),
  ],
  declarations: [
    UserDetailRepliesComponent,
    UserDetailTopicsComponent,
    UserDetailMainComponent,
  ]
})
export class UserDetailModule { }
