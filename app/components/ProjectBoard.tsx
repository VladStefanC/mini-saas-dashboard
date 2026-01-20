import { Project } from "../src/types/project";

interface Props {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

//Project Board Component that renders mock data 
export default function ProjectBoard({ projects, onEdit, onDelete }: Props) {
  const mappedProjects = projects.map(project => ({
    ...project,
    assignedTo: project.assigned_to,
  }));

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Deadline</th>
            <th className="px-4 py-3 text-left font-medium">Assigned</th>
            <th className="px-4 py-3 text-left font-medium">Budget</th>
          </tr>
        </thead>
        {/* Mapping over the data and creating new rows for each element  */}
        <tbody className="divide-y divide-gray-100">
          {mappedProjects.map((project) => (
            <tr key={project.id} className="group hover:bg-gray-50 transition-colors ">
              <td className="px-4 py-3 font-medium text-gray-900">{project.name}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">{project.status.replace("_", " ")}</span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{project.deadline}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{project.assignedTo}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{project.budget}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(project)}
                    className="text-gray-500 hover:text-blue-600" >
                    Edit
                  </button>
                  <button onClick={() => onDelete(project.id)} className="text-gray-500 hover:text-red-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
