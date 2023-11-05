import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookWithPrefered } from '../../models/product';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  @Output() togglePreferenceEvent = new EventEmitter<BookWithPrefered>();
  @Input() booksList: BookWithPrefered[] = [];

  togglePreference(book: BookWithPrefered) {
    this.togglePreferenceEvent.emit(book);
  }
}
