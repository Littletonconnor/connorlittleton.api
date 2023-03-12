import { Request, Response } from "express";
import { prisma } from "./lib/prisma";

// TODO: Add error handling

async function getCoffees(request: Request, response: Response) {
  const data = await prisma.coffeeOrder.findMany();

  response.json({ data });
}

async function getCoffee(request: Request, response: Response) {
  const data = await prisma.coffeeOrder.findUnique({
    where: {
      id: Number(request.params.customerId),
    },
    include: {
      customer: true,
    },
  });

  response.json({ data });
}

async function postCoffee(request: Request, response: Response) {
  const data = await prisma.coffeeOrder.create({
    data: {
      customerId: Number(request.body.customerId),
      coffeeType: request.body.coffeeType,
      size: request.body.size,
      milkType: request.body.milkType,
      sugar: Boolean(request.body.sugar),
      notes: request.body.notes,
    },
  });

  response.json({ data });
}

async function deleteCoffee(request: Request, response: Response) {
  const data = await prisma.coffeeOrder.delete({
    where: {
      id: Number(request.params.customerId),
    },
  });

  response.json({ data });
}

function stub(request: Request, response: Response) {
  response.json({ data: "TODO: Add this endpoint" });
}

export { getCoffees, getCoffee, stub };
export { postCoffee };
