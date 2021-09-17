import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { IToDoCategory } from './to-do-categories';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ToDoCategoriesService {
  categoryUrl = `${environment.SERVER_URL}/categories`;

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
