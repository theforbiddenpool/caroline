import { rest } from 'msw';

export const sessionHandler = rest.get('/api/auth/session', (req, res, ctx) => res(ctx.json({
  user: {
    name: 'john',
    email: 'john@localhost.com',
    image: null,
  },
  expires: '2022-09-01T09:48:41.522Z',
})));

export const sessionHandlerLoggedOut = rest.get('/api/auth/session', (req, res, ctx) => res(ctx.json({})));

const handlers = [
  sessionHandler,
];

export default handlers;
