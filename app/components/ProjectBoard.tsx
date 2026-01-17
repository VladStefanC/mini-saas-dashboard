import { Project } from "../src/types/project";

interface Props {
  projects: Project[]
}

export default function ProjectBoard({ projects }: Props) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-orange-500">
          <tr>
            <th className="px-4 py-2 text-left font-bold">Name</th>
            <th className="px-4 py-2 text-left font-bold">Status</th>
            <th className="px-4 py-2 text-left font-bold">Deadline</th>
            <th className="px-4 py-2 text-left font-bold">Assigned</th>
            <th className="px-4 py-2 text-left font-bold">Budget</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="px-4 py-2">{project.name}</td>
              <td className="px-4 py-2 capitalize">{project.status.replace("_", " ")}</td>
              <td className="px-4 py-2">{project.deadline}</td>
              <td className="px-4 py-2">{project.assignedTo}</td>
              <td className="px-4 py-2">{project.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
