import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post/component/post-list/post-list.component';
import { CreatePostComponent } from './post/component/create-post/create-post.component';
import { UpdatePostComponent } from './post/component/update-post/update-post.component';
import { PostResolver } from './post/post.resolver';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
    resolve: {
      posts: PostResolver
    }
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    
  },
  {
    path: 'update-post',
    component: UpdatePostComponent,
    
  },
  {path: '**', redirectTo: 'posts'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PostResolver],
})
export class AppRoutingModule { }
