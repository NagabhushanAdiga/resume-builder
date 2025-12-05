// ATS (Applicant Tracking System) Scoring Utility
export const calculateATSScore = (resumeData) => {
  let score = 0
  let maxScore = 0
  const feedback = []

  // 1. Contact Information (20 points)
  maxScore += 20
  const personalInfo = resumeData.personalInfo || {}
  if (personalInfo.fullName) score += 3
  if (personalInfo.email) score += 3
  if (personalInfo.phone) score += 3
  if (personalInfo.location) score += 2
  if (personalInfo.linkedin) score += 3
  if (personalInfo.github || personalInfo.website) score += 3
  if (personalInfo.summary && personalInfo.summary.length > 50) score += 3

  if (score < 15) {
    feedback.push({ type: 'warning', message: 'Add complete contact information for better ATS parsing' })
  }

  // 2. Professional Summary (15 points)
  maxScore += 15
  if (personalInfo.summary) {
    const summaryLength = personalInfo.summary.length
    if (summaryLength >= 100 && summaryLength <= 300) {
      score += 15
    } else if (summaryLength >= 50) {
      score += 10
    } else if (summaryLength > 0) {
      score += 5
    }
  } else {
    feedback.push({ type: 'info', message: 'Add a professional summary to improve your score' })
  }

  // 3. Work Experience (25 points)
  maxScore += 25
  const experience = resumeData.experience || []
  if (experience.length > 0) {
    score += Math.min(experience.length * 5, 15) // Up to 15 points for multiple experiences
    experience.forEach((exp, index) => {
      if (exp.position && exp.company) {
        score += 2
      }
      if (exp.description && exp.description.length > 50) {
        score += 1
      }
      if (exp.startDate) {
        score += 0.5
      }
    })
    score = Math.min(score, 25)
  } else {
    feedback.push({ type: 'warning', message: 'Add work experience to significantly improve your ATS score' })
  }

  // 4. Education (15 points)
  maxScore += 15
  const education = resumeData.education || []
  if (education.length > 0) {
    education.forEach((edu) => {
      if (edu.school) score += 3
      if (edu.degree) score += 3
      if (edu.field) score += 2
      if (edu.gpa) score += 2
      if (edu.startDate && edu.endDate) score += 2
    })
    score = Math.min(score, 15)
  } else {
    feedback.push({ type: 'info', message: 'Add education details to improve your score' })
  }

  // 5. Skills (15 points)
  maxScore += 15
  const skills = resumeData.skills || []
  if (skills.length > 0) {
    let totalSkillItems = 0
    skills.forEach((skillCategory) => {
      if (skillCategory.items && skillCategory.items.length > 0) {
        totalSkillItems += skillCategory.items.length
      }
    })
    if (totalSkillItems >= 10) {
      score += 15
    } else if (totalSkillItems >= 5) {
      score += 10
    } else if (totalSkillItems > 0) {
      score += 5
    }
  } else {
    feedback.push({ type: 'warning', message: 'Add relevant skills to help ATS systems match your resume' })
  }

  // 6. Projects (5 points)
  maxScore += 5
  const projects = resumeData.projects || []
  if (projects.length > 0) {
    score += Math.min(projects.length * 1.5, 5)
  }

  // 7. Certifications (5 points)
  maxScore += 5
  const certifications = resumeData.certifications || []
  if (certifications.length > 0) {
    score += Math.min(certifications.length * 2.5, 5)
  }

  // Calculate percentage
  const percentage = Math.round((score / maxScore) * 100)

  // Determine score level
  let level = 'poor'
  let levelColor = 'red'
  if (percentage >= 80) {
    level = 'excellent'
    levelColor = 'green'
  } else if (percentage >= 60) {
    level = 'good'
    levelColor = 'blue'
  } else if (percentage >= 40) {
    level = 'fair'
    levelColor = 'yellow'
  }

  return {
    score: percentage,
    level,
    levelColor,
    feedback,
    details: {
      contactInfo: personalInfo.fullName && personalInfo.email && personalInfo.phone,
      summary: personalInfo.summary && personalInfo.summary.length >= 100,
      experience: experience.length > 0,
      education: education.length > 0,
      skills: skills.length > 0 && skills.some(s => s.items && s.items.length > 0),
      projects: projects.length > 0,
      certifications: certifications.length > 0
    }
  }
}

