// Base Payment Processor class (simulates interface)
class PaymentProcessor {
  processPayment(amount) {
    throw new Error('processPayment() must be implemented by subclass');
  }
}

// Credit Card Processor
class CreditCardProcessor extends PaymentProcessor {
  processPayment(amount) {
    const transactionId = `CC-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    return {
      success: true,
      message: `Credit Card payment of $${amount} processed successfully`,
      transactionId,
      paymentType: 'creditcard'
    };
  }
}

// PayPal Processor
class PayPalProcessor extends PaymentProcessor {
  processPayment(amount) {
    const transactionId = `PP-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    return {
      success: true,
      message: `PayPal payment of $${amount} processed successfully`,
      transactionId,
      paymentType: 'paypal'
    };
  }
}

// Bank Transfer Processor
class BankTransferProcessor extends PaymentProcessor {
  processPayment(amount) {
    const transactionId = `BT-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    return {
      success: true,
      message: `Bank Transfer of $${amount} initiated successfully`,
      transactionId,
      paymentType: 'banktransfer'
    };
  }
}

// Crypto Processor
class CryptoProcessor extends PaymentProcessor {
  processPayment(amount) {
    const transactionId = `CRYPTO-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    return {
      success: true,
      message: `Cryptocurrency payment of $${amount} processed successfully`,
      transactionId,
      paymentType: 'crypto'
    };
  }
}

// Payment Processor Factory
class PaymentProcessorFactory {
  static createProcessor(type) {
    switch (type.toLowerCase()) {
      case 'creditcard':
        return new CreditCardProcessor();
      case 'paypal':
        return new PayPalProcessor();
      case 'banktransfer':
        return new BankTransferProcessor();
      case 'crypto':
        return new CryptoProcessor();
      default:
        throw new Error(`Unknown payment type: ${type}`);
    }
  }
}

export { PaymentProcessorFactory, PaymentProcessor, CreditCardProcessor, PayPalProcessor, BankTransferProcessor, CryptoProcessor };
