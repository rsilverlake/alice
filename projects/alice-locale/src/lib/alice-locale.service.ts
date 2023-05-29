import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageDictionary } from '../models/language-dictionary';

@Injectable({
  providedIn: 'root'
})
export class AliceLocaleService {
  locales: LanguageDictionary[];
  private currentLocale?: LanguageDictionary;

  constructor(private http: HttpClient) {
    this.locales = [];
  }

  public setLocale(id: string): boolean {
    var sel = this.locales.find(x => x.id == id);
    if (sel) {
      this.currentLocale = sel;
      return true;
    }
    return false;
  }

  public getDictionary(id: string = ""): LanguageDictionary | undefined {
    if ((id == "" || id == null) && this.currentLocale) 
    {
      return this.currentLocale;
    }
    var sel = this.locales.find(x => x.id == id);
    return sel;
  }

  public loadDictionary(uri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var that = this;
      this.http.get(uri).subscribe((data) => {
        var anyData: any = data;
        if (anyData && anyData.id && typeof anyData.id === "string") {
          var langId = anyData.id.trim().toLowerCase();
          var dictionary = that.getDictionary(langId);
          if (dictionary) {
            dictionary.addFrom(data);
          } else {
            dictionary = new LanguageDictionary();
            dictionary.addFrom(data);
            that.locales.push(dictionary);
          }
          if (!this.currentLocale) {
            this.setLocale(langId);
          }
        }
        resolve(true);
      });
    });
  }

  public translate(text: string, args: any[]): string {
    var dictionary = this.getDictionary();
    var tl = text;
    if (dictionary) {
      tl = dictionary.translate(text);
    }
    if (Array.isArray(args)) {
      for(var i = 0; i < args.length; i++) {
        tl = this.mergeVariables(tl, i, args[i]);
      }
    }

    return tl;
  }

  protected mergeVariables(sourceText: string, index: number, value: any): string {
    var merged = sourceText;
    if (typeof value === "object") {
      for(var k in value) {
        if (index == 0) {
          merged = merged.replace("{" + k + "}", value[k]);
        }
        merged = merged.replace("{[" + index + "]." + k + "}", value[k]);
      }
    }
    else {
      merged = merged.replace("{" + index + "}", value);
    }
    return merged;
  }
}
