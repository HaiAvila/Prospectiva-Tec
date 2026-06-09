---
layout: default
title: Sage — Chatbot LLM local
nav_order: 4
---

# Sage — Chatbot LLM local

Sage es un chatbot conversacional que corre completamente en local usando **Ollama** como motor de inferencia. No requiere conexión a internet ni claves de API externas.

---

## Arquitectura

```
Navegador (frontend)
        │  HTTP / SSE (streaming)
        ▼
  FastAPI · Python          ← backend  (puerto 8000)
        │
        ▼
  Ollama · REST API         ← motor de inferencia  (puerto 11434)
        │
        ▼
  gemma3:4b (local)         ← modelo LLM
```

| Capa | Tecnología | Descripción |
|---|---|---|
| Frontend | HTML · CSS · JavaScript | Interfaz de chat en el navegador, sin frameworks |
| Backend | Python · FastAPI · uvicorn | API REST con soporte de streaming SSE |
| Inferencia | Ollama | Gestión y ejecución local de modelos LLM |
| Modelo base | `gemma3:4b` | 4B parámetros, Google DeepMind, Gemma License |

---

## Requisitos

- [Ollama](https://ollama.com/) instalado y en ejecución
- Python 3.11 o superior
- El modelo `gemma3:4b` descargado:

```bash
ollama pull gemma3:4b
```

---

## Instalación y ejecución

### 1. Instalar dependencias del backend

```bash
cd chatbot/backend
pip install -r requirements.txt
```

### 2. Iniciar el servidor

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 3. Abrir el frontend

Abrir `chatbot/frontend/index.html` directamente en el navegador.  
El frontend se conecta automáticamente al backend en `http://localhost:8000`.

---

## API

El backend expone los siguientes endpoints:

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado de conexión con Ollama |
| `GET` | `/api/models` | Lista de modelos instalados |
| `POST` | `/api/chat` | Chat con un solo mensaje |
| `POST` | `/api/conversation` | Chat con historial de mensajes |

### Ejemplo — chat simple

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué es un LLM?", "model": "gemma3:4b"}'
```

Respuesta:

```json
{
  "response": "Un LLM (Large Language Model) es un modelo de lenguaje...",
  "model": "gemma3:4b"
}
```

### Ejemplo — conversación con streaming

```bash
curl -X POST http://localhost:8000/api/conversation \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Explica qué es un transformer en dos oraciones."}
    ],
    "model": "gemma3:4b",
    "stream": true
  }'
```

El servidor responde con eventos SSE (`text/event-stream`):

```
data: {"content": "Un"}
data: {"content": " transformer"}
data: {"content": " es..."}
data: [DONE]
```

---

## Interfaz

La interfaz usa un diseño minimalista con las siguientes funciones:

- **Selector de modelo** — cambia entre los modelos instalados en Ollama sin reiniciar el servidor
- **Historial de conversación** — cada mensaje se acumula en el contexto para respuestas coherentes
- **Streaming en tiempo real** — la respuesta aparece token por token con cursor animado
- **Renderizado de Markdown** — el modelo puede responder con bloques de código, listas y negritas
- **Nueva conversación** — limpia el historial y reinicia el contexto
- **Prompts de acceso rápido** — cuatro chips en la pantalla de bienvenida con los prompts de la Práctica 1

---

## Estructura del proyecto

```
chatbot/
├── backend/
│   ├── main.py            ← API FastAPI
│   └── requirements.txt   ← dependencias Python
└── frontend/
    ├── index.html         ← estructura de la interfaz
    ├── style.css          ← diseño minimalista
    └── app.js             ← lógica del chat y streaming
```

---

## Modelo utilizado

El modelo por defecto es `gemma3:4b`. Para cambiar el modelo predeterminado, editar la constante en `backend/main.py`:

```python
DEFAULT_MODEL = "gemma3:4b"
```

Cualquier modelo instalado con `ollama pull` estará disponible automáticamente en el selector de la interfaz.

---

## Notas técnicas

**Streaming SSE:** El frontend usa la API `fetch` con `ReadableStream` para consumir el flujo de eventos del backend. Cada chunk decodificado se acumula en el buffer del mensaje y se re-renderiza como Markdown.

**Historial de conversación:** El frontend mantiene un arreglo `history` con todos los mensajes de la sesión. Cada petición al endpoint `/api/conversation` envía el historial completo al modelo, lo que permite respuestas coherentes en conversaciones de múltiples turnos.

**CORS:** El backend permite cualquier origen (`allow_origins=["*"]`), lo que permite abrir el frontend como archivo local (`file://`) sin errores de política de seguridad del navegador.
