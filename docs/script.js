/**
 * KÉO CO XANH - ĐỎ (Tug of War Quiz) - Pure Vanilla JavaScript
 * Zero dependencies, works natively on GitHub Pages or local files.
 */

// 1. QUESTION BANK
const QUESTION_BANK = [
  // Đố vui trí tuệ & dân gian
  {
    category: 'Đố vui dân gian',
    question: 'Cái gì chặt không đứt, bứt không rời, phơi không khô, đốt không cháy?',
    options: ['Nước', 'Gió', 'Khói', 'Bóng râm'],
    correct: 0,
    explanation: 'Nước là chất lỏng, không thể chặt đứt hay đốt cháy bằng lửa thông thường!',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Con gì đầu dê mình ốc?',
    options: ['Con dốc', 'Con vịt', 'Con ốc bươu', 'Con dơi'],
    correct: 0,
    explanation: 'Chữ "Dốc" có đầu là Dê (D) và mình là Ốc (ốc)!',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?',
    options: ['Bắp ngô (Bắp nướng)', 'Củ khoai lang', 'Quả chuối nướng', 'Củ hành tây'],
    correct: 0,
    explanation: 'Bắp ngô bỏ vỏ ngoài nướng hạt bên trong, khi ăn ăn hạt ngoài bỏ cùi bên trong.',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Càng kéo càng ngắn là cái gì?',
    options: ['Điếu thuốc lá', 'Sợi dây thun', 'Cái quần', 'Chiếc áo'],
    correct: 0,
    explanation: 'Điếu thuốc lá khi hút (kéo thuốc) thì tàn thuốc rụng dần và điếu thuốc ngắn lại.',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Cây gì càng đốt càng dài?',
    options: ['Cây tre', 'Cây chuối', 'Cây sậy', 'Cây mía'],
    correct: 0,
    explanation: 'Cây tre có nhiều đốt tre, càng nhiều đốt thì cây càng mọc cao dài!',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Tháng nào trong năm người ta ngủ ít nhất?',
    options: ['Tháng 2', 'Tháng 12', 'Tháng 1', 'Tháng 4'],
    correct: 0,
    explanation: 'Tháng 2 chỉ có 28 hoặc 29 ngày, ít ngày nhất trong năm nên tổng thời gian ngủ ít nhất!',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Cái gì của bạn nhưng người khác lại dùng nhiều hơn bạn?',
    options: ['Tên của bạn', 'Số điện thoại', 'Tiền của bạn', 'Xe của bạn'],
    correct: 0,
    explanation: 'Tên của bạn để người khác xưng hô gọi bạn mỗi ngày!',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Bánh gì nghe tên tưởng đã bị ngã?',
    options: ['Bánh tét', 'Bánh bò', 'Bánh trôi', 'Bánh xèo'],
    correct: 0,
    explanation: 'Bánh tét nghe như bị "tét" ngã!',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Quả gì không bao giờ chín?',
    options: ['Quả bóng', 'Quả cam sành', 'Quả chanh', 'Quả cóc'],
    correct: 0,
    explanation: 'Quả bóng là đồ chơi, không thể "chín" được!',
  },
  {
    category: 'Đố vui dân gian',
    question: 'Ở giữa Thái Bình Dương là cái gì?',
    options: ['Chữ "Bình"', 'Đảo Hawaii', 'Một ngọn núi lửa', 'Nước biển'],
    correct: 0,
    explanation: 'Từ "Thái Bình Dương" gồm 3 chữ, chữ ở giữa chính là chữ "Bình"!',
  },

  // Khoa học & Tự nhiên
  {
    category: 'Khoa học & Tự nhiên',
    question: 'Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?',
    options: ['Sao Thủy (Mercury)', 'Sao Kim (Venus)', 'Sao Hỏa (Mars)', 'Trái Đất'],
    correct: 0,
    explanation: 'Sao Thủy là hành tinh nhỏ nhất và gần Mặt Trời nhất trong Hệ Mặt Trời.',
  },
  {
    category: 'Khoa học & Tự nhiên',
    question: 'Khí nào chiếm thể tích lớn nhất trong bầu khí quyển của Trái Đất?',
    options: ['Khí Nitơ (N2 ~78%)', 'Khí Oxy (O2 ~21%)', 'Khí Cacbonic (CO2)', 'Khí Heli (He)'],
    correct: 0,
    explanation: 'Khí Nitơ chiếm khoảng 78% thể tích bầu khí quyển Trái Đất.',
  },
  {
    category: 'Khoa học & Tự nhiên',
    question: 'Loài thú nào lớn nhất hành tinh từng được ghi nhận?',
    options: ['Cá voi xanh', 'Voi châu Phi', 'Khủng long bạo chúa', 'Cá mập Megalodon'],
    correct: 0,
    explanation: 'Cá voi xanh có thể dài hơn 30 mét và nặng tới 180 tấn.',
  },
  {
    category: 'Khoa học & Tự nhiên',
    question: 'Cơ quan nào trong cơ thể con người sản xuất mật giúp tiêu hóa chất béo?',
    options: ['Gan', 'Dạ dày', 'Túi mật', 'Tụy'],
    correct: 0,
    explanation: 'Gan là cơ quan tạo ra dịch mật, sau đó mật được lưu trữ tại túi mật.',
  },
  {
    category: 'Khoa học & Tự nhiên',
    question: 'Kim loại nào ở trạng thái lỏng ở nhiệt độ phòng bình thường (25°C)?',
    options: ['Thủy ngân (Hg)', 'Chì (Pb)', 'Nhôm (Al)', 'Bạc (Ag)'],
    correct: 0,
    explanation: 'Thủy ngân là kim loại duy nhất ở thể lỏng trong điều kiện nhiệt độ phòng.',
  },
  {
    category: 'Khoa học & Tự nhiên',
    question: 'Ánh sáng từ Mặt Trời mất khoảng bao lâu để tới Trái Đất?',
    options: ['Khoảng 8 phút 20 giây', 'Khoảng 1 giây', 'Khoảng 1 giờ', 'Khoảng 24 giờ'],
    correct: 0,
    explanation: 'Ánh sáng truyền với vận tốc ~300.000 km/s vượt qua 150 triệu km trong khoảng 8 phút 20 giây.',
  },

  // Lịch sử & Địa lý Việt Nam
  {
    category: 'Lịch sử & Địa lý',
    question: 'Đỉnh núi nào được mệnh danh là "Nóc nhà Đông Dương"?',
    options: ['Fansipan (3.143m)', 'Ngọc Linh', 'Bạch Mộc Lương Tử', 'Tây Côn Lĩnh'],
    correct: 0,
    explanation: 'Đỉnh Fansipan tại dãy Hoàng Liên Sơn cao 3.143m là đỉnh núi cao nhất 3 nước Đông Dương.',
  },
  {
    category: 'Lịch sử & Địa lý',
    question: 'Chiến thắng Bạch Đằng lịch sử năm 938 gắn liền với vị anh hùng dân tộc nào?',
    options: ['Ngô Quyền', 'Trần Hưng Đạo', 'Lê Hoàn', 'Lý Thường Kiệt'],
    correct: 0,
    explanation: 'Ngô Quyền cắm cọc gỗ trên sông Bạch Đằng đánh tan quân Nam Hán năm 938, chấm dứt 1000 năm Bắc thuộc.',
  },
  {
    category: 'Lịch sử & Địa lý',
    question: 'Hồ nước ngọt tự nhiên lớn nhất Việt Nam nằm ở tỉnh nào?',
    options: ['Bắc Kạn (Hồ Ba Bể)', 'Lâm Đồng (Hồ Tuyền Lâm)', 'Gia Lai (Biển Hồ)', 'Hà Nội (Hồ Tây)'],
    correct: 0,
    explanation: 'Hồ Ba Bể nằm tại tỉnh Bắc Kạn, là hồ nước ngọt tự nhiên trên núi lớn nhất Việt Nam.',
  },
  {
    category: 'Lịch sử & Địa lý',
    question: 'Việt Nam có đường bờ biển dài khoảng bao nhiêu km?',
    options: ['3.260 km', '2.500 km', '4.100 km', '1.800 km'],
    correct: 0,
    explanation: 'Đường bờ biển Việt Nam trải dài khoảng 3.260 km từ Móng Cái đến Hà Tiên.',
  },

  // Toán & Logic
  {
    category: 'Toán học & Logic',
    question: 'Nếu 3 con mèo bắt 3 con chuột trong 3 phút, thì 100 con mèo bắt 100 con chuột trong bao nhiêu phút?',
    options: ['3 phút', '100 phút', '30 phút', '1 phút'],
    correct: 0,
    explanation: 'Mỗi con mèo mất đúng 3 phút để bắt 1 con chuột, vậy 100 con mèo cùng lúc bắt 100 con cũng chỉ mất 3 phút!',
  },
  {
    category: 'Toán học & Logic',
    question: 'Số nguyên tố chẵn duy nhất là số nào?',
    options: ['Số 2', 'Số 0', 'Số 4', 'Không có số nào'],
    correct: 0,
    explanation: 'Số 2 là số nguyên tố chẵn duy nhất vì các số chẵn lớn hơn 2 đều chia hết cho 2.',
  },
  {
    category: 'Toán học & Logic',
    question: 'Một người leo cầu thang: bước lên 3 bậc rồi tụt xuống 2 bậc. Hỏi sau mấy lần như vậy thì tới bậc thứ 10?',
    options: ['8 lần', '10 lần', '7 lần', '12 lần'],
    correct: 0,
    explanation: 'Sau 7 lần, người đó ở bậc 7. Lần thứ 8 bước lên 3 bậc là tới thẳng bậc 10 (không bị tụt nữa)!',
  },
  {
    category: 'Toán học & Logic',
    question: 'Bố của Mary có 5 người con gái: Nana, Nene, Nini, Nono. Hỏi người con gái thứ năm tên là gì?',
    options: ['Mary', 'Nunu', 'Nyny', 'Nonu'],
    correct: 0,
    explanation: 'Đầu câu đã nêu: "Bố của Mary có 5 người con gái", vậy con gái thứ năm chính là Mary!',
  },
];

