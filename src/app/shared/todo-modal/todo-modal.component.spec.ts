import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoModalComponent } from './todo-modal.component';

describe('TodoModalComponent', () => {
  let component: TodoModalComponent;
  let fixture: ComponentFixture<TodoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoModalComponent]
    });
    fixture = TestBed.createComponent(TodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
