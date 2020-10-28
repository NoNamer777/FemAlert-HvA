import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMoreInfoDialogComponent } from './email-more-info-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('EmailMoreInfoDialogComponent', () => {
  let component: EmailMoreInfoDialogComponent;
  let fixture: ComponentFixture<EmailMoreInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        EmailMoreInfoDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ],
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
