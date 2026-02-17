# Python Starter

Минимальный шаблон для работы с LLM API на Python.

## Быстрый старт

```bash
cd templates/python-starter
pip install -r requirements.txt
cp .env.example .env   # заполните API-ключи
python main.py
```

## Что внутри

| Файл | Описание |
|------|----------|
| `main.py` | Точка входа — загрузка ключей, пример вызова API |
| `requirements.txt` | Зависимости (раскомментируйте нужные) |
| `.env.example` | Шаблон переменных окружения |

## Следующие шаги

1. Добавьте вызовы к нужному API (OpenAI, Anthropic и т.д.)
2. Раскомментируйте зависимости в `requirements.txt`
3. Постройте свою логику в `main.py` или создайте модули
4. Для UI — подключите Streamlit или Gradio (см. `templates/streamlit-demo/`)
