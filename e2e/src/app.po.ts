import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getParagraphText(): Promise<string> {
    return element(by.css('app-root p')).getText() as Promise<string>;
  }
}