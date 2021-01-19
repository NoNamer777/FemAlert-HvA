import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServerManagementService } from './server-management.service';

describe('ServerManagementService', () => {

  let service: ServerManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    service = TestBed.inject(ServerManagementService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
