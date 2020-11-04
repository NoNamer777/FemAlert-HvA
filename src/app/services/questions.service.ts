import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from '../models/Question';

export const BACK_END_URL = 'http://localhost:8088';

export const MOCK_FAQ = [
  new Question(
    'FAQ-001',
    'Wat doen wij met de meldingen',
    'Alle meldingen worden door FemAlert verzameld. Dit wordt bij ons opgeslagen en omgezet in anonieme informatie. Deze anonieme informatie willen wij presenteren aan de uitgaansgelegenheden en de overheid. Zo kunnen we er met elkaar voor zorgen dat uitgaansgelegenheden, feest-organisatoren en ordehandhavers weten op welke momenten en locaties incidenten plaatsvinden. Met de informatie kunnen wij met elkaar op zoek naar oplossingen.'
  ),
  new Question(
    'FAQ-002',
    'Wat gebeurt er precies na het ontvangen van een melding',
    'Na het ontvangen van een melding wordt er aan de hand van de melding gekeken wat de mogelijke vervolgstappen zijn voor de persoon die de melding heeft gedaan (indien er behoefte naar is). Vervolgens wordt de melding geregistreerd en gecategoriseerd in onze databank. Nadat de melding een plek heeft gekregen in onze databank, wordt er gekeken voor welke van onze partners/stakeholders deze melding relevant is en worden de vervolgstappen intern of met deze partner/stakeholder besproken.'
  ),
  new Question(
    'FAQ-003',
    'Met wie werkt FemAlert samen',
    'Femalert werkt met verschillende partners of stakeholders die onze visie en missie geloven en ook mee willen werken aan het stap voor stap bouwen aan een toekomst waar iedereen in vrijheid en veiligheid zichzelf kan zijn. Momenteel werkt Femalert met verschillende organisaties die in het uitgaansleven opereren en met plaatselijke gemeenten. Bent u geïnteresseerd in een samenwerking met FemAlert? Klik dan op het kopje hieronder.'
  ),
  new Question(
    'FAQ-004',
    'Hoe kan ik partner worden',
    'Femalert heeft een breed netwerk van gedreven partners die geloven in onze visie en missie. Sta je achter onze visie en missie en heb je interesse in een samenwerking met FemAlert? Klik hier.'
  ),
  new Question(
    'FAQ-005',
    'Hoe zit het met privacy/met wie wordt de informatie gedeeld',
    'Veiligheid en betrouwbaarheid is van cruciaal belang, daarom worden de verzamelde meldingen van de slachtoffers goed beschermd. Informatie die binnenkomt via de meldingen wordt op anonieme basis gebruikt voor ons onderzoek of samenwerking met onze partners. Ook kunnen de organisaties die met ons samenwerken er op vertrouwen dat de informatie die wordt doorgespeeld betrouwbaar is.'
  ),
];

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
