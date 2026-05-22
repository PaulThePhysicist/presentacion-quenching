# Contexto para la presentación: Quenching en detectores de centelleo plástico
_Archivo de contexto para Antigravity — Mayo 2026_
_Actualizado: 21 mayo 2026 — alineado con guion.txt y documento.tex_

---

## 1. Qué es este archivo

Este documento le da contexto a Antigravity para construir y mantener la
presentación web multi-página. Contiene: descripción de la audiencia,
mapeo guion → slides, datos científicos verificados del documento,
ecuaciones, y criterios de diseño.

**Archivos fuente:**
- `guion.txt` — guion oral completo (~20 min, 9 capítulos + apertura/cierre)
- `documento.tex` — estado del arte formal (9 secciones, ~15 páginas)
- `refs.bib` — 17 referencias bibliográficas

**Estructura de la presentación:**
- 10 slides HTML (index.html + page_1 a page_9)
- Estilos en `styles.css`, navegación en `navigation.js`
- Cada slide = una página HTML separada

---

## 2. La audiencia — cuatro perfiles simultáneos

### María Cristina Plazas
- Matriarca del grupo de física médica de la UNAL
- Alta experiencia clínica en dosimetría (TRS-398, TRS-483)
- El quenching es **nuevo para ella** — primer contacto con este tema
- Necesita: contexto histórico, relevancia clínica, cuándo importa
- Gancho: durante décadas se asumió que el quenching era negligible
  en fotones MV y esa asunción era incorrecta en ciertos escenarios
- **No abrumarla con implementación técnica Monte Carlo**

### Marcos Feijoo
- Dueño de Blue Physics (empresa colombiana de detectores PSD)
- Físico teórico, opera la empresa de forma empírica
- No conoce el formalismo de Birks ni el mecanismo molecular del quenching
- Necesita: entender por qué el quenching importa para Blue Physics
  y cómo una base teórica le da ventaja competitiva
- Gancho: el kB no es una constante fundamental — emerge de la
  geometría molecular (FRET). Un material bien diseñado puede tener
  exactamente el kB que maximiza la compensación en el régimen clínico

### Camilo Sevilla
- Físico experto en Geant4 y dosimetría (Universidad EAFIT)
- Diseñó y corre la plataforma MDSIM1
- Ya conoce la literatura de quenching en detalle
- Necesita: información técnica accionable — valores concretos, trampas
  de implementación, criterios de convergencia
- Gancho: la trampa de Dietz-Laursonn (tamaño de paso en Geant4
  afecta kioq; hay que barrer dRoverRange y verificar convergencia
  del **cociente** Lquenched/Lideal, no de cada término por separado)

### Grupo de Investigación Física Médica UNAL Bogotá
- Estudiantes en formación, nivel variable
- Necesitan una narrativa clara con los conceptos fundamentales
- Las visualizaciones interactivas son especialmente útiles para ellos

---

## 3. Mapeo GUION → SLIDES (estructura definitiva)

El guion define la estructura narrativa. Cada capítulo del guion
corresponde a un slide. Esta es la correspondencia definitiva:

| Slide | Archivo | Guion | Título del slide | Tiempo |
|-------|---------|-------|-----------------|--------|
| 0 | index.html | APERTURA | Portada + setup narrativo | 1:00 |
| 1 | page_1.html | CAP. 1 | El detector ideal y su defecto oculto | 2:30 |
| 2 | page_2.html | CAP. 2 | ¿Qué es el quenching? Del centelleo a la saturación | 2:00 |
| 3 | page_3.html | CAP. 3 | La ley de Birks | 2:00 |
| 4 | page_4.html | CAP. 4 | Más allá de Birks: el mecanismo molecular FRET | 2:00 |
| 5 | page_5.html | CAP. 5 | El espectro que nadie miraba | 1:30 |
| 6 | page_6.html | CAP. 6 | El hallazgo de Gingras: la compensación accidental | 2:30 |
| 7 | page_7.html | CAP. 7 | La contribución de MDSIM1 | 1:30 |
| 8 | page_8.html | CAP. 8 | El espacio de materiales como ventaja competitiva | 2:00 |
| 9 | page_9.html | CAP. 9 + CIERRE | Conclusiones y camino a seguir | 2:00 |

### Cambio estructural crítico: page_2

