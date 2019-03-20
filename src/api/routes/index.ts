import * as express from 'express';
import { Contact, Message } from '../controllers';
const router = express.Router();

router.get('/', function(req: express.Request, res: express.Response) {
  return res.json('Welcome to SMS manager');
});

router.post('/api/contact', Contact.add);
router.get('/api/contact/:phoneNumber', Contact.get);
router.patch('/api/contact/:phoneNumber', Contact.update);
router.delete('/api/contact/:phoneNumber', Contact.delete);
router.get('/api/contact/messages/:phoneNumber', Contact.getAllMessages);
router.get('/api/contact/messages/sent/:phoneNumber', Contact.getAllMessagesSentByContact);
router.get('/api/contact/messages/received/:phoneNumber', Contact.getAllMessagesReceivedByContact);

router.post('/api/message', Message.add);
router.get('/api/message/:messageId', Message.get);
router.patch('/api/message/:messageId', Message.update);
router.delete('/api/message/:messageId', Message.delete);

export default router;
