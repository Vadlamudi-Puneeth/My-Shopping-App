// Razorpay configuration
const RAZORPAY_KEY_ID = 'rzp_test_1DP5mmOlF5G5ag'; // Demo key for testing

export const initializeRazorpay = async () => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      resolve(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      console.log('Razorpay script already exists, waiting for load...');
      // Script is already being loaded, wait for it
      const checkRazorpay = () => {
        if (window.Razorpay) {
          console.log('Razorpay loaded after waiting');
          resolve(true);
        } else {
          setTimeout(checkRazorpay, 100);
        }
      };
      checkRazorpay();
      return;
    }

    console.log('Loading Razorpay script...');
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully');
      resolve(true);
    };
    script.onerror = (error) => {
      console.error('Failed to load Razorpay SDK:', error);
      resolve(false);
    };
    document.head.appendChild(script);
  });
};

export const openRazorpayPayment = (options) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Opening Razorpay with options:', options);
      
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded'));
        return;
      }

      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: options.amount,
        currency: options.currency || 'INR',
        name: options.name || 'Demo Store',
        description: options.description || 'Payment for your order',
        handler: function (response) {
          console.log('Payment successful:', response);
          resolve(response);
        },
        prefill: {
          name: options.customer_name || 'Demo User',
          email: options.customer_email || 'demo@example.com',
          contact: options.customer_contact || '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal dismissed');
            reject(new Error('Payment cancelled by user'));
          },
        },
      });

      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        reject(new Error('Payment failed: ' + response.error.description));
      });

      rzp.open();
    } catch (error) {
      console.error('Error creating Razorpay instance:', error);
      reject(error);
    }
  });
};
