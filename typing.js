// typing.js — Typewriter animation for home.html
// Preserves Aclonica font on h1 and blue highlight span on "sustainably sourced."

document.addEventListener('DOMContentLoaded', function () {

  const heading = document.getElementById('hero-heading');
  const subtitle = document.getElementById('hero-subtitle');

  // ── What to type ──
  // h1 has two lines then the blue highlight span
  // We'll build it in 3 parts:
  const headingParts = [
    { type: 'text', content: 'Everything you need' },
    { type: 'br' },
    { type: 'text', content: 'for campus,' },
    { type: 'br' },
    { type: 'highlight', content: 'sustainably sourced.' }
  ];

  const subtitleText = 'Join thousands of students at your university buying and selling textbooks, dorm gear, and more.';

  // Speed settings
  const H1_SPEED = 45;       // ms per character for heading
  const SUB_SPEED = 22;      // ms per character for subtitle
  const PAUSE_AFTER_H1 = 320; // ms pause before subtitle starts

  // ── Blinking cursor element ──
  function makeCursor() {
    const c = document.createElement('span');
    c.className = 'typed-cursor';
    return c;
  }

  // ── Type heading with parts ──
  function typeHeading(onDone) {
    const cursor = makeCursor();
    heading.appendChild(cursor);

    let partIndex = 0;
    let charIndex = 0;
    let currentNode = null;

    const tick = setInterval(function () {
      if (partIndex >= headingParts.length) {
        clearInterval(tick);
        cursor.remove();
        if (onDone) onDone();
        return;
      }

      const part = headingParts[partIndex];

      if (part.type === 'br') {
        heading.insertBefore(document.createElement('br'), cursor);
        partIndex++;
        charIndex = 0;
        currentNode = null;

      } else if (part.type === 'text') {
        if (!currentNode) {
          currentNode = document.createTextNode('');
          heading.insertBefore(currentNode, cursor);
        }
        if (charIndex < part.content.length) {
          currentNode.textContent += part.content[charIndex];
          charIndex++;
        } else {
          partIndex++;
          charIndex = 0;
          currentNode = null;
        }

      } else if (part.type === 'highlight') {
        // Create the span on first character
        if (charIndex === 0) {
          const span = document.createElement('span');
          span.className = 'highlight';
          heading.insertBefore(span, cursor);
          currentNode = document.createTextNode('');
          span.appendChild(currentNode);
        }
        if (charIndex < part.content.length) {
          currentNode.textContent += part.content[charIndex];
          charIndex++;
        } else {
          partIndex++;
          charIndex = 0;
          currentNode = null;
        }
      }

    }, H1_SPEED);
  }

  // ── Type subtitle plain text ──
  function typeSubtitle() {
    subtitle.style.opacity = '1';
    const cursor = makeCursor();
    subtitle.appendChild(cursor);

    let i = 0;
    const tick = setInterval(function () {
      if (i < subtitleText.length) {
        cursor.insertAdjacentText('beforebegin', subtitleText[i]);
        i++;
      } else {
        clearInterval(tick);
        cursor.remove();
      }
    }, SUB_SPEED);
  }

  // ── Start sequence ──
  // Hide subtitle until h1 is done
  subtitle.style.opacity = '0';

  typeHeading(function () {
    setTimeout(typeSubtitle, PAUSE_AFTER_H1);
  });

});