import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksLikeIconComponent } from './books-like-icon.component';

describe('BooksLikeIconComponent', () => {
  let component: BooksLikeIconComponent;
  let fixture: ComponentFixture<BooksLikeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksLikeIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksLikeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
