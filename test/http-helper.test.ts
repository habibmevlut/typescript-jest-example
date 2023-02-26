import { createUser, deleteUser, getUser, updateUser } from "../src/http-call";

describe('httpRequest', () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const post = {id: 1, name: 'Test123', email: 'test@gmail.com'};

    describe('GET', () => {
        it('should return data on successful GET request', async () => {
            const response = getUser(1);
            // @ts-ignore
            expect(response?.status).toBe(200);
            // @ts-ignore
            expect(response?.data?.length).toBeGreaterThan(0);
        });
    });

    describe('POST', () => {
        it('should return the created data on successful POST request', async () => {

            const response = await createUser(post);
            expect(response.status).toBe(201);
            // @ts-ignore
            expect(response.data?.title).toEqual(post.title);
            // @ts-ignore
            expect(response.data.body).toEqual(post.body);
            // @ts-ignore
            expect(response.data.userId).toEqual(post.userId);
        });
    });

    describe('PUT', () => {
        it('should update the data on successful PUT request', async () => {
            const putUrl = `${url}/1`;
            const updatedPost = {id: 1, name: 'Test123123123', email: 'test@gmail.com'};
            const response = await updateUser(updatedPost);
            expect(response.status).toBe(200);
            // @ts-ignore
            expect(response.data.title).toEqual(updatedPost.title);
            // @ts-ignore
            expect(response.data.body).toEqual(updatedPost.body);
            // @ts-ignore
            expect(response.data.userId).toEqual(updatedPost.userId);
        });
    });

    describe('DELETE', () => {
        it('should delete the data on successful DELETE request', async () => {
            const id = 1;
            const response = await deleteUser(id);
            // @ts-ignore
            expect(response.status).toBe(200);
            // @ts-ignore
            expect(response.data).toEqual({});
        });
    });
});
