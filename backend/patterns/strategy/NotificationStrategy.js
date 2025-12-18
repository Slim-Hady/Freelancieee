// Base Notification Strategy class (simulates interface)
class NotificationStrategy {
  sendNotification(recipient, message) {
    throw new Error('sendNotification() must be implemented by subclass');
  }
}

// Email Notification Strategy
class EmailNotifier extends NotificationStrategy {
  sendNotification(recipient, message) {
    console.log(`[EMAIL] Sending to ${recipient}: ${message}`);
    return {
      success: true,
      method: 'email',
      recipient,
      message,
      timestamp: new Date().toISOString()
    };
  }
}

// SMS Notification Strategy
class SmsNotifier extends NotificationStrategy {
  sendNotification(recipient, message) {
    console.log(`[SMS] Sending to ${recipient}: ${message}`);
    return {
      success: true,
      method: 'sms',
      recipient,
      message,
      timestamp: new Date().toISOString()
    };
  }
}

// Push Notification Strategy
class PushNotifier extends NotificationStrategy {
  sendNotification(recipient, message) {
    console.log(`[PUSH] Sending to ${recipient}: ${message}`);
    return {
      success: true,
      method: 'push',
      recipient,
      message,
      timestamp: new Date().toISOString()
    };
  }
}

// In-App Notification Strategy
class InAppNotifier extends NotificationStrategy {
  sendNotification(recipient, message) {
    console.log(`[IN-APP] Sending to ${recipient}: ${message}`);
    return {
      success: true,
      method: 'inapp',
      recipient,
      message,
      timestamp: new Date().toISOString()
    };
  }
}

// Context class that uses a notification strategy
class MessageSender {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  send(recipient, message) {
    if (!this.strategy) {
      throw new Error('Notification strategy not set');
    }
    return this.strategy.sendNotification(recipient, message);
  }
}

// Factory to create notification strategies
class NotificationStrategyFactory {
  static createStrategy(type) {
    switch (type.toLowerCase()) {
      case 'email':
        return new EmailNotifier();
      case 'sms':
        return new SmsNotifier();
      case 'push':
        return new PushNotifier();
      case 'inapp':
        return new InAppNotifier();
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  }
}

export { 
  MessageSender, 
  NotificationStrategy, 
  EmailNotifier, 
  SmsNotifier, 
  PushNotifier, 
  InAppNotifier,
  NotificationStrategyFactory 
};
