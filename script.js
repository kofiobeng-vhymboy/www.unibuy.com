/* ============================================================
   UniBuy – script.js
   Handles UI interactions for the Track Your Purchase page
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Toast helper
  ---------------------------------------------------------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;

    toastEl.textContent = message;
    toastEl.classList.add("visible");

    // clear any existing timer so stacked calls don't overlap
    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toastEl.classList.remove("visible");
    }, 2800);
  }

  /* ----------------------------------------------------------
     Mark as received button
  ---------------------------------------------------------- */
  var markBtn = document.getElementById("markReceivedBtn");

  if (markBtn) {
    markBtn.addEventListener("click", function () {
      // Simulate a small loading state then confirm
      var originalText = markBtn.textContent;
      markBtn.textContent = "Processing...";
      markBtn.disabled = true;
      markBtn.style.opacity = "0.7";

      setTimeout(function () {
        markBtn.textContent = "✓ Item Received!";
        markBtn.style.background = "#16a34a"; // slightly deeper green for confirmation
        markBtn.style.opacity = "1";
        showToast("✅ Item marked as received. Payment released to seller.");

        // Advance the stepper to show step 3 as active
        advanceStepper();
      }, 1200);
    });
  }

  /* ----------------------------------------------------------
     Stepper – advance to step 3 after marking received
  ---------------------------------------------------------- */
  function advanceStepper() {
    var steps = document.querySelectorAll(".step");
    var lines = document.querySelectorAll(".step-line");

    // Step 3 becomes current
    if (steps.length >= 3) {
      steps[1].classList.remove("current");
      steps[1].classList.add("completed");

      // Update bubble 2 to show a checkmark
      var bubble2 = steps[1].querySelector(".step-bubble");
      if (bubble2) {
        bubble2.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="18" height="18">' +
          '<polyline points="20 6 9 17 4 12"/>' +
          "</svg>";
      }

      steps[2].classList.remove("pending");
      steps[2].classList.add("current");
    }

    // Second line becomes active
    if (lines.length >= 2) {
      lines[1].classList.add("active-line");
    }

    // Update status message
    var statusLine = document.querySelector(".status-line");
    if (statusLine) {
      statusLine.innerHTML =
        'You\'re currently in the <strong class="status-active">Item Handed Over</strong> phase. ' +
        "Your transaction is complete. Thank you for using UniBuy!";
    }
  }

  /* ----------------------------------------------------------
     Open map button
  ---------------------------------------------------------- */
  var openMapBtn = document.getElementById("openMapBtn");

  if (openMapBtn) {
    openMapBtn.addEventListener("click", function () {
      showToast("📍 Opening live map...");
      // In production this would open Google Maps / in-app map
    });
  }

  /* ----------------------------------------------------------
     Report an issue
  ---------------------------------------------------------- */
  var reportBtn = document.getElementById("reportBtn");

  if (reportBtn) {
    reportBtn.addEventListener("click", function () {
      var confirmed = window.confirm(
        "Are you sure you want to report an issue with this order?\n\nOur support team will review it and get back to you within 24 hours."
      );
      if (confirmed) {
        showToast("⚠️ Issue reported. Our team will contact you shortly.");
      }
    });
  }

  /* ----------------------------------------------------------
     Reschedule meetup
  ---------------------------------------------------------- */
  var rescheduleBtn = document.getElementById("rescheduleBtn");

  if (rescheduleBtn) {
    rescheduleBtn.addEventListener("click", function () {
      showToast("📅 Reschedule request sent to James.");
    });
  }

  /* ----------------------------------------------------------
     Chat with seller
  ---------------------------------------------------------- */
  var chatSellerBtn = document.getElementById("chatSellerBtn");

  if (chatSellerBtn) {
    chatSellerBtn.addEventListener("click", function () {
      showToast("💬 Opening chat with James Blankson...");
    });
  }

  /* ----------------------------------------------------------
     View seller profile
  ---------------------------------------------------------- */
  var viewProfileBtn = document.getElementById("viewProfileBtn");

  if (viewProfileBtn) {
    viewProfileBtn.addEventListener("click", function () {
      showToast("👤 Loading James Blankson's profile...");
    });
  }

  /* ----------------------------------------------------------
     Chat preview row – keyboard + click support
  ---------------------------------------------------------- */
  var chatPreviewRow = document.getElementById("chatPreviewRow");

  if (chatPreviewRow) {
    chatPreviewRow.addEventListener("click", openChat);
    chatPreviewRow.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openChat();
      }
    });
  }

  function openChat() {
    showToast("💬 Opening active chat thread...");
  }

  /* ----------------------------------------------------------
     Search input – clear on Escape
  ---------------------------------------------------------- */
  var searchInput = document.querySelector(".search-input");

  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchInput.value = "";
        searchInput.blur();
      }
    });
  }

  /* ----------------------------------------------------------
     Smooth entrance animations on load
     Uses IntersectionObserver so cards animate in as they appear
  ---------------------------------------------------------- */
  function initFadeIn() {
    var cards = document.querySelectorAll(".card");

    if (!("IntersectionObserver" in window)) {
      // Older browsers – just show everything immediately
      cards.forEach(function (card) {
        card.style.opacity = "1";
      });
      return;
    }

    // Start invisible
    cards.forEach(function (card) {
      card.style.opacity = "0";
      card.style.transform = "translateY(14px)";
      card.style.transition = "opacity 0.45s ease, transform 0.45s ease";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  // Run after DOM is fully ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFadeIn);
  } else {
    initFadeIn();
  }

})();
