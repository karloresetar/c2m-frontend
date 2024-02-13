import axios from "axios";

const API_URL = 'http://localhost:8080/persons';

export async function savePerson(person) {
    return await axios.post(API_URL, person);
}


export async function getPersons(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}


export async function getPerson(id) {
    return await axios.get(`${API_URL}/${id}`);
}


export async function updatePerson(person) {
    return await axios.post(API_URL, person);
}


export async function updatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deletePerson(id) {
    return await axios.delete(`${API_URL}/${id}`);
}