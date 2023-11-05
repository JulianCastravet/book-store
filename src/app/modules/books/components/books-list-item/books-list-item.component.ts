import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BookWithPrefered } from '../../models/product';

@Component({
  selector: 'app-books-list-item',
  templateUrl: './books-list-item.component.html',
  styleUrls: ['./books-list-item.component.scss'],
})
@Inject({
  providedIn: 'root',
})
export class BooksListItemComponent {
  @Input() bookWithPrefered!: BookWithPrefered;
  @Output() togglePreference = new EventEmitter<BookWithPrefered>();

  iconClick(): void {
    this.togglePreference.emit(this.bookWithPrefered);
  }
}
