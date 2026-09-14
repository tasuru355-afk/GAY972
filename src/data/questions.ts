import { Question } from '../types';

export const QUESTION_CATEGORIES = [
  { id: 'all', name: 'Tất cả chủ đề (Ngẫu nhiên)' },
  { id: 'dovui', name: 'Đố vui trí tuệ & Dân gian' },
  { id: 'khoahoc', name: 'Khoa học & Tự nhiên' },
  { id: 'lichsu_dialy', name: 'Lịch sử & Địa lý Việt Nam' },
  { id: 'toan_logic', name: 'Toán học & Logic nhanh' },
];

export const BUILT_IN_QUESTIONS: Question[] = [
  // Đố vui trí tuệ & dân gian
  {
    id: 'dv-1',
    category: 'dovui',
    question: 'Cái gì chặt không đứt, bứt không rời, phơi không khô, đốt không cháy?',
    options: ['Nước', 'Gió', 'Khói', 'Bóng râm'],
    correctIndex: 0,
    explanation: 'Nước là chất lỏng, không thể chặt đứt hay đốt cháy bằng lửa thông thường!',
  },
  {
    id: 'dv-2',
    category: 'dovui',
    question: 'Con gì đầu dê mình ốc?',
    options: ['Con dốc', 'Con vịt', 'Con ốc bươu', 'Con dơi'],
    correctIndex: 0,
    explanation: 'Chữ "Dốc" có đầu là Dê (D) và mình là Ốc (ốc)!',
  },
  {
    id: 'dv-3',
    category: 'dovui',
    question: 'Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?',
    options: ['Bắp ngô (Bắp nướng)', 'Củ khoai lang', 'Quả chuối nướng', 'Củ hành tây'],
    correctIndex: 0,
    explanation: 'Bắp ngô bỏ vỏ ngoài nướng hạt bên trong, khi ăn ăn hạt ngoài bỏ cùi bên trong.',
  },
  {
    id: 'dv-4',
    category: 'dovui',
    question: 'Càng kéo càng ngắn là cái gì?',
    options: ['Điếu thuốc lá', 'Sợi dây thun', 'Cái quần', 'Chiếc áo'],
    correctIndex: 0,
    explanation: 'Điếu thuốc lá khi hút (kéo thuốc) thì tàn thuốc rụng dần và điếu thuốc ngắn lại.',
  },
  {
    id: 'dv-5',
    category: 'dovui',
    question: 'Cây gì càng đốt càng dài?',
    options: ['Cây tre', 'Cây chuối', 'Cây sậy', 'Cây mía'],
    correctIndex: 0,
    explanation: 'Cây tre có nhiều đốt tre, càng nhiều đốt thì cây càng mọc cao dài!',
  },
  {
    id: 'dv-6',
    category: 'dovui',
    question: 'Tháng nào trong năm người ta ngủ ít nhất?',
    options: ['Tháng 2', 'Tháng 12', 'Tháng 1', 'Tháng 4'],
    correctIndex: 0,
    explanation: 'Tháng 2 chỉ có 28 hoặc 29 ngày, ít ngày nhất trong năm nên tổng thời gian ngủ ít nhất!',
  },
  {
    id: 'dv-7',
    category: 'dovui',
    question: 'Cái gì của bạn nhưng người khác lại dùng nhiều hơn bạn?',
    options: ['Tên của bạn', 'Số điện thoại', 'Tiền của bạn', 'Xe của bạn'],
    correctIndex: 0,
    explanation: 'Tên của bạn để người khác xưng hô gọi bạn mỗi ngày!',
  },
  {
    id: 'dv-8',
    category: 'dovui',
    question: 'Bánh gì nghe tên tưởng đã bị ngã?',
    options: ['Bánh tét', 'Bánh bò', 'Bánh trôi', 'Bánh xèo'],
    correctIndex: 0,
    explanation: 'Bánh tét nghe như bị "tét" ngã!',
  },
  {
    id: 'dv-9',
    category: 'dovui',
    question: 'Quả gì không bao giờ chín?',
    options: ['Quả bóng', 'Quả cam sành', 'Quả chanh', 'Quả cóc'],
    correctIndex: 0,
    explanation: 'Quả bóng là đồ chơi, không thể "chín" được!',
  },
  {
    id: 'dv-10',
    category: 'dovui',
    question: 'Ở giữa Thái Bình Dương là cái gì?',
    options: ['Chữ "Bình"', 'Đảo Hawaii', 'Một ngọn núi lửa', 'Nước biển'],
    correctIndex: 0,
    explanation: 'Từ "Thái Bình Dương" gồm 3 chữ, chữ ở giữa chính là chữ "Bình"!',
  },

  // Khoa học & Tự nhiên
  {
    id: 'kh-1',
    category: 'khoahoc',
    question: 'Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?',
    options: ['Sao Thủy (Mercury)', 'Sao Kim (Venus)', 'Sao Hỏa (Mars)', 'Trái Đất'],
    correctIndex: 0,
    explanation: 'Sao Thủy là hành tinh nằm gần Mặt Trời nhất với khoảng cách trung bình 57,9 triệu km.',
  },
  {
    id: 'kh-2',
    category: 'khoahoc',
    question: 'Loài động vật có vú nào lớn nhất hành tinh?',
    options: ['Cá voi xanh', 'Voi châu Phi', 'Hà mã', 'Hươu cao cổ'],
    correctIndex: 0,
    explanation: 'Cá voi xanh có thể dài tới 30 mét và nặng tới 180-200 tấn!',
  },
  {
    id: 'kh-3',
    category: 'khoahoc',
    question: 'Khí nào chiếm tỉ lệ cao nhất trong khí quyển Trái Đất?',
    options: ['Khí Nitơ (N2)', 'Khí Oxy (O2)', 'Khí Cacbonic (CO2)', 'Khí Hydro (H2)'],
    correctIndex: 0,
    explanation: 'Khí Nitơ chiếm khoảng 78% thể tích bầu khí quyển Trái Đất, trong khi Oxy chiếm khoảng 21%.',
  },
  {
    id: 'kh-4',
    category: 'khoahoc',
    question: 'Cơ quan nào trong cơ thể người sản xuất dịch mật?',
    options: ['Gan', 'Dạ dày', 'Tụy', 'Ruột non'],
    correctIndex: 0,
    explanation: 'Gan sản xuất dịch mật, sau đó mật được lưu trữ trong túi mật để giúp tiêu hóa chất béo.',
  },
  {
    id: 'kh-5',
    category: 'khoahoc',
    question: 'Hiện tượng cầu vồng hình thành do hiện tượng vật lý nào của ánh sáng?',
    options: ['Tán sắc và phản xạ ánh sáng', 'Nhiễu xạ ánh sáng', 'Giao thoa ánh sáng', 'Quang điện ngoài'],
    correctIndex: 0,
    explanation: 'Cầu vồng tạo ra do sự khúc xạ, phản xạ và tán sắc ánh sáng Mặt Trời qua các giọt nước mưa.',
  },
  {
    id: 'kh-6',
    category: 'khoahoc',
    question: 'Kim loại nào có nhiệt độ nóng chảy thấp nhất, ở thể lỏng ở nhiệt độ phòng?',
    options: ['Thủy ngân (Hg)', 'Sắt (Fe)', 'Chì (Pb)', 'Đồng (Cu)'],
    correctIndex: 0,
    explanation: 'Thủy ngân là kim loại duy nhất ở thể lỏng ở nhiệt độ và áp suất tiêu chuẩn.',
  },
  {
    id: 'kh-7',
    category: 'khoahoc',
    question: 'Cây xanh hấp thụ khí gì và thải ra khí gì trong quá trình quang hợp vào ban ngày?',
    options: ['Hấp thụ CO2, thải ra O2', 'Hấp thụ O2, thải ra CO2', 'Hấp thụ N2, thải ra O2', 'Hấp thụ CO2, thải ra N2'],
    correctIndex: 0,
    explanation: 'Quang hợp biến đổi khí Carbonic (CO2) và nước thành glucose và giải phóng khí Oxy (O2).',
  },
  {
    id: 'kh-8',
    category: 'khoahoc',
    question: 'Loài chim nào có khả năng bay lùi được?',
    options: ['Chim ruồi', 'Chim bồ câu', 'Chim đại bàng', 'Chim yến'],
    correctIndex: 0,
    explanation: 'Chim ruồi có cấu tạo khớp cánh linh hoạt đặc biệt giúp chúng bay lơ lửng và bay lùi dễ dàng.',
  },
  {
    id: 'kh-9',
    category: 'khoahoc',
    question: 'Trọng lực trên Mặt Trăng bằng khoảng bao nhiêu phần so với Trái Đất?',
    options: ['1/6', '1/2', '1/3', '1/10'],
    correctIndex: 0,
    explanation: 'Trọng lực trên Mặt Trăng xấp xỉ 1/6 (khoảng 16.6%) so với trọng lực Trái Đất.',
  },
  {
    id: 'kh-10',
    category: 'khoahoc',
    question: 'Vận tốc ánh sáng trong chân không xấp xỉ bằng bao nhiêu?',
    options: ['300.000 km/s', '150.000 km/s', '3.000 km/s', '1.000.000 km/s'],
    correctIndex: 0,
    explanation: 'Vận tốc ánh sáng trong chân không chính xác là 299.792 km/s, làm tròn là 300.000 km/s.',
  },

  // Lịch sử & Địa lý Việt Nam
  {
    id: 'ls-1',
    category: 'lichsu_dialy',
    question: 'Đỉnh núi nào được mệnh danh là "Nóc nhà Đông Dương"?',
    options: ['Fansipan', 'Bạch Mộc Lương Tử', 'Pu Si Lung', 'Tây Côn Lĩnh'],
    correctIndex: 0,
    explanation: 'Đỉnh Fansipan cao 3.143m tại Lào Cai là đỉnh núi cao nhất Việt Nam và toàn bán đảo Đông Dương.',
  },
  {
    id: 'ls-2',
    category: 'lichsu_dialy',
    question: 'Chiến thắng Bạch Đằng năm 938 do ai lãnh đạo đánh tan quân Nam Hán?',
    options: ['Ngô Quyền', 'Trần Hưng Đạo', 'Lê Hoàn', 'Lý Thường Kiệt'],
    correctIndex: 0,
    explanation: 'Ngô Quyền đã dùng mưu đóng cọc nhọn trên sông Bạch Đằng, chấm dứt hơn 1000 năm Bắc thuộc.',
  },
  {
    id: 'ls-3',
    category: 'lichsu_dialy',
    question: 'Việt Nam có đường biên giới trên đất liền giáp với bao nhiêu quốc gia?',
    options: ['3 quốc gia', '2 quốc gia', '4 quốc gia', '5 quốc gia'],
    correctIndex: 0,
    explanation: 'Việt Nam giáp 3 quốc gia trên đất liền: Trung Quốc, Lào và Campuchia.',
  },
  {
    id: 'ls-4',
    category: 'lichsu_dialy',
    question: 'Hồ nước ngọt tự nhiên lớn nhất Việt Nam là hồ nào?',
    options: ['Hồ Ba Bể', 'Hồ Tây', 'Hồ Dầu Tiếng', 'Hồ Thác Bà'],
    correctIndex: 0,
    explanation: 'Hồ Ba Bể tại tỉnh Bắc Kạn là một trong những hồ nước ngọt tự nhiên lớn nhất thế giới và lớn nhất VN.',
  },
  {
    id: 'ls-5',
    category: 'lichsu_dialy',
    question: 'Thủ đô Hà Nội trước đây từng mang tên Thăng Long bắt đầu từ triều đại nào?',
    options: ['Nhà Lý (Lý Thái Tổ)', 'Nhà Trần', 'Nhà Đinh', 'Nhà Hậu Lê'],
    correctIndex: 0,
    explanation: 'Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư về Đại La và đổi tên thành Thăng Long.',
  },
  {
    id: 'ls-6',
    category: 'lichsu_dialy',
    question: 'Sông Mê Kông chảy qua lãnh thổ Việt Nam được gọi là con sông gì?',
    options: ['Sông Cửu Long', 'Sông Đồng Nai', 'Sông Hồng', 'Sông Tiền'],
    correctIndex: 0,
    explanation: 'Khi vào Việt Nam, sông Mê Kông tách thành hai nhánh Tiền Giang và Hậu Giang đổ ra biển qua các cửa sông, gọi chung là sông Cửu Long.',
  },
  {
    id: 'ls-7',
    category: 'lichsu_dialy',
    question: 'Ai là người cắm cờ giải phóng trên nóc Dinh Độc Lập ngày 30/4/1975?',
    options: ['Bùi Quang Thận', 'Nguyễn Văn Tập', 'Vũ Đăng Toàn', 'Lê Văn Phượng'],
    correctIndex: 0,
    explanation: 'Trung úy Bùi Quang Thận, chỉ huy xe tăng 843 đã giương cao cờ Mặt trận Dân tộc Giải phóng miền Nam trên nóc Dinh Độc Lập.',
  },
  {
    id: 'ls-8',
    category: 'lichsu_dialy',
    question: 'Quần đảo Hoàng Sa và Trường Sa lần lượt thuộc quyền quản lý hành chính của hai tỉnh/thành phố nào?',
    options: ['Đà Nẵng và Khánh Hòa', 'Quảng Nam và Bình Thuận', 'Hải Phòng và Bà Rịa Vũng Tàu', 'Huế và Kiên Giang'],
    correctIndex: 0,
    explanation: 'Quần đảo Hoàng Sa trực thuộc huyện Hoàng Sa (TP Đà Nẵng), Trường Sa trực thuộc huyện Trường Sa (tỉnh Khánh Hòa).',
  },
  {
    id: 'ls-9',
    category: 'lichsu_dialy',
    question: 'Di sản thiên nhiên thế giới đầu tiên của Việt Nam được UNESCO công nhận là gì?',
    options: ['Vịnh Hạ Long', 'Vườn quốc gia Phong Nha - Kẻ Bàng', 'Quần thể danh thắng Tràng An', 'Cao nguyên đá Đồng Văn'],
    correctIndex: 0,
    explanation: 'Vịnh Hạ Long được UNESCO công nhận là Di sản thiên nhiên thế giới lần đầu tiên vào năm 1994.',
  },
  {
    id: 'ls-10',
    category: 'lichsu_dialy',
    question: 'Tác phẩm "Bình Ngô đại cáo" được xem là bản tuyên ngôn độc lập thứ hai của dân tộc do ai sáng tác?',
    options: ['Nguyễn Trãi', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Nguyễn Du'],
    correctIndex: 0,
    explanation: 'Nguyễn Trãi viết Bình Ngô đại cáo thay lời Bình Định Vương Lê Lợi vào năm 1428 sau khi đại thắng quân Minh.',
  },

  // Toán học & Logic nhanh
  {
    id: 'toan-1',
    category: 'toan_logic',
    question: 'Một con ốc sên trèo lên cây cau cao 10m. Ban ngày trèo lên 3m, ban đêm tụt xuống 2m. Hỏi sau bao nhiêu ngày đêm nó lên tới ngọn?',
    options: ['8 ngày đêm', '10 ngày đêm', '7 ngày đêm', '9 ngày đêm'],
    correctIndex: 0,
    explanation: 'Mỗi ngày đêm leo được 1m. Sau 7 ngày đêm leo được 7m, đến ngày thứ 8 leo thêm 3m là tới ngọn (10m) không bị tụt xuống nữa!',
  },
  {
    id: 'toan-2',
    category: 'toan_logic',
    question: 'Số nào là số nguyên tố nhỏ nhất?',
    options: ['Số 2', 'Số 1', 'Số 0', 'Số 3'],
    correctIndex: 0,
    explanation: 'Số 2 là số nguyên tố chẵn duy nhất và cũng là số nguyên tố nhỏ nhất (1 không phải là số nguyên tố).',
  },
  {
    id: 'toan-3',
    category: 'toan_logic',
    question: 'Tổng các góc trong một tam giác bằng bao nhiêu độ?',
    options: ['180 độ', '360 độ', '90 độ', '270 độ'],
    correctIndex: 0,
    explanation: 'Trong hình học phẳng Euclid, tổng ba góc trong của bất kỳ tam giác nào luôn bằng 180 độ.',
  },
  {
    id: 'toan-4',
    category: 'toan_logic',
    question: 'Nếu 5 con mèo bắt được 5 con chuột trong 5 phút, thì cần bao nhiêu con mèo để bắt được 100 con chuột trong 100 phút?',
    options: ['5 con mèo', '100 con mèo', '20 con mèo', '50 con mèo'],
    correctIndex: 0,
    explanation: 'Mỗi con mèo bắt được 1 con chuột trong 5 phút. Trong 100 phút (gấp 20 lần), 1 con mèo bắt được 20 con chuột. Vậy 5 con mèo sẽ bắt được 5 x 20 = 100 con chuột!',
  },
  {
    id: 'toan-5',
    category: 'toan_logic',
    question: 'Tìm số tiếp theo trong dãy số: 1, 1, 2, 3, 5, 8, 13, ... ?',
    options: ['21', '20', '18', '26'],
    correctIndex: 0,
    explanation: 'Dãy Fibonacci: số sau bằng tổng 2 số liền trước, vậy 8 + 13 = 21.',
  },
  {
    id: 'toan-6',
    category: 'toan_logic',
    question: 'Một hình vuông có chu vi là 36 cm. Diện tích của hình vuông đó là bao nhiêu?',
    options: ['81 cm²', '64 cm²', '36 cm²', '72 cm²'],
    correctIndex: 0,
    explanation: 'Cạnh hình vuông = 36 / 4 = 9 cm. Diện tích = 9 x 9 = 81 cm².',
  },
  {
    id: 'toan-7',
    category: 'toan_logic',
    question: 'Phép tính: 6 ÷ 2(1 + 2) có kết quả là bao nhiêu?',
    options: ['9', '1', '6', '3'],
    correctIndex: 0,
    explanation: 'Theo thứ tự thực hiện phép tính: ngoặc trước (1+2=3), sau đó thực hiện từ trái sang phải: 6 ÷ 2 = 3, rồi 3 x 3 = 9.',
  },
  {
    id: 'toan-8',
    category: 'toan_logic',
    question: 'Trong một căn phòng có 6 người. Mỗi người bắt tay với tất cả những người còn lại đúng 1 lần. Hỏi có bao nhiêu cái bắt tay?',
    options: ['15 cái', '30 cái', '36 cái', '12 cái'],
    correctIndex: 0,
    explanation: 'Số cái bắt tay là tổ hợp chập 2 của 6: (6 x 5) / 2 = 15 cái bắt tay.',
  },
  {
    id: 'toan-9',
    category: 'toan_logic',
    question: 'Số Pi (π) làm tròn đến 2 chữ số thập phân là bao nhiêu?',
    options: ['3.14', '3.12', '3.16', '3.41'],
    correctIndex: 0,
    explanation: 'Số Pi xấp xỉ bằng 3.14159..., làm tròn hai chữ số thập phân là 3.14.',
  },
  {
    id: 'toan-10',
    category: 'toan_logic',
    question: 'Bố của Mary có 5 người con gái: Nana, Nene, Nini, Nono. Hỏi người con gái thứ năm tên là gì?',
    options: ['Mary', 'Nunu', 'Nyny', 'Nonu'],
    correctIndex: 0,
    explanation: 'Đầu câu đã nêu: "Bố của Mary có 5 người con gái", vậy con gái thứ năm chính là Mary!',
  },
];

// Helper to shuffle questions and shuffle options
export function prepareTeamQuestions(
  category: string,
  count: number = 10,
  sameQuestions: boolean = false
): { blue: Question[]; red: Question[] } {
  let pool = [...BUILT_IN_QUESTIONS];
  if (category !== 'all') {
    pool = pool.filter((q) => q.category === category);
  }

  // Shuffle pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  // If pool has fewer questions than needed, recycle
  const needed = sameQuestions ? count : count * 2;
  while (shuffled.length < needed) {
    shuffled.push(...[...pool].sort(() => Math.random() - 0.5));
  }

  const shuffleQuestionOptions = (q: Question): Question => {
    const originalCorrect = q.options[q.correctIndex];
    const optionsWithOriginal = q.options.map((opt, idx) => ({ opt, isCorrect: idx === q.correctIndex }));
    const shuffledOptions = [...optionsWithOriginal].sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffledOptions.findIndex((o) => o.isCorrect);

    return {
      ...q,
      options: shuffledOptions.map((o) => o.opt),
      correctIndex: newCorrectIndex,
    };
  };

  if (sameQuestions) {
    const baseQuestions = shuffled.slice(0, count);
    const blueQuestions = baseQuestions.map(shuffleQuestionOptions);
    const redQuestions = baseQuestions.map((q) => ({
      ...q,
      options: [...q.options],
    }));
    return { blue: blueQuestions, red: redQuestions };
  }

  const blueQuestions = shuffled.slice(0, count).map(shuffleQuestionOptions);
  const redQuestions = shuffled.slice(count, count * 2).map(shuffleQuestionOptions);

  return { blue: blueQuestions, red: redQuestions };
}
