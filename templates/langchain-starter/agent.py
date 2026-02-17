"""
AI & Business Hackathon SPb — LangChain Agent Starter
=====================================================

Шаблон для создания AI-агента на базе LangChain.
Поддерживает OpenAI и Anthropic.

Запуск:
    pip install -r requirements.txt
    cp .env.example .env
    python agent.py
"""

import os
from dotenv import load_dotenv

load_dotenv()


def create_openai_agent():
    """Создать агента на базе OpenAI."""
    from langchain_openai import ChatOpenAI
    from langchain.agents import AgentExecutor, create_tool_calling_agent
    from langchain_core.prompts import ChatPromptTemplate

    llm = ChatOpenAI(model="gpt-4o", temperature=0)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "Ты — полезный AI-ассистент. Отвечай на русском языке."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    # TODO: добавьте свои инструменты
    tools = []

    agent = create_tool_calling_agent(llm, tools, prompt)
    return AgentExecutor(agent=agent, tools=tools, verbose=True)


def create_anthropic_agent():
    """Создать агента на базе Anthropic Claude."""
    from langchain_anthropic import ChatAnthropic
    from langchain.agents import AgentExecutor, create_tool_calling_agent
    from langchain_core.prompts import ChatPromptTemplate

    llm = ChatAnthropic(model="claude-sonnet-4-20250514", temperature=0)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "Ты — полезный AI-ассистент. Отвечай на русском языке."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    # TODO: добавьте свои инструменты
    tools = []

    agent = create_tool_calling_agent(llm, tools, prompt)
    return AgentExecutor(agent=agent, tools=tools, verbose=True)


def main():
    # Выберите провайдера
    provider = os.getenv("LLM_PROVIDER", "openai").lower()

    if provider == "anthropic":
        agent_executor = create_anthropic_agent()
    else:
        agent_executor = create_openai_agent()

    print(f"Агент создан (провайдер: {provider})")
    print("Введите запрос (или 'выход' для завершения):\n")

    while True:
        user_input = input(">>> ")
        if user_input.lower() in ("выход", "exit", "quit"):
            break
        result = agent_executor.invoke({"input": user_input})
        print(f"\n{result['output']}\n")


if __name__ == "__main__":
    main()
