import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { IToDoCategory } from './to-do-categories';

@Injectable({
  providedIn: 'root'
})
export class ToDoCategoriesService {
  categoryUrl: string = 'api/categories/categories.json';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<IToDoCategory[]> {
    return this.http.get<IToDoCategory[]>(this.categoryUrl)
      .pipe(
        catchError(this.handleError),
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
