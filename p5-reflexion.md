---
layout: default
title: Reflexión comparativa
parent: Práctica 5
nav_order: 4
---

# Reflexión comparativa

---

## 1. ¿Qué modelo respondió más rápido?

Groq API con `llama-3.3-70b-versatile` respondió más rápido en tiempo total de pared, a pesar de ser el modelo con más parámetros (70B). Esto se debe al hardware especializado LPU (*Language Processing Unit*) que utiliza Groq, diseñado exclusivamente para acelerar la inferencia de LLMs a nivel de silicio. El resultado contraintuitivo es que un modelo 23 veces más grande que `llama3.2:3b` puede generar tokens más rápido cuando corre en infraestructura optimizada.

Ollama local con `llama3.2:3b` tuvo el menor throughput en tokens/s dentro del hardware disponible (MacBook local), pero su latencia puede ser competitiva en preguntas cortas porque no depende de la red.

Gemini API tuvo el tiempo de pared más alto, lo que refleja la suma de latencia de red más el tiempo de procesamiento del servidor, aunque su `tokens/s` de servidor interno no es visible en la API.

---

## 2. ¿Qué modelo generó la mejor explicación técnica?

`llama-3.3-70b-versatile` generó la explicación más estructurada y técnicamente precisa, incluyendo las ecuaciones de odometría con la notación correcta y un ejemplo numérico apropiado para ingeniería. Su mayor número de parámetros le permite mantener coherencia en respuestas estructuradas con múltiples secciones requeridas.

`gemini-2.5-flash` produjo una respuesta muy bien organizada y clara, con excelente seguimiento de las instrucciones del prompt (los cuatro puntos solicitados). Su punto fuerte fue la claridad conceptual y la adaptación al nivel de ingeniería.

`llama3.2:3b` cumplió con la tarea pero con menor profundidad técnica y ecuaciones más simplificadas, lo esperado para un modelo de 3B parámetros ejecutado localmente.

---

## 3. ¿El modelo más grande fue siempre mejor?

No en todos los criterios. `llama-3.3-70b-versatile` superó en precisión técnica y uso de ecuaciones, pero `gemini-2.5-flash` fue comparable o superior en claridad conceptual y estructura de la respuesta, a pesar de que Google no divulga su número de parámetros.

Esto evidencia que el tamaño en parámetros es solo una variable del rendimiento. El proceso de fine-tuning por instrucciones (instruction tuning), el RLHF (Reinforcement Learning from Human Feedback) y la arquitectura del modelo también determinan la calidad del output. Un modelo más pequeño y bien alineado puede superar a uno más grande en tareas específicas de seguimiento de instrucciones.

---

## 4. ¿Qué diferencia hubo entre ejecutar localmente y usar una API?

| Aspecto | Ollama local | API remota |
|---|---|---|
| Privacidad | Total — el prompt no sale del equipo | El prompt se transmite a servidores externos |
| Costo monetario | Hardware + electricidad (ya amortizados) | Puede tener costo por token en planes de pago |
| Control | Completo: versión del modelo, parámetros, configuración | Limitado por lo que expone el proveedor |
| Disponibilidad offline | Sí, una vez descargado el modelo | No — requiere internet |
| Velocidad real | Limitada por CPU/GPU local | Puede ser muy alta con hardware especializado |
| Configuración inicial | Instalar Ollama + descargar modelo (~2 GB) | Crear cuenta + API key (minutos) |

La diferencia más relevante para uso académico es la **privacidad**: con Ollama el prompt nunca sale del equipo, mientras que con Gemini y Groq el texto enviado pasa por servidores de terceros.

---

## 5. ¿Qué riesgos aparecen al enviar datos a un proveedor externo?

- **Confidencialidad**: el contenido del prompt, el system prompt y el historial completo viajan por internet y llegan a servidores del proveedor. Datos sensibles (pacientes, estudiantes, información empresarial) quedan expuestos.
- **Uso de datos**: algunos proveedores pueden utilizar los prompts para mejorar sus modelos o con fines analíticos, dependiendo de sus términos de servicio. Es necesario revisar la política de datos antes de usarlos.
- **Ataques de interceptación**: aunque las APIs usan HTTPS, en redes inseguras o con configuraciones incorrectas de certificados existe riesgo de intercepción.
- **Regulaciones**: en contextos sujetos a GDPR (Europa), HIPAA (salud en EE.UU.) o normativas equivalentes, enviar datos personales a APIs externas puede implicar obligaciones contractuales o incluso ser ilegal sin acuerdos específicos (DPA, BAA).

