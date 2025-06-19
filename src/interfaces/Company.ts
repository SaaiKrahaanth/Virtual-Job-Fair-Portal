import { Job } from './Job';

export interface Company {
  id: number;
  name: string;
  location: string;
  sector: string;
  type: string;
  role: string;
  description: string;
  tags: string[];
  time: string;
  requirements: string[];
  perks: string[];
  favourite?: boolean;
  jobs?: Job[]; // Optional: if you want to store jobs inside company
}