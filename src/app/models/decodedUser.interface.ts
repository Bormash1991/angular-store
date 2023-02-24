export interface decodedUser {
  username: string;
  email: string;
  id: string;
  role: 'USER' | 'ADMIN';
}
