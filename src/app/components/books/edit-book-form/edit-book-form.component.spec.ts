import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookFormComponent } from './edit-book-form.component';

describe('EditBookFormComponent', () => {
  let component: EditBookFormComponent;
  let fixture: ComponentFixture<EditBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
