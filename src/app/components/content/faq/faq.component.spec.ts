import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponent } from './faq.component';
import { BACK_END_URL, MOCK_FAQ } from '../../../services/questions.service';
import { MOCK_QUESTIONS } from '../../../services/questions.service.spec';

describe('FaqComponent', () => {
  let fixture: ComponentFixture<FaqComponent>;
  let component: FaqComponent;
  let element: HTMLElement;

  let mockHttpClient: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        FaqComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    mockHttpClient = TestBed.inject(HttpTestingController);

    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  afterEach(() => mockHttpClient.verify());

  it('should assign the questions in the template', () => {
    const request = mockHttpClient.expectOne(`${BACK_END_URL}/question`);

    request.flush(MOCK_QUESTIONS);

    expect(request.request.method).toBe('GET');

    fixture.detectChanges();

    const cards: HTMLCollectionOf<Element> = element.getElementsByClassName('card-header');

    expect(cards.length).toBe(MOCK_QUESTIONS.length);
  });

  it('should assign the questions in the template even when an exception was thrown while requesting data', () => {
    const request = mockHttpClient.expectOne(`${BACK_END_URL}/question`);

    request.error(new ErrorEvent('NO_ERROR_EXCEPTION'), { status: 0, statusText: 'Unknown exception' });

    fixture.detectChanges();

    const cards: HTMLCollectionOf<Element> = element.getElementsByClassName('card-header');

    expect(cards.length).toBe(MOCK_FAQ.length);
  });
});
