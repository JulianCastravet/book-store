import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Book, BookWithPrefered } from '../models';
import { PREF_BOOK_LIST_KEY } from 'src/app/config/local-storage.config';
import { StorageService } from './local-storage.service';
import { BookAPIService } from './book-api.service';
import { GetPreferedBooks } from '../Store/book-actions';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookState$: BehaviorSubject<BookWithPrefered[]> = new BehaviorSubject<
    BookWithPrefered[]
  >([]);

  constructor(
    private storageService: StorageService,
    private bookApi: BookAPIService,
    private store$: Store
  ) {
    this.getBooks();
  }

  getBooks() {
    this.bookApi
      .getProducts()
      .pipe(map((books) => this.mapBooksResponseToView(books)))
      .subscribe((books) => this.setBooks(books));
  }

  setBooks(books: BookWithPrefered[]): void {
    return this.bookState$.next(books);
  }

  mapBooksResponseToView(books: Book[]): BookWithPrefered[] {
    const savedPrefered = this.storageService.getItem(PREF_BOOK_LIST_KEY);

    return books.map((book) => ({
      book,
      isPrefered: savedPrefered.some((x) => x === book.id),
    }));
  }

  getAllBooks(): Observable<BookWithPrefered[]> {
    return this.bookState$;
  }

  getPreferedBooks(): Observable<BookWithPrefered[]> {
   return this.store$.dispatch(new GetPreferedBooks());
    // return this.bookState$.pipe(
    //   map((books) => books.filter((book) => !!book.isPrefered))
    // );
  }

  // toggleBook(book: BookWithPrefered): void {
  //   if (book.isPrefered) {
  //     this.removeBook(book.book);
  //     return;
  //   }
  //   this.addBook(book.book);
  // }

  addBook(book: Book): void {
    const prefered = this.storageService.getItem(PREF_BOOK_LIST_KEY);
    this.storageService.setItem(PREF_BOOK_LIST_KEY, [...prefered, book.id]);

    this.getBooks();
  }

  removeBook(book: Book): void {
    const prefered = this.storageService.getItem(PREF_BOOK_LIST_KEY);
    const filteredPrefered = prefered.filter((item) => item != book.id);
    this.storageService.setItem(PREF_BOOK_LIST_KEY, filteredPrefered);

    this.getBooks();
  }

  searchBookByAuthor(val: string): Observable<BookWithPrefered[]> {
    return this.bookState$.pipe(
      map((books) =>
        books.filter((item) => {
          const REG_ex = new RegExp(val, 'i');
          return item.book.author.match(REG_ex);
        })
      )
    );
  }

  searchBookByTitle(val: string): Observable<BookWithPrefered[]> {
    return this.bookState$.pipe(
      map((books) =>
        books.filter((item) => {
          const REG_ex = new RegExp(val, 'i');
          return item.book.title.match(REG_ex);
        })
      )
    );
  }

  searchBookByGenre(val: string): Observable<BookWithPrefered[]> {
    return this.bookState$.pipe(
      map((books) =>
        books.filter((item) => {
          const REG_ex = new RegExp(val, 'i');
          return item.book.genre?.toString().match(REG_ex);
        })
      )
    );
  }

  getAllBestSellerBooks(): Observable<BookWithPrefered[]> {
    return this.bookState$.pipe(
      map((books) => {
        return books.filter((book) => book.book.isBestSeller);
      })
    );
  }
  getNotAllBestSellerBooks(): Observable<BookWithPrefered[]> {
    return this.bookState$.pipe(
      map((books) => {
        return books.filter((book) => !book.book.isBestSeller);
      })
    );
  }

  searchBooksWithParams(autTit: string, title: string): Observable<Book[]> {
    return this.bookApi.getProductsByQuery(autTit, title);
  }

  searchBooksWithBetterParams(
    fv: string,
    sv: string
  ): Observable<BookWithPrefered[]> {
    return this.searchBooksWithParams(fv, sv).pipe(
      map((data) => {
        const RegEx = new RegExp(sv, 'i');
        const newArr = data.filter((book) => {
          if (fv === 'author') {
            return book.author.match(RegEx);
          } else {
            return book.title.match(RegEx);
          }
        });
        return this.mapBooksResponseToView(newArr);
      })
    );
  }
}
