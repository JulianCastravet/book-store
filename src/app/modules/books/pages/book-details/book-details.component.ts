import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { BookService } from '../../services';
import { Book, Customer } from '../../models';
import { CustomerService } from '../../services/customer-service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;
  preferedBooks = this.bookService.getPreferedBooks();

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  matSnackConfig: MatSnackBarConfig = {
    verticalPosition: 'bottom',
  };
  ERROR_MESSAGE: string = 'Please fill the form.';
  SUCCESS_MESSAGE: string = 'Your form has been submitted.';
  ACTION: string = 'CLOSE';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    const bookIdFromURL = Number(routeParam.get('id'));
    this.bookService
      .getAllBooks()
      .pipe(
        map((books) => {
          return books.filter((book) => book.book.id === bookIdFromURL);
        })
      )
      .subscribe((book) => (this.book = book[0].book));
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, this.matSnackConfig);
  }

  onSubmit() {
    const _name = this.contactForm.value.name;
    const _mail = this.contactForm.value.email;
    let customer: Customer = {
      name: '',
      email: '',
    };

    if (
      _name === null ||
      _name?.length === 0 ||
      _mail === null ||
      _mail?.length === 0
    ) {
      this.openSnackBar(this.ERROR_MESSAGE, this.ACTION);
    } else {
      customer = {
        name: _name!,
        email: _mail!,
      };
      this.openSnackBar(this.SUCCESS_MESSAGE, this.ACTION);
      this.customerService.addCustomer(customer);
      this.contactForm.reset();
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.setErrors(null);
      });
    }
  }

  getErrorMessage() {
    return 'This field is empty or format is wrong';
  }
}
