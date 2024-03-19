import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }
    environment = {
        production: false,
        apiUrl: 'http://localhost:8080/api/auth',
    };
    clearToken() {
        localStorage.removeItem('USERNAME')
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('ROLE');
        localStorage.removeItem('USER_ID');

    }

    setToken(response: any) {
        localStorage.setItem('USERNAME',response.username)
        localStorage.setItem('ACCESS_TOKEN', response.token);
        localStorage.setItem('USER_ID', response.id);
        localStorage.setItem('ROLE', response.role);
    }
    signup(username: string , email: string, password: string): Observable<any> {
        const data = { username, email, password };
        return this.http.post<any>(`${this.environment.apiUrl}/signup`, data).pipe(
            tap((response: any) => {
                this.setToken(response);
            }),
        );
    }

    // LOGIN
    authenticate(email: string, password: string): Observable<any> {
        const data = { email, password };
        return this.http
            .post<any>(`${this.environment.apiUrl}/signin`, data,)
            .pipe(
                tap((response: any) => {
                    this.setToken(response);
                }),
            );
    }
    get authenticated(): boolean {
        return localStorage.getItem('ACCESS_TOKEN') !== null;
    }
    get isAdmin(): boolean {
        return localStorage.getItem('ROLE') === 'admin';
    }
    
    // LOGOUT
    logout(): Observable<any> {
        return this.http
            .post(`${this.environment.apiUrl}/logout`, { withCredentials: true })
            .pipe(
                tap((response: any) => {
                    this.clearToken();
                }),
            );
    }
    createAdmin(username: string , email: string, password: string): Observable<any> {
        const data = { username, email, password,role:'admin' };
        return this.http.post<any>(`${this.environment.apiUrl}/signup `, data);
    }
}
