import { rest } from 'msw';
import user from '../../fixtures/user';

export const base = rest.get('/api/auth/session', (req, res, ctx) => res(ctx.json(user.john)));

export const noName = rest.get('/api/auth/session', (req, res, ctx) => res(ctx.json(user.johnNoName)));

export const loggedOut = rest.get('/api/auth/session', (req, res, ctx) => res(ctx.json({})));

const handlers = [
  base,
];

export default handlers;
