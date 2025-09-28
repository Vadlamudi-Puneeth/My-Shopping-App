// Simple test to check if Razorpay is working
export const testRazorpay = () => {
  console.log('Testing Razorpay...');
  
  if (!window.Razorpay) {
    console.error('Razorpay not loaded');
    return false;
  }
  
  try {
    const rzp = new window.Razorpay({
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: 100, // 1 rupee
      currency: 'INR',
      name: 'Test Store',
      description: 'Test Payment',
      handler: function (response) {
        console.log('Test payment successful:', response);
        alert('Test payment successful!');
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999',
      },
    });
    
    console.log('Razorpay instance created successfully');
    return true;
  } catch (error) {
    console.error('Error creating Razorpay instance:', error);
    return false;
  }
};
