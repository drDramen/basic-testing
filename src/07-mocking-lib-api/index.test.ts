// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/todos/1';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.runAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);

    expect(axiosCreate).toHaveBeenLastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGet = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(relativePath);

    expect(axiosGet).toHaveBeenLastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const response = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: response });

    await expect(throttledGetDataFromApi(relativePath)).resolves.toEqual(
      response,
    );
  });
});
