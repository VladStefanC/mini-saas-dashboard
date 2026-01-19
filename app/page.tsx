"use client";

import ProjectBoard from "./components/ProjectBoard";
import { useState, useEffect } from "react";
import { Project } from "./src/types/project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch("api/projects");
      const data = await res.json();
      setProjects(data);
      setIsLoading(false)

    }

    fetchProjects();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Mini Saas Dashboard
      </h1>
      <p className="mt-2 text-gray-600">
        Project management dashboard
      </p>
      {isLoading ? (
        <p className="mt-6">Loading projects...</p>
      ) :
        (
          <ProjectBoard projects={projects} />
        )
      }
    </main>
  );
}
