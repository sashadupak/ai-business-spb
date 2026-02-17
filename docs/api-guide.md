# Гайд по работе с API на хакатоне

## Общие правила

1. **Не коммитьте ключи** — используйте `.env` файлы
2. **Следите за лимитами** — ключи общие, не спамьте запросами
3. **Кэшируйте ответы** — при отладке не вызывайте API повторно на те же данные
4. **Если ключ не работает** — напишите в Telegram-чат хакатона

---

## OpenAI

### Установка

```bash
pip install openai
```

### Базовый вызов

```python
from openai import OpenAI

client = OpenAI()  # читает OPENAI_API_KEY из .env

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "Ты — полезный ассистент."},
        {"role": "user", "content": "Проанализируй этот текст..."},
    ],
    temperature=0,
)

print(response.choices[0].message.content)
```

### Полезные параметры

| Параметр | Описание |
|----------|----------|
| `model` | `gpt-4o` (мощный) или `gpt-4o-mini` (быстрый и дешёвый) |
| `temperature` | 0 = детерминированный, 1 = креативный |
| `max_tokens` | Лимит длины ответа |
| `response_format` | `{"type": "json_object"}` для JSON-ответов |

### Документация
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)

---

## Anthropic (Claude)

### Установка

```bash
pip install anthropic
```

### Базовый вызов

```python
from anthropic import Anthropic

client = Anthropic()  # читает ANTHROPIC_API_KEY из .env

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Проанализируй этот текст..."},
    ],
    system="Ты — полезный ассистент.",
)

print(message.content[0].text)
```

### Полезные параметры

| Параметр | Описание |
|----------|----------|
| `model` | `claude-sonnet-4-20250514` (баланс) или `claude-haiku-4-20250414` (быстрый) |
| `max_tokens` | Обязательный параметр |
| `temperature` | 0 = точный, 1 = креативный |
| `system` | Системный промпт (отдельный параметр, не в messages) |

### Документация
- [Anthropic API Reference](https://docs.anthropic.com/en/api)
- [Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)

---

## Советы по экономии токенов

1. **Используйте mini/haiku для отладки**, переключайтесь на мощные модели для финального демо
2. **Кэшируйте** — если ответ на тот же вопрос не изменится, сохраняйте результат
3. **Батчите запросы** — обрабатывайте несколько документов за один вызов, если позволяет контекст
4. **Оптимизируйте промпты** — короткий и чёткий промпт = меньше токенов = быстрее ответ

---

## Structured Output (JSON)

### OpenAI

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[...],
    response_format={"type": "json_object"},
)
data = json.loads(response.choices[0].message.content)
```

### Anthropic

```python
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Верни ответ в формате JSON: ..."}
    ],
)
data = json.loads(message.content[0].text)
```

---

## Streaming (для UI)

### OpenAI

```python
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[...],
    stream=True,
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Anthropic

```python
with client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[...],
) as stream:
    for text in stream.text_stream:
        print(text, end="")
```
