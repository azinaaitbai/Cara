const registerBtn = document.getElementById("registerBtn");

document.getElementById("registerBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBy1_a8e8u8iVCgK1A4jCFbCByRO_UOKT8",
  authDomain: "login-beeab.firebaseapp.com",
  databaseURL: "https://login-beeab-default-rtdb.firebaseio.com",
  projectId: "login-beeab",
  storageBucket: "login-beeab.appspot.com",
  messagingSenderId: "282574347501",
  appId: "1:282574347501:web:4b293d26f3c8dc6801c0e4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

registerBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("here");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const full_name = document.getElementById("full_name").value;
  const user_name = document.getElementById("username").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not correct!!");
    return;
  }
  if (
    validate_field(full_name) == false ||
    validate_field(user_name) == false
  ) {
    alert("One or More Extra Fields is not correct!!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const user_data = {
        email: email,
        full_name: full_name,
        user_name: user_name,
        last_login: Date.now(),
      };

      const dbRef = ref(database, "users/" + user.uid);
      set(dbRef, user_data);

      alert("User Created!!");
    })
    .catch((error) => {
      const errorMessage = error;
      alert(errorMessage);
    });
});

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/; // Properly declare the variable
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
