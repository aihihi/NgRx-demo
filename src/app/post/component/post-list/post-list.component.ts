import { getAllPosts } from '../../../post/store/post.selectors';
import { postActionTypes } from '../../store/post.actions';
import { AppState } from '../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../model/post.model';
import { PostService } from '../../../post/services/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Update } from '@ngrx/entity';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
// import { DialogPost } from '../dialog/dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postList$: Observable<Post[]>;

  postToBeUpdated: Post;

  isUpdateActivated = false;

  constructor(private postService: PostService, private store: Store<AppState>, private router: Router, public dialog: MatDialog) { 
  }

  ngOnInit() {
    this.postList$ = this.store.select(getAllPosts);
  }

  deletePost(postId: string) {
    this.store.dispatch(postActionTypes.deletePost({postId}));
  }

  goToUpdatePage(post: Post) {
    this.router.navigateByUrl('/update-post', { state: post });
  }

  goToAddNewPage() {
    this.router.navigate(['/create-post']);
  }
}
  
