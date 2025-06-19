export interface User {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  role: 'admin' | 'company' | 'user' | string; // add more roles if needed
}