import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function makeHttpRequest<T>(
    requestConfig: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    const response = await axios(requestConfig);
    return response.data;
}

export async function httpGet<T>(url: string): Promise<AxiosResponse<T>> {
    return await makeHttpRequest<T>({
        method: 'GET',
        url: url,
    });
}

export async function httpPost<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return await makeHttpRequest<T>({
        method: 'POST',
        url: url,
        data: data,
    });
}

export async function httpPut<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return await makeHttpRequest<T>({
        method: 'PUT',
        url: url,
        data: data,
    });
}

export async function httpDelete<T>(url: string): Promise<AxiosResponse<T>> {
    return await makeHttpRequest<T>({
        method: 'DELETE',
        url: url,
    });
}
