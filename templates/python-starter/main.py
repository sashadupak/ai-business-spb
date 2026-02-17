"""
AI & Business Hackathon SPb — Python Starter
=============================================

Быстрый старт для работы с LLM API.
Замените TODO на свою логику.

Запуск:
    pip install -r requirements.txt
    cp .env.example .env  # заполните API-ключи
    python main.py
"""

import os
from dotenv import load_dotenv

load_dotenv()


def get_api_key() -> str:
    """Получить API-ключ из переменных окружения."""
    key = os.getenv("OPENAI_API_KEY") or os.getenv("ANTHROPIC_API_KEY")
    if not key:
        raise ValueError(
            "API-ключ не найден. Скопируйте .env.example в .env и заполните ключи."
        )
    return key


def main():
    """Точка входа — замените на свою логику."""
    api_key = get_api_key()
    print(f"API-ключ загружен ({api_key[:8]}...)")

    # TODO: Ваш код здесь
    # Пример вызова OpenAI:
    #
    # from openai import OpenAI
    # client = OpenAI(api_key=api_key)
    # response = client.chat.completions.create(
    #     model="gpt-4o",
    #     messages=[{"role": "user", "content": "Привет!"}]
    # )
    # print(response.choices[0].message.content)

    print("Стартер работает! Замените TODO на свою логику.")


if __name__ == "__main__":
    main()
