import * as express from 'express'
const router = express.Router();

router.get('/', function(req: express.Request, res: express.Response) {
  return res.json('Welcome to SMS manager');
});

export default router;
