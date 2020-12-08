import { User } from '../app/models/User';
import { Event } from '../app/models/Event';
import { Question } from '../app/models/Question';
import { Rapport } from '../app/models/Rapport';
import { Address } from '../app/models/Address';

export function parseUser(data: any): User {
  const user = new User(data.id);

  user.name = data.name;
  user.emailAddress = data.emailAddress;
  user.password = data.password;
  user.admin = data.admin;

  return user;
}

export function parseEvent(data: any): Event {
  const event = new Event(data.id);

  event.name = data.name;
  event.active = data.active;
  event.removable = data.removable;

  return event;
}

export function parseQuestion(data: any): Question {
  const question = new Question(data.id);

  question.question = data.question;
  question.answer = data.answer;

  return question;
}

export function parseRapport(data: any): Rapport {
  const rapport = new Rapport(data.id);

  rapport.emailAddress = data.emailAddress;
  rapport.name = data.name;
  rapport.story = data.story;
  rapport.wantsExtraInfo = data.wantsExtraInfo;
  rapport.requiresSupport = data.requiresSupport;
  rapport.dateTime = data.dateTime;
  rapport.address = new Address(data.formattedAddress, data.businessName);

  for (const event of data.events) {
    rapport.addEvent(parseEvent(event));
  }

  return rapport;
}
