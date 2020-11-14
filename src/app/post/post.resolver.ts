import { arePostsLoaded } from './store/post.selectors';
import { loadPosts, postsLoaded } from './store/post.actions';
import { AppState } from '../store/reducers/index';
// import { Post } from './model/post.model';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

@Injectable()
export class PostResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(arePostsLoaded),
        tap((postsLoaded) => {
          if (!postsLoaded) {
            this.store.dispatch(loadPosts());
          }

        }),
        filter(postsLoaded => postsLoaded),
        first()
    );
  }
}
