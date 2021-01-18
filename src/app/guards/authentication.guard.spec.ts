import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { PartnerComponent } from '../components/content/partner/partner.component';
import { routes } from '../app-routing.module';
import { DashboardComponent } from '../components/content/admin/dashboard/dashboard.component';
import { HomeComponent } from '../components/content/home/home.component';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let service: AuthenticateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        {provide: Router, useValue: router},
      ],
      declarations: [
        PartnerComponent,
        DashboardComponent,
        HomeComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
    });
  });

  beforeEach(() => {
    guard = TestBed.inject(AuthenticationGuard);
    router = TestBed.inject(Router);
    service = TestBed.inject(AuthenticateService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
