"use client";

import ProjectBoard from "./components/ProjectBoard"
import { useState, useEffect } from "react";
import { Project } from "./src/types/project";
import Modal from "./components/Modal";
import ProjectForm from "./components/ProjectForm";
import { getProjects, createProject, updateProject, deleteProject } from "./lib/projectsApi"

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Project["status"]>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  }

  async function handleCreateProject(data: Omit<Project, "id">) {
    await createProject(data);
    setIsModalOpen(false);
    fetchProjects();
  }


  async function handleUpdateProject(data: Omit<Project, "id">) {
    if (!selectedProject) return;

    await updateProject(selectedProject.id, data);
    setSelectedProject(null);
    setIsModalOpen(false);
    fetchProjects();
  }

  async function handleDeleteProject(id: string) {
    await deleteProject(id);
    fetchProjects()
  }


  const filteredProjects = projects.filter((project) => {
    const matchSearches = project.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchSearches && matchesStatus
  })

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mini SaaS Dashboard</h1>
        <button
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Add Project
        </button>

      </div>
      <p className="mt-2 text-gray-600">
        Project Management Dashboard
      </p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 rounded border px-3 py-2"
        />
        <select value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="w-full sm:w-64 rounded border px-3 py-2"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {isLoading ? (<p className="mt-6">Loading projects...</p>)
        :
        (<ProjectBoard projects={filteredProjects} onEdit={(projects) => {
          setSelectedProject(projects);
          setIsModalOpen(true)
        }
        }
          onDelete={handleDeleteProject} />
        )}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);

        }}
        title={selectedProject ? "Edit Project" : "Add Project"}
      >
        <div className="bg-gray-900 border-0 rounded-lg p-8 shadow-lg">
          <ProjectForm
            initialData={selectedProject ?? undefined}
            onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
          />
        </div>
      </Modal>
    </main >
  );
}
