import { initAIPlanner } from './ai-planner.js';
import { initBookingModal } from './booking-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Modals & Toast
  const { openEnquire, showToast } = initBookingModal();
  initAIPlanner(openEnquire);

  // Ensure Hero Background Video Autoplays reliably
  const heroVideo = document.getElementById('heroBgVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback handled gracefully by poster
      });
    }
  }

  // 2. Navbar Solid Navy on Scroll
  const navbar = document.getElementById('mainNavbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. Search Bar Tabs: Holidays (active), Flights, Hotels, Experiences, Custom Trip
  const searchTabs = document.querySelectorAll('.search-tab-btn');
  const destinationInput = document.getElementById('searchDestinationInput');
  const searchPlaceholderMap = {
    holidays: 'Maldives, Swiss Alps, Amalfi, Bali...',
    flights: 'From London / New York to Tokyo...',
    hotels: 'Burj Al Arab, Aman Tokyo, Ritz Paris...',
    experiences: 'Private Yacht Charter, Heliskiing...',
    custom: 'Tell us your dream holiday vision...'
  };

  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabType = tab.dataset.tab;
      if (destinationInput && searchPlaceholderMap[tabType]) {
        destinationInput.placeholder = searchPlaceholderMap[tabType];
      }
    });
  });

  // 5. Search Dropdown Suggestions for "Where to?"
  const searchField = document.getElementById('whereToField');
  const searchDropdown = document.getElementById('searchDropdown');
  if (searchField && searchDropdown && destinationInput) {
    destinationInput.addEventListener('focus', () => {
      searchDropdown.classList.add('is-open');
    });

    document.addEventListener('click', (e) => {
      if (!searchField.contains(e.target)) {
        searchDropdown.classList.remove('is-open');
      }
    });

    searchDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const dest = item.dataset.destination;
        destinationInput.value = dest;
        searchDropdown.classList.remove('is-open');
      });
    });
  }

  // 6. Search Submit Action
  const searchForm = document.getElementById('heroSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = destinationInput?.value.trim() || 'Maldives';
      showToast(`Searching bespoke packages for "${dest}"...`);
      const curatedSection = document.getElementById('curated-holidays');
      if (curatedSection) {
        curatedSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 7. Curated Holidays Filter Pills
  const filterPills = document.querySelectorAll('.filter-tab-pill');
  const holidayCards = document.querySelectorAll('.holiday-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;

      holidayCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Interactive Itinerary Timeline Steps
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const visualImg = document.getElementById('itineraryVisualImg');
  const visualTitle = document.getElementById('itineraryVisualTitle');
  const visualCaption = document.getElementById('itineraryVisualCaption');

  timelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      timelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const img = step.dataset.img;
      const title = step.dataset.title;
      const caption = step.dataset.caption;

      if (visualImg && img) visualImg.src = img;
      if (visualTitle && title) visualTitle.textContent = title;
      if (visualCaption && caption) visualCaption.textContent = caption;
    });
  });

  // 9. Floating Side Buttons Action Handlers
  const whatsappBtn = document.getElementById('floatWhatsapp');
  const callBtn = document.getElementById('floatCall');

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Connecting you directly with our 24/7 WhatsApp Travel Concierge...');
      window.open('https://api.whatsapp.com/send?phone=917899365286&text=Hello%20RuleMyHoliday%2C%20I%20would%20like%20to%20plan%20a%20luxury%20holiday', '_blank');
    });
  }

  if (callBtn) {
    callBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Calling RuleMyHoliday VIP Concierge Desk: +91 78993 65286');
      window.location.href = 'tel:+917899365286';
    });
  }

  // 10. Newsletter Form
  const newsletterForm = document.getElementById('footerNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Welcome to the RuleMyHoliday Private Circle! Exclusive travel itineraries will arrive in your inbox.');
    });
  }

  // 11. Scroll-Triggered Fade-In for Each Section (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
});
