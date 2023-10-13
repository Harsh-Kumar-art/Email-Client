import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, pipe} from 'rxjs';
import {tap} from 'rxjs/operators';
import { response } from 'express';

interface SignupCredentials{
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SignupResponse{
  username: string;
}
interface SigninResponse{
  username: string;
}
interface SignedinResponse{
  authenticated: boolean;
  username: string;
}

interface SigninCredentials{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string){
    return this.http.post<{available: boolean}>(`${this.rootUrl}/auth/username`,{
      username
    });
  }

  signup(credentials: any){
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`,credentials)
                .pipe(  
                    tap((response)=>{
                      this.signedin$.next(true);
                      this.username = response.username;
                    })
                );
  }


  checkAuth(){
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
                .pipe(
                  tap(({authenticated, username})=>{
                    this.signedin$.next(authenticated);
                    this.username = username;
                  })
                );
  }

  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
              .pipe(
                tap(()=>{
                  this.signedin$.next(false);
                })
              )
  }

  signin(credentials: any){
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
                .pipe(
                  tap((response)=>{
                    this.signedin$.next(true);
                    this.username = response.username;
                  })
                )
  }
}
