export type LanguageCode =
  | 'en' // English
  | 'fr' // French
  | 'de' // German
  | 'es' // Spanish
  | 'pt' // Portuguese
  | 'it' // Italian
  | 'nl' // Dutch
  | 'sv' // Swedish
  | 'pl' // Polish
  | 'cs' // Czech
  | 'sk' // Slovak
  | 'sl' // Slovenian
  | 'hr' // Croatian
  | 'sr' // Serbian
  | 'bg' // Bulgarian
  | 'ro' // Romanian
  | 'lt' // Lithuanian
  | 'lv' // Latvian
  | 'et' // Estonian
  | 'fi' // Finnish
  | 'da' // Danish
  | 'no' // Norwegian
  | 'is' // Icelandic
  | 'ca' // Catalan
  | 'hu' // Hungarian
  | 'el' // Greek
  | 'tr' // Turkish
  | 'ru' // Russian
  | 'uk' // Ukrainian
  | 'he' // Hebrew
  | 'ar' // Arabic
  | 'fa' // Persian
  | 'hi' // Hindi
  | 'bn' // Bengali
  | 'ur' // Urdu
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'ml' // Malayalam
  | 'kn' // Kannada
  | 'mr' // Marathi
  | 'pa' // Punjabi
  | 'gu' // Gujarati
  | 'zh' // Chinese (Simplified)
  | 'zh-TW' // Chinese (Traditional)
  | 'ja' // Japanese
  | 'ko' // Korean
  | 'th' // Thai
  | 'vi' // Vietnamese
  | 'id' // Indonesian
  | 'ms' // Malay
  | 'fil' // Filipino / Tagalog
  | 'sw' // Swahili
  | 'zu' // Zulu
  | 'am' // Amharic
  | 'so' // Somali
  | 'my' // Burmese
  | 'kk' // Kazakh
  | 'mn' // Mongolian
  | 'ka' // Georgian
  | 'hy'; // Armenian

export interface Terminology {
  MINUTES_OF_A_MEETING_OF: string;
  HELD_AT: string;
  ON_TEXT: string;
  START_LABEL: string;
  NOT_GIVEN: string;
  PRESENT: string;
  ABSENT: string;
}

