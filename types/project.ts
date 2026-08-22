export interface ProjectImpact {
  beneficiaries?: number;
  communities?: number;
  partners?: string[];
  duration?: string;
  budget?: string;
  [key: string]: unknown;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  imageUrl: string | null;
  gallery: string[] | null;
  status: "active" | "completed" | "archived";
  category: string;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  impact: ProjectImpact | null;
  partners: string[] | null;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProjectCreateInput = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  slug: string;
};

export type ProjectUpdateInput = Partial<ProjectCreateInput>;
