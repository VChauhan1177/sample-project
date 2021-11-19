import { Component, OnInit, ViewChild } from '@angular/core';
import { BookDetailsService } from 'src/app/services/book-details.service';
import { Book } from 'src/app/models/book';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public displayedColumns = ['title', 'author', 'price', 'action'];
  booksData: Book;
  public dataSource = new MatTableDataSource<Book>();
  isEditMode = false;
  @ViewChild('bookDetailsForm') bookDetailsForm: any;
  constructor(public bookDetailsService: BookDetailsService, public formBuilder: FormBuilder) {
    this.booksData = {} as Book;
  }

  ngOnInit() {
    this.bookDetailsService.getBooksList().subscribe(data => {
      this.dataSource.data = data;
    })
  }

  onSubmit(values: any) {
    this.bookDetailsService.createBookInfo(values).subscribe((response: any) => {
      this.dataSource.data.push({ ...response })
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      })
    });
    this.bookDetailsForm.resetForm();
  }

  deleteItem(id: any) {
    this.bookDetailsService.deleteBookInfo(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Book) => {
        return o.id !== id ? o : false;
      })
    });
  }

  editDetails(values: any) {
    this.booksData = values;
    this.isEditMode = true;
  }

  updateBookDetails() {
    this.bookDetailsService.updateBookInfo(this.booksData.id, this.booksData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Book) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      })
    });
    this.bookDetailsForm.resetForm();
    this.isEditMode = false;
  }
}
