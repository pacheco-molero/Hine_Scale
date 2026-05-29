(function () {
  "use strict";

  const PAGE_WIDTH = 595.32;
  const PAGE_HEIGHT = 841.92;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const TERM_GESTATION_DAYS = 40 * 7;
  const PRETERM_LIMIT_DAYS = 37 * 7;
  const ITEM_NOTE_MAX_LENGTH = 30;
  const MILESTONE_OBSERVED_MAX_LENGTH = 18;
  const MILESTONE_AGE_MAX_LENGTH = 8;

  const columns = {
    cranial: { "3": [155, 86], "2": [241, 21], "1": [262, 85], "0": [347, 78], output: [425, 64], comment: [489, 71] },
    posture: { "3": [106, 99], "2": [205, 43], "1": [248, 106], "0": [354, 135], output: [489, 21], comment: [510, 50] },
    movement: { "3": [135, 77], "2": [212, 29], "1": [241, 92], "0": [333, 142], output: [475, 35], comment: [510, 50] },
    tone: { "3": [163, 106], "2": [269, 57], "1": [326, 78], "0": [404, 71], output: [475, 35], comment: [510, 50] },
    reflex: { "3": [177, 71], "2": [248, 71], "1": [319, 70], "0": [389, 86], output: [475, 35], comment: [510, 50] },
    behaviour: { "1": [106, 71], "2": [177, 56], "3": [233, 72], "4": [305, 63], "5": [368, 57], "6": [425, 64], comment: [489, 71] }
  };

  const intermediate = "Respuesta intermedia según la indicación de la proforma.";

  function scoreOptions(group, descriptions) {
    return ["3", "2", "1", "0"].map(function (score) {
      return {
        value: score,
        title: "Puntuación " + score,
        text: descriptions[score],
        rect: { x: group[score][0], width: group[score][1] }
      };
    });
  }

  const sections = [
    {
      id: "cranial",
      title: "Evaluación de la función de los pares craneales",
      subtitle: "Puntuación máxima: 15",
      max: 15,
      page: 0,
      columns: columns.cranial,
      scored: true,
      rows: [
        { id: "facial", label: "Apariencia facial", top: 539, height: 57, descriptions: { "3": "Sonríe o reacciona a los estímulos cerrando los ojos y haciendo muecas.", "2": intermediate, "1": "Cierra los ojos, pero no con firmeza; pobre expresión facial.", "0": "Apariencia inexpresiva; no reacciona a los estímulos." } },
        { id: "eyes", label: "Movimientos oculares", top: 596, height: 54, descriptions: { "3": "Movimientos oculares conjugados normales.", "2": intermediate, "1": "Desviación intermitente o movimientos anormales.", "0": "Desviación continua o movimientos anormales." } },
        { id: "visual", label: "Respuesta visual", top: 650, height: 35, descriptions: { "3": "Sigue el objeto en un arco completo.", "2": intermediate, "1": "Sigue el objeto en un arco incompleto o asimétrico.", "0": "No sigue el objeto." } },
        { id: "auditory", label: "Respuesta auditiva", top: 685, height: 42, descriptions: { "3": "Responde al estímulo desde ambos lados.", "2": intermediate, "1": "Reacción dudosa o responde asimétricamente.", "0": "No responde." } },
        { id: "sucking", label: "Succión / deglución", top: 727, height: 67, descriptions: { "3": "Buena succión y deglución.", "2": intermediate, "1": "Pobre succión y/o deglución.", "0": "No hay reflejo de succión ni deglución." } }
      ]
    },
    {
      id: "posture",
      title: "Evaluación de la postura",
      subtitle: "Observe las asimetrías. Puntuación máxima: 18",
      max: 18,
      page: 1,
      columns: columns.posture,
      scored: true,
      rows: [
        { id: "head", label: "Cabeza en sedestación", top: 104, height: 67, descriptions: { "3": "Recta, en la línea media.", "2": intermediate, "1": "Ligeramente inclinada hacia un lado, atrás o delante.", "0": "Marcadamente inclinada hacia un lado, atrás o delante." } },
        { id: "trunk", label: "Tronco en sedestación", top: 171, height: 62, descriptions: { "3": "Recto.", "2": intermediate, "1": "Ligeramente curvado o inclinado lateralmente.", "0": "Muy curvado, hiperextendido o inclinado lateralmente." } },
        { id: "arms", label: "Brazos en reposo", top: 233, height: 65, descriptions: { "3": "Posición neutra, centrados o ligeramente flexionados.", "2": intermediate, "1": "Ligera rotación interna/externa o postura distónica intermitente.", "0": "Marcada rotación o postura distónica/hemiparética." } },
        { id: "hands", label: "Manos", top: 298, height: 31, descriptions: { "3": "Manos abiertas.", "2": intermediate, "1": "Pulgar aducto o manos cerradas intermitentemente.", "0": "Pulgar aducto o manos cerradas persistentemente." } },
        { id: "legs", label: "Piernas", top: 329, height: 161, descriptions: { "3": "Sedestación con espalda recta o ligeramente inclinada; piernas neutras.", "2": intermediate, "1": "Rodillas algo flexionadas o rotación interna/externa.", "0": "Incapacidad para sedestación con piernas estiradas o marcada alteración fija." } },
        { id: "feet", label: "Pies", top: 490, height: 93, descriptions: { "3": "Centrados en posición neutra; dedos rectos.", "2": intermediate, "1": "Ligera rotación o tendencia intermitente a puntillas/flexión/extensión.", "0": "Marcada rotación o tendencia persistente." } }
      ]
    },
    {
      id: "movement",
      title: "Evaluación de los movimientos",
      subtitle: "Puntuación máxima: 6",
      max: 6,
      page: 1,
      columns: columns.movement,
      scored: true,
      rows: [
        { id: "quantity", label: "Cantidad", top: 661, height: 37, descriptions: { "3": "Normales.", "2": intermediate, "1": "Excesivos o lentos.", "0": "Mínimos o nulos." } },
        { id: "quality", label: "Calidad", top: 698, height: 81, descriptions: { "3": "Libres, alternantes y suaves.", "2": intermediate, "1": "Bruscos, entrecortados o con ligero temblor.", "0": "Espasmódicos, atáxicos, distónicos u otros movimientos muy anormales." } }
      ]
    },
    {
      id: "tone",
      title: "Evaluación del tono",
      subtitle: "Puntuación máxima: 24",
      max: 24,
      page: 2,
      columns: columns.tone,
      scored: true,
      rows: [
        { id: "scarf", label: "Signo de la bufanda", top: 104, height: 76, descriptions: { "3": "Rango esperado.", "2": intermediate, "1": "Respuesta alterada leve/moderada.", "0": "Respuesta marcadamente alterada." } },
        { id: "shoulder", label: "Elevación pasiva del hombro", top: 180, height: 77, descriptions: { "3": "Resistencia superable.", "2": "Dificultad para vencer la resistencia.", "1": "No existe resistencia.", "0": "Resistencia no superable." } },
        { id: "pronation", label: "Pronación / supinación", top: 257, height: 65, descriptions: { "3": "Completas, sin resistencia.", "2": intermediate, "1": "Resistencia superable para completar el movimiento.", "0": "Pronación completa, supinación no posible o marcada resistencia." } },
        { id: "adductors", label: "Aductores de cadera", top: 322, height: 66, descriptions: { "3": "Rango 150-80 grados.", "2": "150-160 grados.", "1": "Más de 170 grados.", "0": "Menos de 80 grados." } },
        { id: "popliteal", label: "Ángulo poplíteo", top: 388, height: 96, descriptions: { "3": "Rango 150-100 grados.", "2": "150-160 grados.", "1": "Aproximadamente 90 o más de 170 grados.", "0": "Menos de 80 grados." } },
        { id: "ankle", label: "Dorsiflexión de tobillo", top: 484, height: 56, descriptions: { "3": "Rango 30-85 grados.", "2": "20-30 grados.", "1": "Menos de 20 o 90 grados.", "0": "Más de 90 grados." } },
        { id: "pull", label: "\"Pull to sit\"", top: 540, height: 46, descriptions: { "3": "Respuesta óptima representada en la proforma.", "2": intermediate, "1": "Respuesta alterada representada en la proforma.", "0": "Respuesta claramente alterada representada en la proforma." } },
        { id: "ventral", label: "Suspensión ventral", top: 586, height: 66, descriptions: { "3": "Respuesta óptima representada en la proforma.", "2": intermediate, "1": "Respuesta alterada representada en la proforma.", "0": "Respuesta claramente alterada representada en la proforma." } }
      ]
    },
    {
      id: "reflex",
      title: "Reflejos y reacciones",
      subtitle: "Puntuación máxima: 15",
      max: 15,
      page: 3,
      columns: columns.reflex,
      scored: true,
      rows: [
        { id: "protectiveArm", label: "Protección del brazo", top: 104, height: 78, descriptions: { "3": "Brazo y mano extendidos.", "2": intermediate, "1": "Brazo semiflexionado.", "0": "Brazo completamente flexionado." } },
        { id: "vertical", label: "Suspensión vertical", top: 182, height: 89, descriptions: { "3": "Pataleo simétrico y alternante.", "2": intermediate, "1": "Una pierna patalea más o pataleo pobre.", "0": "No patalea o adopta posición en tijera." } },
        { id: "lateral", label: "Suspensión lateral", top: 271, height: 82, descriptions: { "3": "Respuesta óptima representada en la proforma.", "2": intermediate, "1": "Respuesta alterada representada en la proforma.", "0": "Respuesta claramente alterada representada en la proforma." } },
        { id: "parachute", label: "Paracaídas", top: 353, height: 71, descriptions: { "3": "Respuesta adecuada después de los 6 meses.", "2": intermediate, "1": "Respuesta alterada después de los 6 meses.", "0": "Sin respuesta apropiada." } },
        { id: "tendons", label: "Reflejos tendinosos", top: 424, height: 63, descriptions: { "3": "Se obtienen con facilidad.", "2": "Ligeramente exaltados.", "1": "Exaltados.", "0": "Clono o ausencia." } }
      ]
    }
  ];

  const milestoneColumns = [
    { x: 106, width: 64 },
    { x: 170, width: 78 },
    { x: 248, width: 78 },
    { x: 326, width: 85 },
    { x: 411, width: 78 }
  ];

  const supplementalSections = [
    {
      id: "milestones",
      title: "Sección 2 - Hitos motores",
      subtitle: "No puntúa; observe las asimetrías.",
      page: 4,
      scored: false,
      allowAsymmetry: true,
      comment: { x: 489, width: 71 },
      rows: [
        { id: "motorHead", label: "Control cefálico", top: 80, height: 75, values: ["Incapaz de mantener la cabeza erguida", "Tambaleante", "Mantiene la posición erguida todo el tiempo"] },
        { id: "sitting", label: "Sedestación", top: 155, height: 64, values: ["No puede mantenerse sentado", "Con soporte en caderas", "Se apoya", "Sedestación estable", "Pivota (rota)"] },
        { id: "grasp", label: "Agarre voluntario", top: 219, height: 55, values: ["No agarra", "Usa toda la mano", "Índice y pulgar con agarre inmaduro", "Agarre con pinza"] },
        { id: "kicking", label: "Habilidad para patalear en supino", top: 274, height: 61, values: ["No patalea", "Patalea horizontalmente", "Eleva las piernas", "Se toca las piernas", "Se toca los dedos"] },
        { id: "rolling", label: "Volteo", top: 335, height: 45, values: ["No voltea", "Voltea hacia un lado", "De prono a supino", "De supino a prono"] },
        { id: "crawling", label: "Gateo", top: 380, height: 65, values: ["No levanta la cabeza", "Sobre los codos", "Sobre las manos extendidas", "Gatea sobre el abdomen", "Gatea sobre manos y rodillas"] },
        { id: "standing", label: "Bipedestación", top: 445, height: 45, values: ["No soporta el peso", "Soporta su peso", "Se mantiene de pie con soporte", "Se mantiene de pie sin ayuda"] },
        { id: "walking", label: "Marcha", top: 490, height: 45, values: ["Sin hito observado", "Rebota", "Camina con apoyo", "Camina independiente"] }
      ]
    },
    {
      id: "behaviour",
      title: "Sección 3 - Comportamiento",
      subtitle: "No forma parte de la puntuación óptima.",
      page: 4,
      scored: false,
      behaviour: true,
      comment: { x: 489, width: 71 },
      rows: [
        { id: "consciousness", label: "Estado de consciencia", top: 601, height: 35, values: ["No despierta", "Soñoliento", "Duerme pero se despierta fácilmente", "Despierto sin interés", "Pierde el interés", "Mantiene el interés"] },
        { id: "emotional", label: "Estado emocional", top: 636, height: 41, values: ["Irritable, inconsolable", "Irritable, consolable", "Irritable al acercarse", "No contento o triste", "Contento y sonriente"] },
        { id: "social", label: "Interacción social", top: 677, height: 27, values: ["Evita o se retira", "Vacilante", "Acepta el acercamiento", "Amistoso"] }
      ]
    }
  ];

  sections.forEach(function (section) {
    section.rows.forEach(function (row) {
      row.section = section;
      row.options = scoreOptions(section.columns, row.descriptions);
    });
  });

  supplementalSections.forEach(function (section) {
    section.rows.forEach(function (row) {
      row.section = section;
      row.options = row.values.map(function (text, index) {
        const cell = section.behaviour ? columns.behaviour[String(index + 1)] : milestoneColumns[index];
        return {
          value: String(index + 1),
          title: section.behaviour ? "Puntuación " + (index + 1) : "Opción " + (index + 1),
          text: text,
          rect: { x: cell[0] === undefined ? cell.x : cell[0], width: cell[1] === undefined ? cell.width : cell[1] }
        };
      });
    });
  });

  const allSections = sections.concat(supplementalSections);
  const allRows = allSections.reduce(function (rows, section) {
    return rows.concat(section.rows);
  }, []);
  const totalScoredRows = sections.reduce(function (count, section) {
    return count + section.rows.length;
  }, 0);

  const itemGuidance = {
    facial: {
      procedure: "Observe la cara en reposo, al llorar y al ser estimulada; puede aprovechar la interacción inicial con los cuidadores.",
      observe: "Gestos, sonrisa, llanto, mímica, boca abierta y cambios de expresión durante el examen.",
      tip: "Si aprecia escasez de movimiento sin una dificultad concreta, considere puntuación 2."
    },
    eyes: {
      procedure: "Presente un optotipo apropiado para la edad o una pelota brillante sin sonido a 20-30 cm, sin hablar y sin distractores visuales.",
      observe: "Conjugación y simetría ocular durante trayectorias horizontal, vertical y circular, moviendo el objetivo lentamente y a velocidad constante.",
      tip: "Compruebe que sigue con los ojos y no compensa moviendo la cabeza; anote estrabismo, nistagmo o ptosis."
    },
    visual: {
      procedure: "Utilice un optotipo adecuado para la edad; si no fija la mirada, muévalo inicialmente para atraer su atención.",
      observe: "Seguimiento completo del objetivo en trayectorias horizontal, vertical y circular, a 20-30 cm y sin estímulos competidores.",
      tip: "No hable durante la maniobra para evitar que la respuesta se apoye en claves auditivas."
    },
    auditory: {
      procedure: "Con la cabeza en línea media y el sonajero fuera del campo visual, estimule cada lado a 10-20 cm.",
      observe: "Orientación o respuesta al sonido a ambos lados sin apoyo de caras u otros estímulos visuales.",
      tip: "Es un ítem conductual, distinto del cribado auditivo; registre incidencias o uso de apoyos auditivos."
    },
    sucking: {
      procedure: "Observe succión, masticación o deglución durante la alimentación; si es mayor, pregunte por tos o salivación excesiva.",
      observe: "Variedad y eficacia de movimientos orales, boca abierta persistente, tos, atragantamiento o babeo excesivo.",
      tip: "Si no puede observarlo, registre la información aportada por los cuidadores y cualquier preocupación."
    },
    head: {
      procedure: "Observe en sedestación sobre superficie plana, ofreciendo solo el apoyo mínimo necesario si no se sienta solo.",
      observe: "Postura predominante de la cabeza a lo largo de la valoración: elevada y en línea media para la respuesta óptima.",
      tip: "La irritabilidad o el llanto pueden alterar la postura; consígnelo en conducta si condiciona la valoración."
    },
    trunk: {
      procedure: "Valore el tronco en sedestación, evitando silla y ropa gruesa; ofrezca soporte mínimo si es necesario.",
      observe: "Si se mantiene recto la mayor parte del tiempo o aparece flexión, hiperextensión o inclinación lateral.",
      tip: "Use la postura predominante, no una posición momentánea."
    },
    arms: {
      procedure: "Observe la actitud de ambos brazos en reposo durante la valoración postural.",
      observe: "Rotación, flexión anómala, posturas distónicas o hemiparéticas y diferencias entre lados.",
      tip: "Marque asimetría aunque la respuesta de ambos lados caiga en la misma puntuación."
    },
    hands: {
      procedure: "Observe las manos durante el estado de reposo y la interacción espontánea.",
      observe: "Pulgar aducto, mano cerrada y posiciones atípicas de dedos, distinguiendo si son intermitentes o persistentes.",
      tip: "Anote expresamente las diferencias entre derecha e izquierda."
    },
    legs: {
      procedure: "Según edad y habilidades, observe piernas en sedestación, supino y, si procede, bipedestación.",
      observe: "Extensión o flexión de rodillas, rotaciones internas o externas y simetría en las posturas evaluadas.",
      tip: "Si valora dos o tres posturas con puntuaciones diferentes, registre una valoración global/media y coméntelo."
    },
    feet: {
      procedure: "Observe los pies en supino y bipedestación cuando sea posible, sin zapatos ni calcetines.",
      observe: "Relación pie-pierna, puntillas, flexión de dedos u otras posturas intermitentes o persistentes.",
      tip: "No confunda la posición del pie con la actitud postural de la cadera; valore asimetrías."
    },
    quantity: {
      procedure: "Observe al niño en decúbito supino, preferiblemente despierto y tranquilo, durante el conjunto del examen.",
      observe: "Cantidad global de movimientos espontáneos: normal, excesiva/lenta o mínima/ausente.",
      tip: "Si el estado del niño no permite una observación válida, indíquelo en la sección de conducta."
    },
    quality: {
      procedure: "Observe la actividad motora espontánea del cuerpo entero durante la valoración, no solo brazos o piernas.",
      observe: "Variabilidad, fluidez, alternancia y complejidad; identifique movimientos bruscos, temblores, sincronía o patrones monótonos.",
      tip: "Si no es óptimo pero tampoco encaja en puntuación 1, utilice puntuación 2."
    },
    scarf: {
      procedure: "En supino, mantenga cabeza y tronco en línea media; cruce cada brazo sobre el pecho hasta notar resistencia.",
      observe: "Posición del codo respecto a la línea media y diferencias entre ambos brazos.",
      tip: "Sostenga el pecho del niño durante la maniobra y valore cada lado por separado."
    },
    shoulder: {
      procedure: "En supino y con cabeza y tronco centrados, eleve los brazos junto a la cabeza para notar resistencia.",
      observe: "Resistencia del hombro y del codo, comparando ambos lados simultáneamente.",
      tip: "Evite movimientos circulares hacia la abducción; no es una prueba de rango completo de hombro."
    },
    pronation: {
      procedure: "Con el brazo extendido, sosténgalo bajo el codo y gire el antebrazo desde la muñeca en pronación y supinación.",
      observe: "Amplitud aproximada de 180 grados, resistencia y asimetrías.",
      tip: "Realice y compare la maniobra en ambos miembros."
    },
    adductors: {
      procedure: "En supino y, preferiblemente, con el pañal aflojado, abra ambas piernas desde la línea media.",
      observe: "Ángulo alcanzado con rodillas extendidas y sin rotaciones compensatorias.",
      tip: "Mantenga las piernas extendidas durante toda la maniobra."
    },
    popliteal: {
      procedure: "En supino, flexione caderas sobre el abdomen y extienda las rodillas hasta notar resistencia.",
      observe: "Ángulo entre muslo y pierna, manteniendo las nalgas sobre la superficie y comparando ambos lados.",
      tip: "Si debe evaluar cada pierna por separado por movimiento o resistencia del niño, anótelo en observaciones."
    },
    ankle: {
      procedure: "Con cadera y rodilla extendidas, estabilice la rótula y realice la dorsiflexión con la palma de la mano.",
      observe: "Ángulo pie-pierna, resistencia que cede, respuesta voluntaria y asimetrías.",
      tip: "Evite desencadenar presión plantar; si una resistencia cede de repente, descríbalo, sin valorarlo como clono."
    },
    pull: {
      procedure: "Traccione suavemente desde las muñecas para llevar al niño a sentado, ofreciendo apoyo cefálico si lo necesita.",
      observe: "Posición y control de la cabeza durante el ascenso.",
      tip: "Si está irritable o llorando, repita cuando esté tranquilo; en hipotonía proteja la cabeza."
    },
    ventral: {
      procedure: "Sostenga al niño horizontalmente alrededor del tronco en suspensión ventral.",
      observe: "Postura de espalda, cabeza y miembros; seleccione el diagrama que mejor represente el tronco.",
      tip: "Anote discrepancias de cabeza o miembros y repita tranquilo si somnolencia o llanto condicionan la respuesta."
    },
    protectiveArm: {
      procedure: "Desde supino, estabilice la pelvis y traccione de un brazo para llevar al niño hacia sentado; repita al otro lado.",
      observe: "Respuesta activa del brazo libre: apoyo con brazo y mano extendidos, semiflexión o flexión completa.",
      tip: "No confunda con protección lateral en sedestación; extreme la precaución en niños muy hipotónicos."
    },
    vertical: {
      procedure: "Sostenga al niño bajo las axilas sin que los pies toquen una superficie; puede estimular suavemente las plantas.",
      observe: "Pataleo alternante y simétrico, pataleo pobre o asimétrico, ausencia de respuesta o postura en tijera.",
      tip: "Si deja caer o rigidiza las piernas deliberadamente, descríbalo y considere no puntuar el ítem."
    },
    lateral: {
      procedure: "Sujete de forma segura por las caderas e incline desde la vertical unos 45 grados hacia cada lado.",
      observe: "Activación de cabeza, tronco y miembros del hemicuerpo que queda arriba.",
      tip: "Evite una inclinación demasiado rápida o excesiva; anote si el peso o la colaboración dificultan la maniobra."
    },
    parachute: {
      procedure: "Solo desde los 6 meses, sostenga por el tronco en vertical e incline rápidamente hacia delante.",
      observe: "Respuesta de apoyo rápida y simétrica de ambos brazos, incluidas manos abiertas.",
      tip: "Antes de los 6 meses la ausencia de respuesta se registra como 0; desde los 6 meses marque asimetría si procede."
    },
    tendons: {
      procedure: "Con el miembro relajado en supino o sentado, explore bíceps, rodilla y tobillo con martillo pequeño o con el dedo.",
      observe: "Reflejos fáciles, ligeramente exaltados, exaltados, clono o ausencia.",
      tip: "En bíceps percuta sobre su pulgar colocado en el tendón; evite golpear rótula o talón."
    }
  };

  const supplementalGuidance = {
    milestones: {
      procedure: "Registre el hito que mejor representa el desempeño observable del niño en la actividad indicada.",
      observe: "Capacidad motora alcanzada y posibles diferencias entre lados cuando la tarea permita observarlas.",
      tip: "Esta sección aporta información del desarrollo, pero no forma parte de la puntuación neurológica total."
    },
    behaviour: {
      procedure: "Valore la conducta observada durante el examen y el modo en que influye en las respuestas.",
      observe: "Nivel de alerta, estado emocional e interacción social predominantes.",
      tip: "Registre aquí irritabilidad, llanto o somnolencia que hayan condicionado otros ítems; no puntúa en el total óptimo."
    }
  };

  const questionnaire = document.getElementById("questionnaire");
  const preview = document.getElementById("pdfPreview");
  const toast = document.getElementById("toast");
  const viewLastPdf = document.getElementById("viewLastPdf");
  let lastPdfUrl = "";

  function escapeMarkup(text) {
    return text.replace(/[&<>"']/g, function (character) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character];
    });
  }

  function guidanceFor(row) {
    return itemGuidance[row.id] || supplementalGuidance[row.section.id];
  }

  function renderGuidance(row) {
    const guidance = guidanceFor(row);
    const imageWidth = PAGE_WIDTH;
    const cropHeight = row.height;
    const offsetPercent = (row.top / PAGE_HEIGHT * 100).toFixed(3);
    return "<details class=\"item-guidance\"><summary>Cómo valorar este ítem</summary>" +
      "<div class=\"guidance-grid\"><div class=\"guidance-copy\">" +
      "<p><strong>Realice:</strong> " + escapeMarkup(guidance.procedure) + "</p>" +
      "<p><strong>Observe:</strong> " + escapeMarkup(guidance.observe) + "</p>" +
      "<p class=\"guidance-tip\"><strong>Nota:</strong> " + escapeMarkup(guidance.tip) + "</p></div>" +
      "<figure class=\"guidance-thumbnail\" style=\"aspect-ratio:" + imageWidth + " / " + cropHeight + "\" aria-label=\"Referencia visual en la proforma\">" +
      "<img src=\"assets/page-" + (row.section.page + 1) + ".png\" style=\"transform:translateY(-" + offsetPercent + "%)\" alt=\"Recorte orientativo de " + escapeMarkup(row.label) + "\">" +
      "</figure></div></details>";
  }

  function renderForm() {
    const introduction = "<section class=\"card guidance-intro\" aria-labelledby=\"guidance-title\">" +
      "<h2 id=\"guidance-title\">Apoyo para la valoración</h2>" +
      "<p>Ayudas resumidas a partir de la <strong>Guía de recomendaciones para la evaluación con la HINE</strong>. No sustituyen la formación formal ni la hoja oficial.</p>" +
      "<div class=\"guidance-principles\"><p><strong>Antes de comenzar:</strong> prepare juguetes apropiados para la edad, optotipo o pelota brillante sin sonido, sonajero suave, martillo de reflejos y cinta métrica.</p>" +
      "<p><strong>Durante el examen:</strong> adapte el orden al estado del niño; si llora o se irrita, puede repetir un ítem hasta tres veces y registrar la respuesta predominante.</p>" +
      "<p><strong>Registro:</strong> marque asimetrías y describa respuestas no representadas o dudosas en las observaciones.</p></div></section>" +
      "<section class=\"card exam-progress\" aria-labelledby=\"progress-title\">" +
      "<div><h2 id=\"progress-title\">Progreso de la valoración</h2><p id=\"progressText\">0 de " + allRows.length + " ítems consultados.</p></div>" +
      "<div class=\"progress-track\" aria-hidden=\"true\"><span id=\"progressBar\"></span></div></section>";
    questionnaire.innerHTML = introduction + allSections.map(function (section) {
      const asymmetryAllowed = section.scored || section.allowAsymmetry;
      const questions = section.rows.map(function (row) {
        const choices = row.options.map(function (option) {
          return "<label class=\"choice\"><input type=\"radio\" name=\"answer-" + row.id + "\" value=\"" + option.value + "\">" +
            "<strong>" + escapeMarkup(option.title) + "</strong>" + escapeMarkup(option.text) + "</label>";
        }).join("");
        const asymmetry = asymmetryAllowed ?
          "<fieldset class=\"asymmetry\"><legend>Asimetría</legend>" +
          "<label><input type=\"radio\" name=\"asym-" + row.id + "\" value=\"\" data-asym-default checked> No</label>" +
          "<label><input type=\"radio\" name=\"asym-" + row.id + "\" value=\"D\"> Derecha</label>" +
          "<label><input type=\"radio\" name=\"asym-" + row.id + "\" value=\"I\"> Izquierda</label></fieldset>" :
          "<span></span>";
        let itemFields;
        if (hasMilestoneAcquisitionFields(row)) {
          itemFields = "<div class=\"milestone-fields\">" +
            "<label>Lo observado <span class=\"field-hint\">2-3 palabras</span>" +
            "<input id=\"observed-" + row.id + "\" type=\"text\" maxlength=\"" + MILESTONE_OBSERVED_MAX_LENGTH + "\" placeholder=\"Ej. estable\"></label>" +
            "<label>Edad de adquisición <span class=\"field-hint\">Formato breve</span>" +
            "<input id=\"acquisition-" + row.id + "\" type=\"text\" maxlength=\"" + MILESTONE_AGE_MAX_LENGTH + "\" placeholder=\"Ej. 7 m\"></label></div>";
        } else if (row.section.id === "milestones") {
          itemFields = "<p class=\"milestone-template-note\">La columna final de esta fila contiene la instrucción original de la proforma.</p>";
        } else {
          itemFields = "<label class=\"item-note\"><span class=\"item-note-heading\">Observaciones <span class=\"item-note-count\" id=\"count-" + row.id + "\">0 / " + ITEM_NOTE_MAX_LENGTH + "</span></span>" +
            "<textarea id=\"note-" + row.id + "\" rows=\"2\" maxlength=\"" + ITEM_NOTE_MAX_LENGTH + "\" placeholder=\"Máx. " + ITEM_NOTE_MAX_LENGTH + " caracteres\"></textarea></label>";
        }
        return "<article class=\"question\" data-row=\"" + row.id + "\">" +
          "<div class=\"question-heading\"><h3>" + escapeMarkup(row.label) + "</h3>" +
          (row.section.scored ? "<output class=\"item-score\" id=\"score-" + row.id + "\">Puntuación: -</output>" : "") + "</div>" +
          renderGuidance(row) +
          "<div class=\"choice-grid\">" + choices + "</div>" +
          "<div class=\"item-footer\">" + asymmetry + itemFields + "</div></article>";
      }).join("");
      return "<details class=\"card section-card\" id=\"section-" + section.id + "\">" +
        "<summary class=\"section-toggle\"><span class=\"section-heading\"><strong id=\"title-" + section.id + "\">" + escapeMarkup(section.title) + "</strong>" +
        "<span class=\"section-meta\">" + escapeMarkup(section.subtitle) + "</span></span>" +
        "<span class=\"section-summary\"><span class=\"section-progress-summary\" id=\"status-" + section.id + "\">Pendientes: " + section.rows.length + " / " + section.rows.length + "</span>" +
        "<span class=\"toggle-label\" aria-hidden=\"true\"></span></span></summary>" +
        "<div class=\"section-content\" aria-labelledby=\"title-" + section.id + "\">" + questions +
        "<div class=\"section-actions\"><button class=\"section-close\" type=\"button\" data-close-section=\"" + section.id + "\">Cerrar sección</button></div></div></details>";
    }).join("");

    questionnaire.addEventListener("input", updateView);
    questionnaire.addEventListener("click", function (event) {
      const closeButton = event.target.closest("[data-close-section]");
      if (!closeButton) {
        return;
      }
      const section = document.getElementById("section-" + closeButton.dataset.closeSection);
      section.open = false;
      section.querySelector(".section-toggle").focus();
    });
    document.querySelectorAll(".identity input, #generalComments").forEach(function (input) {
      input.addEventListener("input", updateView);
    });
  }

  function renderPreview() {
    preview.innerHTML = [1, 2, 3, 4, 5].map(function (page) {
      return "<figure class=\"page-sheet\" data-page=\"" + (page - 1) + "\">" +
        "<img src=\"assets/page-" + page + ".png\" alt=\"Página " + page + " de la proforma HINE\">" +
        "<div class=\"mark-layer\" aria-hidden=\"true\"></div></figure>";
    }).join("");
  }

  function selectedOption(row) {
    const selected = document.querySelector("input[name=\"answer-" + row.id + "\"]:checked");
    return selected ? row.options.find(function (option) { return option.value === selected.value; }) : null;
  }

  function isAsymmetric(row) {
    return Boolean(asymmetrySideFor(row));
  }

  function asymmetrySideFor(row) {
    const selected = document.querySelector("input[name=\"asym-" + row.id + "\"]:checked");
    return selected ? selected.value : "";
  }

  function hasMilestoneAcquisitionFields(row) {
    return row.section.id === "milestones" && row.id !== "motorHead";
  }

  function noteFor(row) {
    const field = document.getElementById("note-" + row.id);
    return field ? field.value.trim().slice(0, ITEM_NOTE_MAX_LENGTH) : "";
  }

  function milestoneObservedFor(row) {
    const field = document.getElementById("observed-" + row.id);
    return field ? field.value.trim().slice(0, MILESTONE_OBSERVED_MAX_LENGTH) : "";
  }

  function milestoneAcquisitionFor(row) {
    const field = document.getElementById("acquisition-" + row.id);
    return field ? field.value.trim().slice(0, MILESTONE_AGE_MAX_LENGTH) : "";
  }

  function updateNoteCounters() {
    allRows.forEach(function (row) {
      const field = document.getElementById("note-" + row.id);
      const counter = document.getElementById("count-" + row.id);
      if (!field || !counter) {
        return;
      }
      if (field.value.length > ITEM_NOTE_MAX_LENGTH) {
        field.value = field.value.slice(0, ITEM_NOTE_MAX_LENGTH);
      }
      counter.textContent = field.value.length + " / " + ITEM_NOTE_MAX_LENGTH;
    });
  }

  function addPreviewMarker(layer, className, rect, text) {
    const marker = document.createElement("span");
    marker.className = className;
    marker.style.left = (rect.x / PAGE_WIDTH * 100) + "%";
    marker.style.top = (rect.top / PAGE_HEIGHT * 100) + "%";
    marker.style.width = (rect.width / PAGE_WIDTH * 100) + "%";
    marker.style.height = (rect.height / PAGE_HEIGHT * 100) + "%";
    marker.textContent = text || "";
    layer.appendChild(marker);
  }

  function addPreviewValue(layer, text, rect, className) {
    if (!text) {
      return;
    }
    addPreviewMarker(layer, "preview-value " + (className || ""), rect, text);
  }

  function updatePreviewData(totals, ageData, risk) {
    const firstPage = preview.querySelector("[data-page=\"0\"] .mark-layer");
    const patientValues = [
      { input: "patientName", rect: { x: 181, top: 81, width: 143, height: 13 } },
      { input: "birthDate", date: true, rect: { x: 439, top: 81, width: 65, height: 13 } },
      { input: "examDate", date: true, rect: { x: 423, top: 102, width: 81, height: 13 } },
      { input: "headCircumference", rect: { x: 458, top: 123, width: 55, height: 13 } }
    ];
    patientValues.forEach(function (field) {
      const raw = document.getElementById(field.input).value.trim();
      addPreviewValue(firstPage, field.date ? formatDate(raw) : raw, field.rect, "preview-field");
    });
    addPreviewValue(firstPage, ageData.gestationalCompact, { x: 182, top: 102, width: 142, height: 13 }, "preview-field");
    addPreviewValue(firstPage, ageData.chronologicalCompact, { x: 251, top: 123, width: 40, height: 13 }, "preview-field preview-age");
    addPreviewValue(firstPage, ageData.correctedCompact, { x: 293, top: 123, width: 44, height: 13 }, "preview-field preview-age");

    addPreviewValue(firstPage, totals.scoredAnswers ? String(totals.globalScore) : "", { x: 360, top: 188, width: 30, height: 15 }, "preview-total");
    addPreviewValue(firstPage, risk.pdfLabel, { x: 395, top: 188, width: 105, height: 15 }, "preview-risk");
    addPreviewValue(firstPage, String(totals.asymmetries), { x: 452, top: 212, width: 48, height: 15 }, "preview-total");
    addPreviewValue(firstPage, totals.behaviourAnswers ? String(totals.behaviour) : "", { x: 452, top: 236, width: 48, height: 15 }, "preview-total");

    const summaryTops = [281, 295, 309, 323, 337];
    sections.forEach(function (section, index) {
      const value = totals.sectionScores[section.id];
      addPreviewValue(firstPage, value.answered ? String(value.total) : "", { x: 336, top: summaryTops[index], width: 31, height: 12 }, "preview-subtotal");
    });
    addPreviewValue(firstPage, document.getElementById("generalComments").value.trim(), { x: 92, top: 377, width: 406, height: 28 }, "preview-comments");
  }

  function updatePreviewHighlights(totals, ageData, risk) {
    preview.querySelectorAll(".mark-layer").forEach(function (layer) {
      layer.innerHTML = "";
    });
    updatePreviewData(totals, ageData, risk);
    allRows.forEach(function (row) {
      const layer = preview.querySelector("[data-page=\"" + row.section.page + "\"] .mark-layer");
      const answer = selectedOption(row);
      const commentColumn = row.section.columns ? row.section.columns.comment : row.section.comment;
      if (answer) {
        addPreviewMarker(layer, "preview-highlight", {
          x: answer.rect.x,
          width: answer.rect.width,
          top: row.top,
          height: row.height
        });
        if (row.section.scored) {
          const output = row.section.columns.output;
          addPreviewValue(layer, answer.value, {
            x: output[0],
            width: output[1],
            top: row.top,
            height: row.height
          }, "preview-row-score");
        }
      }
      if (hasMilestoneAcquisitionFields(row)) {
        addPreviewMarker(layer, "preview-milestone-entry", {
          x: row.section.comment.x,
          width: row.section.comment.width,
          top: row.top,
          height: row.height
        }, "");
        addPreviewValue(layer, milestoneObservedFor(row), {
          x: row.section.comment.x + 3,
          width: row.section.comment.width - 6,
          top: row.top + 11,
          height: 10
        }, "preview-milestone-value");
        addPreviewValue(layer, milestoneAcquisitionFor(row), {
          x: row.section.comment.x + 3,
          width: row.section.comment.width - 6,
          top: row.top + 31,
          height: 10
        }, "preview-milestone-value");
        const milestoneSide = asymmetrySideFor(row);
        if (milestoneSide) {
          addPreviewMarker(layer, "preview-milestone-asym", {
            x: row.section.comment.x + row.section.comment.width - 11,
            width: 9,
            top: row.top + 2,
            height: 9
          }, milestoneSide);
        }
      }
      if (!hasMilestoneAcquisitionFields(row) && (isAsymmetric(row) || noteFor(row))) {
        const side = asymmetrySideFor(row);
        const commentX = commentColumn[0] === undefined ? commentColumn.x : commentColumn[0];
        const commentWidth = commentColumn[1] === undefined ? commentColumn.width : commentColumn[1];
        if (side) {
          addPreviewMarker(layer, noteFor(row) ? "preview-asym-slot" : "preview-asym", {
            x: commentX,
            width: noteFor(row) ? 11 : commentWidth,
            top: row.top,
            height: row.height
          }, side);
        }
        if (noteFor(row)) {
          addPreviewMarker(layer, "preview-note", {
            x: commentX + (side ? 12 : 0),
            width: commentWidth - (side ? 12 : 0),
            top: row.top,
            height: row.height
          }, noteFor(row));
        }
      }
    });
  }

  function updateTotals() {
    let globalScore = 0;
    let scoredAnswers = 0;
    let asymmetries = 0;
    const badges = [];
    const sectionScores = {};

    sections.forEach(function (section) {
      let total = 0;
      let answered = 0;
      section.rows.forEach(function (row) {
        const answer = selectedOption(row);
        document.getElementById("score-" + row.id).textContent = "Puntuación: " + (answer ? answer.value : "-");
        if (answer) {
          total += Number(answer.value);
          answered += 1;
          globalScore += Number(answer.value);
          scoredAnswers += 1;
        }
        if (isAsymmetric(row)) {
          asymmetries += 1;
        }
      });
      sectionScores[section.id] = { total: total, answered: answered };
      const visibleTotal = answered ? total + " / " + section.max : "- / " + section.max;
      badges.push("<span>" + escapeMarkup(section.title) + ": <strong>" + visibleTotal + "</strong></span>");
    });

    supplementalSections[0].rows.forEach(function (row) {
      if (isAsymmetric(row)) {
        asymmetries += 1;
      }
    });

    let behaviour = 0;
    let behaviourAnswers = 0;
    supplementalSections[1].rows.forEach(function (row) {
      const answer = selectedOption(row);
      if (answer) {
        behaviour += Number(answer.value);
        behaviourAnswers += 1;
      }
    });

    document.getElementById("globalTotal").textContent = scoredAnswers ? globalScore + " / 78" : "- / 78";
    document.getElementById("asymmetryTotal").textContent = String(asymmetries);
    document.getElementById("behaviourTotal").textContent = behaviourAnswers ? String(behaviour) : "-";
    document.getElementById("sectionTotals").innerHTML = badges.join("");
    updateSectionProgress(sectionScores, behaviour, behaviourAnswers);

    return { globalScore: globalScore, scoredAnswers: scoredAnswers, asymmetries: asymmetries, behaviour: behaviour, behaviourAnswers: behaviourAnswers, sectionScores: sectionScores };
  }

  function updateSectionProgress(sectionScores, behaviour, behaviourAnswers) {
    let totalAnswered = 0;
    allSections.forEach(function (section) {
      const answered = section.rows.filter(function (row) {
        return Boolean(selectedOption(row));
      }).length;
      const pending = section.rows.length - answered;
      totalAnswered += answered;
      let text = "Pendientes: " + pending + " / " + section.rows.length;
      if (section.scored) {
        const value = sectionScores[section.id];
        text += " · Total: " + (value.answered ? value.total + " / " + section.max : "- / " + section.max);
      } else if (section.behaviour) {
        text += " · Total: " + (behaviourAnswers ? behaviour : "-");
      }
      const status = document.getElementById("status-" + section.id);
      if (status) {
        status.textContent = text;
        status.classList.toggle("is-complete", pending === 0);
      }
    });
    const percent = allRows.length ? Math.round(totalAnswered / allRows.length * 100) : 0;
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    if (progressBar) {
      progressBar.style.width = percent + "%";
    }
    if (progressText) {
      progressText.textContent = totalAnswered + " de " + allRows.length + " ítems consultados (" + percent + "%).";
    }
  }

  function cutoffForCorrectedAge(ageData) {
    if (!ageData.valid || !ageData.correctedParts) {
      return null;
    }
    const months = ageData.correctedParts.months;
    if (months >= 12) {
      return { monthLabel: "12 meses o más", points: 65 };
    }
    if (months >= 9) {
      return { monthLabel: "9 meses", points: 62 };
    }
    if (months >= 6) {
      return { monthLabel: "6 meses", points: 59 };
    }
    if (months >= 3) {
      return { monthLabel: "3 meses", points: 56 };
    }
    return null;
  }

  function riskResultFor(totals, ageData) {
    const cutoff = cutoffForCorrectedAge(ageData);
    if (!ageData.valid) {
      return {
        status: "pending",
        title: "Riesgo de parálisis cerebral",
        text: "Complete fecha de nacimiento, fecha de examen y edad gestacional para calcular la edad corregida.",
        pdfLabel: ""
      };
    }
    if (!cutoff) {
      return {
        status: "pending",
        title: "Riesgo de parálisis cerebral",
        text: "La edad corregida es inferior a 3 meses; no hay punto de corte configurado para esta edad.",
        pdfLabel: ""
      };
    }
    if (totals.scoredAnswers < totalScoredRows) {
      return {
        status: "pending",
        title: "Riesgo de parálisis cerebral",
        text: "Complete todos los ítems puntuables para aplicar el punto de corte de " + cutoff.monthLabel + " (<= " + cutoff.points + " puntos).",
        pdfLabel: ""
      };
    }
    if (totals.globalScore <= cutoff.points) {
      return {
        status: "high",
        title: "Alto riesgo de parálisis cerebral",
        text: "Puntuación global " + totals.globalScore + " / 78. Para " + cutoff.monthLabel + ", el punto de corte es <= " + cutoff.points + " puntos.",
        pdfLabel: "Alto riesgo PC"
      };
    }
    return {
      status: "low",
      title: "Sin criterio de alto riesgo por punto de corte",
      text: "Puntuación global " + totals.globalScore + " / 78. Para " + cutoff.monthLabel + ", el punto de corte de alto riesgo es <= " + cutoff.points + " puntos.",
      pdfLabel: "No alto riesgo PC"
    };
  }

  function updateRiskSummary(totals, ageData) {
    const risk = riskResultFor(totals, ageData);
    const box = document.getElementById("riskBox");
    document.getElementById("riskTitle").textContent = risk.title;
    document.getElementById("riskText").textContent = risk.text;
    box.classList.remove("risk-pending", "risk-high", "risk-low");
    box.classList.add("risk-" + risk.status);
    return risk;
  }

  function updateView() {
    updateNoteCounters();
    const ageData = updateCalculatedAges();
    const totals = updateTotals();
    const risk = updateRiskSummary(totals, ageData);
    updatePreviewHighlights(totals, ageData, risk);
  }

  function safePdfText(value) {
    return String(value || "")
      .replace(/\u2013|\u2014/g, "-")
      .replace(/\u2018|\u2019/g, "'")
      .replace(/\u201c|\u201d/g, "\"")
      .replace(/[^\x20-\x7e\u00a0-\u00ff\u20ac]/g, "?");
  }

  function bytesFromBase64(base64) {
    const decoded = window.atob(base64);
    const bytes = new Uint8Array(decoded.length);
    for (let index = 0; index < decoded.length; index += 1) {
      bytes[index] = decoded.charCodeAt(index);
    }
    return bytes;
  }

  function drawTextTop(page, text, x, top, size, font, color) {
    if (!text) {
      return;
    }
    page.drawText(safePdfText(text), {
      x: x,
      y: PAGE_HEIGHT - top - size,
      size: size,
      font: font,
      color: color
    });
  }

  function formatDate(value) {
    if (!value) {
      return "";
    }
    const parts = value.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }

  function parseDate(value) {
    if (!value) {
      return null;
    }
    const parts = value.split("-").map(Number);
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function addDays(date, days) {
    const result = new Date(date.getTime());
    result.setUTCDate(result.getUTCDate() + days);
    return result;
  }

  function addMonths(date, months) {
    const result = new Date(date.getTime());
    const originalDay = result.getUTCDate();
    result.setUTCDate(1);
    result.setUTCMonth(result.getUTCMonth() + months);
    const endOfMonth = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
    result.setUTCDate(Math.min(originalDay, endOfMonth));
    return result;
  }

  function differenceInDays(start, end) {
    return Math.round((end.getTime() - start.getTime()) / DAY_MS);
  }

  function ageParts(start, end) {
    if (!start || !end || end < start) {
      return null;
    }
    let months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth();
    let monthAnchor = addMonths(start, months);
    if (monthAnchor > end) {
      months -= 1;
      monthAnchor = addMonths(start, months);
    }
    const remainingDays = differenceInDays(monthAnchor, end);
    return {
      months: months,
      weeks: Math.floor(remainingDays / 7),
      days: remainingDays % 7
    };
  }

  function plural(value, singular, pluralWord) {
    return value + " " + (value === 1 ? singular : pluralWord);
  }

  function formatAgeLong(parts) {
    return plural(parts.months, "mes", "meses") + ", " +
      plural(parts.weeks, "semana", "semanas") + " y " +
      plural(parts.days, "día", "días");
  }

  function formatAgeCompact(parts) {
    return parts.months + "m " + parts.weeks + "sem " + parts.days + "d";
  }

  function readGestationalAge() {
    const weeksValue = document.getElementById("gestationalWeeks").value;
    const daysValue = document.getElementById("gestationalDays").value;
    if (weeksValue === "" || daysValue === "") {
      return null;
    }
    const weeks = Number(weeksValue);
    const days = Number(daysValue);
    if (!Number.isInteger(weeks) || !Number.isInteger(days) || weeks < 20 || weeks > 42 || days < 0 || days > 6) {
      return null;
    }
    return { weeks: weeks, days: days, totalDays: weeks * 7 + days };
  }

  function calculateAgeData() {
    const birthDate = parseDate(document.getElementById("birthDate").value);
    const examDate = parseDate(document.getElementById("examDate").value);
    const gestation = readGestationalAge();
    const blank = {
      valid: false,
      chronologicalLong: "",
      correctedLong: "",
      chronologicalCompact: "",
      correctedCompact: "",
      correctedParts: null,
      gestationalCompact: gestation ? gestation.weeks + "sem " + gestation.days + "d" : ""
    };
    if (!birthDate || !examDate || !gestation) {
      return blank;
    }
    if (examDate < birthDate) {
      blank.error = "La fecha de examen no puede ser anterior a la fecha de nacimiento.";
      return blank;
    }

    const chronological = ageParts(birthDate, examDate);
    const correctionDays = gestation.totalDays < PRETERM_LIMIT_DAYS ? TERM_GESTATION_DAYS - gestation.totalDays : 0;
    const correctedReference = addDays(birthDate, correctionDays);
    let corrected;
    let correctedLong;
    let correctedCompact;
    let status;

    if (examDate < correctedReference) {
      const remainingDays = differenceInDays(examDate, correctedReference);
      const remainingWeeks = Math.floor(remainingDays / 7);
      const remainderDays = remainingDays % 7;
      corrected = { months: 0, weeks: 0, days: 0 };
      correctedLong = formatAgeLong(corrected) + " (faltan " + remainingWeeks + " semanas y " + remainderDays + " días para término)";
      correctedCompact = "0m 0sem 0d";
      status = "La evaluación es anterior a la fecha prevista de término; faltan " + remainingWeeks + " semanas y " + remainderDays + " días.";
    } else {
      corrected = ageParts(correctedReference, examDate);
      correctedLong = formatAgeLong(corrected);
      correctedCompact = formatAgeCompact(corrected);
      if (correctionDays) {
        status = "Prematuro: se corrigen " + Math.floor(correctionDays / 7) + " semanas y " + (correctionDays % 7) + " días hasta 40+0 semanas.";
      } else {
        status = "Nacimiento desde 37+0 semanas: la edad corregida coincide con la edad cronológica.";
      }
    }

    return {
      valid: true,
      gestation: gestation,
      gestationalCompact: gestation.weeks + "sem " + gestation.days + "d",
      chronologicalLong: formatAgeLong(chronological),
      chronologicalCompact: formatAgeCompact(chronological),
      correctedLong: correctedLong,
      correctedCompact: correctedCompact,
      correctedParts: corrected,
      correctionDays: correctionDays,
      status: status
    };
  }

  function updateCalculatedAges() {
    const ageData = calculateAgeData();
    const chronologicalField = document.getElementById("chronologicalAge");
    const correctedField = document.getElementById("correctedAge");
    const status = document.getElementById("ageCalculationStatus");
    chronologicalField.value = ageData.chronologicalLong;
    correctedField.value = ageData.correctedLong;
    status.classList.toggle("error", Boolean(ageData.error));
    status.textContent = ageData.error || ageData.status || "Introduzca los campos obligatorios para calcular la edad corregida.";
    return ageData;
  }

  function validateRequiredExamData() {
    const mandatoryFields = ["patientName", "birthDate", "gestationalWeeks", "gestationalDays", "examDate"];
    for (let index = 0; index < mandatoryFields.length; index += 1) {
      const field = document.getElementById(mandatoryFields[index]);
      if (!field.checkValidity()) {
        field.reportValidity();
        showToast("Complete los campos obligatorios de datos del examen antes de descargar el PDF.");
        return null;
      }
    }
    const ageData = updateCalculatedAges();
    if (!ageData.valid) {
      showToast(ageData.error || "Revise los datos necesarios para calcular la edad corregida.");
      return null;
    }
    return ageData;
  }

  function addEditableField(form, page, name, value, rect, font, rgb, options) {
    const field = form.createTextField(name);
    const settings = options || {};
    if (settings.multiline) {
      field.enableMultiline();
    }
    field.addToPage(page, {
      x: rect.x,
      y: PAGE_HEIGHT - rect.top - rect.height,
      width: rect.width,
      height: rect.height,
      font: font,
      textColor: rgb(0.05, 0.2, 0.28),
      backgroundColor: rgb(0.96, 0.985, 1),
      borderColor: rgb(0.7, 0.8, 0.87),
      borderWidth: settings.borderWidth === undefined ? 0.45 : settings.borderWidth
    });
    field.setText(safePdfText(value));
    field.setFontSize(settings.fontSize || 8);
    field.defaultUpdateAppearances(font);
    form.markFieldAsClean(field.ref);
    return field;
  }

  function wrapText(text, font, size, maxWidth) {
    const words = safePdfText(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    words.forEach(function (word) {
      const pieces = [];
      let remainder = word;
      while (font.widthOfTextAtSize(remainder, size) > maxWidth) {
        let end = remainder.length;
        while (end > 1 && font.widthOfTextAtSize(remainder.slice(0, end), size) > maxWidth) {
          end -= 1;
        }
        pieces.push(remainder.slice(0, end));
        remainder = remainder.slice(end);
      }
      pieces.push(remainder);
      pieces.forEach(function (piece, index) {
        const candidate = line ? line + " " + piece : piece;
        if (line && font.widthOfTextAtSize(candidate, size) > maxWidth) {
          lines.push(line);
          line = piece;
        } else {
          line = candidate;
        }
        if (index < pieces.length - 1) {
          lines.push(line);
          line = "";
        }
      });
    });
    if (line) {
      lines.push(line);
    }
    return lines;
  }

  function drawWrappedText(page, text, x, top, maxWidth, size, lineHeight, font, color) {
    const lines = wrapText(text, font, size, maxWidth);
    lines.forEach(function (line, index) {
      drawTextTop(page, line, x, top + index * lineHeight, size, font, color);
    });
    return lines.length * lineHeight;
  }

  function drawItemNote(page, note, x, top, width, height, hasAsymmetry, font, color) {
    const noteX = x + (hasAsymmetry ? 12 : 2);
    const noteWidth = width - (hasAsymmetry ? 14 : 4);
    const offset = 3;
    const availableHeight = height - offset - 2;
    let size = 4.3;
    let lineHeight = 4.9;
    let lines = wrapText(note, font, size, noteWidth);
    while (lines.length * lineHeight > availableHeight && size > 3.1) {
      size -= 0.2;
      lineHeight = size + 0.6;
      lines = wrapText(note, font, size, noteWidth);
    }
    lines.forEach(function (line, index) {
      drawTextTop(page, line, noteX, top + offset + index * lineHeight, size, font, color);
    });
  }

  function drawMilestoneEntry(page, row, regular, bold, rgb) {
    if (!hasMilestoneAcquisitionFields(row)) {
      return false;
    }
    const comment = row.section.comment;
    const ink = rgb(0.07, 0.25, 0.34);
    page.drawRectangle({
      x: comment.x + 1,
      y: PAGE_HEIGHT - row.top - row.height + 1,
      width: comment.width - 2,
      height: row.height - 2,
      color: rgb(1, 1, 1)
    });
    drawTextTop(page, "Lo observado:", comment.x + 3, row.top + 4, 5, bold, ink);
    drawTextTop(page, milestoneObservedFor(row), comment.x + 3, row.top + 12, 5, regular, ink);
    drawTextTop(page, "Adquisición:", comment.x + 3, row.top + 24, 5, bold, ink);
    drawTextTop(page, milestoneAcquisitionFor(row), comment.x + 3, row.top + 32, 5, regular, ink);
    const milestoneSide = asymmetrySideFor(row);
    if (milestoneSide) {
      drawTextTop(page, milestoneSide, comment.x + comment.width - 10, row.top + 4, 6, bold, ink);
    }
    return true;
  }

  function drawAnswer(page, row, option, regular, bold, rgb) {
    if (option) {
      page.drawRectangle({
        x: option.rect.x + 1,
        y: PAGE_HEIGHT - row.top - row.height + 1,
        width: option.rect.width - 2,
        height: row.height - 2,
        color: rgb(1, 0.82, 0.25),
        opacity: 0.27,
        borderColor: rgb(0.8, 0.55, 0),
        borderOpacity: 0.8,
        borderWidth: 0.7
      });
    }
    if (row.section.scored && option) {
      const output = row.section.columns.output;
      drawTextTop(page, option.value, output[0] + output[1] / 2 - 2, row.top + Math.max(3, row.height / 2 - 5), 9, bold, rgb(0.07, 0.25, 0.34));
    }
    if (drawMilestoneEntry(page, row, regular, bold, rgb)) {
      return;
    }

    const comment = row.section.columns ? row.section.columns.comment : row.section.comment;
    const commentX = comment[0] === undefined ? comment.x : comment[0];
    const commentWidth = comment[1] === undefined ? comment.width : comment[1];
    const note = noteFor(row);
    const side = asymmetrySideFor(row);
    if (side) {
      const sideX = note ? commentX + 3 : commentX + commentWidth / 2 - 3;
      drawTextTop(page, side, sideX, row.top + Math.max(4, row.height / 2 - 5), 8, bold, rgb(0.07, 0.25, 0.34));
    }
    if (note) {
      drawItemNote(page, note, commentX, row.top, commentWidth, row.height, isAsymmetric(row), regular, rgb(0.07, 0.25, 0.34));
    }
  }

  async function buildPdf(ageData) {
    const PDFLib = window.PDFLib;
    const pdfDocument = await PDFLib.PDFDocument.load(bytesFromBase64(window.HINE_TEMPLATE_PDF_BASE64));
    const regular = await pdfDocument.embedFont(PDFLib.StandardFonts.Helvetica);
    const bold = await pdfDocument.embedFont(PDFLib.StandardFonts.HelveticaBold);
    const ink = PDFLib.rgb(0.05, 0.2, 0.28);
    const pages = pdfDocument.getPages();
    const totals = updateTotals();
    const risk = riskResultFor(totals, ageData);
    const form = pdfDocument.getForm();

    const patientFields = [
      { name: "Datos.NombreApellidos", input: "patientName", rect: { x: 181, top: 81, width: 143, height: 13 } },
      { name: "Datos.FechaNacimiento", input: "birthDate", date: true, rect: { x: 439, top: 81, width: 65, height: 13 } },
      { name: "Datos.EdadGestacional", value: ageData.gestationalCompact, rect: { x: 182, top: 102, width: 142, height: 13 } },
      { name: "Datos.FechaExamen", input: "examDate", date: true, rect: { x: 423, top: 102, width: 81, height: 13 } },
      { name: "Datos.EdadCronologica", value: ageData.chronologicalCompact, rect: { x: 251, top: 123, width: 40, height: 13 }, fontSize: 6 },
      { name: "Datos.EdadCorregida", value: ageData.correctedCompact, rect: { x: 293, top: 123, width: 44, height: 13 }, fontSize: 6 },
      { name: "Datos.PerimetroCefalico", input: "headCircumference", rect: { x: 458, top: 123, width: 55, height: 13 } }
    ];
    patientFields.forEach(function (field) {
      const raw = field.input ? document.getElementById(field.input).value.trim() : field.value;
      const value = field.date ? formatDate(raw) : raw;
      addEditableField(form, pages[0], field.name, value, field.rect, regular, PDFLib.rgb, { fontSize: field.fontSize || 8 });
    });

    addEditableField(form, pages[0], "Resumen.PuntuacionGlobal", totals.scoredAnswers ? String(totals.globalScore) : "", { x: 360, top: 188, width: 30, height: 15 }, bold, PDFLib.rgb, { fontSize: 10 });
    addEditableField(form, pages[0], "Resumen.RiesgoParalisisCerebral", risk.pdfLabel, { x: 395, top: 188, width: 105, height: 15 }, regular, PDFLib.rgb, { fontSize: 7 });
    addEditableField(form, pages[0], "Resumen.NumeroAsimetrias", String(totals.asymmetries), { x: 452, top: 212, width: 48, height: 15 }, bold, PDFLib.rgb, { fontSize: 10 });
    addEditableField(form, pages[0], "Resumen.PuntuacionComportamiento", totals.behaviourAnswers ? String(totals.behaviour) : "", { x: 452, top: 236, width: 48, height: 15 }, bold, PDFLib.rgb, { fontSize: 10 });

    const summaryTops = [286, 300, 314, 328, 342];
    sections.forEach(function (section, index) {
      const selected = section.rows.map(selectedOption).filter(Boolean);
      const value = selected.length ? String(selected.reduce(function (total, answer) { return total + Number(answer.value); }, 0)) : "";
      addEditableField(form, pages[0], "Resumen." + section.id, value, { x: 336, top: summaryTops[index] - 5, width: 31, height: 12 }, bold, PDFLib.rgb, { fontSize: 8 });
    });

    allRows.forEach(function (row) {
      drawAnswer(pages[row.section.page], row, selectedOption(row), regular, bold, PDFLib.rgb);
    });

    const observationEntries = [];
    const generalComment = document.getElementById("generalComments").value.trim();
    addEditableField(form, pages[0], "Resumen.ComentariosGenerales", generalComment, { x: 92, top: 377, width: 406, height: 28 }, regular, PDFLib.rgb, { fontSize: 7, multiline: true });
    if (generalComment) {
      observationEntries.push({ label: "Comentarios generales", text: generalComment });
    }
    allRows.forEach(function (row) {
      const note = noteFor(row);
      if (note) {
        observationEntries.push({ label: row.section.title + " - " + row.label, text: note });
      }
    });

    if (observationEntries.length) {
      let appendix = pdfDocument.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      let top = 55;
      drawTextTop(appendix, "OBSERVACIONES AÑADIDAS", 48, top, 16, bold, ink);
      top += 29;
      drawTextTop(appendix, "Anexo generado desde la proforma HINE interactiva", 48, top, 9, regular, PDFLib.rgb(0.35, 0.42, 0.5));
      top += 30;

      observationEntries.forEach(function (entry) {
        const estimatedLines = wrapText(entry.text, regular, 9, 499).length;
        if (top + 22 + estimatedLines * 12 > 790) {
          appendix = pdfDocument.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          top = 55;
          drawTextTop(appendix, "OBSERVACIONES AÑADIDAS (continuación)", 48, top, 14, bold, ink);
          top += 36;
        }
        drawTextTop(appendix, entry.label, 48, top, 10, bold, ink);
        top += 16;
        top += drawWrappedText(appendix, entry.text, 48, top, 499, 9, 12, regular, ink);
        top += 15;
      });
    }

    return pdfDocument.save({ updateFieldAppearances: false });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("visible");
    }, 3500);
  }

  document.getElementById("downloadPdf").addEventListener("click", async function () {
    const button = this;
    const ageData = validateRequiredExamData();
    if (!ageData) {
      return;
    }
    button.disabled = true;
    button.textContent = "Generando PDF...";
    try {
      const pdfBytes = await buildPdf(ageData);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (lastPdfUrl) {
        URL.revokeObjectURL(lastPdfUrl);
      }
      lastPdfUrl = url;
      viewLastPdf.href = url;
      viewLastPdf.hidden = false;
      const link = document.createElement("a");
      link.href = url;
      link.download = "Proforma_HINE_cumplimentada.pdf";
      link.click();
      showToast("PDF generado con las selecciones y observaciones registradas.");
    } catch (error) {
      console.error(error);
      showToast("No se pudo generar el PDF. Revise la consola para más información.");
    } finally {
      button.disabled = false;
      button.textContent = "Descargar PDF cumplimentado";
    }
  });

  document.getElementById("clearForm").addEventListener("click", function () {
    if (!window.confirm("¿Desea borrar todas las respuestas y observaciones introducidas?")) {
      return;
    }
    document.querySelectorAll("input, textarea").forEach(function (field) {
      if (field.type === "radio" || field.type === "checkbox") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });
    document.querySelectorAll("[data-asym-default]").forEach(function (field) {
      field.checked = true;
    });
    updateView();
    showToast("Formulario limpiado.");
  });

  renderForm();
  renderPreview();
  updateView();
})();
