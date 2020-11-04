import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { ConfirmSendDialogComponent } from './confirm-send-dialog.component';

describe('ConfirmSendDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmSendDialogComponent>;
  let component: ConfirmSendDialogComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule,
      ],
      declarations: [
        ConfirmSendDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSendDialogComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should cancel when pressing the cancel button', () => {
    const cancelButton: HTMLButtonElement = element.querySelector('button.btn-light');
    const closeSpy = spyOn(component, 'onDialogClose');

    cancelButton.click();
    fixture.detectChanges();

    expect(closeSpy).toHaveBeenCalledWith(false);
  });

  it('should continue when pressing the send button', () => {
    const cancelButton: HTMLButtonElement = element.querySelector('button.bg-grey2');
    const closeSpy = spyOn(component, 'onDialogClose');

    cancelButton.click();
    fixture.detectChanges();

    expect(closeSpy).toHaveBeenCalledWith(true);
  });
});
