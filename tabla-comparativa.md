---
layout: default
title: Tabla comparativa
nav_order: 6
---

# Tabla comparativa de modelos

Los datos se obtuvieron de las model cards en Hugging Face, la biblioteca de Ollama y la salida de `ollama ls` en terminal. Los campos marcados con *(completar)* corresponden a los modelos que documentará el equipo.

> El tamaño en Ollama depende de la cuantización descargada. Obtenlo directamente con `ollama ls` — no uses el número de parámetros como sustituto.

| Modelo | Fabricante / desarrollador | Tipo | Licencia | Parámetros | Idiomas reportados | Requerimiento sugerido para clase | Comando sugerido | Tamaño en Ollama |
|---|---|---|---|---|---|---|---|---|
| `gemma3:4b` | Google DeepMind | LLM instruct multimodal (texto + imagen → texto) | Gemma License | 4B | Más de 140 idiomas | 8 GB RAM o más; Ollama 0.6 o posterior | `ollama run gemma3:4b` | 3.3 GB |
| `llama3.2:3b` | Meta | LLM instruct (texto → texto) | Llama 3.2 Community License | 3.21B | Inglés, alemán, francés, italiano, portugués, hindi, español, tailandés | 8 GB RAM o más | `ollama run llama3.2:3b` | 2.0 GB |
| `phi3.5:latest` | Microsoft | LLM instruct (texto → texto) | MIT | 3.8B | Multilingüe: árabe, chino, inglés, español, francés, alemán, japonés, y otros | 8 GB RAM; puede ejecutarse en CPU | `ollama run phi3.5:latest` | 2.2 GB |
| *(modelo 4)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(de `ollama ls`)* |
| *(modelo 5)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(de `ollama ls`)* |
| *(modelo 6)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(completar)* | *(de `ollama ls`)* |

---

## Instrucciones para completar la tabla

Para llenar las filas de los modelos 4, 5 y 6:

1. Busca el modelo en [huggingface.co](https://huggingface.co) y abre su model card.
2. Identifica: fabricante, tipo, licencia, parámetros, idiomas soportados y requerimientos de hardware.
3. Ejecuta `ollama ls` en tu terminal y anota el tamaño exacto que aparece para tu modelo.
4. Reemplaza cada *(completar)* con el dato real en este archivo, respetando el formato de las filas existentes.

---

[← Prompt 4](prompt-04.md) | [Reflexión →](reflexion.md)
