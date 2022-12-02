import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordCheckService {
  url: any = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  isValid: boolean = false;
  constructor(private http: HttpClient) { }

  isValidWord(word: any) {
    return this.http.get(this.url + word);
  }
}
