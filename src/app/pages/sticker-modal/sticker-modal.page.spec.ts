import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StickerModalPage } from './sticker-modal.page';

describe('StickerModalPage', () => {
  let component: StickerModalPage;
  let fixture: ComponentFixture<StickerModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StickerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
