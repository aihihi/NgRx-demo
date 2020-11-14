import { Post } from './../../model/post.model';
import { createPost } from './../../store/post.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import {Router} from "@angular/router";
import { DialogPost } from '../dialog/dialog.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }

    const post: Post = {id: uuid.v4(), title: submittedForm.value.title, body: submittedForm.value.body, userId: "11" };
    this.store.dispatch(createPost({post}));
  }

  backToList() {
    this.router.navigateByUrl('/posts');
  }
}
