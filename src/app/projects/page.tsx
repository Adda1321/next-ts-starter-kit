import Link from "next/link";

const projects = [
  {
    id: "minutemaster",
    name: "MinuteMaster",
    description: "A platform for automated meeting summaries and document generation using OpenAI."
  },
  {
    id: "corkcrm",
    name: "CorkCRM",
    description: "CRM with seamless payment integrations and reusable UI components."
  },
  {
    id: "beatthegym",
    name: "BeatTheGym",
    description: "Mobile app and admin portal for gym management and user engagement."
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
              <Link href={`/projects/${project.id}`} className="text-xl font-semibold text-primary hover:underline">
                {project.name}
              </Link>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{project.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/" className="text-primary hover:underline">&larr; Back to Portfolio</Link>
        </div>
      </div>
    </div>
  );
} 