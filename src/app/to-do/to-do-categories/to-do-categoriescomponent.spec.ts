import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCategoriesComponent } from './to-do-categories.component';

describe('ToDoCategoriesComponent', () => {
  let component: ToDoCategoriesComponent;
  let fixture: ComponentFixture<ToDoCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoCategoriesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
