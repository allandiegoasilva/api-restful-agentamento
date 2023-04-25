
import { Router } from 'express';

import { create, read, update, remove, readAll } from '../controllers/user.controller';
import { AuthMiddleware } from '../middleware/authentication.middleware';

const router = Router();

router.post("/user/register", create);
router.get("/user/:id", read);
router.get("/user/", readAll);
router.put("/user/", AuthMiddleware, update);
router.delete("/user", AuthMiddleware, remove);

export default router;