---
layout: default
title: Reflexión
nav_order: 7
---

# Reflexión

Las siguientes preguntas se responden con base en la experiencia del equipo durante la instalación, ejecución y comparación de los seis modelos.

---

## ¿Qué modelo fue más fácil de instalar y ejecutar?

Los tres modelos documentados por nuestra parte se instalaron exactamente igual con `ollama pull`, sin diferencias en el proceso. Considerando el tamaño de descarga, `llama3.2:3b` fue el más ligero con 2.0 GB, lo que implicó menos tiempo de descarga y menor consumo de espacio en disco.

*(El equipo puede ampliar esta respuesta considerando los modelos 4, 5 y 6 una vez documentados.)*

---

## ¿Qué modelo respondió mejor en español?

Los tres modelos respondieron en español de forma fluida y comprensible. `gemma3:4b` produjo el español más natural y contextualizado. `phi3.5:latest` respondió con mayor densidad técnica. `llama3.2:3b` fue el más estructurado y directo.

*(Completar con la evaluación de los modelos 4, 5 y 6.)*

---

## ¿Qué diferencia observaste entre un modelo pequeño y uno más grande?

Aunque los tres modelos son pequeños (entre 3B y 4B parámetros), se observó que `gemma3:4b`, con más parámetros y mayor tamaño en disco, tendió a producir respuestas más extensas y detalladas. La diferencia fue más notoria en el prompt 2 (embeddings) y el prompt 4 (ESP32), donde gemma y phi generaron ejemplos de código más completos que llama.

En general, más parámetros no garantiza mejor calidad en todos los casos, pero sí se asocia con respuestas más largas y con mayor cobertura del tema.

*(Completar con observaciones del equipo al comparar modelos de diferentes tamaños.)*

---

## ¿Qué importancia tiene la licencia del modelo?

La licencia define qué se puede hacer con el modelo más allá del uso personal. Gemma y Llama tienen licencias propietarias de sus fabricantes que restringen redistribución y uso comercial sin autorización. Phi-3.5 tiene licencia MIT, que permite usarlo libremente en cualquier tipo de proyecto, incluidos productos comerciales.

En un contexto académico esto puede no ser determinante, pero en proyectos profesionales o startups es un factor crítico. Usar un modelo con licencia restrictiva en un producto sin leer las condiciones puede tener consecuencias legales.

*(Completar con reflexión del equipo sobre las licencias de los modelos 4, 5 y 6.)*

---

## ¿Por qué no debe usarse un LLM como única fuente académica?

Los LLM generan respuestas estadísticamente plausibles, no verificadas. Pueden producir información incorrecta con apariencia de autoridad, fabricar referencias inexistentes o reproducir sesgos del conjunto de entrenamiento. Ninguno de los seis modelos cita fuentes en sus respuestas; toda la información que generan requiere verificación independiente.

Usar un LLM como fuente primaria en un trabajo académico equivale a citar una fuente que no puede consultarse ni rastrearse. La fluidez del texto no es garantía de precisión del contenido.

---

## ¿Qué ventajas y limitaciones tiene ejecutar modelos localmente?

**Ventajas:**

- Los datos no salen del equipo (privacidad).
- Sin costo por uso de API.
- Funciona sin conexión a internet una vez descargado el modelo.
- Control total sobre el modelo: versión, cuantización, configuración.

**Limitaciones:**

- Consume recursos del equipo (RAM y almacenamiento).
- La capacidad es menor comparada con modelos en la nube de mayor escala.
- En equipos sin GPU dedicada, la velocidad de respuesta puede ser significativamente menor.
- La instalación y configuración inicial requiere conocimiento técnico básico.

---

[← Tabla comparativa](tabla-comparativa.md) | [Inicio](index.md)
