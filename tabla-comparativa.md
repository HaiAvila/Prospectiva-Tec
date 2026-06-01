---
layout: default
title: Tabla comparativa
nav_order: 6
---

# Tabla comparativa de modelos

Los datos de esta tabla se obtuvieron de las model cards en Hugging Face, la biblioteca de Ollama y la salida de `ollama ls` en terminal. Los campos marcados con *(completar)* corresponden a los modelos documentados por el equipo.

---

## Fabricante, tipo y licencia

| Modelo          | Nombre en Hugging Face                   | Fabricante     | Tipo                                        | Licencia                                    |
| --------------- | ---------------------------------------- | -------------- | ------------------------------------------- | ------------------------------------------- |
| `gemma3:4b`     | `google/gemma-3-4b-it`                   | Google DeepMind | LLM instruct multimodal (texto + imagen → texto) | Gemma License (propietaria de Google)  |
| `llama3.2:3b`   | `meta-llama/Llama-3.2-3B-Instruct`       | Meta           | LLM instruct (texto → texto)                | Llama 3.2 Community License (propietaria de Meta) |
| `phi3.5:latest` | `microsoft/Phi-3.5-mini-instruct`        | Microsoft      | LLM instruct (texto → texto)                | MIT (permisiva, uso libre incluido comercial) |
| *(modelo 4)*    | *(completar)*                            | *(completar)*  | *(completar)*                               | *(completar)*                               |
| *(modelo 5)*    | *(completar)*                            | *(completar)*  | *(completar)*                               | *(completar)*                               |
| *(modelo 6)*    | *(completar)*                            | *(completar)*  | *(completar)*                               | *(completar)*                               |

---

## Parámetros, tamaño y contexto

| Modelo          | Parámetros | Tamaño en Ollama | Ventana de contexto | Arquitectura                        |
| --------------- | ---------- | ---------------- | ------------------- | ----------------------------------- |
| `gemma3:4b`     | 4B         | 3.3 GB           | 128K tokens         | Transformer decoder (autoregresivo) |
| `llama3.2:3b`   | 3.21B      | 2.0 GB           | 128K tokens         | Transformer decoder (autoregresivo) |
| `phi3.5:latest` | 3.8B       | 2.2 GB           | 128K tokens         | Transformer decoder (autoregresivo) |
| *(modelo 4)*    | *(completar)* | *(de `ollama ls`)* | *(completar)*    | *(completar)*                       |
| *(modelo 5)*    | *(completar)* | *(de `ollama ls`)* | *(completar)*    | *(completar)*                       |
| *(modelo 6)*    | *(completar)* | *(de `ollama ls`)* | *(completar)*    | *(completar)*                       |

> El tamaño en Ollama depende de la cuantización descargada y puede diferir del número de parámetros. Obtén el dato exacto con `ollama ls`.

---

## Idiomas, modalidades y requerimientos

| Modelo          | Idiomas reportados                                                        | Entrada         | Salida          | Requerimiento sugerido                       | Comando                    |
| --------------- | ------------------------------------------------------------------------- | --------------- | --------------- | -------------------------------------------- | -------------------------- |
| `gemma3:4b`     | Más de 140 idiomas                                                        | Texto e imagen  | Texto           | 8 GB RAM o más; Ollama 0.6 o posterior       | `ollama run gemma3:4b`     |
| `llama3.2:3b`   | Inglés, alemán, francés, italiano, portugués, hindi, español, tailandés   | Solo texto      | Texto y código  | 8 GB RAM o más                               | `ollama run llama3.2:3b`   |
| `phi3.5:latest` | Multilingüe: árabe, chino, inglés, español, francés, alemán, japonés, y otros | Solo texto  | Texto y código  | 8 GB RAM; puede ejecutarse en CPU            | `ollama run phi3.5:latest` |
| *(modelo 4)*    | *(completar desde model card en Hugging Face)*                            | *(completar)*   | *(completar)*   | *(completar)*                                | *(completar)*              |
| *(modelo 5)*    | *(completar desde model card en Hugging Face)*                            | *(completar)*   | *(completar)*   | *(completar)*                                | *(completar)*              |
| *(modelo 6)*    | *(completar desde model card en Hugging Face)*                            | *(completar)*   | *(completar)*   | *(completar)*                                | *(completar)*              |

---

## Instrucciones para completar la tabla

Para llenar los campos de los modelos 4, 5 y 6:

1. Consulta la **model card** del modelo en [huggingface.co](https://huggingface.co) e identifica: fabricante, tipo, licencia, parámetros, idiomas y modalidades.
2. Ejecuta `ollama ls` en tu terminal y anota el tamaño exacto que aparece para tu modelo.
3. Reemplaza cada *(completar)* con el dato real directamente en este archivo.

---

[← Prompt 4](prompt-04.md) | [Reflexión →](reflexion.md)
