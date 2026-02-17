"""
Примеры цепочек (chains) для типовых задач хакатона.
Раскомментируйте и адаптируйте нужные.
"""

import os
from dotenv import load_dotenv

load_dotenv()


def rag_chain_example():
    """
    RAG (Retrieval-Augmented Generation) — поиск по документам + генерация ответа.
    Подходит для кейсов: AI-ассистент, автоматизация заявок, отчётность.
    """
    from langchain_openai import ChatOpenAI, OpenAIEmbeddings
    from langchain_community.vectorstores import FAISS
    from langchain_core.prompts import ChatPromptTemplate
    from langchain.chains.combine_documents import create_stuff_documents_chain
    from langchain.chains import create_retrieval_chain

    # 1. Загрузите документы
    # from langchain_community.document_loaders import TextLoader
    # loader = TextLoader("path/to/docs.txt")
    # docs = loader.load()

    # 2. Создайте векторное хранилище
    # embeddings = OpenAIEmbeddings()
    # vectorstore = FAISS.from_documents(docs, embeddings)
    # retriever = vectorstore.as_retriever()

    # 3. Создайте цепочку
    # llm = ChatOpenAI(model="gpt-4o")
    # prompt = ChatPromptTemplate.from_template("""
    # Ответь на вопрос на основе контекста:
    # Контекст: {context}
    # Вопрос: {input}
    # """)
    # chain = create_stuff_documents_chain(llm, prompt)
    # rag_chain = create_retrieval_chain(retriever, chain)
    # result = rag_chain.invoke({"input": "Ваш вопрос"})

    print("RAG chain: раскомментируйте код и адаптируйте под ваши данные")


def classification_chain_example():
    """
    Классификация текста — определение категории входящего сообщения.
    Подходит для кейсов: автоматизация заявок, поддержка, HR.
    """
    from langchain_openai import ChatOpenAI
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser

    llm = ChatOpenAI(model="gpt-4o", temperature=0)

    prompt = ChatPromptTemplate.from_template("""
    Классифицируй следующее обращение в одну из категорий:
    - техническая_проблема
    - вопрос_по_продукту
    - жалоба
    - запрос_функции
    - другое

    Обращение: {text}

    Ответь одним словом — категорией.
    """)

    chain = prompt | llm | StrOutputParser()
    result = chain.invoke({"text": "У меня не работает кнопка оплаты на сайте"})
    print(f"Категория: {result}")


if __name__ == "__main__":
    # classification_chain_example()
    # rag_chain_example()
    print("Раскомментируйте нужный пример и запустите.")
