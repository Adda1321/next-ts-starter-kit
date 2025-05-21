// Seed script for portfolio database
// Populates User, Project, and Contact tables with sample data
import prisma from '../src/db';

const userId = 1; // Use Int for id as per schema.prisma
const createdAt = new Date();

// Upsert a test user with projects
const upsertTestUser = async () => {
  const user = {
    name: 'Test User',
    email: 'test@yopmail.com',
    createdAt,
  };

  await prisma.user.upsert({
    where: { id: userId },
    update: {
      ...user,
    },
    create: {
      id: userId,
      ...user,
      projects: {
        create: [
          {
            title: 'MinuteMaster',
            description: 'A platform for automated meeting summaries and document generation using OpenAI.',
            url: 'https://minutemaster.com',
            createdAt,
          },
          {
            title: 'CorkCRM',
            description: 'CRM with seamless payment integrations and reusable UI components.',
            url: 'https://corkcrm.com',
            createdAt,
          },
        ],
      },
    },
  });
};

// Create a sample contact message
const createContact = async () => {
  await prisma.contact.create({
    data: {
      name: 'Sample Contact',
      email: 'contact@example.com',
      message: 'Hello, this is a test message!',
      createdAt,
    },
  });
};

// Main seed function
async function main() {
  await upsertTestUser();
  await createContact();
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 