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
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-start gap-y-4 pt-26 px-2">
      <div className="w-full max-w-4xl p-2 sm:p-8 bg-gray-900 rounded-xl shadow-md space-y-4 sm:space-y-8 border border-yellow-150 flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-50 font-serif text-center">Mini SaaS Dashboard</h3>
        <p className="mt-2 text-gray-50 font-extralight text-center text-sm sm:text-base">
          Simple dashboard to track project progress, deadlines and who is in charge. Also the costs.
        </p>
      </div>
      <div className="w-full max-w-4xl p-2 sm:p-8 bg-gray-900 rounded-xl shadow-md space-y-4 sm:space-y-8 border border-yellow-150 flex flex-col items-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 rounded bg-gray-50 px-3 py-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="w-full sm:w-64 rounded border-t-amber-600 bg-gray-50 px-3 py-2"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>
        </select>
        <div className="w-full flex justify-center">
          <button
            onClick={() => {
              setSelectedProject(null);
              setIsModalOpen(true);
            }}
            className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-400 w-full sm:w-auto"
          >
            + Add Project
          </button>
        </div>
      </div>
      {isLoading ? (
        <p className="mt-6">Loading projects...</p>
      ) : (
        <ProjectBoard projects={filteredProjects} onEdit={(projects) => {
          setSelectedProject(projects);
          setIsModalOpen(true)
        }}
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
        <div className="w-full max-w-3xl bg-gray-900 rounded-lg">
          <ProjectForm
            initialData={selectedProject ?? undefined}
            onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
          />
        </div>
      </Modal>
    </main>
  );
}
