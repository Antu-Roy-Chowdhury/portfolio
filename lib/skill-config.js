export const SKILL_CATEGORY_OPTIONS = [
  { value: "ml_vision", label: "Machine Learning & Computer Vision" },
  { value: "embedded_ece", label: "Embedded Systems & ECE" },
  { value: "fullstack", label: "Full-Stack Engineering" },
  { value: "tools_languages", label: "Languages, Tools & Frameworks" },
]

export const SKILL_PROFICIENCY_OPTIONS = [
  { value: "core", label: "Core Toolset" },
  { value: "familiar", label: "Familiar / Secondary" },
]

export function getSkillCategoryLabel(category) {
  return SKILL_CATEGORY_OPTIONS.find((item) => item.value === category)?.label || toTitleCase(category)
}

export function getSkillProficiencyLabel(value) {
  return SKILL_PROFICIENCY_OPTIONS.find((item) => item.value === value)?.label || toTitleCase(value)
}

export function toTitleCase(value) {
  return value
    ?.split(/[_-]/g)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ")
}
