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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.id} className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
              <Link href={`/projects/${project.id}`} className="text-xl font-semibold text-blue-700 hover:underline">
                {project.name}
              </Link>
              <p className="text-slate-700 mt-2">{project.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/" className="text-blue-700 hover:underline">&larr; Back to Portfolio</Link>
        </div>
        </div>
      </div>
    </div>
  );
}