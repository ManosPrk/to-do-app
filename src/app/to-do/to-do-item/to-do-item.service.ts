import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IToDoItem } from './to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {
  itemUrl: string = 'api/items/items.json';

  constructor(private http: HttpClient) { }

  getItems(): Observable<IToDoItem[]> {
    return this.http.get<IToDoItem[]>(this.itemUrl)
      .pipe(
        catchError(this.handleError),
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
