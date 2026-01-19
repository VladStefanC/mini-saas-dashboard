"use client";

import { useState } from "react";
import { Project, ProjectStatus } from "../src/types/project";



interface Props {
  initialData?: Partial<Project>;
  onSubmit: (data: Omit<Project, "id">) => void;

}


export default function ProjectForm({ initialData = {}, onSubmit }: Props) {
  const [name, setName] = useState(initialData.name || "");
  const [status, setStatus] = useState<ProjectStatus>(initialData.status || "active");
  const [deadline, setDeadLine] = useState(initialData.deadline || "");
  const [assignedTo, setAssignedTo] = useState(initialData.assignedTo || "");
  const [budget, setBudget] = useState(initialData.budget || 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      status,
      deadline,
      assignedTo,
      budget,
    });

  }



  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Project Name</label>
        <input
          className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Status</label>
        <select
          className="w-full rounded border px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        >
          <option value="active">Active</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>

        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Deadline</label>
        <input
          type="date"
          className="w-full rounded border px-3 py-2"
          value={deadline}
          onChange={(e) => setDeadLine(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Assigned To</label>
        <input
          type="Assigned To"
          className="w-full rounded border px-3 py-2"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Budget</label>
        <input
          type="number"
          className="w-full rounded border px-3 py-2"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          required />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Save
        </button>
      </div>
    </form >
  )
}
