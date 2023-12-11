import { BookWithPrefered } from '../models';

export class AddBookAction {
  static readonly type = '[BookStore] Add Book';
  constructor(public book: BookWithPrefered) {}
}
export class ToggleBookAction {
  static readonly type = '[BookStore] Toggle Book';
  constructor(public book: BookWithPrefered) {}
}
export class RemoveBookAction {
  static readonly type = '[BookStore] Remove Book';
  constructor() {}
}
export class GetBooksFromAPIAction {
  static readonly type = '[BookStore] Get All Books';
  constructor() {}
}
export class GetPreferedBooks {
  static readonly type = '[BookStore] Get Prefered Books';
}
