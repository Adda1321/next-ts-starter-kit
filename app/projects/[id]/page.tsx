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

// Define the props type explicitly
type ProjectDetailProps = {
  params: Promise<{ id: string }>; // params is a Promise in Next.js App Router
};

// Server component, not static
export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const resolvedParams = await params; // Resolve the Promise to get the actual params
  const project = projects[resolvedParams.id as keyof typeof projects];
  if (!project) return notFound();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{project.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Tech Stack:</span>
          <ul className="list-disc list-inside ml-4">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6 text-gray-600 dark:text-gray-400">{project.details}</div>
        <Link href="/" className="text-primary hover:underline">
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}