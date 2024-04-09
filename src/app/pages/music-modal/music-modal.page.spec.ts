import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicModalPage } from './music-modal.page';

describe('MusicModalPage', () => {
  let component: MusicModalPage;
  let fixture: ComponentFixture<MusicModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MusicModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
