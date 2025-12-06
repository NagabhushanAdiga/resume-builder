// Utility functions to parse uploaded resume files

/**
 * Extract text from PDF file
 */
export const parsePDF = async (file) => {
  try {
    // Dynamic import of pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist')
    
    // Set worker source - use a reliable CDN with the correct version
    if (typeof window !== 'undefined') {
      const version = pdfjsLib.version || '5.4.449'
      // Try multiple CDN options for better reliability
      const workerOptions = [
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`,
        `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`,
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.js`,
        `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`
      ]
      
      // Set the first worker option
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerOptions[0]
    }
    
    const arrayBuffer = await file.arrayBuffer()
    
    // Validate that we have data
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('The file appears to be empty')
    }
    
    // Configure getDocument with better error handling
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      useSystemFonts: true,
      verbosity: 0, // Suppress console warnings
      isEvalSupported: false, // Disable eval for security
      stopAtErrors: false // Continue parsing even if there are errors
    })
    
    const pdf = await loadingTask.promise
    
    if (!pdf) {
      throw new Error('Failed to load PDF document')
    }
    
    if (pdf.numPages === 0) {
      throw new Error('PDF appears to be empty or corrupted')
    }
    
    let fullText = ''
    
    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        
        if (textContent && textContent.items && Array.isArray(textContent.items)) {
          const pageText = textContent.items
            .map(item => (item.str || '').trim())
            .filter(str => str.length > 0)
            .join(' ')
          
          if (pageText) {
            fullText += pageText + '\n'
          }
        }
      } catch (pageError) {
        console.warn(`Error extracting text from page ${i}:`, pageError)
        // Continue with other pages even if one fails
      }
    }
    
    if (!fullText || fullText.trim().length === 0) {
      throw new Error('No text could be extracted from the PDF. The PDF might be image-based (scanned document) or encrypted. Please ensure the PDF contains selectable text.')
    }
    
    return fullText.trim()
  } catch (error) {
    // Log the full error for debugging
    console.error('PDF parsing error:', {
      message: error.message,
      name: error.name,
      code: error.code,
      toString: error.toString(),
      stack: error.stack
    })
    
    // Provide more specific error messages
    const errorMessage = (error.message || error.toString() || '').toLowerCase()
    const errorName = (error.name || '').toLowerCase()
    const errorCode = error.code || ''
    
    // Only flag as password-protected if it's VERY explicitly mentioned
    // PDF.js uses specific error codes and messages for password-protected PDFs
    const isPasswordProtected = 
      errorCode === 'PasswordException' ||
      errorName === 'passwordexception' ||
      (errorMessage.includes('password required') && errorMessage.includes('pdf')) ||
      (errorMessage.includes('encryption') && errorMessage.includes('password required')) ||
      (errorMessage.includes('owner password') && errorMessage.includes('required'))
    
    // Don't flag as password-protected if it's just a generic encryption mention
    // Many PDFs mention encryption in metadata but aren't password-protected
    
    if (isPasswordProtected) {
      throw new Error('The PDF is password-protected. Please remove the password and try again.')
    } else if (errorMessage.includes('invalid pdf') || errorMessage.includes('invalid format') || errorMessage.includes('malformed')) {
      throw new Error('The file is not a valid PDF document. Please check the file and try again.')
    } else if (errorMessage.includes('worker') || errorMessage.includes('loading worker') || errorMessage.includes('worker failed')) {
      throw new Error('PDF processing service is unavailable. Please refresh the page and try again.')
    } else if (errorMessage.includes('corrupted') || errorMessage.includes('damaged')) {
      throw new Error('The PDF file appears to be corrupted or damaged. Please try a different file.')
    } else if (errorMessage.includes('empty') || errorMessage.includes('no pages')) {
      throw new Error('The PDF appears to be empty or has no pages.')
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      throw new Error('Network error while processing PDF. Please check your internet connection and try again.')
    } else {
      // For other errors, provide a generic but helpful message
      // Show the actual error in development
      const isDevelopment = import.meta.env.DEV
      const detailedError = isDevelopment ? ` (${error.message || error.toString()})` : ''
      
      throw new Error(`Failed to parse PDF file. Please ensure it is a valid PDF with text content and try again.${detailedError}`)
    }
  }
}

/**
 * Extract text from Word document
 */
export const parseWord = async (file) => {
  try {
    // Dynamic import of mammoth
    const mammoth = await import('mammoth')
    
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    
    return result.value
  } catch (error) {
    console.error('Error parsing Word document:', error)
    throw new Error('Failed to parse Word document. Please ensure it is a valid .doc or .docx file.')
  }
}

/**
 * Parse resume text and extract structured data
 */
