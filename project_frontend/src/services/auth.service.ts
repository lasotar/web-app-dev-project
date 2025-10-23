import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { createRequest } from './api.service';

class AuthService {
    login = (email: string, password: string) => {
        return createRequest('POST', 'Auth/login', {
            email: email,
            password: password
        },
        )
    }

    logout = () => {
        return createRequest('POST', 'Auth/logout');
    }
}

export const authService = new AuthService();
