import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AliceLocaleService } from './alice-locale.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AliceLocaleService', () => {
  let service: AliceLocaleService;
  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: HttpClient, useValue: httpClient}
      ]
    });
    service = TestBed.inject(AliceLocaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load dictionary and translate correctly', () => {
    httpClient.get.and.returnValue(of({
      "id": "en",
      "dictionary": {
        "test": {
          "item": "This is a test item with value {0}!"
        }
      }
    }));

    service.loadDictionary("test");
    expect(service).toBeTruthy();
    expect(service.getDictionary()).toBeTruthy();
    expect(service.translate("test.item", [123])).toBe("This is a test item with value 123!");
  });
});
