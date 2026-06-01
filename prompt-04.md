---
layout: default
title: Prompt 4 — Uso técnico
nav_order: 5
---

# Prompt 4 — Uso técnico

## Prompt utilizado

```
Dame un ejemplo de cómo un estudiante de ingeniería podría usar un LLM
para apoyar el desarrollo de un proyecto con ESP32, sin sustituir su aprendizaje.
```

---

## llama3.2:3b

![Respuesta de llama3.2:3b al prompt 4](assets/img/practica1/llama4.png)

**Figura 23.** Respuesta de `llama3.2:3b` al prompt 4.

Presentó cinco formas de uso: automatización de código, análisis de datos, documentación, simulación y colaboración. El enfoque fue en casos de uso abstractos sin desarrollar un escenario único y concreto.

---

## phi3.5:latest

![Respuesta de phi3.5 al prompt 4](assets/img/practica1/phi4.png)

**Figura 24.** Respuesta de `phi3.5:latest` al prompt 4.

Desarrolló un escenario completo de IoT con ESP32 para monitoreo ambiental, dividido en cinco fases del proyecto. Fue el más estructurado, con énfasis explícito en que el estudiante debe entender el código antes de usarlo. Incluyó ejemplos de preguntas concretas al LLM.

---

## gemma3:4b

![Respuesta de gemma3:4b al prompt 4](assets/img/practica1/gemma4.png)

**Figura 25.** Respuesta de `gemma3:4b` al prompt 4.

Desarrolló un escenario de monitoreo con ESP32 y DHT22. Fue la respuesta más detallada del grupo de 4B: cuatro fases con preguntas reales al LLM, objetivos de aprendizaje explícitos y principios para usar el LLM sin sustituir el aprendizaje.

---

## qwen2.5:7b

![Respuesta de qwen2.5:7b al prompt 4 — parte 1](assets/img/practica1/qwen4.jpeg)

![Respuesta de qwen2.5:7b al prompt 4 — parte 2](assets/img/practica1/qwen4.1.jpeg)

![Respuesta de qwen2.5:7b al prompt 4 — parte 3](assets/img/practica1/qwen4.2.jpeg)

**Figuras 26, 27 y 28.** Respuesta de `qwen2.5:7b` al prompt 4.

Fue la respuesta más extensa y técnica de todos los modelos. Desarrolló un escenario de control remoto de motor DC con ESP32 mediante Flask, e incluyó código funcional en Python para el servidor y la comunicación serial. Cubrió cuatro etapas: generación de código base, evaluación del código, resolución de problemas e integración con comunicación serial. Es el único que mostró código ejecutable real como parte del ejemplo.

---

## mistral:7b

![Respuesta de mistral:7b al prompt 4](assets/img/practica1/mistral4.jpeg)

**Figura 29.** Respuesta de `mistral:7b` al prompt 4.

Respondió con cuatro formas de uso: generación de documentación, generación de código, manuales de instrucciones y reportes técnicos. La respuesta fue clara pero genérica: no desarrolló un escenario concreto ni incluyó código. Destacó la importancia de que el estudiante comprenda los conceptos básicos antes de usar el LLM.

---

## tinyllama:1.1b-chat-v1-q8_0

![Respuesta de tinyllama al prompt 4](assets/img/practica1/tiny4.jpeg)

**Figura 30.** Respuesta de `tinyllama:1.1b-chat-v1-q8_0` al prompt 4.

Respondió mencionando la arquitectura CRD y una plataforma de software libre, referencias que no corresponden al contexto de ESP32. Confundió conceptos y generó afirmaciones técnicamente incorrectas. La respuesta fue fluida pero imprecisa, lo que ilustra que la coherencia superficial del texto no garantiza la corrección del contenido.

---

[← Prompt 3](prompt-03.md) | [Tabla comparativa →](tabla-comparativa.md)
