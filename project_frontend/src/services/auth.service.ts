import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { ENDPOINTS } from '../config/api';

class AuthService {
    private accessTokenSubject = new BehaviorSubject<string | null>(null);
    private isLoadingSubject = new BehaviorSubject<boolean>(true);
    private inflightRefresh$: Observable<string> | null = null;

    public isLoading$ = this.isLoadingSubject.asObservable();

    login = () => {
    }

    logout = () => {
    }

    refreshToken = () => {
    }
}

export const authService = new AuthService();
