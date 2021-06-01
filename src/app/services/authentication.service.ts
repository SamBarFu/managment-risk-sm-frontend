import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
//const apiUrl="http://192.168.1.3:3000";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  user: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http.post<any>(`${apiUrl}/api/v1/login`,{ email, password })
      .pipe(map(data => {
        localStorage.setItem('currentUser', JSON.stringify(data.user.userAuth));
        localStorage.setItem('token', data.token);
        this.token = data.token;
        this.currentUserSubject.next(data.user.userAuth);
        return data.user.userAuth;
      }));
  }
  registrar(cuenta:any){
    let firstName=cuenta.firstName;
    let lastName=cuenta.lastName;
    let email=cuenta.email;
    let password=cuenta.password;
    return this.http.post<any>(`${apiUrl}/api/v1/signup`,{ firstName,lastName,email,password })
  }

  public isAuthenticated(): boolean {
    this.token =  localStorage.getItem('token');
    this.user = JSON.parse( localStorage.getItem('currentUser') );
    // this.token = '9ca0ad2639c560c971b687c8d5126302965838b9';
    if (!this.token) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

}
