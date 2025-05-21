'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center px-4 sm:px-8">
      {/* Header */}
      <header className="w-full max-w-3xl flex flex-col items-center gap-2 pt-12 pb-6 border-b border-gray-200 dark:border-gray-800">
        <Image
          src="/profile-placeholder.png" // Add your profile image in public folder
          alt="Adil Mustafa profile photo"
          width={96}
          height={96}
          className="rounded-full border-4 border-primary mb-2"
        />
        <h1 className="text-3xl font-bold tracking-tight">Adil Mustafa</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Johar Town, Lahore</p>
        <div className="flex gap-4 mt-2">
          <a href="mailto:adilmustafa13@gmail.com" className="hover:underline text-primary">adilmustafa13@gmail.com</a>
          <span className="text-gray-400">|</span>
          <a href="https://linkedin.com/in/adil-mustafa1325" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">LinkedIn</a>
        </div>
        <div className="text-xs text-gray-400 mt-1">+92 303 5103015</div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-3xl flex-1 flex flex-col gap-10 py-8">
        {/* About Me */}
        <section>
          <h2 className="text-xl font-semibold mb-2">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Results-driven Software Engineer with 3+ years of experience in full-stack development. Proven track record of delivering high-performance, scalable solutions for startups and established businesses. Passionate about clean code, user-centric design, and seamless user experiences.
          </p>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Technical Skills</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
            <li><span className="font-bold">Frontend:</span> React.js | NEXT.ts | ReactNative | MUI | Tailwind | Capacitor.js</li>
            <li><span className="font-bold">Backend:</span> GraphQL | Prisma | Node.js | Ruby | PostgreSQL | Mongo DB | Puppeteer.js</li>
            <li><span className="font-bold">Tools:</span> Git, Docker, Datadog, Sentry, Jira, Linux</li>
          </ul>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <div className="font-bold">B.Sc. Electrical Engineering</div>
            <div>FAST Lahore (2017-2021)</div>
          </div>
        </section>

        {/* Professional Experience */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Professional Experience</h2>
          <div className="mb-4">
            <div className="font-bold">Software Engineer – TechClan (06/2022 – Present)</div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
              <li>Developed and deployed high-performance web applications, CRMs, and eCommerce platforms with scalable architectures.</li>
              <li>Built pixel-perfect, responsive UIs, ensuring cross-browser compatibility and a seamless user experience.</li>
              <li>Integrated third-party services, including authentication systems, payment gateways, and advanced text editors.</li>
              <li>Implemented real-time messaging, group chat functionality, and scheduled notifications to enhance user engagement.</li>
              <li>Used Capacitor.js to extend a React-based web app into a cross-platform mobile application without rewriting the codebase.</li>
              <li>Integrated AWS S3 for storing dynamically generated PDFs from Puppeteer.js, enabling efficient file access and long-term storage.</li>
              <li>Worked with Hasura GraphQL Engine in a Vue.js-based project, enabling real-time access control and query resolution through Hasura's permission system.</li>
              <li>Led team collaboration using Jira and Asana, ensuring efficient sprint planning and on-time project delivery.</li>
            </ul>
          </div>
          <div>
            <div className="font-bold">Associate Software Engineer – TxLabz (11/2021 – 05/2022)</div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
              <li>Developed cross-platform mobile applications using React Native for both iOS and Android.</li>
              <li>Built UI components to enhance reusability and optimize performance across different devices.</li>
              <li>Integrated Firebase for real-time updates, authentication, and cloud-based storage.</li>
              <li>Developed a real-time one-on-one and group chat system with media and voice note attachment support.</li>
            </ul>
          </div>
        </section>

        {/* Notable Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Notable Projects</h2>
          <div className="mb-4">
            <div className="font-bold">
              <Link href="/projects/minutemaster" className="text-primary hover:underline">MinuteMaster – Full-Stack Development (Next.ts | Prisma | GraphQL)</Link>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
              <li>Integrated OpenAI-based document generation, automating meeting summaries and transcriptions.</li>
              <li>Developed role-based access controls, ensuring secure user and admin permissions.</li>
              <li>Built an advanced document editor with editing, signing, and export functionalities, supporting both PDF and Word formats.</li>
              <li>Added complex features in both new and existing codebases, significantly enhancing functionality while maintaining code quality and system stability.</li>
              <li>Implemented Webhooks to trigger backend events and used WebSockets for pushing real-time updates to the frontend interface.</li>
              <li>Integrated Microsoft OAuth 2.0 for secure single sign-on (SSO) login, enhancing enterprise-grade user authentication workflows.</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-bold">
              <Link href="/projects/corkcrm" className="text-primary hover:underline">CorkCRM – Full-Stack Development (React.js | ROR)</Link>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
              <li>Engineered seamless payment integrations, enhancing the CRM's monetization capabilities.</li>
              <li>Developed high-performance, reusable UI components to optimize the user experience.</li>
              <li>Led the development team, ensuring code quality through rigorous pull request (PR) reviews.</li>
            </ul>
          </div>
          <div>
            <div className="font-bold">
              <Link href="/projects/beatthegym" className="text-primary hover:underline">BeatTheGym – Mobile App & Admin Portal (React Native | Firebase)</Link>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
              <li>Designed and developed a mobile app with pixel-perfect UI for both Android and iOS.</li>
              <li>Implemented real-time chat, push notifications, and live updates, improving user engagement.</li>
              <li>Built an intuitive admin portal with data visualization using Chart.js.</li>
              <li>Integrated Google Tag Manager and Google Analytics, providing valuable user insights and behavior tracking.</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <div>Email: <a href="mailto:adilmustafa13@gmail.com" className="text-primary hover:underline">adilmustafa13@gmail.com</a></div>
            <div>Phone: +92 303 5103015</div>
            <div>LinkedIn: <a href="https://linkedin.com/in/adil-mustafa1325" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">adil-mustafa1325</a></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-3xl py-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} Adil Mustafa. All rights reserved.
      </footer>
    </div>
  );
}
