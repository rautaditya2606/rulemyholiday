/**
 * Enquire Concierge Modal & Toast Notifications
 */
export function initBookingModal() {
  const modal = document.getElementById('enquireModal');
  const openButtons = document.querySelectorAll('.trigger-enquire-modal');
  const closeBtn = document.getElementById('closeEnquireModal');
  const form = document.getElementById('enquireForm');
  const toast = document.getElementById('luxuryToast');
  const destInput = document.getElementById('enquireDestination');

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = message;
    toast.classList.add('is-active');
    setTimeout(() => {
      toast.classList.remove('is-active');
    }, 4500);
  }

  function openEnquire(prefillDestination = '') {
    if (!modal) return;
    if (destInput && prefillDestination) {
      destInput.value = prefillDestination;
    }
    modal.classList.add('is-active');
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const trip = btn.dataset.trip || '';
      openEnquire(trip);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('is-active'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-active');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Securing VIP Priority...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (modal) modal.classList.remove('is-active');
        form.reset();
        if (submitBtn) {
          submitBtn.textContent = 'Submit VIP Request';
          submitBtn.disabled = false;
        }
        showToast('Your concierge inquiry has been confirmed! A travel designer will contact you within 2 hours.');
      }, 600);
    });
  }

  return { openEnquire, showToast };
}
