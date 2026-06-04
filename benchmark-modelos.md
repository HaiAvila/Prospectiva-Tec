---
layout: default
title: Parte B — Benchmark de modelos
parent: Práctica 2
nav_order: 2
---

# Parte B — Benchmark de modelos

## Configuración del experimento

Se compararon tres modelos LLM ejecutados localmente con Ollama. Los tres recibieron el mismo prompt durante 100 ciclos cada uno, con parámetros de inferencia idénticos.

**Prompt utilizado:**
```
El usuario describió con voz: 'dibuja un perro sentado junto a una casa'.
Genera un JSON con exactamente estos campos: objects, layout, style, complexity.
Responde SOLO con el JSON, sin explicaciones, sin texto adicional, sin bloques de código.
```

**Parámetros base:**

| Parámetro | Valor |
|---|---|
| `temperature` | 0.7 |
| `top_p` | 0.9 |
| `top_k` | 40 |
| `num_predict` | 160 |
| `repeat_penalty` | 1.1 |
| `num_ctx` | 4096 |
| Ciclos por modelo | 100 |

---

## Resultados — Tabla comparativa

| Modelo | Tiempo promedio (s) | Tokens entrada | Tokens salida | Tokens/s | Calidad promedio | Justificación |
|---|---|---|---|---|---|---|
| `gemma3:4b` | 2.69 ± 1.91 | 65 | 45.92 ± 0.27 | 20.90 ± 2.99 | 10.0 / 10 | Respuestas más cortas y consistentes. Siempre generó JSON válido con los 4 campos requeridos. El menor tiempo promedio del grupo. |
| `phi3.5:latest` | 4.41 ± 1.54 | 76 | 129.9 ± 39.07 | 30.78 ± 3.95 | 5.31 / 10 | El más rápido en tokens por segundo. Alta variabilidad en longitud de respuesta (56–160 tokens), lo que indica que a veces agrega texto fuera del JSON. |
| `qwen2.5:7b` | 6.27 ± 2.54 | 91 | 74.16 ± 26.93 | 12.40 ± 0.75 | 9.65 / 10 | Mayor precisión en la estructura del JSON. El más lento por ser el modelo de mayor tamaño (7B). Tokens/s muy estables (baja desviación estándar). |

---

## Gráficas

### Latencia promedio por modelo

![Latencia promedio por modelo con desviación estándar](assets/img/practica2/latencia_promedio_por_grupo.png)

**Figura 1.** Gemma3:4b fue el modelo más rápido con 2.69 s promedio. Phi3.5 y qwen2.5 tienen mayor latencia pero por razones diferentes: phi genera más tokens, qwen tiene más parámetros.

---

### Tokens por segundo

![Tokens por segundo por modelo](assets/img/practica2/tokens_por_segundo_todos_los_grupos.png)

**Figura 2.** Phi3.5 lidera en tokens/s (30.78) seguido de gemma (20.90) y qwen (12.40). La velocidad de phi disminuye progresivamente en los primeros ciclos y luego se estabiliza, comportamiento típico de calentamiento del modelo en memoria.

---

### Latencia por iteración — gemma3:4b

![Latencia por iteración gemma3:4b](assets/img/practica2/latencia_iteracion_gemma3_4b.png)

**Figura 3.** Gemma muestra un pico de latencia en los primeros ciclos (carga del modelo) y luego se estabiliza. La desviación estándar alta (1.91 s) se explica por esos picos iniciales.

---

### Latencia por iteración — phi3.5:latest

![Latencia por iteración phi3.5](assets/img/practica2/latencia_iteracion_phi3_5_latest.png)

**Figura 4.** Phi3.5 presenta mayor variabilidad en latencia que gemma. Los picos corresponden a los ciclos donde generó respuestas de 160 tokens (límite de `num_predict`), es decir, donde no terminó el JSON de forma natural.

---

### Latencia por iteración — qwen2.5:7b

![Latencia por iteración qwen2.5:7b](assets/img/practica2/latencia_iteracion_qwen2_5_7b.png)

**Figura 5.** Qwen muestra una curva de calentamiento más pronunciada en los primeros 5 ciclos, seguida de estabilización. Su baja desviación en tokens/s (0.75) confirma que una vez cargado es el modelo más predecible en rendimiento.

---

### Latencia vs tokens de salida

![Latencia vs tokens de salida](assets/img/practica2/latencia_vs_tokens_salida.png)

**Figura 6.** La correlación entre tokens de salida y latencia es clara en phi3.5: más tokens equivale a más tiempo. En gemma la correlación es casi nula porque sus respuestas son muy cortas y uniformes.

---

### Boxplot de latencia

![Boxplot de latencia por modelo](assets/img/practica2/boxplot_latencia_por_grupo.png)

**Figura 7.** El boxplot confirma que gemma tiene la distribución de latencia más compacta. Phi y qwen presentan outliers en sus colas superiores.

---

## Análisis

**Gemma3:4b** fue el modelo con mayor calidad promedio (10/10) porque siempre generó JSON válido con los cuatro campos requeridos, y con la menor latencia del grupo. Sus respuestas son cortas pero precisas.

**Qwen2.5:7b** obtuvo calidad casi perfecta (9.65/10) con respuestas más elaboradas, pero al costo de ser el modelo más lento. Su estabilidad en tokens/s lo hace predecible.

**Phi3.5:latest** es el más rápido en tokens/s pero su calidad fue la más baja (5.31/10) porque en muchos ciclos generó texto adicional fuera del JSON requerido, lo que redujo su puntuación heurística.

Para el proyecto, **phi3.5 sigue siendo el modelo seleccionado** porque en producción real se usará un prompt con instrucciones más estrictas y se implementará validación de JSON, lo que mitigará el problema de texto adicional. Su velocidad en tokens/s es la ventaja más importante para mantener baja la latencia total del pipeline.
