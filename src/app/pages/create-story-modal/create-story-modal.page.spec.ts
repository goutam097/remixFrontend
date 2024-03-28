import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStoryModalPage } from './create-story-modal.page';

describe('CreateStoryModalPage', () => {
  let component: CreateStoryModalPage;
  let fixture: ComponentFixture<CreateStoryModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateStoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
