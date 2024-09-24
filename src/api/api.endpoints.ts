export const API_ENDPOINTS = {
    apiUrl: 'https://api.esistem.com.br:5100/api',
    apiUrlHttps: 'https://192.168.245.250:5100/api',
    // users
    addUser: '/users',
    getAllUsers: '/users',
    forgotPassword: 'user/forgot-password',
    resetPassword: 'users/reset-password',
    searchById: '/user/:',
    // tokens
    tokens: '/token',
    tokensRefresh: '/token/refresh',
    obterToken: '/token/create',
    //login
    login: '/user/login',
    // tenants
    // persons
    personCreate: '/person/create',
    personListAll: '/person/list-all'
};
