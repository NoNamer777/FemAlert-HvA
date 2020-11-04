import { TestBed } from '@angular/core/testing';

import { BACK_END_URL, QuestionsService } from './questions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Question } from '../models/Question';

export const MOCK_QUESTIONS: any[] = [
  {
    id: 'FAQ-001',
    question: 'What is love?',
    answer: `Baby don't hurt me`
  },
  {
    id: 'FAQ-002',
    question: 'Who let the dogs out?',
    answer: `who, who, who, who, who`
  },
];

describe('QuestionsService', () => {
  let service: QuestionsService;
  let mockHttpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    service = TestBed.inject(QuestionsService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => mockHttpClient.verify());

  it('should get questions.', () => {
    service.getQuestions().subscribe((questions: Question[]) => {
      expect(questions.length).toBe(MOCK_QUESTIONS.length);

      for (let idx = 0; idx < questions.length; idx++) {
        const question = questions[idx];

        expect(question.id).toBe(MOCK_QUESTIONS[idx].id);
        expect(question.question).toBe(MOCK_QUESTIONS[idx].question);
        expect(question.answer).toBe(MOCK_QUESTIONS[idx].answer);
      }
    });

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/question`);

    request.flush(MOCK_QUESTIONS);

    expect(request.request.method).toBe('GET');
  });
});
