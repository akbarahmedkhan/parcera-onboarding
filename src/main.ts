import './style.css'

// Views
const navbar = document.getElementById('navbar');
const authContainer = document.getElementById('auth-container');
const loginView = document.getElementById('login-view');
const signupView = document.getElementById('signup-view');
const otpView = document.getElementById('otp-view');
const onboardingView = document.getElementById('onboarding-view');
const locationsView = document.getElementById('locations-view');
const locationListView = document.getElementById('location-list-view');
const serviceSetupView = document.getElementById('service-setup-view');
const personaView = document.getElementById('persona-view');
const customizationView = document.getElementById('customization-view');
const tableManagementView = document.getElementById('table-management-view');
const knowledgebaseView = document.getElementById('knowledgebase-view');
const automationView = document.getElementById('automation-view');
const reviewView = document.getElementById('review-view');
const activeView = document.getElementById('active-view');
const serviceConfigModal = document.getElementById('service-config-modal');


// Tracking for Stepper
let maxStepReached = 1;
const stepMap: { [key: number]: string } = {
  1: 'persona-view',
  2: 'customization-view',
  3: 'table-management-view',
  4: 'knowledgebase-view',
  5: 'automation-view',
  6: 'review-view'
};

// Forms & Buttons
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const otpForm = document.getElementById('otp-form');
const onboardingForm = document.getElementById('onboarding-form');
const personaForm = document.getElementById('persona-form');
const customizationForm = document.getElementById('customization-form');

const goToSignup = document.getElementById('go-to-signup');
const goToSignin = document.getElementById('go-to-signin');
const backToSignup = document.getElementById('back-to-signup');

const addLocationBtn = document.getElementById('add-location-btn');
const addAnotherLocationBtn = document.getElementById('add-another-location-btn');
const continueServiceSetupBtn = document.getElementById('continue-service-setup-btn');
const configureReservation = document.getElementById('configure-reservation');
const tableMgmtNextBtn = document.getElementById('table-mgmt-next-btn');
const kbNextBtn = document.getElementById('kb-next-btn');
const automationNextBtn = document.getElementById('automation-next-btn');
const finalLaunchBtn = document.getElementById('final-launch-btn');
const addFaqBtn = document.getElementById('add-faq-btn');
const faqContainer = document.getElementById('faq-container');
const goToDashboardBtn = document.getElementById('go-to-dashboard-btn');
const onboardAnotherLink = document.getElementById('onboard-another-link');
const modalContinueBtn = document.getElementById('modal-continue-btn');


const einInput = document.getElementById('ein-input') as HTMLInputElement;

// Customization Specifics
const phoneCallsToggle = document.getElementById('phone-calls-toggle') as HTMLInputElement;
const phoneCallsCard = document.getElementById('phone-calls-card');
const provisioningOptions = document.getElementById('provisioning-options');
const toggleStatusText = document.getElementById('toggle-status-text');

// Table Management Specifics
const guidInput = document.getElementById('restaurant-guid-input') as HTMLInputElement;
const guidStatus = document.getElementById('guid-connected-status');

// Automation Specifics
const guestSlider = document.getElementById('guest-slider') as HTMLInputElement;
const guestBadge = document.getElementById('guest-badge');
const sliderHelpText = document.getElementById('slider-help-text');
const largerPartyLabel = document.getElementById('larger-party-label');

// Helper to update ALL steppers across ALL views
function updateAllSteppers(activeIndex: number) {
  const allSteppers = document.querySelectorAll('.config-stepper');
  allSteppers.forEach(stepper => {
    const steps = stepper.querySelectorAll('.config-step');
    steps.forEach((step, idx) => {
      const stepNum = idx + 1;
      step.classList.remove('active', 'done');
      if (stepNum === activeIndex) {
        step.classList.add('active');
      } else if (stepNum < activeIndex || stepNum <= maxStepReached) {
        step.classList.add('done');
      }
    });
  });
}

// Helper to switch views
function showView(viewToShowId: string) {
  const views = [
    { id: 'login-view', el: loginView },
    { id: 'signup-view', el: signupView },
    { id: 'otp-view', el: otpView },
    { id: 'onboarding-view', el: onboardingView },
    { id: 'locations-view', el: locationsView },
    { id: 'location-list-view', el: locationListView },
    { id: 'service-setup-view', el: serviceSetupView },
    { id: 'persona-view', el: personaView },
    { id: 'customization-view', el: customizationView },
    { id: 'table-management-view', el: tableManagementView },
    { id: 'knowledgebase-view', el: knowledgebaseView },
    { id: 'automation-view', el: automationView },
    { id: 'review-view', el: reviewView },
    { id: 'active-view', el: activeView }
  ];

  views.forEach(view => {
    if (view.id === viewToShowId) {
      view.el?.classList.remove('hidden');
    } else {
      view.el?.classList.add('hidden');
    }
  });

  // Layout handling
  const authViews = ['login-view', 'signup-view', 'otp-view'];
  if (authViews.includes(viewToShowId)) {
    authContainer?.classList.remove('hidden');
    navbar?.classList.add('hidden');
    document.body.style.display = 'flex';
    document.body.style.placeItems = 'center';
  } else {
    authContainer?.classList.add('hidden');
    navbar?.classList.remove('hidden');
    document.body.style.display = 'block';
  }

  // Update Stepper Visuals if it's a config step
  for (const [index, id] of Object.entries(stepMap)) {
    if (id === viewToShowId) {
      const stepIdx = parseInt(index);
      if (stepIdx > maxStepReached) maxStepReached = stepIdx;
      updateAllSteppers(stepIdx);
      break;
    }
  }

  window.scrollTo(0, 0);
}