El slide actual `page_2.html` es un **timeline histórico** (1951 → 2025).
El guion NO tiene un capítulo de timeline. El CAP. 2 del guion es sobre
el **mecanismo físico del quenching** (3 etapas del centelleo, desexcitación
no radiativa, umbral 125 keV). Este slide debe **reconstruirse completamente**
como "¿Qué es el quenching?" siguiendo el CAP. 2 del guion.

Los hitos históricos del timeline actual se redistribuyen:
- Birks 1951 → mencionado en slide 3 (ley de Birks)
- Beddar 1992 → mencionado en slide 1 (consenso de idealidad)
- TRS-483 2018 → mencionado en slide 1 (el factor que asumían = 1)
- Santurio 2019 → mencionado en slide 5 (el espectro)
- Gingras 2025 → slide 6 completo dedicado

---

## 4. Contenido detallado por slide (guion + documento)

### Slide 0 — PORTADA (APERTURA del guion)

**Narrativa oral (1 min):**
- "El PSD ha sido considerado 30+ años como dosímetro casi ideal"
- "TRS-483 decía: factor de corrección = 1. Sin corrección."
- "Resultó que era correcto. Pero por razones completamente distintas."
- "Hay dos efectos de signo opuesto que se cancelan — nadie los había
  separado hasta 2025."
- "Eso justifica MDSIM1."

**Contenido visual (ya existente, mantener):**
- Título, subtítulo "El defecto oculto que nadie corregía"
- Tags de audiencia (teal/amber/purple)
- Canvas de partículas animadas

**Agregar:**
- Frase del guion como subtítulo secundario o en la parte inferior:
  "Dos imperfecciones reales, de signo opuesto, que se cancelan entre sí"

---

### Slide 1 — EL DETECTOR IDEAL Y SU DEFECTO OCULTO (CAP. 1)

**Narrativa oral (2:30):**
- Zeff ≈ 5.7, casi agua-equivalente (vs Si Zeff=14, diamante Zeff=6)
- Volumen sub-mm (Ø1mm × 1mm) — minimiza promediado volumétrico
- Sin corrección por tasa, lineal, tiempo real
- TRS-483: factor de corrección = 1 para PSD en fotones MV
  (para diodos: hasta 10–15% de corrección en campos 0.5×0.5)
- Pero: quenching de ionización. El centelleador absorbe bien pero
  no convierte toda la energía en luz.

**Contenido visual actual:** Mayormente bien.

**Agregar del guion/documento:**
- Dato comparativo TRS-483: correcciones de hasta 10–15% para diodos
  en campos 0.5×0.5 cm² (resaltar que el PSD estaba exento de eso)
- Mención explícita de Beddar 1992: estableció el consenso de que
  quenching tiene "very little effect" en MV → 3 décadas de consenso
- Transición: "Para entender por qué ese supuesto era incorrecto,
  hay que entender qué es el quenching"

---

### Slide 2 — ¿QUÉ ES EL QUENCHING? (CAP. 2) — **RECONSTRUIR COMPLETAMENTE**

**Narrativa oral (2:00):**
- 3 etapas del centelleo:
  1. Partícula cargada deposita energía en el polímero
  2. Energía se transfiere a moléculas del dopante fluorescente
  3. Dopante emite fotones de fluorescencia → fibra óptica → lectura
- Ideal: intensidad luminosa ∝ dosis absorbida
- Quenching: cuando densidad de ionización es alta, moléculas excitadas
  quedan tan cerca que se desexcitan por vías NO radiativas (calor,
  vibración molecular). "El fotón simplemente no nace."
- Electrón 1 MeV: excitaciones dispersas → cada molécula emite → lineal
- Electrón 10 keV: excitaciones apiladas → interferencia → eficiencia cae
- Umbral práctico: **~125 keV** para electrones en centelleadores orgánicos
- Pregunta clave: "¿cuántos electrones por debajo de 125 keV hay en
  un haz clínico de fotones MV?" → se responde en slide 5

**Contenido visual propuesto (nuevo):**
- **Diagrama visual de las 3 etapas del centelleo** (SVG o ilustración):
  Partícula → excitación del polímero → transferencia al dopante → fotón
- **Comparación visual e⁻ alta vs baja energía:**
  - Panel izquierdo: e⁻ 1 MeV → excitaciones separadas → fotones verdes
  - Panel derecho: e⁻ 10 keV → excitaciones densas → calor rojo