// 2. WEB AUDIO SYNTHESIZER (No external audio files needed!)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }
  playPull() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }
  playSlip() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
  playCorrect() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.2);
    });
  }
  playWrong() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [220, 185].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.2);
    });
  }
  playVictory() {
    if (!this.enabled) return;
    this.init();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
      }, idx * 120);
    });
  }
}
const sound = new SoundEngine();

// 3. GAME STATE
const state = {
  mode: 'split-screen', // 'split-screen' (default), 'turn-based', 'vs-bot'
  activeTurn: 'blue',
  ropePosition: 0, // -100 (Blue knockout) to +100 (Red knockout)
  winThreshold: 85,
  pullStep: 14,
  slipDistance: 10.5,
  pointsCorrect: 100,
  pointsWrong: 50,
  timeLimit: 20,
  sameQuestions: false,
  totalQuestions: 10,
  isGameOver: false,
  
  blue: {
    name: 'Đội Xanh',
    score: 0,
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    questions: [],
    timer: 20,
    timerInterval: null,
    hasAnswered: false,
    autoNextTimer: null,
  },
  
  red: {
    name: 'Đội Đỏ',
    score: 0,
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    questions: [],
    timer: 20,
    timerInterval: null,
    hasAnswered: false,
    autoNextTimer: null,
  },
};

