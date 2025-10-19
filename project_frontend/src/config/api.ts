// not using env as the project will not ever be deployed
export const API_TEST_URL = 'http://localhost:8000/api/';

const createEndpoint = (path: string) => {
    return API_TEST_URL + path;
}

export const ENDPOINTS = {
    login: createEndpoint('Auth/login'),
    resetPassword: createEndpoint('Auth/reset-password'),
    refreshToken: createEndpoint('Auth/refresh-token'),
    logout: createEndpoint('Auth/logout'),
}
