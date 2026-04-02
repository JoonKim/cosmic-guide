// State
const state = {
  user: null,
  weather: null,
};

// DOM Elements
const views = {
  login: document.getElementById('view-login'),
  onboarding: document.getElementById('view-onboarding'),
  dashboard: document.getElementById('view-dashboard'),
};

const forms = {
  login: document.getElementById('form-login'),
  onboarding: document.getElementById('form-onboarding')
};

const uiElements = {
  dashGreeting: document.getElementById('dash-greeting'),
  dashDate: document.getElementById('dash-date'),
  btnLogout: document.getElementById('btn-logout'),
  btnDemo: document.getElementById('btn-demo'),
  weatherTemp: document.getElementById('weather-temp'),
  weatherDesc: document.getElementById('weather-desc'),
  weatherIcon: document.getElementById('weather-icon'),
  badgeMbti: document.getElementById('badge-mbti'),
  badgeZodiac: document.getElementById('badge-zodiac'),
  astroReading: document.getElementById('astro-reading')
};

// Utilities
function showView(viewName) {
  Object.values(views).forEach(v => {
    v.classList.remove('active');
    setTimeout(() => v.classList.add('hidden'), 300); // Wait for fade out
  });
  
  const targetView = views[viewName];
  targetView.classList.remove('hidden');
  // Small delay to allow display:flex to apply before opacity fades in
  setTimeout(() => targetView.classList.add('active'), 10);
}

function getZodiacSign(dateString) {
  const date = new Date(dateString);
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  return "Unknown";
}

function loadSession() {
  const saved = localStorage.getItem('cosmic_user');
  if (saved) {
    state.user = JSON.parse(saved);
    if (state.user.mbti && state.user.birthday) {
      initDashboard();
    } else {
      showView('onboarding');
    }
  } else {
    showView('login');
  }
}

function saveSession() {
  localStorage.setItem('cosmic_user', JSON.stringify(state.user));
}

function logout() {
  localStorage.removeItem('cosmic_user');
  state.user = null;
  forms.login.reset();
  forms.onboarding.reset();
  showView('login');
}

// API Interactions
async function fetchWeather() {
  try {
    // Attempt to get user's location
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      await fetchWeatherByCoords(lat, lon);
    }, async () => {
      // Default to NY if geolocation fails or is denied
      await fetchWeatherByCoords(40.7128, -74.0060);
    });
  } catch(e) {
    console.error("Weather error:", e);
    uiElements.weatherDesc.innerText = "Weather unavailable";
  }
}

async function fetchWeatherByCoords(lat, lon) {
  // Using Open-Meteo for free, no-key weather data
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&forecast_days=1`;
  const res = await fetch(url);
  const data = await res.json();
  const current = data.current;
  
  uiElements.weatherTemp.innerText = `${Math.round(current.temperature_2m)}°`;
  updateWeatherDesc(current.weather_code);
}

function updateWeatherDesc(code) {
  let desc = "Clear";
  let icon = "clear_day";
  
  if (code <= 3) {
    desc = code === 0 ? "Clear Sky" : "Partly Cloudy";
    icon = code === 0 ? "clear_day" : "partly_cloudy_day";
  } else if (code <= 49) {
    desc = "Foggy";
    icon = "foggy";
  } else if (code <= 69) {
    desc = "Rainy";
    icon = "rainy";
  } else if (code <= 79) {
    desc = "Snowy";
    icon = "cloudy_snowing";
  } else {
    desc = "Stormy";
    icon = "thunderstorm";
  }

  uiElements.weatherDesc.innerText = desc;
  uiElements.weatherIcon.innerText = icon;
}

// Logic Engine for Horoscope
function generateReading() {
  const mbti = state.user.mbti;
  const zodiac = getZodiacSign(state.user.birthday);
  
  uiElements.badgeMbti.innerText = mbti;
  uiElements.badgeZodiac.innerText = zodiac;

  // Simple localized logic tailored reading
  const intro = `As a ${zodiac}, the stars align to highlight your natural intuition today. `;
  let middle = "";
  
  if (mbti.includes("I")) middle += "Take some time for quiet reflection so your inner thoughts can guide your decisions. ";
  else middle += "Your outgoing energy will easily draw positive opportunities your way. ";
  
  if (mbti.includes("T")) middle += "Trust your logical analysis when faced with a tricky dilemma. ";
  else middle += "Lean into your feelings—your empathy is your greatest strength right now. ";
  
  if (mbti.includes("J")) middle += "A structured approach will yield the best results this afternoon.";
  else middle += "Stay flexible and embrace the spontaneous adventures that arise!";

  uiElements.astroReading.innerText = intro + middle;
}

// Initializers
function initDashboard() {
  uiElements.dashGreeting.innerText = `Good Morning, ${state.user.name || 'Explorer'}`;
  
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  uiElements.dashDate.innerText = new Date().toLocaleDateString('en-US', options);

  fetchWeather();
  generateReading();
  showView('dashboard');
}

// Event Listeners
forms.login.addEventListener('submit', (e) => {
  e.preventDefault();
  // Simulate auth
  state.user = { email: document.getElementById('login-email').value };
  saveSession();
  showView('onboarding');
});

uiElements.btnDemo.addEventListener('click', () => {
  state.user = { email: "demo@cosmicguide.app" };
  showView('onboarding');
});

forms.onboarding.addEventListener('submit', (e) => {
  e.preventDefault();
  state.user.name = document.getElementById('onboard-name').value;
  state.user.birthday = document.getElementById('onboard-birthday').value;
  state.user.mbti = document.getElementById('onboard-mbti').value;
  saveSession();
  initDashboard();
});

uiElements.btnLogout.addEventListener('click', logout);

// Start App
document.addEventListener('DOMContentLoaded', () => {
  loadSession();
});
