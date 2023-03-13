import { del, get, post, put } from "./http-helper";

export interface User {
    id: number;
    name: string;
    email: string;
    pone?: string;
}

export interface IUserInput {
    name: string;
    email: string;
    phone?: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export async function fetchPosts(): Promise<Post[]> {
    const url = "https://jsonplaceholder.typicode.com/posts";
    return await get<Post[]>(url);
}

export async function getUser(id: number): Promise<User> {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return await get<User>(url);
}

export async function getUsers(): Promise<User[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return await get<User[]>(url);
}

export async function createUser(user: IUserInput): Promise<IUserInput> {
    return await post<User>('https://jsonplaceholder.typicode.com/users', user)
}

export async function updateUser(user: User): Promise<User> {
    return await put<User>(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
}

export async function deleteUser(userId: number): Promise<void> {
    return await del(`https://jsonplaceholder.typicode.com/users/${userId}`);
}
