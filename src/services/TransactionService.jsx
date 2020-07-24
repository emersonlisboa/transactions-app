import http from '../uteis/http-common';

const getAll = (period) => {
    return http.get(`/api/transaction?period=${period}`);
};

const get = (id) => {
    return http.get(`/transaction/${id}`);
};

const create = (data) => {
    return http.post('/transaction', data);
};

const update = (id, data) => {
    return http.put(`/transaction/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/transaction/${id}`);
};

const removeAll = () => {
    return http.delete(`/transaction`);
};

const findByName = (name) => {
    return http.get(`/transaction?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
};
