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
}

export default mockAilmentsData
