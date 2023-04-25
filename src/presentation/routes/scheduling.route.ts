import { Router } from "express";
import { create, read, update, remove } from "../controllers/scheduling.controller";
import { AuthMiddleware } from "../middleware/authentication.middleware";

const router = Router();

router.post("/scheduling", AuthMiddleware, create);
router.get("/scheduling/:id?", AuthMiddleware, read);
router.put("/scheduling", AuthMiddleware, update);
router.delete("/scheduling/:id", AuthMiddleware, remove);

export default router;