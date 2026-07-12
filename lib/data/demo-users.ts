export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN";
  image: string;
}

/**
 * Demo accounts usable when no real database is connected yet.
 * Documented in docs/ASSUMPTIONS.md.
 */
export const demoUsers: DemoUser[] = [
  {
    id: "demo-customer",
    name: "Amaka Johnson",
    email: "customer@lukmoore.com",
    password: "password123",
    role: "CUSTOMER",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Amaka+Johnson",
  },
  {
    id: "demo-vendor",
    name: "Auralux Electronics",
    email: "vendor@lukmoore.com",
    password: "password123",
    role: "VENDOR",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Auralux+Electronics",
  },
  {
    id: "demo-admin",
    name: "Lukmoore Admin",
    email: "admin@lukmoore.com",
    password: "password123",
    role: "ADMIN",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lukmoore+Admin",
  },
];

export function findDemoUser(email: string) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}
