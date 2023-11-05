import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-books-like-icon',
  templateUrl: './books-like-icon.component.html',
  styleUrls: ['./books-like-icon.component.scss'],
})
export class BooksLikeIconComponent {
  @Output() togglePreference = new EventEmitter();
  @Input() isPrefered: boolean = true;

  iconClick(): void {
    this.togglePreference.emit();
  }
}
