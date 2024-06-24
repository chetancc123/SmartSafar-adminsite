import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const RazorpayButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    if (window.Razorpay) {
      var options = {
        "key": "rzp_test_EkAN9YBYF0HgSD",
        "amount": "50000",
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "order_9A33XWu170gUtm",
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error('Razorpay SDK not loaded.');
    }
  };

  return (
    <Button id="rzp-button1" onClick={handleClick}>
      Pay
    </Button>
  );
};

export default RazorpayButton;