- **Indicador del umbral 125 keV** — destacado visualmente
- **Stat card:** "El fotón que nunca nació" (la frase conceptual del
  mecanismo de quenching)

**NOTA:** Este slide reemplaza completamente al timeline. El timeline
se distribuye como contexto en otros slides (ver sección 3).

---

### Slide 3 — LA LEY DE BIRKS (CAP. 3)

**Narrativa oral (2:00):**
- Birks 1951: modelo semiempírico, sigue siendo el estándar
- Ecuación: dL/dx = S·(dE/dx) / [1 + kB·(dE/dx)]
- Dos regímenes: lineal (dE/dx bajo) y saturado (dE/dx alto)
- kB: coeficiente de Birks, en principio constante del material
- Problema: dispersión enorme en la literatura
  - PS: 0.0005–0.094 g·cm⁻²·MeV⁻¹ (¡factor 40!)
  - BCF-12: ambos extremos reportados para la misma fibra
- La dispersión refleja dependencia del método, rango energético,
  código MC, y si se consideran electrones secundarios
- kB de Blue Physics: **no determinado** — MDSIM1 parte de 0.019
  (BCF-60) con análisis de sensibilidad

**Contenido visual actual:** Chart interactivo con slider kB — **mantener**.

**Agregar del documento:**
- Ecuación modificada de Birks (Santurio 2020):
  L = Σᵢ ∫ S/[1+kB·LΔ(Eᵢ)] dEᵢ
  (con LΔ = poder de frenado restringido, Δ = 1 keV)
  → no requiere equilibrio de partículas cargadas
  → cada deposición de energía se pondera individualmente
- Nota sobre dependencia del tamaño de paso (Dietz-Laursonn):
  kB efectivo depende del step size del transporte en MC
- Card con el dato: "kB de Blue Physics: no determinado experimentalmente"

---

### Slide 4 — MÁS ALLÁ DE BIRKS: MECANISMO FRET (CAP. 4)

**Narrativa oral (2:00):**
- Birks tiene grietas: mismo LET, distinta especie → distinta luz
- Ogawa 2018: modelo basado en FRET
  - Calcula posición espacial de cada deposición a escala nanométrica
  - Probabilidad de transferencia dipolo-dipolo: p(r) = 1/[1+(r/Rf)⁶]
  - Rf = radio de Förster = 2–6 nm en centelleadores orgánicos
- A 2Rf: probabilidad < 2% → efecto extremadamente local
- Conexión: alto dE/dx → excitaciones separadas ~Rf → FRET activo
  → fotones perdidos. Bajo dE/dx → separación >> Rf → centelleador ideal
- **Implicación para Blue Physics:** kB no es constante fundamental.
  Es cantidad emergente que depende de la microestructura.
  Cambiar formulación → cambia Rf → cambia susceptibilidad al quenching.
  **El quenching se convierte en parámetro de diseño, no defecto fijo.**

**Contenido visual actual:** Simulador FRET interactivo — **mantener**.

**Agregar del documento:**
- Dato de Pöschl et al. (2020): primera medición model-independent
  de la función de quenching con detector de fibra segmentada
  (protones 30–100 MeV). SCSF-78: cuadrático puro. BC-408: lineal puro.
- Dato de Laplace et al. (2022): 5 modelos evaluados en 4 materiales.
  Ninguno describe protones E iones de carbono con un único set de
  parámetros → Birks es intrínsecamente limitado.

---

### Slide 5 — EL ESPECTRO QUE NADIE MIRABA (CAP. 5)

**Narrativa oral (1:30):**
- Santurio & Andersen 2019: Monte Carlo EGSnrc, BCF-60, TrueBeam 6 MV
- En campo 10×10 cm² a 6 MV: **33–44% de la dosis** proviene de
  electrones con E < 100 keV. Más de un tercio. No es cola marginal.
- Origen: fotones Compton → electrones rápidos → secundarios lentos.
  Radiación dispersa del cabezal y maniquí → fotones de menor energía
  → electrones aún más lentos.
- Fracción NO constante: crece con tamaño de campo (más dispersión)
  y varía con calidad de haz.
- kioq varía **0.6%** entre campos 0.5×0.5 y 10×10 cm²
- kioq varía **~2%** entre 4 MV y 15 MV
- 0.6% → dentro del ruido clínico (por eso no se observó)
- 2% → ya NO despreciable para trazabilidad metrológica

