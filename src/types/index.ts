export type UserRole = 'admin' | 'college' | 'franchise' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface College {
  id: string;
  name: string;
  subdomain: string;
  website: string;
  location: string;
  programs: Program[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  fees: number;
}

export interface Application {
  id: string;
  studentId: string;
  collegeId: string;
  programId: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'waitlisted';
  submittedAt: string;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  pageViews: number;
  averageTimeSpent: number;
  applicationStats: {
    started: number;
    completed: number;
    dropped: number;
  };
}