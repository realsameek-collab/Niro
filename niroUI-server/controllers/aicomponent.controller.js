import User from "../models/user.model.js"
import Component from "../models/component.model.js"
import { askAI } from "../utils/openRouter.js"

export const generateComponent = async (req, res) => {
  try {
    const prompt = req.body?.prompt?.trim()

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" })
    }

    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({ message: "user is not found" })
    }

    if (user.role === "user") {
      if (user.aiCredits < 50) {
        return res.status(400).json({ message: "Not enough AI credits" })
      }

      user.aiCredits -= 50
      await user.save()
    }

    const messages = [
      {
        role: "system",
        content: `You are a React component generator. Output ONLY a valid JSON object. No markdown, no backticks, no explanation.

CRITICAL: Your entire response must be parseable by JSON.parse(). Start with { and end with }.

OUTPUT FORMAT:
{
  "name": "ComponentName",
  "code": "<full component code as single escaped string>",
  "props": ["prop1", "prop2"]
}

--- CODE RULES ---
- Import hooks like this: import React, { useState, useEffect, useRef, useCallback } from "react";
- Named export only: export const ComponentName = ({ ...props }) => { ... }
- Inline styles ONLY. No CSS classes, no Tailwind, no styled-components.
- All props must have default values. Component must look great with zero props passed.
- No TypeScript. No external libraries. No framer-motion. No icon libraries.
- NEVER use template literals inside JSX style objects.
  BAD:  style={{ border: "1px solid " + accent }} using backtick version
  GOOD: style={{ border: "1px solid " + accent }}
- Always use string concatenation for dynamic style values: "1px solid " + accent
- NEVER use position "fixed". Use "absolute" or "relative" only.
- For hex to rgba conversion, define this helper inside the component:
  const alpha = (hex, op) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return "rgba("+r+","+g+","+b+","+op+")"; };
- In the JSON output, escape every double quote inside the code string as \\" 
- In the JSON output, escape every newline inside the code string as \\n
--- DESIGN RULES ---
- Dark backgrounds: #0f172a, #020617, #0d1117, #1e293b
- Rich accent colors: #6366f1, #7c3aed, #059669, #e11d48, #0ea5e9
- border-radius: 12px to 20px on cards, 8px to 10px on buttons
- Font: system-ui, -apple-system, sans-serif
- Subtle borders: 1px solid rgba(255,255,255,0.08)
- Box shadows: 0 10px 40px rgba(0,0,0,0.4)
- Must look like a premium UI screenshot with zero props passed.

--- LIVE PREVIEW RULES ---
- Renders inside react-live sandbox. Container is dark #020617, 800px wide, 400px min-height.
- NEVER use position fixed. It breaks the sandbox.
- NEVER import from any external package. Only React and its hooks are in scope.
- Everything must be self-contained inside the component.
- Use widths between 280px and 720px so it centers nicely in preview.

--- EXAMPLE 1: Button ---
{"name":"Button","code":"import React from \\"react\\";\\n\\nexport const Button = ({ text = \\"Get Started\\", bg = \\"#7c3aed\\", color = \\"#fff\\", size = \\"md\\", disabled = false, loading = false, onClick = () => {} }) => {\\n  const sizes = { sm: \\"8px 16px\\", md: \\"11px 24px\\", lg: \\"14px 32px\\" };\\n  return (\\n    <button\\n      onClick={onClick}\\n      disabled={disabled || loading}\\n      style={{\\n        background: bg,\\n        color: color,\\n        padding: sizes[size],\\n        borderRadius: \\"10px\\",\\n        border: \\"none\\",\\n        cursor: disabled ? \\"not-allowed\\" : \\"pointer\\",\\n        fontWeight: \\"700\\",\\n        fontSize: \\"15px\\",\\n        fontFamily: \\"system-ui,sans-serif\\",\\n        boxShadow: \\"0 4px 14px rgba(124,58,237,0.4)\\",\\n        opacity: disabled ? 0.6 : 1,\\n        transition: \\"opacity 0.2s\\"\\n      }}\\n    >\\n      {loading ? \\"Loading...\\" : text}\\n    </button>\\n  );\\n};","props":["text","bg","color","size","disabled","loading","onClick"]}

--- EXAMPLE 2: ImageCard ---
{"name":"ImageCard","code":"import React, { useState } from \\"react\\";\\n\\nexport const ImageCard = ({\\n  image = \\"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80\\",\\n  tag = \\"Travel\\",\\n  title = \\"Discover the Hidden Peaks\\",\\n  description = \\"A breathtaking journey through untouched landscapes and snow-capped summits.\\",\\n  buttonText = \\"Read More\\",\\n  accent = \\"#6366f1\\",\\n  bg = \\"#0f172a\\",\\n  onButtonClick = () => {}\\n}) => {\\n  const [hovered, setHovered] = useState(false);\\n  const alpha = (hex, op) => {\\n    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);\\n    return \\"rgba(\\" + r + \",\\" + g + \",\\" + b + \",\\" + op + \")\\";\\n  };\\n  return (\\n    <div\\n      onMouseEnter={() => setHovered(true)}\\n      onMouseLeave={() => setHovered(false)}\\n      style={{\\n        background: bg,\\n        borderRadius: \\"20px\\",\\n        overflow: \\"hidden\\",\\n        width: \\"300px\\",\\n        border: \\"1px solid \\" + (hovered ? alpha(accent, 0.3) : \\"rgba(255,255,255,0.07)\\"),\\n        fontFamily: \\"system-ui,sans-serif\\",\\n        transition: \\"transform 0.25s, box-shadow 0.25s\\",\\n        transform: hovered ? \\"translateY(-4px)\\" : \\"translateY(0px)\\",\\n        boxShadow: hovered ? \\"0 16px 40px rgba(0,0,0,0.5)\\" : \\"0 4px 20px rgba(0,0,0,0.3)\\"\\n      }}\\n    >\\n      <div style={{ position: \\"relative\\", width: \\"100%\\", height: \\"180px\\", overflow: \\"hidden\\" }}>\\n        <img src={image} alt={title} style={{ width: \\"100%\\", height: \\"100%\\", objectFit: \\"cover\\", transform: hovered ? \\"scale(1.05)\\" : \\"scale(1)\\", transition: \\"transform 0.4s ease\\" }} />\\n        <div style={{ position: \\"absolute\\", inset: 0, background: \\"linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)\\" }} />\\n        {tag && (\\n          <div style={{ position: \\"absolute\\", top: \\"12px\\", left: \\"12px\\", padding: \\"4px 10px\\", borderRadius: \\"20px\\", background: alpha(accent, 0.85), fontSize: \\"10px\\", fontWeight: \\"700\\", color: \\"#fff\\", textTransform: \\"uppercase\\", letterSpacing: \\"0.5px\\" }}>{tag}</div>\\n        )}\\n      </div>\\n      <div style={{ padding: \\"18px\\" }}>\\n        <h3 style={{ fontSize: \\"15px\\", fontWeight: \\"700\\", color: \\"#fff\\", margin: \\"0 0 8px\\", lineHeight: 1.4 }}>{title}</h3>\\n        <p style={{ fontSize: \\"13px\\", color: \\"rgba(255,255,255,0.45)\\", lineHeight: 1.65, margin: \\"0 0 18px\\" }}>{description}</p>\\n        <button\\n          onClick={onButtonClick}\\n          style={{ width: \\"100%\\", padding: \\"11px\\", borderRadius: \\"12px\\", border: \\"none\\", background: \\"linear-gradient(135deg, \\" + accent + \", \\" + alpha(accent, 0.7) + \")\\" , color: \\"#fff\\", fontSize: \\"13px\\", fontWeight: \\"700\\", cursor: \\"pointer\\", fontFamily: \\"inherit\\" }}\\n        >{buttonText}</button>\\n      </div>\\n    </div>\\n  );\\n};","props":["image","tag","title","description","buttonText","accent","bg","onButtonClick"]}

--- EXAMPLE 3: PricingCard ---
{"name":"PricingCard","code":"import React from \\"react\\";\\n\\nexport const PricingCard = ({\\n  planName = \\"Pro Plan\\",\\n  description = \\"For teams that need more power.\\",\\n  price = 29,\\n  currency = \\"$\\",\\n  period = \\"per month\\",\\n  badgeText = \\"Most Popular\\",\\n  ctaText = \\"Get Started\\",\\n  accent = \\"#6366f1\\",\\n  bg = \\"#0f172a\\",\\n  features = [\"Unlimited projects\", \"Priority support\", \"Advanced analytics\", \"Custom integrations\"],\\n  onCtaClick = () => {}\\n}) => {\\n  const alpha = (hex, op) => {\\n    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);\\n    return \\"rgba(\\" + r + \",\\" + g + \",\\" + b + \",\\" + op + \")\\";\\n  };\\n  return (\\n    <div style={{ background: bg, borderRadius: \\"20px\\", padding: \\"28px 24px\\", width: \\"300px\\", color: \\"#fff\\", fontFamily: \\"system-ui,sans-serif\\"` ,
      },
      {
        role: "user",
        content: prompt,
      },
    ]


   let parsed

try {

const clean = aiResponse
    .replace(/```json/g,"")
    .replace(/```/g,"")
    .trim()

parsed = JSON.parse(clean)

} catch (error) {

    console.log("AI RESPONSE:", aiResponse)

    return res.status(500).json({
        message: "AI returned invalid JSON"
    })

}


   return res.status(200).json({parsed , remainingCredits: 
user.role === "user" ? user.aiCredits : null,})

  } catch (error) {
    console.error("generateComponent error:", error)
    return res.status(500).json({ message: error.message || "Something went wrong while generating the component" })
  }
}
