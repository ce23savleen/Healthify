import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ShareRemedyForm from "@/components/share-remedy-form"

export default function ShareRemedyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ShareRemedyForm />
      <Footer />
    </main>
  )
}
