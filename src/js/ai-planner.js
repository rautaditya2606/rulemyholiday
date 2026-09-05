/**
 * AI Trip Planner Interactive Engine
 */
export function initAIPlanner(openEnquireModal) {
  const modal = document.getElementById('aiPlannerModal');
  const openButtons = document.querySelectorAll('.trigger-ai-planner');
  const closeBtn = document.getElementById('closeAiModal');
  const generateBtn = document.getElementById('generateItineraryBtn');
  const resultsBox = document.getElementById('aiResultsBox');
  const vibePills = document.querySelectorAll('.vibe-choice-pill');
  const durationOpts = document.querySelectorAll('.duration-opt');

  if (!modal) return;

  // Open / Close
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('is-active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('is-active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('is-active');
  });

  // Vibe Selection
  vibePills.forEach(pill => {
    pill.addEventListener('click', () => {
      vibePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Duration Selection
  durationOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      durationOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  // Sample database of generated bespoke luxury itineraries with normalised INR pricing
  const itineraries = {
    maldives: {
      dest: "Maldives Private Island & Overwater Villa",
      price: "₹3,70,000 / couple",
      days: [
        { title: "Day 1: VIP Seaplane & Overwater Sanctuary Arrival", desc: "Private lounge transfer in Malé, sunset champagne welcoming at your private lagoon infinity villa, personal butler introduction." },
        { title: "Day 2: Coral Restoration & Private Sandbank Dining", desc: "Private marine biologist excursion by handcrafted dhoni boat, followed by five-course lantern-lit sandbank dinner under the stars." },
        { title: "Day 3: Deep Sea Spa Ritual & Stargazing Cruise", desc: "Underwater glass-floored spa pavilion treatment, evening catamaran sunset cruise with sommelier wine pairing." }
      ]
    },
    amalfi: {
      dest: "Positano Cliffside & Private Yacht Charter",
      price: "₹4,90,000 / couple",
      days: [
        { title: "Day 1: Private Helicopter Transfer & Villa Check-in", desc: "Scenic flight over Mount Vesuvius landing at Ravello cliffside helipad, check-in to historic private terrace suite." },
        { title: "Day 2: Full-Day Riva Yacht to Capri & Blue Grotto", desc: "Captained vintage Riva boat charter along Faraglioni rocks, reserved Michelin-starred cliffside lunch at Conca del Sogno." },
        { title: "Day 3: Organic Lemon Grove Gastronomy & Sunset Aperitivo", desc: "Private cellar tasting with master vintner, sunset aperitivo overlooking the cascading pastel villas of Positano." }
      ]
    },
    swiss: {
      dest: "Zermatt Matterhorn Chalet & Glacier Ski",
      price: "₹5,90,000 / couple",
      days: [
        { title: "Day 1: Glacier Express Excellence Class Arrival", desc: "Panoramic glass-domed carriage with five-course regional tasting, electric horse carriage to private catered chalet." },
        { title: "Day 2: Private Heli-Skiing & Outdoor Hot Tub Fireside", desc: "Private mountain guide on untracked peaks, evening cedar wood barrel hot tub with mulled wine and Matterhorn vistas." },
        { title: "Day 3: Fondue Igloo & Alpine Wellness Spa", desc: "Private candlelit igloo dinner with artisanal cheese, followed by thermal aromatherapy spa treatment." }
      ]
    }
  };

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const activeVibe = document.querySelector('.vibe-choice-pill.active')?.dataset.vibe || 'maldives';
      const activeDuration = document.querySelector('.duration-opt.active')?.textContent || '7 Days';

      generateBtn.disabled = true;
      generateBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#C9920A"></path>
        </svg>
        Synthesizing Bespoke Itinerary...
      `;

      setTimeout(() => {
        const data = itineraries[activeVibe] || itineraries.maldives;
        resultsBox.innerHTML = `
          <div class="ai-itinerary-header">
            <div>
              <div class="ai-itinerary-destination">${data.dest}</div>
              <small style="color: #64748B; font-weight: 600;">Customized for ${activeDuration} • Zero-Compromise Guarantee</small>
            </div>
            <div class="ai-itinerary-estimate">${data.price}</div>
          </div>
          <div class="ai-itinerary-days">
            ${data.days.map(d => `
              <div class="ai-day-card">
                <div class="ai-day-title">${d.title}</div>
                <div style="color: #475569; font-size: 0.85rem;">${d.desc}</div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 18px; display: flex; gap: 12px;">
            <button id="bookGeneratedTrip" class="btn-search-submit" style="flex: 1; padding: 12px; min-height: 48px; font-size: 0.9rem;">
              Reserve With Concierge →
            </button>
          </div>
        `;

        resultsBox.classList.add('is-visible');
        generateBtn.disabled = false;
        generateBtn.innerHTML = `Regenerate Custom Plan ✦`;

        const bookBtn = document.getElementById('bookGeneratedTrip');
        if (bookBtn) {
          bookBtn.addEventListener('click', () => {
            modal.classList.remove('is-active');
            if (openEnquireModal) {
              openEnquireModal(`AI Plan: ${data.dest} (${activeDuration})`);
            }
          });
        }
      }, 700);
    });
  }
}
