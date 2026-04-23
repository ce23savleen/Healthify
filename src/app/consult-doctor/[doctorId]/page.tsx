type DoctorConsultationPageProps = {
	params: Promise<{ doctorId: string }>
}

export default async function DoctorConsultationPage({ params }: DoctorConsultationPageProps) {
	const { doctorId } = await params

	return (
		<main className="container mx-auto px-4 py-10">
			<h1 className="text-2xl font-semibold">Doctor Consultation</h1>
			<p className="mt-3 text-muted-foreground">Selected doctor: {doctorId}</p>
		</main>
	)
}
