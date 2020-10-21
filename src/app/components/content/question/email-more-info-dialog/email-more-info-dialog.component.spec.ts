import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMoreInfoDialogComponent } from './email-more-info-dialog.component';

describe('EmailMoreInfoDialogComponent', () => {
  let component: EmailMoreInfoDialogComponent;
  let fixture: ComponentFixture<EmailMoreInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailMoreInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMoreInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
