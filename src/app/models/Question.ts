export class Question {

  private _id: string;

  private _question: string;

  private _answer: string;

  constructor(id?: string, question?: string, answer?: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get question(): string {
    return this._question;
  }

  set question(question: string) {
    this._question = question;
  }

  get answer(): string {
    return this._answer;
  }

  set answer(answer: string) {
    this._answer = answer;
  }
}
