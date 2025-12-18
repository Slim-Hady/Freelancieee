// Test script to verify design patterns work independently
import { PaymentProcessorFactory } from './patterns/factory/PaymentProcessorFactory.js';
import { MessageSender, NotificationStrategyFactory } from './patterns/strategy/NotificationStrategy.js';

console.log('=== Testing Design Patterns ===\n');

// Test Factory Pattern
console.log('1. FACTORY PATTERN TEST (Payment Processing)');
console.log('-'.repeat(50));

const paymentTypes = ['creditcard', 'paypal', 'banktransfer', 'crypto'];
paymentTypes.forEach(type => {
  const processor = PaymentProcessorFactory.createProcessor(type);
  const result = processor.processPayment(100);
  console.log(`${type.toUpperCase()}:`, result.message);
  console.log(`  Transaction ID: ${result.transactionId}\n`);
});

// Test Strategy Pattern
console.log('\n2. STRATEGY PATTERN TEST (Notifications)');
console.log('-'.repeat(50));

const notificationTypes = ['email', 'sms', 'push', 'inapp'];
const messageSender = new MessageSender();

notificationTypes.forEach(type => {
  const strategy = NotificationStrategyFactory.createStrategy(type);
  messageSender.setStrategy(strategy);
  const result = messageSender.send('user@example.com', 'Test notification message');
  console.log(`${type.toUpperCase()}:`, result.method, '- Success:', result.success);
});

console.log('\n=== All Pattern Tests Completed Successfully ===');
