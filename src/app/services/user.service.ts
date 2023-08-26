import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginRequest } from './../models/LoginRequest';
import { JwtResponse } from '../models/JwtResponse';
import { MessageResponse } from '../models/MessageResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSource = new BehaviorSubject<JwtResponse | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: User): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      'http://localhost:8080/api/auth/signup',
      user
    );
  }
  signin(loginRequest: LoginRequest) {
    return this.http
      .post<JwtResponse>('http://localhost:8080/api/auth/signin', loginRequest)
      .pipe(
        map((jwtResponse) => {
          localStorage.setItem('myToken', jwtResponse.accessToken);
          this.currentUserSource.next(jwtResponse);
          return jwtResponse;
        })
      );
  }

  logout() {
    localStorage.removeItem('myToken');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/sign-in');
  }

  greeting(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(
      'http://localhost:8080/api/test/greeting'
    );
  }
  getUsers(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(
      'http://localhost:8080/api/test/users'
    );
  }
  getToken() {
    return localStorage.getItem('myToken');
  }
}
