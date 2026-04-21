import { Schema, model, models, type HydratedDocument, type Model } from "mongoose"
import { slugifyAilmentName } from "@/lib/ailment-utils"

export interface IAilment {
  name: string
  slug: string
  description: string
  causes: string[]
  symptoms: string[]
  prevention: string[]
  createdAt: Date
  updatedAt: Date
}

export type AilmentDocument = HydratedDocument<IAilment>

const ailmentSchema = new Schema<IAilment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    causes: {
      type: [String],
      required: true,
      default: [],
    },
    symptoms: {
      type: [String],
      required: true,
      default: [],
    },
    prevention: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

ailmentSchema.pre("validate", function assignSlug() {
  if (this.name) {
    this.slug = slugifyAilmentName(this.name)
  }
})

const AilmentModel = (models.Ailment as Model<IAilment>) || model<IAilment>("Ailment", ailmentSchema)

export default AilmentModel