// New Stepper Navigation Logic
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const configStep = target.closest('.config-step');

  if (configStep) {
    const stepCircle = configStep.querySelector('.config-step-circle');
    if (stepCircle) {
      const stepNum = parseInt(stepCircle.textContent || '0');
      if (stepNum > 0 && stepNum <= maxStepReached) {
        showView(stepMap[stepNum]);
      } else if (stepNum > maxStepReached) {
        console.log(`Step ${stepNum} not reached yet.`);
      }
    }
  }
});

// Navigation Events
goToSignup?.addEventListener('click', (e) => {
  e.preventDefault();
  showView('signup-view');
});

goToSignin?.addEventListener('click', (e) => {
  e.preventDefault();
  showView('login-view');
});

backToSignup?.addEventListener('click', (e) => {
  e.preventDefault();
  showView('signup-view');
});

// Transitions
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  showView('otp-view');
});

signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = (document.getElementById('phoneNumber') as HTMLInputElement)?.value;
  const otpSubtitle = document.getElementById('otp-subtitle');
  if (otpSubtitle) {
    otpSubtitle.innerText = `Enter the 6-digit code sent to ${phone}`;
  }
  showView('otp-view');
});

otpForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  showView('onboarding-view');
});

onboardingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  showView('locations-view');
});

addLocationBtn?.addEventListener('click', () => {
  showView('location-list-view');
});

addAnotherLocationBtn?.addEventListener('click', () => {
  showView('locations-view');
});

continueServiceSetupBtn?.addEventListener('click', () => {
  showView('service-setup-view');
});

configureReservation?.addEventListener('click', () => {
  serviceConfigModal?.classList.remove('hidden');
});

modalContinueBtn?.addEventListener('click', () => {
  serviceConfigModal?.classList.add('hidden');
  showView('persona-view');
});


personaForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  showView('customization-view');
});

customizationForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  showView('table-management-view');
});

tableMgmtNextBtn?.addEventListener('click', () => {
  if (guidStatus && !guidStatus.classList.contains('hidden')) {
    showView('knowledgebase-view');
  } else {
    alert('Please enter a valid Restaurant GUID first.');
  }
});

kbNextBtn?.addEventListener('click', () => {
  showView('automation-view');
});

automationNextBtn?.addEventListener('click', () => {
  showView('review-view');
});

finalLaunchBtn?.addEventListener('click', () => {
  showView('active-view');
});

goToDashboardBtn?.addEventListener('click', () => {
  alert('Redirecting to your merchant dashboard...');
});

onboardAnotherLink?.addEventListener('click', (e) => {
  e.preventDefault();
  showView('service-setup-view');
});

// GUID Validation Logic
guidInput?.addEventListener('input', (e) => {
  const val = (e.target as HTMLInputElement).value;
  if (val.length >= 10) {
    guidStatus?.classList.remove('hidden');
  } else {
    guidStatus?.classList.add('hidden');
  }
});

// Accordion Toggles
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const header = target.closest('.accordion-header');

  if (header) {
    if (target.closest('.delete-faq-btn') || target.closest('.config-step')) return;
    const accordion = header.closest('.kb-accordion');
    const content = accordion?.querySelector('.accordion-content');
    accordion?.classList.toggle('active');
    content?.classList.toggle('hidden');
  } else if (target.closest('.delete-faq-btn')) {
    const accordion = target.closest('.kb-accordion');
    accordion?.remove();
    updateFaqNumbers();
  }
});

function updateFaqNumbers() {
  const faqContainer = document.getElementById('faq-container');
  const faqs = faqContainer?.querySelectorAll('.kb-accordion');
  faqs?.forEach((faq, index) => {
    const span = faq.querySelector(':scope > .accordion-header > span');
    if (span) span.textContent = `FAQ ${index + 1}`;
  });
}

