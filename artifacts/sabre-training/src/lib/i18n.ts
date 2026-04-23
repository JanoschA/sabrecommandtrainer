export type Language = 'de' | 'en' | 'fr';

export const translations = {
  de: {
    appTitle: "Säbelfecht Training",
    appDesc: "Verbessere deine Beinarbeit und Reaktion mit dem ultimativen Audio-Trainingspartner.",
    start: "Training starten",
    history: "Verlauf",
    selectTraining: "Training auswählen",
    settings: "Einstellungen",
    duration: "Dauer (Minuten)",
    moves: "Schritte & Aktionen",
    speed: "Geschwindigkeit",
    pause: "Pause zwischen Kommandos",
    slow: "Langsam",
    medium: "Mittel",
    fast: "Schnell",
    begin: "Los geht's!",
    stop: "Abbrechen",
    summary: "Trainingsbericht",
    timeTrained: "Trainierte Zeit",
    calories: "Kalorien (ca.)",
    commandsCalled: "Kommandos",
    newTraining: "Neues Training",
    saveSuccess: "Training gespeichert!",
    noHistory: "Noch kein Training absolviert.",
    voiceVolume: "Stimme",
    musicVolume: "Musik",
    backgroundMusic: "Hintergrundmusik",
    pauseTraining: "Training pausieren",
    resumeTraining: "Weiter",
    stopTraining: "Training beenden",
    continueQuestion: "Was möchtest du tun?",

    type_complete: "Komplettes Training",
    desc_complete: "Aufwärmen → Fechttechnik → Abkühlen. Die komplette Einheit in einem Durchgang.",
    longdesc_complete: "Die vollständige Trainingseinheit führt dich strukturiert durch alle drei Phasen: Aufwärmen, Fechttechnik und Abkühlen. Ideal für ein ausgewogenes Training, das Körper und Technik gleichmäßig fördert. Perfekt für den regelmäßigen Trainingsalltag.",
    bullet1_complete: "Inhalt: Aufwärm-, Fechttechnik- und Cool-down-Phase",
    bullet2_complete: "Zielgruppe: Alle Leistungsniveaus",
    bullet3_complete: "Intensität: Mittel – ausgewogen und strukturiert",
    type_drill: "Drill Sergeant",
    desc_drill: "Maximale Intensität, schnelles Tempo, Motivation nach jedem Kommando. Kein Erbarmen!",
    longdesc_drill: "Der Drill Sergeant ist dein härtester Trainingspartner. Kommandos folgen in schneller Folge, nach jedem Befehl folgt eine motivierende Ansage. Keine Pausen, kein Erbarmen – nur Leistung. Dieses Format ist für kurze, intensive Einheiten konzipiert.",
    bullet1_drill: "Inhalt: Fechttechnik auf maximaler Intensität",
    bullet2_drill: "Zielgruppe: Fortgeschrittene und wettkampforientierte Athleten",
    bullet3_drill: "Intensität: Hoch – schnelles Tempo, volle Konzentration",
    type_warmup: "Aufwärmen",
    desc_warmup: "Allgemeines Aufwärm-Programm: Laufen, Dehnungen, Mobilisierung – kein Fechten.",
    longdesc_warmup: "Das Aufwärm-Programm bereitet Muskeln, Gelenke und Kreislauf gezielt auf das Fechten vor. Ohne fechttechnische Elemente liegt der Fokus auf allgemeiner Mobilisierung und Aktivierung. Ideal als eigenständige Einheit oder vor dem Techniktraining.",
    bullet1_warmup: "Inhalt: Laufen, Dehnen, Mobilisierungsübungen",
    bullet2_warmup: "Zielgruppe: Alle – besonders empfohlen vor intensivem Training",
    bullet3_warmup: "Intensität: Niedrig – sanft und progressiv",
    type_cooldown: "Abkühlen",
    desc_cooldown: "Sanftes Auskühlen nach dem Training: Dehnungen, Atemübungen, Mobilisation.",
    longdesc_cooldown: "Das Cool-down-Programm hilft dem Körper, nach dem Training in den Ruhezustand zurückzukehren. Atemübungen, sanfte Dehnungen und Mobilisationsübungen senken Herzfrequenz und Muskelspannung. Unverzichtbar für Regeneration und Verletzungsprävention.",
    bullet1_cooldown: "Inhalt: Atemübungen, Dehnungen, Mobilisation",
    bullet2_cooldown: "Zielgruppe: Alle – besonders nach intensiven Einheiten",
    bullet3_cooldown: "Intensität: Sehr niedrig – entspannend und regenerativ",
    type_coord: "Koordination",
    desc_coord: "Kombinations-Training: Der Trainer ruft 2-Schritt-Sequenzen (z.B. Vor – Ausfall!).",
    longdesc_coord: "Im Koordinationstraining trainierst du das schnelle Verknüpfen von zwei Bewegungen. Der Trainer kündigt Zweier-Sequenzen an – du reagierst auf die erste Ansage und führst die zweite direkt im Anschluss aus. Verbessert Reaktionsschnelligkeit und Bewegungsfluss.",
    bullet1_coord: "Inhalt: 2-Schritt-Kombinationen aus dem Fechten",
    bullet2_coord: "Zielgruppe: Mittelstufe – Grundtechniken sollten sitzen",
    bullet3_coord: "Intensität: Mittel – kognitiv anspruchsvoll",
    type_footwork: "Fußarbeit Fokus",
    desc_footwork: "Nur reine Fußarbeit (Vor, Zurück, Balestra) – kein Klingentraining.",
    longdesc_footwork: "Reines Fußarbeits-Training ohne fechttechnische Elemente. Vor, Zurück, Balestra und Ausfall stehen im Mittelpunkt – Klingenarbeit entfällt komplett. Ideal um Beinarbeit und Gleichgewicht isoliert zu verbessern.",
    bullet1_footwork: "Inhalt: Vor, Zurück, Balestra, Ausfall",
    bullet2_footwork: "Zielgruppe: Anfänger bis Fortgeschrittene",
    bullet3_footwork: "Intensität: Variabel – je nach gewähltem Tempo",
    startTraining: "Training starten",
    closeCard: "Schließen",

    // ─── Fencing moves ────────────────────────────────────────────────────────
    move_vor: "Vor",
    move_zurueck: "Zurück",
    move_ausfall: "Ausfall",
    move_quart: "Quart",
    move_oktav: "Oktav",
    move_quint: "Quint",
    move_riposte: "Riposte",
    move_engarde: "En Garde",
    move_balestra: "Balestra",

    // ─── Warm-up exercises ────────────────────────────────────────────────────
    move_w_laufen: "Laufen",
    move_w_hampelmann: "Hampelmann",
    move_w_knieheben: "Knie heben",
    move_w_armkreisen: "Arme kreisen",
    move_w_schultern: "Schultern kreisen",
    move_w_rumpf: "Rumpf drehen",
    move_w_sprunge: "Leichte Sprünge",
    move_w_hocke: "Tiefe Hocke",

    // ─── Cool-down exercises ──────────────────────────────────────────────────
    move_c_atmen: "Tief atmen",
    move_c_schulter: "Schulter dehnen",
    move_c_wade: "Wade dehnen",
    move_c_quad: "Oberschenkel dehnen",
    move_c_seite: "Seitendehnung",
    move_c_nacken: "Nacken lockern",
    move_c_gehen: "Langsam gehen",
    move_c_ruecken: "Rücken dehnen",

    // ─── Phase announcements (complete training) ──────────────────────────────
    phase_warmup: "Aufwärmphase! Los geht's!",
    phase_main: "Haupttraining! Fechttechnik!",
    phase_cooldown: "Abkühlphase. Gut gemacht!",

    // ─── Motivational phrases (Drill Sergeant) ────────────────────────────────
    motiv_1: "Schneller!",
    motiv_2: "Weiter so!",
    motiv_3: "Fokus!",
    motiv_4: "Komm schon!",
    motiv_5: "Nicht nachlassen!",
    motiv_6: "Gib alles!",

    spaceSize: "Verfügbarer Platz",
    spaceSizeSmall: "Klein",
    spaceSizeSmallDesc: "±1 Schritt",
    spaceSizeMedium: "Mittel",
    spaceSizeMediumDesc: "±2 Schritte",
    spaceSizeLarge: "Groß",
    spaceSizeLargeDesc: "Unbegrenzt",

    cooldown_prefix: "Langsam",
    warmup_prefix: "Und",
    combo_connector: "dann",

    // ─── Guide page ───────────────────────────────────────────────────────────
    guideTitle: "Übungsguide",
    guideSubtitle: "SVG-Illustrationen und Anleitungen für alle Übungen",
    guideButton: "Übungsguide ansehen",
    guideBack: "Zurück",
    guideHelpTooltip: "Übungsanleitung öffnen",
    cat_all: "Alle",
    cat_fencing: "Fechttechnik",
    cat_warmup: "Aufwärmen",
    cat_cooldown: "Abkühlen",

    // ─── Fencing move descriptions ────────────────────────────────────────────
    desc_vor: "Führe den vorderen Fuß nach vorne, dann ziehe den hinteren Fuß nach. Halte stets die Fechterstellung mit gebeugten Knien. Bewege dich gleichmäßig und kontrolliert vorwärts.",
    desc_zurueck: "Führe den hinteren Fuß nach hinten, dann ziehe den vorderen Fuß nach. Bleibe in der Fechterstellung mit tiefem Schwerpunkt. Achte auf gleichmäßigen Abstand der Füße.",
    desc_ausfall: "Strecke den vorderen Fuß kraftvoll nach vorne und strecke gleichzeitig die hintere Bein. Der Körper bleibt waagerecht, der Waffenarm schießt vor. Danach sofort in die Ausgangslage zurückkehren.",
    desc_quart: "Die Quart-Parade schützt die Innenlinie. Drehe das Handgelenk leicht nach innen und führe die Klinge zur linken Seite. Die Bewegung kommt aus dem Handgelenk – der Ellbogen bleibt nahe am Körper.",
    desc_oktav: "Die Oktav-Parade schützt die untere Außenlinie. Das Handgelenk dreht nach außen-unten, die Klinge weist zur rechten Seite und leicht nach unten. Kurze, präzise Handgelenkbewegung.",
    desc_quint: "Die Quint-Parade schützt den Kopf. Die Klinge wird horizontal über den Kopf geführt, Schneide nach oben. Achte darauf, die Schulter nicht anzuheben – die Kraft kommt aus dem Unterarm.",
    desc_riposte: "Nach einer erfolgreichen Parade folgt sofort der Gegenangriff. Strecke den Waffenarm zügig aus und treffe den Gegner, bevor er sich erholen kann. Timing und Schnelligkeit sind entscheidend.",
    desc_engarde: "Die Grundhaltung im Fechten: Knie gebeugt, Gewicht gleichmäßig auf beide Füße verteilt, Waffenarm leicht angehoben. Halte die Schultern entspannt, den Blick auf den Gegner gerichtet.",
    desc_balestra: "Ein kurzer Sprung nach vorne aus der Fechterstellung, bei dem beide Füße gleichzeitig abheben. Lande in der Fechterstellung und folge sofort mit einem Ausfall. Nutze den Schwung des Sprungs für mehr Reichweite.",

    // ─── Warm-up move descriptions ────────────────────────────────────────────
    desc_w_laufen: "Laufe locker auf der Stelle, hebe die Knie auf Hüfthöhe. Atme gleichmäßig und bleibe entspannt. 30 bis 60 Sekunden zum Aufwärmen der Muskulatur.",
    desc_w_hampelmann: "Springe mit gespreizten Beinen und hebe gleichzeitig die Arme über den Kopf. Dann springe zurück in die Ausgangsposition. Halte ein gleichmäßiges Tempo für 20–30 Wiederholungen.",
    desc_w_knieheben: "Hebe die Knie abwechselnd so hoch wie möglich, möglichst bis zur Hüfte. Bewege die Arme im Gegentakt mit. Führe 20–30 Wiederholungen pro Seite durch.",
    desc_w_armkreisen: "Strecke beide Arme seitlich aus und kreise sie langsam nach vorne, dann nach hinten. Führe 10 Kreise in jede Richtung durch. Die Bewegung sollte aus der Schulter kommen.",
    desc_w_schultern: "Kreise beide Schultern langsam nach vorne und nach hinten. Führe jeweils 10 Rotationen durch. Diese Übung lockert die Nacken- und Schultermuskulatur.",
    desc_w_rumpf: "Stelle dich schulterbreit hin und drehe den Oberkörper abwechselnd nach rechts und links. Die Hüften bleiben dabei möglichst ruhig. Führe 10–15 Rotationen in jede Richtung durch.",
    desc_w_sprunge: "Führe kleine, leichte Sprünge auf der Stelle durch, bleibe dabei auf den Fußballen. Halte die Knie leicht gebeugt für eine sanfte Landung. Springe 30–60 Sekunden lang.",
    desc_w_hocke: "Beuge die Knie und gehe so tief wie möglich in die Hocke, Rücken gerade, Fersen am Boden. Halte die Position 2–3 Sekunden und komme dann wieder hoch. Führe 10–12 Wiederholungen durch.",

    // ─── Cool-down move descriptions ─────────────────────────────────────────
    desc_c_atmen: "Atme tief durch die Nase ein (4 Sekunden), halte kurz an (2 Sekunden), und atme langsam durch den Mund aus (6 Sekunden). Wiederhole 5–8 Mal, um den Herzschlag zu senken.",
    desc_c_schulter: "Führe einen Arm gerade über die Brust und halte ihn mit dem anderen Arm für 20–30 Sekunden. Dann die Seite wechseln. Achte auf entspannte Schultern und gleichmäßiges Atmen.",
    desc_c_wade: "Stelle dich vor eine Wand, ein Bein nach hinten gestreckt, Ferse am Boden. Lehne dich leicht in Richtung Wand, bis du die Wade dehnen spürst. Halte 20–30 Sekunden, dann Seite wechseln.",
    desc_c_quad: "Stehe auf einem Bein und ziehe den Fuß des anderen Beins zum Gesäß. Halte den Fuß 20–30 Sekunden, dann Seite wechseln. Für Gleichgewicht an einer Wand abstützen.",
    desc_c_seite: "Strecke einen Arm über den Kopf und beuge den Oberkörper zur Seite. Halte die Dehnung 20–30 Sekunden, dann Seite wechseln. Atme gleichmäßig und vermeide Hohlkreuz.",
    desc_c_nacken: "Senke den Kopf langsam zur Seite, nach vorne und zur anderen Seite. Führe keine vollständigen Kreise durch – Rückwärtsstrecken vermeiden. 5–8 Wiederholungen in jede Richtung.",
    desc_c_gehen: "Gehe 2–3 Minuten in ruhigem Tempo, um die Herzfrequenz zu senken. Atme tief und gleichmäßig. Du kannst dabei den Raum umrunden oder auf der Stelle treten.",
    desc_c_ruecken: "Strecke beide Arme nach vorne aus und beuge dich mit rundem Rücken leicht nach vorne. Halte 20–30 Sekunden. Alternativ: Lege dich auf den Boden und ziehe die Knie zur Brust.",

    // ─── Club section ─────────────────────────────────────────────────────────

    // ─── Erfolge page ─────────────────────────────────────────────────────────
  },
  en: {
    appTitle: "Sabre Fencing Training",
    appDesc: "Improve your footwork and reaction time with the ultimate audio training partner.",
    start: "Start Training",
    history: "History",
    selectTraining: "Select Session",
    settings: "Settings",
    duration: "Duration (Minutes)",
    moves: "Footwork & Actions",
    speed: "Pace",
    pause: "Pause between commands",
    slow: "Slow",
    medium: "Medium",
    fast: "Fast",
    begin: "Begin!",
    stop: "Stop",
    summary: "Session Report",
    timeTrained: "Time Trained",
    calories: "Calories (est.)",
    commandsCalled: "Commands",
    newTraining: "New Training",
    saveSuccess: "Session saved!",
    noHistory: "No sessions recorded yet.",
    voiceVolume: "Voice",
    musicVolume: "Music",
    backgroundMusic: "Background Music",
    pauseTraining: "Pause Training",
    resumeTraining: "Resume",
    stopTraining: "End Training",
    continueQuestion: "What do you want to do?",

    type_complete: "Complete Training",
    desc_complete: "Warm-up → Fencing technique → Cool-down. The full session in one go.",
    longdesc_complete: "The complete training session guides you through all three phases in a structured way: warm-up, fencing technique, and cool-down. Ideal for a balanced session that develops both body and technique equally. Perfect for your regular training routine.",
    bullet1_complete: "Content: Warm-up, fencing technique, and cool-down phases",
    bullet2_complete: "Audience: All skill levels",
    bullet3_complete: "Intensity: Medium – balanced and structured",
    type_drill: "Drill Sergeant",
    desc_drill: "Maximum intensity, fast pace, motivation after every command. No mercy!",
    longdesc_drill: "The Drill Sergeant is your toughest training partner. Commands follow in rapid succession, with a motivating call-out after every order. No breaks, no mercy – only performance. This format is designed for short, high-intensity sessions.",
    bullet1_drill: "Content: Fencing technique at maximum intensity",
    bullet2_drill: "Audience: Advanced and competition-oriented athletes",
    bullet3_drill: "Intensity: High – fast pace, full concentration required",
    type_warmup: "Warm Up",
    desc_warmup: "General warm-up program: jogging, stretching, mobilization – no fencing.",
    longdesc_warmup: "The warm-up program specifically prepares your muscles, joints, and cardiovascular system for fencing. Without any fencing technique, the focus is on general mobilization and activation. Ideal as a standalone session or before technical training.",
    bullet1_warmup: "Content: Jogging, stretching, mobilization exercises",
    bullet2_warmup: "Audience: Everyone – especially recommended before intense training",
    bullet3_warmup: "Intensity: Low – gentle and progressive",
    type_cooldown: "Cool Down",
    desc_cooldown: "Gentle cool-down after training: stretches, breathing, mobilization.",
    longdesc_cooldown: "The cool-down program helps your body return to its resting state after training. Breathing exercises, gentle stretches, and mobilization lower heart rate and muscle tension. Essential for recovery and injury prevention.",
    bullet1_cooldown: "Content: Breathing exercises, stretches, mobilization",
    bullet2_cooldown: "Audience: Everyone – especially after intense sessions",
    bullet3_cooldown: "Intensity: Very low – relaxing and restorative",
    type_coord: "Coordination",
    desc_coord: "Combination training: coach calls 2-step sequences (e.g. Advance – Lunge!).",
    longdesc_coord: "In coordination training, you practice linking two movements quickly and fluidly. The coach announces two-move sequences – you respond to the first cue and immediately execute the second. Improves reaction speed and movement flow.",
    bullet1_coord: "Content: 2-step fencing combinations",
    bullet2_coord: "Audience: Intermediate – basic techniques should be solid",
    bullet3_coord: "Intensity: Medium – cognitively demanding",
    type_footwork: "Footwork Focus",
    desc_footwork: "Pure footwork only (Advance, Retreat, Balestra) – no blade actions.",
    longdesc_footwork: "Pure footwork training with no fencing technique elements. Advance, Retreat, Balestra, and Lunge are the focus – blade work is entirely absent. Ideal for isolating and improving legwork and balance.",
    bullet1_footwork: "Content: Advance, Retreat, Balestra, Lunge",
    bullet2_footwork: "Audience: Beginners to advanced",
    bullet3_footwork: "Intensity: Variable – depends on chosen pace",
    startTraining: "Start Training",
    closeCard: "Close",

    move_vor: "Advance",
    move_zurueck: "Retreat",
    move_ausfall: "Lunge",
    move_quart: "Quarte",
    move_oktav: "Octave",
    move_quint: "Quinte",
    move_riposte: "Riposte",
    move_engarde: "En Garde",
    move_balestra: "Balestra",

    move_w_laufen: "Jog in place",
    move_w_hampelmann: "Jumping jacks",
    move_w_knieheben: "High knees",
    move_w_armkreisen: "Arm circles",
    move_w_schultern: "Shoulder rolls",
    move_w_rumpf: "Trunk rotation",
    move_w_sprunge: "Light hops",
    move_w_hocke: "Deep squat",

    move_c_atmen: "Deep breath",
    move_c_schulter: "Shoulder stretch",
    move_c_wade: "Calf stretch",
    move_c_quad: "Quad stretch",
    move_c_seite: "Side stretch",
    move_c_nacken: "Neck rolls",
    move_c_gehen: "Walk slowly",
    move_c_ruecken: "Back stretch",

    phase_warmup: "Warm-up phase! Let's go!",
    phase_main: "Main training! Fencing technique!",
    phase_cooldown: "Cool-down phase. Well done!",

    motiv_1: "Faster!",
    motiv_2: "Keep going!",
    motiv_3: "Focus!",
    motiv_4: "Come on!",
    motiv_5: "Don't stop!",
    motiv_6: "Give it all!",

    spaceSize: "Available Space",
    spaceSizeSmall: "Small",
    spaceSizeSmallDesc: "±1 step",
    spaceSizeMedium: "Medium",
    spaceSizeMediumDesc: "±2 steps",
    spaceSizeLarge: "Large",
    spaceSizeLargeDesc: "Unlimited",

    cooldown_prefix: "Slowly",
    warmup_prefix: "And",
    combo_connector: "then",

    // ─── Guide page ───────────────────────────────────────────────────────────
    guideTitle: "Exercise Guide",
    guideSubtitle: "SVG illustrations and instructions for all exercises",
    guideButton: "View Exercise Guide",
    guideBack: "Back",
    guideHelpTooltip: "Open exercise guide",
    cat_all: "All",
    cat_fencing: "Fencing Technique",
    cat_warmup: "Warm-up",
    cat_cooldown: "Cool-down",

    // ─── Fencing move descriptions ────────────────────────────────────────────
    desc_vor: "Step forward with the front foot, then bring the rear foot up. Always maintain the on-guard position with bent knees. Move smoothly and in a controlled manner.",
    desc_zurueck: "Step back with the rear foot, then bring the front foot back. Stay in guard position with a low center of gravity. Keep an even distance between your feet.",
    desc_ausfall: "Drive the front foot forward powerfully while extending the rear leg. Keep your body horizontal and extend your weapon arm. Return to the guard position immediately afterward.",
    desc_quart: "The quarte parry protects the inside line. Rotate the wrist slightly inward and guide the blade to the left side. The movement comes from the wrist — keep the elbow close to the body.",
    desc_oktav: "The octave parry protects the lower outside line. The wrist rotates outward-downward, the blade points to the right and slightly downward. A short, precise wrist movement.",
    desc_quint: "The quinte parry protects the head. The blade is guided horizontally above the head, cutting edge upward. Avoid raising the shoulder — the power comes from the forearm.",
    desc_riposte: "After a successful parry, immediately launch a counterattack. Extend your weapon arm swiftly and hit your opponent before they recover. Timing and speed are essential.",
    desc_engarde: "The basic fencing stance: knees bent, weight evenly distributed on both feet, weapon arm slightly raised. Keep shoulders relaxed, eyes on your opponent.",
    desc_balestra: "A short jump forward from the guard position, lifting both feet simultaneously. Land in guard and immediately follow with a lunge. Use the momentum of the jump for extra reach.",

    // ─── Warm-up move descriptions ────────────────────────────────────────────
    desc_w_laufen: "Jog lightly in place, lifting your knees to hip height. Breathe evenly and stay relaxed. Continue for 30 to 60 seconds to warm up the muscles.",
    desc_w_hampelmann: "Jump with legs apart while raising both arms overhead. Then jump back to the starting position. Maintain a steady pace for 20–30 repetitions.",
    desc_w_knieheben: "Lift your knees alternately as high as possible, ideally to hip level. Swing your arms in the opposite rhythm. Perform 20–30 repetitions per side.",
    desc_w_armkreisen: "Extend both arms sideways and circle them slowly forward, then backward. Complete 10 circles in each direction. The motion should come from the shoulder joint.",
    desc_w_schultern: "Slowly roll both shoulders forward and backward. Complete 10 rotations in each direction. This exercise loosens the neck and shoulder muscles.",
    desc_w_rumpf: "Stand shoulder-width apart and rotate your upper body alternately to the right and left. Try to keep your hips as still as possible. Perform 10–15 rotations in each direction.",
    desc_w_sprunge: "Perform small, light hops in place, staying on the balls of your feet. Keep your knees slightly bent for a soft landing. Hop continuously for 30–60 seconds.",
    desc_w_hocke: "Bend your knees and sink as deep as possible into a squat, keeping your back straight and heels on the floor. Hold for 2–3 seconds, then rise. Perform 10–12 repetitions.",

    // ─── Cool-down move descriptions ─────────────────────────────────────────
    desc_c_atmen: "Breathe in deeply through your nose (4 seconds), hold briefly (2 seconds), and exhale slowly through your mouth (6 seconds). Repeat 5–8 times to lower your heart rate.",
    desc_c_schulter: "Bring one arm straight across your chest and hold it with the other arm for 20–30 seconds. Switch sides. Keep shoulders relaxed and breathe evenly.",
    desc_c_wade: "Stand in front of a wall with one leg extended back, heel on the floor. Lean gently toward the wall until you feel the calf stretch. Hold for 20–30 seconds, then switch sides.",
    desc_c_quad: "Stand on one leg and pull the foot of the other leg toward your glutes. Hold for 20–30 seconds, then switch sides. Use a wall for balance if needed.",
    desc_c_seite: "Extend one arm overhead and lean your upper body to the side. Hold the stretch for 20–30 seconds, then switch sides. Breathe evenly and avoid arching your lower back.",
    desc_c_nacken: "Slowly tilt your head to the side, forward, and to the other side. Avoid full circles — do not tilt backward. Perform 5–8 repetitions in each direction.",
    desc_c_gehen: "Walk at a gentle pace for 2–3 minutes to bring your heart rate down. Breathe deeply and evenly. You can walk around the room or march in place.",
    desc_c_ruecken: "Extend both arms forward and round your back slightly as you lean forward. Hold for 20–30 seconds. Alternatively, lie on the floor and pull your knees to your chest.",

    // ─── Club section ─────────────────────────────────────────────────────────

    // ─── Erfolge page ─────────────────────────────────────────────────────────
  },
  fr: {
    appTitle: "Entraînement de Sabre",
    appDesc: "Améliorez votre jeu de jambes et vos réflexes avec le partenaire audio ultime.",
    start: "Commencer l'entraînement",
    history: "Historique",
    selectTraining: "Choisissez la séance",
    settings: "Paramètres",
    duration: "Durée (Minutes)",
    moves: "Déplacements & Actions",
    speed: "Rythme",
    pause: "Pause entre les commandes",
    slow: "Lent",
    medium: "Moyen",
    fast: "Rapide",
    begin: "Allez!",
    stop: "Arrêter",
    summary: "Rapport de séance",
    timeTrained: "Temps",
    calories: "Calories (est.)",
    commandsCalled: "Commandes",
    newTraining: "Nouvel entraînement",
    saveSuccess: "Séance enregistrée!",
    noHistory: "Aucune séance enregistrée.",
    voiceVolume: "Voix",
    musicVolume: "Musique",
    backgroundMusic: "Musique de fond",
    pauseTraining: "Pause",
    resumeTraining: "Reprendre",
    stopTraining: "Terminer",
    continueQuestion: "Que voulez-vous faire?",

    type_complete: "Entraînement complet",
    desc_complete: "Échauffement → Technique → Récupération. La séance complète en un seul passage.",
    longdesc_complete: "La séance d'entraînement complète vous guide de façon structurée à travers les trois phases: échauffement, technique d'escrime et récupération. Idéal pour un entraînement équilibré qui développe le corps et la technique de façon harmonieuse. Parfait pour votre routine d'entraînement régulière.",
    bullet1_complete: "Contenu: Phases d'échauffement, de technique et de récupération",
    bullet2_complete: "Public: Tous les niveaux",
    bullet3_complete: "Intensité: Moyenne – équilibrée et structurée",
    type_drill: "Drill Sergeant",
    desc_drill: "Intensité maximale, rythme rapide, motivation après chaque commande. Sans pitié!",
    longdesc_drill: "Le Drill Sergeant est votre partenaire d'entraînement le plus exigeant. Les commandes se succèdent rapidement, avec une phrase de motivation après chaque ordre. Sans pause, sans pitié – uniquement la performance. Ce format est conçu pour des séances courtes et très intenses.",
    bullet1_drill: "Contenu: Technique d'escrime à intensité maximale",
    bullet2_drill: "Public: Athlètes avancés et orientés compétition",
    bullet3_drill: "Intensité: Élevée – rythme rapide, concentration totale requise",
    type_warmup: "Échauffement",
    desc_warmup: "Programme d'échauffement général: course, étirements, mobilisation – sans escrime.",
    longdesc_warmup: "Le programme d'échauffement prépare spécifiquement vos muscles, articulations et système cardiovasculaire pour l'escrime. Sans éléments de technique d'escrime, l'accent est mis sur la mobilisation et l'activation générales. Idéal en séance autonome ou avant l'entraînement technique.",
    bullet1_warmup: "Contenu: Course, étirements, exercices de mobilisation",
    bullet2_warmup: "Public: Tous – particulièrement recommandé avant un entraînement intense",
    bullet3_warmup: "Intensité: Faible – douce et progressive",
    type_cooldown: "Récupération",
    desc_cooldown: "Récupération douce après l'entraînement: étirements, respiration, mobilisation.",
    longdesc_cooldown: "Le programme de récupération aide votre corps à retrouver son état de repos après l'entraînement. Les exercices de respiration, les étirements doux et la mobilisation abaissent le rythme cardiaque et la tension musculaire. Indispensable pour la récupération et la prévention des blessures.",
    bullet1_cooldown: "Contenu: Exercices de respiration, étirements, mobilisation",
    bullet2_cooldown: "Public: Tous – particulièrement après les séances intenses",
    bullet3_cooldown: "Intensité: Très faible – relaxant et régénérant",
    type_coord: "Coordination",
    desc_coord: "Entraînement combiné: le coach appelle des séquences de 2 (ex. Avancer – Fente!).",
    longdesc_coord: "Dans l'entraînement de coordination, vous pratiquez l'enchaînement rapide et fluide de deux mouvements. Le coach annonce des séquences en deux temps – vous réagissez à la première commande et exécutez immédiatement la seconde. Améliore la vitesse de réaction et la fluidité des mouvements.",
    bullet1_coord: "Contenu: Combinaisons d'escrime en 2 mouvements",
    bullet2_coord: "Public: Niveau intermédiaire – les techniques de base doivent être maîtrisées",
    bullet3_coord: "Intensité: Moyenne – exigeante sur le plan cognitif",
    type_footwork: "Travail des pieds",
    desc_footwork: "Uniquement le jeu de jambes (Avancer, Reculer, Balestra) – sans lame.",
    longdesc_footwork: "Entraînement pur du jeu de jambes sans aucun élément de technique d'escrime. Avancer, Reculer, Balestra et Fente sont au centre – le travail de lame est totalement absent. Idéal pour isoler et améliorer le jeu de jambes et l'équilibre.",
    bullet1_footwork: "Contenu: Avancer, Reculer, Balestra, Fente",
    bullet2_footwork: "Public: Débutants à avancés",
    bullet3_footwork: "Intensité: Variable – selon le rythme choisi",
    startTraining: "Commencer l'entraînement",
    closeCard: "Fermer",

    move_vor: "Avancez",
    move_zurueck: "Reculez",
    move_ausfall: "Fente",
    move_quart: "Quarte",
    move_oktav: "Octave",
    move_quint: "Quinte",
    move_riposte: "Ripostez",
    move_engarde: "En Garde",
    move_balestra: "Balestra",

    move_w_laufen: "Course sur place",
    move_w_hampelmann: "Sauts d'étoile",
    move_w_knieheben: "Montées de genoux",
    move_w_armkreisen: "Rotations des bras",
    move_w_schultern: "Rotations des épaules",
    move_w_rumpf: "Rotation du tronc",
    move_w_sprunge: "Petits sauts",
    move_w_hocke: "Squat profond",

    move_c_atmen: "Respiration profonde",
    move_c_schulter: "Étirement des épaules",
    move_c_wade: "Étirement des mollets",
    move_c_quad: "Étirement des quadriceps",
    move_c_seite: "Étirement latéral",
    move_c_nacken: "Rotations du cou",
    move_c_gehen: "Marcher lentement",
    move_c_ruecken: "Étirement du dos",

    phase_warmup: "Phase d'échauffement! C'est parti!",
    phase_main: "Entraînement principal! Technique d'escrime!",
    phase_cooldown: "Phase de récupération. Bien joué!",

    motiv_1: "Plus vite!",
    motiv_2: "Continuez!",
    motiv_3: "Concentration!",
    motiv_4: "Allez!",
    motiv_5: "Ne lâchez pas!",
    motiv_6: "Tout donnez!",

    spaceSize: "Espace disponible",
    spaceSizeSmall: "Petit",
    spaceSizeSmallDesc: "±1 pas",
    spaceSizeMedium: "Moyen",
    spaceSizeMediumDesc: "±2 pas",
    spaceSizeLarge: "Grand",
    spaceSizeLargeDesc: "Illimité",

    cooldown_prefix: "Lentement",
    warmup_prefix: "Et",
    combo_connector: "puis",

    // ─── Guide page ───────────────────────────────────────────────────────────
    guideTitle: "Guide des exercices",
    guideSubtitle: "Illustrations SVG et instructions pour tous les exercices",
    guideButton: "Voir le guide des exercices",
    guideBack: "Retour",
    guideHelpTooltip: "Ouvrir le guide",
    cat_all: "Tout",
    cat_fencing: "Technique d'escrime",
    cat_warmup: "Échauffement",
    cat_cooldown: "Récupération",

    // ─── Fencing move descriptions ────────────────────────────────────────────
    desc_vor: "Avancez le pied avant, puis ramenez le pied arrière. Gardez toujours la position en garde avec les genoux fléchis. Déplacez-vous de façon régulière et contrôlée.",
    desc_zurueck: "Reculez le pied arrière, puis ramenez le pied avant. Restez en position de garde avec le centre de gravité bas. Maintenez un espace régulier entre vos pieds.",
    desc_ausfall: "Poussez le pied avant vers l'avant en étendant la jambe arrière. Le corps reste horizontal, le bras armé se tend. Revenez immédiatement en garde.",
    desc_quart: "La parade de quarte protège la ligne intérieure. Faites pivoter légèrement le poignet vers l'intérieur et guidez la lame vers la gauche. Le mouvement vient du poignet — gardez le coude près du corps.",
    desc_oktav: "La parade d'octave protège la ligne extérieure basse. Le poignet tourne vers l'extérieur-bas, la lame pointe vers la droite et légèrement vers le bas. Mouvement de poignet court et précis.",
    desc_quint: "La parade de quinte protège la tête. La lame est guidée horizontalement au-dessus de la tête, tranchant vers le haut. Évitez de lever l'épaule — la force vient de l'avant-bras.",
    desc_riposte: "Après une parade réussie, lancez immédiatement une contre-attaque. Étendez le bras armé rapidement pour toucher l'adversaire avant qu'il ne récupère. Le timing et la vitesse sont essentiels.",
    desc_engarde: "La position de base en escrime: genoux fléchis, poids également réparti sur les deux pieds, bras armé légèrement levé. Gardez les épaules décontractées, les yeux sur l'adversaire.",
    desc_balestra: "Un court saut en avant depuis la position de garde, avec les deux pieds qui décollent simultanément. Atterrissez en garde et enchaînez immédiatement avec une fente. Utilisez l'élan du saut pour plus de portée.",

    // ─── Warm-up move descriptions ────────────────────────────────────────────
    desc_w_laufen: "Courez légèrement sur place en levant les genoux à hauteur de hanche. Respirez régulièrement et restez détendu. Continuez pendant 30 à 60 secondes pour échauffer les muscles.",
    desc_w_hampelmann: "Sautez les jambes écartées en levant les bras au-dessus de la tête. Revenez ensuite à la position initiale. Maintenez un rythme régulier pendant 20 à 30 répétitions.",
    desc_w_knieheben: "Levez les genoux alternativement aussi haut que possible, idéalement jusqu'à la hanche. Balancez les bras en rythme opposé. Effectuez 20 à 30 répétitions par côté.",
    desc_w_armkreisen: "Étendez les deux bras sur les côtés et faites-les tourner lentement vers l'avant, puis vers l'arrière. Effectuez 10 cercles dans chaque direction. Le mouvement doit partir de l'épaule.",
    desc_w_schultern: "Faites tourner les deux épaules lentement vers l'avant et vers l'arrière. Effectuez 10 rotations dans chaque direction. Cet exercice détend les muscles du cou et des épaules.",
    desc_w_rumpf: "Tenez-vous debout, les pieds à largeur d'épaules, et tournez le buste alternativement à droite et à gauche. Essayez de garder les hanches aussi immobiles que possible. Effectuez 10 à 15 rotations dans chaque direction.",
    desc_w_sprunge: "Effectuez de petits sauts légers sur place en restant sur la pointe des pieds. Gardez les genoux légèrement fléchis pour un atterrissage doux. Sautez pendant 30 à 60 secondes.",
    desc_w_hocke: "Fléchissez les genoux et descendez aussi bas que possible, le dos droit et les talons au sol. Maintenez 2 à 3 secondes, puis relevez-vous. Effectuez 10 à 12 répétitions.",

    // ─── Cool-down move descriptions ─────────────────────────────────────────
    desc_c_atmen: "Inspirez profondément par le nez (4 secondes), retenez brièvement (2 secondes) et expirez lentement par la bouche (6 secondes). Répétez 5 à 8 fois pour faire baisser le rythme cardiaque.",
    desc_c_schulter: "Ramenez un bras tendu devant la poitrine et maintenez-le avec l'autre bras pendant 20 à 30 secondes. Changez de côté. Gardez les épaules décontractées et respirez régulièrement.",
    desc_c_wade: "Tenez-vous face à un mur avec une jambe étendue en arrière, le talon au sol. Penchez-vous doucement vers le mur jusqu'à sentir l'étirement du mollet. Maintenez 20 à 30 secondes, puis changez de côté.",
    desc_c_quad: "Tenez-vous sur une jambe et tirez le pied de l'autre jambe vers les fessiers. Maintenez 20 à 30 secondes, puis changez de côté. Appuyez-vous sur un mur pour l'équilibre si nécessaire.",
    desc_c_seite: "Étendez un bras au-dessus de la tête et penchez le haut du corps sur le côté. Maintenez l'étirement pendant 20 à 30 secondes, puis changez de côté. Respirez régulièrement et évitez de creuser les reins.",
    desc_c_nacken: "Inclinez lentement la tête sur le côté, vers l'avant et vers l'autre côté. Évitez les cercles complets — ne penchinez pas en arrière. Effectuez 5 à 8 répétitions dans chaque direction.",
    desc_c_gehen: "Marchez à un rythme doux pendant 2 à 3 minutes pour faire baisser la fréquence cardiaque. Respirez profondément et régulièrement. Vous pouvez faire le tour de la pièce ou marcher sur place.",
    desc_c_ruecken: "Étendez les deux bras vers l'avant et arrondissez légèrement le dos en vous penchant. Maintenez 20 à 30 secondes. Alternative: allongez-vous au sol et ramenez les genoux vers la poitrine.",

    // ─── Club section ─────────────────────────────────────────────────────────

    // ─── Erfolge page ─────────────────────────────────────────────────────────
  }
};

