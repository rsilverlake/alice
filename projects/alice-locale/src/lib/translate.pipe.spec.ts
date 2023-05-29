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
          "item": "This is a test item with value {0}!"
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
    console.log(pipe.transform("test.item", 123));
    expect(pipe.transform("test.item", 123)).toBe("This is a test item with value 123!");
  });
});
