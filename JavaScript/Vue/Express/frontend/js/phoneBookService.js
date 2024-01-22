import axios from "axios";

function executeGet(url, data) {
    return axios.get(url, {
        params: data
    }).then(response => response.data);
}

function executePost(url, data) {
    return axios.post(url, data).then(response => response.data);
}

function executeDelete(url) {
    return axios.delete(url).then(response => response.data);
}

export default class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/contacts";
    }

    getContacts(term) {
        return executeGet(this.baseUrl, {term});
    }

    deleteContact(id) {
        return executeDelete(`${this.baseUrl}/${id}`);
    }

    updateContact(contact) {
        return executePost(`${this.baseUrl}?id=${contact.id}`, contact);
    }

    createContact(contact) {
        return executePost(this.baseUrl, contact);
    }
};