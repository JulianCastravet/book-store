import { Component, OnInit } from '@angular/core';
import { BookWithPrefered } from 'src/app/modules/books/models/product';
import { BookService } from 'src/app/modules/books/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public bookList!: BookWithPrefered[];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService
      .getPreferedBooks()
      .subscribe((books) => (this.bookList = books));
  }
  toggleBook(book: BookWithPrefered) {
    this.bookService.toggleBook(book);
  }
}
