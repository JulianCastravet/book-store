import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { BooksModule } from '../books/books.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactRoutingModule, MatGridListModule, BooksModule],
})
export class ContactModule {}
