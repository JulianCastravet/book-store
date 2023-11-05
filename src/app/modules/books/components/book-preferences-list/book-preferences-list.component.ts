import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services';
import { Book } from '../../models';
import { BookWithPrefered } from '../../models/product';

@Component({
  selector: 'app-book-preferences-list',
  templateUrl: './book-preferences-list.component.html',
  styleUrls: ['./book-preferences-list.component.scss'],
})
export class BookPreferencesListComponent implements OnInit {
  protected preferedBooksCount: number = 0;
  protected preferedBooks: BookWithPrefered[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getPreferedBooks().subscribe((books) => {
      this.preferedBooksCount = books!.length;
      this.preferedBooks = books;
    });
  }

  deleteBookFromDD(book: Book, event: any) {
    event.stopPropagation();
    this.bookService.removeBook(book);
  }
}
