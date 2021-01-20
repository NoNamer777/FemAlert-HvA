import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ServerManagementComponent } from './server-management.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ServerManagementService } from '../../../../services/server-management.service';
import { EntityEditorComponent } from './entity-editor/entity-editor.component';
import { FormsModule } from '@angular/forms';
import { BACK_END_URL } from '../../../../services/questions.service';

describe('ServerManagementComponent', () => {

  const entity = { id: 'Im', name: 'the void', active: false, removable: false };

  let fixture: ComponentFixture<ServerManagementComponent>;

  let httpClientMock: HttpTestingController;
  let serverManagementService: ServerManagementService;

  let component: ServerManagementComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FontAwesomeTestingModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [
        ServerManagementComponent,
        EntityEditorComponent,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerManagementComponent);
    httpClientMock = TestBed.inject(HttpTestingController);
    serverManagementService = TestBed.inject(ServerManagementService);

    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  afterEach(() => {
    httpClientMock.verify();
    sessionStorage.clear();
  });

  it('should create', () => {
    const getEntitiesReq = httpClientMock.match(`${BACK_END_URL}/${serverManagementService.type.value.toLocaleLowerCase()}`);

    for (const request of getEntitiesReq) {
      request.flush([entity]);
    }

    expect(component).toBeDefined();
  });

  it('should create a new entity', () => {
    const getEntitiesReq = httpClientMock.match(`${BACK_END_URL}/${serverManagementService.type.value.toLocaleLowerCase()}`);
    const newEntityButton: HTMLButtonElement = element.querySelector('.list-group-item-success');

    for (const request of getEntitiesReq) {
      request.flush([entity]);
    }

    newEntityButton.click();
    fixture.detectChanges();

    const newEntityElement = element.querySelector('.list-group-item-warning');

    expect(newEntityElement).toBeDefined();
  });
});