Para esta práctica académica estos riesgos se mitigan usando únicamente prompts técnicos genéricos sin datos personales ni institucionales.

---

## 6. ¿Qué pasaría si la API cambia de precio o deja de estar disponible?

Si la aplicación dependiera exclusivamente de una API remota, un cambio de precios o una discontinuación del servicio detendría su funcionamiento. Esto se denomina **lock-in de proveedor**.

La arquitectura implementada en esta práctica mitiga ese riesgo de forma intencional: el campo `provider` abstrae el proveedor detrás de una interfaz unificada. Si Gemini o Groq aumentan sus precios, basta con cambiar el proveedor en el selector sin reescribir ninguna otra parte del sistema. Ollama local actúa como fallback gratuito para prompts no sensibles.

En producción, la estrategia recomendada es: mantener al menos dos proveedores activos y un modelo local como respaldo, con un umbral de costo que active el fallback automáticamente.

---

## 7. ¿En qué casos conviene usar Ollama local?

- Cuando los datos contienen información sensible, personal o confidencial.
- Cuando se necesita operar sin conexión a internet.
- Cuando el presupuesto no permite el costo por token de APIs externas.
- Para prototipado y experimentación sin riesgo de costo inesperado.
- Cuando se requiere control total sobre la versión exacta del modelo y sus parámetros.
- En entornos educativos donde los datos de estudiantes no deben salir de la institución.

La limitación principal es el hardware: modelos de 7B+ parámetros requieren GPU dedicada para velocidad de inferencia práctica.

---

## 8. ¿En qué casos conviene usar una API externa?

- Cuando se necesita capacidad de razonamiento superior a la de modelos pequeños que caben en hardware local.
- Cuando la velocidad de respuesta es crítica para la experiencia del usuario.
- Cuando el proyecto requiere capacidades especiales: visión por computadora, audio, búsqueda web o razonamiento extendido.
- Para producción con múltiples usuarios concurrentes, donde el escalado automático del proveedor es esencial.
- Cuando el equipo no puede gestionar infraestructura de inferencia (mantenimiento, actualizaciones, disponibilidad).
- Para evaluar modelos de frontera (state-of-the-art) sin invertir en hardware.

---

## 9. ¿Qué proveedor fue más fácil de integrar?

**Groq** resultó el más directo: su API es completamente compatible con el estándar OpenAI. El mismo código que integra ChatGPT funciona con Groq cambiando solo el endpoint (`api.groq.com`) y el header de autenticación. Los campos `messages`, `temperature`, `top_p`, `max_tokens` y la estructura de `usage` son idénticos.

**Gemini** requirió tres adaptaciones específicas: el rol del asistente es `"model"` en lugar de `"assistant"`, el system prompt va en un campo separado llamado `system_instruction`, y los parámetros de generación usan `camelCase` (`topP`, `maxOutputTokens`, `thinkingConfig`). Además fue necesario desactivar el modo de razonamiento interno (`thinkingBudget: 0`) para que la respuesta visible no quedara truncada.

**Ollama** es el más simple en términos de configuración inicial (sin API key, sin cuenta), pero su formato de API no sigue el estándar OpenAI, por lo que no es intercambiable directamente con los otros dos.

---

## 10. ¿Qué información técnica no fue publicada por el proveedor?

- **Google (Gemini)**: no divulga el número de parámetros de sus modelos, la arquitectura interna ni los datos de entrenamiento. El contexto máximo y los límites de tasa están documentados, pero la distribución de los tokens de "pensamiento" internos y su impacto exacto en el presupuesto de generación no están completamente especificados en la documentación pública. Esta práctica encontró empíricamente que sin `thinkingBudget: 0`, los tokens de razonamiento interno consumían el presupuesto y dejaban la respuesta visible truncada.

- **Groq**: el hardware LPU es propiedad intelectual de la empresa y no se publica el diseño. Aunque los modelos que sirve son abiertos (Llama, Mixtral), la infraestructura de inferencia es propietaria. Los `tokens/s` reales del servidor no se exponen en la respuesta de la API; el valor calculado en esta práctica usa el tiempo total de pared, que incluye latencia de red.

- En ambos casos, la latencia de servidor aislada de la latencia de red no es accesible desde la API, lo que hace que los valores de `tokens/s` para proveedores remotos sean aproximaciones, no mediciones precisas de throughput del modelo.
