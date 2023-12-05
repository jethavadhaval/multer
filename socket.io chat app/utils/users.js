const users = [];

export const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

export const getCurrentUser = (id) => users.find((user) => user.id === id);

export const userLeaveChat = (id) => {
  const i = users.findIndex((user) => user.id === id);
  if (i !== -1) return users.splice(i, 1)[0];
};

export const getUsersRoom = (room) =>
  users.filter((user) => user.room === room);
