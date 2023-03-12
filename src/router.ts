import { Router } from "express";
import { getCoffee, getCoffees, postCoffee, stub } from "./coffee";

const router = Router();

router.get("/coffee", getCoffees);
router.get("/coffee/:id", getCoffee);
router.post("/coffee", postCoffee);
router.put("/coffee/:id", stub);
router.delete("/coffee/:id", stub);

export { router };
