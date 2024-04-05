import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudoTestingPage } from './audo-testing.page';

describe('AudoTestingPage', () => {
  let component: AudoTestingPage;
  let fixture: ComponentFixture<AudoTestingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AudoTestingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
