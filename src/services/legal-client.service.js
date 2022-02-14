import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-abc-development.herokuapp.com/api/clients/legal';

class LegalClientService {

    getAll() {
        return axios.get(API_URL, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        });
    }

    getActiveOnly() {
        return axios.get(API_URL + `?status=${true}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        });
    }

    findByTitle(title) {
        return axios.get(API_URL + `?title=${title}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        });
    }

    get(id) {
        return axios.get(API_URL + `/${id}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        });
    }

    create(data) {
        return axios.post(API_URL, {
            title: data.title,
            name: data.name,
            edrpou: data.edrpou,
            dor: data.dor,
            address: data.address,
            activity: data.activity,
            leadName: data.leadName,
            leadMobile: data.leadMobile,
            leadEmail: data.leadEmail,
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
            title: data.title,
            name: data.name,
            edrpou: data.edrpou,
            dor: data.dor,
            address: data.address,
            activity: data.activity,
            leadName: data.leadName,
            leadMobile: data.leadMobile,
            leadEmail: data.leadEmail,
        }, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        });
    }

    block(id) {
        return axios.delete(API_URL + `/${id}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        });
    }
}

export default new LegalClientService();
