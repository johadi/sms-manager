import * as express from 'express'
const router = express.Router();

router.get('/', function(req: express.Request, res: express.Response) {
  res.json('Welcome to SMS user routes');
});

export default router;
