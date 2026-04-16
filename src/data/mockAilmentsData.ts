export interface MockAilment {
  slug: string
  name: string
  description: string
  causes: string[]
  symptoms: string[]
  prevention: string[]
  remedies: MockRemedy[]
}

export interface MockRemedy {
  id: number
  title: string
  author: string
  description: string
  likes: number
  verifiedBy: string[] // array of doctor IDs
  userContributed: boolean
  steps: string[]
}

const mockAilmentsData: Record<string, MockAilment> = {
  acne: {
    slug: "acne",
    name: "Acne",
    description:
      "Acne is a common skin condition that occurs when hair follicles become clogged with dead skin cells and sebum. It typically appears on the face, chest, and back.",
    causes: [
      "Excess sebum production",
      "Bacterial growth (Propionibacterium acnes)",
      "Clogged pores",
      "Hormonal changes",
      "Certain medications",
      "Poor skincare habits",
    ],
    symptoms: ["Pimples", "Blackheads", "Whiteheads", "Cysts", "Redness", "Inflammation"],
    prevention: [
      "Keep skin clean and dry",
      "Use non-comedogenic products",
      "Avoid touching your face",
      "Manage stress levels",
      "Maintain a healthy diet",
      "Get adequate sleep",
    ],
    remedies: [
      {
        id: 101,
        title: "Tea Tree Oil Treatment",
        author: "Dr. Sarah Johnson",
        description:
          "Apply diluted tea tree oil directly to affected areas. Tea tree oil has antibacterial properties that help reduce acne-causing bacteria.",
        likes: 342,
        verifiedBy: ["doc_001", "doc_002", "doc_003"],
        userContributed: false,
        steps: [
          "Dilute tea tree oil with a carrier oil (1:9 ratio)",
          "Apply directly to affected areas using a cotton swab",
          "Leave on for 20 minutes, then rinse gently",
        ],
      },
      {
        id: 102,
        title: "Honey and Cinnamon Mask",
        author: "Emma Wilson",
        description:
          "Mix raw honey with cinnamon powder and apply as a face mask for 15 minutes. Both ingredients have antimicrobial properties.",
        likes: 289,
        verifiedBy: ["doc_001"],
        userContributed: true,
        steps: [
          "Mix 2 tablespoons of raw honey with 1 teaspoon of cinnamon",
          "Apply evenly to clean skin as a mask",
          "Leave for 15 minutes and rinse with warm water",
        ],
      },
      {
        id: 103,
        title: "Aloe Vera Gel Application",
        author: "Dr. Michael Chen",
        description:
          "Apply fresh aloe vera gel to reduce inflammation and promote healing of acne scars.",
        likes: 156,
        verifiedBy: ["doc_002", "doc_003", "doc_004", "doc_005"],
        userContributed: false,
        steps: [
          "Extract fresh gel from an aloe vera leaf",
          "Apply a thin layer to affected areas",
          "Leave overnight and rinse in the morning",
        ],
      },
    ],
  },
  "acid-reflux": {
    slug: "acid-reflux",
    name: "Acid Reflux",
    description:
      "Acid reflux (GERD) occurs when stomach acid flows back into the esophagus, causing heartburn and discomfort. Chronic acid reflux can damage the esophageal lining.",
    causes: [
      "Weakened lower esophageal sphincter",
      "Obesity or excess weight",
      "Hiatal hernia",
      "Eating large meals or lying down right after eating",
      "Certain foods (spicy, fatty, citrus)",
      "Smoking and alcohol consumption",
    ],
    symptoms: [
      "Burning sensation in the chest (heartburn)",
      "Regurgitation of food or sour liquid",
      "Difficulty swallowing",
      "Chronic cough",
      "Nausea after eating",
      "Feeling of a lump in the throat",
    ],
    prevention: [
      "Eat smaller meals more frequently",
      "Avoid lying down within 3 hours of eating",
      "Elevate the head of your bed",
      "Maintain a healthy weight",
      "Avoid trigger foods and beverages",
      "Quit smoking",
    ],
    remedies: [
      {
        id: 201,
        title: "Ginger Root Tea",
        author: "Dr. Priya Sharma",
        description:
          "Ginger has natural anti-inflammatory properties and can help neutralize stomach acids. Drinking ginger tea 20 minutes before meals can significantly reduce acid reflux symptoms.",
        likes: 487,
        verifiedBy: ["doc_001", "doc_003", "doc_006"],
        userContributed: false,
        steps: [
          "Peel and slice 1-2 inches of fresh ginger root",
          "Steep in boiling water for 10 minutes",
          "Add honey to taste and drink 20 minutes before meals",
        ],
      },
      {
        id: 202,
        title: "Apple Cider Vinegar Tonic",
        author: "James Carter",
        description:
          "A small amount of diluted apple cider vinegar before meals may help balance stomach acid levels.",
        likes: 198,
        verifiedBy: [],
        userContributed: true,
        steps: [
          "Mix 1 tablespoon of raw apple cider vinegar in 8 oz warm water",
          "Add a teaspoon of honey for taste",
          "Drink 15 minutes before heavy meals",
        ],
      },
      {
        id: 203,
        title: "Banana and Fennel Remedy",
        author: "Dr. Arun Mehta",
        description:
          "Bananas are a natural antacid. Combining with fennel seeds after meals helps reduce acid production and soothes the digestive tract.",
        likes: 312,
        verifiedBy: ["doc_002", "doc_005"],
        userContributed: false,
        steps: [
          "Eat a ripe banana after meals",
          "Chew a teaspoon of fennel seeds slowly",
          "Alternatively, steep fennel seeds as tea and drink warm",
        ],
      },
    ],
  },
  migraine: {
    slug: "migraine",
    name: "Migraine",
    description:
      "A migraine is a type of headache disorder characterized by intense, debilitating headaches often accompanied by nausea, sensitivity to light and sound, and visual disturbances.",
    causes: [
      "Hormonal changes",
      "Stress and anxiety",
      "Certain foods (aged cheese, alcohol, MSG)",
      "Sleep disturbances",
      "Sensory stimuli (bright lights, loud sounds)",
      "Weather changes and barometric pressure shifts",
    ],
    symptoms: [
      "Severe throbbing or pulsating pain (usually one side)",
      "Nausea and vomiting",
      "Sensitivity to light (photophobia)",
      "Sensitivity to sound (phonophobia)",
      "Visual aura (flashing lights, blind spots)",
      "Fatigue and mood changes before onset",
    ],
    prevention: [
      "Maintain a regular sleep schedule",
      "Stay hydrated throughout the day",
      "Identify and avoid personal triggers",
      "Practice stress management techniques",
      "Exercise regularly but moderately",
      "Keep a migraine diary to track patterns",
    ],
    remedies: [
      {
        id: 301,
        title: "Peppermint Oil Temple Massage",
        author: "Dr. Lisa Anderson",
        description:
          "Peppermint oil applied to the temples has a cooling and analgesic effect. Studies show it can be as effective as standard medication for tension-type headaches and migraines.",
        likes: 523,
        verifiedBy: ["doc_001", "doc_002", "doc_003", "doc_004"],
        userContributed: false,
        steps: [
          "Dilute 2-3 drops of peppermint essential oil with a carrier oil",
          "Gently massage into temples and forehead in circular motions",
          "Rest in a dark, quiet room for 20-30 minutes",
        ],
      },
      {
        id: 302,
        title: "Feverfew and Butterbur Herbal Tea",
        author: "Maria Garcia",
        description:
          "Feverfew has been used for centuries to prevent migraines. Combined with butterbur, it reduces the frequency and severity of attacks.",
        likes: 267,
        verifiedBy: ["doc_003"],
        userContributed: true,
        steps: [
          "Steep 1 teaspoon of dried feverfew leaves in hot water for 10 minutes",
          "Strain and add a small amount of honey",
          "Drink once daily as a preventive measure",
        ],
      },
      {
        id: 303,
        title: "Magnesium-Rich Diet & Supplementation",
        author: "Dr. Robert Brown",
        description:
          "Magnesium deficiency is strongly linked to migraines. Increasing dietary magnesium or taking supplements can reduce migraine frequency by up to 50%.",
        likes: 445,
        verifiedBy: ["doc_001", "doc_005", "doc_006"],
        userContributed: false,
        steps: [
          "Increase intake of magnesium-rich foods (dark leafy greens, nuts, seeds)",
          "Consider a 400-600mg magnesium glycinate supplement daily",
          "Track migraine frequency over 8 weeks to gauge improvement",
        ],
      },
    ],
  },
  allergies: {
    slug: "allergies",
    name: "Allergies",
    description: "An immune system response to a foreign substance that is not typically harmful to your body, such as pollen, pet dander, or certain foods.",
    causes: ["Airborne allergens", "Certain foods", "Insect stings", "Pet dander"],
    symptoms: ["Sneezing", "Itchy, runny nose", "Red, watery eyes", "Skin rashes"],
    prevention: ["Identify and avoid known triggers", "Keep windows closed during high pollen seasons", "Use HEPA air purifiers"],
    remedies: []
  },
  arthritis: {
    slug: "arthritis",
    name: "Arthritis",
    description: "Inflammation of one or more joints, causing pain and stiffness that can worsen with age.",
    causes: ["Wear and tear of joint cartilage", "Autoimmune disorders", "Genetics"],
    symptoms: ["Joint pain and stiffness", "Swelling and redness", "Decreased range of motion"],
    prevention: ["Maintain a healthy weight", "Engage in low-impact exercises", "Consume an anti-inflammatory diet"],
    remedies: []
  },
  asthma: {
    slug: "asthma",
    name: "Asthma",
    description: "A condition in which your airways narrow and swell and may produce extra mucus, making breathing difficult.",
    causes: ["Airborne allergens", "Respiratory infections", "Cold air"],
    symptoms: ["Shortness of breath", "Chest tightness", "Wheezing"],
    prevention: ["Avoid asthma triggers", "Get vaccinated for flu", "Keep indoor air clean"],
    remedies: []
  },
  "common-cold": {
    slug: "common-cold",
    name: "Common Cold",
    description: "A viral infection of your nose and throat. It is usually harmless, although it might not feel that way.",
    causes: ["Rhinoviruses", "Close contact with infected individuals", "Touching contaminated surfaces"],
    symptoms: ["Runny or stuffy nose", "Sore throat", "Cough and congestion"],
    prevention: ["Wash hands thoroughly", "Avoid touching your face", "Maintain a strong immune system"],
    remedies: []
  },
  cough: {
    slug: "cough",
    name: "Cough",
    description: "A reflex action that clears your airway of irritants and mucus.",
    causes: ["Viral infections", "Postnasal drip", "Environmental irritants"],
    symptoms: ["Frequent throat clearing", "Tickling sensation in throat", "Hoarseness"],
    prevention: ["Stay hydrated", "Use a humidifier", "Avoid secondhand smoke"],
    remedies: []
  },
  dandruff: {
    slug: "dandruff",
    name: "Dandruff",
    description: "A common condition that causes the skin on the scalp to flake.",
    causes: ["Irritated, oily skin", "Not shampooing enough", "Dry skin"],
    symptoms: ["Skin flakes on your scalp", "Itchy scalp", "Mild redness"],
    prevention: ["Shampoo regularly", "Manage stress", "Limit styling products"],
    remedies: []
  },
  eczema: {
    slug: "eczema",
    name: "Eczema",
    description: "A condition that makes your skin red and itchy. It tends to flare periodically.",
    causes: ["Genetic variation", "Immune system overreaction", "Environmental triggers"],
    symptoms: ["Dry, scaly skin", "Red to brownish-gray patches", "Severe itching"],
    prevention: ["Moisturize skin daily", "Take shorter, warm showers", "Wear breathable fabrics"],
    remedies: []
  },
  fever: {
    slug: "fever",
    name: "Fever",
    description: "A temporary increase in your body temperature, often due to an illness.",
    causes: ["Viral or bacterial infections", "Heat exhaustion", "Inflammatory conditions"],
    symptoms: ["Elevated body temperature", "Sweating and chills", "Muscle aches"],
    prevention: ["Practice good hygiene", "Stay up to date on vaccinations", "Avoid close contact with sick individuals"],
    remedies: []
  },
  gastritis: {
    slug: "gastritis",
    name: "Gastritis",
    description: "An inflammation, irritation, or erosion of the lining of the stomach.",
    causes: ["Bacterial infection", "Regular use of pain relievers", "Stress"],
    symptoms: ["Burning ache in abdomen", "Nausea and vomiting", "Feeling of fullness"],
    prevention: ["Eat smaller meals", "Avoid irritating foods", "Manage stress"],
    remedies: []
  },
  "muscle-pain": {
    slug: "muscle-pain",
    name: "Muscle Pain",
    description: "A common condition characterized by ache or pain in the muscles.",
    causes: ["Muscle tension", "Overuse from physical activity", "Poor posture"],
    symptoms: ["Deep ache or sharp pain", "Tenderness", "Muscle spasms"],
    prevention: ["Warm up before exercising", "Stretch regularly", "Practice good ergonomics"],
    remedies: []
  },
  sinusitis: {
    slug: "sinusitis",
    name: "Sinusitis",
    description: "An inflammation or swelling of the tissue lining the sinuses.",
    causes: ["Common cold virus", "Nasal polyps", "Allergies"],
    symptoms: ["Thick nasal discharge", "Nasal congestion", "Pain around eyes and cheeks"],
    prevention: ["Avoid upper respiratory infections", "Manage allergies", "Use a humidifier"],
    remedies: []
  },
  "urinary-tract-infection": {
    slug: "urinary-tract-infection",
    name: "Urinary Tract Infection",
    description: "An infection in any part of your urinary system.",
    causes: ["Bacteria entering the urinary tract", "Dehydration", "Holding urine"],
    symptoms: ["Strong urge to urinate", "Burning sensation", "Cloudy urine"],
    prevention: ["Drink plenty of water", "Wipe front to back", "Empty bladder frequently"],
    remedies: []
  },
  bloating: {
    slug: "bloating",
    name: "Bloating",
    description: "A condition where your belly feels full, tight, and uncomfortable, often due to a buildup of gas in the digestive tract.",
    causes: ["Eating too quickly or overeating", "Digestive issues like IBS or food intolerances", "Carbonated beverages"],
    symptoms: ["Feeling of fullness in the abdomen", "Visibly swollen stomach", "Excessive gas or belching"],
    prevention: ["Eat smaller meals more slowly", "Identify and avoid trigger foods", "Stay hydrated"],
    remedies: []
  },
  blisters: {
    slug: "blisters",
    name: "Blisters",
    description: "Small pockets of fluid that form on the upper layers of the skin, typically serving as a protective cushion.",
    causes: ["Friction from ill-fitting shoes", "Burns or excessive sun exposure", "Allergic reactions"],
    symptoms: ["Raised, fluid-filled bubble on the skin", "Pain or tenderness when pressed", "Redness surrounding the area"],
    prevention: ["Wear comfortable, well-fitting shoes", "Apply sunscreen", "Keep skin dry in areas prone to friction"],
    remedies: []
  },
  bronchitis: {
    slug: "bronchitis",
    name: "Bronchitis",
    description: "An inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.",
    causes: ["Viral infections", "Bacterial infections", "Exposure to tobacco smoke"],
    symptoms: ["Persistent cough", "Fatigue", "Shortness of breath"],
    prevention: ["Avoid cigarette smoke", "Wash hands frequently", "Get a yearly flu vaccine"],
    remedies: []
  },
  constipation: {
    slug: "constipation",
    name: "Constipation",
    description: "A common digestive issue characterized by infrequent bowel movements or difficulty passing stools.",
    causes: ["Lack of dietary fiber", "Inadequate fluid intake", "Lack of physical activity"],
    symptoms: ["Passing fewer than three stools a week", "Lumpy or hard stools", "Straining to have bowel movements"],
    prevention: ["Include high-fiber foods in diet", "Drink plenty of water", "Stay active and exercise"],
    remedies: []
  },
  cramps: {
    slug: "cramps",
    name: "Cramps",
    description: "Sudden, involuntary muscle contractions or over-shortening; while generally temporary, they can cause pain.",
    causes: ["Muscle overuse or strain", "Dehydration", "Depletion of electrolytes"],
    symptoms: ["Sudden, sharp pain in a muscle", "Hard lump of muscle tissue", "Temporary inability to use the muscle"],
    prevention: ["Stay hydrated", "Stretch muscles before use", "Maintain a diet rich in essential minerals"],
    remedies: []
  },
  depression: {
    slug: "depression",
    name: "Depression",
    description: "A mood disorder that causes a persistent feeling of sadness and loss of interest.",
    causes: ["Biological differences in the brain", "Hormonal changes", "Highly stressful life events"],
    symptoms: ["Feelings of sadness or emptiness", "Loss of interest in normal activities", "Sleep disturbances"],
    prevention: ["Control stress and increase resilience", "Maintain a regular sleep schedule", "Engage in regular physical activity"],
    remedies: []
  },
  diarrhea: {
    slug: "diarrhea",
    name: "Diarrhea",
    description: "Loose, watery, and possibly more frequent bowel movements.",
    causes: ["Viruses like norovirus", "Bacteria from contaminated food", "Certain medications"],
    symptoms: ["Frequent, loose stools", "Abdominal cramps", "Bloating and nausea"],
    prevention: ["Wash hands frequently", "Practice safe food handling", "Drink bottled water when traveling"],
    remedies: []
  },
  "ear-infection": {
    slug: "ear-infection",
    name: "Ear Infection",
    description: "An infection of the middle ear, the air-filled space behind the eardrum.",
    causes: ["Bacterium or virus in the middle ear", "Fluid buildup due to colds", "Changes in air pressure"],
    symptoms: ["Ear pain", "Trouble hearing", "Fluid drainage from the ear"],
    prevention: ["Prevent common colds", "Avoid secondhand smoke", "Manage seasonal allergies"],
    remedies: []
  },
  fatigue: {
    slug: "fatigue",
    name: "Fatigue",
    description: "A lingering tiredness that is constant and limiting.",
    causes: ["Poor sleep habits", "Anemia or thyroid issues", "Chronic stress"],
    symptoms: ["Unexplained exhaustion", "Difficulty concentrating", "Muscle weakness"],
    prevention: ["Prioritize 7-9 hours of sleep", "Eat a balanced diet", "Practice stress-reduction techniques"],
    remedies: []
  },
  "fungal-infection": {
    slug: "fungal-infection",
    name: "Fungal Infection",
    description: "A skin disease caused by a fungus, thriving in warm, moist environments.",
    causes: ["Contact with fungi on surfaces", "Person-to-person transmission", "Wearing damp clothing"],
    symptoms: ["Red, itchy rash", "Peeling or cracking skin", "Blisters or sores"],
    prevention: ["Keep skin clean and dry", "Change socks daily", "Avoid walking barefoot in public showers"],
    remedies: []
  },
  "kidney-stones": {
    slug: "kidney-stones",
    name: "Kidney Stones",
    description: "Hard deposits made of minerals and salts that form inside your kidneys.",
    causes: ["Not drinking enough water", "Diets high in protein or salt", "Certain medical conditions"],
    symptoms: ["Severe, sharp pain in the side and back", "Pain radiating to lower abdomen", "Cloudy or pink urine"],
    prevention: ["Drink plenty of water", "Eat fewer oxalate-rich foods", "Choose a diet low in salt"],
    remedies: []
  },
  osteoporosis: {
    slug: "osteoporosis",
    name: "Osteoporosis",
    description: "A bone disease that causes bones to become weak and brittle.",
    causes: ["Aging and lowered estrogen levels", "Low calcium intake", "Sedentary lifestyle"],
    symptoms: ["Back pain", "Loss of height over time", "A stooped posture"],
    prevention: ["Consume adequate calcium and vitamin D", "Engage in weight-bearing exercises", "Avoid smoking"],
    remedies: []
  },
  "varicose-veins": {
    slug: "varicose-veins",
    name: "Varicose Veins",
    description: "Twisted, enlarged veins, most commonly affecting those in your legs.",
    causes: ["Weak or damaged valves in the veins", "Standing or sitting for long periods", "Age and genetics"],
    symptoms: ["Dark purple or blue veins", "Twisted and bulging veins", "Achy or heavy feeling in legs"],
    prevention: ["Exercise regularly", "Elevate your legs when resting", "Avoid long periods of sitting or standing"],
    remedies: []
  },
}

export default mockAilmentsData
