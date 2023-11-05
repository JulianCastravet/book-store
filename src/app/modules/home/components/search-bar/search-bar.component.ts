import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Input() value: string = '';
  @Input() selectBy: string = '';

  @Output() searchQuery = new EventEmitter<Event>();
  @Output() clearSearch = new EventEmitter<Event>();
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  searchQueryEvent(event: Event) {
    this.searchQuery.emit(event);
  }

  clearSearchEvent() {
    this.value = '';
    this.clearSearch.emit();
  }

  changeSelect(e: MatSelectChange) {
    this.selectionChange.emit(e.value);
  }
}