**Contenido visual actual:** Charts con toggle campo/calidad — **mantener**.

**Agregar del guion/documento:**
- Explicación del origen físico de los electrones lentos (cadena
  Compton → secundarios → terciarios)
- Dato de Benmakhlouf & Andreo (2017): endurecimiento espectral en
  campos pequeños (menos fotones dispersos de baja E del cabezal)
  → mayor energía media de electrones en eje central
- Dato de Boivin et al. (2016): 3 centelleadores en 13 calidades
  (20 kVp a ⁶⁰Co). Sensibilidad normalizada a ⁶⁰Co cae hasta **5%**
  por debajo de 100 keV de energía media.
- Callout metrológico: "Si el PSD se usa para verificar kQ, ignorar
  quenching → error sistemático de 1–2%"

---

### Slide 6 — EL HALLAZGO DE GINGRAS (CAP. 6) — El más importante

**Narrativa oral (2:30):**
- Gingras 2025 (Med Phys): trabajo más completo que existe
- PRB-0002 de Hyperscint RP-200 (basado en BCF-60)
- Formalismo: extiende TRS-483 a centelleadores. Dosis en agua =
  lectura × kvol × Pscint × Pwall × kioq
- Pscint: cociente dosis agua / dosis centelleador (misma geometría)
- kioq: cociente luz ideal / luz real (siempre ≥ 1)
- Al ampliar campo: Pscint ↘ (más dispersión interactúa diferente)
  y kioq ↗ (más electrones lentos, más quenching)
- **Se cancelan casi exactamente**: factor total = 0.999–1.002
  para campos 0.6×0.6 a 30×30 cm², incertidumbre 0.5%
- TRS-483 tenía razón → factor ≈ 1. Pero la justificación era
  incorrecta. No es que sea agua-equivalente, es que dos imperfecciones
  se compensan.
- **Pregunta:** ¿esa cancelación es universal o específica del BCF-60?

**Contenido visual actual:** Slider de campo, balance SVG, chart
de compensación — **mantener (es el mejor slide)**.

**Agregar del guion/documento:**
- Ecuación completa del formalismo perturbativo:
  D^f_{w,Q} = kvol · Pscint · Pwall · D^f_{det,Q}
  k^{fclin,fmsr} = (kvol · Pscint · Pwall · kioq)^{fclin,fmsr}
- Detalle: Pwall ≈ 1 para todos los campos; kvol es el único factor
  apreciablemente diferente de 1
- kioq calculado con EGSnrc egs_light_scoring, kB = 0.019, Δ = 1 keV
- Incertidumbres: 1.9% para campo 0.6×0.6, 0.55% para campo 2×2
- Referencia a Casar et al. (2019): ya usaba PSD W1 como referencia
  asumiendo factor unitario — Gingras da la justificación física

---

### Slide 7 — LA CONTRIBUCIÓN DE MDSIM1 (CAP. 7) — **REESTRUCTURAR**

**Narrativa oral (1:30):**
- MDSIM1 no replica Gingras con EGSnrc. La contribución es convertir
  el hallazgo puntual en un **criterio de diseño generalizable**.
- Métrica central: **Cmaterial = Pscint · kioq**
  - Cmaterial ≈ 1 → auto-corregido
  - Cmaterial ≠ 1 → correcciones explícitas necesarias
- Brecha metodológica: todos los cálculos de kioq para PSD en MV han
  sido con EGSnrc. Nadie ha verificado con Geant4.
  - EGSnrc: objeto ausgab + poder de frenado restringido
  - Geant4: G4EmSaturation paso a paso
  - No son equivalentes sin validación cruzada
- Dietz-Laursonn: kB efectivo depende de dRoverRange en Geant4
- MDSIM1 hace esa verificación por primera vez

**Contenido visual actual:** Tabla de 4 brechas + callouts.

**Reestructurar:**
- Reorganizar para poner **Cmaterial** como concepto central (no solo gaps)
- Ecuación de Cmaterial destacada
- Las 4 brechas como tabla secundaria (ya están bien, mantener)
- Agregar: diagrama conceptual Cmaterial ≈ 1 vs ≠ 1
- Agregar: comparación EGSnrc vs Geant4 (implementaciones diferentes)

---

### Slide 8 — ESPACIO DE MATERIALES Y BLUE PHYSICS (CAP. 8)

