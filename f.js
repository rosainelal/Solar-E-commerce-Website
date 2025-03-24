document.addEventListener('DOMContentLoaded', () => {
    const forgetPasswordForm = document.getElementById('forgetPasswordForm');
    const verifyOtpForm = document.getElementById('verifyOtpForm');
    const message = document.getElementById('message');
  
    forgetPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(forgetPasswordForm);
      try {
        const response = await fetch('/sendOtp', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        message.innerText = data.msg;
        if (response.status === 200) {
          forgetPasswordForm.style.display = 'none';
          verifyOtpForm.style.display = 'block';
        }
      } catch (error) {
        console.error('Error:', error);
        message.innerText = 'Error sending OTP. Please try again later.';
      }
    });
  
    verifyOtpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(verifyOtpForm);
      try {
        const response = await fetch('/verifyOtp', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        message.innerText = data.msg;
      } catch (error) {
        console.error('Error:', error);
        message.innerText = 'Error verifying OTP. Please try again later.';
      }
    });
  });

  