// Dynamic FAQ
addFaqBtn?.addEventListener('click', () => {
  const faqCount = faqContainer?.querySelectorAll('.kb-accordion').length || 0;
  const newFaq = document.createElement('div');
  newFaq.className = 'kb-accordion active';
  newFaq.innerHTML = `
    <div class="accordion-header">
      <span>FAQ ${faqCount + 1}</span>
      <div class="accordion-header-actions">
        <button class="delete-faq-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
        <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    <div class="accordion-content">
      <div class="faq-field">
        <label>Question</label>
        <input type="text" placeholder="e.g., Do you have outdoor seating?" />
      </div>
      <div class="faq-field" style="margin-bottom: 0;">
        <label>Answer</label>
        <textarea class="kb-textarea" placeholder="e.g., Yes, we have a beautiful patio..."
          style="min-height: 100px;"></textarea>
      </div>
    </div>
  `;
  faqContainer?.appendChild(newFaq);
});

// Automation Slider Logic
function updateSliderTrack(input: HTMLInputElement) {
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  const val = parseInt(input.value);
  const percentage = (val - min) / (max - min) * 100;
  input.style.background = `linear-gradient(to right, #001DFF 0%, #001DFF ${percentage}%, #F3F4F6 ${percentage}%, #F3F4F6 100%)`;
}

guestSlider?.addEventListener('input', (e) => {
  const input = e.target as HTMLInputElement;
  const val = input.value;
  updateSliderTrack(input);
  if (guestBadge) guestBadge.innerText = `${val} Guests`;
  if (sliderHelpText) sliderHelpText.innerText = `Reservations for ${val} guests or fewer will be automatically confirmed`;
  if (largerPartyLabel) largerPartyLabel.innerText = `For parties larger than ${val} guests:`;
});

// Initialize slider look
if (guestSlider) updateSliderTrack(guestSlider as HTMLInputElement);

// Automation Card Logic
document.querySelectorAll('#automation-view .selection-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('#automation-view .selection-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// Phone Calls Toggle Logic
phoneCallsToggle?.addEventListener('change', (e) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  if (isChecked) {
    phoneCallsCard?.classList.add('active');
    provisioningOptions?.classList.remove('hidden');
    if (toggleStatusText) toggleStatusText.innerText = 'Enabled';
    const iconBox = phoneCallsCard?.querySelector('.ps-icon-box') as HTMLElement;
    if (iconBox) {
      iconBox.style.background = '#001DFF';
      iconBox.style.color = 'white';
    }
  } else {
    phoneCallsCard?.classList.remove('active');
    provisioningOptions?.classList.add('hidden');
    if (toggleStatusText) toggleStatusText.innerText = 'Click to enable';
    const iconBox = phoneCallsCard?.querySelector('.ps-icon-box') as HTMLElement;
    if (iconBox) {
      iconBox.style.background = '#F3F4F6';
      iconBox.style.color = '#9CA3AF';
    }
  }
});

// Custom Multiselect
const multiselect = document.getElementById('language-select');
const trigger = multiselect?.querySelector('.multiselect-trigger');
const options = multiselect?.querySelector('.multiselect-options');
const checkboxes = multiselect?.querySelectorAll('input[type="checkbox"]');
const selectedText = document.getElementById('selected-languages');

trigger?.addEventListener('click', (e) => {
  e.stopPropagation();
  options?.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!multiselect?.contains(e.target as Node)) {
    options?.classList.add('hidden');
  }
});

checkboxes?.forEach(cb => {
  cb.addEventListener('change', () => {
    const selected = Array.from(checkboxes)
      .filter(c => (c as HTMLInputElement).checked)
      .map(c => (c as HTMLInputElement).value);

    if (selectedText) {
      selectedText.innerText = selected.length > 0 ? selected.join(', ') : 'Select Language';
    }
  });
});

// Persona Card Selection
const personaCards = document.querySelectorAll('.persona-card');
const genderBtns = document.querySelectorAll('.gender-btn');

function activatePersona(card: HTMLElement) {
  personaCards.forEach(c => c.classList.remove('selected'));
  genderBtns.forEach(b => b.classList.remove('active'));

  card.classList.add('selected');
  const btn = card.querySelector('.gender-btn');
  btn?.classList.add('active');
}

personaCards.forEach(card => {
  card.addEventListener('click', () => {
    activatePersona(card as HTMLElement);
  });
});

// Gender Toggle
genderBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.persona-card');
    if (card) activatePersona(card as HTMLElement);
  });
});

// Knowledgebase Tag Toggling
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('selected');
  });
});

// EIN Formatting
einInput?.addEventListener('input', (e) => {
  let value = (e.target as HTMLInputElement).value.replace(/\D/g, '');
  if (value.length > 2) {
    value = value.substring(0, 2) + '-' + value.substring(2, 9);
  }
  (e.target as HTMLInputElement).value = value;
});

// Integration Card Selection
const toastCard = document.getElementById('toast-card');
const toastGuidSection = document.getElementById('toast-guid-section');

toastCard?.addEventListener('click', () => {
  toastCard.classList.toggle('active');
  toastGuidSection?.classList.toggle('hidden');
});

// Initial Step Visual Update
updateAllSteppers(1);