// 4. SHUFFLE & PREPARE QUESTIONS
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function prepareQuestions() {
  let pool = shuffle(QUESTION_BANK);
  while (pool.length < state.totalQuestions * 2) {
    pool = pool.concat(shuffle(QUESTION_BANK));
  }

  const formatQ = (q) => {
    const correctOpt = q.options[q.correct];
    const shuffledOpts = shuffle(q.options);
    return {
      ...q,
      options: shuffledOpts,
      correct: shuffledOpts.indexOf(correctOpt),
    };
  };

  if (state.sameQuestions) {
    const base = pool.slice(0, state.totalQuestions);
    state.blue.questions = base.map(formatQ);
    state.red.questions = base.map((q) => ({ ...q, options: [...q.options] }));
  } else {
    state.blue.questions = pool.slice(0, state.totalQuestions).map(formatQ);
    state.red.questions = pool.slice(state.totalQuestions, state.totalQuestions * 2).map(formatQ);
  }
}

// 5. RENDER GAME INTERFACE
function updateScoreboard() {
  document.getElementById('blue-score').textContent = state.blue.score;
  document.getElementById('red-score').textContent = state.red.score;
  document.getElementById('blue-correct-tag').textContent = `Đúng ${state.blue.correctCount}/${state.totalQuestions}`;
  document.getElementById('red-correct-tag').textContent = `Đúng ${state.red.correctCount}/${state.totalQuestions}`;
  
  const round = Math.min(state.totalQuestions, Math.max(state.blue.currentIndex + 1, state.red.currentIndex + 1));
  document.getElementById('round-badge').textContent = `Hiệp ${round} / ${state.totalQuestions}`;
}