export const extractResumeData = (text) => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  const resumeData = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  }
  
  // Extract email
  const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g
  const emails = text.match(emailRegex)
  if (emails && emails.length > 0) {
    resumeData.personalInfo.email = emails[0]
  }
  
  // Extract phone
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
  const phones = text.match(phoneRegex)
  if (phones && phones.length > 0) {
    resumeData.personalInfo.phone = phones[0]
  }
  
  // Extract LinkedIn URL
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+/gi
  const linkedin = text.match(linkedinRegex)
  if (linkedin && linkedin.length > 0) {
    resumeData.personalInfo.linkedin = linkedin[0]
  }
  
  // Extract website URL
  const websiteRegex = /(?:https?:\/\/)?(?:www\.)?[\w-]+\.[\w.-]+/gi
  const websites = text.match(websiteRegex)
  if (websites && websites.length > 0) {
    const website = websites.find(w => !w.includes('linkedin.com') && !w.includes('@'))
    if (website) {
      resumeData.personalInfo.website = website.startsWith('http') ? website : `https://${website}`
    }
  }
  
  // Try to extract name (usually first line or first few words)
  if (lines.length > 0) {
    const firstLine = lines[0]
    // If first line doesn't look like an email or phone, it might be the name
    if (!emailRegex.test(firstLine) && !phoneRegex.test(firstLine) && firstLine.length < 50) {
      resumeData.personalInfo.fullName = firstLine
    }
  }
  
  // Extract summary (look for common summary keywords)
  const summaryKeywords = ['summary', 'objective', 'profile', 'about']
  let summaryStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (summaryKeywords.some(keyword => lines[i].toLowerCase().includes(keyword))) {
      summaryStart = i
      break
    }
  }
  
  if (summaryStart !== -1 && summaryStart < lines.length - 1) {
    let summaryLines = []
    for (let i = summaryStart + 1; i < lines.length; i++) {
      // Stop at next section (usually starts with capital letters or common section headers)
      if (lines[i].length > 0 && 
          (lines[i].toUpperCase() === lines[i] || 
           ['experience', 'education', 'skills', 'projects', 'work', 'employment'].some(header => 
             lines[i].toLowerCase().includes(header)))) {
        break
      }
      summaryLines.push(lines[i])
    }
    resumeData.personalInfo.summary = summaryLines.join(' ')
  }
  
  // Extract experience (look for experience/work section)
  const experienceKeywords = ['experience', 'work experience', 'employment', 'employment history', 'professional experience']
  let expStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (experienceKeywords.some(keyword => lines[i].toLowerCase().includes(keyword))) {
      expStart = i
      break
    }
  }
  
  if (expStart !== -1) {
    // Simple extraction - look for job titles and companies
    // This is basic and may need refinement
    for (let i = expStart + 1; i < Math.min(expStart + 20, lines.length); i++) {
      const line = lines[i]
      // Look for date patterns
      const datePattern = /\d{4}|\w+\s+\d{4}|present|current/gi
      if (datePattern.test(line) && line.length < 100) {
        // This might be a job entry
        const prevLine = i > 0 ? lines[i - 1] : ''
        if (prevLine && prevLine.length > 0) {
          resumeData.experience.push({
            position: prevLine,
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
          })
        }
      }
    }
  }
  
  // Extract education
  const educationKeywords = ['education', 'academic', 'qualifications']
  let eduStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (educationKeywords.some(keyword => lines[i].toLowerCase().includes(keyword))) {
      eduStart = i
      break
    }
  }
  
  if (eduStart !== -1) {
    for (let i = eduStart + 1; i < Math.min(eduStart + 15, lines.length); i++) {
      const line = lines[i]
      const degreeKeywords = ['bachelor', 'master', 'phd', 'doctorate', 'degree', 'diploma', 'certificate']
      if (degreeKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
        resumeData.education.push({
          degree: line,
          field: '',
          school: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: ''
        })
      }
    }
  }
  
  // Extract skills (look for skills section)
  const skillsKeywords = ['skills', 'technical skills', 'competencies', 'expertise']
  let skillsStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (skillsKeywords.some(keyword => lines[i].toLowerCase().includes(keyword))) {
      skillsStart = i
      break
    }
  }
  
  if (skillsStart !== -1) {
    // Look for skill lists (usually comma-separated or bullet points)
    for (let i = skillsStart + 1; i < Math.min(skillsStart + 10, lines.length); i++) {
      const line = lines[i]
      if (line.includes(',') || line.includes('•') || line.includes('-')) {
        const skills = line.split(/[,•\-]/).map(s => s.trim()).filter(s => s.length > 0)
        if (skills.length > 0) {
          resumeData.skills.push({
            category: 'Technical Skills',
            items: skills
          })
        }
      }
    }
  }
  
  return resumeData
}

/**
 * Main function to parse uploaded resume file
 */
export const parseResumeFile = async (file) => {
  const fileType = file.type
  const fileName = file.name.toLowerCase()
  
  let text = ''
  
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    text = await parsePDF(file)
  } else if (
    fileType === 'application/msword' || 
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileName.endsWith('.doc') || 
    fileName.endsWith('.docx')
  ) {
    text = await parseWord(file)
  } else {
    throw new Error('Unsupported file type. Please upload a PDF or Word document (.pdf, .doc, .docx)')
  }
  
  // Extract structured data from text
  const resumeData = extractResumeData(text)
  
  return resumeData
}