// ─── Modal i18n keys ──────────────────────────────────────────────────────────

export const MODAL_LABELS = {
  de: { steps: "Schritt-für-Schritt", tips: "Tipps & Beispiele", close: "Schließen" },
  en: { steps: "Step by Step", tips: "Tips & Examples", close: "Close" },
  fr: { steps: "Étape par étape", tips: "Conseils & exemples", close: "Fermer" },
} as const;

export function tModalLabel(key: keyof typeof MODAL_LABELS.en, lang: Language): string {
  return MODAL_LABELS[lang][key];
}

// ─── Exercise detail data (steps + tips, all 23 exercises × 3 languages) ─────

interface ExerciseDetail {
  steps: string[];
  tips: string[];
}

export const EXERCISE_DETAILS: Record<Language, Record<string, ExerciseDetail>> = {
  de: {
    vor: {
      steps: [
        "Beginne in der Fechterstellung: Knie gebeugt, Gewicht gleichmäßig verteilt.",
        "Hebe den vorderen Fuß leicht an und setze ihn eine Schrittlänge vor dich.",
        "Ziehe den hinteren Fuß sofort nach, sodass der Abstand zwischen den Füßen gleich bleibt.",
        "Lande weich auf dem Fußballen und behalte die Knie gebeugt.",
        "Richte den Oberkörper auf und stelle sicher, dass die Schultern entspannt bleiben.",
      ],
      tips: [
        "Häufiger Fehler: Den hinteren Fuß zu langsam nachziehen – die Füße sollten fast gleichzeitig bewegt werden.",
        "Achte darauf, dass du dich nicht aufrichtest – der Schwerpunkt bleibt tief.",
        "Übung: Markiere zwei Punkte am Boden und übe, immer den gleichen Abstand einzuhalten.",
        "Temposteigerung: Übe erst langsam, dann in Trainingstempo, zuletzt reaktiv auf ein Signal.",
      ],
    },
    zurueck: {
      steps: [
        "Beginne in der Fechterstellung mit tiefem Schwerpunkt.",
        "Hebe den hinteren Fuß leicht an und setze ihn eine Schrittlänge nach hinten.",
        "Ziehe den vorderen Fuß sofort nach, um den Abstand zu erhalten.",
        "Lande kontrolliert auf dem Fußballen des hinteren Fußes.",
        "Halte die Knie gebeugt und den Oberkörper aufrecht.",
      ],
      tips: [
        "Häufiger Fehler: Den vorderen Fuß zu weit nachziehen und dabei die Fechterstellung verlieren.",
        "Schaue niemals nach unten – halte den Blick immer auf den Gegner gerichtet.",
        "Übung: Rücken an einer Wand entlangführen, um das Aufrichten zu korrigieren.",
        "Kombiniere Vor und Zurück abwechselnd, um Rhythmus und Reaktion zu trainieren.",
      ],
    },
    ausfall: {
      steps: [
        "Starte aus der Fechterstellung mit aktivierter hinterer Beinmuskulatur.",
        "Strecke das hintere Bein explosiv und schiebe den Körper nach vorne.",
        "Schieße den vorderen Fuß weit nach vorne, Ferse landet zuerst.",
        "Strecke gleichzeitig den Waffenarm vollständig aus.",
        "Lande mit dem hinteren Bein gestreckt und dem Körper in einer Linie.",
        "Ziehe sofort wieder zurück in die Fechterstellung.",
      ],
      tips: [
        "Häufiger Fehler: Den Waffenarm zu spät ausstrecken – Arm und Bein müssen gleichzeitig agieren.",
        "Der Ausfall kommt aus den Beinen, nicht aus dem Oberkörper – vermeide Vorwärtsneigen.",
        "Übung: Langsam ausführen und die Endposition 2 Sekunden halten, dann Technik prüfen.",
        "Reichweitentest: Miss regelmäßig deine Ausfallweite und versuche sie zu verbessern.",
      ],
    },
    quart: {
      steps: [
        "Beginne in der Fechterstellung mit dem Waffenarm entspannt in Position.",
        "Erkenne den Angriff auf die Innenlinie und reagiere sofort mit dem Handgelenk.",
        "Drehe das Handgelenk nach innen (Nagel zeigt nach oben-innen) und führe die Klinge zur linken Seite.",
        "Blockiere die gegnerische Klinge mit dem mittleren Drittel deiner Klinge.",
        "Gehe sofort in die Riposte über.",
      ],
      tips: [
        "Häufiger Fehler: Den ganzen Arm bewegen – die Quart kommt aus dem Handgelenk.",
        "Die Klinge schützt die Innenlinie – stelle sicher, dass dein Körper vollständig gedeckt ist.",
        "Übung: Trainiere die Handgelenkdrehung separat, ohne Klinge, bis die Bewegung sitzt.",
        "Variante: Übe Quart direkt aus der Angriffslinie des Partners – Reaktionsgeschwindigkeit zählt.",
      ],
    },
    oktav: {
      steps: [
        "Starte in der Fechterstellung und erkenne den Angriff auf die untere Außenlinie.",
        "Drehe das Handgelenk nach außen-unten (Nagel zeigt nach unten-außen).",
        "Führe die Klinge zur rechten Seite und leicht nach unten.",
        "Blockiere die Klinge sauber mit dem mittleren Klingendrittel.",
        "Folge sofort mit der Riposte.",
      ],
      tips: [
        "Häufiger Fehler: Den Arm zu weit nach unten führen – die Oktav schützt die untere Linie, nicht die Beine.",
        "Die Handgelenkdrehung ist entscheidend – übe sie langsam und bewusst.",
        "Übung: Lass einen Partner von unten-außen angreifen und pariere reaktiv.",
        "Kombination: Oktav-Parade gefolgt von einem Ausfall für einen schnellen Gegenangriff.",
      ],
    },
    quint: {
      steps: [
        "Erkenne den Kopfhieb des Gegners und reagiere mit der Quint-Parade.",
        "Hebe den Waffenarm an und führe die Klinge horizontal über den Kopf.",
        "Die Schneide zeigt nach oben, die Klinge bildet eine waagerechte Schutzlinie.",
        "Halte die Schulter entspannt – die Kraft kommt aus dem Unterarm.",
        "Gehe unmittelbar in die Riposte über.",
      ],
      tips: [
        "Häufiger Fehler: Die Schulter anheben – das kostet Kraft und verlangsamt die Riposte.",
        "Die Quint ist die Kopfparade im Säbel – übe sie besonders sorgfältig.",
        "Tipp: Stelle sicher, dass die Klinge weit genug über den Kopf reicht – keine Lücken lassen.",
        "Übung: Kombiniere Quint mit einer sofortigen Riposte auf die Schulter des Angreifers.",
      ],
    },
    riposte: {
      steps: [
        "Führe zunächst eine saubere Parade aus.",
        "Sofort nach dem Klingenkontakt: Strecke den Waffenarm zügig aus.",
        "Richte die Spitze direkt auf die Trefferfläche des Gegners.",
        "Treffe, bevor der Gegner die Klinge wieder unter Kontrolle hat.",
        "Kehre nach der Riposte sofort in die Fechterstellung zurück.",
      ],
      tips: [
        "Häufiger Fehler: Zu lange warten nach der Parade – die Riposte muss sofort folgen.",
        "Die Riposte kann einfach (direktes Ausstrecken) oder zusammengesetzt sein.",
        "Übung: Partner blockiert bewusst – übe, die Lücken in seiner Deckung zu finden.",
        "Zeitgefühl trainieren: Starte mit langsamem Tempo und steigere die Reaktionsgeschwindigkeit.",
      ],
    },
    engarde: {
      steps: [
        "Stelle dich seitlich auf, Füße schulterbreit auseinander und im rechten Winkel zueinander.",
        "Beuge beide Knie bis du den Tiefpunkt der Fechterstellung erreichst.",
        "Verteile das Gewicht gleichmäßig auf beide Füße.",
        "Hebe den Waffenarm auf Schulterhöhe, Ellbogen leicht gebeugt.",
        "Halte die freie Hand leicht hinter dem Körper für Balance.",
      ],
      tips: [
        "Häufiger Fehler: Zu wenig Kniebeugung – das schränkt Mobilität und Explosivität ein.",
        "Die En Garde Position ist deine Ausgangslage für alle Aktionen – übe sie täglich.",
        "Tipp: Halte die Position 30 Sekunden und prüfe, ob du nicht verkrampfst.",
        "Schultern entspannen: Lass sie aktiv fallen, bevor du in Position gehst.",
      ],
    },
    balestra: {
      steps: [
        "Beginne in der Fechterstellung und bereite eine explosive Beinbewegung vor.",
        "Hebe beide Füße gleichzeitig ab und springe kurz nach vorne.",
        "Lande mit beiden Füßen gleichzeitig in der Fechterstellung.",
        "Nutze die Landung als Startsignal und folge sofort mit einem Ausfall.",
        "Kehre nach dem Ausfall zügig in die Grundstellung zurück.",
      ],
      tips: [
        "Häufiger Fehler: Zu hoher Sprung – die Balestra ist eine flache, schnelle Vorwärtsbewegung.",
        "Timing ist alles: Die Balestra soll den Gegner destabilisieren, nicht erschöpfen.",
        "Übung: Übe nur die Sprungphase ohne Ausfall, bis die Landung sauber ist.",
        "Fortgeschritten: Kombiniere mit einem Täuschungsangriff vor der eigentlichen Balestra.",
      ],
    },
    w_laufen: {
      steps: [
        "Stelle dich aufrecht hin, Füße hüftbreit auseinander.",
        "Beginne im Stehen und hebe abwechselnd die Knie zur Hüfte.",
        "Bewege die Arme im Gegentakt: linkes Knie – rechter Arm vorne.",
        "Steigere das Tempo langsam auf ein lockeres Jogging-Tempo.",
        "Atme gleichmäßig ein und aus – nicht anhalten.",
      ],
      tips: [
        "Häufiger Fehler: Nur auf den Fersen landen – das belastet die Gelenke unnötig.",
        "Bleibe auf den Fußballen für eine weichere, schnellere Bewegung.",
        "Nutze diese Phase, um den Körper mental und physisch auf das Training vorzubereiten.",
        "Steigerung: Nach 30 Sekunden kurze Sprints einbauen (5 Sekunden schnell, 5 langsam).",
      ],
    },
    w_hampelmann: {
      steps: [
        "Starte mit geschlossenen Füßen und Armen neben dem Körper.",
        "Springe und spreize dabei die Beine schulterbreit auseinander.",
        "Hebe gleichzeitig beide Arme seitlich nach oben über den Kopf.",
        "Springe zurück in die Ausgangsposition mit geschlossenen Beinen.",
        "Wiederhole in einem gleichmäßigen Rhythmus.",
      ],
      tips: [
        "Häufiger Fehler: Arme und Beine nicht synchronisieren – übe es bewusst langsam.",
        "Bleibe auf den Fußballen für eine federnde, gelenksschonende Landung.",
        "Steigerung: Tempo erhöhen oder doppelte Hampelmänner einbauen (2 Sprünge in Position, 1 zurück).",
        "Ziel: 20–30 Wiederholungen ohne Pause für eine gute Aufwärmwirkung.",
      ],
    },
    w_knieheben: {
      steps: [
        "Stehe aufrecht mit leicht gebeugten Knien.",
        "Hebe das rechte Knie explosiv zur Hüfte oder darüber.",
        "Setze den rechten Fuß wieder ab und wechsle sofort zum linken Knie.",
        "Schwinge die Arme im Gegentakt mit (linker Arm vorne, wenn rechtes Knie oben).",
        "Steigere das Tempo, bis du locker läufst.",
      ],
      tips: [
        "Häufiger Fehler: Knie nur bis zur Hüfte bringen – versuche höher zu kommen.",
        "Halte den Oberkörper aufrecht, beuge dich nicht nach vorne.",
        "Übung: Starte mit 10 langsamen Wiederholungen, dann 20 schnelle.",
        "Koordinationsvariation: Klatsche bei jedem Knieheben in die Hände.",
      ],
    },
    w_armkreisen: {
      steps: [
        "Stehe aufrecht, Füße schulterbreit, Arme seitlich ausgestreckt.",
        "Kreise beide Arme langsam vorwärts (von unten nach oben, über den Kopf).",
        "Führe 10 Kreise vorwärts aus, dann ohne Pause 10 rückwärts.",
        "Achte darauf, dass die Bewegung wirklich aus der Schulter kommt.",
        "Halte die Arme dabei gestreckt, nicht herabhängen lassen.",
      ],
      tips: [
        "Häufiger Fehler: Ellbogen einknicken – halte die Arme vollständig gestreckt.",
        "Starte mit kleinen Kreisen und werde größer – das schont das Schultergelenk.",
        "Variation: Einen Arm vorwärts, einen rückwärts gleichzeitig (koordinativer).",
        "Nach dem Kreisen: Kurz die Schultern ausschütteln, um Spannung zu lösen.",
      ],
    },
    w_schultern: {
      steps: [
        "Stehe aufrecht, Arme locker an den Seiten.",
        "Hebe beide Schultern langsam in Richtung Ohren.",
        "Kreise sie nach hinten und nach unten in einer runden Bewegung.",
        "Führe 10 Kreise nach hinten aus, dann 10 nach vorne.",
        "Atme dabei gleichmäßig – ausatmen beim Abwärtskreisen.",
      ],
      tips: [
        "Häufiger Fehler: Schultern nur rauf und runter – es sollte ein echter Kreis sein.",
        "Diese Übung ist besonders wichtig nach langen Trainingseinheiten mit Klingenarbeit.",
        "Variation: Schultern abwechselnd kreisen (einer nach vorne, einer nach hinten).",
        "Tipp: Kombiniere mit Nackenneigung zur Seite für eine tiefere Mobilisierung.",
      ],
    },
    w_rumpf: {
      steps: [
        "Stelle dich schulterbreit hin, Hände an die Hüften oder Arme auf Brusthöhe verschränken.",
        "Drehe den Oberkörper langsam nach rechts, so weit wie möglich.",
        "Kehre zur Mitte zurück und drehe dann nach links.",
        "Die Hüften bleiben dabei möglichst frontal – nur der Oberkörper dreht sich.",
        "Führe 10–15 Drehungen pro Seite durch.",
      ],
      tips: [
        "Häufiger Fehler: Die Hüften mitdrehen – das nimmt die Wirkung von der Wirbelsäule.",
        "Starte langsam und werde mit jeder Wiederholung etwas schneller.",
        "Variation: Arme ausstrecken – das erhöht den Rotationswiderstand.",
        "Kombination: Rumpfdrehung mit leichter Kniebeugung für mehr Fechtkspezifität.",
      ],
    },
    w_sprunge: {
      steps: [
        "Starte auf den Fußballen, Knie leicht gebeugt.",
        "Hüpfe leicht auf der Stelle, ohne die Fersen abzusetzen.",
        "Halte die Knie bei jeder Landung leicht gebeugt.",
        "Arme locker an den Seiten lassen – sie helfen beim Rhythmus.",
        "Steigere das Tempo nach 15 Sekunden leicht.",
      ],
      tips: [
        "Häufiger Fehler: Auf den Fersen landen – das ist hart für die Gelenke.",
        "Denke an ein Seil springendes Bild – locker, leicht, rhythmisch.",
        "Diese Übung aktiviert die Wadenmuskulatur und verbessert die Reaktionsfähigkeit.",
        "Variation: Seitwärtshüpfen oder wechselseitig (links, rechts, mitte) für Koordination.",
      ],
    },
    w_hocke: {
      steps: [
        "Stehe schulterbreit, Zehen leicht nach außen gedreht.",
        "Beuge die Knie und senke den Körper langsam nach unten.",
        "Halte den Rücken gerade, Fersen am Boden, Knie über den Zehen.",
        "Gehe so tief wie möglich – idealerweise bis die Oberschenkel waagerecht sind.",
        "Halte 2–3 Sekunden unten, dann langsam wieder hochkommen.",
      ],
      tips: [
        "Häufiger Fehler: Fersen heben – das deutet auf mangelnde Knöchelflexibilität hin.",
        "Für Anfänger: Halte dich an einer Wand fest oder setze eine Platte unter die Fersen.",
        "Die tiefe Hocke ist eine der wichtigsten Übungen für die Fechterstellung.",
        "Steigerung: Halte die tiefste Position länger (5–10 Sekunden) für mehr Mobilitätsgewinn.",
      ],
    },
    c_atmen: {
      steps: [
        "Stehe oder sitze aufrecht, Schultern entspannt.",
        "Atme 4 Sekunden lang tief durch die Nase ein.",
        "Halte den Atem 2 Sekunden lang an.",
        "Atme 6 Sekunden lang langsam durch den Mund aus.",
        "Wiederhole diesen Zyklus 5–8 Mal.",
      ],
      tips: [
        "Diese Atemtechnik (4-2-6) aktiviert das parasympathische Nervensystem – ideal zum Abkühlen.",
        "Lege eine Hand auf den Bauch: beim Einatmen sollte er sich heben (Bauchatmung).",
        "Häufiger Fehler: Zu flache Atmung in die Brust – atme tief in den Bauch.",
        "Tipp: Schließe die Augen und visualisiere, wie die Anspannung mit jedem Ausatmen nachlässt.",
      ],
    },
    c_schulter: {
      steps: [
        "Stehe oder sitze aufrecht.",
        "Führe den rechten Arm gerade auf Brusthöhe über die Körpermitte.",
        "Halte ihn mit dem linken Unterarm und ziehe ihn sanft zur Brust.",
        "Halte 20–30 Sekunden und atme dabei gleichmäßig.",
        "Wechsle auf die andere Seite.",
      ],
      tips: [
        "Häufiger Fehler: Die Schulter des ausgestreckten Arms hochziehen – halte sie bewusst unten.",
        "Für eine tiefere Dehnung: Drehe den Kopf leicht weg von der gedehnten Seite.",
        "Diese Dehnung ist besonders wichtig für Fechter, die viel Klingenarbeit machen.",
        "Variation: Arm schräg oben (45°) für eine andere Portion des Deltamuskels.",
      ],
    },
    c_wade: {
      steps: [
        "Stelle dich vor eine Wand oder halte dich an einem Geländer fest.",
        "Stelle einen Fuß nach hinten, Ferse fest am Boden.",
        "Lehne den Körper leicht nach vorne, bis du die Dehnung in der Wade spürst.",
        "Halte 20–30 Sekunden und atme dabei ruhig.",
        "Wechsle die Seite.",
      ],
      tips: [
        "Häufiger Fehler: Ferse vom Boden abheben – das reduziert die Dehnung stark.",
        "Für eine tiefere Dehnung: Leicht das hintere Knie beugen (dehnt den Soleus-Muskel).",
        "Die Wadenmuskulatur ist für Fechter extrem wichtig – nimm dir für diese Dehnung Zeit.",
        "Variation: Dehnung auf einer Treppenstufe mit hängendem Fersenabsatz.",
      ],
    },
    c_quad: {
      steps: [
        "Stehe aufrecht, halte dich an einer Wand oder einem Stuhl fest.",
        "Beuge das rechte Knie und greife den Fuß mit der rechten Hand.",
        "Ziehe den Fuß sanft Richtung Gesäß, bis du die Dehnung im Oberschenkel spürst.",
        "Halte 20–30 Sekunden, Oberkörper aufrecht.",
        "Wechsle auf das linke Bein.",
      ],
      tips: [
        "Häufiger Fehler: Das Standbein überstrecken – halte es leicht gebeugt.",
        "Für mehr Tiefe: Schiebe die Hüfte leicht nach vorne, während du den Fuß hältst.",
        "Diese Dehnung entlastet den Kniebereich nach intensiver Fußarbeit.",
        "Variation: Im Liegen ausführen für eine entspanntere Position.",
      ],
    },
    c_seite: {
      steps: [
        "Stehe aufrecht, Füße schulterbreit.",
        "Strecke den rechten Arm gestreckt über den Kopf.",
        "Beuge den Oberkörper langsam nach links.",
        "Lass die linke Hand die Hüfte stabilisieren.",
        "Halte 20–30 Sekunden, dann Seite wechseln.",
      ],
      tips: [
        "Häufiger Fehler: Den Oberkörper nach vorne kippen – halte ihn in einer Ebene.",
        "Stelle sicher, dass du wirklich seitwärts beugst, nicht nach vorne oder hinten.",
        "Für eine tiefere Dehnung: Den ausgestreckten Arm leicht nach hinten rotieren.",
        "Variation: Im Sitzen (auf dem Boden) für mehr Stabilität und Tiefe.",
      ],
    },
    c_nacken: {
      steps: [
        "Setz dich oder stehe aufrecht, Schultern entspannt.",
        "Neige den Kopf langsam zur rechten Schulter.",
        "Halte 5 Sekunden, dann zurück zur Mitte.",
        "Neige nach vorne (Kinn zur Brust), halte 5 Sekunden.",
        "Wiederhole zur anderen Seite.",
      ],
      tips: [
        "Wichtig: Niemals den Kopf nach hinten strecken – das belastet die Halswirbelsäule.",
        "Häufiger Fehler: Zu starkes Drücken – Nackendehnung sollte sanft sein.",
        "Für mehr Dehnung: Lege die Hand sanft auf den Kopf und lass das Gewicht ziehen.",
        "Variation: Kopf langsam in einen Halbkreis von Schulter zu Schulter durch vorne führen.",
      ],
    },
    c_gehen: {
      steps: [
        "Gehe in ruhigem Tempo, langsamer als dein normales Gehtempo.",
        "Atme tief und gleichmäßig ein und aus.",
        "Lass die Arme locker mitschwingen.",
        "Gehe 2–3 Minuten oder bis dein Puls auf 100 oder darunter gesunken ist.",
        "Kombiniere mit tiefen Atemzügen für maximale Erholung.",
      ],
      tips: [
        "Nutze diese Phase, um das Training mental zu verarbeiten.",
        "Schaue dabei ins Leere oder schließe kurz die Augen (wenn sicher möglich).",
        "Variante: Auf der Stelle treten, wenn kein Platz vorhanden ist.",
        "Tipp: Nutze diese Zeit für kleine Schulter- oder Nackenbewegungen.",
      ],
    },
    c_ruecken: {
      steps: [
        "Stehe aufrecht und strecke beide Arme nach vorne aus.",
        "Runde den Rücken und beuge dich leicht nach vorne.",
        "Lass Kopf und Schultern hängen und dehne die Wirbelsäule.",
        "Halte 20–30 Sekunden.",
        "Alternative: Auf den Rücken legen, Knie zur Brust ziehen.",
      ],
      tips: [
        "Häufiger Fehler: Rücken gerade halten – der Rücken soll bewusst rund gemacht werden.",
        "Diese Dehnung löst die Wirbelsäulenspannung nach dem Fechten effektiv.",
        "Für eine tiefere Dehnung: Im Sitzen mit den Armen vorne abstützen.",
        "Variation: Katze-Kuh-Übung aus dem Yoga für dynamische Rückenlockerung.",
      ],
    },
  },

  en: {
    vor: {
      steps: [
        "Start in the on-guard position: knees bent, weight evenly distributed.",
        "Lift the front foot slightly and step one foot-length forward.",
        "Immediately bring the rear foot forward to maintain the same foot spacing.",
        "Land softly on the ball of the front foot and keep your knees bent.",
        "Keep your upper body upright and shoulders relaxed.",
      ],
      tips: [
        "Common mistake: pulling the rear foot too slowly — both feet should move almost simultaneously.",
        "Don't straighten up — keep your center of gravity low throughout.",
        "Drill: Mark two spots on the floor and practice maintaining a consistent distance.",
        "Progression: Drill slowly first, then at training pace, finally reactively on a signal.",
      ],
    },
    zurueck: {
      steps: [
        "Start in guard position with a low center of gravity.",
        "Lift the rear foot slightly and step one foot-length backward.",
        "Immediately bring the front foot back to maintain the spacing.",
        "Land controlled on the ball of the rear foot.",
        "Keep knees bent and upper body upright.",
      ],
      tips: [
        "Common mistake: pulling the front foot too far back, losing the on-guard stance.",
        "Never look down — always keep your eyes on your opponent.",
        "Drill: Slide your back along a wall to correct any tendency to straighten up.",
        "Combine advance and retreat alternately to train rhythm and reaction.",
      ],
    },
    ausfall: {
      steps: [
        "Start from guard position with the rear leg muscles engaged.",
        "Explosively extend the rear leg, driving the body forward.",
        "Drive the front foot far forward — heel contacts the floor first.",
        "Simultaneously fully extend the weapon arm.",
        "Land with the rear leg straight and the body aligned.",
        "Immediately recover back to the on-guard position.",
      ],
      tips: [
        "Common mistake: extending the weapon arm too late — arm and leg must move together.",
        "The lunge comes from the legs, not the torso — avoid leaning forward.",
        "Drill: Perform slowly and hold the final position for 2 seconds, then check your technique.",
        "Reach test: Measure your lunge distance regularly and try to improve it.",
      ],
    },
    quart: {
      steps: [
        "Start in the on-guard position with your weapon arm relaxed.",
        "Detect the attack on the inside line and respond immediately with a wrist movement.",
        "Rotate the wrist inward (nail faces up-inward) and guide the blade to the left side.",
        "Block the opponent's blade with the middle third of your blade.",
        "Transition immediately to the riposte.",
      ],
      tips: [
        "Common mistake: moving the whole arm — quarte comes from the wrist.",
        "The blade protects the inside line — make sure your body is fully covered.",
        "Drill: Practice the wrist rotation separately, without a blade, until the movement is natural.",
        "Variation: Practice quarte directly against your partner's line of attack — reaction speed counts.",
      ],
    },
    oktav: {
      steps: [
        "Start in guard position and detect the attack on the lower outside line.",
        "Rotate the wrist outward-downward (nail faces down-outward).",
        "Guide the blade to the right side and slightly downward.",
        "Block the blade cleanly with the middle third of your blade.",
        "Follow immediately with the riposte.",
      ],
      tips: [
        "Common mistake: lowering the arm too far — octave protects the lower line, not the legs.",
        "The wrist rotation is key — practice it slowly and deliberately.",
        "Drill: Have a partner attack from the lower outside and parry reactively.",
        "Combination: Octave parry followed by a lunge for a fast counterattack.",
      ],
    },
    quint: {
      steps: [
        "Detect the opponent's head cut and respond with the quinte parry.",
        "Raise the weapon arm and guide the blade horizontally above the head.",
        "The cutting edge faces upward, the blade forms a horizontal protective line.",
        "Keep the shoulder relaxed — the power comes from the forearm.",
        "Immediately transition into the riposte.",
      ],
      tips: [
        "Common mistake: raising the shoulder — this wastes energy and slows down the riposte.",
        "Quinte is the head parry in sabre — practice it with particular care.",
        "Tip: Make sure the blade extends far enough above the head — leave no gaps.",
        "Drill: Combine quinte with an immediate riposte to the attacker's shoulder.",
      ],
    },
    riposte: {
      steps: [
        "Execute a clean parry first.",
        "Immediately after blade contact: extend the weapon arm swiftly.",
        "Aim the tip directly at the target area of your opponent.",
        "Hit before your opponent regains control of their blade.",
        "Return immediately to the on-guard position after the riposte.",
      ],
      tips: [
        "Common mistake: waiting too long after the parry — the riposte must follow immediately.",
        "The riposte can be simple (direct extension) or compound.",
        "Drill: Partner consciously blocks — practice finding the gaps in their guard.",
        "Timing drill: Start slowly and increase reaction speed progressively.",
      ],
    },
    engarde: {
      steps: [
        "Stand sideways, feet shoulder-width apart, at roughly a right angle.",
        "Bend both knees until you reach the optimal guard depth.",
        "Distribute your weight evenly across both feet.",
        "Raise the weapon arm to shoulder height, elbow slightly bent.",
        "Hold the free hand lightly behind your body for balance.",
      ],
      tips: [
        "Common mistake: too little knee bend — this limits mobility and explosiveness.",
        "The en-garde position is your base for all actions — practice it daily.",
        "Tip: Hold the position for 30 seconds and check whether you're tensing up.",
        "Relax your shoulders: consciously let them drop before settling into position.",
      ],
    },
    balestra: {
      steps: [
        "Begin in guard position and prepare for an explosive leg action.",
        "Lift both feet simultaneously and jump forward.",
        "Land with both feet simultaneously in the on-guard position.",
        "Use the landing as a trigger and immediately follow with a lunge.",
        "Recover quickly to the starting position after the lunge.",
      ],
      tips: [
        "Common mistake: jumping too high — the balestra is a flat, fast forward movement.",
        "Timing is everything: the balestra should unsettle your opponent, not tire you out.",
        "Drill: Practice only the jump phase without the lunge until your landing is clean.",
        "Advanced: Combine with a feint before the actual balestra.",
      ],
    },
    w_laufen: {
      steps: [
        "Stand upright, feet hip-width apart.",
        "Begin by alternately lifting your knees to hip height while standing.",
        "Swing your arms in the opposite rhythm: left knee up, right arm forward.",
        "Gradually increase to a comfortable jogging pace.",
        "Breathe evenly in and out — do not hold your breath.",
      ],
      tips: [
        "Common mistake: landing on the heels — this puts unnecessary stress on the joints.",
        "Stay on the balls of your feet for a softer, faster movement.",
        "Use this phase to prepare mentally and physically for training.",
        "Progression: After 30 seconds add short sprints (5 seconds fast, 5 seconds slow).",
      ],
    },
    w_hampelmann: {
      steps: [
        "Start with feet together and arms at your sides.",
        "Jump and spread your legs to shoulder width.",
        "Simultaneously raise both arms sideways above your head.",
        "Jump back to the starting position with feet together.",
        "Repeat in a steady rhythm.",
      ],
      tips: [
        "Common mistake: not synchronizing arms and legs — practice it consciously at slow pace.",
        "Stay on the balls of your feet for a springy, joint-friendly landing.",
        "Progression: Increase pace or add double jumping jacks (2 jumps in position, 1 back).",
        "Goal: 20–30 repetitions without pause for a good warm-up effect.",
      ],
    },
    w_knieheben: {
      steps: [
        "Stand upright with knees slightly bent.",
        "Explosively lift the right knee to hip height or higher.",
        "Set the right foot back down and immediately switch to the left knee.",
        "Swing your arms in the opposite rhythm (left arm forward when right knee is up).",
        "Gradually increase to a running pace.",
      ],
      tips: [
        "Common mistake: only bringing the knee to hip height — try to go higher.",
        "Keep your upper body upright — do not lean forward.",
        "Drill: Start with 10 slow repetitions, then 20 fast.",
        "Coordination variation: Clap your hands on each knee raise.",
      ],
    },
    w_armkreisen: {
      steps: [
        "Stand upright, feet shoulder-width apart, arms extended sideways.",
        "Circle both arms slowly forward (bottom to top, over the head).",
        "Complete 10 circles forward, then without pause 10 backward.",
        "Make sure the motion truly comes from the shoulder joint.",
        "Keep the arms fully extended — don't let them droop.",
      ],
      tips: [
        "Common mistake: bending the elbows — keep the arms fully straight.",
        "Start with small circles and get larger — this protects the shoulder joint.",
        "Variation: One arm forward, one arm backward simultaneously (more coordination).",
        "After circling: briefly shake out the shoulders to release tension.",
      ],
    },
    w_schultern: {
      steps: [
        "Stand upright, arms relaxed at your sides.",
        "Slowly raise both shoulders toward your ears.",
        "Roll them backward and downward in a smooth, round motion.",
        "Complete 10 circles backward, then 10 forward.",
        "Breathe steadily — exhale on the downward phase.",
      ],
      tips: [
        "Common mistake: only moving shoulders up and down — it should be a real circle.",
        "This exercise is especially important after long training sessions with blade work.",
        "Variation: Alternate shoulders (one forward, one backward).",
        "Tip: Combine with lateral neck tilts for deeper mobilization.",
      ],
    },
    w_rumpf: {
      steps: [
        "Stand shoulder-width apart, hands on hips or arms crossed at chest height.",
        "Rotate your upper body slowly to the right as far as possible.",
        "Return to center and rotate to the left.",
        "Keep your hips as still as possible — only the upper body rotates.",
        "Perform 10–15 rotations per side.",
      ],
      tips: [
        "Common mistake: letting the hips rotate — this removes the effect from the spine.",
        "Start slow and get a little faster with each repetition.",
        "Variation: Extend the arms — this increases rotational resistance.",
        "Combination: Trunk rotation with a slight knee bend for more fencing specificity.",
      ],
    },
    w_sprunge: {
      steps: [
        "Start on the balls of your feet, knees slightly bent.",
        "Hop lightly in place without setting the heels down.",
        "Keep the knees slightly bent at each landing.",
        "Let the arms hang loosely at your sides — they help with rhythm.",
        "Gradually increase pace after 15 seconds.",
      ],
      tips: [
        "Common mistake: landing on the heels — this is hard on the joints.",
        "Think of skipping rope — loose, light, rhythmic.",
        "This exercise activates the calf muscles and improves reactivity.",
        "Variation: Lateral hops or alternating (left, right, center) for coordination.",
      ],
    },
    w_hocke: {
      steps: [
        "Stand shoulder-width apart, toes slightly turned out.",
        "Bend your knees and slowly lower your body.",
        "Keep your back straight, heels on the floor, knees over your toes.",
        "Go as deep as possible — ideally until thighs are parallel to the floor.",
        "Hold for 2–3 seconds at the bottom, then slowly rise.",
      ],
      tips: [
        "Common mistake: heels lifting — this indicates insufficient ankle flexibility.",
        "For beginners: hold a wall or place a small plate under the heels.",
        "The deep squat is one of the most important exercises for the on-guard position.",
        "Progression: Hold the lowest position longer (5–10 seconds) for more mobility gain.",
      ],
    },
    c_atmen: {
      steps: [
        "Stand or sit upright, shoulders relaxed.",
        "Inhale deeply through the nose for 4 seconds.",
        "Hold your breath for 2 seconds.",
        "Exhale slowly through the mouth for 6 seconds.",
        "Repeat this cycle 5–8 times.",
      ],
      tips: [
        "This breathing pattern (4-2-6) activates the parasympathetic nervous system — perfect for cool-down.",
        "Place one hand on your belly: it should rise when you inhale (belly breathing).",
        "Common mistake: shallow chest breathing — breathe deep into the belly.",
        "Tip: Close your eyes and visualize the tension releasing with each exhale.",
      ],
    },
    c_schulter: {
      steps: [
        "Stand or sit upright.",
        "Bring the right arm straight across the chest at shoulder height.",
        "Hold it with the left forearm and gently pull it toward the chest.",
        "Hold for 20–30 seconds while breathing evenly.",
        "Switch to the other side.",
      ],
      tips: [
        "Common mistake: raising the shoulder of the extended arm — consciously keep it down.",
        "For a deeper stretch: turn your head slightly away from the stretched side.",
        "This stretch is especially important for fencers who do a lot of blade work.",
        "Variation: Arm angled upward (45°) for a different portion of the deltoid.",
      ],
    },
    c_wade: {
      steps: [
        "Stand in front of a wall or hold a railing.",
        "Step one foot back, heel firmly on the floor.",
        "Lean the body slightly forward until you feel the calf stretch.",
        "Hold for 20–30 seconds and breathe calmly.",
        "Switch sides.",
      ],
      tips: [
        "Common mistake: lifting the heel off the floor — this greatly reduces the stretch.",
        "For a deeper stretch: slightly bend the rear knee (targets the soleus muscle).",
        "The calf muscles are extremely important for fencers — take your time with this stretch.",
        "Variation: Stretch on a step with the heel hanging off the edge.",
      ],
    },
    c_quad: {
      steps: [
        "Stand upright, hold a wall or chair for support.",
        "Bend the right knee and grasp the foot with your right hand.",
        "Gently pull the foot toward the glutes until you feel the stretch in the thigh.",
        "Hold for 20–30 seconds, upper body upright.",
        "Switch to the left leg.",
      ],
      tips: [
        "Common mistake: hyperextending the standing leg — keep it slightly bent.",
        "For more depth: push your hips slightly forward while holding the foot.",
        "This stretch relieves the knee area after intense footwork.",
        "Variation: Perform lying down for a more relaxed position.",
      ],
    },
    c_seite: {
      steps: [
        "Stand upright, feet shoulder-width apart.",
        "Extend the right arm fully above your head.",
        "Slowly lean your upper body to the left.",
        "Let the left hand stabilize the hip.",
        "Hold for 20–30 seconds, then switch sides.",
      ],
      tips: [
        "Common mistake: tilting the upper body forward — keep it in one plane.",
        "Make sure you're bending sideways, not forward or backward.",
        "For a deeper stretch: slightly rotate the extended arm backward.",
        "Variation: Seated on the floor for more stability and depth.",
      ],
    },
    c_nacken: {
      steps: [
        "Sit or stand upright, shoulders relaxed.",
        "Slowly tilt your head to the right shoulder.",
        "Hold for 5 seconds, then return to center.",
        "Tilt forward (chin to chest), hold for 5 seconds.",
        "Repeat to the other side.",
      ],
      tips: [
        "Important: Never tilt the head backward — this strains the cervical spine.",
        "Common mistake: pressing too hard — neck stretching should be gentle.",
        "For more stretch: gently place your hand on your head and let the weight pull.",
        "Variation: Slowly guide the head through a half-circle from shoulder to shoulder via the front.",
      ],
    },
    c_gehen: {
      steps: [
        "Walk at a calm pace, slower than your normal walking speed.",
        "Breathe deeply and evenly in and out.",
        "Let your arms swing loosely.",
        "Walk for 2–3 minutes or until your pulse drops to 100 or below.",
        "Combine with deep breaths for maximum recovery.",
      ],
      tips: [
        "Use this phase to process the training mentally.",
        "Look into the distance or briefly close your eyes (only if safe).",
        "Variation: March in place if space is limited.",
        "Tip: Use this time for small shoulder or neck movements.",
      ],
    },
    c_ruecken: {
      steps: [
        "Stand upright and extend both arms forward.",
        "Round your back and lean slightly forward.",
        "Let your head and shoulders drop and lengthen the spine.",
        "Hold for 20–30 seconds.",
        "Alternative: Lie on your back and pull your knees to your chest.",
      ],
      tips: [
        "Common mistake: keeping the back straight — the back should be deliberately rounded.",
        "This stretch effectively releases spinal tension after fencing.",
        "For a deeper stretch: brace with arms in front while seated.",
        "Variation: Cat-cow yoga exercise for dynamic back loosening.",
      ],
    },
  },

  fr: {
    vor: {
      steps: [
        "Commencez en position de garde: genoux fléchis, poids équilibré.",
        "Levez légèrement le pied avant et avancez-le d'un pas.",
        "Ramenez immédiatement le pied arrière pour maintenir l'écartement.",
        "Posez doucement le pied avant sur la plante et gardez les genoux fléchis.",
        "Gardez le buste droit et les épaules détendues.",
      ],
      tips: [
        "Erreur fréquente: ramener le pied arrière trop lentement — les deux pieds doivent bouger presque simultanément.",
        "Ne vous redressez pas — gardez le centre de gravité bas.",
        "Exercice: marquez deux points au sol et entraînez-vous à maintenir le même écartement.",
        "Progression: entraînez-vous d'abord lentement, puis au rythme de compétition, enfin réactivement sur un signal.",
      ],
    },
    zurueck: {
      steps: [
        "Commencez en garde avec un centre de gravité bas.",
        "Levez légèrement le pied arrière et reculez d'un pas.",
        "Ramenez immédiatement le pied avant pour conserver l'écartement.",
        "Posez le pied arrière de façon contrôlée sur la plante.",
        "Gardez les genoux fléchis et le buste droit.",
      ],
      tips: [
        "Erreur fréquente: ramener le pied avant trop loin et perdre la position de garde.",
        "Ne regardez jamais en bas — gardez toujours les yeux sur l'adversaire.",
        "Exercice: glissez le dos le long d'un mur pour corriger la tendance à se redresser.",
        "Combinez avancer et reculer en alternance pour entraîner le rythme et la réactivité.",
      ],
    },
    ausfall: {
      steps: [
        "Partez de la position de garde avec la musculature arrière engagée.",
        "Tendez explosiveement la jambe arrière pour propulser le corps vers l'avant.",
        "Projetez le pied avant loin vers l'avant, talon en premier.",
        "Tendez simultanément le bras armé complètement.",
        "Posez la jambe arrière tendue, corps aligné.",
        "Rétablissez immédiatement la position de garde.",
      ],
      tips: [
        "Erreur fréquente: tendre le bras armé trop tard — bras et jambe doivent agir ensemble.",
        "La fente vient des jambes, pas du buste — évitez de vous pencher en avant.",
        "Exercice: exécutez lentement et maintenez la position finale 2 secondes pour vérifier la technique.",
        "Test de portée: mesurez régulièrement votre distance de fente et essayez de l'améliorer.",
      ],
    },
    quart: {
      steps: [
        "Commencez en position de garde, bras armé détendu.",
        "Détectez l'attaque sur la ligne intérieure et réagissez immédiatement avec le poignet.",
        "Faites pivoter le poignet vers l'intérieur (ongle vers le haut-intérieur) et guidez la lame vers la gauche.",
        "Bloquez la lame adverse avec le tiers médian de votre lame.",
        "Enchaînez immédiatement avec la riposte.",
      ],
      tips: [
        "Erreur fréquente: bouger tout le bras — la quarte vient du poignet.",
        "La lame protège la ligne intérieure — assurez-vous que votre corps est entièrement couvert.",
        "Exercice: entraînez la rotation du poignet séparément, sans lame, jusqu'à ce que le mouvement soit naturel.",
        "Variante: entraînez la quarte directement sur la ligne d'attaque du partenaire — la vitesse de réaction compte.",
      ],
    },
    oktav: {
      steps: [
        "Partez de la garde et détectez l'attaque sur la ligne extérieure basse.",
        "Faites pivoter le poignet vers l'extérieur-bas (ongle vers le bas-extérieur).",
        "Guidez la lame vers la droite et légèrement vers le bas.",
        "Bloquez la lame proprement avec le tiers médian de votre lame.",
        "Enchaînez immédiatement avec la riposte.",
      ],
      tips: [
        "Erreur fréquente: baisser trop le bras — l'octave protège la ligne basse, pas les jambes.",
        "La rotation du poignet est essentielle — entraînez-la lentement et consciemment.",
        "Exercice: demandez à un partenaire d'attaquer de l'extérieur-bas et parez de façon réactive.",
        "Combinaison: parade d'octave suivie d'une fente pour une contre-attaque rapide.",
      ],
    },
    quint: {
      steps: [
        "Détectez la taille à la tête de l'adversaire et répondez par la parade de quinte.",
        "Levez le bras armé et guidez la lame horizontalement au-dessus de la tête.",
        "Le tranchant est orienté vers le haut, la lame forme une ligne de protection horizontale.",
        "Gardez l'épaule détendue — la force vient de l'avant-bras.",
        "Enchaînez immédiatement avec la riposte.",
      ],
      tips: [
        "Erreur fréquente: lever l'épaule — cela gaspille de l'énergie et ralentit la riposte.",
        "La quinte est la parade de tête au sabre — entraînez-la avec un soin particulier.",
        "Conseil: assurez-vous que la lame dépasse suffisamment au-dessus de la tête — ne laissez aucune ouverture.",
        "Exercice: combinez la quinte avec une riposte immédiate sur l'épaule de l'attaquant.",
      ],
    },
    riposte: {
      steps: [
        "Exécutez d'abord une parade nette.",
        "Immédiatement après le contact de lame: tendez vivement le bras armé.",
        "Dirigez la pointe directement sur la surface valable adverse.",
        "Touchez avant que l'adversaire ne reprenne le contrôle de sa lame.",
        "Revenez immédiatement en garde après la riposte.",
      ],
      tips: [
        "Erreur fréquente: attendre trop longtemps après la parade — la riposte doit suivre immédiatement.",
        "La riposte peut être simple (extension directe) ou composée.",
        "Exercice: le partenaire bloque volontairement — entraînez-vous à trouver les ouvertures.",
        "Entraînement du timing: commencez lentement et augmentez progressivement la vitesse de réaction.",
      ],
    },
    engarde: {
      steps: [
        "Placez-vous de côté, pieds à largeur d'épaules, à angle droit l'un par rapport à l'autre.",
        "Fléchissez les deux genoux jusqu'à atteindre la profondeur optimale de garde.",
        "Répartissez le poids également sur les deux pieds.",
        "Levez le bras armé à hauteur d'épaule, coude légèrement fléchi.",
        "Maintenez la main libre légèrement derrière le corps pour l'équilibre.",
      ],
      tips: [
        "Erreur fréquente: trop peu de flexion des genoux — cela limite la mobilité et l'explosivité.",
        "La position en garde est votre base pour toutes les actions — entraînez-la quotidiennement.",
        "Conseil: maintenez la position 30 secondes et vérifiez si vous vous crispez.",
        "Détendez les épaules: laissez-les consciemment retomber avant d'adopter la position.",
      ],
    },
    balestra: {
      steps: [
        "Commencez en garde et préparez une action explosive des jambes.",
        "Levez les deux pieds simultanément et sautez vers l'avant.",
        "Posez les deux pieds simultanément en position de garde.",
        "Utilisez la réception comme signal de départ et enchaînez immédiatement avec une fente.",
        "Rétablissez rapidement la position initiale après la fente.",
      ],
      tips: [
        "Erreur fréquente: sauter trop haut — la balestra est un mouvement en avant rapide et rasant.",
        "Le timing est tout: la balestra doit déstabiliser l'adversaire, pas vous fatiguer.",
        "Exercice: entraînez uniquement la phase de saut sans fente jusqu'à ce que la réception soit propre.",
        "Avancé: combinez avec une feinte avant la balestra proprement dite.",
      ],
    },
    w_laufen: {
      steps: [
        "Tenez-vous droit, pieds à largeur de hanches.",
        "Commencez debout en levant alternativement les genoux à hauteur de hanche.",
        "Balancez les bras en rythme opposé: genou gauche haut, bras droit en avant.",
        "Augmentez progressivement jusqu'à un trot confortable.",
        "Respirez régulièrement — ne retenez pas votre souffle.",
      ],
      tips: [
        "Erreur fréquente: atterrir sur les talons — cela sollicite inutilement les articulations.",
        "Restez sur la plante des pieds pour un mouvement plus doux et plus rapide.",
        "Utilisez cette phase pour préparer mentalement et physiquement à l'entraînement.",
        "Progression: après 30 secondes, ajoutez de courtes accélérations (5 secondes rapide, 5 lent).",
      ],
    },
    w_hampelmann: {
      steps: [
        "Démarrez pieds joints, bras le long du corps.",
        "Sautez en écartant les jambes à largeur d'épaules.",
        "Levez simultanément les deux bras sur les côtés au-dessus de la tête.",
        "Revenez en position initiale pieds joints.",
        "Répétez à un rythme régulier.",
      ],
      tips: [
        "Erreur fréquente: ne pas synchroniser bras et jambes — entraînez-le consciemment à rythme lent.",
        "Restez sur la plante des pieds pour une réception souple et ménageant les articulations.",
        "Progression: augmentez le rythme ou ajoutez des sauts doubles (2 sauts en position, 1 retour).",
        "Objectif: 20 à 30 répétitions sans pause pour un bon effet d'échauffement.",
      ],
    },
    w_knieheben: {
      steps: [
        "Tenez-vous droit, genoux légèrement fléchis.",
        "Levez explosiveement le genou droit à hauteur de hanche ou plus haut.",
        "Posez le pied droit et passez immédiatement au genou gauche.",
        "Balancez les bras en rythme opposé (bras gauche en avant quand genou droit est haut).",
        "Augmentez progressivement jusqu'à la vitesse de course.",
      ],
      tips: [
        "Erreur fréquente: ne monter le genou qu'à hauteur de hanche — essayez d'aller plus haut.",
        "Gardez le buste droit — ne vous penchez pas en avant.",
        "Exercice: commencez par 10 répétitions lentes, puis 20 rapides.",
        "Variation de coordination: frappez dans les mains à chaque montée de genou.",
      ],
    },
    w_armkreisen: {
      steps: [
        "Tenez-vous droit, pieds à largeur d'épaules, bras écartés.",
        "Faites tourner les deux bras lentement vers l'avant (du bas vers le haut, par-dessus la tête).",
        "Effectuez 10 cercles vers l'avant, puis 10 vers l'arrière sans pause.",
        "Assurez-vous que le mouvement vient vraiment de l'épaule.",
        "Gardez les bras tendus — ne les laissez pas retomber.",
      ],
      tips: [
        "Erreur fréquente: fléchir les coudes — gardez les bras complètement tendus.",
        "Commencez par de petits cercles et agrandissez-les progressivement — cela ménage l'articulation de l'épaule.",
        "Variation: un bras en avant, l'autre en arrière simultanément (plus de coordination).",
        "Après les rotations: secouez brièvement les épaules pour libérer la tension.",
      ],
    },
    w_schultern: {
      steps: [
        "Tenez-vous droit, bras détendus le long du corps.",
        "Levez lentement les deux épaules vers les oreilles.",
        "Faites-les rouler vers l'arrière puis vers le bas en un mouvement arrondi.",
        "Effectuez 10 cercles vers l'arrière, puis 10 vers l'avant.",
        "Respirez régulièrement — expirez lors de la phase descendante.",
      ],
      tips: [
        "Erreur fréquente: ne faire que monter et descendre les épaules — il doit s'agir d'un vrai cercle.",
        "Cet exercice est particulièrement important après de longues séances de travail à la lame.",
        "Variation: alterner les épaules (une en avant, une en arrière).",
        "Conseil: combinez avec une inclinaison latérale du cou pour une mobilisation plus profonde.",
      ],
    },
    w_rumpf: {
      steps: [
        "Tenez-vous debout, pieds à largeur d'épaules, mains sur les hanches ou bras croisés à hauteur de poitrine.",
        "Tournez lentement le buste vers la droite, aussi loin que possible.",
        "Revenez au centre et tournez vers la gauche.",
        "Gardez les hanches aussi immobiles que possible — seul le buste tourne.",
        "Effectuez 10 à 15 rotations de chaque côté.",
      ],
      tips: [
        "Erreur fréquente: laisser les hanches tourner — cela enlève l'effet sur la colonne vertébrale.",
        "Commencez lentement et accélérez légèrement à chaque répétition.",
        "Variation: étendez les bras — cela augmente la résistance à la rotation.",
        "Combinaison: rotation du tronc avec légère flexion des genoux pour plus de spécificité escrime.",
      ],
    },
    w_sprunge: {
      steps: [
        "Démarrez sur la plante des pieds, genoux légèrement fléchis.",
        "Sautillez légèrement sur place sans poser les talons.",
        "Gardez les genoux légèrement fléchis à chaque réception.",
        "Laissez les bras pendre librement — ils aident le rythme.",
        "Augmentez progressivement le rythme après 15 secondes.",
      ],
      tips: [
        "Erreur fréquente: atterrir sur les talons — c'est dur pour les articulations.",
        "Imaginez sauter à la corde — léger, souple, rythmique.",
        "Cet exercice active les mollets et améliore la réactivité.",
        "Variation: sauts latéraux ou alternés (gauche, droite, centre) pour la coordination.",
      ],
    },
    w_hocke: {
      steps: [
        "Tenez-vous à largeur d'épaules, orteils légèrement tournés vers l'extérieur.",
        "Fléchissez les genoux et descendez lentement le corps.",
        "Gardez le dos droit, talons au sol, genoux dans l'axe des orteils.",
        "Descendez aussi bas que possible — idéalement cuisses parallèles au sol.",
        "Maintenez 2 à 3 secondes en bas, puis remontez lentement.",
      ],
      tips: [
        "Erreur fréquente: soulever les talons — cela indique un manque de souplesse à la cheville.",
        "Pour les débutants: tenez un mur ou placez une plaque sous les talons.",
        "Le squat profond est l'un des exercices les plus importants pour la position de garde.",
        "Progression: maintenez la position la plus basse plus longtemps (5 à 10 secondes) pour plus de gain en mobilité.",
      ],
    },
    c_atmen: {
      steps: [
        "Tenez-vous debout ou assis droit, épaules détendues.",
        "Inspirez profondément par le nez pendant 4 secondes.",
        "Retenez votre souffle pendant 2 secondes.",
        "Expirez lentement par la bouche pendant 6 secondes.",
        "Répétez ce cycle 5 à 8 fois.",
      ],
      tips: [
        "Ce schéma respiratoire (4-2-6) active le système nerveux parasympathique — idéal pour la récupération.",
        "Posez une main sur le ventre: il doit se soulever à l'inspiration (respiration abdominale).",
        "Erreur fréquente: respiration trop superficielle dans la poitrine — respirez profondément dans le ventre.",
        "Conseil: fermez les yeux et visualisez la tension qui se dissipe à chaque expiration.",
      ],
    },
    c_schulter: {
      steps: [
        "Tenez-vous debout ou assis droit.",
        "Amenez le bras droit tendu devant la poitrine à hauteur d'épaule.",
        "Maintenez-le avec l'avant-bras gauche et tirez-le doucement vers la poitrine.",
        "Maintenez 20 à 30 secondes en respirant régulièrement.",
        "Changez de côté.",
      ],
      tips: [
        "Erreur fréquente: soulever l'épaule du bras tendu — gardez-la consciemment abaissée.",
        "Pour un étirement plus profond: tournez légèrement la tête du côté opposé à l'étirement.",
        "Cet étirement est particulièrement important pour les escrimeurs qui font beaucoup de travail à la lame.",
        "Variation: bras incliné vers le haut (45°) pour une autre partie du deltoïde.",
      ],
    },
    c_wade: {
      steps: [
        "Tenez-vous face à un mur ou accrochez-vous à une rampe.",
        "Placez un pied en arrière, talon fermement au sol.",
        "Penchez légèrement le corps vers l'avant jusqu'à sentir l'étirement du mollet.",
        "Maintenez 20 à 30 secondes en respirant calmement.",
        "Changez de côté.",
      ],
      tips: [
        "Erreur fréquente: soulever le talon — cela réduit considérablement l'étirement.",
        "Pour un étirement plus profond: fléchissez légèrement le genou arrière (étire le soléaire).",
        "Les muscles des mollets sont extrêmement importants pour les escrimeurs — prenez le temps de cet étirement.",
        "Variation: étirement sur une marche avec le talon suspendu dans le vide.",
      ],
    },
    c_quad: {
      steps: [
        "Tenez-vous droit, appuyez-vous sur un mur ou une chaise.",
        "Fléchissez le genou droit et saisissez le pied avec la main droite.",
        "Tirez doucement le pied vers les fessiers jusqu'à sentir l'étirement dans la cuisse.",
        "Maintenez 20 à 30 secondes, buste droit.",
        "Passez à la jambe gauche.",
      ],
      tips: [
        "Erreur fréquente: hyperétendre la jambe d'appui — gardez-la légèrement fléchie.",
        "Pour plus de profondeur: poussez légèrement les hanches vers l'avant en tenant le pied.",
        "Cet étirement soulage la zone du genou après un travail de pieds intense.",
        "Variation: effectuez allongé pour une position plus détendue.",
      ],
    },
    c_seite: {
      steps: [
        "Tenez-vous droit, pieds à largeur d'épaules.",
        "Étendez le bras droit complètement au-dessus de la tête.",
        "Inclinez lentement le buste vers la gauche.",
        "Laissez la main gauche stabiliser la hanche.",
        "Maintenez 20 à 30 secondes, puis changez de côté.",
      ],
      tips: [
        "Erreur fréquente: incliner le buste vers l'avant — gardez-le dans un plan.",
        "Assurez-vous de vous pencher latéralement, pas vers l'avant ni vers l'arrière.",
        "Pour un étirement plus profond: faites pivoter légèrement le bras tendu vers l'arrière.",
        "Variation: en position assise au sol pour plus de stabilité et de profondeur.",
      ],
    },
    c_nacken: {
      steps: [
        "Asseyez-vous ou tenez-vous droit, épaules détendues.",
        "Inclinez lentement la tête vers l'épaule droite.",
        "Maintenez 5 secondes, puis revenez au centre.",
        "Inclinez vers l'avant (menton vers la poitrine), maintenez 5 secondes.",
        "Répétez de l'autre côté.",
      ],
      tips: [
        "Important: ne jamais incliner la tête vers l'arrière — cela sollicite la colonne cervicale.",
        "Erreur fréquente: appuyer trop fort — l'étirement du cou doit être doux.",
        "Pour plus d'étirement: posez doucement la main sur la tête et laissez le poids tirer.",
        "Variation: guidez lentement la tête en demi-cercle d'épaule en épaule par l'avant.",
      ],
    },
    c_gehen: {
      steps: [
        "Marchez à un rythme calme, plus lent que votre allure normale.",
        "Respirez profondément et régulièrement.",
        "Laissez les bras se balancer librement.",
        "Marchez 2 à 3 minutes ou jusqu'à ce que votre pouls descende à 100 ou en dessous.",
        "Combinez avec des respirations profondes pour une récupération maximale.",
      ],
      tips: [
        "Utilisez cette phase pour traiter mentalement l'entraînement.",
        "Regardez au loin ou fermez brièvement les yeux (seulement si c'est sécurisé).",
        "Variante: marchez sur place si l'espace est limité.",
        "Conseil: profitez de ce temps pour de petits mouvements d'épaules ou de cou.",
      ],
    },
    c_ruecken: {
      steps: [
        "Tenez-vous droit et étendez les deux bras vers l'avant.",
        "Arrondissez le dos et penchez-vous légèrement vers l'avant.",
        "Laissez la tête et les épaules tomber et allongez la colonne vertébrale.",
        "Maintenez 20 à 30 secondes.",
        "Alternative: allongez-vous sur le dos et ramenez les genoux vers la poitrine.",
      ],
      tips: [
        "Erreur fréquente: garder le dos droit — le dos doit être délibérément arrondi.",
        "Cet étirement libère efficacement la tension vertébrale après l'escrime.",
        "Pour un étirement plus profond: prenez appui sur les bras en position assise.",
        "Variation: exercice chat-vache du yoga pour un assouplissement dynamique du dos.",
      ],
    },
  },
};

