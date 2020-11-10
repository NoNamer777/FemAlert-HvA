import { Component, OnInit } from '@angular/core';
import { MOCK_FAQ, QuestionsService } from '../../../services/questions.service';
import { Question } from '../../../models/Question';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  private _questions: Question[] = null;

  dataReady = false;

  constructor(public questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(
      questions => this.questions = questions,
      () => this.questions = MOCK_FAQ)
    ;
  }

  get questions(): Question[] {
    return this._questions;
  }

  set questions(questions: Question[]) {
    this._questions = questions;

    this.dataReady = true;
  }
}
