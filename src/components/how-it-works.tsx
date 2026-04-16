const steps = [
  {
    number: 1,
    title: "Search or Browse",
    description: "Find ailments in our comprehensive directory or search for specific remedies.",
  },
  {
    number: 2,
    title: "Explore Remedies",
    description: "Read doctor-approved treatments and community-shared natural remedies.",
  },
  {
    number: 3,
    title: "Share Your Experience",
    description: "Contribute your own remedies and help others in the community.",
  },
  {
    number: 4,
    title: "Get Verified",
    description: "Request doctor verification for your remedies to build trust.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-teal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center text-white">
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-teal-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
