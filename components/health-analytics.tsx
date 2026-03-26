"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Info } from "lucide-react"

interface HealthData {
  weight: string
  weightUnit: "kg" | "lbs"
  height: string
  heightUnit: "cm" | "ft"
  bmi: number | null
}

function getBmiCategory(bmi: number): { label: string; color: string; bgColor: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600", bgColor: "bg-blue-100" }
  if (bmi < 25) return { label: "Normal", color: "text-emerald-600", bgColor: "bg-emerald-100" }
  if (bmi < 30) return { label: "Overweight", color: "text-orange-600", bgColor: "bg-orange-100" }
  return { label: "Obese", color: "text-red-600", bgColor: "bg-red-100" }
}

function BmiGauge({ bmi }: { bmi: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = 280
    const height = 160
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, width, height)

    const cx = width / 2
    const cy = height - 20
    const radius = 110
    const lineWidth = 18
    const startAngle = Math.PI
    const endAngle = 2 * Math.PI

    // Background arc
    ctx.beginPath()
    ctx.arc(cx, cy, radius, startAngle, endAngle)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineCap = "round"
    ctx.stroke()

    // Gradient sections — Underweight | Normal | Overweight | Obese
    const sections = [
      { start: 0, end: 0.235, color: "#3b82f6" },    // Underweight (< 18.5)
      { start: 0.235, end: 0.5, color: "#10b981" },   // Normal (18.5 - 25)
      { start: 0.5, end: 0.715, color: "#f97316" },   // Overweight (25 - 30)
      { start: 0.715, end: 1, color: "#ef4444" },      // Obese (30+)
    ]

    for (const section of sections) {
      ctx.beginPath()
      const sAngle = startAngle + section.start * Math.PI
      const eAngle = startAngle + section.end * Math.PI
      ctx.arc(cx, cy, radius, sAngle, eAngle)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = section.color
      ctx.lineCap = "butt"
      ctx.stroke()
    }

    // Needle indicator
    if (bmi !== null) {
      // Map BMI (15 → 40) to angle (0 → 1 of the semi-circle)
      const clampedBmi = Math.max(15, Math.min(40, bmi))
      const ratio = (clampedBmi - 15) / 25
      const needleAngle = startAngle + ratio * Math.PI

      // Needle line
      const needleLen = radius - 25
      const nx = cx + needleLen * Math.cos(needleAngle)
      const ny = cy + needleLen * Math.sin(needleAngle)

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(nx, ny)
      ctx.lineWidth = 3
      ctx.strokeStyle = "#1f2937"
      ctx.lineCap = "round"
      ctx.stroke()

      // Center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, 2 * Math.PI)
      ctx.fillStyle = "#1f2937"
      ctx.fill()
    }

    // Labels
    ctx.font = "11px Inter, sans-serif"
    ctx.fillStyle = "#6b7280"
    ctx.textAlign = "center"
    ctx.fillText("15", cx - radius + 5, cy + 16)
    ctx.fillText("40", cx + radius - 5, cy + 16)

  }, [bmi])

  return <canvas ref={canvasRef} className="mx-auto" />
}

export default function HealthAnalytics() {
  const [data, setData] = useState<HealthData>({
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    bmi: null,
  })
  const [saved, setSaved] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("healthAnalytics")
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  const calculateBmi = () => {
    const weightNum = parseFloat(data.weight)
    const heightNum = parseFloat(data.height)
    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) return

    // Convert to kg and meters
    const weightKg = data.weightUnit === "lbs" ? weightNum * 0.453592 : weightNum
    let heightM: number
    if (data.heightUnit === "ft") {
      heightM = heightNum * 0.3048
    } else {
      heightM = heightNum / 100
    }

    const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1))

    const newData = { ...data, bmi }
    setData(newData)
    localStorage.setItem("healthAnalytics", JSON.stringify(newData))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const category = data.bmi ? getBmiCategory(data.bmi) : null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Personal Health Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Weight */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Weight</label>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={data.weight}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9.]/g, "")
                  setData({ ...data, weight: v })
                }}
                placeholder={data.weightUnit === "kg" ? "70" : "154"}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"
              />
              <select
                value={data.weightUnit}
                onChange={(e) => setData({ ...data, weightUnit: e.target.value as "kg" | "lbs" })}
                className="px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Height</label>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={data.height}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9.]/g, "")
                  setData({ ...data, height: v })
                }}
                placeholder={data.heightUnit === "cm" ? "175" : "5.9"}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"
              />
              <select
                value={data.heightUnit}
                onChange={(e) => setData({ ...data, heightUnit: e.target.value as "cm" | "ft" })}
                className="px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculate & Save Button */}
        <Button
          onClick={calculateBmi}
          disabled={!data.weight || !data.height}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg shadow-md text-base py-2.5"
        >
          {saved ? "✓ Saved!" : "Calculate & Save"}
        </Button>

        {/* BMI Gauge */}
        {data.bmi !== null && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col items-center">
              <BmiGauge bmi={data.bmi} />
              <div className="mt-4 text-center">
                <p className="text-3xl font-bold text-foreground">{data.bmi}</p>
                {category && (
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${category.bgColor} ${category.color}`}>
                    {category.label}
                  </span>
                )}
              </div>
            </div>

            {/* BMI Tooltip */}
            <div className="relative flex items-center justify-center">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
              >
                <Info className="w-4 h-4" />
                <span>What does my BMI mean?</span>
              </button>
              {showTooltip && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 p-3 bg-card border border-border rounded-lg shadow-lg z-10 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">About BMI</p>
                  <p>
                    BMI is a general indicator and does not account for muscle mass or body composition.
                    It should not be used as the sole measure of health. Consult your healthcare provider
                    for a comprehensive assessment.
                  </p>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-border" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="flex items-center gap-2 pt-2">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-xs text-muted-foreground">
            Your data is private and helps us personalize your remedy dosages.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
