import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/default/Home.vue';
import Login from './views/default/Login.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/default/Profile.vue')
        },
        //user service
        {
            path: '/admin/users',
            name: 'user-list',
            component: () => import('./views/users/UserList')
        },
        {
            path: '/admin/users/:id',
            name: 'user',
            component: () => import('./views/users/User.vue')
        },
        {
            path: '/admin/add',
            name: 'add-user',
            component: () => import('./views/users/AddUser.vue')
        },
        //natural-client service
        {
            path: '/clients/natural',
            name: 'natural-list',
            component: () => import('./views/naturals/NaturalList')
        },
        {
            path: '/clients/natural/:id',
            name: 'natural',
            component: () => import('./views/naturals/Natural')
        },
        {
            path: '/clients/add-natural',
            name: 'add-natural',
            component: () => import('./views/naturals/AddNatural')
        },
        //legal-client service
        {
            path: '/clients/legal',
            name: 'legal-list',
            component: () => import('./views/legals/LegalList')
        },
        {
            path: '/clients/legal/:id',
            name: 'legal',
            component: () => import('./views/legals/Legal')
        },
        {
            path: '/clients/add-legal',
            name: 'add-legal',
            component: () => import('./views/legals/AddLegal')
        },
    ]
});
