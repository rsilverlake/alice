import { HttpClient } from '@angular/common/http';
import { AliceLocaleService } from './alice-locale.service';
import { TranslatePipe } from './translate.pipe';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('TranslatePipe', () => {
  let service: AliceLocaleService;
  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeAll(() => {
    service = new AliceLocaleService(httpClient);
    httpClient.get.and.returnValue(of({
      "id": "en",
      "dictionary": {
        "test": {
          "item": "This is a test item with value {0}!",
          "named": "I have {count} baloons.",
          "stacked": "I have {[1].color} baloons.",
        }
      }
    }));
    service.loadDictionary("test");
  });

  it('create an instance', () => {
    const pipe = new TranslatePipe(service);
    expect(pipe).toBeTruthy();
  });

  it('transforms text with variables correctly', () => {
    const pipe = new TranslatePipe(service);
    expect(pipe.transform("test.item", 123)).toBe("This is a test item with value 123!");
  });

  it('transforms text with named variables correctly', () => {
    const pipe = new TranslatePipe(service);
    expect(pipe.transform("test.named", {count: 3})).toBe("I have 3 baloons.");
  });

  it('transforms text with named variables in second args correctly', () => {
    const pipe = new TranslatePipe(service);
    expect(pipe.transform("test.stacked", {count: 3}, {color: "red"})).toBe("I have red baloons.");
  });
});
