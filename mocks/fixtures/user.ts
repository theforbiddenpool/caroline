import { User } from '@prisma/client';

interface UserSession {
  user: Pick<User, 'id' | 'name' | 'email' | 'image'>;
  expires: Date | string;
}

export const john: UserSession = {
  user: {
    id: 'cl6yukoqn0010tfm0ncina1nw',
    name: 'john',
    email: 'john@example.com',
    image: null,
  },
  expires: '2022-09-01T09:48:41.522Z',
};

export const johnNoName: UserSession = {
  ...john,
  user: {
    ...john.user,
    name: null,
  },
};

export default { john, johnNoName };
