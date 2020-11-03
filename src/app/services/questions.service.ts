import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from '../models/Question';

export const BACK_END_URL = 'http://localhost:8088';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<any[]>(`${BACK_END_URL}/question`).pipe(map((questionsData: any[]) => {
      const questions: Question[] = [];

      for (const data of questionsData) questions.push(new Question(data.id, data.question, data.answer));
      return questions;
    }));
  }
}
