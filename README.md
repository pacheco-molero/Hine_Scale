# Hine_Scale

Formulario web interactivo basado en la proforma española HINE
(`vES 08.12.18`).

## Uso

Abra `index.html` en un navegador moderno.

La aplicación permite:

- Cumplimentar los datos obligatorios del examen.
- Calcular automáticamente edad cronológica y edad corregida.
- Seleccionar y resaltar respuestas de la escala.
- Registrar asimetrías y observaciones.
- Descargar un PDF cumplimentado basado en la proforma original.

Para el cálculo de la edad corregida, el usuario aporta fecha de
nacimiento, fecha del examen y edad gestacional al nacer en semanas
y días. Para nacimientos antes de `37+0` semanas, se descuenta el
tiempo hasta `40+0` semanas; desde `37+0`, coincide con la edad
cronológica.
