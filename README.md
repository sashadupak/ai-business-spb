# AI Business SPb — Сайт

## Структура проекта

```
ai-business-spb/
├── index.html              # HTML-скелет (структура без контента)
├── SPEC.md                 # Спецификация сайта — читать первым
├── README.md               # Этот файл
│
├── css/
│   └── style.css           # Все стили
│
├── js/
│   ├── data.js             # ← ВСЁ СОДЕРЖИМОЕ САЙТА ЗДЕСЬ
│   └── main.js             # Логика рендеринга и интерактивность
│
└── assets/
    ├── logos/
    │   ├── partners/       # ← Логотипы партнёров-заказчиков
    │   │   ├── vizard.svg
    │   │   ├── mediascope.svg
    │   │   ├── neurodvs.svg
    │   │   └── baltbereg.svg
    │   ├── tech/           # ← Технологические партнёры
    │   │   ├── yandex.svg
    │   │   └── itdialog.svg
    │   └── media/          # ← СМИ-партнёры (опционально)
    │       ├── codenrock.svg
    │       └── ict2go.svg
    │
    └── photos/
        ├── team/           # ← Фото команды (имена файлов строго!)
        │   ├── egor.jpg
        │   ├── alexander.jpg
        │   ├── vitaliy.jpg
        │   ├── timofey.jpg
        │   └── grigoriy.jpg
        ├── event/          # ← Фото с хакатона (любые имена)
        │   ├── photo1.jpg
        │   └── ...
        └── winner-vizard-arctic.jpg  # ← Скриншот платформы-победителя
```

---

## Как вносить изменения

### Тексты, цитаты, цифры
Открой `js/data.js` — весь контент собран там в одном объекте `SITE_DATA`.
Просто редактируй нужные поля и обновляй страницу.

### Добавить фото команды
1. Положи файл в `assets/photos/team/`
2. Имя файла должно точно совпадать с полем `photo` в `data.js`
3. Например: `egor.jpg` → `photo: 'assets/photos/team/egor.jpg'`
4. Если фото не найдено — автоматически показывается инициал

### Добавить логотип партнёра
1. Положи SVG или PNG в `assets/logos/partners/`
2. Раскомментируй строку `logo:` в нужном кейсе в `data.js`
3. Пример: `logo: 'assets/logos/partners/vizard.svg'`

### Добавить скриншот победителя
1. Положи файл `winner-vizard-arctic.jpg` в `assets/photos/`
2. Путь уже прописан в `data.js` в поле `winner.screenshot`

### Подключить форму
1. Открой `js/data.js`
2. Найди `contact.form_action`
3. Вставь URL webhook'а (Formspree, Zapier, n8n и т.д.)

---

## Как запустить

Просто открой `index.html` в браузере. Сервер не нужен.

Для разработки с автоперезагрузкой через Claude Code:
```bash
# Если установлен Python
python3 -m http.server 3000

# Если установлен Node
npx serve .
```

---

## Работа с Claude Code

При открытии проекта в Claude Code можно попросить:
- «Обнови цитату Сергея Зубкова в data.js»
- «Добавь новый кейс в секцию cases»
- «Сделай секцию команды адаптивной на 2 колонки на телефоне»
- «Добавь Яндекс.Метрику»
- «Создай отдельную страницу для кейсов»
