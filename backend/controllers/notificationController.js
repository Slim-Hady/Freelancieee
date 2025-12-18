import { MessageSender, NotificationStrategyFactory } from '../patterns/strategy/NotificationStrategy.js';
import User from '../models/User.js';

export const sendNotification = async (req, res) => {
  try {
    const { recipient, message, notificationType } = req.body;

    if (!recipient || !message || !notificationType) {
      return res.status(400).json({
        success: false,
        message: 'Recipient, message, and notification type are required'
      });
    }

    // Use Strategy pattern to send notification
    const strategy = NotificationStrategyFactory.createStrategy(notificationType);
    const messageSender = new MessageSender(strategy);
    const result = messageSender.send(recipient, message);

    res.status(200).json({
      success: true,
      message: 'Notification sent successfully',
      details: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateNotificationPreference = async (req, res) => {
  try {
    const { userId, preferredNotification } = req.body;

    if (!userId || !preferredNotification) {
      return res.status(400).json({
        success: false,
        message: 'User ID and preferred notification type are required'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { preferredNotification },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification preference updated',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