**Narrativa oral (2:00):**
- Blue Physics Model 11 (Bauer et al. 2026): en electrones 6–12 MeV
  - CV linealidad: 1.3% (1–1000 MU)
  - Independencia tasa de dosis: 1.0%
  - Repetibilidad: 0.3%
  - Isotropía: 0.8%
  - Factor calibración: (2.29 ± 0.01) cGy/μC
  - PDD: concuerda con cámaras ≤ 1 mm en R80 y R50
  - OF (3×3 a 7×7): desviación (0.4 ± 0.8)%
  - Dosis superficie MAE: < 1.5% (RW3), < 1.4% (antropomórfico)
  - Cherenkov: ~50% de señal total en 10×10, ACR = 0.916 ± 0.013
- Pero: eso es en electrones. En fotones MV el factor dominante
  es el quenching, y no tiene la misma caracterización que PRB-0002.
  **No sabemos si el material de Blue Physics exhibe la misma
  compensación Pscint × kioq ≈ 1.**
- Más allá: la simulación permite explorar el espacio de materiales
  (polímero base, dopante, concentración) → diseño sistemático.

**Contenido visual actual:** Arquitectura MDSIM1 + bubble chart +
simulación MC — **mantener mayormente**.

**Agregar del guion/documento:**
- Datos experimentales del Model 11 en una card o tabla
- Énfasis en: "Model 11 no tiene la caracterización en MV photons"
- Espacio de materiales: polímero (PS, PVT, PMMA, polisulfona),
  tipo de dopante (p-terfenil, POPOP, derivados oxazol),
  concentración, aditivos → cada combinación → Zeff + densidad + kB

---

### Slide 9 — CONCLUSIONES + CIERRE (CAP. 9 + CIERRE)

**Narrativa oral (2:00):**
- Herramientas teóricas existen: Birks, Birks modificado, FRET
- Datos de referencia existen: Gingras (PRB-0002/MV), Bauer (Model 11/e⁻),
  Santurio (BCF-60/MV y kV)
- Lo que NO existe: la conexión → MDSIM1

**Roadmap MDSIM1 (5 pasos):**
1. kB = 0 → kioq = 0 (consistencia interna)
2. Reproducir kioq ≈ 0.6% de Santurio (BCF-60, 10×10, 6 MV)
3. Barrido dRoverRange (0.1, 0.05, 0.02, 0.01) → convergencia
   del cociente Lquenched/Lideal
4. Calcular Cmaterial para PRB-0002, comparar con Gingras
5. Extender a materiales alternativos (kB = 0.010, 0.019, 0.025)

**Pregunta central:**
"¿Para qué materiales centelleadores, en qué régimen energético y
para qué geometrías de detector se cumple que Pscint × kioq ≈ 1
en un rango amplio de condiciones clínicas?"

**Cierre oral:** Volviendo al inicio — TRS-483 tenía razón. Pero
la física es más interesante. No es que sea perfecto, es que tiene
dos imperfecciones que se cancelan. MDSIM1 existe para saber si eso
aplica al material de Blue Physics.

**Contenido visual actual:** 3 columnas + cita final — **mantener estructura**.

**Agregar:**
- El roadmap de 5 pasos como checklist visual
- Pregunta central destacada con peso visual máximo
- Frase de cierre: "No accidental. Intencional."

---

## 5. Datos científicos verificados (usar exactamente)

### Quenching en haces MV (Valdes Santurio & Andersen, 2019)
- Fracción de dosis por e⁻ < 100-125 keV en 6 MV, 10×10 cm²: **33–44%**
- Variación kioq entre campos 0.5×0.5 y 10×10 cm²: **~0.6 ± 0.2%**
- Variación kioq entre calidades 4 MV y 15 MV: **~2 ± 0.4%**

### Gingras et al. (2025) — PRB-0002, TrueBeam 6 MV
- Factor total k^(fclin,fmsr): **0.999 a 1.002** para 0.6×0.6 a 30×30 cm²
- Incertidumbre combinada: **0.5%**
- kB usado: **0.019 cm·MeV⁻¹** (BCF-60)
- Pscint: **decrece** al ampliar campo
- kioq: **crece** al ampliar campo
- Producto ≈ 1 (compensación)
- Pwall ≈ 1 para todos los campos
- kioq calculado con EGSnrc egs_light_scoring, Δ = 1 keV
- Incertidumbre: 1.9% (0.6×0.6 cm²), 0.55% (2×2 cm²)

