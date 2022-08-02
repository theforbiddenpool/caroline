import '@testing-library/jest-dom';
import 'whatwg-fetch';
import server from './mocks/api';

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());
