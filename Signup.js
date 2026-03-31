// signup.js — Create Account logic for signup.html

document.getElementById('signupBtn').addEventListener('click', function () {
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value;
  const confirmPassword = document.getElementById('confirmPasswordInput').value;

  // Check name is not empty
  if (!name) {
    alert('Please enter your full name.');
    return;
  }

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
    alert('Please create a password.');
    return;
  }

  // Check password length
  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  // Check passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  // All checks passed — redirect to sign in page
  alert('Account created successfully! Please sign in.');
  window.location.href = 'index.html';
});