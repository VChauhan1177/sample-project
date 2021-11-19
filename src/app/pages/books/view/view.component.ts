import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Book } from 'src/app/models/book';
import { BookDetailsService } from 'src/app/services/book-details.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  readData: Book;
  constructor(private route: ActivatedRoute, public bookDetailsService: BookDetailsService) { this.readData = {} as Book; }

  ngOnInit(): void {
    this.bookDetailsService.getBook(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      this.readData = response;
    });
  }
}
