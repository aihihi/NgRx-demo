import { Post } from '../../post/model/post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
const apiRootUrl = 'https://jsonplaceholder.typicode.com';

@Injectable()
export class PostService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${apiRootUrl}/posts`);
  }
  
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${apiRootUrl}/posts`, post);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${apiRootUrl}/posts/${postId}`);
  }

  updatePost(postId: string | number, changes: Partial<Post>): Observable<any> {
    return this.http.put(`${apiRootUrl}/posts/${postId}`, changes);
  }
}
