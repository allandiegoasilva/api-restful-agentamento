import { Router } from "express";
import { create, remove, accept, unaccept, read } from "../controllers/invites.controller";
import { AuthMiddleware } from "../middleware/authentication.middleware";

const router = Router();

router.post("/invite", AuthMiddleware, create);
router.get("/invite/accept", accept);
router.get("/invite", AuthMiddleware, read);
router.put("/invite/:id", AuthMiddleware, unaccept);
router.delete("/invite/:id", AuthMiddleware, remove);

export default router;