### Blue Physics Model 11 (Bauer et al., 2026) — electrones 6–12 MeV
- CV linealidad: **1.3%** (1–1000 MU)
- Independencia de tasa de dosis: **1.0%**
- Repetibilidad: **0.3%**
- Isotropía: **0.8%**
- Factor de calibración: **(2.29 ± 0.01) cGy/μC**
- R80 y R50 vs cámaras de referencia: **< 1 mm**
- OF (3×3 a 7×7 cm²): desviación media **(0.4 ± 0.8)%**
- Dosis superficie MAE (RW3): **< 1.5%**
- Dosis superficie MAE (antropomórfico): **< 1.4%**
- Cherenkov en 10×10 cm²: **~50% de señal total**
- ACR: **0.916 ± 0.013**
- Volumen sensible: **Ø1 mm × 1 mm** (0.785 mm³)

### Constantes de Birks kB en la literatura
- BCF-60 (poliestireno): **0.019 cm·MeV⁻¹**
- PVT (rango): **0.002–0.021 g·cm⁻²·MeV⁻¹**
- Poliestireno (BCF-12): **0.0005–0.094 g·cm⁻²·MeV⁻¹** (factor 40)
- Blue Physics: **no determinado** — brecha abierta

### Umbral físico del quenching
- e⁻ **< ~125 keV**: quenching apreciable
- e⁻ **> 125 keV**: respuesta lineal

### FRET (Ogawa et al. 2018)
- Radio de Förster: **Rf = 2–6 nm** en centelleadores orgánicos
- A r = Rf: p = 50%; a r = 2Rf: p < 2%
- Material: NE-102A (= EJ-212 = BC-400), Rf = 4 nm

### Boivin et al. (2016)
- 3 centelleadores (BCF-10, BCF-12, BCF-60) en 13 calidades (20 kVp a ⁶⁰Co)
- Sensibilidad normalizada a ⁶⁰Co cae hasta **5%** debajo de 100 keV

### Pöschl et al. (2020)
- Medición model-independent con detector de fibra segmentada
- SCSF-78: término cuadrático puro (Chou)
- BC-408: término lineal puro
- Protones 30–100 MeV

### Laplace et al. (2022)
- 5 modelos (Birks, Chou, Hong, Yoshida, Voltz) en 4 materiales
- Ninguno describe protones + iones de carbono con parámetros únicos

---

## 6. Ecuaciones del documento (todas)

### Ec. 1 — Ley de Birks (1951)
$$\frac{dL}{dx} = \frac{S \cdot \frac{dE}{dx}}{1 + k_B \cdot \frac{dE}{dx}}$$

### Ec. 2 — Birks modificado (Santurio 2020)
$$L = \sum_{i=1}^{n} \int_{E_{\min}}^{E_{\max}} \frac{S}{1 + k_B \cdot L_\Delta(E_i)} \, dE_i$$
(LΔ = poder de frenado restringido, Δ = 1 keV)

### Ec. 3 — Probabilidad FRET (Ogawa 2018)
$$p(r) = \frac{1}{1 + \left(\frac{r}{R_f}\right)^6}$$

### Ec. 4 — Cadena de perturbación
$$D^f_{w,Q} = k_{\text{vol}} \cdot P_{\text{scint}} \cdot P_{\text{wall}} \cdot D^f_{\text{det},Q}$$

### Ec. 5 — Factor de corrección de salida de campo
$$k^{f_{\text{clin}},f_{\text{msr}}}_{Q_{\text{clin}},Q_{\text{msr}}} = \left(k_{\text{vol}} \cdot P_{\text{scint}} \cdot P_{\text{wall}} \cdot k_{\text{ioq}}\right)^{f_{\text{clin}},f_{\text{msr}}}_{Q_{\text{clin}},Q_{\text{msr}}}$$

### Ec. 6 — Métrica de compensación del material
$$C_{\text{material}} = P_{\text{scint}}^{f_{\text{clin}},f_{\text{ref}}} \cdot k_{\text{ioq}}^{f_{\text{clin}},f_{\text{ref}}}$$

---

## 7. Referencias bibliográficas (17 total)

