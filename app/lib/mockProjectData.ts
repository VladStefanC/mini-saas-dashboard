import { Project } from "../src/types/project";
// let insted of const becaseu this will mock CRUD operation until database is set 
export let mockProjectsData: Project[] = [
  {
    id: '1',
    name: "Website Redesign",
    status: "active",
    deadline: "2026-03-01",
    assignedTo: "Vlad",
    budget: 1000,
  },
  {
    id: '2',
    name: "Mobile App MVP",
    status: "on_hold",
    deadline: "2026-08-01",
    assignedTo: "Stefan",
    budget: 5000,
  },
  {
    id: '3',
    name: "Marketing",
    status: "completed",
    deadline: "2026-01-10",
    assignedTo: "Lisa",
    budget: 8000,
  },
];
