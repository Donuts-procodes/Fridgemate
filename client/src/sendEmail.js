import emailjs from 'emailjs-com';

const sendEmail = (userName, foodName, expiryDate, userEmail) => {
  const templateParams = {
    name: userName,
    food_name: foodName,
    expiry_date: expiryDate,
    to_email: userEmail,
  };

  emailjs.send(
    'service_o3wws0w',
    'template_0tjvhlv',
    templateParams,
    'mhQZfc-9IMXcf4YJ7'
  )
  .then((response) => {
    console.log('✅ Email sent:', response.text);
  })
  .catch((error) => {
    console.error('❌ Email failed:', error);
  });
};

export default sendEmail;
