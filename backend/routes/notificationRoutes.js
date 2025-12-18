import express from 'express';
import { sendNotification, updateNotificationPreference } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/notify', sendNotification);
router.post('/preference', updateNotificationPreference);

export default router;
