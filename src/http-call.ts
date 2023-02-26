import { httpDelete, httpGet, httpPost, httpPut } from "./http-helper";
import { AxiosResponse } from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

export interface IResponseResult {
    data: User[];
    status: number;
}

export async function getUser(id: number): Promise<AxiosResponse<User>> {
    return await httpGet<User>(`https://jsonplaceholder.typicode.com/users${id}`);
}

export async function getUsers(): Promise<AxiosResponse<User[]>> {
    return await httpGet<User[]>('https://jsonplaceholder.typicode.com/users');
}

export async function createUser(user: User): Promise<AxiosResponse<User>> {
    return await httpPost<User>('https://jsonplaceholder.typicode.com/users', user);
}

export async function updateUser(userInput: User): Promise<AxiosResponse<User>> {
    return await httpPut<User>(`https://jsonplaceholder.typicode.com/users/${userInput.id}`, userInput);
}

export async function deleteUser(id: number) {
    await httpDelete<void>(`https://jsonplaceholder.typicode.com/users/${id}`);
}
