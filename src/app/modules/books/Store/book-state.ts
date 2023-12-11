import { Observable, pipe } from 'rxjs';
import { Book, BookWithPrefered } from 'src/app/modules/books/models/product';
import { Injectable } from '@angular/core';
import {
  GetBooksFromAPIAction,
  GetPreferedBooks,
  ToggleBookAction,
} from './book-actions';
import { Action, State, StateContext } from '@ngxs/store';
import { BookAPIService, BookService, StorageService } from '../services';
import { PREF_BOOK_LIST_KEY } from 'src/app/config/local-storage.config';

export interface BookWithPreferedModel {
  books: BookWithPrefered[];
  preferedBooks: BookWithPrefered[];
}
@State<BookWithPreferedModel>({
  name: 'BookStore',
  defaults: {
    books: [],
    preferedBooks: [],
  },
})
@Injectable()
export class BookState {
  constructor(
    private bookApiService: BookAPIService,
    private bookService: BookService,
    private storageService: StorageService
  ) {}

  ctx!: StateContext<BookWithPreferedModel[]>;
  // @Action(AddBook)
  // addBookAction(ctx: StateContext<BookWithPreferedModel>, action: AddBook) {
  //   const state = ctx.getState();
  //   const { book } = action;
  //   const _book = { ...book, isPrefered: true };
  //   ctx.setState({ ...state, books: [...state.books, _book] });
  // }

  @Action(ToggleBookAction)
  toggleBookAction(
    ctx: StateContext<BookWithPreferedModel>,
    action: ToggleBookAction
  ) {
    const state = ctx.getState();
    const { book } = action;
    const { books, preferedBooks } = state;
    books.map((item) => {
      if (book.book.id === item.book.id) {
        item.isPrefered = !item.isPrefered;
        if (item.isPrefered) {
          // ctx.patchState({ ...state, preferedBooks: [...preferedBooks, item] });
          this.bookService.addBook(item.book);
        } else {
          this.bookService.removeBook(item.book);
        }
      }
    });
  }

  @Action(GetBooksFromAPIAction)
  getBooksFromApi(ctx: StateContext<BookWithPreferedModel>, action: BookState) {
    const {} = action;
    const state = ctx.getState();
    this.bookApiService.getProducts().subscribe((data) => {
      ctx.setState({
        ...state,
        books: [...this.mapBooksFromState(data)],
      });
    });
  }

  mapBooksFromState(arr: Book[]): BookWithPrefered[] {
    const prefered = this.storageService.getItem(PREF_BOOK_LIST_KEY);

    return arr.map((book) => ({
      book,
      isPrefered: prefered.some((b) => b === book.id),
    }));
  }

  // @Action(GetPreferedBooks)
  // getPreferedBooks(
  //   ctx: StateContext<BookWithPreferedModel>,
  //   action: GetPreferedBooks
  // ) {
  //   const {} = action;
  //   const state = ctx.getState();
  //   const prefered = this.storageService.getItem(PREF_BOOK_LIST_KEY);
  //   ctx.setState({
  //     ...state,
  //     preferedBooks: state.books.filter((book) =>
  //       prefered.some((b) => b === book.book.id)
  //     ),
  //   });

  //   console.log(ctx.getState());
  // }
}
