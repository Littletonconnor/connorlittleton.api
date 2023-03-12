import { hashPassword } from "../auth";
import { prisma } from "../lib/prisma";
import { logger } from "./logger";

async function createCustomer() {
  const password = await hashPassword("password");

  return await prisma.customer.create({
    data: {
      name: "John Doe",
      password,
      email: "johndoe@example.com",
    },
  });
}

async function createCoffeeOrder(id: number) {
  return await prisma.coffeeOrder.create({
    data: {
      customerId: id,
      coffeeType: "Latte",
      size: "Medium",
      milkType: "Whole Milk",
      sugar: true,
      notes: "Extra foam please",
    },
  });
}

async function seed() {
  const user = await prisma.customer.findFirst();
  if (user) {
    logger.error("Seed data already exists");
  }

  const customer = await createCustomer();
  await createCoffeeOrder(customer.id);
  logger.log("Seed data created!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
