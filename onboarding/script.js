// ✅ Firebase config (no modules, using compat CDN)
const firebaseConfig = {
  apiKey: "AIzaSyBfPU9316fanyT-a6wJ5NqRxtCvW-Opsgp",
  authDomain: "claritylaunchbot.firebaseapp.com",
  projectId: "claritylaunchbot",
  storageBucket: "claritylaunchbot.appspot.com",
  messagingSenderId: "558688698630",
  appId: "1:558688698630:web:67de9a65cfe738bd615e87",
  measurementId: "G-6TES3TBL1K"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Handle form submission
document.getElementById('onboardingForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const company = document.getElementById('company').value;
  const email = document.getElementById('email').value;

  try {
    await db.collection("onboarding_submissions").add({
      firstName,
      lastName,
      company,
      email,
      timestamp: new Date()
    });

    console.log("✅ Data saved to Firestore:", {
      firstName,
      lastName,
      company,
      email
    });

    document.getElementById('onboardingForm').classList.add('hidden');
    document.getElementById('confirmation').classList.remove('hidden');
  } catch (err) {
    console.error("❌ Error saving to Firestore:", err);
  }
});