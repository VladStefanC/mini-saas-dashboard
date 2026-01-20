import { Project } from "../src/types/project";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");
  return res.json();
}

export async function createProject(data: Omit<Project, "id">) {
  await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateProject(
  id: string,
  data: Omit<Project, "id">
) {
  await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteProject(id: string) {
  await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
}
