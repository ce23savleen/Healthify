export interface CreateAilmentRequest {
  name: string
  description: string
  causes: string[]
  symptoms: string[]
  prevention: string[]
}

export interface AilmentRecord extends CreateAilmentRequest {
  id: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface AilmentApiResponse {
  ailments: AilmentRecord[]
}

export interface AilmentApiError {
  error: string
  details?: string[]
}
