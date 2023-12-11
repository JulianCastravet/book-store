import { Selector, StateContext } from '@ngxs/store';
import { BookState, BookWithPreferedModel } from './book-state';
import { BookWithPrefered } from '../models';
import { GetBooksFromAPIAction } from './book-actions';
import { Observable } from 'rxjs';
export class BookSelectors {
  @Selector([BookState])
  static bookSelector(state: BookWithPreferedModel): BookWithPrefered[] {
    return state.books;
  }

  @Selector([BookState])
  static preferedBookSelector(
    state: BookWithPreferedModel
  ): BookWithPrefered[] {
    return state.preferedBooks;
  }
}