function updateRopeAndArena() {
  // Convert ropePosition (-100 to +100) to SVG pixel offset (approx -200px to +200px)
  const offsetPx = (state.ropePosition / 100) * 190;
  const ropeGroup = document.getElementById('rope-group');
  if (ropeGroup) {
    ropeGroup.style.transform = `translateX(${offsetPx}px)`;
  }
}

function showActionBanner(text) {
  const banner = document.getElementById('banner-action');
  if (!banner) return;
  banner.textContent = text;
  banner.style.display = 'block';
  banner.style.animation = 'none';
  banner.offsetHeight; // trigger reflow
  banner.style.animation = 'popIn 0.3s ease-out forwards';
  setTimeout(() => {
    banner.style.display = 'none';
  }, 1800);
}

// Render individual question card
function renderQuestionCard(team) {
  const isBlue = team === 'blue';
  const tState = isBlue ? state.blue : state.red;
  const cardEl = document.getElementById(isBlue ? 'blue-q-card' : 'red-q-card');
  if (!cardEl) return;

  const currentQ = tState.questions[tState.currentIndex];

  // If completed 10 questions
  if (!currentQ || tState.currentIndex >= state.totalQuestions) {
    cardEl.innerHTML = `
      <div class="q-header">
        <span class="q-team-title">${tState.name}</span>
        <span class="waiting-pill">Đã hoàn thành!</span>
      </div>
      <div class="q-body" style="text-align: center; justify-content: center; padding: 32px 16px;">
        <div style="font-size: 36px; margin-bottom: 8px;">🎉</div>
        <h3 style="font-size: 16px; font-weight: 900; color: ${isBlue ? 'var(--blue-primary)' : 'var(--red-primary)'};">
          ${tState.name} đã hoàn thành 10 câu!
        </h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
          Đúng: <strong>${tState.correctCount}</strong> • Sai: <strong>${tState.wrongCount}</strong>
        </p>
      </div>
    `;
    return;
  }

  // Active status check
  const isTurn = state.mode === 'split-screen' || state.activeTurn === team;
  cardEl.className = `q-card ${isBlue ? 'blue-card' : 'red-card'} ${isTurn ? 'active-turn' : 'waiting-turn'}`;

  const optLetters = ['A', 'B', 'C', 'D'];
  const optionsHtml = currentQ.options
    .map(
      (opt, idx) => `
      <button class="opt-btn" onclick="handleSelectAnswer('${team}', ${idx})" ${tState.hasAnswered || !isTurn ? 'disabled' : ''}>
        <span class="opt-letter">${optLetters[idx]}</span>
        <span>${opt}</span>
      </button>
    `
    )
    .join('');

  cardEl.innerHTML = `
    <div class="q-header">
      <div class="q-team-title">
        <span>${tState.name}</span>
        ${isTurn && !tState.hasAnswered ? '<span class="turn-pill">⚡ Đang đến lượt</span>' : ''}
        {!isTurn && !tState.hasAnswered ? '<span class="waiting-pill">⏳ Đang đợi...</span>' : ''}
      </div>
      <div class="q-timer-box">
        <span class="timer-tag" id="${team}-timer-display">${tState.timer}s</span>
        <span style="font-size: 11px; font-weight: 800; background: rgba(255,255,255,0.25); padding: 2px 8px; border-radius: 9999px;">
          Câu ${tState.currentIndex + 1} / ${state.totalQuestions}
        </span>
      </div>
    </div>
    
    <div class="q-progress-bar-wrap">
      <div class="q-progress-bar-fill" id="${team}-progress-fill" style="width: ${(tState.timer / state.timeLimit) * 100}%"></div>
    </div>

    <div class="q-body">
      <span class="q-category-tag">${currentQ.category || 'Trắc nghiệm'}</span>
      <h3 class="q-text">${currentQ.question}</h3>
      
      <div class="options-list" id="${team}-options-list">
        ${optionsHtml}
      </div>

      <!-- Skip button when question is unanswered -->
      ${
        !tState.hasAnswered && isTurn
          ? `
        <div class="skip-action-row">
          <span class="skip-help-text">Không biết đáp án?</span>
          <button type="button" class="skip-btn" onclick="handleSkipQuestion('${team}')">
            ⏭️ Qua câu (Tính sai & lùi lại)
          </button>
        </div>
      `
          : ''
      }

      <!-- Result Feedback Panel -->
      <div class="q-feedback-panel" id="${team}-feedback-panel">
        <div class="feedback-title" id="${team}-feedback-title"></div>
        <div class="feedback-correct-answer" id="${team}-correct-banner" style="display: none;"></div>
        <div class="feedback-explanation" id="${team}-feedback-explanation"></div>
        
        <div class="feedback-footer">
          <span class="countdown-label" id="${team}-countdown-label"></span>
          <button class="next-q-btn" onclick="handleNextQuestion('${team}')">
            ${tState.currentIndex + 1 >= state.totalQuestions ? 'Xem kết quả 🏆' : 'Qua câu tiếp theo ➡️'}
          </button>
        </div>
      </div>
    </div>
  `;

  // Start timer if this team is active and hasn't answered
  if (isTurn && !tState.hasAnswered) {
    startTimer(team);
  }

  // Trigger bot if vs-bot mode and red's turn
  if (team === 'red' && state.mode === 'vs-bot' && isTurn && !tState.hasAnswered) {
    simulateBotAnswer();
  }
}

