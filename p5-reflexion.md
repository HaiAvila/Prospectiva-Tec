---
layout: default
title: Reflexión comparativa
parent: Práctica 5
nav_order: 4
---

# Reflexión comparativa

---

## Preguntas de análisis

### 1. ¿Qué modelo respondió más rápido?

*Por completar con los tiempos registrados en las pruebas.*

Groq API es conocido por su velocidad de inferencia debido al uso de hardware LPU (Language Processing Unit). Se espera que `llama-3.3-70b-versatile` en Groq supere en tokens/s a `llama3.2:3b` en Ollama local, a pesar de ser un modelo 23 veces más grande, porque Groq corre en hardware especializado con aceleración por hardware dedicado. Gemini API incluye latencia de red adicional que puede afectar el tiempo total percibido.

### 2. ¿Qué modelo generó la mejor explicación técnica?

*Por completar tras evaluar las respuestas.*

Se espera que `llama-3.3-70b-versatile` (70B parámetros) genere la explicación más completa y precisa por su mayor capacidad de razonamiento. Sin embargo, `gemini-2.5-flash` puede ofrecer mejor estructura y claridad por sus capacidades de seguimiento de instrucciones. `llama3.2:3b` (3B parámetros) es el más pequeño y probablemente producirá la respuesta más breve y menos detallada.

### 3. ¿El modelo más grande fue siempre mejor?

No necesariamente. El tamaño del modelo (cantidad de parámetros) correlaciona con capacidad de razonamiento, pero no garantiza mejores respuestas en todos los criterios. Un modelo más pequeño bien alineado puede superar a uno más grande en claridad, concisión o seguimiento de instrucciones específicas. Además, los modelos cerrados como `gemini-2.5-flash` no revelan su número de parámetros; su desempeño depende también del proceso de entrenamiento, fine-tuning y RLHF, no solo del tamaño.

### 4. ¿Qué diferencia hubo entre ejecutar localmente y usar una API?

| Aspecto | Ollama local | API remota |
|---|---|---|
| Latencia | Depende del hardware local | Depende de la red + carga del servidor |
| Privacidad | Total — el prompt no sale del equipo | Parcial — el prompt se envía a terceros |
| Costo | Hardware + energía eléctrica | Por token o plan de suscripción |
| Control | Completo (parámetros, modelo, versión) | Limitado por el proveedor |
| Disponibilidad | Offline después de descargar el modelo | Requiere internet |
| Velocidad (tokens/s) | Limitada por GPU/CPU local | Puede ser muy alta con hardware especializado |

### 5. ¿Qué riesgos aparecen al enviar datos a un proveedor externo?

- **Confidencialidad**: los prompts, el historial y el system prompt se transmiten a servidores del proveedor. Para datos sensibles (médicos, legales, empresariales) esto implica riesgo de exposición.
- **Gobernanza**: los proveedores pueden usar los datos para mejorar sus modelos o analítica interna, dependiendo de sus políticas de privacidad.
- **Dependencia**: si el proveedor cambia precios, discontinúa el modelo o experimenta una interrupción, la aplicación falla sin alternativa inmediata.
- **Cumplimiento regulatorio**: en contextos como salud (HIPAA) o datos europeos (GDPR), enviar datos a APIs externas puede ser ilegal sin contratos específicos.

### 6. ¿Qué pasaría si la API cambia de precio o deja de estar disponible?

Este es el riesgo de lock-in. Si la aplicación depende exclusivamente de una API remota y el proveedor aumenta precios o la descontinúa, la funcionalidad se interrumpe. Las estrategias de mitigación incluyen: abstraer el proveedor detrás de una interfaz intercambiable (como se hizo en esta práctica con el campo `provider`), mantener una alternativa local como Ollama, y monitorear los términos de servicio del proveedor.

### 7. ¿En qué casos conviene usar Ollama local?

- Cuando los datos son sensibles o confidenciales.
- Cuando se requiere disponibilidad offline.
- Cuando el presupuesto de tokens es limitado o inexistente.
- Para prototipado y experimentación sin costo recurrente.
- Cuando se necesita control total sobre la versión del modelo y los parámetros de inferencia.

### 8. ¿En qué casos conviene usar una API externa?

- Cuando se necesita capacidad de razonamiento superior a la de modelos pequeños que caben en hardware local.
- Cuando la velocidad de respuesta es crítica y el hardware local es insuficiente.
- Cuando el proyecto requiere modelos multimodales o con capacidades especiales (visión, audio, búsqueda web).
- Para producción donde el escalado automático es necesario.
- Cuando el equipo no puede gestionar la infraestructura de inferencia.

### 9. ¿Qué proveedor fue más fácil de integrar?

Groq resultó el más directo de integrar porque su API es compatible con el estándar OpenAI: mismos campos, misma estructura de `messages`, mismo formato de `usage`. La única diferencia fue el endpoint y el header de autenticación.

Gemini requirió adaptaciones específicas: el rol del asistente es `"model"` en lugar de `"assistant"`, el system prompt va en un campo separado `system_instruction`, y los parámetros de generación usan `camelCase` (`topP`, `maxOutputTokens`).

Ollama es el más simple en configuración inicial (sin API key), pero su API es diferente a los estándares de la industria y requiere que el servidor esté corriendo localmente.

### 10. ¿Qué información técnica no fue publicada por el proveedor?

- **Google (Gemini)**: no publica el número de parámetros de sus modelos, la arquitectura exacta ni los datos de entrenamiento. El contexto máximo y los límites de tasa están documentados, pero las métricas internas de latencia del servidor no son accesibles.
- **Groq**: el hardware LPU es propietario y no se publica el diseño de chip. Los modelos que sirve son abiertos (llama, mixtral), pero la infraestructura de inferencia no lo es.
- En ambos casos, los tokens/s reales del servidor (separados de la latencia de red) no están disponibles en la respuesta de la API, por lo que el cálculo de tokens/s en esta práctica usa el tiempo total de pared (`wall_time`), que incluye la latencia de red.

---

## Conclusión

El chatbot híbrido demuestra que el campo `provider` es una decisión de arquitectura, no solo de configuración. La misma pregunta técnica puede responderse con calidades, velocidades y costos muy distintos según el proveedor elegido. La clave está en entender las implicaciones de cada opción: privacidad, costo, disponibilidad, calidad y facilidad de mantenimiento. Una arquitectura que abstrae el proveedor (como la implementada) permite comparar y migrar entre opciones sin reescribir la lógica de negocio.
