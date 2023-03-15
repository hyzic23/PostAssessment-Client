import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDetail } from '../shared/post-detail.model';

//https://localhost:7261/PostAssessment/Posts?tag=tech&sortBy=id&direction=asc'
const postUrl = 'https://localhost:7261/PostAssessment/Posts?';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAll(tag: string, sortBy: string, direction: string): Observable<any[]>{
    const getPostUrl = postUrl+'tag='+tag+'&sortBy='+sortBy+'&direction='+direction;
    return this.http.get<any[]>(getPostUrl);
  }

}
