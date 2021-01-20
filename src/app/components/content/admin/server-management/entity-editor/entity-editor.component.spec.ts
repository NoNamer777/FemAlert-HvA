import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditorComponent } from './entity-editor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ServerManagementService } from '../../../../../services/server-management.service';

describe('EntityEditorComponent', () => {

  let fixture: ComponentFixture<EntityEditorComponent>;
  let serverManagementService: ServerManagementService;

  let component: EntityEditorComponent;
  let element: HTMLElement;

  function initializeComponent(): void {
    fixture = TestBed.createComponent(EntityEditorComponent);
    serverManagementService = TestBed.inject(ServerManagementService);

    component = fixture.debugElement.componentInstance;
    element = fixture.nativeElement.nativeElement;

    serverManagementService.entity = {};

    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [
        EntityEditorComponent,
      ],
    })
    .compileComponents();
  });

  it('should create', () => {
    initializeComponent();

    expect(component).toBeDefined();
  });
});
