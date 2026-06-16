---
layout: default
title: Pruebas y métricas
parent: Práctica 5
nav_order: 3
---

# Pruebas y métricas

Se utilizó el mismo prompt en los tres proveedores para una comparación justa:

> **Prompt de prueba:**
> ```
> Explica qué es la odometría diferencial en un robot móvil de dos ruedas.
> Incluye:
> 1. explicación conceptual;
> 2. ecuaciones básicas;
> 3. ejemplo para estudiantes de ingeniería;
> 4. una limitación práctica.
> Responde en máximo 250 palabras.
> ```

**Configuración aplicada:** temperature = 0.7 · top_p = 0.9 · max_tokens = 300 · Perfil: Copiloto de robótica móvil

---

## Capturas de pantalla

### Prueba 1 — Ollama local · `llama3.2:3b`

![Prueba 1 — Ollama](../assets/img/practica5/prueba1-ollama.png)

---

### Prueba 2 — Gemini API · `gemini-2.5-flash`

![Prueba 2 — Gemini](../assets/img/practica5/prueba2-gemini.png)

---

### Prueba 3 — Groq API · `llama-3.3-70b-versatile`

![Prueba 3 — Groq](../assets/img/practica5/prueba3-groq.png)

---

## Tabla de caracterización

| Variable | Ollama local | Gemini API | Groq API |
|---|---|---|---|
| Proveedor | Ollama | Google | Groq |
| Modelo | `llama3.2:3b` | `gemini-2.5-flash` | `llama-3.3-70b-versatile` |
| Tipo | Abierto / local | Cerrado / remoto | Abierto / remoto |
| Parámetros | 3B aprox. | No divulgado | 70B |
| Contexto máximo | 128 K tokens | 1 M tokens | 128 K tokens |
| Tokens entrada | — | — | — |
| Tokens salida | — | — | — |
| Tokens totales | — | — | — |
| Tiempo total (s) | — | — | — |
| Tokens/s | — | — | — |
| ¿Requiere internet? | No | Sí | Sí |
| ¿Requiere API key? | No | Sí | Sí |
| ¿Tiene costo? | Hardware local | Tier gratuito limitado / pago | Free plan limitado / pago |
| Privacidad | Alta | Depende del proveedor | Depende del proveedor |
| Facilidad de integración | Media | Alta | Alta |

*Las celdas con "—" se completarán con los valores registrados durante las pruebas.*

---

## Tabla de evaluación cualitativa

Escala: 1 = deficiente · 2 = básico · 3 = aceptable · 4 = bueno · 5 = excelente

| Criterio | Ollama local | Gemini API | Groq API |
|---|---|---|---|
| Claridad conceptual | — | — | — |
| Precisión técnica | — | — | — |
| Uso correcto de ecuaciones | — | — | — |
| Calidad del ejemplo | — | — | — |
| Nivel adecuado para ingeniería | — | — | — |
| Identificación de limitaciones | — | — | — |
| Alucinaciones o errores | — | — | — |
| Utilidad final | — | — | — |

*Las celdas con "—" se completarán después de ejecutar las pruebas.*
