import { Post } from './../../model/post.model';
import { isSuccessfullySaved, prevSaveStatus, arePostsLoaded, getAllPosts } from '../../../post/store/post.selectors';

// import { createPost } from './../../store/post.actions';
import { postActionTypes } from '../../store/post.actions';
import { AppState } from './../../../store/reducers/index';
import { Component, OnChanges, OnInit, OnDestroy, SimpleChange, AfterViewChecked, AfterViewInit, } from '@angular/core';
// import * as uuid from 'uuid';
import { Update } from '@ngrx/entity';
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogPost } from '../dialog/dialog.component';
import {select, Store} from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy{

  constructor(private store: Store<AppState>, private location: Location, private router: Router, public dialog: MatDialog) {
    // this.todo$ = store.pipe(select('saveStatus'))
   }
  postToBeUpdated: Post;
  dialogTitle: String;
  dialogContent: String;
  current$: boolean;
  prev$: boolean;
  
  // current$: Observable<Boolean>
  // prev$: Observable<Boolean>
  postList$: Observable<Post[]>;
  ngOnInit() {
    this.postToBeUpdated = <Post>this.location.getState();
   
    this.store.select(isSuccessfullySaved).subscribe(res => this.current$ = res);
    this.store.select(prevSaveStatus).subscribe(res => this.prev$ = res);;
    if (this.current$ && !this.prev$) {
      this.store.dispatch(postActionTypes.saveStatus({status: false}));

      this.openDialog();

    }
  }

  ngAfterViewInit() {
    
    // console.log('aihihi')
    
  }

  ngAfterViewChecked() {
    // this.store.select(isSuccessfullySaved).subscribe(res => this.current$ = res);
    // this.store.select(prevSaveStatus).subscribe(res => this.prev$ = res);;
    // if (this.current$ && !this.prev$) {
    //   this.store.dispatch(postActionTypes.saveStatus({status: false}));

    //   this.openDialog();

    // }
    // if (this.store.select(isSuccessfullySaved) && !this.store.select(prevSaveStatus)) {
    //   this.openDialog();
    // }
  }

  ngOnDestroy() {
    this.store.dispatch(postActionTypes.saveStatus({status: false}));
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: "Update Post",
      content: "Successfully Updated",
    }
    const dialogRef = this.dialog.open(DialogPost, dialogConfig);
  }
  

  updatePost(updateForm) {
    const update: Update<Post> = {
    id: this.postToBeUpdated.id,
    changes: {
        ...this.postToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(postActionTypes.updatePost({update}));
    // this.openDialog();
    // this.isUpdateActivated = false;
    // this.postToBeUpdated = null;
  }

    backToList() {
      this.router.navigateByUrl('/posts');
    }
}

