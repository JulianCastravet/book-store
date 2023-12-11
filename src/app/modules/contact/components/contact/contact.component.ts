import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { BookWithPrefered } from 'src/app/modules/books/models/product';
import { BookService } from 'src/app/modules/books/services';
import { ToggleBookAction } from 'src/app/modules/books/Store/book-actions';
import { BookSelectors } from 'src/app/modules/books/Store/book-selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public bookList!: BookWithPrefered[];
  constructor(private bookService: BookService, private store$: Store) {}
  @Select([BookSelectors.preferedBookSelector]) preferedBooks$!: Observable<
    BookWithPrefered[]
  >;
  ngOnInit(): void {
    // this.preferedBooks$.subscribe((books) => console.log(books));
  }
  toggleBook(book: BookWithPrefered) {
    // this.store$.dispatch(new ToggleBookAction(book)).subscribe();
  }
}