| Clave | Referencia |
|-------|-----------|
| Birks 1951 | Birks JB. Proc Phys Soc A. 1951;64(10):874-877 |
| Beddar 1992 | Beddar AS, Mackie TR, Attix FH. Phys Med Biol. 1992;37(10):1883-1900 |
| TRS-483 2018 | Palmans H et al. Med Phys. 2018;45(11):e1123-e1145 |
| Santurio 2019 | Valdes Santurio G, Andersen CE. Radiat Meas. 2019;129:106200 |
| Santurio 2020 | Valdes Santurio G, Pinto M, Andersen CE. Radiat Meas. 2020;131:106222 |
| Gingras 2025 | Gingras L et al. Med Phys. 2025;52(6):4844-4861 |
| Ogawa 2018 | Ogawa T, Yamaki T, Sato T. PLOS ONE. 2018;13(8):e0202011 |
| Bauer 2026 | Bauer CJ et al. J Appl Clin Med Phys. 2026;27:e70623 |
| Dietz-Laursonn 2016 | arXiv:1612.05162 |
| Poon 2005 | Poon E, Verhaegen F. Med Phys. 2005;32(6):1696-1711 |
| Boivin 2016 | Boivin J et al. Phys Med Biol. 2016;61(15):5569-5586 |
| Benmakhlouf 2017 | Benmakhlouf H, Andreo P. Med Phys. 2017;44(2):713-724 |
| Pöschl 2020 | Pöschl T et al. NIM A. 2020;988:164865 |
| Laplace 2022 | Laplace TA et al. Mater Adv. 2022;3(14):5871-5881 |
| Casar 2019 | Casar B et al. Med Phys. 2019;46(2):944-963 |
| Papaconstadopoulos 2014 | Papaconstadopoulos P et al. PMB. 2014;59(19):5937-5952 |
| Azangwe 2014 | Azangwe G et al. Med Phys. 2014;41(7):072103 |

---

## 8. Criterios de diseño — NO CAMBIAR

- **Tipografía títulos:** DM Serif Display
- **Tipografía ecuaciones/labels:** DM Mono
- **Tipografía cuerpo:** Instrument Sans
- **Fondo:** near-black (`#0d0f10`)
- **Acento primario:** teal (`#2dd4b0`)
- **Acento secundario:** amber (`#f0a832`)
- **Acento de alerta:** rojo (`#e85555`)
- **Acento adicional:** azul (`#5b9cf6`), púrpura (`#a78bfa`)
- **Estilo:** editorial científica oscura, premium, no corporativa
- **Viewport proyector:** 1280×800 (16:10)

---

## 9. Contexto del proyecto MDSIM1

**¿Qué es MDSIM1?**
Plataforma de simulación Monte Carlo en Geant4 (Camilo Sevilla, EAFIT)
para calcular separadamente Pscint y kioq de detectores de centelleo
plástico en haces clínicos de fotones y electrones.

**Arquitectura:**
- Fuente: Phase space TrueBeam 6 MV (IAEA), campos 0.5×0.5 a 30×30 cm²
- Maniquí: Paralelepípedo de agua con retroalimentación completa
- Detectores: cube, cylinder, sphere (configurables) + model11 (GDML Blue Physics)
- Física: G4EmStandardPhysics_option4 (WentzelVI, subshell, LPM)
- Modo Birks: G4EmSaturation, doble acumulador Lideal/Lquenched correlado
  kioq = ΣEdep,i / Σ(Edep,i · fBirks,i)
- Modo Óptico: G4OpticalPhysics (centelleo, absorción, Cherenkov, fronteras)

**Pregunta científica central:**
¿Es la compensación Pscint · kioq ≈ 1 observada por Gingras en el
PRB-0002 una propiedad universal de los centelleadores plásticos, o
depende de la composición específica del material?

**Estado actual (mayo 2026):**
- ✅ Phase space TrueBeam 6 MV funcionando
- ✅ Maniquí de agua y módulos de detector (cube, cylinder, model11)
- ✅ Scoring de dosis absorbida
- 🔄 Implementación del modo Birks (G4EmSaturation) — en curso
- ⬜ Validación kioq vs EGSnrc
- ⬜ Cálculo Cmaterial para múltiples composiciones
- ⬜ Manuscrito Q1

**Blue Physics:**
Empresa colombiana — detectores PSD de nueva generación.
Model 11 caracterizado por Bauer et al. (2026) en electrones.
En fotones MV: kB propio no evaluado → brecha que MDSIM1 cierra.
