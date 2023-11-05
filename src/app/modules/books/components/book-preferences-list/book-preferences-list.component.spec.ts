import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPreferencesListComponent } from './book-preferences-list.component';

describe('BookPreferencesListComponent', () => {
  let component: BookPreferencesListComponent;
  let fixture: ComponentFixture<BookPreferencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPreferencesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPreferencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
