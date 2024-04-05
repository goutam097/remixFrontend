import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextModalPage } from './text-modal.page';

describe('TextModalPage', () => {
  let component: TextModalPage;
  let fixture: ComponentFixture<TextModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TextModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
