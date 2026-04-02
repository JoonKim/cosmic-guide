// State
const state = {
  user: null,
  weather: null,
  lang: localStorage.getItem('cosmic_lang') || 'en',
};

// Translations
const i18n = {
  en: {
    title: "Cosmic Guide",
    subtitle: "Unlock your personalized daily journey.",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    tryDemo: "Try Demo",
    aboutYou: "About You",
    aboutDesc: "Tell us a bit about yourself so we can tailor your experience.",
    firstName: "First Name",
    birthday: "Birthday",
    mbtiLabel: "MBTI Personality Type",
    mbtiSelect: "Select your type...",
    INTJ: "INTJ - The Architect",
    INTP: "INTP - The Logician",
    ENTJ: "ENTJ - The Commander",
    ENTP: "ENTP - The Debater",
    INFJ: "INFJ - The Advocate",
    INFP: "INFP - The Mediator",
    ENFJ: "ENFJ - The Protagonist",
    ENFP: "ENFP - The Campaigner",
    ISTJ: "ISTJ - The Logistician",
    ISFJ: "ISFJ - The Defender",
    ESTJ: "ESTJ - The Executive",
    ESFJ: "ESFJ - The Consul",
    ISTP: "ISTP - The Virtuoso",
    ISFP: "ISFP - The Adventurer",
    ESTP: "ESTP - The Entrepreneur",
    ESFP: "ESFP - The Entertainer",
    completeSetup: "Complete Setup",
    todaysEnv: "Today's Environment",
    cosmicSynergy: "Cosmic Synergy",
    weatherUnavailable: "Weather unavailable",
    weatherClearSky: "Clear Sky",
    weatherPartlyCloudy: "Partly Cloudy",
    weatherFoggy: "Foggy",
    weatherRainy: "Rainy",
    weatherSnowy: "Snowy",
    weatherStormy: "Stormy",
    greeting: "Good Morning",
    unknown: "Unknown",
    zodiacAries: "Aries",
    zodiacTaurus: "Taurus",
    zodiacGemini: "Gemini",
    zodiacCancer: "Cancer",
    zodiacLeo: "Leo",
    zodiacVirgo: "Virgo",
    zodiacLibra: "Libra",
    zodiacScorpio: "Scorpio",
    zodiacSagittarius: "Sagittarius",
    zodiacCapricorn: "Capricorn",
    zodiacAquarius: "Aquarius",
    zodiacPisces: "Pisces",
  },
  ko: {
    title: "우주의 안내자",
    subtitle: "당신만의 특별한 하루 여정을 시작하세요.",
    email: "이메일",
    password: "비밀번호",
    signIn: "로그인",
    tryDemo: "데모 체험하기",
    aboutYou: "당신에 대하여",
    aboutDesc: "맞춤형 경험을 제공할 수 있도록 당신에 대해 알려주세요.",
    firstName: "이름",
    birthday: "생일",
    mbtiLabel: "MBTI 성격 유형",
    mbtiSelect: "유형을 선택하세요...",
    INTJ: "INTJ - 용의주도한 전략가",
    INTP: "INTP - 논리적인 사색가",
    ENTJ: "ENTJ - 대담한 통솔자",
    ENTP: "ENTP - 뜨거운 논쟁을 즐기는 변론가",
    INFJ: "INFJ - 선의의 옹호자",
    INFP: "INFP - 열정적인 중재자",
    ENFJ: "ENFJ - 정의로운 사회운동가",
    ENFP: "ENFP - 재기발랄한 활동가",
    ISTJ: "ISTJ - 청렴결백한 논리주의자",
    ISFJ: "ISFJ - 용감한 수호자",
    ESTJ: "ESTJ - 엄격한 관리자",
    ESFJ: "ESFJ - 사교적인 외교관",
    ISTP: "ISTP - 만능 재주꾼",
    ISFP: "ISFP - 호기심 많은 예술가",
    ESTP: "ESTP - 모험을 즐기는 사업가",
    ESFP: "ESFP - 자유로운 영혼의 연예인",
    completeSetup: "설정 완료",
    todaysEnv: "오늘의 환경",
    cosmicSynergy: "우주의 시너지",
    weatherUnavailable: "날씨 정보 없음",
    weatherClearSky: "맑음",
    weatherPartlyCloudy: "약간 흐림",
    weatherFoggy: "안개",
    weatherRainy: "비",
    weatherSnowy: "눈",
    weatherStormy: "폭풍우",
    greeting: "좋은 아침입니다",
    unknown: "알 수 없음",
    zodiacAries: "양자리",
    zodiacTaurus: "황소자리",
    zodiacGemini: "쌍둥이자리",
    zodiacCancer: "게자리",
    zodiacLeo: "사자자리",
    zodiacVirgo: "처녀자리",
    zodiacLibra: "천칭자리",
    zodiacScorpio: "전갈자리",
    zodiacSagittarius: "사수자리",
    zodiacCapricorn: "염소자리",
    zodiacAquarius: "물병자리",
    zodiacPisces: "물고기자리",
  }
};

const zNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

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
  astroReading: document.getElementById('astro-reading'),
  btnEn: document.getElementById('btn-lang-en'),
  btnKo: document.getElementById('btn-lang-ko'),
};