// 6. TIMER LOGIC
function startTimer(team) {
  const tState = team === 'blue' ? state.blue : state.red;
  clearInterval(tState.timerInterval);

  tState.timerInterval = setInterval(() => {
    if (tState.hasAnswered || state.isGameOver) {
      clearInterval(tState.timerInterval);
      return;
    }
    tState.timer--;
    const timerDisp = document.getElementById(`${team}-timer-display`);
    const fillDisp = document.getElementById(`${team}-progress-fill`);
    if (timerDisp) timerDisp.textContent = `${tState.timer}s`;
    if (fillDisp) fillDisp.style.width = `${Math.max(0, (tState.timer / state.timeLimit) * 100)}%`;

    if (tState.timer <= 0) {
      clearInterval(tState.timerInterval);
      handleSelectAnswer(team, -1); // Time out = wrong answer
    }
  }, 1000);
}

// 7. ANSWER SUBMISSION
window.handleSelectAnswer = function (team, chosenIdx) {
  const isBlue = team === 'blue';
  const tState = isBlue ? state.blue : state.red;
  if (tState.hasAnswered || state.isGameOver) return;

  tState.hasAnswered = true;
  clearInterval(tState.timerInterval);

  const currentQ = tState.questions[tState.currentIndex];
  const isCorrect = chosenIdx === currentQ.correct;

  // Highlight buttons
  const optBtns = document.querySelectorAll(`#${team}-options-list .opt-btn`);
  optBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === currentQ.correct) {
      btn.classList.add('correct');
    } else if (idx === chosenIdx) {
      btn.classList.add('wrong');
    }
  });

  // Calculate score and rope position
  if (isCorrect) {
    tState.score += state.pointsCorrect;
    tState.correctCount++;
    sound.playCorrect();

    if (isBlue) {
      state.ropePosition = Math.max(-100, state.ropePosition - state.pullStep);
      showActionBanner('🎉 ĐỘI XANH ĐÚNG! +100đ & KÉO DÂY MẠNH! ⚡');
    } else {
      state.ropePosition = Math.min(100, state.ropePosition + state.pullStep);
      showActionBanner('🎉 ĐỘI ĐỎ ĐÚNG! +100đ & KÉO DÂY MẠNH! ⚡');
    }
    sound.playPull();
  } else {
    tState.score = Math.max(0, tState.score - state.pointsWrong);
    tState.wrongCount++;
    sound.playWrong();

    if (isBlue) {
      state.ropePosition = Math.min(100, state.ropePosition + state.slipDistance);
      showActionBanner('💦 ĐỘI XANH SAI! -50đ & BỊ LÙI LẠI!');
    } else {
      state.ropePosition = Math.max(-100, state.ropePosition - state.slipDistance);
      showActionBanner('💦 ĐỘI ĐỎ SAI! -50đ & BỊ LÙI LẠI!');
    }
    sound.playSlip();
  }

  updateScoreboard();
  updateRopeAndArena();

  // Show Feedback Panel
  const panel = document.getElementById(`${team}-feedback-panel`);
  const title = document.getElementById(`${team}-feedback-title`);
  const correctBanner = document.getElementById(`${team}-correct-banner`);
  const exp = document.getElementById(`${team}-feedback-explanation`);
  const countdownLabel = document.getElementById(`${team}-countdown-label`);

  if (panel && title) {
    panel.className = `q-feedback-panel visible ${isCorrect ? 'success' : 'failed'}`;
    title.textContent = isCorrect
      ? '🎉 Chính xác! (+100 điểm & Kéo dây)'
      : chosenIdx === -1
      ? '⏭️ Đã qua câu / Hết giờ! (-50 điểm & Lùi lại)'
      : '❌ Chưa chính xác! (-50 điểm & Lùi lại)';

    if (!isCorrect && correctBanner) {
      const letters = ['A', 'B', 'C', 'D'];
      correctBanner.style.display = 'inline-block';
      correctBanner.innerHTML = `Đáp án đúng: <strong>${letters[currentQ.correct]}. ${currentQ.options[currentQ.correct]}</strong>`;
    }

    if (exp) exp.textContent = currentQ.explanation || '';

    // Auto countdown 3 seconds to next question
    let remainingSec = 3;
    if (countdownLabel) countdownLabel.textContent = `⏱️ Tự động qua câu sau ${remainingSec}s...`;

    clearInterval(tState.autoNextTimer);
    tState.autoNextTimer = setInterval(() => {
      remainingSec--;
      if (countdownLabel) countdownLabel.textContent = `⏱️ Tự động qua câu sau ${remainingSec}s...`;
      if (remainingSec <= 0) {
        clearInterval(tState.autoNextTimer);
        handleNextQuestion(team);
      }
    }, 1000);
  }

  checkGameOver();
};

