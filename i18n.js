(function () {
  "use strict";

  var STORAGE_KEY = "nest_lang";

  var dict = {
    ru: {
      skip: "К содержимому",
      "nav.home": "Главная",
      "nav.properties": "Объекты",
      "nav.districts": "Районы",
      "nav.about": "О нас",
      "nav.team": "Команда",
      "nav.faq": "FAQ",
      "nav.contact": "Контакты",
      "cta.find": "Подобрать жильё",
      "cta.quiz": "Пройти квиз",
      "cta.quizShort": "Квиз",
      "cta.book": "Записаться",
      "aria.call": "Позвонить",
      "aria.close": "Закрыть",
      "aria.menu": "Открыть меню",
      "hero.title": "Находим жильё, в котором хочется остаться",
      "hero.sub":
        "Квартиры и дома в сильных районах Москвы. Один брокер — до ключей.",
      "search.district": "Район",
      "search.type": "Тип",
      "search.budget": "Бюджет",
      "search.anyDistrict": "Любой район",
      "search.center": "Центр",
      "search.west": "Запад",
      "search.north": "Север",
      "search.south": "Юг",
      "search.east": "Восток",
      "search.anyType": "Все типы",
      "search.apartment": "Квартира",
      "search.house": "Дом",
      "search.newbuild": "Новостройка",
      "search.penthouse": "Пентхаус",
      "search.anyBudget": "Любой",
      "search.p10": "до 10 млн ₽",
      "search.p20": "10–20 млн ₽",
      "search.p40": "20–40 млн ₽",
      "search.p40p": "от 40 млн ₽",
      "search.submit": "Найти",
      "stats.s1": "объектов в работе",
      "stats.s2": "семей уже с ключами",
      "stats.s3": "сделок доводим до конца",
      "stats.s4": "лет на рынке Москвы",
      "prop.eyebrow": "Каталог",
      "prop.title": "Что смотрят прямо сейчас",
      "prop.lead":
        "Актуальные варианты из нашей базы: проверенные документы, понятные планировки и цена без «украшений» в объявлении.",
      "prop.quiz": "Подобрать за 1 мин",
      "prop.request": "Запросить подборку",
      "prop.reset": "Сбросить",
      "prop.count": "{n} объектов",
      "prop.countFound": "Найдено: {n} из {total}",
      "prop.emptyTitle": "По этим фильтрам объектов нет",
      "prop.emptyText": "Сбросьте фильтры или оставьте заявку — подберём варианты под ваш запрос.",
      "prop.emptyCta": "Оставить заявку на подбор",
      "prop.closedTitle": "Есть объекты не в открытом доступе",
      "prop.closedText":
        "Закрытые продажи, off-market и варианты «до рынка». Опишите запрос — пришлём 5–7 релевантных адресов за 48 часов.",
      "prop.closedCta": "Запросить закрытую подборку",
      "prop.more": "Подробнее",
      "prop.fav": "В избранное",
      "prop.favOn": "Убрать из избранного",
      "meta.mln": "млн ₽",
      "meta.rooms": "комн.",
      "meta.floor": "этаж",
      "meta.sot": "сот.",
      "card.p1.badge": "Новостройка",
      "card.p1.title": "2-комн. с видовой кухней",
      "card.p1.desc": "Хамовники · 12 мин пешком до метро",
      "card.p1.m2": "≈ 278 тыс. ₽/м²",
      "card.p2.badge": "Пентхаус",
      "card.p2.title": "Пентхаус 124 м² с видом на Сити",
      "card.p2.desc": "Пресненский · 28 этаж · 2 паркинга",
      "card.p2.m2": "≈ 343 тыс. ₽/м²",
      "card.p3.badge": "Готово к въезду",
      "card.p3.title": "3-комн. у парка, можно въезжать",
      "card.p3.desc": "Раменки · мебель и техника на месте",
      "card.p3.m2": "≈ 263 тыс. ₽/м²",
      "card.p4.badge": "Дом",
      "card.p4.title": "Таунхаус 168 м² + двор 4 сот.",
      "card.p4.desc": "Сколково · охраняемый посёлок",
      "card.p4.m2": "≈ 333 тыс. ₽/м²",
      "districts.eyebrow": "Районы",
      "districts.title": "Где ищем чаще всего",
      "districts.lead":
        "Не «вся Москва», а сильные локации с понятной ликвидностью, школами и повседневной жизнью.",
      "districts.view": "Смотреть объекты →",
      "districts.d1.for":
        "Для тех, кто хочет центр без суеты Тверской: парки, школы, статусная вторичка и новостройки.",
      "districts.d1.price": "от 18 млн ₽ · 2-комн.",
      "districts.d2.for": "Сити, набережная, бизнес и жизнь в одном контуре. Пентхаусы и видовые этажи.",
      "districts.d2.price": "от 35 млн ₽ · видовые",
      "districts.d3.for": "Семьи: парк, школы, метро. Много «можно въезжать» с ремонтом.",
      "districts.d3.price": "от 20 млн ₽ · 3-комн.",
      "districts.d4.for": "Дома и таунхаусы: двор, тишина, охрана. Для тех, кто вырос из квартиры.",
      "districts.d4.price": "от 45 млн ₽ · таунхаус",
      "why.eyebrow": "Почему Nest",
      "why.title": "Покупка без лишнего стресса",
      "why.title1": "Покупка без",
      "why.title2": "лишнего",
      "why.title3": "стресса",
      "why.lead":
        "Мы берём на себя проверку, переговоры и бумажную работу. Вы выбираете дом, а не разбираетесь в хаосе рынка.",
      "why.t1": "Сначала документы, потом показ",
      "why.p1": "Юрист проверяет объект до вашей поездки. Сюрпризы в ЕГРН и «серые» схемы отсекаем сами.",
      "why.t2": "Короткий список, а не лента",
      "why.p2": "За 48 часов — 5–7 релевантных вариантов с честными плюсами и минусами.",
      "why.t3": "Один человек — от звонка до ключей",
      "why.p3": "Ваш брокер знает бюджет, район и то, что для вас действительно важно.",
      "why.t4": "Сопровождаем до регистрации",
      "why.p4": "Торг, договор, ипотека, Росреестр. Не пропадаем после задатка.",
      "process.eyebrow": "Как это устроено",
      "process.title": "Четыре шага до ключей",
      "process.lead":
        "Прозрачный процесс. Вы всегда понимаете, на каком этапе сделка и что происходит дальше.",
      "process.step1": "Шаг 01",
      "process.step2": "Шаг 02",
      "process.step3": "Шаг 03",
      "process.step4": "Шаг 04",
      "process.t1": "Уточняем задачу",
      "process.p1": "Созваниваемся на 15–20 минут: бюджет, район, сроки и жёсткие «нельзя».",
      "process.t2": "Собираем shortlist",
      "process.p2": "Отбираем объекты, проверяем документы и присылаем подборку с комментариями брокера.",
      "process.t3": "Смотрим вместе",
      "process.p3": "Организуем показы. Сравниваем свет, шум, двор — то, чего нет на фото.",
      "process.t4": "Закрываем сделку",
      "process.p4": "Ведём переговоры, готовим договор и сопровождаем до ключей и регистрации.",
      "team.eyebrow": "Команда",
      "team.title": "Люди, а не колл-центр",
      "team.lead": "Один брокер ведёт вас от первого звонка до регистрации. Можно сразу выбрать специалиста.",
      "team.r1": "Запад и Сколково · дома",
      "team.s1": "Таунхаусы и коттеджи · сопровождение сделки",
      "team.r2": "Центр · новостройки",
      "team.s2": "Хамовники, Пресня · shortlist за 48 часов",
      "team.r3": "Семьи · ипотека",
      "team.s3": "Раменки · семейная и IT-ипотека",
      "team.toAlex": "Хочу к Алексею",
      "team.toMaria": "Хочу к Марии",
      "team.toIrina": "Хочу к Ирине",
      "answers.title1": "Ипотека и ответы",
      "answers.title2": "на главные вопросы",
      "mortgage.eyebrow": "Ипотека",
      "mortgage.title": "Рассчитайте ежемесячный платёж",
      "mortgage.lead": "Грубый расчёт платежа — не оферта банка. Поможем подобрать программу под объект.",
      "mortgage.price": "Стоимость жилья",
      "mortgage.down": "Первоначальный взнос",
      "mortgage.years": "Срок кредита",
      "mortgage.rate": "Процентная ставка",
      "mortgage.yearsUnit": "лет",
      "mortgage.pay": "Ориентировочный платёж",
      "mortgage.from": "от",
      "mortgage.calc": "Рассчитать",
      "mortgage.note":
        "Оценка по аннуитету — не оферта банка. Реальная ставка зависит от программы и объекта.",
      "mortgage.cta": "Обсудить ипотеку",
      "mortgage.perMonth": "₽/мес",
      "reviews.eyebrow": "Отзывы клиентов",
      "reviews.title": "Реальные истории. Без приукрашивания.",
      "reviews.title1": "Реальные истории.",
      "reviews.title2": "Без приукрашивания.",
      "reviews.lead": "Клиенты, которые уже получили ключи. Честные отзывы после сделки.",
      "reviews.ctaPrimary": "Оставить заявку",
      "reviews.ctaSecondary": "Все отзывы",
      "reviews.ratingLabel": "4.9 · на основе отзывов клиентов",
      "reviews.t1":
        "Полгода сами смотрели объявления — устали от хаоса. С Nest за две недели вышли на квартиру, где наконец спокойно спим.",
      "reviews.r1": "Квартира в Раменках",
      "reviews.time1": "2 недели назад",
      "reviews.m1": "14 дней до задатка · семейная ипотека",
      "reviews.t2":
        "Брокер с первого звонка зафиксировал: школа, парковка, двор без машин. Не торопил с решением — это редкость.",
      "reviews.r2": "Таунхаус в Сколково",
      "reviews.time2": "3 недели назад",
      "reviews.m2": "21 день · торг −1,8 млн ₽",
      "reviews.t3":
        "Документы разобрали до задатка, ипотека прошла без сюрпризов. Чувствуется, что сделками такого уровня занимаются постоянно.",
      "reviews.r3": "Пентхаус, Пресненский",
      "reviews.time3": "1 месяц назад",
      "reviews.m3": "Ипотека · 7 дней до одобрения",
      "faq.eyebrow": "FAQ",
      "faq.title": "Частые вопросы",
      "faq.lead": "Коротко о деньгах, сроках и рисках — без мелкого шрифта.",
      "faq.q1": "Можно ли рассмотреть объект без первого взноса?",
      "faq.a1":
        "Да — обсудим программы с минимальным взносом, субсидии и сценарии «взнос позже». На старте честно скажем, какие объекты реалистичны без ПВ и где банк откажет.",
      "faq.q2": "Вы работаете только с новостройками?",
      "faq.a2":
        "Нет. Новостройки, вторичка, апартаменты, таунхаусы и дома — если объект подходит под ваш запрос и проходит проверку документов.",
      "faq.q3": "Сколько времени занимает подбор?",
      "faq.a3":
        "Первый shortlist — обычно за 48 часов после брифа. Сделка в среднем 2–6 недель: зависит от рынка, ипотеки и того, насколько чётко сформулирован «нельзя».",
      "faq.q4": "Помогаете с одобрением ипотеки?",
      "faq.a4":
        "Да: пакет документов, выбор банка под объект, семейная / IT / стандартная ипотека. Следим, чтобы одобрение не «сгорело» из‑за неподходящего дома.",
      "faq.q5": "Что входит в сопровождение сделки?",
      "faq.a5":
        "Торг, проверка документов, договор, задаток, ипотека, Росреестр и передача ключей. Вы принимаете решения — мы ведём процесс и держим сроки.",
      "contact.eyebrow": "Заявка",
      "contact.title": "Оставьте контакты — подберём первые варианты",
      "contact.lead":
        "Брокер перезвонит в течение 15 минут, уточнит запрос и предложит объекты, которые уже есть в работе.",
      "contact.successTitle": "Заявка принята",
      "contact.successText":
        "Спасибо! Перезвоним в течение 15 минут в рабочее время. Можете сразу написать в мессенджер.",
      "contact.name": "Имя",
      "contact.phone": "Телефон",
      "contact.interest": "Что ищете",
      "contact.message": "Бюджет и район",
      "contact.namePh": "Как к вам обращаться",
      "contact.msgPh": "Например: 20–30 млн, запад, 2–3 комнаты",
      "contact.opt1": "Квартиру",
      "contact.opt2": "Дом / таунхаус",
      "contact.opt3": "Новостройку",
      "contact.opt4": "Вариант под инвестиции",
      "contact.opt5": "Пока выбираю",
      "contact.consent": "Согласен на обработку",
      "contact.privacy": "персональных данных",
      "contact.submit": "Получить подборку",
      "contact.note": "Без рассылок. Один звонок по вашей заявке.",
      "contact.after": "Что будет после заявки",
      "contact.step1": "Созвон 15–20 минут",
      "contact.step2": "Фиксация бюджета и районов",
      "contact.step3": "Первые 5–7 вариантов за 48 часов",
      "contact.call": "Позвонить",
      "contact.errName": "Укажите имя",
      "contact.errPhone": "Введите корректный телефон",
      "contact.errConsent": "Нужно согласие",
      "footer.kicker": "Контакты",
      "footer.headline": "Находим жильё в Москве, в котором хочется остаться",
      "footer.contact": "Связаться с нами",
      "footer.nav": "Навигация",
      "footer.info": "Информация",
      "footer.pick": "Подбор жилья",
      "footer.mortgage": "Ипотечный ориентир",
      "footer.deal": "Сопровождение сделки",
      "footer.privacy": "Политика конфиденциальности",
      "footer.rights": "© 2026 Nest",
      "footer.moscow": "Москва",
      "footer.hours": "Пн–Пт 10:00–20:00",
      "mobile.call": "Звонок",
      "mobile.lead": "Заявка",
      "quiz.step": "Шаг {n} из 5",
      "quiz.q1": "Что ищете?",
      "quiz.q2": "Какой бюджет?",
      "quiz.q3": "Какой район?",
      "quiz.q4": "Когда планируете покупку?",
      "quiz.q5": "Куда прислать 5–7 вариантов?",
      "quiz.o1a": "Квартиру",
      "quiz.o1b": "Новостройку",
      "quiz.o1c": "Дом / таунхаус",
      "quiz.o1d": "Под инвестиции",
      "quiz.o2a": "до 15 млн ₽",
      "quiz.o2b": "15–30 млн ₽",
      "quiz.o2c": "30–50 млн ₽",
      "quiz.o2d": "от 50 млн ₽",
      "quiz.o3a": "Центр",
      "quiz.o3b": "Запад",
      "quiz.o3c": "Север / Юг / Восток",
      "quiz.o3d": "Пока не важно",
      "quiz.o4a": "Как можно скорее",
      "quiz.o4b": "1–3 месяца",
      "quiz.o4c": "3–6 месяцев",
      "quiz.o4d": "Пока изучаю рынок",
      "quiz.next": "Далее",
      "quiz.back": "Назад",
      "quiz.submit": "Получить подборку",
      "quiz.ok": "Принято",
      "quiz.okText": "Брокер свяжется в течение 15 минут и уточнит детали shortlist.",
      "quiz.consent": "Согласен на",
      "stub.msg": "Мессенджер — заглушка (концепт)",
      "toast.favOn": "Добавлено в избранное",
      "toast.favOff": "Удалено из избранного",
      "toast.lead": "Заявка принята",
      "toast.pick": "Выберите вариант",
      "propPage.back": "← К каталогу",
      "propPage.book": "Забронировать просмотр",
      "propPage.bookLead": "Брокер перезвонит в течение 15 минут и согласует время.",
      "propPage.success": "Заявка принята",
      "propPage.successText": "Перезвоним за 15 минут. Можете написать в мессенджер.",
      "propPage.comment": "Комментарий",
      "propPage.submit": "Записаться на просмотр",
      "propPage.or": "Или сразу:",
      "propPage.related": "Другие объекты",
      "propPage.catalog": "Весь каталог",
      "propPage.share": "Поделиться в Telegram",
      "propPage.copy": "Копировать ссылку",
      "propPage.copied": "Ссылка скопирована",
      "propPage.fav": "В избранное",
      "propPage.favOn": "В избранном",
      "propPage.pros": "Плюсы",
      "propPage.cons": "На что обратить внимание",
      "doc.title": "Nest — Находим жильё, в котором хочется остаться",
    },
    en: {
      skip: "Skip to content",
      "nav.home": "Home",
      "nav.properties": "Properties",
      "nav.districts": "Districts",
      "nav.about": "About",
      "nav.team": "Team",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "cta.find": "Find a home",
      "cta.quiz": "Take the quiz",
      "cta.quizShort": "Quiz",
      "cta.book": "Book a tour",
      "aria.call": "Call",
      "aria.close": "Close",
      "aria.menu": "Open menu",
      "hero.title": "Homes you’ll want to stay in",
      "hero.sub":
        "Apartments and houses in Moscow’s strongest districts. One broker — to the keys.",
      "search.district": "District",
      "search.type": "Type",
      "search.budget": "Budget",
      "search.anyDistrict": "Any district",
      "search.center": "Center",
      "search.west": "West",
      "search.north": "North",
      "search.south": "South",
      "search.east": "East",
      "search.anyType": "All types",
      "search.apartment": "Apartment",
      "search.house": "House",
      "search.newbuild": "New build",
      "search.penthouse": "Penthouse",
      "search.anyBudget": "Any",
      "search.p10": "up to 10M ₽",
      "search.p20": "10–20M ₽",
      "search.p40": "20–40M ₽",
      "search.p40p": "from 40M ₽",
      "search.submit": "Search",
      "stats.s1": "listings in work",
      "stats.s2": "families with keys",
      "stats.s3": "deals closed",
      "stats.s4": "years in Moscow",
      "prop.eyebrow": "Catalog",
      "prop.title": "What people view right now",
      "prop.lead":
        "Current options from our base: checked documents, clear layouts, and honest pricing.",
      "prop.quiz": "Match in 1 min",
      "prop.request": "Request a shortlist",
      "prop.reset": "Reset",
      "prop.count": "{n} properties",
      "prop.countFound": "Found: {n} of {total}",
      "prop.emptyTitle": "No matches for these filters",
      "prop.emptyText": "Reset filters or leave a request — we’ll prepare options for you.",
      "prop.emptyCta": "Request a shortlist",
      "prop.closedTitle": "Some homes stay off the open market",
      "prop.closedText":
        "Off-market and early access. Tell us your brief — 5–7 relevant options within 48 hours.",
      "prop.closedCta": "Request private shortlist",
      "prop.more": "Details",
      "prop.fav": "Save",
      "prop.favOn": "Remove from saved",
      "meta.mln": "M ₽",
      "meta.rooms": "rms",
      "meta.floor": "fl.",
      "meta.sot": "ares",
      "card.p1.badge": "New build",
      "card.p1.title": "2-bed with view kitchen",
      "card.p1.desc": "Khamovniki · 12 min walk to metro",
      "card.p1.m2": "≈ 278k ₽/m²",
      "card.p2.badge": "Penthouse",
      "card.p2.title": "Penthouse 124 m² with City view",
      "card.p2.desc": "Presnensky · 28th floor · 2 parking spots",
      "card.p2.m2": "≈ 343k ₽/m²",
      "card.p3.badge": "Move-in ready",
      "card.p3.title": "3-bed by the park, ready to move in",
      "card.p3.desc": "Ramenki · furniture & appliances included",
      "card.p3.m2": "≈ 263k ₽/m²",
      "card.p4.badge": "House",
      "card.p4.title": "Townhouse 168 m² + 4 ares yard",
      "card.p4.desc": "Skolkovo · gated community",
      "card.p4.m2": "≈ 333k ₽/m²",
      "districts.eyebrow": "Districts",
      "districts.title": "Where we search most",
      "districts.lead":
        "Not “all of Moscow” — strong locations with liquidity, schools, and everyday life.",
      "districts.view": "View homes →",
      "districts.d1.for":
        "For those who want the center without Tverskaya noise: parks, schools, premium resale and new builds.",
      "districts.d1.price": "from 18M ₽ · 2-bed",
      "districts.d2.for": "City skyline, embankment, business and life in one place. Penthouses and view floors.",
      "districts.d2.price": "from 35M ₽ · view units",
      "districts.d3.for": "Families: park, schools, metro. Many move-in ready homes with renovation.",
      "districts.d3.price": "from 20M ₽ · 3-bed",
      "districts.d4.for": "Houses and townhouses: yard, quiet, security. For those who outgrew apartments.",
      "districts.d4.price": "from 45M ₽ · townhouse",
      "why.eyebrow": "Why Nest",
      "why.title": "Buying without the stress",
      "why.title1": "Buying without",
      "why.title2": "the extra",
      "why.title3": "stress",
      "why.lead":
        "We handle checks, negotiations, and paperwork. You choose a home — not the chaos of the market.",
      "why.t1": "Documents first, viewing second",
      "why.p1": "A lawyer checks the property before your visit. We filter EGRN surprises and grey schemes.",
      "why.t2": "A shortlist, not a feed",
      "why.p2": "In 48 hours — 5–7 relevant options with honest pros and cons.",
      "why.t3": "One person — from call to keys",
      "why.p3": "Your broker knows the budget, district, and what truly matters to you.",
      "why.t4": "We stay until registration",
      "why.p4": "Negotiation, contract, mortgage, Rosreestr. We don’t disappear after the deposit.",
      "process.eyebrow": "How it works",
      "process.title": "Four steps to the keys",
      "process.lead":
        "A clear process. You always know the stage and what’s next.",
      "process.step1": "Step 01",
      "process.step2": "Step 02",
      "process.step3": "Step 03",
      "process.step4": "Step 04",
      "process.t1": "Clarify the brief",
      "process.p1": "15–20 min call: budget, district, timeline and hard must-nots.",
      "process.t2": "Build a shortlist",
      "process.p2": "We select homes, check docs, and send a pack with broker notes.",
      "process.t3": "View together",
      "process.p3": "We arrange tours. Light, noise, yard — what photos miss.",
      "process.t4": "Close the deal",
      "process.p4": "We negotiate, prepare the contract, and support through keys and registration.",
      "team.eyebrow": "Team",
      "team.title": "People, not a call center",
      "team.lead": "One broker from first call to registration. You can pick a specialist.",
      "team.r1": "West & Skolkovo · houses",
      "team.s1": "Townhouses and cottages · full deal support",
      "team.r2": "Center · new builds",
      "team.s2": "Khamovniki, Presnya · shortlist in 48 hours",
      "team.r3": "Families · mortgage",
      "team.s3": "Ramenki · family & IT mortgage",
      "team.toAlex": "Work with Alex",
      "team.toMaria": "Work with Maria",
      "team.toIrina": "Work with Irina",
      "answers.title1": "Mortgage and answers",
      "answers.title2": "to the key questions",
      "mortgage.eyebrow": "Mortgage",
      "mortgage.title": "Estimate your monthly payment",
      "mortgage.lead": "A simple estimate — not a bank offer. We’ll help pick a program.",
      "mortgage.price": "Home price",
      "mortgage.down": "Down payment",
      "mortgage.years": "Loan term",
      "mortgage.rate": "Interest rate",
      "mortgage.yearsUnit": "years",
      "mortgage.pay": "Estimated payment",
      "mortgage.from": "from",
      "mortgage.calc": "Calculate",
      "mortgage.note":
        "Annuity estimate only — not a bank offer. The real rate depends on the program and property.",
      "mortgage.cta": "Discuss mortgage",
      "mortgage.perMonth": "₽/mo",
      "reviews.eyebrow": "Client stories",
      "reviews.title": "Real stories. No sugarcoating.",
      "reviews.title1": "Real stories.",
      "reviews.title2": "No sugarcoating.",
      "reviews.lead": "Clients who already got the keys. Honest reviews after the deal.",
      "reviews.ctaPrimary": "Leave a request",
      "reviews.ctaSecondary": "All reviews",
      "reviews.ratingLabel": "4.9 · based on client reviews",
      "reviews.t1":
        "We spent half a year browsing listings — exhausted by the chaos. With Nest we found a place we can finally sleep in within two weeks.",
      "reviews.r1": "Apartment in Ramenki",
      "reviews.time1": "2 weeks ago",
      "reviews.m1": "14 days to deposit · family mortgage",
      "reviews.t2":
        "From the first call the broker locked: school, parking, car-free yard. No pressure to decide — rare.",
      "reviews.r2": "Townhouse in Skolkovo",
      "reviews.time2": "3 weeks ago",
      "reviews.m2": "21 days · negotiated −1.8M ₽",
      "reviews.t3":
        "Docs cleared before the deposit, mortgage went smoothly. You feel they do this level of deals constantly.",
      "reviews.r3": "Penthouse, Presnensky",
      "reviews.time3": "1 month ago",
      "reviews.m3": "Mortgage · 7 days to approval",
      "faq.eyebrow": "FAQ",
      "faq.title": "Common questions",
      "faq.lead": "Money, timing, and risk — in plain language.",
      "faq.q1": "Can we look at a home with no down payment?",
      "faq.a1":
        "Yes — we’ll discuss low-down programs, subsidies, and “down payment later” paths. Up front we’ll say which homes are realistic without a deposit and where the bank will refuse.",
      "faq.q2": "Do you only work with new builds?",
      "faq.a2":
        "No. New builds, resale, apartments, townhouses and houses — if it fits your brief and passes document checks.",
      "faq.q3": "How long does the search take?",
      "faq.a3":
        "First shortlist usually within 48 hours of the brief. A deal averages 2–6 weeks — depends on the market, mortgage, and how clear your must-nots are.",
      "faq.q4": "Do you help with mortgage approval?",
      "faq.a4":
        "Yes: document pack, bank pick for the property, family / IT / standard mortgages. We keep the approval from dying over the wrong home.",
      "faq.q5": "What is included in deal support?",
      "faq.a5":
        "Negotiation, document checks, contract, deposit, mortgage, Rosreestr and key handover. You decide — we run the process and hold deadlines.",
      "contact.eyebrow": "Request",
      "contact.title": "Leave your contacts — first options next",
      "contact.lead":
        "A broker calls within 15 minutes, clarifies the brief, and suggests homes already in work.",
      "contact.successTitle": "Request received",
      "contact.successText":
        "Thanks! We’ll call within 15 minutes during business hours. You can also message us.",
      "contact.name": "Name",
      "contact.phone": "Phone",
      "contact.interest": "Looking for",
      "contact.message": "Budget & district",
      "contact.namePh": "How should we address you",
      "contact.msgPh": "e.g. 20–30M, west, 2–3 rooms",
      "contact.opt1": "Apartment",
      "contact.opt2": "House / townhouse",
      "contact.opt3": "New build",
      "contact.opt4": "Investment option",
      "contact.opt5": "Still deciding",
      "contact.consent": "I agree to",
      "contact.privacy": "personal data processing",
      "contact.submit": "Get a shortlist",
      "contact.note": "No spam. One call about your request.",
      "contact.after": "What happens next",
      "contact.step1": "15–20 min call",
      "contact.step2": "Budget and districts locked",
      "contact.step3": "First 5–7 options in 48 hours",
      "contact.call": "Call",
      "contact.errName": "Enter your name",
      "contact.errPhone": "Enter a valid phone",
      "contact.errConsent": "Consent required",
      "footer.kicker": "Contacts",
      "footer.headline": "Homes in Moscow you’ll want to stay in",
      "footer.contact": "Get in touch",
      "footer.nav": "Navigation",
      "footer.info": "Info",
      "footer.pick": "Home search",
      "footer.mortgage": "Mortgage estimate",
      "footer.deal": "Deal support",
      "footer.privacy": "Privacy policy",
      "footer.rights": "© 2026 Nest",
      "footer.moscow": "Moscow",
      "footer.hours": "Mon–Fri 10:00–20:00",
      "mobile.call": "Call",
      "mobile.lead": "Request",
      "quiz.step": "Step {n} of 5",
      "quiz.q1": "What are you looking for?",
      "quiz.q2": "What’s your budget?",
      "quiz.q3": "Which district?",
      "quiz.q4": "When do you plan to buy?",
      "quiz.q5": "Where should we send 5–7 options?",
      "quiz.o1a": "Apartment",
      "quiz.o1b": "New build",
      "quiz.o1c": "House / townhouse",
      "quiz.o1d": "For investment",
      "quiz.o2a": "up to 15M ₽",
      "quiz.o2b": "15–30M ₽",
      "quiz.o2c": "30–50M ₽",
      "quiz.o2d": "from 50M ₽",
      "quiz.o3a": "Center",
      "quiz.o3b": "West",
      "quiz.o3c": "North / South / East",
      "quiz.o3d": "Not sure yet",
      "quiz.o4a": "As soon as possible",
      "quiz.o4b": "1–3 months",
      "quiz.o4c": "3–6 months",
      "quiz.o4d": "Just researching",
      "quiz.next": "Next",
      "quiz.back": "Back",
      "quiz.submit": "Get a shortlist",
      "quiz.ok": "Received",
      "quiz.okText": "A broker will contact you within 15 minutes to refine the shortlist.",
      "quiz.consent": "I agree to",
      "stub.msg": "Messenger is a stub (concept site)",
      "toast.favOn": "Saved",
      "toast.favOff": "Removed from saved",
      "toast.lead": "Request received",
      "toast.pick": "Please choose an option",
      "propPage.back": "← Back to catalog",
      "propPage.book": "Book a viewing",
      "propPage.bookLead": "A broker will call within 15 minutes to set a time.",
      "propPage.success": "Request received",
      "propPage.successText": "We’ll call in 15 minutes. You can also message us.",
      "propPage.comment": "Comment",
      "propPage.submit": "Book a viewing",
      "propPage.or": "Or:",
      "propPage.related": "You may also like",
      "propPage.catalog": "Full catalog",
      "propPage.share": "Share on Telegram",
      "propPage.copy": "Copy link",
      "propPage.copied": "Link copied",
      "propPage.fav": "Save",
      "propPage.favOn": "Saved",
      "propPage.pros": "Pros",
      "propPage.cons": "Things to note",
      "doc.title": "Nest — Homes you’ll want to stay in",
    },
  };

  var lang = "ru";

  function t(key, vars) {
    var pack = dict[lang] || dict.ru;
    var str = pack[key] != null ? pack[key] : dict.ru[key] != null ? dict.ru[key] : key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace(new RegExp("\\{" + k + "\\}", "g"), String(vars[k]));
      });
    }
    return str;
  }

  function setText(el, val) {
    if (!el) return;
    // Pure text or only whitespace children
    var onlyText = true;
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 1) {
        onlyText = false;
        break;
      }
    }
    if (onlyText || el.tagName === "OPTION" || el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        /* placeholders handled separately */
      } else {
        el.textContent = val;
      }
      return;
    }
    // Prefer a dedicated text span
    var span = el.querySelector("[data-i18n-text]");
    if (span) {
      span.textContent = val;
      return;
    }
    // FAQ-style: text node + icon element
    for (var j = 0; j < el.childNodes.length; j++) {
      var node = el.childNodes[j];
      if (node.nodeType === 3 && node.textContent.trim()) {
        node.textContent = val;
        return;
      }
    }
    // CTA with svg: set text in first non-svg child or prepend
    var textEl = null;
    for (var k = 0; k < el.childNodes.length; k++) {
      if (el.childNodes[k].nodeType === 3) {
        textEl = el.childNodes[k];
        break;
      }
    }
    if (textEl) {
      textEl.textContent = " " + val + " ";
    } else {
      el.insertBefore(document.createTextNode(val + " "), el.firstChild);
    }
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      setText(el, t(key));
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    root.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    // document title
    if (dict[lang] && dict[lang]["doc.title"]) {
      document.title = dict[lang]["doc.title"];
    }
    document.documentElement.lang = lang === "en" ? "en" : "ru";
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang-set") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    // quiz step labels that use dynamic step numbers
    root.querySelectorAll("[data-i18n-step]").forEach(function (el) {
      var n = el.getAttribute("data-i18n-step");
      el.textContent = t("quiz.step", { n: n });
    });
    try {
      window.dispatchEvent(new CustomEvent("nest:lang", { detail: { lang: lang } }));
    } catch (e) {}
  }

  function setLang(next) {
    if (next !== "ru" && next !== "en") return;
    lang = next;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    apply(document);
  }

  function init() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ru") lang = saved;
    } catch (e) {}
    apply(document);
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-set"));
      });
    });
  }

  window.NestI18n = {
    t: t,
    setLang: setLang,
    getLang: function () {
      return lang;
    },
    apply: apply,
    init: init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
