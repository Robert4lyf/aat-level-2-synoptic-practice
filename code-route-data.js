// Code de la route — study data
// Sets three globals: window.CR_TOPICS, window.CR_QUESTIONS, window.CR_LEARN_PATH

window.CR_TOPICS = [
  { id: 'cr-panneaux',  name: 'Panneaux de signalisation', short: 'Panneaux',      icon: '🚦', desc: 'Road signs: shapes, colours and meanings' },
  { id: 'cr-priorite',  name: 'Règles de priorité',        short: 'Priorité',      icon: '🛑', desc: 'Right of way and priority rules in France' },
  { id: 'cr-vitesse',   name: 'Limitations de vitesse',    short: 'Vitesse',       icon: '💨', desc: 'Speed limits and safe following distances' },
  { id: 'cr-alcool',    name: 'Alcool & drogues',          short: 'Alcool',        icon: '🍺', desc: 'BAC limits, drug rules and medication warnings' },
  { id: 'cr-stat',      name: 'Stationnement & arrêt',     short: 'Stationnement', icon: '🅿️', desc: 'Parking and stopping rules in France' },
];

window.CR_QUESTIONS = [
  // ── cr-panneaux (cr-001 to cr-017) ─────────────────────────────────────────
  {
    id: 'cr-001', topic: 'cr-panneaux', type: 'mcq',
    q: 'A triangular sign with a red border in France indicates?',
    opts: ['Prohibition', 'Obligation', 'Danger/Warning', 'Information'],
    ans: 2,
    exp: 'Triangular signs with a red border are danger/warning signs alerting drivers to a hazard ahead.',
  },
  {
    id: 'cr-002', topic: 'cr-panneaux', type: 'mcq',
    q: 'A round sign with a red border and cross-bar indicates?',
    opts: ['Warning', 'Obligation', 'Prohibition', 'End of restriction'],
    ans: 2,
    exp: 'Round signs with a red border and diagonal bar indicate a prohibition (you must not do something).',
  },
  {
    id: 'cr-003', topic: 'cr-panneaux', type: 'mcq',
    q: 'A round sign with a blue background indicates?',
    opts: ['Warning', 'Prohibition', 'Obligation', 'Information'],
    ans: 2,
    exp: 'Blue round signs are obligation signs — they indicate something you must do.',
  },
  {
    id: 'cr-004', topic: 'cr-panneaux', type: 'mcq',
    q: 'A blue rectangular/square sign provides?',
    opts: ['Warnings', 'Prohibitions', 'Mandatory direction', 'Information and services'],
    ans: 3,
    exp: 'Blue rectangular signs provide information such as directions, services, and distance indicators.',
  },
  {
    id: 'cr-005', topic: 'cr-panneaux', type: 'mcq',
    q: 'The "STOP" sign in France means?',
    opts: ['Slow down if traffic is present', 'Yield to traffic then continue', 'Come to a complete stop even if the road appears clear', 'Stop only if you see another car'],
    ans: 2,
    exp: 'The STOP sign requires a complete stop regardless of whether the road appears clear — this is mandatory under French law.',
  },
  {
    id: 'cr-006', topic: 'cr-panneaux', type: 'mcq',
    q: '"Cédez le passage" (yield/give way) sign is which shape?',
    opts: ['Round with red border', 'Triangular pointing downward (inverted triangle), red border', 'Square blue', 'Octagonal red'],
    ans: 1,
    exp: '"Cédez le passage" is an inverted triangle (pointing down) with a red border — it means yield to traffic on the main road.',
  },
  {
    id: 'cr-007', topic: 'cr-panneaux', type: 'mcq',
    q: '"Sens interdit" (no entry) sign is?',
    opts: ['Triangle with red border', 'Red round sign with white horizontal bar', 'Blue round sign', 'Red octagon'],
    ans: 1,
    exp: '"Sens interdit" is a round red sign with a white horizontal bar — no entry in this direction.',
  },
  {
    id: 'cr-008', topic: 'cr-panneaux', type: 'mcq',
    q: 'The end of a speed restriction is typically shown by?',
    opts: ['A new speed sign in blue', 'A round sign with the number crossed out by a diagonal grey/black line', 'A triangular sign with the number', 'A sign reading "fin de limitation"'],
    ans: 1,
    exp: 'The end of a speed restriction is shown by a round sign with the same number but with diagonal lines crossing through it.',
  },
  {
    id: 'cr-009', topic: 'cr-panneaux', type: 'mcq',
    q: '"Voie sans issue" means?',
    opts: ['Priority road', 'No entry', 'Dead end (no through road)', 'Motorway entrance'],
    ans: 2,
    exp: '"Voie sans issue" means dead end — there is no exit at the other end of the road.',
  },
  {
    id: 'cr-010', topic: 'cr-panneaux', type: 'mcq',
    q: 'A blue round sign with a white arrow pointing straight ahead means?',
    opts: ['No overtaking', 'Straight on is the only permitted direction', 'Speed limit ahead', 'Motorway'],
    ans: 1,
    exp: 'A blue round sign with a white arrow is a mandatory direction — you MUST go in the direction shown.',
  },
  {
    id: 'cr-011', topic: 'cr-panneaux', type: 'mcq',
    q: 'A yellow diamond sign means?',
    opts: ['School zone', 'Priority road (you have right of way)', 'No parking', 'Toll road'],
    ans: 1,
    exp: 'The yellow diamond (losange jaune) indicates that you are on a priority road — you have priority over vehicles on side roads.',
  },
  {
    id: 'cr-012', topic: 'cr-panneaux', type: 'mcq',
    q: 'A round red sign with "50" inside means?',
    opts: ['Minimum speed 50 km/h', 'Maximum speed limit 50 km/h', 'Recommended speed', 'End of 50 km/h zone'],
    ans: 1,
    exp: 'A round sign with a red border and a number indicates a maximum speed limit — in this case, 50 km/h.',
  },
  {
    id: 'cr-013', topic: 'cr-panneaux', type: 'mcq',
    q: 'A pedestrian crossing sign is which shape?',
    opts: ['Round blue', 'Triangular with red border', 'Square blue', 'Rectangle green'],
    ans: 1,
    exp: 'A pedestrian crossing warning sign is triangular with a red border, depicting a pedestrian, indicating a crossing ahead.',
  },
  {
    id: 'cr-014', topic: 'cr-panneaux', type: 'mcq',
    q: 'The "priority over oncoming traffic" sign shows?',
    opts: ['Arrow going down, crossed by an arrow going up', 'Arrow going up and smaller arrow going down', 'Two arrows side by side', 'Red dot'],
    ans: 0,
    exp: 'Priority over oncoming vehicles is shown by a white arrow going ahead crossed by a smaller red/black arrow coming the other way — indicating you must yield to oncoming traffic (or you have priority, depending on sign direction).',
  },
  {
    id: 'cr-015', topic: 'cr-panneaux', type: 'mcq',
    q: 'The sign for "children/school zone" is?',
    opts: ['Blue rectangle', 'Red circle', 'Triangle with two children walking', 'Yellow diamond'],
    ans: 2,
    exp: 'A school/children warning sign is a red-bordered triangle depicting children, warning of a school crossing or playground area.',
  },
  {
    id: 'cr-016', topic: 'cr-panneaux', type: 'mcq',
    q: 'A round sign with "30" in red border inside a town means?',
    opts: ['End of 30 zone', 'Speed limit of 30 km/h', 'Minimum 30 km/h', 'No vehicles over 30 km/h'],
    ans: 1,
    exp: 'This is a 30 km/h speed limit sign — a restriction frequently seen in residential zones.',
  },
  {
    id: 'cr-017', topic: 'cr-panneaux', type: 'mcq',
    q: 'Blue direction signs on motorways are what colour text?',
    opts: ['Black on blue', 'White on blue', 'Yellow on green', 'White on green'],
    ans: 1,
    exp: 'French motorway direction signs are blue with white text. National roads typically use green with white text (or white with green).',
  },

  // ── cr-priorite (cr-018 to cr-034) ─────────────────────────────────────────
  {
    id: 'cr-018', topic: 'cr-priorite', type: 'mcq',
    q: 'In France, at an unmarked junction, priority goes to?',
    opts: ['The faster vehicle', 'The vehicle on the left', 'The vehicle on the right', 'The larger vehicle'],
    ans: 2,
    exp: '"Priorité à droite" — at unmarked junctions, you must give way to vehicles arriving from your right.',
  },
  {
    id: 'cr-019', topic: 'cr-priorite', type: 'mcq',
    q: 'On a modern French roundabout, who has priority?',
    opts: ['Vehicles entering the roundabout', 'Vehicles already inside the roundabout', 'The largest vehicle', 'Vehicles from the right inside'],
    ans: 1,
    exp: 'On French roundabouts, vehicles already inside the roundabout have priority over those entering. Entering drivers must yield (cédez le passage).',
  },
  {
    id: 'cr-020', topic: 'cr-priorite', type: 'mcq',
    q: 'A "Route prioritaire" (priority road) sign means?',
    opts: ['Give way to all vehicles', 'You have priority over vehicles joining from side roads', 'Speed limit applies', 'No overtaking'],
    ans: 1,
    exp: 'The route prioritaire (yellow diamond sign) indicates you are on a priority road and have right of way over vehicles entering from minor roads.',
  },
  {
    id: 'cr-021', topic: 'cr-priorite', type: 'mcq',
    q: 'When does "priorité à droite" NOT apply?',
    opts: ['In all built-up areas', 'When you are on a priority road or main road', 'In rural areas', 'On motorways and dual carriageways'],
    ans: 1,
    exp: '"Priorité à droite" is suspended when you are on a marked priority road or when signs indicate you have priority.',
  },
  {
    id: 'cr-022', topic: 'cr-priorite', type: 'mcq',
    q: 'At a STOP sign, what must you do even if the road is clear?',
    opts: ['Slow to under 20 km/h', 'Come to a complete stop before the line', 'Flash your lights', 'Sound the horn'],
    ans: 1,
    exp: 'At a STOP sign in France, a complete stop is legally required — you cannot simply slow down. You must stop before the white line.',
  },
  {
    id: 'cr-023', topic: 'cr-priorite', type: 'mcq',
    q: 'Emergency vehicles (police, ambulance, fire) with flashing lights and sirens have?',
    opts: ['No special rights on French roads', 'Priority — other road users must yield and pull over if needed', 'Priority only on motorways', 'The same priority as a bus'],
    ans: 1,
    exp: 'Emergency vehicles with lights and sirens have absolute priority in France — all road users must facilitate their passage.',
  },
  {
    id: 'cr-024', topic: 'cr-priorite', type: 'mcq',
    q: 'Trams in France have priority?',
    opts: ['Never — they are slower', 'On their own tracks; road users must not obstruct trams', 'Only in pedestrian zones', 'Only when carrying passengers'],
    ans: 1,
    exp: 'Trams have priority on their tracks. Road vehicles must not block tram lines, and at tram crossings the tram has priority.',
  },
  {
    id: 'cr-025', topic: 'cr-priorite', type: 'mcq',
    q: 'When a road narrows and there is a priority sign showing an arrow up (wide) and a small arrow coming the other way, the upward direction?',
    opts: ['Must yield', 'Has priority', 'Must use full road', 'Must stop'],
    ans: 1,
    exp: 'The wider arrow in the narrowing road sign indicates the direction that has priority. The other direction must wait.',
  },
  {
    id: 'cr-026', topic: 'cr-priorite', type: 'mcq',
    q: 'Voie de bus (bus lanes) — can private vehicles use them?',
    opts: ['Yes, always', 'No, they are reserved for buses only (and sometimes taxis/cyclists as signed)', 'Yes, outside peak hours', 'Yes, if the bus lane is empty'],
    ans: 1,
    exp: 'Bus lanes are reserved for buses and vehicles indicated by signs. Private cars may not use them unless specifically permitted.',
  },
  {
    id: 'cr-027', topic: 'cr-priorite', type: 'mcq',
    q: 'At an uncontrolled crossroads between a main road and a smaller road, which rule applies?',
    opts: ['Largest vehicle has priority', 'Faster vehicle has priority', 'Priority to the right (priorité à droite) unless signs indicate otherwise', 'The person who arrives first'],
    ans: 2,
    exp: '"Priorité à droite" applies at uncontrolled crossroads — you must give way to any vehicle approaching from your right.',
  },
  {
    id: 'cr-028', topic: 'cr-priorite', type: 'mcq',
    q: 'A pedestrian already on a pedestrian crossing has?',
    opts: ['No special priority', 'Absolute priority — you must let them cross', 'Priority only at night', 'Priority only during school hours'],
    ans: 1,
    exp: 'A pedestrian who has started to cross a marked pedestrian crossing has absolute priority — drivers must stop and let them pass.',
  },
  {
    id: 'cr-029', topic: 'cr-priorite', type: 'mcq',
    q: 'Who has priority on a lane merging from the right on a motorway?',
    opts: ['The vehicle on the motorway (priority lane)', 'The vehicle entering from the ramp', 'Whoever is faster', 'Whoever is bigger'],
    ans: 0,
    exp: 'On a motorway, the vehicle already on the carriageway has priority. Entering vehicles must adapt their speed and merge safely.',
  },
  {
    id: 'cr-030', topic: 'cr-priorite', type: 'mcq',
    q: 'Two vehicles approaching each other on a narrow single-lane bridge — who has priority?',
    opts: ['The heavier vehicle', 'The vehicle closer to the bridge', 'The vehicle with priority sign (if posted), otherwise "priorité à droite"', 'Always the vehicle going uphill'],
    ans: 2,
    exp: 'If a sign indicates priority, follow it. Otherwise, "priorité à droite" applies, or common sense should prevail — the vehicle needing to reverse least.',
  },
  {
    id: 'cr-031', topic: 'cr-priorite', type: 'mcq',
    q: 'Cyclists on a cycle lane — do cars have to give way to them when turning?',
    opts: ['No, cyclists must yield', 'Yes, when turning across a cycle lane, you must give way to cyclists', 'Only at night', 'Only if the cyclist is going fast'],
    ans: 1,
    exp: 'When a vehicle turns across a cycle lane, cyclists in that lane have priority — drivers must check and give way.',
  },
  {
    id: 'cr-032', topic: 'cr-priorite', type: 'mcq',
    q: 'A flashing yellow light at a junction means?',
    opts: ['Stop completely', 'Traffic light out of order — give way, proceed with caution', 'Green light — go', 'Red light — stop'],
    ans: 1,
    exp: 'A flashing yellow light indicates a priority junction is temporarily uncontrolled. Drivers must proceed with caution and apply priorité à droite or give way.',
  },
  {
    id: 'cr-033', topic: 'cr-priorite', type: 'mcq',
    q: 'When turning right at a red light (where permitted by a flashing yellow arrow)?',
    opts: ['You have absolute priority', 'You must still yield to pedestrians and other traffic', 'You can proceed at full speed', 'This is not permitted in France'],
    ans: 1,
    exp: 'Where a flashing yellow arrow permits a right turn on red, you must still give way to pedestrians crossing and to vehicles with priority.',
  },
  {
    id: 'cr-034', topic: 'cr-priorite', type: 'mcq',
    q: 'A school bus stopped with flashing signals — following vehicles must?',
    opts: ['Overtake quickly', 'Stop and wait until children have boarded or alighted safely', 'Honk to warn children', 'Continue at 30 km/h'],
    ans: 1,
    exp: 'When a school bus stops with warning signals, following vehicles must stop and not pass until the children have safely boarded or alighted.',
  },

  // ── cr-vitesse (cr-035 to cr-051) ──────────────────────────────────────────
  {
    id: 'cr-035', topic: 'cr-vitesse', type: 'mcq',
    q: 'What is the speed limit inside a built-up area (agglomération) in France?',
    opts: ['30 km/h', '50 km/h', '70 km/h', '90 km/h'],
    ans: 1,
    exp: 'The default speed limit inside a built-up area in France is 50 km/h unless otherwise signed.',
  },
  {
    id: 'cr-036', topic: 'cr-vitesse', type: 'mcq',
    q: 'What is the speed limit on a single-carriageway road outside a built-up area in dry conditions?',
    opts: ['70 km/h', '80 km/h', '90 km/h', '100 km/h'],
    ans: 1,
    exp: 'Since 2018, the speed limit on single-carriageway roads outside built-up areas is 80 km/h (reduced from 90 km/h).',
  },
  {
    id: 'cr-037', topic: 'cr-vitesse', type: 'mcq',
    q: 'What is the speed limit on a dual carriageway (chaussées séparées) without a central reservation?',
    opts: ['90 km/h', '100 km/h', '110 km/h', '130 km/h'],
    ans: 2,
    exp: 'Dual carriageway roads without a central reservation have a 110 km/h limit in dry conditions.',
  },
  {
    id: 'cr-038', topic: 'cr-vitesse', type: 'mcq',
    q: 'What is the speed limit on a French motorway (autoroute) in dry conditions?',
    opts: ['110 km/h', '120 km/h', '130 km/h', '150 km/h'],
    ans: 2,
    exp: 'The motorway speed limit in France is 130 km/h in dry conditions.',
  },
  {
    id: 'cr-039', topic: 'cr-vitesse', type: 'mcq',
    q: 'What is the motorway speed limit in wet conditions (rain)?',
    opts: ['110 km/h', '120 km/h', '130 km/h', '100 km/h'],
    ans: 0,
    exp: 'In wet/rainy conditions, the motorway speed limit is reduced to 110 km/h.',
  },
  {
    id: 'cr-040', topic: 'cr-vitesse', type: 'mcq',
    q: 'A new driver (permis probatoire, first 3 years) has what motorway speed limit?',
    opts: ['100 km/h', '110 km/h', '120 km/h', '130 km/h'],
    ans: 1,
    exp: 'New drivers (permis probatoire) are limited to 110 km/h on motorways, 100 km/h on dual carriageways and 80 km/h on other roads.',
  },
  {
    id: 'cr-041', topic: 'cr-vitesse', type: 'mcq',
    q: 'When visibility is reduced to under 50 metres (e.g., dense fog), what is the maximum permitted speed everywhere in France?',
    opts: ['30 km/h', '50 km/h', '70 km/h', '80 km/h'],
    ans: 1,
    exp: 'When visibility drops below 50 metres, the speed limit is 50 km/h on all roads regardless of the normal limit.',
  },
  {
    id: 'cr-042', topic: 'cr-vitesse', type: 'mcq',
    q: 'The recommended minimum following distance at 90 km/h is?',
    opts: ['1 second', '2 seconds (approximately 50m)', '3 seconds', '5 seconds'],
    ans: 1,
    exp: 'The Highway Code recommends a minimum of 2 seconds (about 50 metres at 90 km/h) between vehicles.',
  },
  {
    id: 'cr-043', topic: 'cr-vitesse', type: 'mcq',
    q: 'The recommended minimum following distance at 130 km/h is?',
    opts: ['2 seconds', '3 seconds (approximately 105m)', '4 seconds', '1 second'],
    ans: 1,
    exp: 'At 130 km/h, a minimum 3-second following distance (approximately 105 metres) is recommended in France.',
  },
  {
    id: 'cr-044', topic: 'cr-vitesse', type: 'mcq',
    q: 'Exceeding the speed limit by more than 50 km/h results in?',
    opts: ['A small fine only', 'Immediate licence suspension and vehicle may be immobilised', 'A warning only', 'Points deducted but no other penalty'],
    ans: 1,
    exp: 'Exceeding the speed limit by more than 50 km/h is a serious offence in France — it leads to immediate licence suspension and possible vehicle immobilisation.',
  },
  {
    id: 'cr-045', topic: 'cr-vitesse', type: 'mcq',
    q: 'What is the speed limit for a new driver on a single-carriageway outside a built-up area?',
    opts: ['80 km/h (same as experienced)', '70 km/h', '60 km/h', '90 km/h'],
    ans: 0,
    exp: 'New drivers (permis probatoire) follow the same 80 km/h limit as other drivers on single-carriageway roads outside towns.',
  },
  {
    id: 'cr-046', topic: 'cr-vitesse', type: 'mcq',
    q: 'What is the speed limit on a dual carriageway in wet conditions?',
    opts: ['80 km/h', '90 km/h', '100 km/h', '110 km/h'],
    ans: 2,
    exp: 'In wet conditions, dual carriageway speed is reduced to 100 km/h.',
  },
  {
    id: 'cr-047', topic: 'cr-vitesse', type: 'mcq',
    q: 'How many points are deducted for minor speeding (1–19 km/h over)?',
    opts: ['6 points', '4 points', '2 points', '1 point'],
    ans: 2,
    exp: 'Minor speeding (1-19 km/h over the limit) costs 1 point (in most cases) and a fine. Moderate excess costs more points.',
  },
  {
    id: 'cr-048', topic: 'cr-vitesse', type: 'mcq',
    q: 'A "zone 30" (30 km/h zone) sign at the entrance to a residential area: does the limit apply to all streets within?',
    opts: ['Only the main street', 'All streets within the zone until the end-of-zone sign', 'Only during school hours', 'Only for trucks'],
    ans: 1,
    exp: 'A "Zone 30" sign applies to all streets within the zone until the corresponding end-of-zone sign is reached.',
  },
  {
    id: 'cr-049', topic: 'cr-vitesse', type: 'mcq',
    q: 'On the motorway, driving more than 40 km/h under the minimum speed in the left lane may be?',
    opts: ['No offence', 'An offence (obstruction)', 'Required for safety', 'Encouraged'],
    ans: 1,
    exp: 'Driving excessively slowly in the left lane of a motorway can be an obstruction offence in France.',
  },
  {
    id: 'cr-050', topic: 'cr-vitesse', type: 'mcq',
    q: 'A radar sign (triangular with a camera icon) warns?',
    opts: ['You are on camera for a TV show', 'There is a speed camera (radar) ahead', 'Take a photo here', 'No cameras permitted'],
    ans: 1,
    exp: 'A triangular sign with a camera/radar icon warns of an automated speed camera ahead.',
  },
  {
    id: 'cr-051', topic: 'cr-vitesse', type: 'mcq',
    q: 'If a child under 10 is in the vehicle, must you slow down near schools?',
    opts: ['No, normal limits apply', 'Yes, 30 km/h near schools if a school zone sign is present', '50 km/h always', 'No legal requirement'],
    ans: 1,
    exp: 'School zones in France often have 30 km/h limits. When the zone 30 sign is present near a school, all vehicles must comply.',
  },

  // ── cr-alcool (cr-052 to cr-068) ───────────────────────────────────────────
  {
    id: 'cr-052', topic: 'cr-alcool', type: 'mcq',
    q: 'What is the general blood alcohol limit (BAC) for drivers in France?',
    opts: ['0.2 g/l blood', '0.5 g/l blood', '0.8 g/l blood', '1.0 g/l blood'],
    ans: 1,
    exp: 'The general BAC limit for drivers in France is 0.5 g/l blood (or 0.25 mg/l in exhaled air).',
  },
  {
    id: 'cr-053', topic: 'cr-alcool', type: 'mcq',
    q: 'What is the BAC limit for new drivers (permis probatoire) in France?',
    opts: ['0.5 g/l', '0.3 g/l', '0.2 g/l', '0.1 g/l'],
    ans: 2,
    exp: 'New drivers (permis probatoire — first 3 years) have a stricter BAC limit of 0.2 g/l blood (0.1 mg/l exhaled air).',
  },
  {
    id: 'cr-054', topic: 'cr-alcool', type: 'mcq',
    q: 'What is the BAC limit for bus and heavy goods vehicle (HGV) drivers?',
    opts: ['0.5 g/l', '0.3 g/l', '0.2 g/l', '0.1 g/l'],
    ans: 2,
    exp: 'Professional drivers (bus, coach, HGV) are subject to the 0.2 g/l BAC limit, the same as new drivers.',
  },
  {
    id: 'cr-055', topic: 'cr-alcool', type: 'mcq',
    q: 'A BAC of 0.8 g/l or above is classified in France as?',
    opts: ['A minor infraction', 'A contravention de 5e classe', 'A criminal offence (délit)', 'No specific category'],
    ans: 2,
    exp: 'A BAC at or above 0.8 g/l is a criminal offence (délit) in France, punishable by up to 2 years in prison and a €4,500 fine.',
  },
  {
    id: 'cr-056', topic: 'cr-alcool', type: 'mcq',
    q: 'Alcohol primarily affects which driving-related abilities?',
    opts: ['Only vision', 'Reaction time, judgment, co-ordination and visual field', 'Only reaction time', 'Only balance'],
    ans: 1,
    exp: 'Alcohol impairs multiple functions critical to driving: reaction time is extended, judgment is impaired, co-ordination decreases, and peripheral vision narrows.',
  },
  {
    id: 'cr-057', topic: 'cr-alcool', type: 'mcq',
    q: 'How many licence points are lost when BAC is between 0.5 and 0.8 g/l?',
    opts: ['2 points', '4 points', '6 points', 'No points — fine only'],
    ans: 2,
    exp: 'A BAC between 0.5 g/l and 0.8 g/l results in a 6-point penalty (out of 12), plus a fixed fine.',
  },
  {
    id: 'cr-058', topic: 'cr-alcool', type: 'mcq',
    q: 'A medicament (medication) with a red triangle on the packaging in France means?',
    opts: ['Take with food before driving', 'Do not drive — drug impairs driving ability', 'Requires prescription only', 'Available without prescription'],
    ans: 1,
    exp: 'Red triangle on French medication packaging (level 3 warning) means driving is prohibited — the drug severely impairs driving ability.',
  },
  {
    id: 'cr-059', topic: 'cr-alcool', type: 'mcq',
    q: 'An orange triangle on French medication packaging means?',
    opts: ['Drive normally', 'Be very careful driving — impairment is possible', 'Do not drive at all', 'Emergency use only'],
    ans: 1,
    exp: 'Orange triangle (level 2) means caution is strongly advised — the medication may impair some driving-related functions.',
  },
  {
    id: 'cr-060', topic: 'cr-alcool', type: 'mcq',
    q: 'Cannabis can remain detectable in the blood for?',
    opts: ['Only a few hours', 'Up to several hours to a few days', 'It disappears immediately after the effect wears off', 'Exactly 24 hours'],
    ans: 1,
    exp: 'Cannabis (THC) can remain detectable in blood for hours to several days depending on frequency of use. Driving under the influence is illegal even if no effect is felt.',
  },
  {
    id: 'cr-061', topic: 'cr-alcool', type: 'mcq',
    q: 'The penalty for driving under the influence of illegal drugs in France is?',
    opts: ['A small fine', 'Up to 2 years in prison and a €4,500 fine', 'Loss of 2 points only', 'Community service only'],
    ans: 1,
    exp: 'Driving under the influence of illegal drugs (stupéfiants) carries up to 2 years in prison and a €4,500 fine, the same penalty as drunk driving.',
  },
  {
    id: 'cr-062', topic: 'cr-alcool', type: 'mcq',
    q: 'Combining alcohol and drugs while driving?',
    opts: ['Has the same effect as alcohol alone', 'Multiplies the risks — the combined effect is greater than either alone', 'Is less dangerous than alcohol alone', 'Has no different legal status'],
    ans: 1,
    exp: 'The combination of alcohol and drugs multiplies risk — the synergistic effect on impairment is much greater than either substance alone.',
  },
  {
    id: 'cr-063', topic: 'cr-alcool', type: 'mcq',
    q: 'An "ethylotest" (breathalyser) in France measures?',
    opts: ['Blood alcohol content directly', 'Alcohol concentration in exhaled air', 'Drug presence', 'Heart rate'],
    ans: 1,
    exp: "An ethylotest measures alcohol concentration in exhaled breath (alcoométrie de l'air alvéolaire), which is used to estimate blood alcohol level.",
  },
  {
    id: 'cr-064', topic: 'cr-alcool', type: 'mcq',
    q: 'If your BAC is 0.5 g/l and you are a professional taxi driver, are you legally allowed to drive?',
    opts: ['Yes, 0.5 is the general limit', 'No, professional drivers must be at 0.2 g/l or below', 'Yes, but only short distances', 'Yes, with a passenger escort'],
    ans: 1,
    exp: 'Professional drivers of public transport must comply with the stricter 0.2 g/l limit. At 0.5 g/l, a taxi driver would be over the limit.',
  },
  {
    id: 'cr-065', topic: 'cr-alcool', type: 'mcq',
    q: 'After drinking, how can you reliably know when you are under the legal limit?',
    opts: ['After one hour per drink consumed', 'After a large meal', 'Only by using a calibrated breathalyser — there is no reliable personal estimate', 'After drinking coffee or water'],
    ans: 2,
    exp: 'Coffee, water, food and time estimates are unreliable. Only a calibrated breathalyser can confirm you are within the legal limit.',
  },
  {
    id: 'cr-066', topic: 'cr-alcool', type: 'mcq',
    q: 'What is the maximum fine for driving with a BAC between 0.5 and 0.8 g/l (first offence)?',
    opts: ['€135', '€375', '€750', '€4,500'],
    ans: 1,
    exp: 'A BAC of 0.5–0.8 g/l (contravention de 4e classe) carries a fixed fine of €135, reducible to €90 if paid within 15 days, or up to €375.',
  },
  {
    id: 'cr-067', topic: 'cr-alcool', type: 'mcq',
    q: 'Driving under the influence of drugs discovered during a roadside test — the police can?',
    opts: ['Only issue a warning', 'Require a blood test to confirm, and may immobilise the vehicle', 'Allow you to continue if you feel fine', 'Issue only a €50 fine'],
    ans: 1,
    exp: 'If a roadside saliva drug test is positive, police require a blood test for legal confirmation and can immediately immobilise the vehicle and suspend the licence.',
  },
  {
    id: 'cr-068', topic: 'cr-alcool', type: 'mcq',
    q: 'Yellow triangle medication warning (level 1) means?',
    opts: ['No restriction — drive normally but be aware', 'Be cautious — minor risk, read the leaflet', 'Do not drive', 'Emergency use only'],
    ans: 1,
    exp: 'A yellow triangle (level 1) means be cautious — there may be a minor risk. Read the patient leaflet and consult your pharmacist.',
  },

  // ── cr-stat (cr-069 to cr-085) ─────────────────────────────────────────────
  {
    id: 'cr-069', topic: 'cr-stat', type: 'mcq',
    q: 'What is the legal difference between "arrêt" and "stationnement" in France?',
    opts: ['No legal difference', 'Arrêt = temporary stop with driver present and ready to move; stationnement = parking with driver absent or staying longer', 'Arrêt = parking, stationnement = stopping', 'They are the same offence'],
    ans: 1,
    exp: '"Arrêt" is a brief stop with the driver able to move immediately; "stationnement" is when the vehicle is parked and the driver is not immediately available.',
  },
  {
    id: 'cr-070', topic: 'cr-stat', type: 'mcq',
    q: 'Within how many metres of an intersection is parking prohibited?',
    opts: ['3 metres', '5 metres', '10 metres', '15 metres'],
    ans: 1,
    exp: 'Parking is prohibited within 5 metres of an intersection in France.',
  },
  {
    id: 'cr-071', topic: 'cr-stat', type: 'mcq',
    q: 'Is it permitted to park on a pedestrian crossing in France?',
    opts: ['Yes, briefly', 'Yes, if no pedestrians are present', 'No, it is strictly prohibited', 'Only at night'],
    ans: 2,
    exp: 'Parking on or within 5 metres before a pedestrian crossing is strictly prohibited in France.',
  },
  {
    id: 'cr-072', topic: 'cr-stat', type: 'mcq',
    q: 'Parking near a fire hydrant in France is?',
    opts: ['Permitted if 3 metres clear', 'Prohibited', 'Permitted if you leave windows open', 'Permitted for less than 5 minutes'],
    ans: 1,
    exp: 'Parking near a fire hydrant is prohibited in France — access must remain clear for emergency services at all times.',
  },
  {
    id: 'cr-073', topic: 'cr-stat', type: 'mcq',
    q: '"Stationnement gênant" (obstructive parking) vs "stationnement dangereux" (dangerous parking) — which carries a heavier penalty?',
    opts: ['Stationnement gênant', 'The same penalty', 'Stationnement dangereux', 'Only stationnement gênant is an offence'],
    ans: 2,
    exp: '"Stationnement dangereux" (dangerous parking that creates an accident risk) carries heavier penalties than mere obstructive parking.',
  },
  {
    id: 'cr-074', topic: 'cr-stat', type: 'mcq',
    q: 'What do yellow zigzag lines (or equivalent markings) near schools or bus stops in France indicate?',
    opts: ['No parking', 'No stopping at any time', 'Slow down zone', 'Priority route'],
    ans: 1,
    exp: 'Yellow zigzag markings (or equivalent signs in France) indicate no stopping at all — typically near schools, bus stops, or other sensitive areas.',
  },
  {
    id: 'cr-075', topic: 'cr-stat', type: 'mcq',
    q: 'A "zone bleue" (blue zone) in France requires?',
    opts: ['You pay a parking meter', 'You display a parking disc (disque de stationnement) showing your arrival time', 'Only blue cars may park', 'Disabled badge holders only'],
    ans: 1,
    exp: 'In a blue zone, all vehicles must display a "disque de stationnement" (parking disc) set to arrival time, limiting parking to a specified period.',
  },
  {
    id: 'cr-076', topic: 'cr-stat', type: 'mcq',
    q: 'When parking on a hill, what should you do?',
    opts: ['Leave in neutral only', 'Turn wheels toward the kerb (or away if facing downhill), apply handbrake, leave in gear', 'Apply handbrake only', 'Leave in reverse if facing downhill'],
    ans: 1,
    exp: 'On a hill, turn wheels into the kerb (facing uphill) or away (facing downhill) to prevent runaway, apply the handbrake and leave in gear.',
  },
  {
    id: 'cr-077', topic: 'cr-stat', type: 'mcq',
    q: 'Is parking on the left side of the road permitted in a built-up area in France?',
    opts: ['Yes, always', 'No, it is generally prohibited unless otherwise signed', 'Yes, at night', 'Yes, in one-way streets'],
    ans: 1,
    exp: 'Parking on the left side of a two-way road in a built-up area is generally prohibited in France.',
  },
  {
    id: 'cr-078', topic: 'cr-stat', type: 'mcq',
    q: 'Where is double parking (parking alongside another parked vehicle) prohibited?',
    opts: ['Only on motorways', 'Everywhere — it is always prohibited', 'On priority roads only', 'Outside of towns only'],
    ans: 1,
    exp: 'Double parking is prohibited everywhere in France as it obstructs traffic and can create dangerous situations.',
  },
  {
    id: 'cr-079', topic: 'cr-stat', type: 'mcq',
    q: 'How long can you park in a "zone bleue" without a parking disc?',
    opts: ['Up to 30 minutes', 'Up to 1 hour', 'Up to 1.5 hours', 'Not at all — a disc is mandatory'],
    ans: 3,
    exp: 'In a blue zone, displaying the parking disc is mandatory. Parking without one is an offence even for a short period.',
  },
  {
    id: 'cr-080', topic: 'cr-stat', type: 'mcq',
    q: 'A sign with a red circle and the letter P crossed out means?',
    opts: ['Parking is free here', 'No parking (stationnement interdit)', 'No stopping (arrêt et stationnement interdits)', 'Paid parking required'],
    ans: 1,
    exp: 'A round red-bordered sign with a P crossed out means no parking (stationnement interdit). A P crossed out with additional horizontal bar also means no stopping.',
  },
  {
    id: 'cr-081', topic: 'cr-stat', type: 'mcq',
    q: 'A sign showing P with a blue background and time periods means?',
    opts: ['Free parking at those times', 'Paid parking required during those hours', 'No parking during those hours', 'Priority parking'],
    ans: 1,
    exp: 'A blue background parking sign with times indicates regulated parking (paid or disc required) during those periods.',
  },
  {
    id: 'cr-082', topic: 'cr-stat', type: 'mcq',
    q: 'What is the minimum distance you must maintain from a railway level crossing when parking?',
    opts: ['5 metres', '10 metres', '15 metres', '25 metres'],
    ans: 0,
    exp: 'You must not park within 5 metres of a level crossing in France to ensure clear sightlines and emergency vehicle access.',
  },
  {
    id: 'cr-083', topic: 'cr-stat', type: 'mcq',
    q: 'Can you park in front of a private driveway entrance?',
    opts: ['Yes, briefly', 'Yes, if the owner is present', 'No, it is prohibited', 'Yes, at night only'],
    ans: 2,
    exp: 'Parking in front of a private garage or driveway entrance is prohibited — it blocks access for the owner.',
  },
  {
    id: 'cr-084', topic: 'cr-stat', type: 'mcq',
    q: '"Arrêt et stationnement interdits" (no stopping or parking) is typically shown by?',
    opts: ['Round sign with red border and crossed P', 'Round red sign with two white horizontal bars, or yellow zigzags on the kerb', 'Triangle warning sign', 'Blue rectangle'],
    ans: 1,
    exp: '"Arrêt et stationnement interdits" uses a round sign with a red border and two white diagonal bars, often combined with yellow road markings.',
  },
  {
    id: 'cr-085', topic: 'cr-stat', type: 'mcq',
    q: 'An electric vehicle (EV) charging bay — may conventional cars park there?',
    opts: ['Yes, if not charging', 'No, these bays are reserved for EVs (and may carry fines for conventional vehicles)', 'Yes, for up to 30 minutes', 'Yes, at night only'],
    ans: 1,
    exp: 'EV charging bays are reserved for electric vehicles that are actively charging. Parking a non-electric vehicle (or an EV not charging) may result in a fine.',
  },
];

