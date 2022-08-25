export const john = {
  user: {
    id: 'cl6yukoqn0010tfm0ncina1nw',
    name: 'john',
    email: 'john@example.com',
    image: null,
  },
  expires: '2022-09-01T09:48:41.522Z',
};

export const johnNoName = {
  ...john,
  user: {
    ...john.user,
    name: null,
  },
};

export default { john, johnNoName };
