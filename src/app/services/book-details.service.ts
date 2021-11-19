import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from '../models/book';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {

  BASE_URL_PATH = 'http://localhost:3000/books'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error occured: ', error.error.message);
    } else {
      `Error ${error.status}, error was: ${error.error}`;
    }
    return throwError('Please try again later.');
  }

  createBookInfo(item: any): Observable<Book> {
    return this.http.post<Book>(this.BASE_URL_PATH, JSON.stringify(item),
      this.httpOptions)
      .pipe(retry(2), catchError(this.handleError)
      )
  }

  getBook(id: any): Observable<Book> {
    return this.http.get<Book>(this.BASE_URL_PATH + '/' + id).pipe(retry(2), catchError(this.handleError))
  }

  getBooksList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.BASE_URL_PATH).pipe(retry(2), catchError(this.handleError))
  }

  updateBookInfo(id: any, item: any): Observable<Book> {
    return this.http.put<Book>(this.BASE_URL_PATH + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  deleteBookInfo(id: any) {
    return this.http.delete<Book>(this.BASE_URL_PATH + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
}
