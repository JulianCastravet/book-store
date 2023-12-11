import { Store } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './pages';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  BookPreferencesListComponent,
  BooksLikeIconComponent,
  BooksListComponent,
  BooksListItemComponent,
} from './components';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
    BooksListItemComponent,
    BookPreferencesListComponent,
    BooksLikeIconComponent,
    BookDetailsComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
  ],
  exports: [
    BookPreferencesListComponent,
    MatBadgeModule,
    MatMenuModule,
    BooksListComponent,
  ],
  providers: [],
})
export class BooksModule {}
