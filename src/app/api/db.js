// Mock database

export let users = [
  { id: 1, username: "ashketchum", password: "password" },
  { id: 2, username: "pikachu", password: "1234" },
];

// Utility to update a user
export function updateUser(id, updatedUser) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    return users[userIndex];
  }
  return null;
}
