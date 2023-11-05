import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { BookAPIService, BookService } from 'src/app/modules/books/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = '';
  authorOrTitle = '';

  constructor(
    private router: Router,
    private bookApi: BookAPIService,
    private bookService: BookService
  ) {}

  searchFunction(e: any) {
    this.title = e.target.value;
    this.router.navigate(['/books'], {
      queryParams: { aOt: this.authorOrTitle, name: this.title },
    });
  }
  clearSearch() {
    this.title = '';
  }
  changeSelect(e: MatSelectChange) {
    this.authorOrTitle = e as unknown as string;
  }
}
