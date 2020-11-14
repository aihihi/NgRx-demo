import { Post } from '../../post/model/post.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { postActionTypes } from './post.actions';

export interface PostState extends EntityState<Post> {
  postsLoaded: boolean;
  saveStatus: boolean;
  prevSaveStatus: boolean;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState = adapter.getInitialState({
  postsLoaded: false,
  saveStatus: false,
  prevSaveStatus: false,
});

export const postReducer = createReducer(
  initialState,

  on(postActionTypes.postsLoaded, (state, action) => {
    // console.log(1)
    return adapter.addAll(
      action.posts,
      {...state, postsLoaded: true}
    );
  }),
  on(postActionTypes.saveStatus, (state, {status}) => {
    // console.log(2)
    const prevSaveStatus = false;
    return {...state, prevSaveStatus, saveStatus: status}
  }),

  on(postActionTypes.createPost, (state, action) => {
    const prevSaveStatus = state.saveStatus;
    return adapter.addOne(action.post, 
      {...state,  prevSaveStatus, saveStatus: true});
  }),

  on(postActionTypes.deletePost, (state, action) => {
    const prevSaveStatus = state.saveStatus;
    return adapter.removeOne(action.postId,
      {...state,  prevSaveStatus, saveStatus: true});
  }),

  on(postActionTypes.updatePost, (state, action) => {
    const prevSaveStatus = state.saveStatus;
    return adapter.updateOne(action.update,
      {...state,  prevSaveStatus, saveStatus: true});
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
