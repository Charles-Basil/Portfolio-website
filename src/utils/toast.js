// Lightweight in-page toast utility (no external deps)
export function showToast(message, type = 'success', opts = {}) {
  // Default durations: success 10s, error 8s. If caller passes duration: 0 => persistent until user dismisses.
  const defaultDurations = { success: 10000, error: 8000 };
  const duration = Object.prototype.hasOwnProperty.call(opts, 'duration') ? opts.duration : (defaultDurations[type] ?? 4000);

  // Ensure container
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.role = 'status';
  toast.tabIndex = 0;
  const action = opts.action;
  const icon = type === 'success' ? '✅' : (type === 'error' ? '⚠️' : 'ℹ️');
  toast.innerHTML = `
    <div class="toast__icon">${icon}</div>
    <div class="toast__content">${message}</div>
    ${action ? `<button class="toast__action">${action.label}</button>` : ''}
    <button class="toast__close" aria-label="Dismiss">&times;</button>
  `;

  // Dismiss handler
  function dismiss() {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    clearTimeout(timeout);
  }

  const closeBtn = toast.querySelector('.toast__close');
  closeBtn.addEventListener('click', (ev) => { ev.stopPropagation(); dismiss(); });
  // clicking the toast itself will NOT dismiss it (prevents accidental dismiss)
  // toast.addEventListener('click', dismiss);

  if (action && typeof action.onClick === 'function') {
    const actionBtn = toast.querySelector('.toast__action');
    if (actionBtn) {
      actionBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        try { action.onClick(); } catch (e) { console.error('toast action error', e); }
        dismiss();
      });
    }
  }

  container.appendChild(toast);
  // If error, add a temporary shake to draw attention
  if (type === 'error') {
    toast.classList.add('toast--shake');
    // remove shake class after animation to avoid repeated shaking
    toast.addEventListener('animationend', () => toast.classList.remove('toast--shake'), { once: true });
  }
  console.log('[showToast] showing', message, type);
 
  // Allow CSS transition to kick in
  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  const timeout = setTimeout(dismiss, duration);

  // log dismiss for debugging
  toast.addEventListener('transitionend', () => console.log('[showToast] toast transitionend'));

  // Return a handle in case caller wants to control it
  return { dismiss };
}

export default showToast;
