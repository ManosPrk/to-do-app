import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IToDoItem } from './to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {
  itemUrl: string = 'api/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<IToDoItem[]> {
    return this.http.get<IToDoItem[]>(this.itemUrl)
      .pipe(
        catchError(this.handleError),
      );
  }

  addItem(item: IToDoItem): Observable<IToDoItem> {
    return this.http.post<IToDoItem>(this.itemUrl, item)
      .pipe(
        catchError(this.handleError),
      );
  }

  updateItem(item: IToDoItem): Observable<IToDoItem> {
    return this.http.patch<IToDoItem>(`${this.itemUrl}/${item.id}`, item)
      .pipe(
        catchError(this.handleError),
      );
  }

  deleteItem(itemId: number): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(`${this.itemUrl}/${itemId}`)
      .pipe(
        catchError(this.handleError),
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
