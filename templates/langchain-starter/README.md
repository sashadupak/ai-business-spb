# LangChain Starter

Шаблон для AI-агентов и цепочек на LangChain. Поддержка OpenAI и Anthropic из коробки.

## Быстрый старт

```bash
cd templates/langchain-starter
pip install -r requirements.txt
cp .env.example .env   # заполните API-ключи
python agent.py
```

## Что внутри

| Файл | Описание |
|------|----------|
| `agent.py` | AI-агент с поддержкой инструментов (OpenAI / Anthropic) |
| `chains.py` | Примеры цепочек: RAG, классификация текста |
| `requirements.txt` | Зависимости |
| `.env.example` | Шаблон переменных окружения |

## Когда использовать

- **agent.py** — когда нужен агент, который сам выбирает инструменты и действия
- **chains.py (RAG)** — когда нужно отвечать на вопросы по документам/базе знаний
- **chains.py (classification)** — когда нужно классифицировать входящий текст

## Переключение провайдера

В `.env` задайте `LLM_PROVIDER=anthropic` для Claude или `LLM_PROVIDER=openai` для GPT-4o.
