import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import {
  MainLayoutComponent,
  FooterComponent,
  NavBarComponent,
} from './components';
import { AppComponent } from './app.component';
import { HomeModule, BooksModule, ContactModule } from './modules';
import { BookState } from './modules/books/Store/book-state';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainLayoutComponent,
    NavBarComponent,
  ],
  imports: [
    BooksModule,
    ContactModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HomeModule,
    NgxsModule.forRoot([BookState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
