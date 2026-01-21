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
    // assignedTo: project.assigned_to,
  }));
  // This doesnt look the greatest on small screens(Im sorry) 
  return (
    <div className="w-full max-w-4xl p-2 sm:p-8 bg-gray-900 rounded-xl shadow-md space-y-4 sm:space-y-8 border border-yellow-150 flex flex-col items-center">
      <div className="w-full overflow-x-auto">
        <table className="min-w-150 w-full text-xs sm:text-sm">
          <thead className="bg-gray-900 text-gray-50">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Name</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Status</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Deadline</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Assigned</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Budget</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mappedProjects.map((project) => (
              <tr key={project.id} className="group hover:bg-gray-600 rounded-full border-gray-100 opacity-100 transition-colors ">
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-50">{project.name}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <span className={`rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-s text-gray-50
                ${project.status.includes("active")
                      ? "bg-yellow-600"
                      : project.status.includes("on_hold")
                        ? "bg-red-600"
                        : project.status.includes("completed")
                          ? "bg-green-600"
                          : "bg-gray-100"}`}>
                    {project.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-50">{project.deadline}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-50">{project.assigned_to}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-50">{project.budget}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-right">
                  <div className="flex flex-row gap-2.5 opacity-20 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(project)}
                      className="text-white bg-blue-700   hover:bg-blue-600  shadow-xs font-medium rounded-full text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 transition-colors" >
                      Edit
                    </button>
                    <button onClick={() => onDelete(project.id)} className="text-white bg-red-700  hover:bg-red-800 shadow-xs font-medium rounded-full text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 transition-colors">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
