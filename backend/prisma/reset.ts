import { prisma } from '../src/prisma.js';

async function main() {
  console.log('delete contacts');

  await prisma.contact.deleteMany({});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
