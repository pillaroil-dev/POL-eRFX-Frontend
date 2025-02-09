export interface User {
  id: number;
  role: string;
  // Add other user properties as needed
}

export interface UserData {
  id: number;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  businessPhone: string | null;
  homePhone?: string | null;
  userId: number;
  user: User;
  phone?: string;
  address?: string;
  contractor?: any;
  role?: string;
  fullname?: string;
}
