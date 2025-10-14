import { sendEmail } from './email.js';
import showToast from './toast.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (!form) return;
  console.log('[initContactForm] form found, wiring submit handler');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.contact__btn');

    // Show loading state
    statusDiv.textContent = 'Sending message...';
    statusDiv.style.color = 'var(--clr-slate400)';
    statusDiv.classList.add('show');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';

    // Add subtle animation to form
    form.style.transform = 'scale(0.98)';
    setTimeout(() => {
      form.style.transform = 'scale(1)';
    }, 150);

    try {
      await sendEmail(form);

  // Success - Show toast immediately (green, white text)
  console.log('[initContactForm] sendEmail resolved — alerting and performing soft reset');
  // Simple user-facing alert
  alert('Message sent successfully!');
  // Soft reset: clear the form and UI, scroll to top and focus the first field
  form.reset();
  statusDiv.textContent = '';
  statusDiv.classList.remove('show');
  submitBtn.classList.remove('loading');
  submitBtn.textContent = 'Send Message';
  // Smooth scroll to top so the user notices the page state
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    window.scrollTo(0, 0);
  }
  // Focus the name input for better UX
  const firstInput = form.querySelector('input, textarea, select');
  if (firstInput && typeof firstInput.focus === 'function') firstInput.focus();

    } catch (error) {
      console.error('Email send failed:', error);
      console.log('[initContactForm] sendEmail rejected, showing error toast');
  // On error, show an error toast so user knows it failed (manual dismiss)
  showToast('Failed to send message. Please try again later.', 'error', { duration: 0 });
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Send Message';
    }
  });
}