// auth.js — Sign In logic for index.html

document.getElementById('signinBtn').addEventListener('click', function () {
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value;

  // Check email is not empty
  if (!email) {
    alert('Please enter your university email.');
    return;
  }

  // Check email ends in .edu
  if (!email.endsWith('.edu')) {
    alert('Email must end in .edu to verify your student status.');
    return;
  }

  // Check password is not empty
  if (!password) {
    alert('Please enter your password.');
    return;
  }

  // Check password length
  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  // All checks passed — redirect to home
  window.location.href = 'home.html';
});