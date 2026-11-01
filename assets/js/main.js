/* ═══════════════════════════════════════════════════════════
   رامین جلادت — دفتر زبان · نسخه‌ی سینمایی
   جاوااسکریپت دست‌نویس؛ بدون هیچ کتابخانه‌ای
   پرده‌ی ورود، نشانگر دوحلقه‌ای، واژه‌های شبح، عکس شناور…
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ═══ دیکشنری دوزبانه ═══ */
  var I18N = {
    fa: {
      dir: 'rtl',
      title: 'رامین جلادت | دپارتمانت زبان مجموعه مدارس سلام',
      skip: 'پرش به محتوای اصلی',
      brand: 'ر.ج', fullname: 'رامین جلادت',
      nav: { about: 'درباره', path: 'مسیر حرفه‌ای', skills: 'تخصص‌ها', programs: 'برنامه‌ها', voices: 'حرف‌های شاگردها', faq: 'پرسش‌ها', contact: 'تماس' },
      loader: { sub: 'دپارتمانت زبان انگلیسی · مجموعه مدارس سلام' },
      hero: {
        kicker: 'دپارتمانت زبان انگلیسی · مجموعه مدارس سلام',
        name1: 'رامین', name2: 'جلادت',
        roles: ['مدیر دپارتمانت زبان', 'معلم زبان انگلیسی', 'طراح دوره و مربی معلمان'],
        desc: 'از سال ۱۳۸۵، هم در کلاس و هم در اتاق معلمان؛ یادگیری انگلیسی را از یک درس خشک به تجربه‌ای زنده تبدیل می‌کنم — از نخستین «Hello» تا لحظه‌ای که زبان‌آموز بی‌آنکه به قاعده فکر کند، حرف می‌زند.',
        cta1: 'هماهنگی کلاس', cta2: 'بیشتر بدانید',
        deckHint: 'هر کلیک، یک واژه‌ی تازه',
        deckPosN: 'اسم', deckPosAdj: 'صفت',
        note: 'هر روز، فقط یک واژه — قولِ معلم.',
        scroll: 'پایین‌تر، ادامه‌ی دفتر'
      },
      stats: { s1: 'سال تجربه مدیریت و تدریس', s2: 'سطح تدریس، از مبتدی تا پیشرفته', s3: 'زبان‌آموز در این مسیر', s4: 'برنامه‌ی آموزشی، از کودک تا مربیگری' },
      about: {
        num: 'فصل ۰۱', label: 'درباره‌ام',
        heading: 'زبان برای من درس نیست؛ راهِ حرف زدن با دنیاست.',
        p1: 'من رامین جلادت هستم؛ معلم زبان انگلیسی و مدیر دپارتمانت زبان مجموعه مدارس سلام. سال‌هاست در این مجموعه، کنار همکاران و زبان‌آموزان، ساختاری ساخته‌ایم که یادگیری زبان را از پایه‌های اول تا دوره بزرگسالان، پیوسته و هدفمند پیش می‌برد.',
        p2: 'باور دارم کلاس زبان خوب جایی است که زبان‌آموز جرئت می‌کند حرف بزند، اشتباه کند و دوباره امتحان کند. نقش من همین است: ساختن و نگه‌داشتن این فضا — برای زبان‌آموزان و برای معلمانی که با آن‌ها کار می‌کنم.',
        note: 'کلاس، جایی است که اشتباه کردن مجاز است.',
        capT: 'اتاق درس، ساعت طلایی',
        capD: 'جایی که هر «Hello» یک شروع است'
      },
      path: {
        num: 'فصل ۰۲', label: 'مسیر حرفه‌ای',
        t1: { year: '۱۳۸۵', title: 'آغاز تدریس', text: 'شروع تدریس انگلیسی در آموزشگاه‌ها و مدارس؛ از همان ابتدا باور داشتم زبان باید در کلاس «استفاده» شود، نه فقط «تدریس».' },
        t2: { year: '۱۳۹۰', title: 'پیوستن به مدارس سلام', text: 'همکاری با مجموعه مدارس سلام و آغاز ساخت برنامه یکپارچه زبان انگلیسی برای مقاطع مختلف تحصیلی.' },
        t3: { year: '۱۳۹۶', title: 'مدیریت دپارتمانت زبان', text: 'رهبری تیم معلمان، طراحی سرفصل‌ها و آزمون‌های جایگاه‌یابی، و نظارت بر کیفیت آموزش در همه سطوح.' },
        t4: { year: 'امروز', title: 'تدریس، رهبری، پرورش مربی', text: 'ادامه همین مسیر؛ کنار کلاس‌هایی که هنوز هر هفته تدریس می‌کنم و معلمان تازه‌ای که هر سال به تیم اضافه می‌شوند.' },
        note: 'همین سال‌ها بود که تقویم آموزشی و آزمون سطح‌سنجی یکپارچه متولد شد.'
      },
      skills: {
        num: 'فصل ۰۳', label: 'تخصص‌ها',
        k1: { title: 'مدیریت دپارتمانت زبان', text: 'برنامه‌ریزی ترم، چینش سطح‌ها، ارزیابی معلمان و تضمین کیفیت کلاس‌ها؛ از انتخاب کتاب درسی تا تقویم آموزشی سال.' },
        k2: { title: 'تدریس انگلیسی در همه سطوح', text: 'از مبتدی مطلق تا پیشرفته؛ با تمرکز بر مکالمه واقعی، واژگان کاربردی و همان اعتمادبه‌نفسی که زبان‌آموز را به حرف زدن می‌رساند.' },
        k3: { title: 'طراحی دوره و محتوا', text: 'ساخت سرفصل، آزمون‌های سطح‌سنجی و منابع تکمیلی، متناسب با سن و هدف هر گروه از زبان‌آموزان.' },
        k4: { title: 'کارگاه و مربیگری معلمان', text: 'کارگاه‌های روش تدریس، مشاهده کلاس و بازخورد حرفه‌ای؛ چون کیفیت هر کلاس به کیفیت مربی آن است.' }
      },
      programs: {
        num: 'فصل ۰۴', label: 'برنامه‌های آموزشی',
        p1: { title: 'کودکان', meta: '۶ تا ۱۲ سال', desc: 'یادگیری با بازی، قصه و آهنگ؛ پایه‌ریزی تلفظ درست و اعتمادبه‌نفس، بی‌آنکه بچه فکر کند «درس» دارد.' },
        p2: { title: 'نوجوانان', meta: '۱۳ تا ۱۷ سال', desc: 'تقویت چهار مهارت برای مدرسه و آینده؛ همراه با آمادگی آزمون‌های درون‌مدرسه‌ای و بین‌المللی.' },
        p3: { title: 'بزرگسالان', meta: 'از مبتدی مطلق تا پیشرفته', desc: 'برنامه‌ی شخصی بر اساس هدف هر نفر؛ برای کار، مهاجرت یا لذتِ فهمیدن فیلم بدون زیرنویس.' },
        p4: { title: 'باشگاه مکالمه', meta: 'هر هفته · گروه‌های کوچک', desc: 'درباره‌ی موضوعات واقعی حرف می‌زنیم؛ از خبر هفته تا یک بحث ساده — زبان همین‌جا «زنده» می‌شود.' },
        p5: { title: 'آمادگی آیلتس و توفل', meta: 'آزمون بین‌المللی', desc: 'استراتژی هر بخش، تمرین هدفمند، ماک‌آزمون منظم و بازخورد دقیق — نه شگردِ شب‌امتحانی، بلکه آمادگی واقعی.' },
        p6: { title: 'کارگاه معلمان', meta: 'ویژه همکاران', desc: 'روش تدریس، مدیریت کلاس و بازخورد حرفه‌ای؛ چون کیفیت هر کلاس به کیفیت مربی آن است.', chip: 'حضوری و آنلاین' },
        note: '* سطح‌بندی بر اساس چارچوب مشترک اروپا (CEFR) است. قبل از شروع، یک آزمون سطح‌سنجی کوتاه می‌گیریم تا کلاس دقیقاً در سطحِ خودت باشد.'
      },
      quote: { t1: 'زبان را حفظ نکنید؛ با آن', t2: 'زندگی', t3: 'کنید.', cite: '— رامین جلادت' },
      voices: {
        num: 'فصل ۰۵', label: 'حرف‌های شاگردها',
        q1: { text: '«اولش فقط حفظ می‌کردم؛ بعد از سه ماه فهمیدم دارم فکر کردن به انگلیسی یاد می‌گیرم. حالا توی جلسه‌ها خودم جلو می‌افتم و حرف می‌زنم.»', who: 'سارا م.', tag: 'دوره بزرگسالان' },
        q2: { text: '«پسرم از کلاس انگلیسی فراری بود؛ الان خودش می‌شمارد که شنبه چند روز مونده.»', who: 'خانم رضایی', tag: 'مادرِ یکی از زبان‌آموزان کودک' },
        q3: { text: '«کارگاه‌های آقای جلادت برای ما معلم‌ها بیشتر شبیه اتاق فکر است تا کلاس؛ هر بار با یک ابزار تازه بیرون می‌آییم.»', who: 'نگار ک.', tag: 'همکار و معلم زبان' },
        q4: { text: '«برای آیلتس دو بار نتیجه نگرفته بودم؛ بار سوم با برنامه‌ی درست و بازخورد دقیق، نمره‌ام به هدفم رسید.»', who: 'امیرحسین ط.', tag: 'دوره آمادگی آیلتس' }
      },
      faq: {
        num: 'فصل ۰۶', label: 'پرسش‌های پرتکرار',
        f1: { q: 'چطور سطح من مشخص می‌شود؟', a: 'با یک آزمون سطح‌سنجی کوتاه: چند سؤال نوشتاری به‌اضافه‌ی یک مصاحبه‌ی ده‌دقیقه‌ای. نتیجه و مسیر پیشنهادی همان روز اعلام می‌شود.' },
        f2: { q: 'کلاس‌ها حضوری هستند یا آنلاین؟', a: 'هر دو. کلاس‌های کودک و نوجوان حضوری در مجموعه مدارس سلام برگزار می‌شوند؛ برای بزرگسالان و دوره‌ی مکالمه، امکان آنلاین هم هست.' },
        f3: { q: 'هر کلاس چند نفر است؟', a: 'بین ۸ تا ۱۴ نفر. هرچه گروه کوچک‌تر باشد، هر نفر بیشتر حرف می‌زند — و این دقیقاً همان چیزی است که می‌خواهیم.' },
        f4: { q: 'یک دوره چقدر طول می‌کشد؟', a: 'هر ترم حدوداً سه‌ماهه است؛ اما مسیر هر زبان‌آموز بر اساس هدفش تنظیم می‌شود، نه بر اساس یک جدول ثابت.' },
        f5: { q: 'گواهی پایان دوره می‌دهید؟', a: 'بله؛ در پایان هر ترم گزارش پیشرفت فردی و گواهی مجموعه صادر می‌شود — به‌اضافه‌ی توصیه‌ی مشخص برای قدم بعدی.' }
      },
      contact: {
        num: 'فصل ۰۷', label: 'تماس',
        title: 'بیایید صحبت کنیم.',
        desc: 'برای هماهنگی کلاس، مشاوره‌ی سطح‌سنجی یا هر همکاری آموزشی، پیام بدهید؛ معمولاً همان روز یا صبح روز بعد پاسخ می‌دهم.',
        email: 'ایمیل', tg: 'تلگرام',
        hours: 'ساعت پاسخ‌گویی', hoursVal: 'شنبه تا چهارشنبه · ۸ تا ۱۴',
        toast: 'برنامه ایمیل برای ارسال پیام باز می‌شود؛ اگر باز نشد، آدرس را مستقیم وارد کنید.'
      },
      form: { name: 'نام شما', namePh: 'مثلاً: سارا محمدی', msg: 'پیام شما', msgPh: 'سلام آقای جلادت، برای سطح‌سنجی و شروع کلاس می‌خواستم…', send: 'ارسال پیام' },
      footer: { tag: 'دپارتمانت زبان · مجموعه مدارس سلام', copy: '© رامین جلادت', made: 'این صفحه با قلم و کاغذ طراحی شد — بدون قالب آماده.' },
      marquee: [
        ['Curiosity', 'کنجکاوی'], ['Practice', 'تمرین'], ['Confidence', 'اعتمادبه‌نفس'],
        ['Mistakes', 'اشتباه‌ها'], ['Fluency', 'روانی'], ['Patience', 'صبر'],
        ['Speak', 'حرف زدن'], ['Read', 'خواندن'], ['Listen', 'شنیدن'], ['Repeat', 'تکرار']
      ]
    },
    en: {
      dir: 'ltr',
      title: 'Ramin Jelladat | Language Department, Salam Schools',
      skip: 'Skip to main content',
      brand: 'RJ', fullname: 'Ramin Jelladat',
      nav: { about: 'About', path: 'Career', skills: 'Expertise', programs: 'Programmes', voices: 'Student Voices', faq: 'FAQ', contact: 'Contact' },
      loader: { sub: 'English Language Department · Salam Schools' },
      hero: {
        kicker: 'English Language Department · Salam Schools',
        name1: 'Ramin', name2: 'Jelladat',
        roles: ['Head of Language Department', 'English Language Teacher', 'Curriculum Designer & Teacher Trainer'],
        desc: 'Since 2006 — in the classroom and in the teachers\u2019 room — I have turned English learning into a living experience: from the first \u201CHello\u201D to the moment a learner speaks without thinking about rules.',
        cta1: 'Book a Class', cta2: 'Learn More',
        deckHint: 'One click, one new word',
        deckPosN: 'noun', deckPosAdj: 'adjective',
        note: 'One word a day — teacher\u2019s promise.',
        scroll: 'Scroll — the notebook continues'
      },
      stats: { s1: 'Years of leadership & teaching', s2: 'Levels taught, beginner to advanced', s3: 'Learners along the way', s4: 'Programmes, from kids to teacher training' },
      about: {
        num: 'Ch. 01', label: 'About Me',
        heading: 'Language was never just a subject to me — it is a way of talking to the world.',
        p1: 'I am Ramin Jelladat — English teacher and Head of the Language Department at Salam Schools. Over the years, together with colleagues and learners, we have built a system where English learning flows continuously from the early grades all the way to adult programmes.',
        p2: 'I believe a good language class is a place where students dare to speak, make mistakes and try again. My role is exactly that: to build — and protect — this space, for learners and for the teachers I work with.',
        note: 'A classroom is where mistakes are allowed.',
        capT: 'The golden-hour classroom',
        capD: 'Where every \u201CHello\u201D is a beginning'
      },
      path: {
        num: 'Ch. 02', label: 'Career Path',
        t1: { year: '2006', title: 'Where It Began', text: 'Started teaching English at institutes and schools; convinced from day one that language should be used in class, not merely taught.' },
        t2: { year: '2011', title: 'Joining Salam Schools', text: 'Joined Salam Schools and began building a unified English programme across grade levels.' },
        t3: { year: '2017', title: 'Head of Language Department', text: 'Leading the teaching team, designing syllabi and placement tests, and safeguarding teaching quality at every level.' },
        t4: { year: 'Today', title: 'Teaching, Leading, Mentoring', text: 'The journey continues — beside the classes I still teach every week and the new teachers who join the team every year.' },
        note: 'These were the years our unified academic calendar and placement test were born.'
      },
      skills: {
        num: 'Ch. 03', label: 'Expertise',
        k1: { title: 'Leading the Language Department', text: 'Term planning, level placement, teacher evaluation and class quality assurance — from coursebook selection to the academic calendar.' },
        k2: { title: 'Teaching All Levels', text: 'From absolute beginners to advanced learners; focused on real conversation, practical vocabulary and the confidence it takes to speak.' },
        k3: { title: 'Curriculum & Content Design', text: 'Building syllabi, placement tests and supplementary materials tailored to each group\u2019s age and goals.' },
        k4: { title: 'Workshops & Teacher Training', text: 'Method workshops, classroom observation and professional feedback — because every class is only as good as its teacher.' }
      },
      programs: {
        num: 'Ch. 04', label: 'Programmes',
        p1: { title: 'Kids', meta: 'Ages 6\u201312', desc: 'Learning through play, stories and songs; building clear pronunciation and confidence \u2014 without feeling like \u201Cschool\u201D.' },
        p2: { title: 'Teens', meta: 'Ages 13\u201317', desc: 'Strengthening all four skills for school and the future; plus preparation for school and international exams.' },
        p3: { title: 'Adults', meta: 'Absolute beginner to advanced', desc: 'A personal plan built around each learner\u2019s goal \u2014 for work, for migration, or for the joy of watching films without subtitles.' },
        p4: { title: 'Conversation Club', meta: 'Weekly · small groups', desc: 'We talk about real things \u2014 from the week\u2019s news to a friendly debate. This is where language comes alive.' },
        p5: { title: 'IELTS / TOEFL Preparation', meta: 'International exams', desc: 'Section strategies, focused practice, regular mock tests and precise feedback \u2014 real readiness, not exam-night tricks.' },
        p6: { title: 'Teacher Training', meta: 'For fellow teachers', desc: 'Teaching methods, classroom management and professional feedback \u2014 because every class is only as good as its teacher.', chip: 'In-person & online' },
        note: '* Levels follow the CEFR framework. Before we begin, a short placement test makes sure your class is exactly at your level.'
      },
      quote: { t1: 'Don\u2019t memorise a language \u2014', t2: 'live', t3: 'it.', cite: '\u2014 Ramin Jelladat' },
      voices: {
        num: 'Ch. 05', label: 'Student Voices',
        q1: { text: '\u201CAt first I only memorised; after three months I realised I was learning to think in English. Now I speak up first in meetings.\u201D', who: 'Sara M.', tag: 'Adult programme' },
        q2: { text: '\u201CMy son used to run away from English class; now he counts the days until Saturday.\u201D', who: 'Mrs. Rezaei', tag: 'Parent of a young learner' },
        q3: { text: '\u201CHis workshops feel more like a think-tank than a class for us teachers; we always leave with a new tool.\u201D', who: 'Negar K.', tag: 'Colleague & English teacher' },
        q4: { text: '\u201CI had taken IELTS twice without results; the third time, with the right plan and precise feedback, I hit my target.\u201D', who: 'Amirhossein T.', tag: 'IELTS preparation' }
      },
      faq: {
        num: 'Ch. 06', label: 'FAQ',
        f1: { q: 'How is my level determined?', a: 'Through a short placement test: a few written questions plus a ten-minute interview. Results and a suggested path are announced the same day.' },
        f2: { q: 'Are classes in person or online?', a: 'Both. Kids\u2019 and teens\u2019 classes are held in person at Salam Schools; adults and the conversation club can also join online.' },
        f3: { q: 'How many students are in a class?', a: 'Between 8 and 14. The smaller the group, the more each person speaks \u2014 and that is exactly the point.' },
        f4: { q: 'How long is a course?', a: 'Each term runs about three months; but every learner\u2019s path is planned around their goal, not a fixed table.' },
        f5: { q: 'Do you provide certificates?', a: 'Yes; at the end of each term you receive a personal progress report and a school certificate \u2014 plus a clear recommendation for the next step.' }
      },
      contact: {
        num: 'Ch. 07', label: 'Contact',
        title: 'Let\u2019s talk.',
        desc: 'For class arrangements, placement counselling or any educational collaboration \u2014 send a message; I usually reply the same day or the next morning.',
        email: 'Email', tg: 'Telegram',
        hours: 'Reply hours', hoursVal: 'Sat\u2013Wed · 8 am\u20132 pm',
        toast: 'Your email app is opening to send the message; if it doesn\u2019t, please use the address directly.'
      },
      form: { name: 'Your Name', namePh: 'e.g. Sara Mohammadi', msg: 'Your Message', msgPh: 'Hello Mr. Jelladat, I would like to take a placement test and start classes\u2026', send: 'Send Message' },
      footer: { tag: 'Language Department · Salam Schools', copy: '\u00A9 Ramin Jelladat', made: 'Designed with pen and paper \u2014 no pre-made template.' },
      marquee: [
        ['Curiosity', 'کنجکاوی'], ['Practice', 'تمرین'], ['Confidence', 'اعتمادبه‌نفس'],
        ['Mistakes', 'اشتباه‌ها'], ['Fluency', 'روانی'], ['Patience', 'صبر'],
        ['Speak', 'حرف زدن'], ['Read', 'خواندن'], ['Listen', 'شنیدن'], ['Repeat', 'تکرار']
      ]
    }
  };

  /* ═══ واژه‌نامه‌ی کارت‌ها ═══ */
  var WORDS = [
    { en: 'Serendipity', ipa: '/ˌserənˈdɪpəti/', pos: 'n', fa: 'اتفاق خوشایندی که بی‌خبر سراغت می‌آید', ex: 'مثل پیدا کردن کتابی که دنبالش نبودی.' },
    { en: 'Petrichor', ipa: '/ˈpetrɪkɔːr/', pos: 'n', fa: 'بوی خاک، بعد از اولین باران', ex: 'کلمه‌ای که کمتر کسی می‌شناسد.' },
    { en: 'Eloquent', ipa: '/ˈeləkwənt/', pos: 'adj', fa: 'شیوا و سخنور', ex: 'کسی که با کلماتش نقاشی می‌کشد.' },
    { en: 'Ephemeral', ipa: '/ɪˈfemərəl/', pos: 'adj', fa: 'زودگذر', ex: 'مثل شکوفه‌های بهار؛ زیبا و کوتاه.' },
    { en: 'Resilience', ipa: '/rɪˈzɪliəns/', pos: 'n', fa: 'تاب‌آوری', ex: 'قدرتِ دوباره بلند شدن، بعد از زمین خوردن.' },
    { en: 'Wanderlust', ipa: '/ˈwɒndərlʌst/', pos: 'n', fa: 'عطشِ رفتن؛ هوای سفر داشتن', ex: 'وقتی چمدانت همیشه نیمه‌باز است.' },
    { en: 'Curiosity', ipa: '/ˌkjʊəriˈɒsəti/', pos: 'n', fa: 'کنجکاوی', ex: 'موتورِ تمام یادگیری‌های دنیا.' },
    { en: 'Grit', ipa: '/ɡrɪt/', pos: 'n', fa: 'پشتکارِ خام', ex: 'جایی که استعداد کم می‌آورد، این می‌برد.' },
    { en: 'Empathy', ipa: '/ˈempəθi/', pos: 'n', fa: 'همدلی', ex: 'زبانِ مشترک، حتی وقتی هیچ زبانی مشترک نیست.' },
    { en: 'Fluency', ipa: '/ˈfluːənsi/', pos: 'n', fa: 'روانیِ زبان', ex: 'وقتی دیگر به قاعده فکر نمی‌کنی.' }
  ];

  /* ═══ وضعیت ═══ */
  var lang = 'fa', theme = 'light', counted = false, currentSec = null;
  var typerTimer = null, toastTimer = null, deckTimer = null, wordIdx = 0;

  try {
    theme = localStorage.getItem('rj-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var savedLang = localStorage.getItem('rj-lang');
    if (savedLang && I18N[savedLang]) lang = savedLang;
  } catch (e) {}
  document.documentElement.dataset.theme = theme;

  var faD = function (v) { return String(v).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[+d]; }); };
  var fmtNum = function (n) { return lang === 'fa' ? faD(n) : Number(n).toLocaleString('en-US'); };
  var t = function (k) {
    return k.split('.').reduce(function (o, x) { return o == null ? o : o[x]; }, I18N[lang]);
  };

  /* ═══════════════════════════════════════════
     موتور واژه‌بندی — حرف برای لاتین، واژه برای فارسی
     ═══════════════════════════════════════════ */
  function splitElement(el, mode) {
    var counter = { n: 0 };
    function wrapText(node) {
      var frag = document.createDocumentFragment();
      var txt = node.textContent;
      if (mode === 'chars') {
        /* واژه‌ها را در پوسته‌ی بی‌شکست می‌پیچیم تا وسط کلمه نشکند */
        txt.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          var word = document.createElement('span');
          word.style.cssText = 'white-space:nowrap;display:inline-block';
          for (var i = 0; i < part.length; i++) {
            var s = document.createElement('span');
            s.className = 'ch';
            s.style.setProperty('--i', counter.n++);
            s.textContent = part[i];
            word.appendChild(s);
          }
          frag.appendChild(word);
        });
      } else {
        var parts = txt.split(/(\s+)/);
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          var s = document.createElement('span');
          s.className = 'ch';
          s.style.setProperty('--i', counter.n++);
          s.textContent = p;
          frag.appendChild(s);
        });
      }
      node.parentNode.replaceChild(frag, node);
    }
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) { if (n.textContent.trim()) wrapText(n); }
        else if (n.nodeType === 1 && n.tagName.toLowerCase() !== 'svg') walk(n);
      });
    }
    walk(el);
    el.dataset.split = mode;
  }
  function unsplitElement(el) {
    $$('.ch', el).forEach(function (s) {
      s.parentNode.replaceChild(document.createTextNode(s.textContent), s);
    });
    el.normalize();
    delete el.dataset.split;
  }
  function splitAll() {
    /* حروف فارسی/عربی به هم می‌چسبند؛ برای آن‌ها واژه‌بندی می‌کنیم نه حرف‌بندی */
    var arabicLetters = /[\u0600-\u06FF]/;
    var digits = /[\u06F0-\u06F9\u0660-\u0669\s\d]/g;
    $$('#kickerEn').forEach(function (el) { if (el.dataset.split !== 'chars') splitElement(el, 'chars'); });
    $$('.split-chars').forEach(function (el) {
      if (el.dataset.split) return;
      var mode = arabicLetters.test(el.textContent.replace(digits, '')) ? 'words' : 'chars';
      splitElement(el, mode);
    });
    $$('.split-words').forEach(function (el) { if (el.dataset.split !== 'words') splitElement(el, 'words'); });
  }
  function reSplit() {
    $$('#kickerEn, .split-chars, .split-words').forEach(unsplitElement);
    splitAll();
  }

  /* ═══ مارکی واژه‌ها ═══ */
  function renderMarquee() {
    var track = $('#marqueeTrack');
    if (!track) return;
    var html = I18N.fa.marquee.map(function (w) {
      return '<span class="mq"><span>' + w[0] + '</span><i>' + w[1] + '</i></span>';
    }).join('');
    track.innerHTML = html + html; /* دو نسخه برای حلقه‌ی بی‌درز */
  }

  /* ═══ تایپ‌رایتر نقش‌ها ═══ */
  function startTyper() {
    clearTimeout(typerTimer);
    var el = $('#typed');
    if (!el) return;
    if (reduceMotion) { el.textContent = t('hero.roles')[0]; return; }
    var roles = t('hero.roles');
    el.textContent = '';
    var ri = 0, ci = 0, del = false;
    var tick = function () {
      var w = roles[ri];
      if (!del) {
        ci++; el.textContent = w.slice(0, ci);
        if (ci === w.length) { del = true; typerTimer = setTimeout(tick, 2100); return; }
        typerTimer = setTimeout(tick, 72);
      } else {
        ci--; el.textContent = w.slice(0, ci);
        if (ci === 0) { del = false; ri = (ri + 1) % roles.length; typerTimer = setTimeout(tick, 420); return; }
        typerTimer = setTimeout(tick, 36);
      }
    };
    typerTimer = setTimeout(tick, 500);
  }

  /* ═══ کارت واژه ═══ */
  function showWord(idx) {
    var w = WORDS[idx];
    var posEl = $('#deckPos');
    $('#deckWord').textContent = w.en;
    $('#deckIpa').textContent = w.ipa;
    if (posEl) posEl.textContent = w.pos === 'adj' ? t('hero.deckPosAdj') : t('hero.deckPosN');
    $('#deckFa').textContent = w.fa;
    $('#deckEx').textContent = w.ex;
  }
  function nextWord() {
    var deck = $('#deck');
    if (reduceMotion) { wordIdx = (wordIdx + 1) % WORDS.length; showWord(wordIdx); return; }
    deck.classList.add('flipping');
    setTimeout(function () {
      wordIdx = (wordIdx + 1) % WORDS.length;
      showWord(wordIdx);
      deck.classList.remove('flipping');
    }, 500);
  }
  function initDeck() {
    showWord(wordIdx);
    var deck = $('#deck');
    deck.addEventListener('click', function () {
      nextWord();
      clearInterval(deckTimer);
      deckTimer = setInterval(nextWord, 8000);
    });
    if (!reduceMotion) deckTimer = setInterval(nextWord, 8000);
  }

  /* ═══ شمارنده‌های آمار ═══ */
  function setStat(el, n) {
    var plus = el.dataset.plus || '';
    el.innerHTML = fmtNum(n) + (plus ? '<span class="plus">' + plus + '</span>' : '');
  }
  function runCounters() {
    $$('.stat-num').forEach(function (el, i) {
      var target = +el.dataset.count;
      var t0 = performance.now(), dur = 1300 + i * 160;
      var step = function (now) {
        var p = Math.min(1, (now - t0) / dur);
        setStat(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      if (reduceMotion) { setStat(el, target); return; }
      requestAnimationFrame(step);
    });
    counted = true;
  }
  function renderStats() {
    $$('.stat-label').forEach(function (el, i) { el.textContent = t('stats.s' + (i + 1)); });
    $$('.stat-num').forEach(function (el) {
      var target = +el.dataset.count;
      if (counted) setStat(el, target); else el.textContent = fmtNum(0);
    });
  }

  /* ═══ سال فوتر (شمسی/میلادی) ═══ */
  function footerYear() {
    var now = new Date();
    var gy = now.getFullYear();
    var jy = gy - 621 - (now.getMonth() < 2 || (now.getMonth() === 2 && now.getDate() < 21) ? 1 : 0);
    var y = lang === 'fa' ? faD(jy) : String(gy);
    var copy = lang === 'fa' ? '© ' + y + ' رامین جلادت' : '© ' + y + ' Ramin Jelladat';
    var el = $('.footer-copy');
    if (el) el.textContent = copy;
  }

  /* ═══ اعمال زبان (با گذار محو) ═══ */
  function applyLang(withFade) {
    var run = function () {
      var L = I18N[lang];
      document.documentElement.lang = lang;
      document.documentElement.dir = L.dir;
      document.title = L.title;
      $$('[data-i18n]').forEach(function (el) {
        var v = t(el.dataset.i18n);
        if (typeof v === 'string') el.textContent = v;
      });
      $$('[data-i18n-ph]').forEach(function (el) {
        var v = t(el.dataset.i18nPh);
        if (typeof v === 'string') el.placeholder = v;
      });
      renderStats();
      footerYear();
      $$('.lang-switch button').forEach(function (b) { b.classList.toggle('on', b.dataset.lang === lang); });
      showWord(wordIdx);
      startTyper();
      reSplit();
      if (currentSec) setActiveNav(currentSec);
      try { localStorage.setItem('rj-lang', lang); } catch (e) {}
    };
    if (withFade && !reduceMotion) {
      document.body.classList.add('lang-fade');
      setTimeout(function () {
        run();
        requestAnimationFrame(function () { document.body.classList.remove('lang-fade'); });
      }, 220);
    } else run();
  }
  $$('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.dataset.lang;
      if (l === lang) return;
      lang = l;
      applyLang(true);
    });
  });

  /* ═══ تم ═══ */
  $('#themeToggle').addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('rj-theme', theme); } catch (e) {}
  });

  /* ═══ منوی موبایل ═══ */
  var menuBtn = $('#menuToggle'), mnav = $('#mobileNav');
  menuBtn.addEventListener('click', function () {
    var o = mnav.classList.toggle('open');
    menuBtn.classList.toggle('open', o);
    menuBtn.setAttribute('aria-expanded', String(o));
  });
  $$('#mobileNav a').forEach(function (a) {
    a.addEventListener('click', function () {
      mnav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* ═══ نشانگر دوحلقه‌ای ═══ */
  (function initCursor() {
    if (!finePointer || reduceMotion) return;
    var dot = $('#cursorDot'), ring = $('#cursorRing');
    var x = -100, y = -100, rx = -100, ry = -100, seen = false;
    document.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      if (!seen) { seen = true; rx = x; ry = y; document.documentElement.classList.add('has-cursor'); }
      dot.style.transform = 'translate3d(' + (x - 3) + 'px,' + (y - 3) + 'px,0)';
    }, { passive: true });
    document.addEventListener('mouseleave', function () { document.documentElement.classList.remove('has-cursor'); seen = false; });
    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      var half = ring.classList.contains('grow') ? 32 : 19;
      ring.style.transform = 'translate3d(' + (rx - half) + 'px,' + (ry - half) + 'px,0)';
      requestAnimationFrame(loop);
    })();
    var HOT = 'a,button,input,textarea,select,label,.deck,[role="button"]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(HOT)) ring.classList.add('grow');
    }, { passive: true });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(HOT)) ring.classList.remove('grow');
    }, { passive: true });
  })();

  /* ═══ اسکرول: پیشرفت + هدر + هیرو + خط زمان + شبح‌ها ═══ */
  var progressEl = $('#progress'), headerEl = $('#siteHeader');
  var heroEl = $('#hero'), heroSlot = $('.hero-slot'), heroPhoto = $('#heroPhoto');
  var timelineEl = $('#timeline'), tThread = $('#tThread');
  var ghosts = $$('.ghost-word').map(function (w) { return { el: w, sec: w.closest('section'), gx: parseFloat(w.dataset.gx || '3') }; });
  var ticking = false;

  function onFrame() {
    ticking = false;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    progressEl.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    headerEl.classList.toggle('scrolled', h.scrollTop > 24);

    if (!reduceMotion && heroSlot && heroEl) {
      var coverLen = Math.max(0, heroSlot.offsetHeight - window.innerHeight);
      var p = coverLen > 0 ? clamp(h.scrollTop / coverLen, 0, 1) : 0;
      if (h.scrollTop < heroSlot.offsetHeight * 1.2) {
        heroEl.style.setProperty('--p', p.toFixed(4));
        if (heroPhoto) heroPhoto.style.transform = 'translateY(' + (-p * 9).toFixed(3) + '%)';
      }
    }

    if (!reduceMotion && timelineEl && tThread) {
      var r = timelineEl.getBoundingClientRect();
      var tp = clamp((window.innerHeight * 0.72 - r.top) / r.height, 0, 1);
      tThread.style.setProperty('--tp', tp.toFixed(4));
    }

    if (!reduceMotion) {
      var vh = window.innerHeight;
      ghosts.forEach(function (g) {
        if (!g.sec) return;
        var r2 = g.sec.getBoundingClientRect();
        if (r2.bottom < -80 || r2.top > vh + 80) return;
        var c = clamp(((r2.top + r2.height / 2) - vh / 2) / vh, -1, 1);
        g.el.style.setProperty('--gxp', (c * g.gx).toFixed(3));
      });
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ═══ لینک فعال ناوبری ═══ */
  function setActiveNav(id) {
    currentSec = id;
    $$('.main-nav a').forEach(function (a) { a.classList.toggle('active', a.dataset.sec === id); });
  }
  var secIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) setActiveNav(e.target.id); });
  }, { rootMargin: '-35% 0px -60% 0px' });
  ['about', 'path', 'skills', 'programs', 'faq', 'contact'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) secIO.observe(el);
  });

  /* ═══ نمایش با اسکرول ═══ */
  var revealIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(function (el) { revealIO.observe(el); });

  /* ═══ واژه‌ها/حروف با blur-up ═══ */
  var splitIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); splitIO.unobserve(e.target); }
    });
  }, { threshold: 0.35 });
  $$('.split-chars, .split-words').forEach(function (el) { splitIO.observe(el); });

  /* ═══ دایره‌ی قرمز نقل‌قول ═══ */
  var quoteIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        var c = $('.circled', e.target);
        if (c) c.classList.add('drawn');
        quoteIO.disconnect();
      }
    });
  }, { threshold: 0.5 });
  var quoteEl = $('#quote');
  if (quoteEl) quoteIO.observe(quoteEl);

  /* ═══ شمارنده‌ها هنگام دیده‌شدن ═══ */
  var statsEl = $('#stats');
  if (statsEl) {
    var statIO = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; }) && !counted) {
        runCounters();
        statIO.disconnect();
      }
    }, { threshold: 0.35 });
    statIO.observe(statsEl);
  }

  /* ═══ عکس شناورِ برنامه‌ها ═══ */
  (function initFloatPhoto() {
    var fp = $('#floatPhoto'), img = $('#floatImg'), cap = $('#floatCap');
    var list = $('#progList');
    if (!fp || !list || !finePointer || reduceMotion) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, s = 0.8, ts = 0.8, active = false, raf = null;
    function loop() {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14; s += (ts - s) * 0.12;
      fp.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0) rotate(6deg) scale(' + s.toFixed(3) + ')';
      if (active || Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 || Math.abs(ts - s) > 0.005) {
        raf = requestAnimationFrame(loop);
      } else { raf = null; }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    $$('.p-row', list).forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        img.src = row.dataset.photo;
        var n = row.querySelector('.p-name');
        cap.textContent = n ? n.textContent.replace(/\s+/g, ' ').trim() : '';
        ts = 1; active = true;
        fp.classList.add('show');
        kick();
      });
    });
    list.addEventListener('mousemove', function (e) {
      var w = 236, hgt = 315;
      tx = clamp(e.clientX - w / 2, 8, window.innerWidth - w - 8);
      ty = clamp(e.clientY - hgt / 2, 8, window.innerHeight - hgt - 8);
      if (!cx && !cy) { cx = tx; cy = ty; }
      kick();
    }, { passive: true });
    list.addEventListener('mouseleave', function () {
      active = false; ts = 0.8;
      fp.classList.remove('show');
      kick();
    });
  })();

  /* ═══ آکاردئون (تخصص‌ها + پرسش‌ها) ═══ */
  function initAccordion(rootId, keepOpen) {
    var root = $('#' + rootId);
    if (!root) return;
    root.addEventListener('click', function (e) {
      var head = e.target.closest('.acc-head');
      if (!head) return;
      var item = head.closest('.acc-item');
      var wasOpen = item.classList.contains('open');
      if (!keepOpen) {
        $$('.acc-item', root).forEach(function (s) {
          s.classList.remove('open');
          $('.acc-head', s).setAttribute('aria-expanded', 'false');
        });
      }
      if (!wasOpen) {
        item.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  }
  initAccordion('skillList', false);
  initAccordion('faqList', true);

  /* ═══ اسلایدر حرف‌های شاگردها ═══ */
  var vp = $('#voicesViewport');
  if (vp) {
    var figures = $$('.voice', vp);
    var dotsBox = $('#voicesDots');
    figures.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'نقل‌قول ' + (i + 1));
      b.addEventListener('click', function () { goVoice(i); });
      dotsBox.appendChild(b);
    });
    var dots = $$('button', dotsBox);
    var voiceIdx = 0, voiceTimer = null;
    function goVoice(i) {
      voiceIdx = (i + figures.length) % figures.length;
      vp.scrollTo({ left: vp.clientWidth * voiceIdx * (document.documentElement.dir === 'rtl' ? -1 : 1), behavior: reduceMotion ? 'auto' : 'smooth' });
      dots.forEach(function (d, j) { d.classList.toggle('on', j === voiceIdx); });
    }
    $('#voicesPrev').addEventListener('click', function () { goVoice(voiceIdx - 1); restartVoiceTimer(); });
    $('#voicesNext').addEventListener('click', function () { goVoice(voiceIdx + 1); restartVoiceTimer(); });
    function restartVoiceTimer() {
      clearInterval(voiceTimer);
      if (!reduceMotion) voiceTimer = setInterval(function () { goVoice(voiceIdx + 1); }, 6500);
    }
    vp.addEventListener('mouseenter', function () { clearInterval(voiceTimer); });
    vp.addEventListener('mouseleave', restartVoiceTimer);
    goVoice(0);
    restartVoiceTimer();
  }

  /* ═══ فرم تماس → mailto + توست ═══ */
  function showToast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 3800);
  }
  $('#contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#fName').value.trim(), msg = $('#fMsg').value.trim();
    if (!name || !msg) return;
    var subject = encodeURIComponent(lang === 'fa' ? 'پیام از وب‌سایت — ' + name : 'Message from website — ' + name);
    var body = encodeURIComponent(msg + '\n\n— ' + name);
    showToast(t('contact.toast'));
    setTimeout(function () {
      window.location.href = 'mailto:ramin.jelladat@gmail.com?subject=' + subject + '&body=' + body;
    }, 600);
    e.target.reset();
  });

  /* ═══ بازگشت به بالا ═══ */
  $('#toTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ═══ پرده‌ی ورود ═══ */
  (function initLoader() {
    var loader = $('#loader'), bar = $('#loaderBar'), pct = $('#loaderPct');
    var val = 0, target = 12, loaded = false, t0 = performance.now();
    document.body.classList.add('lock');

    function finish() {
      loader.classList.add('done');
      document.body.classList.remove('lock');
      document.body.classList.add('ready');
      setTimeout(function () { loader.style.display = 'none'; }, 1300);
      onScroll();
    }
    if (reduceMotion) {
      bar.style.transform = 'scaleX(1)'; pct.textContent = '100%';
      finish(); return;
    }
    var DUR = 1500;
    (function step(now) {
      if (loaded) target = 100;
      else {
        var el = now - t0;
        target = Math.min(90, 100 * (1 - Math.pow(1 - Math.min(1, el / DUR), 3)) * 0.9);
      }
      val += (target - val) * 0.09;
      if (loaded && val > 99.4) val = 100;
      bar.style.transform = 'scaleX(' + (val / 100).toFixed(4) + ')';
      pct.textContent = Math.round(val) + '%';
      if (val >= 100) { finish(); return; }
      requestAnimationFrame(step);
    })(t0);
    window.addEventListener('load', function () { loaded = true; });
    setTimeout(function () { loaded = true; }, 3200); /* بیمه: منتظر منابع بی‌جواب نمی‌مانیم */
  })();

  /* ═══ شروع ═══ */
  renderMarquee();
  applyLang(false);
  splitAll();
  initDeck();
})();
