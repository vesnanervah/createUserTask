import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmService {

  constructor(
    private http: HttpClient
  ) { }

  testEnpoint() {
    return this.http.get('http://localhost:5000/');
  }

  initConfirm(email: string) {
    return this.http.post('http://localhost:5000/init-email-confirm', {
      email
    }); 
  }

  enterCode(email: string, code: string) {
    return this.http.post('http://localhost:5000/confirm-email-by-code', {
      email, code
    }); 
  }
}