window.CR_LEARN_PATH = [
  {
    id: 'cr-fond',
    title: 'Fondamentaux du code de la route',
    lessons: [
      // ── Lesson cr-l01 ────────────────────────────────────────────────────────
      {
        id: 'cr-l01',
        title: 'Les panneaux de signalisation',
        icon: '🚦',
        cards: [
          {
            h: 'Panneaux de danger (triangle)',
            p: [
              "Les panneaux triangulaires à bordure rouge signalent un danger ou un avertissement à l'avance.",
              'Exemples : virage dangereux, passage piéton, passage à niveau, animaux sur la route.',
            ],
          },
          {
            h: "Panneaux d'interdiction (rond rouge)",
            p: [
              "Les panneaux ronds à bordure rouge indiquent une interdiction : vous ne devez PAS faire quelque chose.",
              'Exemples : sens interdit, limitation de vitesse (le chiffre dans un cercle rouge), interdiction de dépasser.',
            ],
          },
          {
            h: "Panneaux d'obligation (rond bleu)",
            p: [
              "Les panneaux ronds à fond bleu indiquent une obligation : vous DEVEZ faire quelque chose.",
              'Exemples : sens obligatoire, voie réservée aux cycles, feux de croisement obligatoires.',
            ],
          },
          {
            h: "Panneaux d'information (rectangles bleus)",
            p: [
              "Les panneaux rectangulaires bleus donnent des informations : directions, distances, services.",
              "Le panneau STOP et le 'cédez le passage' (triangle inversé rouge) sont des cas particuliers à bien mémoriser.",
            ],
          },
        ],
        check: [
          {
            q: 'A triangular sign with a red border indicates?',
            opts: ['Prohibition', 'Obligation', 'Danger/warning', 'Information'],
            ans: 2,
            exp: 'Red-bordered triangles are danger/warning signs.',
          },
          {
            q: 'A round sign with a blue background indicates?',
            opts: ['Warning', 'Prohibition', 'Obligation', 'Information'],
            ans: 2,
            exp: 'Blue round signs indicate an obligation — something you must do.',
          },
          {
            q: 'The STOP sign requires you to?',
            opts: ['Slow down', 'Yield if cars are present', 'Come to a complete stop even if the road appears clear', 'Honk your horn'],
            ans: 2,
            exp: 'The STOP sign requires a complete stop regardless of road conditions.',
          },
          {
            q: '"Sens interdit" (no entry) is shown as?',
            opts: ['Triangle with a car symbol', 'Round red sign with a white horizontal bar', 'Blue rectangle', 'Yellow diamond'],
            ans: 1,
            exp: '"Sens interdit" is a round red sign with a white horizontal bar.',
          },
          {
            q: '"Cédez le passage" is shaped as?',
            opts: ['Red octagon', 'Red-bordered round sign', 'Inverted triangle with red border', 'Blue rectangle'],
            ans: 2,
            exp: '"Cédez le passage" is an inverted (upside-down) triangle with a red border.',
          },
        ],
      },

      // ── Lesson cr-l02 ────────────────────────────────────────────────────────
      {
        id: 'cr-l02',
        title: 'Comprendre les priorités',
        icon: '🛑',
        cards: [
          {
            h: 'Priorité à droite',
            p: [
              "En France, aux carrefours non réglementés, vous devez céder le passage aux véhicules venant de votre droite.",
              "C'est la règle fondamentale aux intersections sans panneaux.",
            ],
          },
          {
            h: 'Route prioritaire',
            p: [
              "Le panneau losange jaune indique que vous êtes sur une route prioritaire : vous avez la priorité sur les voies secondaires.",
              "Les véhicules sur les voies secondaires doivent céder le passage (panneau triangulaire 'cédez le passage').",
            ],
          },
          {
            h: 'Ronds-points',
            p: [
              "Sur les ronds-points modernes en France, les véhicules déjà engagés dans le rond-point ont la priorité.",
              "Les véhicules qui entrent doivent céder le passage — c'est l'inverse de l'ancienne règle !",
            ],
          },
          {
            h: 'Véhicules prioritaires',
            p: [
              "Les véhicules d'urgence (ambulance, pompiers, police) avec sirène et feux ont la priorité absolue.",
              "Ralentissez, serrez-vous à droite (ou à gauche selon la configuration) et laissez-les passer.",
            ],
          },
        ],
        check: [
          {
            q: 'At an unmarked junction in France, you must give way to traffic from?',
            opts: ['The left', 'The right', 'The front', 'Whichever is faster'],
            ans: 1,
            exp: '"Priorité à droite" — give way to vehicles from your right at unmarked junctions.',
          },
          {
            q: 'On a modern French roundabout, who has priority?',
            opts: ['Entering vehicles', 'Vehicles already inside', 'The largest vehicle', 'The fastest vehicle'],
            ans: 1,
            exp: 'Vehicles already circulating inside the roundabout have priority over those entering.',
          },
          {
            q: 'The yellow diamond sign means you are on?',
            opts: ['A toll road', 'A priority road', 'A one-way road', 'A motorway'],
            ans: 1,
            exp: 'The yellow diamond (losange jaune) indicates a priority road — you have right of way over side roads.',
          },
          {
            q: 'Emergency vehicles with flashing lights and sirens have?',
            opts: ['Normal priority', 'No special rights', 'Absolute priority — yield and move aside', 'Priority only on motorways'],
            ans: 2,
            exp: 'Emergency vehicles with active lights and sirens have absolute priority on all roads.',
          },
          {
            q: 'A pedestrian on a marked crossing has?',
            opts: ['Lower priority than moving cars', 'Absolute priority — you must stop', 'Priority only at night', 'Priority only at zebra crossings'],
            ans: 1,
            exp: 'A pedestrian who has stepped onto a marked crossing has absolute priority — drivers must stop.',
          },
        ],
      },

      // ── Lesson cr-l03 ────────────────────────────────────────────────────────
      {
        id: 'cr-l03',
        title: 'Les limitations de vitesse',
        icon: '💨',
        cards: [
          {
            h: 'Vitesses en agglomération et hors agglomération',
            p: [
              "En agglomération : 50 km/h (défaut). Hors agglomération sur route à chaussée unique : 80 km/h (depuis 2018).",
              "Sur route à deux chaussées séparées (hors autoroute) : 110 km/h par temps sec.",
            ],
          },
          {
            h: 'Autoroute',
            p: [
              "Sur autoroute par temps sec : 130 km/h. Par temps de pluie : 110 km/h.",
              "Les conducteurs en période probatoire (3 ans) : 110 km/h maxi sur autoroute.",
            ],
          },
          {
            h: 'Conditions particulières',
            p: [
              "Par visibilité inférieure à 50 m (brouillard dense) : 50 km/h partout.",
              "En cas d'accident ou de bouchon : adapter sa vitesse et respecter les limitations variables.",
            ],
          },
          {
            h: 'Distances de sécurité',
            p: [
              "La règle des 2 secondes : laissez 2 secondes entre votre véhicule et celui qui précède.",
              "À 130 km/h, maintenez environ 105 m (3 secondes) de distance de sécurité.",
            ],
          },
        ],
        check: [
          {
            q: 'What is the default speed limit inside a French built-up area?',
            opts: ['30 km/h', '50 km/h', '70 km/h', '90 km/h'],
            ans: 1,
            exp: 'The default speed limit in an agglomération is 50 km/h.',
          },
          {
            q: 'The speed limit on a single-carriageway road outside a town is?',
            opts: ['70 km/h', '80 km/h', '90 km/h', '100 km/h'],
            ans: 1,
            exp: 'Since 2018, single-carriageway roads outside built-up areas have an 80 km/h limit.',
          },
          {
            q: 'The motorway speed limit in dry weather is?',
            opts: ['110 km/h', '120 km/h', '130 km/h', '150 km/h'],
            ans: 2,
            exp: 'The motorway speed limit in dry conditions is 130 km/h.',
          },
          {
            q: 'When visibility is under 50 metres, the speed limit everywhere is?',
            opts: ['30 km/h', '50 km/h', '70 km/h', '80 km/h'],
            ans: 1,
            exp: 'When visibility is below 50m (e.g. dense fog), all vehicles are limited to 50 km/h on all road types.',
          },
          {
            q: 'The minimum recommended following distance at 90 km/h is?',
            opts: ['1 second', '2 seconds (about 50m)', '3 seconds', '4 seconds'],
            ans: 1,
            exp: 'Two seconds / approximately 50 metres is the recommended minimum following distance at 90 km/h.',
          },
        ],
      },

      // ── Lesson cr-l04 ────────────────────────────────────────────────────────
      {
        id: 'cr-l04',
        title: 'Alcool et conduite',
        icon: '🍺',
        cards: [
          {
            h: 'Taux légaux',
            p: [
              "Conducteurs ordinaires : 0,5 g/l de sang (0,25 mg/l d'air expiré).",
              "Conducteurs en période probatoire et professionnels (bus, poids lourds) : 0,2 g/l.",
            ],
          },
          {
            h: "Effets de l'alcool",
            p: [
              "L'alcool allonge le temps de réaction, altère le jugement, réduit le champ visuel et dégrade la coordination.",
              "À 0,5 g/l, le risque d'accident est multiplié par 2 ; à 0,8 g/l, il est multiplié par 6.",
            ],
          },
          {
            h: 'Drogues et médicaments',
            p: [
              "Conduire sous l'emprise de stupéfiants est illégal — même si vous ne ressentez plus les effets.",
              "Les médicaments avec un triangle rouge : conduite interdite. Triangle orange : prudence. Triangle jaune : attention requise.",
            ],
          },
        ],
        check: [
          {
            q: 'The general BAC limit for drivers in France is?',
            opts: ['0.2 g/l', '0.5 g/l', '0.8 g/l', '1.0 g/l'],
            ans: 1,
            exp: 'The general limit is 0.5 g/l blood alcohol (0.25 mg/l in exhaled air).',
          },
          {
            q: 'The BAC limit for new drivers (permis probatoire) is?',
            opts: ['0.5 g/l', '0.3 g/l', '0.2 g/l', '0.0 g/l'],
            ans: 2,
            exp: 'New drivers must stay at or below 0.2 g/l during the 3-year probationary period.',
          },
          {
            q: 'A red triangle on a medication package in France means?',
            opts: ['Minor caution while driving', 'Do not drive — severe impairment', 'Prescription required', 'Take before driving'],
            ans: 1,
            exp: 'Red triangle (level 3) = driving is prohibited. The drug severely impairs driving ability.',
          },
          {
            q: 'A BAC of 0.8 g/l or more in France is?',
            opts: ['A minor infraction', 'The normal limit', 'A criminal offence (délit)', 'No specific offence'],
            ans: 2,
            exp: 'At 0.8 g/l or above, the offence becomes a criminal délit, punishable by up to 2 years in prison.',
          },
          {
            q: 'Combining alcohol with illegal drugs while driving?',
            opts: ['Has the same risk as alcohol alone', 'Has less risk than alcohol alone', 'Multiplies the risk — synergistic impairment', 'Is only an issue at high doses'],
            ans: 2,
            exp: 'Combining substances multiplies risk — their combined effect on impairment is far greater than either alone.',
          },
        ],
      },

      // ── Lesson cr-l05 ────────────────────────────────────────────────────────
      {
        id: 'cr-l05',
        title: 'Stationnement et arrêt',
        icon: '🅿️',
        cards: [
          {
            h: 'Arrêt vs Stationnement',
            p: [
              "Un arrêt est temporaire — le conducteur reste au volant prêt à repartir immédiatement.",
              "Le stationnement implique que le conducteur quitte le véhicule ou reste immobilisé durablement.",
            ],
          },
          {
            h: 'Interdictions courantes',
            p: [
              "Interdit : à moins de 5 m d'un carrefour ou passage piéton, devant un garage, sur un passage piéton, près d'une bouche d'incendie.",
              "Interdit aussi : en double file, du côté gauche sur une voie à double sens (sauf indication), sur les trottoirs.",
            ],
          },
          {
            h: 'Zones bleues et marquages',
            p: [
              "Zone bleue : utilisez un disque de stationnement (disque bleu) indiquant votre heure d'arrivée.",
              "Lignes jaunes au sol = interdiction d'arrêt et de stationnement. Panneau P barré = stationnement interdit.",
            ],
          },
        ],
        check: [
          {
            q: '"Arrêt" (stopping) differs from "stationnement" (parking) in that?',
            opts: ['They are the same', 'Arrêt is temporary with driver present; stationnement means the driver is absent or stays longer', 'Arrêt is longer', 'Stationnement is only for trucks'],
            ans: 1,
            exp: '"Arrêt" = brief stop, driver ready to move. "Stationnement" = parking, driver gone or staying.',
          },
          {
            q: 'Parking within 5 metres of a crossroads is?',
            opts: ['Permitted during off-peak hours', 'Always prohibited', 'Permitted briefly', 'Permitted at night'],
            ans: 1,
            exp: 'Parking within 5 metres of an intersection is prohibited at all times in France.',
          },
          {
            q: 'In a "zone bleue", what is required?',
            opts: ['A paid parking ticket', 'A parking disc (disque de stationnement) showing arrival time', 'Nothing — free parking', 'A resident permit'],
            ans: 1,
            exp: 'In a blue zone you must display a parking disc showing your arrival time to comply with the time limit.',
          },
          {
            q: 'Yellow road markings (zigzags or solid lines) near a crossing mean?',
            opts: ['Parking is free here', 'No stopping at all is permitted', 'Slow down only', 'Paid parking zone'],
            ans: 1,
            exp: 'Yellow markings near crossings indicate no stopping at all — neither for arrêt nor stationnement.',
          },
        ],
      },
    ],
  },
];
