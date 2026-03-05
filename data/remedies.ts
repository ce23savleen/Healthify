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
  "back-pain": [
    {
      id: 1,
      title: "Turmeric and Ginger Tea",
      author: "Dr. Rajesh Kumar",
      likes: 421,
      isVerified: true,
      description:
        "Drink turmeric and ginger tea daily for anti-inflammatory benefits. Both ingredients have been used in traditional medicine for centuries.",
      userContributed: false,
    },
    {
      id: 2,
      title: "Heat Therapy",
      author: "John Smith",
      likes: 198,
      isVerified: false,
      description:
        "Apply a heating pad to the affected area for 15-20 minutes to relieve muscle tension and improve blood flow.",
      userContributed: true,
    },
  ],
  anxiety: [
    {
      id: 1,
      title: "Ginger Tea for Quick Relief",
      author: "Test User",
      likes: 2,
      isVerified: false,
      description:
        "This natural remedy using fresh ginger has helped me countless times with tension headache and anxiety relief.",
      userContributed: true,
    },
    {
      id: 2,
      title: "Chamomile and Lavender Tea",
      author: "Dr. Lisa Anderson",
      likes: 567,
      isVerified: true,
      description:
        "Brew chamomile and lavender tea to calm the nervous system. Both herbs have proven anxiolytic properties.",
      userContributed: false,
    },
  ],
  headache: [
    {
      id: 1,
      title: "Peppermint Oil Massage",
      author: "Dr. James Wilson",
      likes: 445,
      isVerified: true,
      description:
        "Apply diluted peppermint oil to temples and massage gently. Peppermint has cooling properties that help relieve tension headaches.",
      userContributed: false,
    },
    {
      id: 2,
      title: "Cold Compress Method",
      author: "Maria Garcia",
      likes: 312,
      isVerified: false,
      description:
        "Apply a cold compress to the forehead for 15 minutes. The cold temperature helps constrict blood vessels and reduce pain.",
      userContributed: true,
    },
  ],
  "sore-throat": [
    {
      id: 1,
      title: "Honey and Lemon Gargle",
      author: "Dr. Robert Brown",
      likes: 623,
      isVerified: true,
      description:
        "Mix warm water with honey and lemon juice, then gargle. Both ingredients have antimicrobial and soothing properties.",
      userContributed: false,
    },
    {
      id: 2,
      title: "Salt Water Rinse",
      author: "Sarah Mitchell",
      likes: 289,
      isVerified: false,
      description: "Gargle with warm salt water several times a day. Salt helps reduce inflammation and kill bacteria.",
      userContributed: true,
    },
  ],
  nausea: [
    {
      id: 1,
      title: "Ginger Root Tea",
      author: "Dr. Patricia Lee",
      likes: 534,
      isVerified: true,
      description:
        "Brew fresh ginger root in hot water and drink slowly. Ginger is well-known for its anti-nausea properties.",
      userContributed: false,
    },
    {
      id: 2,
      title: "Peppermint Aromatherapy",
      author: "David Chen",
      likes: 267,
      isVerified: false,
      description: "Inhale peppermint essential oil or drink peppermint tea. The aroma helps settle the stomach.",
      userContributed: true,
    },
  ],
}

export default remediesData
