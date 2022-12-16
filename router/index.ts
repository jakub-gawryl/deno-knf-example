import { Router } from "../deps.ts";
import { apiRouter } from "./apiRouter.ts";

const router = Router();

router.use('/api', apiRouter);

export {
  router
}