import { notFound } from "next/navigation";
import Link from "next/link";

const projects = {
  minutemaster: {
    name: "MinuteMaster",
    description: "A platform for automated meeting summaries and document generation using OpenAI.",
    tech: ["Next.js", "Prisma", "GraphQL", "OpenAI", "TailwindCSS"],
    details: "MinuteMaster leverages AI to automate meeting notes, supports role-based access, and offers advanced document editing and export features.",
  },
  corkcrm: {
    name: "CorkCRM",
    description: "CRM with seamless payment integrations and reusable UI components.",
    tech: ["React.js", "Ruby on Rails", "TailwindCSS"],
    details: "CorkCRM enhances monetization for businesses, with a focus on code quality and team collaboration.",
  },
  beatthegym: {
    name: "BeatTheGym",
    description: "Mobile app and admin portal for gym management and user engagement.",
    tech: ["React Native", "Firebase", "Chart.js"],
    details: "BeatTheGym provides real-time chat, push notifications, and analytics for gym users and admins.",
  },
};

type ProjectDetailProps = {
  params: { id: string };
};

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const project = projects[params.id as keyof typeof projects];
  if (!project) return notFound();
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8">
      <div className="w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
        <p className="mb-4 text-slate-700 dark:text-slate-300">{project.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Tech Stack:</span>
          <ul className="list-disc list-inside ml-4">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6 text-slate-700 dark:text-slate-300">{project.details}</div>
        <Link href="/" className="text-blue-700 hover:underline dark:text-blue-300">
          ← Back to Portfolio
        </Link>
      </div>
      </div>
    </div>
  );
}