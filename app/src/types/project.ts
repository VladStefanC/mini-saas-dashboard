export type ProjectStatus = "active" | "on_hold" | "completed";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  deadline: string; // Date 
  assigned_to: string;
  budget: number;
}
