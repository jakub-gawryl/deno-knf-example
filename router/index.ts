import { Router } from "https://deno.land/x/opine@2.3.3/mod.ts";
import { apiRouter } from "./apiRouter.ts";

const router = Router();

router.use('/api', apiRouter);

export {
  router
}