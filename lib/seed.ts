import { prisma } from "./prisma";

async function createCustomer() {
  return await prisma.customer.create({
    data: {
      name: "John Doe",
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
  const customer = await createCustomer();
  await createCoffeeOrder(customer.id);

  console.log("Seed data created!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
