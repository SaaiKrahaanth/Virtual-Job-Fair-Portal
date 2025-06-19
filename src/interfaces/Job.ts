export interface Job {
  id: number;
  title: string;
  description: string;
  companyId: number;
  location: string;
  requirements?: string[];
  perks?: string[];
  tags?: string[];
  type?: string;      // e.g., 'Full-Time', 'Internship'
  postedAt?: string;  // ISO date string or similar
}