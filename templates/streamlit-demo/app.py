"""
AI & Business Hackathon SPb — Streamlit Demo
=============================================

Быстрый UI для демонстрации AI-решения.

Запуск:
    pip install -r requirements.txt
    cp .env.example .env
    streamlit run app.py
"""

import os
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

# ============================================================
# Настройка страницы
# ============================================================
st.set_page_config(
    page_title="AI & Business Hackathon — Demo",
    page_icon="🤖",
    layout="wide",
)

# ============================================================
# Сайдбар
# ============================================================
with st.sidebar:
    st.title("⚙️ Настройки")

    provider = st.selectbox("LLM провайдер", ["OpenAI", "Anthropic"])

    model = st.selectbox(
        "Модель",
        ["gpt-4o", "gpt-4o-mini"] if provider == "OpenAI"
        else ["claude-sonnet-4-20250514", "claude-haiku-4-20250414"],
    )

    temperature = st.slider("Temperature", 0.0, 1.0, 0.0, 0.1)

    st.divider()
    st.caption("AI & Business Hackathon SPb · 2026")

# ============================================================
# Основной интерфейс
# ============================================================
st.title("🤖 Название вашего решения")
st.markdown("Краткое описание: что делает ваше решение и для кого.")

# --- Чат-интерфейс ---
if "messages" not in st.session_state:
    st.session_state.messages = []

# Показать историю
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Ввод пользователя
if prompt := st.chat_input("Введите сообщение..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # TODO: замените на вызов вашей модели/агента
    with st.chat_message("assistant"):
        with st.spinner("Думаю..."):
            # Пример заглушки — замените на реальный вызов
            response = f"Это заглушка. Вы написали: «{prompt}». Замените на вызов {provider} API."

            # Пример с OpenAI:
            # from openai import OpenAI
            # client = OpenAI()
            # result = client.chat.completions.create(
            #     model=model,
            #     temperature=temperature,
            #     messages=[{"role": m["role"], "content": m["content"]}
            #               for m in st.session_state.messages]
            # )
            # response = result.choices[0].message.content

            st.markdown(response)

    st.session_state.messages.append({"role": "assistant", "content": response})
