# Food Tracker App

This is a full-stack web application built using **React** for the frontend, **Firebase** for authentication, Firestore database, and email notifications, and **Vite** for a fast development setup.

## Features:
- **User Authentication**: Sign up, log in, and log out using Firebase (email/password, Google, phone).
- **Food Management**: Add, view, and delete food items.
- **Expiry Alerts**: Get notified by email when food is nearing its expiry date.
- **Real-Time Data**: Firestore automatically updates the food list.
- **Responsive UI**: Works on both desktop and mobile.

## Tech Stack:
- **Frontend**: React, Vite
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: Bootstrap, React-Bootstrap
- **Email Service**: EmailJS

## Prerequisites:
- **Node.js** and **npm** or **yarn** installed.
- Firebase account (for Firestore and Authentication setup).
- EmailJS account for email notifications.

## Setup & Installation:

1. Clone the repo and navigate into the project directory:
   - Clone the repository from GitHub.
   - Go to the project folder using your terminal or file explorer.

2. Install the dependencies:
   - Use npm or yarn to install the necessary dependencies.

3. Firebase Setup:
   - Create a Firebase project in [Firebase Console](https://console.firebase.google.com/).
   - Add Firebase configuration to `firebaseConfig.js`.

4. Set up EmailJS:
   - Create an account on [EmailJS](https://www.emailjs.com/).
   - Set up an email service and template for expiry notifications.
   - Update the EmailJS configuration in `sendEmail.js`.

5. Run the app locally:
   - Use npm or yarn to start the development server and access the app at `http://localhost:3000`.

6. Firebase Deployment:
   - Install Firebase CLI on your system.
   - Log in to Firebase.
   - Initialize Firebase Hosting in your project directory.
   - Deploy the app to Firebase Hosting.

## License:
MIT License. See the [LICENSE](LICENSE) file for details.