export const TRANSLATIONS: Record<LanguageCode, Terminology> = {
  en: {
    MINUTES_OF_A_MEETING_OF: 'MINUTES OF A MEETING OF',
    HELD_AT: 'HELD AT',
    ON_TEXT: 'ON',
    START_LABEL: 'Start:',
    NOT_GIVEN: 'Not given',
    PRESENT: 'Present',
    ABSENT: 'Absent',
  },
  fr: {
    MINUTES_OF_A_MEETING_OF: 'PROCÈS-VERBAL DE LA RÉUNION DE',
    HELD_AT: 'TENUE À',
    ON_TEXT: 'LE',
    START_LABEL: 'Début :',
    NOT_GIVEN: 'Non renseigné',
    PRESENT: 'Présent',
    ABSENT: 'Absent',
  },
  de: {
    MINUTES_OF_A_MEETING_OF: 'PROTOKOLL EINER SITZUNG DES',
    HELD_AT: 'ABGEHALTEN IN',
    ON_TEXT: 'AM',
    START_LABEL: 'Beginn:',
    NOT_GIVEN: 'Nicht angegeben',
    PRESENT: 'Anwesend',
    ABSENT: 'Abwesend',
  },
  es: {
    MINUTES_OF_A_MEETING_OF: 'ACTA DE LA REUNIÓN DE',
    HELD_AT: 'CELEBRADA EN',
    ON_TEXT: 'EL',
    START_LABEL: 'Inicio:',
    NOT_GIVEN: 'No facilitado',
    PRESENT: 'Presente',
    ABSENT: 'Ausente',
  },
  pt: {
    MINUTES_OF_A_MEETING_OF: 'ATA DA REUNIÃO DE',
    HELD_AT: 'REALIZADA EM',
    ON_TEXT: 'EM',
    START_LABEL: 'Início:',
    NOT_GIVEN: 'Não fornecido',
    PRESENT: 'Presente',
    ABSENT: 'Ausente',
  },
  it: {
    MINUTES_OF_A_MEETING_OF: 'VERBALE DELLA RIUNIONE DI',
    HELD_AT: 'TENUTASI PRESSO',
    ON_TEXT: 'IL',
    START_LABEL: 'Inizio:',
    NOT_GIVEN: 'Non fornito',
    PRESENT: 'Presente',
    ABSENT: 'Assente',
  },
  nl: {
    MINUTES_OF_A_MEETING_OF: 'NOTULEN VAN EEN VERGADERING VAN',
    HELD_AT: 'GEHOUDEN IN',
    ON_TEXT: 'OP',
    START_LABEL: 'Start:',
    NOT_GIVEN: 'Niet opgegeven',
    PRESENT: 'Aanwezig',
    ABSENT: 'Afwezig',
  },
  sv: {
    MINUTES_OF_A_MEETING_OF: 'PROTOKOLL FRÅN ETT MÖTE MED',
    HELD_AT: 'HÅLLET I',
    ON_TEXT: 'DEN',
    START_LABEL: 'Start:',
    NOT_GIVEN: 'Ej angivet',
    PRESENT: 'Närvarande',
    ABSENT: 'Frånvarande',
  },
  pl: {
    MINUTES_OF_A_MEETING_OF: 'PROTOKÓŁ Z POSIEDZENIA',
    HELD_AT: 'ODBYTEGO W',
    ON_TEXT: 'W DNIU',
    START_LABEL: 'Rozpoczęcie:',
    NOT_GIVEN: 'Nie podano',
    PRESENT: 'Obecny',
    ABSENT: 'Nieobecny',
  },
  cs: {
    MINUTES_OF_A_MEETING_OF: 'ZÁPIS ZE SCHŮZE',
    HELD_AT: 'KONANÉ V',
    ON_TEXT: 'DNE',
    START_LABEL: 'Začátek:',
    NOT_GIVEN: 'Neuvedeno',
    PRESENT: 'Přítomen',
    ABSENT: 'Nepřítomen',
  },
  sk: {
    MINUTES_OF_A_MEETING_OF: 'ZÁPISNICA ZO SCHÔDZE',
    HELD_AT: 'KONANEJ V',
    ON_TEXT: 'DŇA',
    START_LABEL: 'Začiatok:',
    NOT_GIVEN: 'Nie je uvedené',
    PRESENT: 'Prítomný',
    ABSENT: 'Neprítomný',
  },
  sl: {
    MINUTES_OF_A_MEETING_OF: 'ZAPISNIK SEJE',
    HELD_AT: 'IZVEDENE V',
    ON_TEXT: 'DNE',
    START_LABEL: 'Začetek:',
    NOT_GIVEN: 'Ni podano',
    PRESENT: 'Prisoten',
    ABSENT: 'Odsoten',
  },
  hr: {
    MINUTES_OF_A_MEETING_OF: 'ZAPISNIK SASTANKA',
    HELD_AT: 'ODRŽANOG U',
    ON_TEXT: 'DANA',
    START_LABEL: 'Početak:',
    NOT_GIVEN: 'Nije navedeno',
    PRESENT: 'Prisutan',
    ABSENT: 'Odsutan',
  },
  sr: {
    MINUTES_OF_A_MEETING_OF: 'ЗАПИСНИК СА СЕДНИЦЕ',
    HELD_AT: 'ОДРЖАНОГ У',
    ON_TEXT: 'ДАНА',
    START_LABEL: 'Почетак:',
    NOT_GIVEN: 'Није наведено',
    PRESENT: 'Присутан',
    ABSENT: 'Одсутан',
  },
  bg: {
    MINUTES_OF_A_MEETING_OF: 'ПРОТОКОЛ ОТ ЗАСЕДАНИЕ НА',
    HELD_AT: 'ПРОВЕДЕНО В',
    ON_TEXT: 'НА',
    START_LABEL: 'Начало:',
    NOT_GIVEN: 'Не е посочено',
    PRESENT: 'Присъстващ',
    ABSENT: 'Отсъстващ',
  },
  ro: {
    MINUTES_OF_A_MEETING_OF: 'PROCES-VERBAL AL ȘEDINȚEI',
    HELD_AT: 'ȚINUTĂ LA',
    ON_TEXT: 'ÎN',
    START_LABEL: 'Început:',
    NOT_GIVEN: 'Nu este specificat',
    PRESENT: 'Prezent',
    ABSENT: 'Absent',
  },
  lt: {
    MINUTES_OF_A_MEETING_OF: 'SUSIRINKIMO PROTOKOLAS',
    HELD_AT: 'SURENGTO',
    ON_TEXT: 'D.',
    START_LABEL: 'Pradžia:',
    NOT_GIVEN: 'Nenurodyta',
    PRESENT: 'Dalyvauja',
    ABSENT: 'Nedalyvauja',
  },
  lv: {
    MINUTES_OF_A_MEETING_OF: 'SAPULCES PROTOKOLS',
    HELD_AT: 'NOTIKUSI',
    ON_TEXT: 'DATUMĀ',
    START_LABEL: 'Sākums:',
    NOT_GIVEN: 'Nav norādīts',
    PRESENT: 'Klātesošs',
    ABSENT: 'Neatnācis',
  },
  et: {
    MINUTES_OF_A_MEETING_OF: 'KOOSOLEKU PROTOKOLL',
    HELD_AT: 'TOIMUNUD',
    ON_TEXT: 'KUUPÄEVAL',
    START_LABEL: 'Algus:',
    NOT_GIVEN: 'Pole antud',
    PRESENT: 'Kohal',
    ABSENT: 'Puudub',
  },
  fi: {
    MINUTES_OF_A_MEETING_OF: 'KOKOUKSEN PÖYTÄKIRJA',
    HELD_AT: 'PIDETTY',
    ON_TEXT: 'PÄIVÄNÄ',
    START_LABEL: 'Aloitus:',
    NOT_GIVEN: 'Ei annettu',
    PRESENT: 'Läsnä',
    ABSENT: 'Poissa',
  },
  da: {
    MINUTES_OF_A_MEETING_OF: 'REFERAT AF ET MØDE I',
    HELD_AT: 'AFHOLDT I',
    ON_TEXT: 'DEN',
    START_LABEL: 'Start:',
    NOT_GIVEN: 'Ikke angivet',
    PRESENT: 'Tilstede',
    ABSENT: 'Fraværende',
  },
  no: {
    MINUTES_OF_A_MEETING_OF: 'REFERAT FRA ET MØTE I',
    HELD_AT: 'AVHOLDT I',
    ON_TEXT: 'DEN',
    START_LABEL: 'Start:',
    NOT_GIVEN: 'Ikke oppgitt',
    PRESENT: 'Tilstede',
    ABSENT: 'Fraværende',
  },
  is: {
    MINUTES_OF_A_MEETING_OF: 'FUNDARGERÐ FUNDAR',
    HELD_AT: 'HALDINN Í',
    ON_TEXT: 'ÞANN',
    START_LABEL: 'Upphaf:',
    NOT_GIVEN: 'Ekki gefið upp',
    PRESENT: 'Viðstaddur',
    ABSENT: 'Fjarverandi',
  },
  ca: {
    MINUTES_OF_A_MEETING_OF: 'ACTA DE LA REUNIÓ DE',
    HELD_AT: 'CELEBRADA A',
    ON_TEXT: 'EL',
    START_LABEL: 'Inici:',
    NOT_GIVEN: 'No facilitat',
    PRESENT: 'Present',
    ABSENT: 'Absent',
  },
  hu: {
    MINUTES_OF_A_MEETING_OF: 'ÜLÉS JEGYZŐKÖNYVE',
    HELD_AT: 'TARTVA',
    ON_TEXT: 'EKKOR:',
    START_LABEL: 'Kezdés:',
    NOT_GIVEN: 'Nem adott',
    PRESENT: 'Jelen',
    ABSENT: 'Távol',
  },
  el: {
    MINUTES_OF_A_MEETING_OF: 'ΠΡΑΚΤΙΚΑ ΣΥΝΕΔΡΙΑΣΗΣ ΤΟΥ',
    HELD_AT: 'ΠΟΥ ΠΡΑΓΜΑΤΟΠΟΙΗΘΗΚΕ ΣΤΟ',
    ON_TEXT: 'ΣΤΙΣ',
    START_LABEL: 'Έναρξη:',
    NOT_GIVEN: 'Δεν δόθηκε',
    PRESENT: 'Παρόν',
    ABSENT: 'Απών',
  },
  tr: {
    MINUTES_OF_A_MEETING_OF: 'TOPLANTI TUTANAĞI',
    HELD_AT: 'DÜZENLENEN',
    ON_TEXT: 'TARİHİNDE',
    START_LABEL: 'Başlangıç:',
    NOT_GIVEN: 'Verilmedi',
    PRESENT: 'Mevcut',
    ABSENT: 'Yok',
  },
  ru: {
    MINUTES_OF_A_MEETING_OF: 'ПРОТОКОЛ ЗАСЕДАНИЯ',
    HELD_AT: 'ПРОВЕДЕННОГО В',
    ON_TEXT: 'В',
    START_LABEL: 'Начало:',
    NOT_GIVEN: 'Не указано',
    PRESENT: 'Присутствует',
    ABSENT: 'Отсутствует',
  },
  uk: {
    MINUTES_OF_A_MEETING_OF: 'ПРОТОКОЛ ЗАСІДАННЯ',
    HELD_AT: 'ПРОВЕДЕНОГО В',
    ON_TEXT: 'В',
    START_LABEL: 'Початок:',
    NOT_GIVEN: 'Не вказано',
    PRESENT: 'Присутній',
    ABSENT: 'Відсутній',
  },
  he: {
    MINUTES_OF_A_MEETING_OF: 'פרוטוקול של ישיבה של',
    HELD_AT: 'שנערך ב',
    ON_TEXT: 'ב',
    START_LABEL: 'התחלה:',
    NOT_GIVEN: 'לא ניתן',
    PRESENT: 'נוכח',
    ABSENT: 'נעדר',
  },
  ar: {
    MINUTES_OF_A_MEETING_OF: 'محضر اجتماع',
    HELD_AT: 'عُقد في',
    ON_TEXT: 'في',
    START_LABEL: 'البداية:',
    NOT_GIVEN: 'غير محدد',
    PRESENT: 'حاضر',
    ABSENT: 'غائب',
  },
  fa: {
    MINUTES_OF_A_MEETING_OF: 'صورت‌جلسه جلسه',
    HELD_AT: 'برگزار شده در',
    ON_TEXT: 'در',
    START_LABEL: 'شروع:',
    NOT_GIVEN: 'مشخص نشده',
    PRESENT: 'حاضر',
    ABSENT: 'غایب',
  },
  hi: {
    MINUTES_OF_A_MEETING_OF: 'बैठक का कार्यवृत्त',
    HELD_AT: 'में आयोजित',
    ON_TEXT: 'को',
    START_LABEL: 'प्रारंभ:',
    NOT_GIVEN: 'नहीं दिया गया',
    PRESENT: 'उपस्थित',
    ABSENT: 'अनुपस्थित',
  },
  bn: {
    MINUTES_OF_A_MEETING_OF: 'বৈঠকের কার্যবিবরণী',
    HELD_AT: 'অনুষ্ঠিত',
    ON_TEXT: 'তারিখে',
    START_LABEL: 'শুরু:',
    NOT_GIVEN: 'দেওয়া হয়নি',
    PRESENT: 'উপস্থিত',
    ABSENT: 'অনুপস্থিত',
  },
  ur: {
    MINUTES_OF_A_MEETING_OF: 'اجلاس کا ایجنڈا',
    HELD_AT: 'منعقدہ',
    ON_TEXT: 'بروز',
    START_LABEL: 'آغاز:',
    NOT_GIVEN: 'نہیں دیا گیا',
    PRESENT: 'موجود',
    ABSENT: 'غیر موجود',
  },
  ta: {
    MINUTES_OF_A_MEETING_OF: 'கூட்டத்தின் நிமிடங்கள்',
    HELD_AT: 'நடைபெற்ற இடத்தில்',
    ON_TEXT: 'அன்று',
    START_LABEL: 'தொடக்கம்:',
    NOT_GIVEN: 'கொடுக்கப்படவில்லை',
    PRESENT: 'இருப்பவர்',
    ABSENT: 'இல்லாதவர்',
  },
  te: {
    MINUTES_OF_A_MEETING_OF: 'సమావేశం యొక్క నిమిషాలు',
    HELD_AT: 'జరిగిన స్థలంలో',
    ON_TEXT: 'న',
    START_LABEL: 'ప్రారంభం:',
    NOT_GIVEN: 'ఇవ్వలేదు',
    PRESENT: 'హాజరైనవారు',
    ABSENT: 'గైర్హాజరైనవారు',
  },
  ml: {
    MINUTES_OF_A_MEETING_OF: 'യോഗത്തിന്റെ മിനിറ്റുകൾ',
    HELD_AT: 'നടന്ന സ്ഥലത്ത്',
    ON_TEXT: 'ന്',
    START_LABEL: 'തുടക്കം:',
    NOT_GIVEN: 'നൽകിയിട്ടില്ല',
    PRESENT: 'ഹാജരായവർ',
    ABSENT: 'ഹാജരാകാത്തവർ',
  },
  kn: {
    MINUTES_OF_A_MEETING_OF: 'ಸಭೆಯ ನಿಮಿಷಗಳು',
    HELD_AT: 'ನಡೆದ ಸ್ಥಳದಲ್ಲಿ',
    ON_TEXT: 'ದಿನಾಂಕ',
    START_LABEL: 'ಪ್ರಾರಂಭ:',
    NOT_GIVEN: 'ನೀಡಲಾಗಿಲ್ಲ',
    PRESENT: 'ಹಾಜರಿದ್ದವರು',
    ABSENT: 'ಗೈರಾಗಿದ್ದವರು',
  },
  mr: {
    MINUTES_OF_A_MEETING_OF: 'सभेचे कार्यवृत्त',
    HELD_AT: 'येथे आयोजित',
    ON_TEXT: 'ला',
    START_LABEL: 'सुरू:',
    NOT_GIVEN: 'दिलेले नाही',
    PRESENT: 'उपस्थित',
    ABSENT: 'गैरहजर',
  },
  pa: {
    MINUTES_OF_A_MEETING_OF: 'ਮੀਟਿੰਗ ਦਾ ਵੇਰਵਾ',
    HELD_AT: 'ਵਿਖੇ ਆਯੋਜਿਤ',
    ON_TEXT: 'ਨੂੰ',
    START_LABEL: 'ਸ਼ੁਰੂ:',
    NOT_GIVEN: 'ਦਿੱਤਾ ਨਹੀਂ',
    PRESENT: 'ਮੌਜੂਦ',
    ABSENT: 'ਗੈਰਹਾਜ਼ਰ',
  },
  gu: {
    MINUTES_OF_A_MEETING_OF: 'બેઠકનું કાર્યવૃત્ત',
    HELD_AT: 'ખાતે યોજાયેલ',
    ON_TEXT: 'ના રોજ',
    START_LABEL: 'શરૂઆત:',
    NOT_GIVEN: 'આપેલ નથી',
    PRESENT: 'હાજર',
    ABSENT: 'ગેરહાજર',
  },
  zh: {
    MINUTES_OF_A_MEETING_OF: '会议记录',
    HELD_AT: '在...举行',
    ON_TEXT: '于',
    START_LABEL: '开始：',
    NOT_GIVEN: '未提供',
    PRESENT: '出席',
    ABSENT: '缺席',
  },
  'zh-TW': {
    MINUTES_OF_A_MEETING_OF: '會議記錄',
    HELD_AT: '在...舉行',
    ON_TEXT: '於',
    START_LABEL: '開始：',
    NOT_GIVEN: '未提供',
    PRESENT: '出席',
    ABSENT: '缺席',
  },
  ja: {
    MINUTES_OF_A_MEETING_OF: '会議の議事録',
    HELD_AT: 'で開催された',
    ON_TEXT: 'に',
    START_LABEL: '開始：',
    NOT_GIVEN: '提供されていません',
    PRESENT: '出席',
    ABSENT: '欠席',
  },
  ko: {
    MINUTES_OF_A_MEETING_OF: '회의록',
    HELD_AT: '에서 개최된',
    ON_TEXT: '에',
    START_LABEL: '시작:',
    NOT_GIVEN: '제공되지 않음',
    PRESENT: '참석',
    ABSENT: '불참',
  },
  th: {
    MINUTES_OF_A_MEETING_OF: 'รายงานการประชุมของ',
    HELD_AT: 'จัดขึ้นที่',
    ON_TEXT: 'เมื่อ',
    START_LABEL: 'เริ่ม:',
    NOT_GIVEN: 'ไม่ได้ระบุ',
    PRESENT: 'เข้าร่วม',
    ABSENT: 'ไม่เข้าร่วม',
  },
  vi: {
    MINUTES_OF_A_MEETING_OF: 'BIÊN BẢN CUỘC HỌP CỦA',
    HELD_AT: 'TỔ CHỨC TẠI',
    ON_TEXT: 'VÀO',
    START_LABEL: 'Bắt đầu:',
    NOT_GIVEN: 'Không được cung cấp',
    PRESENT: 'Có mặt',
    ABSENT: 'Vắng mặt',
  },
  id: {
    MINUTES_OF_A_MEETING_OF: 'NOTULEN RAPAT',
    HELD_AT: 'DISELENGGARAKAN DI',
    ON_TEXT: 'PADA',
    START_LABEL: 'Mulai:',
    NOT_GIVEN: 'Tidak diberikan',
    PRESENT: 'Hadir',
    ABSENT: 'Tidak hadir',
  },
  ms: {
    MINUTES_OF_A_MEETING_OF: 'MINIT MESYUARAT',
    HELD_AT: 'DIADAKAN DI',
    ON_TEXT: 'PADA',
    START_LABEL: 'Mula:',
    NOT_GIVEN: 'Tidak diberikan',
    PRESENT: 'Hadir',
    ABSENT: 'Tidak hadir',
  },
  fil: {
    MINUTES_OF_A_MEETING_OF: 'MGA MINUTO NG PULONG NG',
    HELD_AT: 'GINANAP SA',
    ON_TEXT: 'NOONG',
    START_LABEL: 'Simula:',
    NOT_GIVEN: 'Hindi ibinigay',
    PRESENT: 'Naroroon',
    ABSENT: 'Wala',
  },
  sw: {
    MINUTES_OF_A_MEETING_OF: 'KUMBUKUMBU ZA MKUTANO WA',
    HELD_AT: 'ULIOFANYIKA',
    ON_TEXT: 'TAREHE',
    START_LABEL: 'Anza:',
    NOT_GIVEN: 'Haijapewa',
    PRESENT: 'Waliokuwepo',
    ABSENT: 'Wasiokuwepo',
  },
  zu: {
    MINUTES_OF_A_MEETING_OF: 'IMIZUZU YOMHLANGANO WE',
    HELD_AT: 'OBANJWE',
    ON_TEXT: 'NGOMHLA',
    START_LABEL: 'Qala:',
    NOT_GIVEN: 'Ayunikiwe',
    PRESENT: 'Okhona',
    ABSENT: 'Ongekho',
  },
  am: {
    MINUTES_OF_A_MEETING_OF: 'የተገናኙበት መዝገብ',
    HELD_AT: 'ተካሂዷል በ',
    ON_TEXT: 'በ',
    START_LABEL: 'መጀመሪያ:',
    NOT_GIVEN: 'አልተሰጠም',
    PRESENT: 'ተገኝቷል',
    ABSENT: 'አልተገኘም',
  },
  so: {
    MINUTES_OF_A_MEETING_OF: 'SHIRARKA SHIRKA EE',
    HELD_AT: 'LAGU QABTAY',
    ON_TEXT: 'ON',
    START_LABEL: 'Bilow:',
    NOT_GIVEN: 'Lama bixin',
    PRESENT: 'Jooga',
    ABSENT: 'Maqan',
  },
  my: {
    MINUTES_OF_A_MEETING_OF: 'အစည်းအဝေးမှတ်တမ်း',
    HELD_AT: 'တွင်ကျင်းပခဲ့သည်',
    ON_TEXT: 'တွင်',
    START_LABEL: 'စတင်ချိန်:',
    NOT_GIVEN: 'မပေးထားပါ',
    PRESENT: 'တက်ရောက်သူ',
    ABSENT: 'မတက်ရောက်သူ',
  },
  kk: {
    MINUTES_OF_A_MEETING_OF: 'ЖИЫННЫҢ ХАТТАМАСЫ',
    HELD_AT: 'ОРЫНДАЛҒАН',
    ON_TEXT: 'КЕЗІНДЕ',
    START_LABEL: 'Басталуы:',
    NOT_GIVEN: 'Берілмеген',
    PRESENT: 'Қатысқан',
    ABSENT: 'Қатыспаған',
  },
  mn: {
    MINUTES_OF_A_MEETING_OF: 'ХУРЛЫН ТЭМДЭГЛЭЛ',
    HELD_AT: 'БОЛСОН ГАЗАР',
    ON_TEXT: 'ОНД',
    START_LABEL: 'Эхлэх:',
    NOT_GIVEN: 'Өгөгдөөгүй',
    PRESENT: 'Ирсэн',
    ABSENT: 'Ирээгүй',
  },
  ka: {
    MINUTES_OF_A_MEETING_OF: 'შეხვედრის ოქმი',
    HELD_AT: 'გამართული',
    ON_TEXT: 'თარიღი',
    START_LABEL: 'დაწყება:',
    NOT_GIVEN: 'არ არის მითითებული',
    PRESENT: 'დამსწრე',
    ABSENT: 'არმყოფი',
  },
  hy: {
    MINUTES_OF_A_MEETING_OF: 'ՀԱՆԴԻՊՄԱՆ ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ',
    HELD_AT: 'ԱՆՑԿԱՑՎԱԾ Է',
    ON_TEXT: 'ԱՄՍԱԹՎԻՆ',
    START_LABEL: 'Սկիզբ:',
    NOT_GIVEN: 'Չի տրամադրվել',
    PRESENT: 'Ներկա',
    ABSENT: 'Բացակա',
  },
} as const;

export function getTranslations(
  lang: LanguageCode | string = 'en',
): Terminology {
  return (TRANSLATIONS as Record<string, Terminology>)[lang] ?? TRANSLATIONS.en;
}
