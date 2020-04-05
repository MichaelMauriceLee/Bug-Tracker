import axios, {AxiosResponse} from 'axios';
import {ITeam, ITeamsEnvelope} from '../models/team';
import {history} from '../..';
import {toast} from 'react-toastify';
import {IUser, IUserFormValues} from '../models/user';
import {IProfile, IPhoto} from '../models/profile';
import { ITicket, ITicketsEnvelope } from '../models/ticket';
import { IStatistics } from '../models/statistics';

/*
 * File that specifies REST endpoints and handles communication to the server
 */

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem('jwt');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//here we are intercepting the response we get from the server
axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!');
    }
    const {status, data, config, headers} = error.response;
    if (status === 404) {
        history.push('/notfound');
    }
    if (status === 401 && headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The token is expired"') {
        window.localStorage.removeItem('jwt');
        history.push('/')
        toast.info('Your session has expired, please login again')
    }
    if (
        status === 400 &&
        config.method === 'get' &&
        data.errors.hasOwnProperty('id')
    ) {
        history.push('/notfound');
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!');
    }
    throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) =>
        axios
            .get(url)
            .then(responseBody),
    post: (url: string, body: {}) =>
        axios
            .post(url, body)
            .then(responseBody),
    put: (url: string, body: {}) =>
        axios
            .put(url, body)
            .then(responseBody),
    del: (url: string) =>
        axios
            .delete(url)
            .then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios
            .post(url, formData, {
                headers: {'Content-type': 'multipart/form-data'}
            })
            .then(responseBody);
    }
};

const Teams = {
    list: (params: URLSearchParams): Promise<ITeamsEnvelope> =>
        axios.get('/teams', {params: params}).then(responseBody),
    details: (id: string) => requests.get(`/teams/${id}`),
    create: (team: ITeam) => requests.post('/teams', team),
    update: (team: ITeam) =>
        requests.put(`/teams/${team.id}`, team),
    delete: (id: string) => requests.del(`/teams/${id}`),
    belong: (id: string) => requests.post(`/teams/${id}/belong`, {}),
    unbelong: (id: string) => requests.del(`/teams/${id}/belong`),
    remove: (id: string, targetId: string) => requests.del(`/teams/${id}/remove/${targetId}`),
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> =>
        requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> =>
        requests.post(`/user/register`, user),
};

const Profiles = {
    get: (username: string): Promise<IProfile> =>
        requests.get(`/profiles/${username}`),
    uploadPhoto: (photo: Blob): Promise<IPhoto> =>
        requests.postForm(`/photos`, photo),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    updateProfile: (profile: Partial<IProfile>) =>
        requests.put(`/profiles`, profile),
};

const Tickets = {
    list: (params: URLSearchParams): Promise<ITicketsEnvelope> => 
    axios.get('/tickets', {params: params}).then(responseBody),
    details: (id: string) => requests.get(`/tickets/${id}`),
    create: (ticket: ITicket) => requests.post('/tickets', ticket),
    update: (ticket: ITicket) => requests.put(`/tickets/${ticket.id}`, ticket),
    assign: (ticket: ITicket) => requests.put(`/tickets/${ticket.id}/assign`, ticket),
    remove: (ticket: ITicket) => requests.put(`/tickets/${ticket.id}/remove`, ticket),
    delete: (id: string) => requests.del(`/tickets/${id}`)
}

const Statistics = {
    statistics: (): Promise<IStatistics> => requests.get(`/statistics`)
}

export default {
    Teams,
    User,
    Profiles,
    Tickets,
    Statistics
};
