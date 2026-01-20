"use client";

import ProjectBoard from "./components/ProjectBoard"
import { useState, useEffect } from "react";
import { Project } from "./src/types/project";
import Modal from "./components/Modal";
import ProjectForm from "./components/ProjectForm";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects();
  }, []);

  async function saveNewProject(data: Omit<Project, "id">) {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    setIsModalOpen(false);
    fetchProjects();
  }

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setIsLoading(false)

  }

  async function editProjects(data: Omit<Project, "id">) {
    if (selectedProject) {
      await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),

      });

    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setIsModalOpen(false)
    setSelectedProject(null)
    fetchProjects();
  }

  async function deleteProject(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this project ?"
    );

    if (!confirmed) return;

    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete project");
    }

    fetchProjects();
  }


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
      {isLoading ? (<p className="mt-6">Loading projects...</p>)
        :
        (<ProjectBoard projects={projects} onEdit={(projects) => {
          setSelectedProject(projects);
          setIsModalOpen(true)
        }
        }
          onDelete={deleteProject} />
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
            onSubmit={selectedProject ? editProjects : saveNewProject}
          />
        </div>
      </Modal>
    </main >
  );
}
