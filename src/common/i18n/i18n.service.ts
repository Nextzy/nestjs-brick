import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class I18nService {
  private translations: { [key: string]: string } = {};
  private currentLang: string = 'en';

  constructor() {
    this.loadTranslations(this.currentLang);
  }

  private loadTranslations(lang: string) {
    const filePath = path.join(__dirname, `/locales/${lang}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      this.translations = JSON.parse(fileContent);
    } else {
      throw new Error(`Translation file for ${lang} not found`);
    }
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.loadTranslations(lang);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result: any = this.translations;

    for (let keyPart of keys) {
      if (result[keyPart]) {
        result = result[keyPart];
      } else {
        return key;
      }
    }
    return result as string;
  }
}
