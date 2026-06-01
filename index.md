---
layout: default
title: Inicio
nav_order: 1
---

# Práctica 1 — Instalación, ejecución y comparación de modelos LLM locales

Esta práctica corresponde a la asignatura **Prospectiva de la Tecnología** (IE127), impartida en la Universidad Iberoamericana Ciudad de México durante el verano 2026.

El objetivo es instalar Ollama, ejecutar al menos seis modelos LLM locales con los mismos prompts, comparar su desempeño y documentar los hallazgos.

---

## Contenido

- [Prompt 1 — Explicación conceptual](prompt-01.md)
- [Prompt 2 — Embeddings](prompt-02.md)
- [Prompt 3 — Evaluación crítica](prompt-03.md)
- [Prompt 4 — Uso técnico](prompt-04.md)
- [Tabla comparativa de modelos](tabla-comparativa.md)
- [Reflexión](reflexion.md)

---

## Modelos utilizados

Los modelos se descargaron e instalaron con Ollama:

```
ollama pull llama3.2:3b
ollama pull gemma3:4b
ollama pull phi3.5:latest
```

Los tres modelos adicionales serán documentados por el equipo.

---

## Instalación y verificación

Una vez descargados los modelos, se verificó la instalación con `ollama ls`:

![Salida de ollama ls con los modelos instalados](assets/img/practica1/ollama_ls.png)

**Figura 1.** Salida de `ollama ls` mostrando los modelos descargados, sus identificadores y tamaño en disco.

| Modelo          | ID            | Tamaño en disco |
| --------------- | ------------- | --------------- |
| `gemma3:4b`     | a2af6cc3eb7f  | 3.3 GB          |
| `llama3.2:3b`   | a80c4f17acd5  | 2.0 GB          |
| `phi3.5:latest` | 61819fb370a3  | 2.2 GB          |
| *(modelo 4)*    | —             | —               |
| *(modelo 5)*    | —             | —               |
| *(modelo 6)*    | —             | —               |

