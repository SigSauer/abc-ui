import axios from 'axios';
import authHeader from "./auth-header";


const API_URL = 'http://localhost:8080/api/admin/users';

const EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class UserService {

    getAll() {
        return axios.get(API_URL, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        });
    }

    findByUsername(username) {
        return axios.get(API_URL + `?username=${username}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }, error => {
            throw error;
        });
    }

    get(id) {
        return axios.get(API_URL + `/${id}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        });
    }

    create(data) {
        return axios.post(API_URL, {
            username: data.username,
            name: data.name,
            email: data.email,
            roles: data.roles
        }, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        });
    }

    update(id, data) {
        return axios.put(API_URL + `/${id}`, {
            username: data.username,
            name: data.name,
            email: data.email,
            roles: data.roles
        }, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        });
    }

    updatePassword(id, password) {
        return axios.patch(API_URL + `/${id}`, {
            password: password,
        }, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        });
    }

    validateEmail(email) {
        return EMAIL.test(email);
    }

}

export default new UserService();
