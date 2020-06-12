import axios, { AxiosResponse } from 'axios';
import { IUserFormValues, IUser, IUserSettings } from '../models/user';
import { IRecipe, IManageRecipe } from '../models/recipe';
import { IDetails } from '../models/details';


axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    // const {status, data, config} = error.response;
    // if (status === 404) {
    //     history.push('/notfound')
    // }
    // if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
    //     history.push('/notfound')
    // }
    // if (status === 500) {
    //     toast.error('Server error - check the terminal for more info!')
    // }
    throw error.response;
})


const responseBody = (response:AxiosResponse) => response.data.result;

const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body:{}) => axios.post(url, body).then(responseBody),
    put: (url:string, body:{}) => axios.put(url, body).then(responseBody),
    del: (url:string) => axios.delete(url).then(responseBody)
};

const Recipes = {
    home: (gender:string, district:string) => requests.get(`/api/home?gender=${gender}&district=${district}`),
    details: (id:string):Promise<IRecipe> => requests.get(`/api/recipe/details?id=${id}`),
    add: (recipe:IRecipe) => requests.post('/api/recipe/add', recipe),
    deleteRecipe: (id: string):Promise<string> => requests.del(`api/manage/deleterecipe?id=${id}`),
    listall: () => requests.get(`api/manage/listallrecipes`)
};

const User = {
    current: ():Promise<IUser> => requests.get('api/account'),
    login: (user:IUserFormValues):Promise<IUser> => requests.post('api/account/login', user),
    register: (user:IUserFormValues):Promise<IUser> => requests.post('api/account/register', user),
    getuserslist: () => requests.get('api/manage/getuserslist'),
    deleteUser: (id: string):Promise<boolean> => requests.del(`api/manage/deleteuser?id=${id}`),
    changeLockoutStatus: (user: IUserSettings):Promise<boolean> => requests.post('api/manage/changelockoutstatus', user)
}

export default{
    Recipes,
    User
};