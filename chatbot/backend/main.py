import json
import ollama
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

DEFAULT_MODEL = "gemma3:4b"

app = FastAPI(title="LLM Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    model: str = DEFAULT_MODEL
    stream: bool = False


class ChatMessage(BaseModel):
    role: str
    content: str


class ConversationRequest(BaseModel):
    messages: list[ChatMessage]
    model: str = DEFAULT_MODEL
    stream: bool = False


@app.get("/api/models")
def list_models():
    try:
        models = ollama.list()
        return {"models": [m.model for m in models.models]}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Ollama unavailable: {e}")


@app.post("/api/chat")
def chat(req: ChatRequest):
    if req.stream:
        def generate():
            try:
                for chunk in ollama.chat(
                    model=req.model,
                    messages=[{"role": "user", "content": req.message}],
                    stream=True,
                ):
                    yield f"data: {json.dumps({'content': chunk.message.content})}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        return StreamingResponse(generate(), media_type="text/event-stream")

    try:
        response = ollama.chat(
            model=req.model,
            messages=[{"role": "user", "content": req.message}],
        )
        return {"response": response.message.content, "model": req.model}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/conversation")
def conversation(req: ConversationRequest):
    messages = [{"role": m.role, "content": m.content} for m in req.messages]

    if req.stream:
        def generate():
            try:
                for chunk in ollama.chat(
                    model=req.model,
                    messages=messages,
                    stream=True,
                ):
                    yield f"data: {json.dumps({'content': chunk.message.content})}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        return StreamingResponse(generate(), media_type="text/event-stream")

    try:
        response = ollama.chat(model=req.model, messages=messages)
        return {"response": response.message.content, "model": req.model}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
def health():
    try:
        ollama.list()
        return {"status": "ok", "ollama": "connected"}
    except Exception:
        return {"status": "degraded", "ollama": "unavailable"}
