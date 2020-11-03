import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions.service';
import { Question } from '../../../models/Question';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  questions: Question[] = null;

  constructor(public questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(questions => this.questions = questions);
  }
}
