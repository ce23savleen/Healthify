const remediesData: Record<string, any[]> = {
  acne: [
    {
      id: 1,
      title: "Tea Tree Oil Treatment",
      author: "Dr. Sarah Johnson",
      likes: 342,
      isVerified: true,
      description:
        "Apply diluted tea tree oil directly to affected areas. Tea tree oil has antibacterial properties that help reduce acne-causing bacteria.",
      userContributed: false,
    },
    {
      id: 2,
      title: "Honey and Cinnamon Mask",
      author: "Emma Wilson",
      likes: 289,
      isVerified: false,
      description:
        "Mix raw honey with cinnamon powder and apply as a face mask for 15 minutes. Both ingredients have antimicrobial properties.",
      userContributed: true,
    },
    {
      id: 3,
      title: "Aloe Vera Gel",
      author: "Dr. Michael Chen",
      likes: 156,
      isVerified: true,
      description: "Apply fresh aloe vera gel to reduce inflammation and promote healing of acne scars.",
      userContributed: false,
    },
  ],
  allergies: [
    {
      id: 4,
      title: "Local Honey Consumption",
      author: "Dr. Priya Sharma",
      likes: 398,
      isVerified: true,
      description:
        "Consume a tablespoon of locally sourced raw honey daily. Local honey may help build tolerance to local pollen allergens over time.",
      userContributed: false,
    },
    {
      id: 5,
      title: "Saline Nasal Rinse",
      author: "Raj Patel",
      likes: 312,
      isVerified: false,
      description:
        "Use a neti pot with warm saline solution to flush out allergens and mucus from nasal passages. Do this once or twice daily during allergy season.",
      userContributed: true,
    },
    {
      id: 6,
      title: "Stinging Nettle Tea",
      author: "Dr. Lisa Anderson",
      likes: 267,
      isVerified: true,
      description:
        "Brew dried stinging nettle leaves as tea. Nettle acts as a natural antihistamine and can help reduce allergy symptoms like sneezing and itchy eyes.",
      userContributed: false,
    },
  ],
  arthritis: [
    {
      id: 7,
      title: "Turmeric Golden Milk",
      author: "Dr. Arun Mehta",
      likes: 523,
      isVerified: true,
      description:
        "Mix turmeric powder with warm milk and a pinch of black pepper. Curcumin in turmeric has powerful anti-inflammatory properties that help relieve joint pain.",
      userContributed: false,
    },
    {
      id: 8,
      title: "Epsom Salt Soak",
      author: "Maria Garcia",
      likes: 287,
      isVerified: false,
      description:
        "Soak affected joints in warm water mixed with Epsom salt for 15-20 minutes. The magnesium sulfate helps reduce inflammation and ease pain.",
      userContributed: true,
    },
    {
      id: 9,
      title: "Ginger Compress",
      author: "Dr. Robert Brown",
      likes: 345,
      isVerified: true,
      description:
        "Apply a warm ginger compress to sore joints. Grate fresh ginger, wrap in cloth, and apply for 15 minutes. Ginger contains gingerols that reduce inflammation.",
      userContributed: false,
    },
  ],
  asthma: [
    {
      id: 10,
      title: "Steam Inhalation with Eucalyptus",
      author: "Dr. James Wilson",
      likes: 412,
      isVerified: true,
      description:
        "Add a few drops of eucalyptus oil to a bowl of hot water and inhale the steam. Eucalyptol helps open airways and ease breathing.",
      userContributed: false,
    },
    {
      id: 11,
      title: "Honey and Warm Water",
      author: "Sarah Mitchell",
      likes: 289,
      isVerified: false,
      description:
        "Mix a tablespoon of honey in a glass of warm water and drink slowly. Honey may help soothe airways and reduce nighttime coughing.",
      userContributed: true,
    },
    {
      id: 12,
      title: "Breathing Exercises (Buteyko Method)",
      author: "Dr. Patricia Lee",
      likes: 356,
      isVerified: true,
      description:
        "Practice shallow, controlled breathing through the nose. This technique can help reduce hyperventilation and improve asthma symptoms over time.",
      userContributed: false,
    },
  ],
  anxiety: [
    {
      id: 13,
      title: "Ginger Tea for Quick Relief",
      author: "Test User",
      likes: 2,
      isVerified: false,
      description:
        "This natural remedy using fresh ginger has helped me countless times with tension headache and anxiety relief.",
      userContributed: true,
    },
    {
      id: 14,
      title: "Chamomile and Lavender Tea",
      author: "Dr. Lisa Anderson",
      likes: 567,
      isVerified: true,
      description:
        "Brew chamomile and lavender tea to calm the nervous system. Both herbs have proven anxiolytic properties.",
      userContributed: false,
    },
    {
      id: 15,
      title: "Deep Breathing Exercise (4-7-8 Technique)",
      author: "Dr. Robert Brown",
      likes: 489,
      isVerified: true,
      description:
        "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. This activates the parasympathetic nervous system and reduces anxiety quickly.",
      userContributed: false,
    },
  ],
  "back-pain": [
    {
      id: 16,
      title: "Turmeric and Ginger Tea",
      author: "Dr. Rajesh Kumar",
      likes: 421,
      isVerified: true,
      description:
        "Drink turmeric and ginger tea daily for anti-inflammatory benefits. Both ingredients have been used in traditional medicine for centuries.",
      userContributed: false,
    },
    {
      id: 17,
      title: "Heat Therapy",
      author: "John Smith",
      likes: 198,
      isVerified: false,
      description:
        "Apply a heating pad to the affected area for 15-20 minutes to relieve muscle tension and improve blood flow.",
      userContributed: true,
    },
    {
      id: 18,
      title: "Cat-Cow Stretch",
      author: "Dr. Sarah Johnson",
      likes: 345,
      isVerified: true,
      description:
        "Get on all fours and alternate between arching and rounding your back. This yoga stretch improves spinal flexibility and relieves lower back tension.",
      userContributed: false,
    },
  ],
  bronchitis: [
    {
      id: 19,
      title: "Honey and Lemon Hot Drink",
      author: "Dr. Priya Sharma",
      likes: 456,
      isVerified: true,
      description:
        "Mix honey and fresh lemon juice in warm water. Honey soothes the throat and has antimicrobial properties, while lemon provides vitamin C to boost immunity.",
      userContributed: false,
    },
    {
      id: 20,
      title: "Steam Inhalation with Thyme",
      author: "David Chen",
      likes: 312,
      isVerified: false,
      description:
        "Inhale steam from water infused with thyme leaves for 10 minutes. Thyme contains thymol, which has antispasmodic and antimicrobial properties.",
      userContributed: true,
    },
  ],
  bloating: [
    {
      id: 21,
      title: "Peppermint Tea",
      author: "Dr. Lisa Anderson",
      likes: 478,
      isVerified: true,
      description:
        "Drink peppermint tea after meals. Peppermint relaxes the smooth muscles of the digestive tract, helping to relieve gas and bloating.",
      userContributed: false,
    },
    {
      id: 22,
      title: "Fennel Seeds After Meals",
      author: "Anita Ramesh",
      likes: 367,
      isVerified: false,
      description:
        "Chew a teaspoon of fennel seeds after meals or brew them as tea. Fennel has carminative properties that help reduce gas and bloating.",
      userContributed: true,
    },
  ],
  blisters: [
    {
      id: 23,
      title: "Aloe Vera Application",
      author: "Dr. Michael Chen",
      likes: 298,
      isVerified: true,
      description:
        "Apply fresh aloe vera gel directly to the blister. Aloe vera has anti-inflammatory and moisturizing properties that promote healing and soothe pain.",
      userContributed: false,
    },
    {
      id: 24,
      title: "Green Tea Compress",
      author: "Emily Park",
      likes: 187,
      isVerified: false,
      description:
        "Soak a cloth in cooled green tea and apply to the blister for 10-15 minutes. Green tea has anti-inflammatory and antioxidant properties.",
      userContributed: true,
    },
  ],
  "common-cold": [
    {
      id: 25,
      title: "Chicken Soup with Garlic",
      author: "Dr. Robert Brown",
      likes: 534,
      isVerified: true,
      description:
        "Prepare homemade chicken soup with fresh garlic. The warm broth helps with hydration, garlic has antiviral properties, and the soup helps clear nasal congestion.",
      userContributed: false,
    },
    {
      id: 26,
      title: "Ginger, Lemon, and Honey Tea",
      author: "Sarah Mitchell",
      likes: 489,
      isVerified: false,
      description:
        "Brew fresh ginger in hot water, add lemon juice and honey. This combination boosts immunity, soothes sore throat, and provides vitamin C.",
      userContributed: true,
    },
  ],
  cough: [
    {
      id: 27,
      title: "Honey and Warm Water",
      author: "Dr. Priya Sharma",
      likes: 567,
      isVerified: true,
      description:
        "Take a tablespoon of raw honey or mix it in warm water. Honey coats the throat, reducing irritation and suppressing cough. Studies show it is as effective as some OTC cough medicines.",
      userContributed: false,
    },
    {
      id: 28,
      title: "Turmeric Milk (Golden Milk)",
      author: "Raj Patel",
      likes: 412,
      isVerified: false,
      description:
        "Mix a teaspoon of turmeric in warm milk with a pinch of black pepper. Turmeric's anti-inflammatory properties help soothe a persistent cough.",
      userContributed: true,
    },
  ],
  constipation: [
    {
      id: 29,
      title: "Warm Lemon Water in the Morning",
      author: "Dr. Lisa Anderson",
      likes: 498,
      isVerified: true,
      description:
        "Drink a glass of warm water with fresh lemon juice first thing in the morning. The warmth stimulates digestion and lemon promotes bowel movements.",
      userContributed: false,
    },
    {
      id: 30,
      title: "Flaxseed and Yogurt",
      author: "Anita Ramesh",
      likes: 345,
      isVerified: false,
      description:
        "Mix a tablespoon of ground flaxseeds into yogurt. Flaxseeds are rich in fiber and omega-3 fatty acids, helping soften stools and improve bowel regularity.",
      userContributed: true,
    },
  ],
  cramps: [
    {
      id: 31,
      title: "Magnesium-Rich Banana Smoothie",
      author: "Dr. James Wilson",
      likes: 389,
      isVerified: true,
      description:
        "Blend bananas with spinach and almond butter for a magnesium and potassium-rich smoothie. These minerals help prevent and relieve muscle cramps.",
      userContributed: false,
    },
    {
      id: 32,
      title: "Chamomile Tea for Menstrual Cramps",
      author: "Emily Park",
      likes: 312,
      isVerified: false,
      description:
        "Drink chamomile tea 2-3 times daily during menstruation. Chamomile has antispasmodic properties that help relax the uterine muscles and reduce cramping.",
      userContributed: true,
    },
  ],
  dandruff: [
    {
      id: 33,
      title: "Coconut Oil and Tea Tree Oil Treatment",
      author: "Dr. Sarah Johnson",
      likes: 445,
      isVerified: true,
      description:
        "Mix a few drops of tea tree oil with coconut oil and massage into the scalp. Leave for 30 minutes before washing. Tea tree oil fights the fungus that causes dandruff.",
      userContributed: false,
    },
    {
      id: 34,
      title: "Apple Cider Vinegar Rinse",
      author: "Maria Garcia",
      likes: 378,
      isVerified: false,
      description:
        "Mix equal parts apple cider vinegar and water. After shampooing, pour the mixture over your scalp. The acidity helps balance scalp pH and reduce flaking.",
      userContributed: true,
    },
  ],
  depression: [
    {
      id: 35,
      title: "St. John's Wort Tea",
      author: "Dr. Patricia Lee",
      likes: 412,
      isVerified: true,
      description:
        "Brew St. John's Wort herbal tea and drink 1-2 cups daily. This herb has been shown to be effective for mild to moderate depression by increasing serotonin levels.",
      userContributed: false,
    },
    {
      id: 36,
      title: "Omega-3 Rich Diet (Walnuts and Flaxseeds)",
      author: "David Chen",
      likes: 356,
      isVerified: false,
      description:
        "Include walnuts, flaxseeds, and fatty fish in your daily diet. Omega-3 fatty acids support brain health and may help improve depressive symptoms.",
      userContributed: true,
    },
  ],
  diarrhea: [
    {
      id: 37,
      title: "BRAT Diet (Bananas, Rice, Applesauce, Toast)",
      author: "Dr. Arun Mehta",
      likes: 534,
      isVerified: true,
      description:
        "Follow the BRAT diet during acute diarrhea. These bland, low-fiber foods help firm up stools and are easy on the digestive system.",
      userContributed: false,
    },
    {
      id: 38,
      title: "Oral Rehydration Solution (ORS)",
      author: "Sarah Mitchell",
      likes: 467,
      isVerified: false,
      description:
        "Mix 6 teaspoons of sugar and 1/2 teaspoon of salt in 1 liter of clean water. Sip throughout the day to prevent dehydration during diarrhea.",
      userContributed: true,
    },
  ],
  "dry-skin": [
    {
      id: 39,
      title: "Oatmeal Bath",
      author: "Dr. Sarah Johnson",
      likes: 423,
      isVerified: true,
      description:
        "Add colloidal oatmeal or finely ground oats to a lukewarm bath and soak for 15 minutes. Oatmeal soothes dry, itchy skin and helps restore the skin barrier.",
      userContributed: false,
    },
    {
      id: 40,
      title: "Coconut Oil Moisturizer",
      author: "Anita Ramesh",
      likes: 389,
      isVerified: false,
      description:
        "Apply virgin coconut oil to damp skin after bathing. Its fatty acids create a protective layer that locks in moisture and nourishes dry skin.",
      userContributed: true,
    },
  ],
  eczema: [
    {
      id: 41,
      title: "Colloidal Oatmeal Treatment",
      author: "Dr. Michael Chen",
      likes: 478,
      isVerified: true,
      description:
        "Apply colloidal oatmeal cream or take an oatmeal bath. Oatmeal has anti-inflammatory properties that soothe eczema symptoms and restore the skin barrier.",
      userContributed: false,
    },
    {
      id: 42,
      title: "Coconut Oil Application",
      author: "Emily Park",
      likes: 398,
      isVerified: false,
      description:
        "Apply virgin coconut oil to eczema patches several times daily. Its antimicrobial and moisturizing properties help reduce inflammation and prevent infection.",
      userContributed: true,
    },
  ],
  "eye-strain": [
    {
      id: 43,
      title: "Chilled Cucumber Slices",
      author: "Dr. Lisa Anderson",
      likes: 356,
      isVerified: true,
      description:
        "Place chilled cucumber slices over closed eyes for 10-15 minutes. The cooling effect reduces puffiness and soothes tired, strained eyes.",
      userContributed: false,
    },
    {
      id: 44,
      title: "Palming Exercise",
      author: "John Smith",
      likes: 289,
      isVerified: false,
      description:
        "Rub your palms together until warm, then gently cup them over closed eyes for 2-3 minutes. The warmth and darkness help relax eye muscles.",
      userContributed: true,
    },
  ],
  "ear-infection": [
    {
      id: 45,
      title: "Warm Garlic Oil Drops",
      author: "Dr. Rajesh Kumar",
      likes: 367,
      isVerified: true,
      description:
        "Warm a few drops of garlic-infused olive oil and apply 2-3 drops to the affected ear. Garlic has natural antimicrobial properties that may help fight ear infections.",
      userContributed: false,
    },
    {
      id: 46,
      title: "Warm Compress",
      author: "Maria Garcia",
      likes: 298,
      isVerified: false,
      description:
        "Apply a warm, damp washcloth to the affected ear for 10-15 minutes. The warmth helps reduce pain and promotes fluid drainage from the ear.",
      userContributed: true,
    },
  ],
  fever: [
    {
      id: 47,
      title: "Tulsi (Holy Basil) Tea",
      author: "Dr. Arun Mehta",
      likes: 489,
      isVerified: true,
      description:
        "Brew fresh tulsi leaves in hot water and drink 2-3 times daily. Tulsi has antipyretic, anti-inflammatory, and immune-boosting properties.",
      userContributed: false,
    },
    {
      id: 48,
      title: "Cool Water Sponging",
      author: "Sarah Mitchell",
      likes: 345,
      isVerified: false,
      description:
        "Sponge the body with lukewarm (not cold) water, focusing on the forehead, armpits, and feet. This helps bring down body temperature gradually.",
      userContributed: true,
    },
  ],
  fatigue: [
    {
      id: 49,
      title: "Ashwagandha Supplement",
      author: "Dr. Priya Sharma",
      likes: 445,
      isVerified: true,
      description:
        "Take ashwagandha root powder or supplement daily. This adaptogenic herb helps reduce cortisol levels, combat fatigue, and improve energy levels naturally.",
      userContributed: false,
    },
    {
      id: 50,
      title: "Iron-Rich Smoothie",
      author: "David Chen",
      likes: 312,
      isVerified: false,
      description:
        "Blend spinach, beetroot, banana, and orange juice. This iron and vitamin C-rich smoothie helps combat fatigue caused by iron deficiency.",
      userContributed: true,
    },
  ],
  "fungal-infection": [
    {
      id: 51,
      title: "Tea Tree Oil Application",
      author: "Dr. Sarah Johnson",
      likes: 423,
      isVerified: true,
      description:
        "Apply diluted tea tree oil to the affected area 2-3 times daily. Tea tree oil has potent antifungal and antiseptic properties effective against various fungi.",
      userContributed: false,
    },
    {
      id: 52,
      title: "Garlic Paste Application",
      author: "Raj Patel",
      likes: 267,
      isVerified: false,
      description:
        "Crush fresh garlic cloves and mix with coconut oil. Apply to the infected area for 30 minutes. Garlic contains allicin, a powerful antifungal compound.",
      userContributed: true,
    },
  ],
  gastritis: [
    {
      id: 53,
      title: "Carom Seeds (Ajwain) Water",
      author: "Dr. Rajesh Kumar",
      likes: 456,
      isVerified: true,
      description:
        "Soak a teaspoon of carom seeds in water overnight and drink on an empty stomach. Ajwain stimulates the release of gastric juices and aids digestion.",
      userContributed: false,
    },
    {
      id: 54,
      title: "Cold Milk for Immediate Relief",
      author: "Anita Ramesh",
      likes: 378,
      isVerified: false,
      description:
        "Drink a glass of cold milk without any sweetener. Milk can temporarily neutralize stomach acid and provide quick relief from gastritis pain.",
      userContributed: true,
    },
  ],
  gout: [
    {
      id: 55,
      title: "Tart Cherry Juice",
      author: "Dr. James Wilson",
      likes: 512,
      isVerified: true,
      description:
        "Drink tart cherry juice daily. Cherries contain anthocyanins that reduce uric acid levels and inflammation, helping prevent gout attacks.",
      userContributed: false,
    },
    {
      id: 56,
      title: "Apple Cider Vinegar Drink",
      author: "John Smith",
      likes: 345,
      isVerified: false,
      description:
        "Mix 1-2 tablespoons of apple cider vinegar in a glass of water and drink daily. It may help alkalize the body and reduce uric acid levels.",
      userContributed: true,
    },
  ],
  headache: [
    {
      id: 57,
      title: "Peppermint Oil Massage",
      author: "Dr. James Wilson",
      likes: 445,
      isVerified: true,
      description:
        "Apply diluted peppermint oil to temples and massage gently. Peppermint has cooling properties that help relieve tension headaches.",
      userContributed: false,
    },
    {
      id: 58,
      title: "Cold Compress Method",
      author: "Maria Garcia",
      likes: 312,
      isVerified: false,
      description:
        "Apply a cold compress to the forehead for 15 minutes. The cold temperature helps constrict blood vessels and reduce pain.",
      userContributed: true,
    },
  ],
  heartburn: [
    {
      id: 59,
      title: "Baking Soda Solution",
      author: "Dr. Patricia Lee",
      likes: 398,
      isVerified: true,
      description:
        "Dissolve 1/2 teaspoon of baking soda in a glass of water and drink. Baking soda neutralizes stomach acid and provides quick relief from heartburn.",
      userContributed: false,
    },
    {
      id: 60,
      title: "Chewing Gum After Meals",
      author: "Emily Park",
      likes: 267,
      isVerified: false,
      description:
        "Chew sugar-free gum for 30 minutes after eating. Chewing gum stimulates saliva production, which helps neutralize and wash away stomach acid.",
      userContributed: true,
    },
  ],
  hemorrhoids: [
    {
      id: 61,
      title: "Witch Hazel Application",
      author: "Dr. Robert Brown",
      likes: 412,
      isVerified: true,
      description:
        "Apply witch hazel extract to the affected area using a cotton pad. Witch hazel is a natural astringent that reduces swelling, pain, and itching.",
      userContributed: false,
    },
    {
      id: 62,
      title: "Warm Sitz Bath",
      author: "Sarah Mitchell",
      likes: 356,
      isVerified: false,
      description:
        "Sit in a warm bath for 15-20 minutes after bowel movements. The warm water improves blood flow to the area and reduces inflammation.",
      userContributed: true,
    },
  ],
  "high-blood-pressure": [
    {
      id: 63,
      title: "Hibiscus Tea",
      author: "Dr. Arun Mehta",
      likes: 523,
      isVerified: true,
      description:
        "Drink 2-3 cups of hibiscus tea daily. Research shows hibiscus can lower systolic blood pressure by acting as a natural ACE inhibitor.",
      userContributed: false,
    },
    {
      id: 64,
      title: "Garlic Supplements or Raw Garlic",
      author: "Raj Patel",
      likes: 445,
      isVerified: false,
      description:
        "Consume 1-2 cloves of raw garlic daily or take garlic supplements. Allicin in garlic helps relax blood vessels and lower blood pressure.",
      userContributed: true,
    },
  ],
  indigestion: [
    {
      id: 65,
      title: "Ginger and Lemon Digestive Drink",
      author: "Dr. Priya Sharma",
      likes: 467,
      isVerified: true,
      description:
        "Grate fresh ginger into warm water, add lemon juice and drink after meals. Ginger speeds up stomach emptying and reduces bloating.",
      userContributed: false,
    },
    {
      id: 66,
      title: "Cumin Seeds Water (Jeera Water)",
      author: "Anita Ramesh",
      likes: 389,
      isVerified: false,
      description:
        "Boil a teaspoon of cumin seeds in water, strain, and drink warm. Cumin stimulates digestive enzymes and improves digestion.",
      userContributed: true,
    },
  ],
  insomnia: [
    {
      id: 67,
      title: "Warm Milk with Nutmeg",
      author: "Dr. Lisa Anderson",
      likes: 445,
      isVerified: true,
      description:
        "Drink warm milk with a pinch of nutmeg before bedtime. Milk contains tryptophan (a sleep-promoting amino acid) and nutmeg has mild sedative properties.",
      userContributed: false,
    },
    {
      id: 68,
      title: "Lavender Aromatherapy",
      author: "Emily Park",
      likes: 398,
      isVerified: false,
      description:
        "Place a few drops of lavender essential oil on your pillow or use a diffuser. Lavender has been shown to improve sleep quality and reduce anxiety.",
      userContributed: true,
    },
  ],
  inflammation: [
    {
      id: 69,
      title: "Turmeric and Black Pepper Supplement",
      author: "Dr. Rajesh Kumar",
      likes: 534,
      isVerified: true,
      description:
        "Take turmeric with black pepper daily. Curcumin is a powerful anti-inflammatory, and piperine in black pepper increases its absorption by 2000%.",
      userContributed: false,
    },
    {
      id: 70,
      title: "Anti-Inflammatory Berry Smoothie",
      author: "David Chen",
      likes: 312,
      isVerified: false,
      description:
        "Blend blueberries, strawberries, spinach, and flaxseeds. These are rich in antioxidants and omega-3s that fight chronic inflammation.",
      userContributed: true,
    },
  ],
  "joint-pain": [
    {
      id: 71,
      title: "Sesame Oil Warm Massage",
      author: "Dr. Arun Mehta",
      likes: 456,
      isVerified: true,
      description:
        "Warm sesame oil and massage into painful joints for 10-15 minutes. Sesame oil contains sesamol, which has anti-inflammatory and antioxidant properties.",
      userContributed: false,
    },
    {
      id: 72,
      title: "Hot and Cold Therapy",
      author: "John Smith",
      likes: 378,
      isVerified: false,
      description:
        "Alternate between hot and cold compresses on the joint — 3 minutes hot, 1 minute cold, repeat 3 times. This stimulates blood flow and reduces stiffness.",
      userContributed: true,
    },
  ],
  "kidney-stones": [
    {
      id: 73,
      title: "Lemon Juice and Olive Oil",
      author: "Dr. Robert Brown",
      likes: 445,
      isVerified: true,
      description:
        "Mix 2 tablespoons of lemon juice with 2 tablespoons of olive oil and drink followed by water. Citric acid in lemon may help break down small stones and prevent formation.",
      userContributed: false,
    },
    {
      id: 74,
      title: "Barley Water",
      author: "Raj Patel",
      likes: 312,
      isVerified: false,
      description:
        "Boil barley in water, strain, and drink throughout the day. Barley water is a natural diuretic that helps flush out toxins and small stones from the kidneys.",
      userContributed: true,
    },
  ],
  "low-energy": [
    {
      id: 75,
      title: "Green Tea with Honey",
      author: "Dr. Patricia Lee",
      likes: 398,
      isVerified: true,
      description:
        "Drink green tea with honey in the morning. Green tea provides steady energy through L-theanine and a small amount of caffeine without the jitters of coffee.",
      userContributed: false,
    },
    {
      id: 76,
      title: "Date and Nut Energy Balls",
      author: "Anita Ramesh",
      likes: 289,
      isVerified: false,
      description:
        "Blend dates, almonds, and oats into energy balls. Dates provide natural sugars for quick energy, while nuts offer healthy fats for sustained energy.",
      userContributed: true,
    },
  ],
  migraine: [
    {
      id: 77,
      title: "Peppermint Oil Temple Massage",
      author: "Dr. Lisa Anderson",
      likes: 523,
      isVerified: true,
      description:
        "Dilute peppermint oil and gently massage into temples and forehead. Studies show it can be as effective as standard medication for tension-type headaches and migraines.",
      userContributed: false,
    },
    {
      id: 78,
      title: "Magnesium-Rich Diet",
      author: "Dr. Robert Brown",
      likes: 445,
      isVerified: true,
      description:
        "Increase intake of magnesium-rich foods such as dark leafy greens, nuts, and seeds. Consider a 400-600mg magnesium supplement. Deficiency is linked to migraines.",
      userContributed: false,
    },
  ],
  "muscle-pain": [
    {
      id: 79,
      title: "Epsom Salt Bath",
      author: "Dr. James Wilson",
      likes: 467,
      isVerified: true,
      description:
        "Add 2 cups of Epsom salt to a warm bath and soak for 20 minutes. The magnesium sulfate is absorbed through the skin, helping relax muscles and reduce soreness.",
      userContributed: false,
    },
    {
      id: 80,
      title: "Arnica Gel Application",
      author: "Maria Garcia",
      likes: 345,
      isVerified: false,
      description:
        "Apply arnica gel or cream to sore muscles. Arnica is a homeopathic remedy with anti-inflammatory properties that reduce muscle pain and bruising.",
      userContributed: true,
    },
  ],
  nausea: [
    {
      id: 81,
      title: "Ginger Root Tea",
      author: "Dr. Patricia Lee",
      likes: 534,
      isVerified: true,
      description:
        "Brew fresh ginger root in hot water and drink slowly. Ginger is well-known for its anti-nausea properties.",
      userContributed: false,
    },
    {
      id: 82,
      title: "Peppermint Aromatherapy",
      author: "David Chen",
      likes: 267,
      isVerified: false,
      description: "Inhale peppermint essential oil or drink peppermint tea. The aroma helps settle the stomach.",
      userContributed: true,
    },
  ],
  "neck-pain": [
    {
      id: 83,
      title: "Warm Salt Compress",
      author: "Dr. Rajesh Kumar",
      likes: 398,
      isVerified: true,
      description:
        "Heat coarse salt in a pan, wrap in a cloth, and apply to the neck for 15 minutes. The heat and salt together help relieve stiffness and improve blood circulation.",
      userContributed: false,
    },
    {
      id: 84,
      title: "Neck Stretching Exercises",
      author: "John Smith",
      likes: 312,
      isVerified: false,
      description:
        "Gently tilt your head side to side, forward and backward, holding each position for 15-30 seconds. Regular stretching reduces tension and improves flexibility.",
      userContributed: true,
    },
  ],
  obesity: [
    {
      id: 85,
      title: "Warm Lemon Water with Honey",
      author: "Dr. Priya Sharma",
      likes: 489,
      isVerified: true,
      description:
        "Start each morning with warm water, fresh lemon juice, and honey. This boosts metabolism, aids digestion, and helps with weight management.",
      userContributed: false,
    },
    {
      id: 86,
      title: "Green Tea Before Meals",
      author: "Sarah Mitchell",
      likes: 412,
      isVerified: false,
      description:
        "Drink green tea 30 minutes before meals. Catechins in green tea boost metabolism and promote fat oxidation, supporting healthy weight loss.",
      userContributed: true,
    },
  ],
  osteoporosis: [
    {
      id: 87,
      title: "Sesame Seeds (Til) Daily Intake",
      author: "Dr. Arun Mehta",
      likes: 398,
      isVerified: true,
      description:
        "Consume a tablespoon of sesame seeds daily. They are one of the richest non-dairy sources of calcium and also contain zinc, which helps build bone density.",
      userContributed: false,
    },
    {
      id: 88,
      title: "Morning Sun Exposure",
      author: "Anita Ramesh",
      likes: 312,
      isVerified: false,
      description:
        "Spend 15-20 minutes in the morning sun without sunscreen. Morning sunlight helps your body produce vitamin D, essential for calcium absorption and bone health.",
      userContributed: true,
    },
  ],
  psoriasis: [
    {
      id: 89,
      title: "Aloe Vera Gel Application",
      author: "Dr. Sarah Johnson",
      likes: 456,
      isVerified: true,
      description:
        "Apply pure aloe vera gel to psoriasis patches 3 times daily. Aloe vera has anti-inflammatory properties that soothe redness, scaling, and itching.",
      userContributed: false,
    },
    {
      id: 90,
      title: "Dead Sea Salt Bath",
      author: "Emily Park",
      likes: 345,
      isVerified: false,
      description:
        "Add Dead Sea salts to a warm bath and soak for 15 minutes. The minerals help remove scales, reduce itching, and soothe inflamed skin.",
      userContributed: true,
    },
  ],
  pimples: [
    {
      id: 91,
      title: "Neem Paste Application",
      author: "Dr. Rajesh Kumar",
      likes: 423,
      isVerified: true,
      description:
        "Grind fresh neem leaves into a paste and apply to pimples. Leave for 20 minutes and rinse. Neem has powerful antibacterial and anti-inflammatory properties.",
      userContributed: false,
    },
    {
      id: 92,
      title: "Ice Cube Treatment",
      author: "Raj Patel",
      likes: 312,
      isVerified: false,
      description:
        "Wrap an ice cube in a clean cloth and apply to the pimple for 5-10 minutes. The cold reduces inflammation, swelling, and redness quickly.",
      userContributed: true,
    },
  ],
  "poor-digestion": [
    {
      id: 93,
      title: "Triphala Powder Before Bed",
      author: "Dr. Priya Sharma",
      likes: 467,
      isVerified: true,
      description:
        "Mix half a teaspoon of triphala powder in warm water and drink before bed. This Ayurvedic remedy improves digestive function and promotes regular bowel movements.",
      userContributed: false,
    },
    {
      id: 94,
      title: "Apple Cider Vinegar Before Meals",
      author: "David Chen",
      likes: 345,
      isVerified: false,
      description:
        "Mix a tablespoon of apple cider vinegar in water and drink before meals. It may help stimulate stomach acid production and improve digestion.",
      userContributed: true,
    },
  ],
  "quit-smoking": [
    {
      id: 95,
      title: "Ginseng Tea for Cravings",
      author: "Dr. Michael Chen",
      likes: 398,
      isVerified: true,
      description:
        "Drink ginseng tea when experiencing nicotine cravings. Studies suggest ginseng may reduce the pleasurable effects of nicotine and help manage withdrawal symptoms.",
      userContributed: false,
    },
    {
      id: 96,
      title: "Cinnamon Sticks as Oral Substitute",
      author: "John Smith",
      likes: 267,
      isVerified: false,
      description:
        "Chew on a cinnamon stick when you have the urge to smoke. It provides a spicy flavor that satisfies the oral fixation and may help reduce cravings.",
      userContributed: true,
    },
  ],
  rashes: [
    {
      id: 97,
      title: "Oatmeal Bath Soak",
      author: "Dr. Lisa Anderson",
      likes: 423,
      isVerified: true,
      description:
        "Add colloidal oatmeal to a lukewarm bath and soak for 15-20 minutes. Oatmeal contains avenanthramides that provide anti-inflammatory and anti-itch benefits.",
      userContributed: false,
    },
    {
      id: 98,
      title: "Calamine and Aloe Vera Mix",
      author: "Sarah Mitchell",
      likes: 312,
      isVerified: false,
      description:
        "Mix calamine lotion with fresh aloe vera gel and apply to the rash. This combination soothes itching and promotes healing.",
      userContributed: true,
    },
  ],
  rheumatism: [
    {
      id: 99,
      title: "Hot Mustard Oil Massage",
      author: "Dr. Arun Mehta",
      likes: 445,
      isVerified: true,
      description:
        "Warm mustard oil with a few garlic cloves and massage into painful joints. Mustard oil contains allyl isothiocyanate, which stimulates blood flow and reduces pain.",
      userContributed: false,
    },
    {
      id: 100,
      title: "Fenugreek Seeds Water",
      author: "Raj Patel",
      likes: 312,
      isVerified: false,
      description:
        "Soak fenugreek seeds overnight and drink the water on an empty stomach. Fenugreek has anti-inflammatory properties that help with rheumatic joint pain.",
      userContributed: true,
    },
  ],
  sinusitis: [
    {
      id: 101,
      title: "Steam Inhalation with Essential Oils",
      author: "Dr. Robert Brown",
      likes: 489,
      isVerified: true,
      description:
        "Add eucalyptus or peppermint oil to boiling water and inhale the steam for 10 minutes. This helps open blocked sinuses and relieve congestion.",
      userContributed: false,
    },
    {
      id: 102,
      title: "Warm Turmeric Milk",
      author: "Anita Ramesh",
      likes: 356,
      isVerified: false,
      description:
        "Drink warm milk with turmeric and black pepper. Turmeric's anti-inflammatory properties help reduce sinus inflammation and fight infection.",
      userContributed: true,
    },
  ],
  "sore-throat": [
    {
      id: 103,
      title: "Honey and Lemon Gargle",
      author: "Dr. Robert Brown",
      likes: 623,
      isVerified: true,
      description:
        "Mix warm water with honey and lemon juice, then gargle. Both ingredients have antimicrobial and soothing properties.",
      userContributed: false,
    },
    {
      id: 104,
      title: "Salt Water Rinse",
      author: "Sarah Mitchell",
      likes: 289,
      isVerified: false,
      description: "Gargle with warm salt water several times a day. Salt helps reduce inflammation and kill bacteria.",
      userContributed: true,
    },
  ],
  stress: [
    {
      id: 105,
      title: "Ashwagandha Tea",
      author: "Dr. Priya Sharma",
      likes: 478,
      isVerified: true,
      description:
        "Brew ashwagandha powder in warm water or milk and drink before bed. This adaptogenic herb has been shown to reduce cortisol levels by up to 30%.",
      userContributed: false,
    },
    {
      id: 106,
      title: "Progressive Muscle Relaxation",
      author: "Emily Park",
      likes: 367,
      isVerified: false,
      description:
        "Tense and release each muscle group from toes to head, holding each for 5 seconds. This technique reduces physical tension associated with stress.",
      userContributed: true,
    },
  ],
  "skin-irritation": [
    {
      id: 107,
      title: "Aloe Vera and Coconut Oil Blend",
      author: "Dr. Sarah Johnson",
      likes: 412,
      isVerified: true,
      description:
        "Mix fresh aloe vera gel with virgin coconut oil and apply to irritated skin. This combination soothes inflammation, moisturizes, and promotes healing.",
      userContributed: false,
    },
    {
      id: 108,
      title: "Cold Chamomile Tea Compress",
      author: "Maria Garcia",
      likes: 289,
      isVerified: false,
      description:
        "Brew chamomile tea, cool it, and apply with a soft cloth to irritated areas. Chamomile has anti-inflammatory and soothing properties.",
      userContributed: true,
    },
  ],
  "thyroid-issues": [
    {
      id: 109,
      title: "Iodine-Rich Sea Vegetables",
      author: "Dr. Arun Mehta",
      likes: 389,
      isVerified: true,
      description:
        "Include seaweed, kelp, or nori in your diet. These sea vegetables are natural sources of iodine, essential for proper thyroid function.",
      userContributed: false,
    },
    {
      id: 110,
      title: "Selenium-Rich Brazil Nuts",
      author: "David Chen",
      likes: 267,
      isVerified: false,
      description:
        "Eat 2-3 Brazil nuts daily. They are the richest food source of selenium, a mineral crucial for thyroid hormone production and conversion.",
      userContributed: true,
    },
  ],
  "tension-headache": [
    {
      id: 111,
      title: "Peppermint and Lavender Oil Blend",
      author: "Dr. James Wilson",
      likes: 423,
      isVerified: true,
      description:
        "Mix peppermint and lavender oils with a carrier oil and apply to temples. The combination of cooling and calming effects provides effective tension headache relief.",
      userContributed: false,
    },
    {
      id: 112,
      title: "Neck and Shoulder Stretches",
      author: "John Smith",
      likes: 312,
      isVerified: false,
      description:
        "Perform gentle neck tilts, shoulder rolls, and ear-to-shoulder stretches. Hold each for 15 seconds. Tension headaches often originate from tight neck and shoulder muscles.",
      userContributed: true,
    },
  ],
  ulcers: [
    {
      id: 113,
      title: "Cabbage Juice",
      author: "Dr. Patricia Lee",
      likes: 398,
      isVerified: true,
      description:
        "Drink fresh cabbage juice twice daily. Cabbage contains vitamin U (S-methylmethionine) which has been shown to help heal stomach ulcers.",
      userContributed: false,
    },
    {
      id: 114,
      title: "Licorice Root (DGL) Tea",
      author: "Sarah Mitchell",
      likes: 312,
      isVerified: false,
      description:
        "Drink deglycyrrhizinated licorice (DGL) tea before meals. DGL stimulates mucus production in the stomach, which helps protect the stomach lining.",
      userContributed: true,
    },
  ],
  "urinary-tract-infection": [
    {
      id: 115,
      title: "Cranberry Juice (Unsweetened)",
      author: "Dr. Lisa Anderson",
      likes: 512,
      isVerified: true,
      description:
        "Drink unsweetened cranberry juice daily. Cranberries contain proanthocyanidins that prevent bacteria from adhering to the urinary tract walls.",
      userContributed: false,
    },
    {
      id: 116,
      title: "D-Mannose Supplement",
      author: "Emily Park",
      likes: 378,
      isVerified: false,
      description:
        "Take D-mannose supplements with water. This natural sugar is found in cranberries and helps flush out E. coli bacteria from the urinary tract.",
      userContributed: true,
    },
  ],
  "varicose-veins": [
    {
      id: 117,
      title: "Apple Cider Vinegar Topical Application",
      author: "Dr. Rajesh Kumar",
      likes: 378,
      isVerified: true,
      description:
        "Apply undiluted apple cider vinegar to varicose veins and massage gently upward toward the heart. Do this twice daily to improve blood flow.",
      userContributed: false,
    },
    {
      id: 118,
      title: "Leg Elevation and Exercise",
      author: "Maria Garcia",
      likes: 312,
      isVerified: false,
      description:
        "Elevate your legs above heart level for 15 minutes several times daily and practice ankle pumps. This helps blood return to the heart and reduces vein pressure.",
      userContributed: true,
    },
  ],
  "weight-loss": [
    {
      id: 119,
      title: "Cinnamon and Honey Drink",
      author: "Dr. Priya Sharma",
      likes: 489,
      isVerified: true,
      description:
        "Mix half a teaspoon of cinnamon with honey in warm water and drink on an empty stomach. Cinnamon helps regulate blood sugar levels and reduce cravings.",
      userContributed: false,
    },
    {
      id: 120,
      title: "Cumin (Jeera) Water",
      author: "Anita Ramesh",
      likes: 398,
      isVerified: false,
      description:
        "Soak cumin seeds overnight, boil in the morning, and drink warm. Cumin boosts metabolism and aids in fat burning, supporting healthy weight loss.",
      userContributed: true,
    },
  ],
  wounds: [
    {
      id: 121,
      title: "Turmeric Paste Application",
      author: "Dr. Arun Mehta",
      likes: 423,
      isVerified: true,
      description:
        "Make a paste of turmeric powder with water or coconut oil and apply to minor wounds. Curcumin has antiseptic and anti-inflammatory properties that promote wound healing.",
      userContributed: false,
    },
    {
      id: 122,
      title: "Honey Wound Dressing",
      author: "Raj Patel",
      likes: 345,
      isVerified: false,
      description:
        "Apply a thin layer of raw honey to clean wounds and cover with a bandage. Honey has natural antibacterial properties and creates a moist healing environment.",
      userContributed: true,
    },
  ],
  xerosis: [
    {
      id: 123,
      title: "Shea Butter and Vitamin E Treatment",
      author: "Dr. Sarah Johnson",
      likes: 398,
      isVerified: true,
      description:
        "Mix shea butter with vitamin E oil and apply liberally to dry skin areas. Shea butter provides deep moisturization while vitamin E promotes skin repair.",
      userContributed: false,
    },
    {
      id: 124,
      title: "Milk Cream (Malai) Application",
      author: "Anita Ramesh",
      likes: 312,
      isVerified: false,
      description:
        "Apply fresh milk cream to dry areas before bathing. The natural fats in milk cream moisturize deeply and soothe rough, cracked skin.",
      userContributed: true,
    },
  ],
  "yeast-infection": [
    {
      id: 125,
      title: "Probiotic-Rich Yogurt",
      author: "Dr. Lisa Anderson",
      likes: 456,
      isVerified: true,
      description:
        "Consume plain, unsweetened yogurt with live cultures daily. Probiotics help restore the balance of good bacteria and prevent yeast overgrowth.",
      userContributed: false,
    },
    {
      id: 126,
      title: "Coconut Oil (Oral and Topical)",
      author: "Emily Park",
      likes: 345,
      isVerified: false,
      description:
        "Consume a tablespoon of virgin coconut oil daily and apply topically to affected areas. Coconut oil contains caprylic acid with strong antifungal properties.",
      userContributed: true,
    },
  ],
  zoster: [
    {
      id: 127,
      title: "Cool Oatmeal Bath",
      author: "Dr. Robert Brown",
      likes: 412,
      isVerified: true,
      description:
        "Take cool baths with colloidal oatmeal to relieve itching and pain from shingles blisters. Avoid hot water which can worsen blisters.",
      userContributed: false,
    },
    {
      id: 128,
      title: "Calamine Lotion Application",
      author: "Sarah Mitchell",
      likes: 312,
      isVerified: false,
      description:
        "Apply calamine lotion to shingles blisters after bathing. It provides a cooling effect that reduces itching and helps dry out the blisters.",
      userContributed: true,
    },
  ],
  "cold-and-flu": [
    {
      id: 129,
      title: "Elderberry Syrup",
      author: "Dr. Patricia Lee",
      likes: 489,
      isVerified: true,
      description:
        "Take elderberry syrup at the first sign of cold or flu. Elderberries are rich in antioxidants and vitamins that may help reduce the duration and severity of colds and flu.",
      userContributed: false,
    },
    {
      id: 130,
      title: "Kadha (Indian Herbal Decoction)",
      author: "Raj Patel",
      likes: 423,
      isVerified: false,
      description:
        "Boil tulsi, ginger, cinnamon, and black pepper in water for 10 minutes. Strain and add honey. This traditional remedy boosts immunity and clears congestion.",
      userContributed: true,
    },
  ],
  diabetes: [
    {
      id: 131,
      title: "Fenugreek Seeds Soaked Water",
      author: "Dr. Rajesh Kumar",
      likes: 512,
      isVerified: true,
      description:
        "Soak a tablespoon of fenugreek seeds in water overnight and drink on an empty stomach. Fenugreek has been shown to help reduce blood sugar levels and improve insulin sensitivity.",
      userContributed: false,
    },
    {
      id: 132,
      title: "Bitter Gourd (Karela) Juice",
      author: "Anita Ramesh",
      likes: 378,
      isVerified: false,
      description:
        "Drink fresh bitter gourd juice on an empty stomach. Bitter gourd contains polypeptide-p, a plant insulin that helps lower blood sugar naturally.",
      userContributed: true,
    },
  ],
  "digestive-issues": [
    {
      id: 133,
      title: "Probiotic-Rich Buttermilk (Chaas)",
      author: "Dr. Priya Sharma",
      likes: 445,
      isVerified: true,
      description:
        "Drink a glass of spiced buttermilk (with cumin, coriander, and ginger) after meals. The probiotics improve gut health and aid digestion.",
      userContributed: false,
    },
    {
      id: 134,
      title: "Psyllium Husk (Isabgol) in Water",
      author: "David Chen",
      likes: 356,
      isVerified: false,
      description:
        "Mix a tablespoon of psyllium husk in warm water and drink before bed. Fiber adds bulk to stools and promotes regular bowel movements.",
      userContributed: true,
    },
  ],
}

export default remediesData
