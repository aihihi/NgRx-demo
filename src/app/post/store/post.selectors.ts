import { PostState } from './post.reducers';
import { Post } from '../../post/model/post.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './post.reducers';

export const postFeatureSelector = createFeatureSelector<PostState>('posts');

// export const selectPostState = (state: PostState) => state;
export const getAllPosts = createSelector(
  postFeatureSelector,
  selectAll
);

export const arePostsLoaded = createSelector(
  postFeatureSelector,
  state => state.postsLoaded
);

export const isSuccessfullySaved = createSelector(
  postFeatureSelector,
  state => state.saveStatus
);
export const prevSaveStatus = createSelector(
  postFeatureSelector,
  state => state.prevSaveStatus
);