window.handleSkipQuestion = function (team) {
  // Voluntary skip: treated as wrong answer (-50 points, slip rope)
  handleSelectAnswer(team, -1);
};

// 8. NEXT QUESTION
window.handleNextQuestion = function (team) {
  const tState = team === 'blue' ? state.blue : state.red;
  clearInterval(tState.autoNextTimer);

  tState.currentIndex++;
  tState.hasAnswered = false;
  tState.timer = state.timeLimit;

  // Switch active turn in turn-based mode
  if (state.mode === 'turn-based' || state.mode === 'vs-bot') {
    state.activeTurn = team === 'blue' ? 'red' : 'blue';
  }

  renderQuestionCard('blue');
  renderQuestionCard('red');
  updateScoreboard();

  checkGameOver();
};

// 9. BOT SIMULATION (for vs-bot mode)
function simulateBotAnswer() {
  setTimeout(() => {
    if (state.red.hasAnswered || state.isGameOver) return;
    const currentQ = state.red.questions[state.red.currentIndex];
    if (!currentQ) return;

    // Bot has ~72% chance of choosing correct answer
    const willBeCorrect = Math.random() < 0.72;
    let chosen = currentQ.correct;
    if (!willBeCorrect) {
      const wrongs = [0, 1, 2, 3].filter((i) => i !== currentQ.correct);
      chosen = wrongs[Math.floor(Math.random() * wrongs.length)];
    }
    handleSelectAnswer('red', chosen);
  }, 1400 + Math.random() * 1000);
}

// 10. GAME OVER & WINNER CHECK
function checkGameOver() {
  if (state.isGameOver) return;

  // Knockout win
  if (state.ropePosition <= -state.winThreshold) {
    triggerGameOver('blue', 'Đội Xanh đã kéo dây qua vạch chiến thắng! Thắng Knockout ngoạn mục! 🏆');
    return;
  }
  if (state.ropePosition >= state.winThreshold) {
    triggerGameOver('red', 'Đội Đỏ đã kéo dây qua vạch chiến thắng! Thắng Knockout ngoạn mục! 🏆');
    return;
  }

  // Both completed 10 questions
  if (state.blue.currentIndex >= state.totalQuestions && state.red.currentIndex >= state.totalQuestions) {
    if (state.ropePosition < -5) {
      triggerGameOver('blue', 'Hết 10 câu! Dây nghiêng về phía Đội Xanh, Đội Xanh chiến thắng! 🏆');
    } else if (state.ropePosition > 5) {
      triggerGameOver('red', 'Hết 10 câu! Dây nghiêng về phía Đội Đỏ, Đội Đỏ chiến thắng! 🏆');
    } else {
      if (state.blue.score > state.red.score) {
        triggerGameOver('blue', 'Dây ở giữa, nhưng Đội Xanh có điểm số cao hơn và giành chiến thắng!');
      } else if (state.red.score > state.blue.score) {
        triggerGameOver('red', 'Dây ở giữa, nhưng Đội Đỏ có điểm số cao hơn và giành chiến thắng!');
      } else {
        triggerGameOver('draw', 'Trận đấu bất phân thắng bại! Hai đội hòa nhau ngoạn mục!');
      }
    }
  }
}

