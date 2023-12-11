import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { BookService } from '../../services';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BookWithPrefered } from '../../models/product';
import { Store, Select } from '@ngxs/store';
import {
  GetBooksFromAPIAction,
  ToggleBookAction,
} from '../../Store/book-actions';
import { BookState } from '../../Store/book-state';
import { BookSelectors } from '../../Store/book-selectors';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  protected unsubscribe$: Subject<void> = new Subject();
  public booksList: BookWithPrefered[] = [];
  @Select(BookSelectors.bookSelector) bookSelector$!: Observable<
    BookWithPrefered[]
  >;
  selectedBy = '';
  input = '';
  disabled = false;
  selectBestSeller = 'all';
  title = this.route.snapshot.queryParams['aOt'];
  name = this.route.snapshot.queryParams['name'];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private store$: Store
  ) {
    this.selectedBy = 'all';
    this.disabled = true;
    this.store$.dispatch(new GetBooksFromAPIAction());
  }

  ngOnInit() {
    if (!this.title || !this.name) {
      // this.store$
      //   .dispatch(new GetBooksFromAPIAction())
      //   .subscribe((data) => (this.booksList = data.BookStore.books));
      this.bookSelector$.subscribe((data) => (this.booksList = data));
    } else {
      this.bookService
        .searchBooksWithBetterParams(this.title, this.name)
        .subscribe((data) => {
          this.bookService.setBooks(data);
          this.booksList = data;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  togglePreference(book: BookWithPrefered) {
    // this.bookService.toggleBook(book);
    this.store$.dispatch(new ToggleBookAction(book));
  }

  changeFirstSelect(e?: MatSelectChange): string {
    this.input = '';
    if (e?.value !== 'all') {
      this.disabled = false;
    } else {
      this.disabled = !this.disabled;
    }
    this.bookService.getAllBooks().subscribe((data) => (this.booksList = data));

    return (this.selectedBy = e?.value);
  }

  changeSecondSelect(e?: MatSelectChange) {
    of(e?.value).subscribe(() => {
      switch (e?.value) {
        case 'all':
          return this.bookService
            .getAllBooks()
            .subscribe((b) => (this.booksList = b));

        case 'bestSeller':
          return this.bookService
            .getAllBestSellerBooks()
            .subscribe((books) => (this.booksList = books));
        case 'notBestSeller':
          return this.bookService
            .getNotAllBestSellerBooks()
            .subscribe((books) => (this.booksList = books));
        default:
          return [];
      }
    });
  }

  //@ts-ignore
  findBook(e: any) {
    this.input = e;
    of(e)
      .pipe(
        switchMap((value: string) => {
          switch (this.selectedBy) {
            case 'all':
              return this.bookService.getAllBooks();
            case 'author':
              return this.bookService.searchBookByAuthor(value);
            case 'title':
              return this.bookService.searchBookByTitle(value);
            case 'genre':
              return this.bookService.searchBookByGenre(value);
            default:
              return of([]);
          }
        })
      )
      .subscribe((books) => (this.booksList = books));
  }
}
