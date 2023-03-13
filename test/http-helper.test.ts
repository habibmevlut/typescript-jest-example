import { createUser, deleteUser, getUser, getUsers } from "../src/http-call";
import fetchMock from 'jest-fetch-mock';

// import fetch from 'node-fetch';
// jest.mock('node-fetch');

describe('HttpRequest Success test cases', () => {
    describe('GET user by id', () => {
        test('should return data on successful GET request', async () => {
            const user = await getUser(1);
            expect(user).toHaveProperty('id', 1);
            expect(user).toHaveProperty('name', 'Leanne Graham');
        });
    });

    describe('GET users', () => {
        test('should return data on successful GET request', async () => {
            const users = await getUsers();
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBeGreaterThan(0);
            expect(users[0]).toHaveProperty('id');
            expect(users[0]).toHaveProperty('name');
            expect(users[0]).toHaveProperty('email');
            // Add more expectations as needed for the User type.
        });
    });

    describe('POST createUser', () => {
        it('should create a user', async () => {
            const mockUser = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '555-1234',
            };
            const createdUser = await createUser(mockUser);
            expect(createdUser).toHaveProperty('id');
            expect(createdUser.name).toEqual(mockUser.name);
            expect(createdUser.email).toEqual(mockUser.email);
            expect(createdUser.phone).toEqual(mockUser.phone);
            // Add more expectations as needed for the IUserInput type.
        });
    });

    // describe('PUT updateUser', () => {
    //     beforeEach(() => {
    //         jest.resetAllMocks();
    //     });
    //
    //     test('should call the put function with the correct URL and data', async () => {
    //         const user: User = {
    //             id: 1,
    //             name: 'John Doe',
    //             email: 'john@example.com',
    //         };
    //         const expectedResponse: User = {
    //             id: 1,
    //             name: 'Jane Doe',
    //             email: 'jane@example.com',
    //         };
    //
    //         // mock the fetch response
    //         fetchMock.mockOnce(JSON.stringify(expectedResponse), {
    //             status: 200,
    //             headers: {'Content-Type': 'application/json'},
    //         });
    //
    //         const response = await updateUser(user);
    //         console.log(fetchMock.mock)
    //         expect(fetchMock.mock.calls.length).toBe(1);
    //         expect(fetchMock.mock.calls[0][0]).toBe(`https://jsonplaceholder.typicode.com/users/${user.id}`);
    //         expect(fetchMock.mock.calls[0][1]).toMatchObject({
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(user),
    //         });
    //         expect(response).toEqual(expectedResponse);
    //     });
    //
    //     test('should throw an error if the fetch response is not ok', async () => {
    //         const user: User = {
    //             id: 1,
    //             name: 'John Doe',
    //             email: 'john@example.com',
    //         };
    //
    //         // mock the fetch response to have a non-ok status
    //         fetchMock.mockOnce(JSON.stringify({}), {
    //             status: 400,
    //             headers: {'Content-Type': 'application/json'},
    //         });
    //
    //         await expect(updateUser(user)).rejects.toThrowError('Failed to put');
    //     });
    // });

    describe('DELETE User', () => {
        beforeEach(() => {
            fetchMock.resetMocks();
        });

        test('should make a DELETE request to the correct URL', async () => {
            const mockResponse = { ok: true };
            fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
            const userId = 1123;
            await deleteUser(userId);
            expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                method: 'DELETE',
            });
        });

        // it('should throw an error if the request fails', async () => {
        //     const mockError = new Error('Failed to delete user');
        //     fetchMock.mockRejectOnce(mockError);
        //     const userId = 123;
        //     await expect(deleteUser(userId)).rejects.toThrow('Failed to delete user');
        // });

        // it('should resolve with void if the request succeeds', async () => {
        //     const mockResponse = { ok: true };
        //     fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
        //     const userId = 1;
        //     await expect(deleteUser(userId)).resolves.toBe(undefined);
        // });
    });
});
