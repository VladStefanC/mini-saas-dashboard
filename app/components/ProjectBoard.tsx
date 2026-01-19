import { Project } from "../src/types/project";

interface Props {
  projects: Project[];
  onEdit: (project: Project) => void;
}
//Project Board Component that renders mock data 
export default function ProjectBoard({ projects, onEdit }: Props) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-orange-400">
          <tr>
            <th className="px-4 py-2 text-left font-bold">Name</th>
            <th className="px-4 py-2 text-left font-bold">Status</th>
            <th className="px-4 py-2 text-left font-bold">Deadline</th>
            <th className="px-4 py-2 text-left font-bold">Assigned</th>
            <th className="px-4 py-2 text-left font-bold">Budget</th>
          </tr>
        </thead>
        {/* Mapping over the data and creating new rows for each element  */}
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="px-4 py-2">{project.name}</td>
              <td className="px-4 py-2 capitalize">{project.status.replace("_", " ")}</td>
              <td className="px-4 py-2">{project.deadline}</td>
              <td className="px-4 py-2">{project.assignedTo}</td>
              <td className="px-4 py-2">{project.budget}</td>
              <td className="px-4 py-2">
                <button onClick={() => onEdit(project)}
                  className="text-blue-600 hover:underline" >
                  Edit
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