function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('cosmic_lang', lang);
  
  // Update toggle buttons
  uiElements.btnEn.classList.toggle('active', lang === 'en');
  uiElements.btnKo.classList.toggle('active', lang === 'ko');

  // Update static texts
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) {
      el.innerText = i18n[lang][key];
    }
  });

  // Update dynamic texts if dashboard is active
  if (state.user && state.user.mbti) {
    uiElements.dashGreeting.innerText = `${i18n[lang].greeting}, ${state.user.name || 'Explorer'}`;
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    uiElements.dashDate.innerText = new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', dateOptions);
    if (state.weather) updateWeatherDesc(state.weather);
    generateReading();
  }
}

uiElements.btnEn.addEventListener('click', () => applyLanguage('en'));
uiElements.btnKo.addEventListener('click', () => applyLanguage('ko'));

// Utilities
function showView(viewName) {
  Object.values(views).forEach(v => {
    v.classList.remove('active');
    setTimeout(() => v.classList.add('hidden'), 300); // Wait for fade out
  });
  
  const targetView = views[viewName];
  targetView.classList.remove('hidden');
  setTimeout(() => targetView.classList.add('active'), 10);
}

function getZodiacCodename(dateString) {
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
  applyLanguage(state.lang);
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
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      await fetchWeatherByCoords(lat, lon);
    }, async () => {
      await fetchWeatherByCoords(40.7128, -74.0060);
    });
  } catch(e) {
    uiElements.weatherDesc.innerText = i18n[state.lang].weatherUnavailable;
  }
}

async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&forecast_days=1`;
  const res = await fetch(url);
  const data = await res.json();
  const current = data.current;
  
  state.weather = current.weather_code;
  if(state.lang === 'ko') {
    // Fahrenheit to Celsius for KR
    const c = (current.temperature_2m - 32) * 5/9;
    uiElements.weatherTemp.innerText = `${Math.round(c)}°`;
  } else {
    uiElements.weatherTemp.innerText = `${Math.round(current.temperature_2m)}°`;
  }
  updateWeatherDesc(current.weather_code);
}

function updateWeatherDesc(code) {
  let descKey = "weatherClearSky";
  let icon = "clear_day";
  
  if (code <= 3) {
    descKey = code === 0 ? "weatherClearSky" : "weatherPartlyCloudy";
    icon = code === 0 ? "clear_day" : "partly_cloudy_day";
  } else if (code <= 49) {
    descKey = "weatherFoggy";
    icon = "foggy";
  } else if (code <= 69) {
    descKey = "weatherRainy";
    icon = "rainy";
  } else if (code <= 79) {
    descKey = "weatherSnowy";
    icon = "cloudy_snowing";
  } else {
    descKey = "weatherStormy";
    icon = "thunderstorm";
  }

  uiElements.weatherDesc.innerText = i18n[state.lang][descKey];
  uiElements.weatherIcon.innerText = icon;
}

// Logic Engine
function generateReading() {
  const mbti = state.user.mbti;
  const rawZodiac = getZodiacCodename(state.user.birthday);
  const zodiacName = i18n[state.lang]["zodiac" + rawZodiac] || i18n[state.lang].unknown;
  
  uiElements.badgeMbti.innerText = mbti;
  uiElements.badgeZodiac.innerText = zodiacName;

  let intro, t1, t2, t3;
  
  if (state.lang === 'en') {
    intro = `As a ${zodiacName}, the stars align to highlight your natural intuition today. `;
    t1 = mbti.includes("I") ? "Take some time for quiet reflection so your inner thoughts can guide your decisions. " : "Your outgoing energy will easily draw positive opportunities your way. ";
    t2 = mbti.includes("T") ? "Trust your logical analysis when faced with a tricky dilemma. " : "Lean into your feelings—your empathy is your greatest strength right now. ";
    t3 = mbti.includes("J") ? "A structured approach will yield the best results this afternoon." : "Stay flexible and embrace the spontaneous adventures that arise!";
  } else {
    intro = `${zodiacName}의 기운이 당신의 직관력을 빛나게 하는 하루입니다. `;
    t1 = mbti.includes("I") ? "내면의 목소리에 귀를 기울일 수 있도록 조용한 명상의 시간을 가져보세요. " : "당신의 외향적인 에너지가 자연스럽게 긍정적인 기회를 끌어올 것입니다. ";
    t2 = mbti.includes("T") ? "까다로운 문제에 직면했을 때 당신의 논리적인 분석을 믿으세요. " : "당신의 감정에 충실하세요—공감 능력이 지금 가장 큰 무기입니다. ";
    t3 = mbti.includes("J") ? "오늘은 체계적으로 접근할 때 최고의 결과를 얻을 수 있습니다." : "유연함을 유지하고 뜻밖의 즐거운 변화를 받아들이세요!";
  }

  uiElements.astroReading.innerText = intro + t1 + t2 + t3;
}

// Initializers
function initDashboard() {
  applyLanguage(state.lang);
  fetchWeather();
  showView('dashboard');
}

// Event Listeners
forms.login.addEventListener('submit', (e) => {
  e.preventDefault();
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
