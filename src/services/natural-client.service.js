import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-abc-development.herokuapp.com/api/clients/natural';

class NaturalClientService {

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


    findByMobile(mobile) {
        return axios.get(API_URL + `?mobile=${mobile}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error;
        });
    }

    get(id) {
        return axios.get(API_URL + `/${id}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }).catch(error => {
            throw error;
        });
    }

    create(data) {
        return axios.post(API_URL, {
            mobile: data.mobile,
            name: data.name,
            email: data.email,
            sex: data.sex,
            dob: data.dob,
            tin: data.tin,
            docNumber: data.docNumber,
            docIssuers: data.docIssuers,
            regAddress: data.regAddress,
            resAddress: data.resAddress,
            work: data.work,
            workName: data.workName
        }, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }, error => {
            throw error;
        });
    }

    update(id, data) {
        return axios.put(API_URL + `/${id}`, {
            mobile: data.mobile,
            name: data.name,
            email: data.email,
            sex: data.sex,
            dob: data.dob,
            tin: data.tin,
            docNumber: data.docNumber,
            docIssuers: data.docIssuers,
            regAddress: data.regAddress,
            resAddress: data.resAddress,
            work: data.work,
            workName: data.workName
        }, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }, error => {
            throw error;
        });
    }

    block(id) {
        return axios.delete(API_URL + `/${id}`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }, error => {
            throw error;
        });
    }

    sendEmail(id, userId, recipient, subject, body) {
        return axios.post(API_URL + `/${id}/send`, {
            userId: userId,
            recipient: recipient,
            subject: subject,
            body: body
        }, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }, error => {
            throw error
        });
    }

    getEmails(id) {
        return axios.get(API_URL + `/${id}/emails`,{
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }, error => {
            throw error
        });
    }

    getProducts(id) {
        return axios.get(API_URL + `/${id}/products`, {
            headers: authHeader(),
            responseType: "json"
        }).then(response => {
            return response;
        }, error => {
            throw error
        });
    }
}

export default new NaturalClientService();
