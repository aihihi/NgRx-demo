import { postActionTypes } from './post.actions';
import { PostService } from './../services/post.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, mergeMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { DialogPost } from '../component/dialog/dialog.component';

@Injectable()
export class PostEffects {

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActionTypes.loadPosts),
      mergeMap(() => this.postService.getAllPost()),
      map(posts => postActionTypes.postsLoaded({posts}))
    )
  );
  

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActionTypes.createPost),
      concatMap((action) => this.postService.createPost(action.post)),
      map(posts => {
        this.openDialog("Create Post", "Successfully create new post");
        return postActionTypes.saveStatus({status: true});
      })
    ),
    // {dispatch: false}
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActionTypes.deletePost),
      concatMap((action) => this.postService.deletePost(action.postId)),
      map(() => {
        this.openDialog("Delete Post", "Successfully deleted");
      })
    ),
    {dispatch: false}
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActionTypes.updatePost),
      concatMap((action) => this.postService.updatePost(action.update.id, action.update.changes)),
      map(posts => {
        this.openDialog("Update Post", "Successfully updated");
        return postActionTypes.saveStatus({status: true});
      })
    ),
    // {dispatch: false}
  );

  openDialog(title, content) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title,
      content,
    }
    const dialogRef = this.dialog.open(DialogPost, dialogConfig);
  }
  constructor(private postService: PostService, private actions$: Actions, private router: Router, public dialog: MatDialog) {}
}
