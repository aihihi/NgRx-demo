import { PostEffects } from './store/post.effects';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PostListComponent } from './component/post-list/post-list.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { UpdatePostComponent } from './component/update-post/update-post.component';
import { DialogPost } from './component/dialog/dialog.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postReducer } from './store/post.reducers';
import { PostService } from './services/post.service';
import { MaterialModule } from '../material-module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from '../store/reducers';


@NgModule({
  declarations: [
    PostListComponent,
    CreatePostComponent,
    UpdatePostComponent,
    DialogPost,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forFeature([PostEffects]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    MaterialModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),

  ],
  providers: [PostService],
  bootstrap: [],
  exports: [PostListComponent, MaterialModule, DialogPost]
})
export class PostModule { }
