interface HttpOptions {
    headers?: Record<string, string>;
    body?: any;
}

export async function get<T>(url: string, options?: HttpOptions): Promise<T> {
    const response = await fetch(url, {
        method: "GET",
        headers: options?.headers ?? {},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    return await response.json() as Promise<T>;
}

export async function post<T>(
    url: string,
    data: any,
    options?: HttpOptions
): Promise<T> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to post ${url}: ${response.statusText}`);
    }

    return await response.json() as Promise<T>;
}

export async function put<T>(
    url: string,
    data: any,
    options?: HttpOptions
): Promise<T> {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to put ${url}: ${response.statusText}`);
    }

    return await response.json() as Promise<T>;
}

export async function del<T>(url: string, options?: HttpOptions): Promise<T> {
    const response = await fetch(url, {
        method: "DELETE",
        headers: options?.headers ?? {},
    });

    if (!response.ok) {
        throw new Error(`Failed to delete ${url}: ${response.statusText}`);
    }

    return await response.json() as Promise<T>;
}