export function tSteps(moveId: string, lang: Language): string[] {
  return EXERCISE_DETAILS[lang][moveId]?.steps ?? EXERCISE_DETAILS.en[moveId]?.steps ?? [];
}

export function tTips(moveId: string, lang: Language): string[] {
  return EXERCISE_DETAILS[lang][moveId]?.tips ?? EXERCISE_DETAILS.en[moveId]?.tips ?? [];
}

export const ALL_MOVES = [
  'vor', 'zurueck', 'ausfall', 'quart', 'oktav', 'quint', 'riposte', 'engarde', 'balestra'
] as const;
export type MoveType = typeof ALL_MOVES[number];

export const WARMUP_MOVES = [
  'w_laufen', 'w_hampelmann', 'w_knieheben', 'w_armkreisen',
  'w_schultern', 'w_rumpf', 'w_sprunge', 'w_hocke',
] as const;
export type WarmupMove = typeof WARMUP_MOVES[number];

export const COOLDOWN_MOVES = [
  'c_atmen', 'c_schulter', 'c_wade', 'c_quad',
  'c_seite', 'c_nacken', 'c_gehen', 'c_ruecken',
] as const;
export type CooldownMove = typeof COOLDOWN_MOVES[number];

export type AnyMove = MoveType | WarmupMove | CooldownMove | string;

export function t(key: keyof typeof translations.en, lang: Language): string {
  return (translations[lang] as any)[key] ?? (translations.en as any)[key] ?? key;
}

export function tMove(moveId: AnyMove, lang: Language): string {
  return t(`move_${moveId}` as any, lang);
}

export function tDesc(moveId: AnyMove, lang: Language): string {
  return t(`desc_${moveId}` as any, lang);
}