function triggerGameOver(winner, reason) {
  state.isGameOver = true;
  sound.playVictory();
  launchConfetti();

  const modal = document.getElementById('game-over-modal');
  const title = document.getElementById('winner-modal-title');
  const reasonText = document.getElementById('winner-modal-reason');
  const stats = document.getElementById('winner-modal-stats');

  if (modal) {
    title.textContent =
      winner === 'blue'
        ? `🎉 ${state.blue.name} CHIẾN THẮNG!`
        : winner === 'red'
        ? `🎉 ${state.red.name} CHIẾN THẮNG!`
        : '🤝 KẾT QUẢ HÒA!';
    title.style.color = winner === 'blue' ? 'var(--blue-primary)' : winner === 'red' ? 'var(--red-primary)' : '#475569';
    reasonText.textContent = reason;
    stats.innerHTML = `
      <div style="display: flex; justify-content: space-around; background: #f8fafc; padding: 14px; border-radius: 12px; margin: 16px 0;">
        <div>
          <strong style="color: var(--blue-primary);">${state.blue.name}</strong>
          <div style="font-size: 20px; font-weight: 900;">${state.blue.score}đ</div>
          <div style="font-size: 11px; color: var(--text-muted);">Đúng: ${state.blue.correctCount}/10</div>
        </div>
        <div style="font-size: 24px; font-weight: 900; color: #cbd5e1;">-</div>
        <div>
          <strong style="color: var(--red-primary);">${state.red.name}</strong>
          <div style="font-size: 20px; font-weight: 900;">${state.red.score}đ</div>
          <div style="font-size: 11px; color: var(--text-muted);">Đúng: ${state.red.correctCount}/10</div>
        </div>
      </div>
    `;
    modal.classList.add('active');
  }
}

// 11. CONFETTI ANIMATION
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 90,
    color: ['#2563eb', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 5)],
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0,
  }));

  let animationFrame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });

    if (state.isGameOver) {
      animationFrame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
  setTimeout(() => cancelAnimationFrame(animationFrame), 5000);
}

// 12. CONTROLS & EVENT LISTENERS
window.setGameMode = function (mode) {
  state.mode = mode;
  document.querySelectorAll('.mode-btn').forEach((btn) => btn.classList.remove('active'));
  document.getElementById(`mode-${mode}`).classList.add('active');
  resetGame();
};

window.resetGame = function () {
  state.ropePosition = 0;
  state.activeTurn = 'blue';
  state.isGameOver = false;

  state.blue.score = 0;
  state.blue.currentIndex = 0;
  state.blue.correctCount = 0;
  state.blue.wrongCount = 0;
  state.blue.hasAnswered = false;
  state.blue.timer = state.timeLimit;
  clearInterval(state.blue.timerInterval);
  clearInterval(state.blue.autoNextTimer);

  state.red.score = 0;
  state.red.currentIndex = 0;
  state.red.correctCount = 0;
  state.red.wrongCount = 0;
  state.red.hasAnswered = false;
  state.red.timer = state.timeLimit;
  clearInterval(state.red.timerInterval);
  clearInterval(state.red.autoNextTimer);

  document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('active'));

  prepareQuestions();
  updateScoreboard();
  updateRopeAndArena();
  renderQuestionCard('blue');
  renderQuestionCard('red');
};

window.toggleSound = function () {
  sound.enabled = !sound.enabled;
  document.getElementById('sound-btn').textContent = sound.enabled ? '🔊 Bật' : '🔇 Tắt';
};

window.openModal = function (id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
};

window.closeModal = function (id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  resetGame();
});
