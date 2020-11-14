// import { Post } from '../model/post.model';
import { Post } from '../model/post.model';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';

export const loadPosts = createAction(
  '[Post List] Load Post via Service',
);

export const postsLoaded = createAction(
  '[Post Effect] Post Loaded Successfully',
  props<{posts: Post[]}>()
);
export const saveStatus = createAction(
  '[Successfully Saved Post Effect] Successfully Saved a Post',
  props<{status: boolean}>()
);

export const createPost = createAction(
  '[Create Post Component] Create Post',
  props<{post: Post}>()
);

export const deletePost = createAction(
  '[Post List Operations] Delete Post',
  props<{postId: string}>()
);

export const updatePost = createAction(
  '[Post List Operations] Update Post',
  props<{update: Update<Post>}>()
);

export const postActionTypes = {
  loadPosts,
  postsLoaded,
  saveStatus,
  createPost,
  deletePost,
  updatePost
};


