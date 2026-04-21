export interface CreateRemedyRequest {
  ailment: string
  title: string
  description: string
  steps: string[]
  requestDoctorVerification: boolean
  authorId?: string
  authorName?: string
  mediaUrl?: string
}

export interface RemedyRecord {
  id: string
  ailment: string
  title: string
  description: string
  steps: string[]
  requestDoctorVerification: boolean
  authorId?: string
  authorName: string
  mediaUrl?: string
  endorsements: number
  endorsedBy: string[]
  likes: number
  createdAt: string
  updatedAt: string
}

export interface EndorseRemedyRequest {
  doctorId: string
}

export interface RemediesApiResponse {
  remedies: RemedyRecord[]
}

export interface RemedyApiError {
  error: string
  details?: string[]
}
