import { prisma } from "./prisma";

async function reset() {
  await prisma.coffeeOrder.deleteMany();
  await prisma.customer.deleteMany();
  console.log("Database reset!");
}

reset()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
