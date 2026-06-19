/* delf-data.js — DELF Mock Exam data for French language practice
   Two complete simulated exams: DELF A1 and DELF A2.
   Auto-graded sections: listening (transcripts) and reading (texts).
   Self-assessed sections: writing and speaking (rubric checklists). */
'use strict';
window.DELF_MOCKS = [

  /* ═══════════════════════════════════════════════════════════════
     DELF A1 — MOCK EXAM 1
     100 pts total · pass mark 50/100 · minimum 5/25 per section
  ═══════════════════════════════════════════════════════════════ */
  {
    id: 'delf-a1-1',
    level: 'A1',
    title: 'DELF A1 — Mock Exam 1',
    desc: 'Simulates a complete DELF A1 exam across 4 sections (Listening · Reading · Writing · Speaking). Pass mark: 50/100 with a minimum of 5/25 in each section.',
    totalDuration: '1h 20min',
    sections: [

      /* ── LISTENING ────────────────────────────────────────────── */
      {
        id: 'listening',
        icon: '🎧',
        title: "Compréhension de l'oral",
        english: 'Listening Comprehension',
        duration: 1200,
        maxScore: 25,
        type: 'auto',
        audioNote: 'In the real DELF A1 exam, each recording is played twice. Read each transcript as you would listen, then answer the questions.',
        exercises: [
          {
            id: 'a1-l-ex1',
            title: 'Exercise 1 — Short messages (5 points)',
            instruction: 'You hear 5 short messages. Choose the correct answer for each.',
            questions: [
              {
                transcript: '[Voicemail] "Bonjour, c\'est Sophie. Je t\'appelle pour te dire que notre rendez-vous de vendredi est annulé. Rappelle-moi, s\'il te plaît!"',
                q: 'What is the main purpose of Sophie\'s message?',
                opts: ['To confirm a meeting', 'To cancel a meeting', 'To change the meeting time', 'To ask for directions'],
                ans: 1
              },
              {
                transcript: '[Announcement] "Attention aux passagers du vol AF 1024 à destination de Rome: embarquement immédiat à la porte B14."',
                q: 'Where must the passengers go immediately?',
                opts: ['To the check-in desk', 'To gate B14', 'To the arrivals hall', 'To the information desk'],
                ans: 1
              },
              {
                transcript: '[Shop announcement] "Mesdames, messieurs, notre magasin ferme dans dix minutes. Nous vous prions de vous diriger vers les caisses. Merci."',
                q: 'What are customers asked to do?',
                opts: ['Leave the building', 'Go to the checkout', 'Return tomorrow', 'Collect their bags'],
                ans: 1
              },
              {
                transcript: '[Radio weather] "Demain matin, chutes de neige possibles dans les Alpes. Températures négatives attendues en altitude."',
                q: 'What weather is expected in the Alps tomorrow?',
                opts: ['Heavy rain', 'Strong winds', 'Possible snowfall', 'Sunny and warm'],
                ans: 2
              },
              {
                transcript: '[Pharmacy voicemail] "Bonjour, ici la pharmacie Durand. Votre ordonnance est prête. Vous pouvez venir la chercher à partir de 14 heures."',
                q: 'From what time can the prescription be collected?',
                opts: ['From 10h00', 'From 12h00', 'From 14h00', 'From 16h00'],
                ans: 2
              }
            ]
          },
          {
            id: 'a1-l-ex2',
            title: 'Exercise 2 — Short conversations (5 points)',
            instruction: 'You hear 5 short conversations. Answer the question for each.',
            questions: [
              {
                transcript: '[At a café]\n– Bonjour, vous désirez?\n– Un café s\'il vous plaît.\n– Avec du lait?\n– Non, noir, merci.',
                q: 'What does the customer order?',
                opts: ['A white coffee', 'A black coffee', 'A tea', 'A hot chocolate'],
                ans: 1
              },
              {
                transcript: '[On the phone]\n– Bonjour, je voudrais réserver une table pour ce soir.\n– Pour combien de personnes?\n– Pour quatre personnes, à vingt heures trente.',
                q: 'At what time is the table booked?',
                opts: ['20h00', '20h15', '20h30', '21h00'],
                ans: 2
              },
              {
                transcript: '[At a hotel]\n– Bonjour, j\'ai une réservation au nom de Martin.\n– Oui, madame. Chambre deux cent trois, au deuxième étage. Voici votre clé.',
                q: 'On which floor is the room?',
                opts: ['Ground floor', 'First floor', 'Second floor', 'Third floor'],
                ans: 2
              },
              {
                transcript: '[In a shop]\n– Excusez-moi, où sont les caisses?\n– Au fond du magasin, à droite.',
                q: 'Where is the checkout?',
                opts: ['Entrance, on the left', 'Middle of the shop', 'Back, on the right', 'First floor'],
                ans: 2
              },
              {
                transcript: '[Two students talking]\n– Tu as cours à quelle heure demain?\n– À neuf heures. Et toi?\n– Moi, je commence à dix heures.',
                q: 'What time does the first student start class tomorrow?',
                opts: ['8h00', '9h00', '10h00', '11h00'],
                ans: 1
              }
            ]
          },
          {
            id: 'a1-l-ex3',
            title: 'Exercise 3 — At the ticket office (7 points)',
            instruction: 'Listen to the conversation. Answer all seven questions.',
            questions: [
              {
                transcript: '[At the ticket office]\n– Bonjour, je voudrais un billet pour Paris, s\'il vous plaît.\n– Aller simple ou aller-retour?\n– Aller-retour. Je pars vendredi soir et je reviens dimanche.\n– Très bien. Première ou deuxième classe?\n– Deuxième classe, c\'est moins cher.\n– Le train part à dix-huit heures vingt et arrive à Paris à vingt heures quarante-cinq. Ça vous convient?\n– Oui, parfait. C\'est combien?\n– Quarante-huit euros pour l\'aller-retour en deuxième classe.\n– Je peux payer par carte?\n– Oui, bien sûr.',
                q: 'What type of ticket does the customer want?',
                opts: ['Single', 'Return', 'Season ticket', 'Group ticket'],
                ans: 1
              },
              { transcript: null, q: 'When does the customer travel to Paris?', opts: ['Thursday evening', 'Friday morning', 'Friday evening', 'Saturday morning'], ans: 2 },
              { transcript: null, q: 'Which class does the customer choose?', opts: ['First class', 'Second class', 'Business class', 'No preference stated'], ans: 1 },
              { transcript: null, q: 'What time does the train depart?', opts: ['17h45', '18h00', '18h20', '19h00'], ans: 2 },
              { transcript: null, q: 'What time does the train arrive in Paris?', opts: ['20h00', '20h30', '20h45', '21h00'], ans: 2 },
              { transcript: null, q: 'How much does the return ticket cost?', opts: ['€36', '€42', '€48', '€54'], ans: 2 },
              { transcript: null, q: 'How does the customer pay?', opts: ['Cash', 'Cheque', 'By card', 'Bank transfer'], ans: 2 }
            ]
          },
          {
            id: 'a1-l-ex4',
            title: 'Exercise 4 — Radio broadcast (8 points)',
            instruction: 'Listen to the local radio programme. Answer all eight questions.',
            questions: [
              {
                transcript: '[Local radio]\n"Bonjour à tous! Cette semaine, nous parlons du Festival de Musique de Lyon. Ce festival se déroule du quinze au vingt juillet dans le Parc de la Tête d\'Or. Cette année, plus de trente artistes sont au programme: musiciens de jazz, de classique et de musique du monde. L\'entrée est gratuite pour les enfants de moins de douze ans. Pour les adultes, les billets coûtent quinze euros par jour ou soixante euros pour le pass semaine. La billetterie est ouverte en ligne sur le site du festival ou à l\'entrée du parc. Le programme complet est disponible sur notre site internet."',
                q: 'In which city does the festival take place?',
                opts: ['Paris', 'Marseille', 'Lyon', 'Bordeaux'],
                ans: 2
              },
              { transcript: null, q: 'When does the festival run?', opts: ['5–10 July', '10–15 July', '15–20 July', '20–25 July'], ans: 2 },
              { transcript: null, q: 'Where is the festival held?', opts: ['The town hall square', 'Parc de la Tête d\'Or', 'The main stadium', 'The city centre'], ans: 1 },
              { transcript: null, q: 'How many artists perform?', opts: ['More than 10', 'More than 20', 'More than 30', 'More than 50'], ans: 2 },
              { transcript: null, q: 'Which type of music is NOT mentioned?', opts: ['Jazz', 'Classical', 'Rock', 'World music'], ans: 2 },
              { transcript: null, q: 'Who can attend for free?', opts: ['All students', 'Children under 12', 'Senior citizens', 'Residents of Lyon'], ans: 1 },
              { transcript: null, q: 'What is the price of a daily adult ticket?', opts: ['€10', '€15', '€20', '€60'], ans: 1 },
              { transcript: null, q: 'Where can tickets be purchased?', opts: ['Online only', 'At the park entrance only', 'Online or at the park entrance', 'At the tourist office only'], ans: 2 }
            ]
          }
        ]
      },

      /* ── READING ──────────────────────────────────────────────── */
      {
        id: 'reading',
        icon: '📖',
        title: 'Compréhension des écrits',
        english: 'Reading Comprehension',
        duration: 1800,
        maxScore: 25,
        type: 'auto',
        exercises: [
          {
            id: 'a1-r-ex1',
            title: 'Exercise 1 — Signs and notices (5 points)',
            instruction: 'Read each sign or notice. Choose the correct answer.',
            questions: [
              {
                text: 'FERMÉ POUR RÉNOVATION\nRé-ouverture prévue le 1er septembre\nNous nous excusons pour la gêne occasionnée.',
                q: 'What does this sign mean?',
                opts: ['The shop is closing permanently', 'The shop is being renovated and will reopen', 'The shop is open but under repair', 'The shop is moving location'],
                ans: 1
              },
              {
                text: 'STATIONNEMENT INTERDIT\nDu lundi au vendredi de 8h à 19h\nLe week-end: libre',
                q: 'When is parking allowed?',
                opts: ['Every day after 19h00', 'Only at weekends', 'Monday–Friday 8h–19h only', 'Every day before 8h00 and at weekends'],
                ans: 3
              },
              {
                text: 'BIBLIOTHÈQUE MUNICIPALE\nHoraires: Mar–Ven 10h–18h · Sam 10h–17h\nFermée le lundi et le dimanche\nAdhésion gratuite sur présentation d\'une pièce d\'identité.',
                q: 'What do you need to get a free library membership?',
                opts: ['A student card', 'Proof of identity', 'A bank card', 'A telephone bill'],
                ans: 1
              },
              {
                text: 'ATTENTION: EAU NON POTABLE\nCette eau n\'est pas destinée à la consommation humaine.\nUtilisation pour l\'arrosage uniquement.',
                q: 'What does this warning sign mean?',
                opts: ['The water is very hot', 'The water is not for drinking', 'The fountain is out of order', 'The water is recycled rainwater'],
                ans: 1
              },
              {
                text: 'JARDIN PUBLIC\nChiens admis tenus en laisse\nVélos interdits\nAires de jeux: enfants de 3 à 12 ans.',
                q: 'What is permitted in this public garden?',
                opts: ['Cycling on the paths', 'Dogs off the lead', 'Dogs on a lead', 'Children under 3 on the play area'],
                ans: 2
              }
            ]
          },
          {
            id: 'a1-r-ex2',
            title: 'Exercise 2 — Email (5 points)',
            instruction: 'Read the email. Answer the five questions.',
            questions: [
              {
                text: 'De: paul.dupont@email.fr\nÀ: marie.bernard@email.fr\nObjet: Week-end à Paris\n\nChère Marie,\n\nJe t\'écris pour te donner les détails de notre week-end. Nous partons samedi matin par le train de 8h15 depuis la gare de Lyon. J\'ai réservé deux chambres dans un hôtel près du Louvre — à 10 minutes à pied du musée.\n\nSamedi après-midi, je propose de visiter le musée d\'Orsay. Le soir, j\'ai trouvé un super restaurant dans le Marais.\n\nDimanche, on peut aller voir la Tour Eiffel le matin et se promener au bord de la Seine l\'après-midi avant de reprendre le train.\n\nDis-moi si ça te convient!\nPaul',
                q: 'What time does the train leave on Saturday?',
                opts: ['7h15', '8h00', '8h15', '9h15'],
                ans: 2
              },
              { text: null, q: 'Where is the hotel?', opts: ['Near the Eiffel Tower', 'Near the Louvre', 'In the Marais', 'At the station'], ans: 1 },
              { text: null, q: 'What does Paul suggest on Saturday afternoon?', opts: ['Walk along the Seine', 'Visit the Louvre', 'Visit the Musée d\'Orsay', 'Go up the Eiffel Tower'], ans: 2 },
              { text: null, q: 'Where is the restaurant Paul has found?', opts: ['Near the Louvre', 'In the Marais', 'Near the Eiffel Tower', 'By the Seine'], ans: 1 },
              { text: null, q: 'What is planned for Sunday morning?', opts: ['Visit the Musée d\'Orsay', 'Walk along the Seine', 'Visit the Eiffel Tower', 'Lunch in the Marais'], ans: 2 }
            ]
          },
          {
            id: 'a1-r-ex3',
            title: 'Exercise 3 — Restaurant menu (7 points)',
            instruction: 'Read the menu. Answer the seven questions.',
            questions: [
              {
                text: 'RESTAURANT "LE PETIT BISTROT"\n\nMENU DU JOUR (12h–14h30) — 15€\nEntrée: Soupe à l\'oignon ou Salade de chèvre chaud\nPlat: Steak frites · Poulet rôti aux herbes · Pavé de saumon\nDessert: Tarte Tatin ou Mousse au chocolat\n(Boisson non comprise)\n\nÀ LA CARTE:\nEntrées à partir de 7€ · Plats à partir de 14€ · Desserts à partir de 5€\n\nBoissons: Eau minérale 3€ · Vin (verre) 5€ · Café 2,50€\n\nNous acceptons les cartes bancaires. Service compris.',
                q: 'Until what time is the set menu available?',
                opts: ['Until 12h00', 'Until 13h00', 'Until 14h30', 'Until 15h00'],
                ans: 2
              },
              { text: null, q: 'How many main course options are on the set menu?', opts: ['One', 'Two', 'Three', 'Four'], ans: 2 },
              { text: null, q: 'What is the price of the set menu?', opts: ['€12', '€15', '€18', '€20'], ans: 1 },
              { text: null, q: 'Is a drink included in the set menu?', opts: ['Yes, water is included', 'Yes, wine is included', 'No, drinks are extra', 'Yes, coffee is included'], ans: 2 },
              { text: null, q: 'What is the minimum à la carte price for a starter?', opts: ['€5', '€7', '€10', '€14'], ans: 1 },
              { text: null, q: 'How much does a glass of wine cost?', opts: ['€2.50', '€3.00', '€5.00', '€7.00'], ans: 2 },
              { text: null, q: 'Are card payments accepted and is service included?', opts: ['Cards accepted, service not included', 'Cash only, service included', 'Cards accepted, service included', 'Cards accepted, 10% service charge added'], ans: 2 }
            ]
          },
          {
            id: 'a1-r-ex4',
            title: 'Exercise 4 — Classified advertisements (8 points)',
            instruction: 'Read the three advertisements. Answer the eight questions.',
            questions: [
              {
                text: 'ANNONCE 1\n"Loue appartement T2 meublé, centre-ville, 3ème étage sans ascenseur. 45m², 1 chambre, séjour-cuisine, salle de bains. Charges comprises. Disponible le 1er mars. 650€/mois. Tél: 06 78 90 12 34"\n\nANNONCE 2\n"Cherche colocation. Étudiante en médecine, 22 ans, non-fumeuse, cherche chambre dans appartement partagé. Disponible de suite. Budget max: 450€/mois. Contactez Emma: emma.petit@email.fr"\n\nANNONCE 3\n"Vends vélo de ville, rouge, excellent état, 7 vitesses, antivol inclus. Idéal pour trajet domicile-travail. 150€ négociable. Photos sur demande. Pierre: 07 12 34 56 78"',
                q: 'On which floor is the flat in Ad 1?',
                opts: ['Ground floor', 'First floor', 'Second floor', 'Third floor'],
                ans: 3
              },
              { text: null, q: 'What does the monthly rent in Ad 1 include?', opts: ['Furniture only', 'Service charges', 'Electricity bills', 'Internet access'], ans: 1 },
              { text: null, q: 'When is the flat in Ad 1 available?', opts: ['Immediately', '1st February', '1st March', '1st April'], ans: 2 },
              { text: null, q: 'What is Emma studying (Ad 2)?', opts: ['Law', 'Medicine', 'Engineering', 'Literature'], ans: 1 },
              { text: null, q: 'What is Emma\'s maximum monthly budget (Ad 2)?', opts: ['€350', '€400', '€450', '€500'], ans: 2 },
              { text: null, q: 'What is being sold in Ad 3?', opts: ['A car', 'A bicycle', 'A moped', 'A motorbike'], ans: 1 },
              { text: null, q: 'What colour is the item in Ad 3?', opts: ['Blue', 'Green', 'Black', 'Red'], ans: 3 },
              { text: null, q: 'Is the price in Ad 3 negotiable?', opts: ['No, price is fixed', 'Yes, it is negotiable', 'Negotiable for students only', 'The ad does not say'], ans: 1 }
            ]
          }
        ]
      },

      /* ── WRITING ──────────────────────────────────────────────── */
      {
        id: 'writing',
        icon: '✏️',
        title: 'Production écrite',
        english: 'Written Expression',
        duration: 1800,
        maxScore: 25,
        type: 'writing',
        intro: 'This section has 2 tasks. Write your answers on paper or in a separate document. Use the timer to simulate real exam conditions. When the timer ends or you finish writing, self-assess using the rubric provided.',
        tasks: [
          {
            id: 'a1-w1',
            title: 'Task 1 — Short message (10 points)',
            instruction: 'Write a short message of 40–50 words in French to your new French penfriend. Introduce yourself: give your name, your age, where you live, what you do (work or studies), and one thing you enjoy doing.',
            hint: 'Begin with: "Bonjour ! Je m\'appelle…" End with: "À bientôt !" Try to write in simple present tense sentences.',
            rubric: [
              { id: 'a1-w1-1', label: 'I gave my name and stated my age', points: 2 },
              { id: 'a1-w1-2', label: 'I said where I live (town or country)', points: 2 },
              { id: 'a1-w1-3', label: 'I mentioned my job or studies', points: 2 },
              { id: 'a1-w1-4', label: 'I mentioned one thing I enjoy doing', points: 2 },
              { id: 'a1-w1-5', label: 'My spelling of common words was mostly correct', points: 1 },
              { id: 'a1-w1-6', label: 'My message was approximately 40–50 words', points: 1 }
            ],
            modelAnswer: `Bonjour ! Je m'appelle Emma. J'ai 25 ans et j'habite à Manchester, en Angleterre. Je suis infirmière dans un grand hôpital. Le week-end, j'aime lire des romans et retrouver mes amis. Je suis très heureuse d'avoir un correspondant français ! À bientôt ! Emma`
          },
          {
            id: 'a1-w2',
            title: 'Task 2 — Short message (15 points)',
            instruction: 'Write a postcard of 40–50 words in French to a French friend. Include: where you are, what the weather is like, one activity you have done, and that you are having a good time.',
            hint: 'Start with "Cher/Chère [name]," and end with a closing such as "Bisous, [your name]" or "À bientôt!"',
            rubric: [
              { id: 'a1-w2-1', label: 'I said where I am (town/region)', points: 2 },
              { id: 'a1-w2-2', label: 'I described the weather', points: 2 },
              { id: 'a1-w2-3', label: 'I described at least one activity', points: 3 },
              { id: 'a1-w2-4', label: 'I expressed that I am enjoying myself', points: 2 },
              { id: 'a1-w2-5', label: 'I used an appropriate greeting and sign-off', points: 2 },
              { id: 'a1-w2-6', label: 'My vocabulary was appropriate and varied', points: 2 },
              { id: 'a1-w2-7', label: 'My spelling was mostly correct', points: 2 }
            ],
            modelAnswer: `Chère Marie,\n\nJe suis à Nice, sur la Côte d'Azur ! Il fait magnifique ici — très beau et chaud. Hier, j'ai visité la vieille ville et j'ai mangé une excellente pizza. Je me sens vraiment heureuse et je profite bien de mes vacances !\n\nÀ bientôt, Emma`
          }
        ]
      },

      /* ── SPEAKING ─────────────────────────────────────────────── */
      {
        id: 'speaking',
        icon: '🗣️',
        title: 'Production orale',
        english: 'Oral Expression',
        duration: 600,
        prepDuration: 600,
        maxScore: 25,
        type: 'speaking',
        intro: 'This section has 3 parts. You normally practise with a partner or in front of a mirror. Use the preparation timer (10 min), then carry out each part. Self-assess honestly using the rubric.',
        tasks: [
          {
            id: 'a1-sp1',
            title: 'Part 1 — Guided interaction (10 points)',
            instruction: 'The examiner asks questions about you. Answer as naturally and with as much detail as possible. Example questions:',
            prompts: [
              'Comment tu t\'appelles ? Tu viens d\'où ?',
              'Quel âge as-tu ? Quelle est ta date de naissance ?',
              'Qu\'est-ce que tu fais comme travail ou comme études ?',
              'Tu as une famille ? Tu peux me parler de ta famille ?',
              'Qu\'est-ce que tu aimes faire le week-end ?',
              'Tu habites où ? Comment est ton logement ?',
              'Tu parles quelles langues ?'
            ],
            rubric: [
              { id: 'a1-sp1-1', label: 'I answered each question with at least one complete sentence', points: 4 },
              { id: 'a1-sp1-2', label: 'I used basic vocabulary correctly for personal topics (name, age, job, family, hobbies)', points: 3 },
              { id: 'a1-sp1-3', label: 'My words were generally recognisable to a sympathetic native speaker despite a foreign accent', points: 3 }
            ]
          },
          {
            id: 'a1-sp2',
            title: 'Part 2 — Transaction role-play (10 points)',
            instruction: 'Carry out the role-play with a partner (or practise alone). You are the customer at a French market.',
            scenario: 'You are at an outdoor market in France. You want to buy ingredients for a dinner party for 4 people. Ask for: 1 kg of tomatoes, 500 g of strawberries, a bag of salad leaves. Ask the price of everything. Pay and ask for a bag.',
            role: 'Customer',
            partnerRole: 'Market trader',
            usefulPhrases: [
              'Je voudrais… / Je cherche…',
              'C\'est combien ? / Quel est le prix de… ?',
              'Un kilo de… / Cinq cents grammes de…',
              'Est-ce que vous avez… ?',
              'Je vais prendre ça.',
              'Vous avez un sac, s\'il vous plaît ?'
            ],
            rubric: [
              { id: 'a1-sp2-1', label: 'I asked for all the required items correctly', points: 4 },
              { id: 'a1-sp2-2', label: 'I asked about the price and responded appropriately', points: 3 },
              { id: 'a1-sp2-3', label: 'I used polite and appropriate language', points: 3 }
            ],
            modelDialogue: `Marchand : Bonjour ! Je peux vous aider ?\nClient : Bonjour ! Je voudrais un kilo de tomates, s'il vous plaît.\nMarchand : Voilà. C'est tout ?\nClient : Non. Je voudrais aussi cinq cents grammes de fraises.\nMarchand : Voici. Autre chose ?\nClient : Oui — un sachet de salade, s'il vous plaît. C'est combien en tout ?\nMarchand : Ça fait six euros cinquante.\nClient : Voici dix euros. Et vous avez un sac, s'il vous plaît ?\nMarchand : Bien sûr ! Voici votre monnaie — trois euros cinquante.\nClient : Merci beaucoup ! Au revoir !\nMarchand : Bonne journée !`
          },
          {
            id: 'a1-sp3',
            title: 'Part 3 — Photo description (5 points)',
            instruction: 'Describe what you see in the image below. Speak for about 1–2 minutes.',
            image: 'img-delf-a1-sp3.svg',
            guidingQuestions: [
              'Qu\'est-ce que vous voyez sur cette photo ?',
              'Où se trouvent les gens ?',
              'Qu\'est-ce qu\'ils font ?',
              'Quel temps fait-il ?',
              'Vous aimez les marchés ? Pourquoi ?'
            ],
            rubric: [
              { id: 'a1-sp3-1', label: 'I named and described what I can see — people, objects and the setting — using simple nouns and verbs', points: 3 },
              { id: 'a1-sp3-2', label: 'I used basic adjectives and present tense correctly to describe the scene (e.g. colour, size, action)', points: 2 }
            ]
          }
        ]
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
     DELF B1 — SELF-ASSESSMENT
     100 pts total · pass mark 50/100 · minimum 5/25 per section
     All four skills are self-assessed using rubric checklists.
  ═══════════════════════════════════════════════════════════════ */
  {
    id: 'delf-b1-1',
    level: 'B1',
    title: 'DELF B1 — Self-Assessment',
    desc: 'Self-assessed practice for DELF B1 (threshold level). All four sections use rubric checklists. Pass mark: 50/100 with a minimum of 5/25 in each section.',
    totalDuration: '2h 00min',
    sections: [

      /* ── LISTENING ────────────────────────────────────────────── */
      {
        id: 'listening',
        icon: '🎧',
        title: "Compréhension de l'oral",
        english: 'Listening Comprehension',
        duration: 1800,
        maxScore: 25,
        type: 'self',
        audioNote: 'Read each transcript as you would listen to the recording. Answer each task mentally or on paper, then self-assess using the rubric checklist.',
        tasks: [
          {
            id: 'b1-li1',
            title: 'Task 1 — Annonce radio — environnement (8 points)',
            instruction: 'Vous allez entendre une annonce de la radio. Lisez les questions, puis écoutez l\'enregistrement et répondez.',
            script: 'Bonjour à tous. La mairie de Lyon vient d\'annoncer un plan ambitieux pour développer les pistes cyclables dans l\'agglomération. D\'ici 2026, cent kilomètres de nouvelles voies seront créés pour encourager les habitants à délaisser leur voiture. Le maire a déclaré que cette initiative permettra de réduire de 30% les émissions de CO2 dans le centre-ville. Les travaux commenceront dès le printemps prochain, avec en priorité les axes principaux reliant les grandes gares aux quartiers résidentiels. Les riverains sont invités à consulter les plans sur le site de la mairie et à donner leur avis lors de réunions publiques organisées en janvier. Pour plus d\'informations, vous pouvez appeler le numéro vert au 0800-LYON-VELO.',
            rubric: [
              { id: 'b1-li1-1', label: 'Identifies the main topic (cycling infrastructure)', points: 2 },
              { id: 'b1-li1-2', label: 'States the target reduction (30% CO2)', points: 2 },
              { id: 'b1-li1-3', label: 'Identifies when work begins (spring)', points: 1 },
              { id: 'b1-li1-4', label: 'Names how residents can give feedback (public meetings, website)', points: 2 },
              { id: 'b1-li1-5', label: 'Notes the phone number provided', points: 1 }
            ]
          },
          {
            id: 'b1-li2',
            title: 'Task 2 — Interview — le télétravail (9 points)',
            instruction: 'Vous allez entendre une interview avec une experte en ressources humaines sur le sujet du télétravail. Écoutez et répondez aux questions.',
            script: 'Journaliste : Le télétravail est-il vraiment bénéfique pour les employés ?\nExperte : C\'est une question très intéressante. D\'un côté, les études montrent que les télétravailleurs sont en général plus productifs — ils économisent le temps de transport et peuvent mieux organiser leurs journées. Cependant, la frontière entre vie professionnelle et vie privée devient souvent floue. Beaucoup de salariés me disent qu\'ils ont du mal à \'décrocher\' le soir. Un autre problème important est l\'isolement social — le bureau n\'est pas seulement un lieu de travail, c\'est aussi un espace d\'échanges humains. Pour les personnes qui vivent seules, le manque de contact peut devenir pesant. Les entreprises doivent donc trouver un équilibre — peut-être deux ou trois jours de télétravail par semaine — pour profiter des avantages sans souffrir des inconvénients. Les managers aussi doivent adapter leur style : il ne s\'agit plus de contrôler la présence mais d\'évaluer les résultats.',
            rubric: [
              { id: 'b1-li2-1', label: 'Identifies benefits mentioned (productivity, time saved)', points: 2 },
              { id: 'b1-li2-2', label: 'Identifies problems mentioned (work-life blur, social isolation)', points: 2 },
              { id: 'b1-li2-3', label: 'States the recommended balance (2-3 days/week)', points: 2 },
              { id: 'b1-li2-4', label: 'Notes the shift required of managers (results not presence)', points: 2 },
              { id: 'b1-li2-5', label: 'Identifies who particularly suffers from isolation (people living alone)', points: 1 }
            ]
          },
          {
            id: 'b1-li3',
            title: 'Task 3 — Documentaire — les réseaux sociaux chez les jeunes (8 points)',
            instruction: 'Vous allez entendre un extrait de documentaire. Écoutez attentivement et répondez aux questions d\'opinion et d\'inférence.',
            script: 'Aujourd\'hui, neuf jeunes Français sur dix utilisent au moins un réseau social quotidiennement. Cette réalité soulève des questions importantes sur l\'impact de ces plateformes sur le développement des adolescents. D\'un côté, les réseaux sociaux permettent aux jeunes de maintenir des liens avec leurs amis, de s\'informer et même de développer de nouvelles compétences créatives. Certains adolescents lancent des chaînes YouTube ou des comptes Instagram et apprennent ainsi la photographie, le montage vidéo ou la communication. Mais les spécialistes s\'inquiètent aussi des effets négatifs : la comparaison constante avec des images soigneusement filtrées peut nuire à l\'estime de soi. Une étude récente de l\'université de Bordeaux révèle que les filles de 13 à 16 ans sont particulièrement vulnérables à ces effets. Les parents se trouvent souvent démunis — interdire complètement les réseaux sociaux isole l\'enfant de ses pairs, mais les laisser totalement libres comporte des risques réels. La solution semble résider dans l\'éducation aux médias — apprendre aux jeunes à analyser de façon critique ce qu\'ils voient en ligne.',
            rubric: [
              { id: 'b1-li3-1', label: 'States the statistic (9 out of 10 young French people use social media daily)', points: 1 },
              { id: 'b1-li3-2', label: 'Identifies positive aspects (maintaining friendships, learning creative skills)', points: 2 },
              { id: 'b1-li3-3', label: 'Identifies the main negative (comparison with filtered images, self-esteem)', points: 2 },
              { id: 'b1-li3-4', label: 'Names the most vulnerable group (girls 13-16)', points: 1 },
              { id: 'b1-li3-5', label: 'States the recommended solution (media literacy education)', points: 1 },
              { id: 'b1-li3-6', label: 'Notes what happens if social media is banned entirely (social isolation from peers)', points: 1 }
            ]
          }
        ]
      },

      /* ── READING ──────────────────────────────────────────────── */
      {
        id: 'reading',
        icon: '📖',
        title: 'Compréhension des écrits',
        english: 'Reading Comprehension',
        duration: 2100,
        maxScore: 25,
        type: 'self',
        tasks: [
          {
            id: 'b1-re1',
            title: 'Task 1 — Article de magazine — le végétarisme en France (9 points)',
            instruction: 'Lisez cet article et répondez aux questions.',
            text: 'Le végétarisme gagne du terrain en France. Selon une enquête récente, 3 millions de Français se déclarent aujourd\'hui végétariens, soit le double d\'il y a dix ans. Ce changement s\'explique par plusieurs facteurs : les préoccupations environnementales, l\'accès croissant à l\'information sur les conditions d\'élevage industriel, et une prise de conscience des effets de la consommation de viande rouge sur la santé. Les restaurants s\'adaptent : là où il y avait autrefois une seule option végétarienne sur la carte, on trouve désormais des menus entiers dédiés. Les grandes surfaces ont également développé leur offre de produits végétaux. Pourtant, la transition n\'est pas toujours simple. De nombreux végétariens témoignent de difficultés lors de repas en famille ou entre amis, où la viande reste souvent centrale. \'Mon beau-père ne comprend toujours pas pourquoi je refuse son gigot d\'agneau du dimanche,\' raconte Lucie, 28 ans. Le débat sur l\'impact environnemental du végétarisme reste vif : si l\'élevage représente 14,5% des émissions mondiales de gaz à effet de serre selon la FAO, certains experts soulignent que l\'élevage extensif peut aussi jouer un rôle positif dans la gestion des écosystèmes locaux.',
            rubric: [
              { id: 'b1-re1-1', label: 'Identifies how many French vegetarians there are (3 million)', points: 1 },
              { id: 'b1-re1-2', label: 'Notes the comparison to 10 years ago (double)', points: 1 },
              { id: 'b1-re1-3', label: 'Lists reasons for the trend (environment, animal welfare info, health)', points: 3 },
              { id: 'b1-re1-4', label: 'Identifies a social difficulty mentioned (family meals)', points: 1 },
              { id: 'b1-re1-5', label: 'Notes the FAO statistic (14.5% of global greenhouse gas)', points: 2 },
              { id: 'b1-re1-6', label: 'Understands the nuance about livestock (can have positive ecosystem role)', points: 1 }
            ]
          },
          {
            id: 'b1-re2',
            title: 'Task 2 — Correspondance — échange d\'emails professionnel (8 points)',
            instruction: 'Lisez cet échange d\'e-mails et répondez aux questions.',
            text: 'E-mail 1 — De : Sophie Bonnet À : Thomas Faure\nMonsieur, Je me permets de vous contacter suite à votre candidature pour le poste de chargé de communication au sein de notre association. Votre profil nous a vivement intéressés, notamment votre expérience dans le secteur associatif et votre maîtrise des outils numériques. Je souhaiterais vous inviter à un entretien le mardi 18 mars à 14h30 dans nos locaux, situés au 12 rue des Acacias, Lyon 3e. Merci de bien vouloir confirmer votre disponibilité. Cordialement, Sophie Bonnet, Directrice RH.\n\nE-mail 2 — De : Thomas Faure À : Sophie Bonnet\nMadame, Je vous remercie vivement pour votre message et suis très heureux de l\'intérêt que vous portez à ma candidature. Je confirme ma disponibilité pour le mardi 18 mars à 14h30 et me ferai un plaisir de vous rencontrer à l\'adresse indiquée. Pourriez-vous me préciser s\'il est nécessaire d\'apporter des documents particuliers, tels que des lettres de recommandation ou un portfolio ? Dans l\'attente de vous rencontrer, je vous adresse mes cordiales salutations. Thomas Faure',
            rubric: [
              { id: 'b1-re2-1', label: 'Identifies the job (communications officer at an association)', points: 2 },
              { id: 'b1-re2-2', label: 'Notes what impressed the employer (associative sector experience, digital skills)', points: 2 },
              { id: 'b1-re2-3', label: 'States interview date and time (Tuesday 18 March 14:30)', points: 2 },
              { id: 'b1-re2-4', label: 'States the location (12 rue des Acacias Lyon 3e)', points: 1 },
              { id: 'b1-re2-5', label: 'Identifies what M. Faure asks about (whether to bring documents)', points: 1 }
            ]
          },
          {
            id: 'b1-re3',
            title: 'Task 3 — Article d\'opinion — faut-il réduire la semaine de travail à 4 jours ? (8 points)',
            instruction: 'Lisez cet article d\'opinion et identifiez les arguments pour et contre.',
            text: 'La semaine de quatre jours fait de plus en plus parler d\'elle. Plusieurs pays ont lancé des expérimentations à grande échelle : en Islande, une réduction du temps de travail sans baisse de salaire a été testée avec succès entre 2015 et 2019, avec des résultats encourageants sur le bien-être des salariés et — fait surprenant — sur la productivité. Au Royaume-Uni, une expérience similaire menée en 2022 a convaincu 92% des entreprises participantes de maintenir ce rythme définitivement. Les partisans de ce modèle font valoir que la qualité de vie s\'améliore, le stress diminue, et les employés reviennent au travail plus motivés. Certains avancent même des arguments environnementaux : moins de trajets domicile-travail signifie moins d\'émissions. Mais les critiques ne manquent pas. Dans les secteurs où la présence humaine est indispensable — hôpitaux, restaurants, commerce de détail — une semaine de quatre jours est difficile à mettre en œuvre sans engager du personnel supplémentaire. Les petites entreprises craignent d\'autre part de ne pas pouvoir absorber les coûts d\'une telle réorganisation. Et si la productivité augmente dans certains cas, rien ne garantit que ce soit universel.',
            rubric: [
              { id: 'b1-re3-1', label: 'Identifies countries that have trialled 4-day week (Iceland, UK)', points: 2 },
              { id: 'b1-re3-2', label: 'States the Icelandic result (positive for wellbeing AND productivity)', points: 1 },
              { id: 'b1-re3-3', label: 'Notes UK result (92% maintained the change)', points: 1 },
              { id: 'b1-re3-4', label: 'Lists arguments in favour (wellbeing, less stress, environment)', points: 2 },
              { id: 'b1-re3-5', label: 'Identifies sectors where it\'s difficult (hospitals, restaurants, retail)', points: 1 },
              { id: 'b1-re3-6', label: 'Notes small business concern (reorganisation costs)', points: 1 }
            ]
          }
        ]
      },

      /* ── WRITING ──────────────────────────────────────────────── */
      {
        id: 'writing',
        icon: '✏️',
        title: 'Production écrite',
        english: 'Written Expression',
        duration: 3000,
        maxScore: 25,
        type: 'writing',
        intro: 'This section has 2 tasks. Write your answers on paper or in a separate document. Aim for 160–180 words per task. Use the timer to simulate real exam conditions, then self-assess using the rubric provided.',
        tasks: [
          {
            id: 'b1-wr1',
            title: 'Task 1 — Lettre de lecteur — les transports en commun (12 points)',
            instruction: 'Vous avez lu un article dans un magazine local qui suggère de supprimer certaines lignes de bus pour réduire les dépenses municipales. Vous écrivez une lettre au rédacteur en chef pour exprimer votre opinion. Écrivez entre 160 et 180 mots.',
            rubric: [
              { id: 'b1-wr1-1', label: 'Formal register (Madame/Monsieur opening, Cordialement close)', points: 2 },
              { id: 'b1-wr1-2', label: 'States personal position clearly', points: 2 },
              { id: 'b1-wr1-3', label: 'Gives at least 2 arguments', points: 3 },
              { id: 'b1-wr1-4', label: 'Uses connectors (de plus, plutôt que, à une époque où)', points: 2 },
              { id: 'b1-wr1-5', label: 'Suggests an alternative', points: 1 },
              { id: 'b1-wr1-6', label: 'Within 160-180 words', points: 1 },
              { id: 'b1-wr1-7', label: 'Uses a range of vocabulary and B1+ structures', points: 1 }
            ],
            modelAnswer: `Madame, Monsieur,\n\nJ'ai lu avec beaucoup d'intérêt votre article sur la réduction des lignes de bus dans notre ville. Je souhaite vous faire part de mon désaccord avec cette proposition.\n\nEn tant qu'utilisatrice quotidienne des transports en commun, je peux témoigner de l'importance de ce service pour de nombreux habitants. Supprimer ces lignes aurait des conséquences graves, notamment pour les personnes âgées, les étudiants et ceux qui n'ont pas de voiture.\n\nDe plus, à une époque où nous cherchons tous à réduire notre empreinte carbone, encourager l'utilisation de la voiture individuelle semble aller à l'encontre des objectifs environnementaux que notre ville s'est fixés.\n\nPlutôt que de supprimer des lignes, ne serait-il pas préférable de chercher des financements alternatifs ou d'optimiser les horaires existants ? Je suis convaincue qu'une solution plus équilibrée est possible.\n\nCordialement,\nUne lectrice engagée`
          },
          {
            id: 'b1-wr2',
            title: 'Task 2 — Article pour un magazine scolaire (13 points)',
            instruction: 'Le magazine de votre école vous demande d\'écrire un article sur le sujet suivant : \'Les voyages à l\'étranger : une expérience indispensable pour les jeunes ?\' Donnez votre opinion en vous appuyant sur des exemples. Écrivez entre 160 et 180 mots.',
            rubric: [
              { id: 'b1-wr2-1', label: 'Has a title', points: 1 },
              { id: 'b1-wr2-2', label: 'Balanced structure (for + nuance + conclusion)', points: 3 },
              { id: 'b1-wr2-3', label: 'Uses personal example', points: 2 },
              { id: 'b1-wr2-4', label: 'Uses B1 connectors (cependant, en effet, en conclusion)', points: 2 },
              { id: 'b1-wr2-5', label: 'Uses conditional (il serait réducteur)', points: 2 },
              { id: 'b1-wr2-6', label: 'Gives concrete counter-argument', points: 2 },
              { id: 'b1-wr2-7', label: 'Within 160-180 words', points: 1 }
            ],
            modelAnswer: `Les voyages à l'étranger : une expérience indispensable ?\n\nNombreux sont ceux qui affirment que voyager est la meilleure école de la vie. En effet, partir à l'étranger permet de découvrir d'autres cultures, d'améliorer ses compétences linguistiques et de développer son autonomie. Personnellement, mon séjour linguistique en Espagne l'année dernière m'a aidé à gagner en confiance et à voir le monde différemment.\n\nCependant, il serait réducteur de dire que le voyage est indispensable pour tous les jeunes. Certains n'ont pas la chance d'avoir les moyens financiers nécessaires, et il existe de nombreuses façons de s'ouvrir au monde sans quitter son pays : les échanges virtuels, les films étrangers, ou même la rencontre avec des personnes d'autres origines dans sa propre ville.\n\nEn conclusion, si les voyages sont une expérience enrichissante, ils ne doivent pas devenir un critère d'exclusion. Ce qui compte, c'est la curiosité et l'ouverture d'esprit.\n\n— Marie-Claire, Terminale B`
          }
        ]
      },

      /* ── SPEAKING ─────────────────────────────────────────────── */
      {
        id: 'speaking',
        icon: '🗣️',
        title: 'Production orale',
        english: 'Oral Expression',
        duration: 720,
        prepDuration: 600,
        maxScore: 25,
        type: 'speaking',
        intro: 'This section has 2 tasks. You have 10 minutes to prepare your monologue (Task 1). Carry out each task out loud — with a partner if possible — then self-assess honestly using the rubric.',
        tasks: [
          {
            id: 'b1-sp1',
            title: 'Task 1 — Monologue — document sur le bénévolat (12 points)',
            instruction: 'Vous disposez de 10 minutes pour préparer un exposé à partir du document suivant. Vous présenterez le document (2-3 minutes), puis donnerez votre opinion personnelle et répondrez aux questions de l\'examinateur.',
            document: 'En France, 22 millions de personnes font du bénévolat dans des associations. Le nombre de bénévoles a augmenté de 12% depuis la crise sanitaire de 2020. Les secteurs les plus représentés sont le sport (34%), la culture (18%), et l\'action sociale (15%). Les jeunes de 15-25 ans représentent désormais 28% des bénévoles — une proportion en hausse constante. Cependant, 60% des associations déclarent manquer de bénévoles qualifiés pour gérer l\'administration et la communication numérique.',
            rubric: [
              { id: 'b1-sp1-1', label: 'Presents key figures accurately (22 million, 12% increase, sectors)', points: 2 },
              { id: 'b1-sp1-2', label: 'Goes beyond description to analyse or interpret', points: 2 },
              { id: 'b1-sp1-3', label: 'Gives personal opinion with justification', points: 2 },
              { id: 'b1-sp1-4', label: 'Uses appropriate vocabulary (bénévolat, association, secteur)', points: 2 },
              { id: 'b1-sp1-5', label: 'Uses B1 structures (conditional, comparatives, opinion phrases)', points: 2 },
              { id: 'b1-sp1-6', label: 'Responds to follow-up questions with developed answers', points: 1 },
              { id: 'b1-sp1-7', label: 'Pronunciation generally clear despite occasional errors', points: 1 }
            ]
          },
          {
            id: 'b1-sp2',
            title: 'Task 2 — Discussion — les loisirs et les écrans (13 points)',
            instruction: 'L\'examinateur vous propose de discuter du sujet suivant : \'Les jeunes passent trop de temps devant les écrans. Les loisirs traditionnels (lecture, sport, musique) sont-ils en danger ?\' Exprimez et défendez votre point de vue.',
            modelDialogue: `Examinateur : Pensez-vous que les jeunes passent trop de temps devant les écrans ?\nCandidat : Oui, je pense que c'est un vrai problème, mais il faut nuancer. Les écrans ne sont pas tous pareils — passer deux heures à lire des articles en ligne, c'est différent de défiler sur TikTok pendant deux heures. Ce qui m'inquiète davantage, c'est la perte de concentration que cela peut entraîner.\nExaminateur : Et les loisirs traditionnels, sont-ils vraiment en danger ?\nCandidat : Peut-être pas en danger total, mais certainement moins pratiqués. Dans mon entourage, beaucoup de gens ne lisent plus de livres physiques. En revanche, des activités comme le sport ou la musique semblent résister — peut-être parce qu'elles procurent des satisfactions que les écrans ne peuvent pas reproduire.\nExaminateur : Que faudrait-il faire selon vous ?\nCandidat : Il me semble qu'une éducation aux médias dès le jeune âge serait essentielle. Apprendre à utiliser les outils numériques de façon critique, plutôt que de les interdire, serait plus efficace. Les parents ont aussi un rôle à jouer en proposant des alternatives attractives.`,
            rubric: [
              { id: 'b1-sp2-1', label: 'Expresses and justifies opinion', points: 2 },
              { id: 'b1-sp2-2', label: 'Uses nuance (il faut nuancer, en revanche)', points: 2 },
              { id: 'b1-sp2-3', label: 'Uses B1 vocabulary (entraîner, procurer, résister)', points: 2 },
              { id: 'b1-sp2-4', label: 'Responds to follow-up questions with developed answers', points: 3 },
              { id: 'b1-sp2-5', label: 'Uses conditional (serait)', points: 2 },
              { id: 'b1-sp2-6', label: 'Demonstrates B1 grammar range', points: 1 },
              { id: 'b1-sp2-7', label: 'Interaction is fluent with minor hesitations', points: 1 }
            ]
          }
        ]
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
     DELF A2 — MOCK EXAM 1
     100 pts total · pass mark 50/100 · minimum 5/25 per section
  ═══════════════════════════════════════════════════════════════ */
  {
    id: 'delf-a2-1',
    level: 'A2',
    title: 'DELF A2 — Mock Exam 1',
    desc: 'Simulates a complete DELF A2 exam with longer texts and richer language. Pass mark: 50/100 with a minimum of 5/25 in each section.',
    totalDuration: '1h 45min',
    sections: [

      /* ── LISTENING ────────────────────────────────────────────── */
      {
        id: 'listening',
        icon: '🎧',
        title: "Compréhension de l'oral",
        english: 'Listening Comprehension',
        duration: 1500,
        maxScore: 25,
        type: 'auto',
        audioNote: 'In the real DELF A2, recordings are played twice. Read the transcripts carefully and answer as you would in the exam.',
        exercises: [
          {
            id: 'a2-l-ex1',
            title: 'Exercise 1 — Five short recordings (10 points)',
            instruction: 'You hear 5 short recordings. Choose the correct answer for each.',
            questions: [
              {
                transcript: '[Phone message] "Bonjour Lucie, c\'est Camille. Je t\'appelle pour te proposer de venir à mon anniversaire samedi prochain. On se retrouve chez moi à dix-neuf heures. Tu peux apporter quelque chose à manger si tu veux! Rappelle-moi pour confirmer, bises!"',
                q: 'What is the purpose of Camille\'s message?',
                opts: ['To cancel her birthday party', 'To invite Lucie to her birthday', 'To ask Lucie to organise a party', 'To confirm Lucie\'s attendance'],
                ans: 1
              },
              {
                transcript: '[Answering machine] "Vous avez appelé le cabinet du Dr Rousseau. Notre cabinet est ouvert du lundi au vendredi de huit heures trente à dix-huit heures trente. Pour un rendez-vous urgent, composez le quinze. Pour laisser un message, restez en ligne."',
                q: 'What should you do in a medical emergency according to this message?',
                opts: ['Stay on the line', 'Call the doctor\'s mobile', 'Dial 15', 'Call back during opening hours'],
                ans: 2
              },
              {
                transcript: '[Radio advert] "Profitez de nos soldes d\'été! Du premier au trente et un juillet, jusqu\'à cinquante pour cent de réduction sur toute la collection printemps-été. Ouvert sept jours sur sept de dix heures à vingt heures. Boutiques Mode & Style, dans tous les centres commerciaux de la région."',
                q: 'What discount is offered during the sale?',
                opts: ['Up to 30% off', 'Up to 40% off', 'Up to 50% off', 'Up to 70% off'],
                ans: 2
              },
              {
                transcript: '[Station announcement] "Mesdames et messieurs, le TGV six mille vingt-trois à destination de Paris-Montparnasse, prévu à quatorze heures cinquante-cinq, est retardé en raison de travaux sur la voie. Nouveau départ estimé à quinze heures quarante."',
                q: 'What is the revised departure time?',
                opts: ['14h55', '15h10', '15h40', '16h00'],
                ans: 2
              },
              {
                transcript: '[Radio news] "Le nouveau musée des Sciences et de l\'Innovation de Grenoble ouvrira ses portes au public le quinze septembre prochain. Ce musée ultramoderne accueillera des expositions permanentes et temporaires, des ateliers pour les enfants et une cafétéria panoramique avec vue sur les Alpes."',
                q: 'When will the new museum open to the public?',
                opts: ['15th July', '15th August', '15th September', '15th October'],
                ans: 2
              }
            ]
          },
          {
            id: 'a2-l-ex2',
            title: 'Exercise 2 — Radio feature about a city (7 points)',
            instruction: 'Listen to the radio feature about Strasbourg. Answer the seven questions.',
            questions: [
              {
                transcript: '[Radio feature]\n"Aujourd\'hui, nous vous emmenons à Strasbourg, la capitale de l\'Alsace. Cette ville d\'environ deux cent quatre-vingt mille habitants est connue pour son architecture unique, mélange d\'influences françaises et allemandes, et pour être le siège du Parlement européen.\n\nLe quartier de la Petite France, avec ses maisons à colombages du XVIe siècle bordant les canaux, est le plus visité de la ville. La cathédrale Notre-Dame impressionne les visiteurs avec son horloge astronomique spectaculaire.\n\nPour les gourmands, Strasbourg est célèbre pour la choucroute garnie et les flammekueches. Enfin, le marché de Noël, le plus ancien de France avec plus de cinq cents ans d\'histoire, attire chaque année plus de deux millions de visiteurs du monde entier."',
                q: 'In which French region is Strasbourg?',
                opts: ['Normandy', 'Alsace', 'Brittany', 'Burgundy'],
                ans: 1
              },
              { transcript: null, q: 'Which European institution is based in Strasbourg?', opts: ['European Court of Justice', 'European Central Bank', 'European Parliament', 'Council of Europe'], ans: 2 },
              { transcript: null, q: 'What is the Petite France known for?', opts: ['Its modern architecture', 'Its 16th-century half-timbered houses', 'Its Roman ruins', 'Its contemporary art gallery'], ans: 1 },
              { transcript: null, q: 'What is impressive about the cathedral?', opts: ['Its enormous size', 'Its beautiful garden', 'Its astronomical clock', 'Its art collection'], ans: 2 },
              { transcript: null, q: 'What is a flammekueche?', opts: ['A local wine', 'A type of beer', 'A traditional dish', 'A local cheese'], ans: 2 },
              { transcript: null, q: 'How long has the Christmas market been running?', opts: ['Over 100 years', 'Over 200 years', 'Over 300 years', 'Over 500 years'], ans: 3 },
              { transcript: null, q: 'How many visitors does the Christmas market attract each year?', opts: ['More than 500,000', 'More than 1 million', 'More than 2 million', 'More than 5 million'], ans: 2 }
            ]
          },
          {
            id: 'a2-l-ex3',
            title: 'Exercise 3 — Conversation between two friends (8 points)',
            instruction: 'Listen to the conversation between Marc and Julie. Answer all eight questions.',
            questions: [
              {
                transcript: '[Conversation]\nMarc: Alors Julie, tu as trouvé un appartement pour ta nouvelle ville ?\nJulie: Oui ! J\'en ai trouvé un la semaine dernière. C\'est au troisième étage avec ascenseur — deux chambres et un petit balcon.\nMarc: C\'est loin du centre ?\nJulie: Non, à quinze minutes à pied. Et il y a une station de métro juste à côté.\nMarc: C\'est combien le loyer ?\nJulie: Sept cent quatre-vingts euros par mois, charges comprises. Le quartier est calme et sympa.\nMarc: Tu commences le travail quand ?\nJulie: Le trois septembre. J\'ai encore trois semaines pour tout organiser. Le déménagement est prévu pour le vingt-huit août.\nMarc: Tu as besoin d\'aide ?\nJulie: Oui, si tu es libre le vingt-huit, ce serait super. Je t\'offre le dîner en échange !\nMarc: Marché conclu !',
                q: 'On which floor is Julie\'s new apartment?',
                opts: ['First floor', 'Second floor', 'Third floor', 'Fourth floor'],
                ans: 2
              },
              { transcript: null, q: 'What outdoor space does the apartment have?', opts: ['A garden', 'A terrace', 'A balcony', 'A courtyard'], ans: 2 },
              { transcript: null, q: 'How far is the apartment from the city centre?', opts: ['5 minutes on foot', '10 minutes on foot', '15 minutes on foot', '20 minutes on foot'], ans: 2 },
              { transcript: null, q: 'What is included in the monthly rent?', opts: ['Furniture', 'Service charges', 'Electricity bills', 'Internet'], ans: 1 },
              { transcript: null, q: 'What is Julie\'s monthly rent?', opts: ['€680', '€750', '€780', '€850'], ans: 2 },
              { transcript: null, q: 'When does Julie start her new job?', opts: ['28th August', '1st September', '3rd September', '15th September'], ans: 2 },
              { transcript: null, q: 'When is the planned moving date?', opts: ['21st August', '28th August', '3rd September', '10th September'], ans: 1 },
              { transcript: null, q: 'What does Julie offer Marc in return for helping?', opts: ['Money', 'A bottle of wine', 'Dinner', 'Concert tickets'], ans: 2 }
            ]
          }
        ]
      },

      /* ── READING ──────────────────────────────────────────────── */
      {
        id: 'reading',
        icon: '📖',
        title: 'Compréhension des écrits',
        english: 'Reading Comprehension',
        duration: 1800,
        maxScore: 25,
        type: 'auto',
        exercises: [
          {
            id: 'a2-r-ex1',
            title: 'Exercise 1 — Online forum about travel tips (5 points)',
            instruction: 'Read the forum messages about visiting Paris. Answer the five questions.',
            questions: [
              {
                text: 'FORUM VOYAGE — Conseils pour visiter Paris en 3 jours\n\nAnne: Achetez la carte Navigo semaine pour les transports. C\'est beaucoup moins cher que les tickets à l\'unité et vous pouvez prendre le métro, le bus et le RER autant que vous voulez.\n\nLuc: Attention aux pickpockets sur les sites touristiques, surtout à la Tour Eiffel et au Louvre ! Gardez vos affaires devant vous.\n\nSophie: Pour éviter les queues, réservez vos billets de musée en ligne à l\'avance. Le Louvre peut avoir 2 à 3 heures d\'attente en haute saison.\n\nPierre: Je recommande de se promener dans le Marais le dimanche matin — les boutiques sont ouvertes et c\'est animé mais sans trop de monde.\n\nMartine: N\'oubliez pas de visiter les marchés locaux comme le marché d\'Aligre ou le marché des Enfants Rouges. C\'est moins touristique et très authentique.',
                q: 'What does Anne recommend for getting around Paris?',
                opts: ['Buying single tickets', 'Renting a bicycle', 'Buying a weekly Navigo card', 'Using taxis'],
                ans: 2
              },
              { text: null, q: 'What does Luc warn tourists about?', opts: ['High entrance fees', 'Pickpockets at tourist sites', 'Closed museums on Mondays', 'Traffic in the city'], ans: 1 },
              { text: null, q: 'According to Sophie, why should you book museum tickets in advance?', opts: ['To get a discount', 'To avoid long queues', 'To reserve a time slot', 'Because they sell out quickly'], ans: 1 },
              { text: null, q: 'When does Pierre recommend visiting the Marais?', opts: ['Friday evening', 'Saturday afternoon', 'Sunday morning', 'Monday morning'], ans: 2 },
              { text: null, q: 'What does Martine say about local markets?', opts: ['They are very expensive', 'They are less touristy and very authentic', 'They are only open at weekends', 'They only sell French produce'], ans: 1 }
            ]
          },
          {
            id: 'a2-r-ex2',
            title: 'Exercise 2 — Magazine article about carpooling (8 points)',
            instruction: 'Read the article from a lifestyle magazine. Answer all eight questions.',
            questions: [
              {
                text: 'LE COVOITURAGE, UNE SOLUTION DURABLE\n\nLe covoiturage connaît un essor important en France. Des millions de Français utilisent désormais des plateformes comme BlaBlaCar pour partager leurs trajets et réduire leurs dépenses.\n\nLes avantages sont nombreux. D\'abord, c\'est économique : les utilisateurs économisent en moyenne 40 % sur leurs frais de transport. Ensuite, c\'est écologique : partager un véhicule réduit les émissions de CO₂. Enfin, c\'est social : de nombreux utilisateurs disent avoir noué des amitiés lors de leurs trajets.\n\nCependant, certains inconvénients existent. Il faut s\'adapter aux horaires des autres passagers et parfois faire des détours. De plus, la confiance entre inconnus peut être un frein.\n\nMalgré tout, le covoiturage continue de se développer. Le gouvernement français encourage cette pratique en offrant des aides financières aux conducteurs qui covoiturent régulièrement sur certains trajets domicile-travail.',
                q: 'What is the main topic of the article?',
                opts: ['Public transport in France', 'Carpooling in France', 'Electric cars in France', 'Cycling in France'],
                ans: 1
              },
              { text: null, q: 'What is BlaBlaCar?', opts: ['A car hire company', 'A taxi service', 'A carpooling platform', 'A train booking website'], ans: 2 },
              { text: null, q: 'On average, how much do users save on transport costs?', opts: ['20%', '30%', '40%', '50%'], ans: 2 },
              { text: null, q: 'What is one environmental benefit mentioned?', opts: ['Fewer roads needed', 'Reduced CO₂ emissions', 'Less noise pollution', 'Fewer car parks built'], ans: 1 },
              { text: null, q: 'What is one social benefit mentioned?', opts: ['Meeting new colleagues', 'Making friends during trips', 'Earning extra money', 'Learning new languages'], ans: 1 },
              { text: null, q: 'What is one disadvantage mentioned?', opts: ['It is more expensive than the train', 'You have to adapt to others\' schedules', 'The cars are often uncomfortable', 'There are few cars available'], ans: 1 },
              { text: null, q: 'What does the French government do to encourage carpooling?', opts: ['Build new motorways', 'Offer financial incentives to drivers', 'Make it compulsory for companies', 'Provide free parking'], ans: 1 },
              { text: null, q: 'In the article, what factor can deter people from carpooling?', opts: ['The high price', 'Long distances', 'Trust between strangers', 'Lack of insurance'], ans: 2 }
            ]
          },
          {
            id: 'a2-r-ex3',
            title: 'Exercise 3 — Cultural programme (5 points)',
            instruction: 'Read the cultural events programme. Answer the five questions.',
            questions: [
              {
                text: 'MAISON DE LA CULTURE — PROGRAMME AVRIL\n\nMARDI 5 AVRIL, 20h30\nConcert de jazz — Quartet "Les Nuages"\nBillets : 18 € (tarif réduit : 12 € sur présentation carte étudiant ou senior)\n\nSAMEDI 9 AVRIL, 15h00\nAtelier poterie — Places limitées à 10 participants\nInscription obligatoire avant le 6 avril · Tarif : 25 € matériaux inclus\n\nDU 12 AU 24 AVRIL\nExposition photo "La France d\'antan" — 80 photos en noir et blanc\nEntrée libre · Ouvert tous les jours 10h–18h30\n\nVENDREDI 22 AVRIL, 19h00\nConférence : "L\'avenir du cinéma français"\nEntrée libre sur réservation uniquement · Tél : 03 89 45 67 89',
                q: 'What is the reduced price for the jazz concert?',
                opts: ['€10 for all students', '€12 with a student or senior card', '€15 for under-18s', 'Free for children'],
                ans: 1
              },
              { text: null, q: 'By when must you register for the pottery workshop?', opts: ['Before 5th April', 'Before 6th April', 'Before 9th April', 'Before 12th April'], ans: 1 },
              { text: null, q: 'What is included in the pottery workshop fee?', opts: ['A finished piece', 'Materials', 'Transport', 'A meal'], ans: 1 },
              { text: null, q: 'How much does it cost to see the photography exhibition?', opts: ['€5', '€10', '€15', 'Free'], ans: 3 },
              { text: null, q: 'How do you attend the 22nd April conference?', opts: ['Buy a ticket on the day', 'Reserve in advance — free entry', 'Pay €5 at the door', 'Apply online one week in advance'], ans: 1 }
            ]
          },
          {
            id: 'a2-r-ex4',
            title: 'Exercise 4 — Email exchange (7 points)',
            instruction: 'Read the emails between a job candidate and a company. Answer all seven questions.',
            questions: [
              {
                text: 'DE : rh@techplus.fr\nÀ : clara.martin@email.fr\nOBJET : Candidature — poste d\'assistant(e) marketing\n\nChère Mme Martin,\n\nNous avons bien reçu votre candidature pour le poste d\'assistant(e) marketing et avons le plaisir de vous inviter à un entretien dans nos locaux.\n\nL\'entretien aura lieu le jeudi 14 avril à 10h30. Nos bureaux se trouvent au 45 avenue des Entrepreneurs, au 2ème étage. Nous vous conseillons d\'arriver dix minutes à l\'avance.\n\nMerci de confirmer votre présence par email avant le 10 avril.\n\nCordialement,\nMme Leblanc, Responsable RH — TechPlus\n\n───────────────────\n\nDE : clara.martin@email.fr\nÀ : rh@techplus.fr\n\nChère Madame Leblanc,\n\nJe vous remercie pour votre invitation et confirme ma présence à l\'entretien du jeudi 14 avril à 10h30.\n\nPourriez-vous me préciser si je dois apporter des documents particuliers ?\n\nDans l\'attente de vous rencontrer,\nCordialement, Clara Martin',
                q: 'Why is TechPlus contacting Clara Martin?',
                opts: ['To reject her application', 'To invite her for a job interview', 'To offer her the job directly', 'To ask for more documents'],
                ans: 1
              },
              { text: null, q: 'On what day is the interview?', opts: ['Tuesday 12th April', 'Wednesday 13th April', 'Thursday 14th April', 'Friday 15th April'], ans: 2 },
              { text: null, q: 'What time should Clara aim to arrive?', opts: ['10h20', '10h30', '10h35', '10h40'], ans: 0 },
              { text: null, q: 'On which floor are the offices?', opts: ['Ground floor', 'First floor', 'Second floor', 'Third floor'], ans: 2 },
              { text: null, q: 'By when must Clara confirm her attendance?', opts: ['10th April', '12th April', '14th April', '16th April'], ans: 0 },
              { text: null, q: 'What does Clara ask in her reply?', opts: ['For directions to the office', 'Whether she should bring specific documents', 'The interviewer\'s name', 'The salary on offer'], ans: 1 },
              { text: null, q: 'What job is Clara applying for?', opts: ['HR assistant', 'Marketing assistant', 'Communications manager', 'Sales assistant'], ans: 1 }
            ]
          }
        ]
      },

      /* ── WRITING ──────────────────────────────────────────────── */
      {
        id: 'writing',
        icon: '✏️',
        title: 'Production écrite',
        english: 'Written Expression',
        duration: 2700,
        maxScore: 25,
        type: 'writing',
        intro: 'This section has 2 tasks. Write your answers on paper or in a separate document. Use the timer to simulate real exam conditions.',
        tasks: [
          {
            id: 'a2-w1',
            title: 'Task 1 — Describing an event (10 points)',
            instruction: 'Write 60–80 words in French. You went to a birthday party last weekend. Describe the event to a French friend: where it was, who was there, what you did, and whether you enjoyed yourself.',
            hint: 'Use the passé composé. Try to use: aller, être, manger, danser, s\'amuser, rencontrer, rire.',
            rubric: [
              { id: 'a2-w1-1', label: 'I described where the party was held', points: 1 },
              { id: 'a2-w1-2', label: 'I mentioned who was there', points: 1 },
              { id: 'a2-w1-3', label: 'I described at least two activities that took place', points: 3 },
              { id: 'a2-w1-4', label: 'I expressed my opinion about the party', points: 2 },
              { id: 'a2-w1-5', label: 'I used the passé composé correctly at least twice', points: 1 },
              { id: 'a2-w1-6', label: 'My vocabulary was appropriate and mostly accurate', points: 1 },
              { id: 'a2-w1-7', label: 'My text was approximately 60–80 words', points: 1 }
            ],
            modelAnswer: `Chère Sophie,\n\nSamedi dernier, je suis allée à la fête d'anniversaire de mon amie Claire. C'était chez elle, dans son appartement à Paris. Il y avait une vingtaine de personnes. Nous avons dansé, mangé un gâteau délicieux et ri toute la soirée ! J'ai rencontré des gens très sympas et l'ambiance était vraiment festive. Je me suis très bien amusée !\n\nBisous, Léa`
          },
          {
            id: 'a2-w2',
            title: 'Task 2 — Formal complaint letter (15 points)',
            instruction: 'Write a letter or email of 60–80 words in French. You recently stayed at a hotel and were unhappy with some aspects. Write to the hotel manager to describe your experience and request a partial refund.',
            hint: 'Structure: Opening (Madame, Monsieur,) → When you stayed and what was wrong → Request a partial refund → Closing (Cordialement — or for a more formal register: Veuillez agréer mes cordiales salutations.)',
            rubric: [
              { id: 'a2-w2-1', label: 'I used an appropriate formal letter format (opening and closing)', points: 2 },
              { id: 'a2-w2-2', label: 'I clearly stated when and where I stayed', points: 2 },
              { id: 'a2-w2-3', label: 'I described at least two problems with the stay', points: 4 },
              { id: 'a2-w2-4', label: 'I made a clear, polite request for a refund', points: 3 },
              { id: 'a2-w2-5', label: 'I used appropriate formal vocabulary', points: 2 },
              { id: 'a2-w2-6', label: 'My sentences were grammatically mostly correct', points: 2 }
            ],
            modelAnswer: `Madame, Monsieur,\n\nJe vous écris au sujet de mon séjour dans votre hôtel du 5 au 8 septembre. J'avais réservé une chambre double avec vue sur la mer, mais on m'a attribué une chambre au rez-de-chaussée avec vue sur le parking. De plus, la climatisation ne fonctionnait pas et la salle de bain n'était pas propre à mon arrivée.\n\nJe vous demande donc un remboursement partiel de ma réservation.\n\nVeuillez agréer, Madame, Monsieur, mes cordiales salutations.\n\nMme Martin`
          }
        ]
      },

      /* ── SPEAKING ─────────────────────────────────────────────── */
      {
        id: 'speaking',
        icon: '🗣️',
        title: 'Production orale',
        english: 'Oral Expression',
        duration: 600,
        prepDuration: 600,
        maxScore: 25,
        type: 'speaking',
        intro: 'Practise each part out loud. You have 10 minutes to prepare and 10 minutes for the full interaction. Self-assess honestly at the end.',
        tasks: [
          {
            id: 'a2-sp1',
            title: 'Part 1 — Monologue (5 points)',
            instruction: 'Prepare a 2–3 minute monologue on a topic from your daily life. Choose one of these suggestions:',
            prompts: [
              'Your job or studies — what you do and what you enjoy about it',
              'A typical day in your life',
              'Your hometown or the place where you live',
              'A sport or hobby you enjoy and why',
              'A recent trip or holiday',
              'Your family and friends'
            ],
            rubric: [
              { id: 'a2-sp1-1', label: 'I spoke for approximately 2–3 minutes with few long pauses', points: 2 },
              { id: 'a2-sp1-2', label: 'I gave specific details, examples or reasons to develop my topic beyond a list of facts', points: 2 },
              { id: 'a2-sp1-3', label: 'My pronunciation allowed the listener to follow me throughout without difficulty', points: 1 }
            ]
          },
          {
            id: 'a2-sp2',
            title: 'Part 2 — Photo description (5 points)',
            instruction: 'Describe what you see in the image below. Speak for about 1–2 minutes.',
            image: 'img-delf-a2-sp2.svg',
            guidingQuestions: [
              'Qu\'est-ce que vous voyez sur cette photo ?',
              'Où se passe la scène, d\'après vous ?',
              'Décrivez les personnes : que font-elles ?',
              'Quelle est l\'ambiance de cette photo ?',
              'Est-ce que vous aimez ce genre d\'endroit ? Pourquoi ?'
            ],
            rubric: [
              { id: 'a2-sp2-1', label: 'I described the scene in detail using a variety of nouns, adjectives and verbs', points: 2 },
              { id: 'a2-sp2-2', label: 'I speculated about the context or inferred what is happening ("d\'après moi…", "il me semble que…")', points: 2 },
              { id: 'a2-sp2-3', label: 'I gave a personal opinion or reaction with a supporting reason', points: 1 }
            ]
          },
          {
            id: 'a2-sp3',
            title: 'Part 3 — Guided interaction (10 points)',
            instruction: 'The examiner asks questions about your monologue topic and everyday life. Practise answering these example questions:',
            prompts: [
              'Parlez-moi de vos loisirs préférés et dites-moi pourquoi vous les aimez.',
              'Comment vous déplacez-vous au quotidien ? Vous préférez les transports en commun ou la voiture ?',
              'Qu\'est-ce que vous faites le week-end en général ?',
              'Parlez-moi d\'un voyage que vous avez fait récemment.',
              'Quelle est votre saison préférée et pourquoi ?',
              'Vous avez déjà habité dans un autre pays ? Comment était l\'expérience ?'
            ],
            rubric: [
              { id: 'a2-sp3-1', label: 'I responded with detailed, relevant answers of more than one sentence each', points: 4 },
              { id: 'a2-sp3-2', label: 'I kept the conversation going by asking follow-up questions or making comments', points: 3 },
              { id: 'a2-sp3-3', label: 'I used past tenses (passé composé / imparfait) and future or conditional forms appropriately', points: 3 }
            ]
          },
          {
            id: 'a2-sp4',
            title: 'Part 4 — Role-play (5 points)',
            instruction: 'Carry out this role-play with a partner (or practise alone). You play the student caller.',
            scenario: 'You want to enrol in a French evening class. Call the language school to: find out what levels are available, ask about the schedule (days and times), ask about the price per term, ask if there is a trial class, and enrol in the class that suits you best.',
            role: 'Student/Caller',
            partnerRole: 'School receptionist',
            usefulPhrases: [
              'Je voudrais m\'inscrire à un cours de français.',
              'Quels niveaux est-ce que vous proposez ?',
              'Le cours a lieu quels jours / à quelle heure ?',
              'Quel est le tarif pour un trimestre ?',
              'Est-ce qu\'il est possible d\'essayer un cours avant de s\'inscrire ?',
              'Je voudrais m\'inscrire au niveau ___.'
            ],
            rubric: [
              { id: 'a2-sp4-1', label: 'I enquired clearly about levels and the schedule', points: 2 },
              { id: 'a2-sp4-2', label: 'I asked about the price and trial class', points: 1 },
              { id: 'a2-sp4-3', label: 'I successfully completed the enrolment request', points: 1 },
              { id: 'a2-sp4-4', label: 'I used polite and appropriate French throughout', points: 1 }
            ],
            modelDialogue: `Réceptionniste : École de langues Lumière, bonjour !\nÉtudiant : Bonjour ! Je voudrais m'inscrire à un cours de français, s'il vous plaît.\nRéceptionniste : Bien sûr. Quel niveau souhaitez-vous ?\nÉtudiant : Quels niveaux est-ce que vous proposez ?\nRéceptionniste : Nous avons des cours du niveau A1 au B2.\nÉtudiant : Le cours a lieu quels jours ? Et à quelle heure ?\nRéceptionniste : Les cours ont lieu le mardi et le jeudi soir, de 19h à 21h.\nÉtudiant : Quel est le tarif pour un trimestre ?\nRéceptionniste : C'est 350 euros par trimestre, matériel inclus.\nÉtudiant : Est-ce qu'il est possible d'essayer un cours avant de m'inscrire ?\nRéceptionniste : Oui, le premier cours est gratuit !\nÉtudiant : Parfait. Je voudrais m'inscrire au niveau A2, s'il vous plaît.\nRéceptionniste : Très bien, je note votre inscription. Votre nom ?\nÉtudiant : [Your name]. Merci beaucoup !\nRéceptionniste : À bientôt !`
          }
        ]
      }
    ]
  }
];
