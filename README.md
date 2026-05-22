# ⚛️ Quenching en Centelleadores Plásticos (MDSIM1)

> **"Dos imperfecciones reales, de signo opuesto, que se cancelan entre sí... y nadie las había separado hasta hoy."**

Este repositorio contiene la presentación interactiva del proyecto **MDSIM1** (Grupo de Física Médica UNAL / Blue Physics), dedicada a exponer el estado del arte sobre el quenching de ionización en detectores de centelleo plástico (PSD).

En lugar de usar las típicas diapositivas corporativas estáticas, decidimos diseñar esto desde cero como una **experiencia interactiva web**. Creemos que la física de partículas merece algo mucho más fluido que un PDF.

---

### 🚀 Características Técnicas (The Engine)

Para hacer que la ciencia se sintiera viva y fluida, construimos un micro-motor de presentación a medida usando JavaScript nativo (Vanilla), CSS puro y HTML5:

*   **Física Interactiva en Canvas**: La pantalla de portada cuenta con un sistema de partículas 2D en tiempo real que reacciona con repulsión física dinámica ante los movimientos del puntero.
*   **Navegación Táctil y Cooldown Inercial**: Implementa soporte completo para gestos móviles (swipes), atajos de teclado y scroll con un sistema de enfriamiento (*inertial cooldown*) de 700ms para evitar transiciones accidentales.
*   **Matemáticas Asíncronas (KaTeX)**: Carga diferida e inyección dinámica desde CDN de librerías matemáticas para renderizar ecuaciones complejas en tiempo de ejecución sin penalizar la velocidad de carga de la página.
*   **Modo Proyector de un Toque**: Presionando `[P]` o mediante el HUD, la interfaz entera se reescala vectorialmente a una resolución estándar de proyector (1280x800, 16:10) a través de transformaciones aceleradas por hardware en CSS.

---

### 🕹️ Cómo Visualizarlo y Controles

1. Abre `index.html` directamente en tu navegador (no requiere dependencias pesadas ni servidores web de desarrollo).
2. Atajos de navegación en pantalla:
    *   `[→]` / `[↓]` / `[Espacio]`: Avanzar paso o diapositiva.
    *   `[←]` / `[↑]`: Retroceder paso o diapositiva.
    *   `[0] - [9]`: Ir rápidamente a la diapositiva numérica correspondiente.
    *   `[P]`: Activar/Desactivar el Modo Proyector.
    *   `[H]`: Mostrar/Ocultar el menú flotante de ayuda.

---

### 🔬 Sobre la Investigación

Los detectores de centelleo plástico (PSD) son herramientas fascinantes para la dosimetría en radioterapia clínica dada su equivalencia al agua ($Z_{\text{eff}} \approx 5.7$). No obstante, el efecto de **quenching** (la extinción de la señal de luz por alta densidad de ionización) introduce desviaciones complejas. Este proyecto desglosa cómo este defecto se auto-compensaba accidentalmente con otras variables del sistema y cómo MDSIM1 utiliza simulaciones Monte Carlo para corregirlo y aislarlo de manera definitiva.

---

### ⚡ Behind the Code

Este proyecto fue diseñado y programado por **Paul Martínez**.

Paso los días analizando física de radiaciones y simulaciones Monte Carlo, y las noches escribiendo interfaces interactivas limpias que resuelvan problemas complejos. Si te apasiona la visualización de datos científicos, la ingeniería de software refinada, o buscas un desarrollador que domine tanto la matemática dura como el desarrollo frontend, [hablemos por aquí](https://github.com/PaulThePhysicist) o escríbeme directamente.
