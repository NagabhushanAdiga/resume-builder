import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import { useAuth } from '../context/AuthContext'
import { calculateATSScore } from '../utils/atsScore'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm from '../components/forms/EducationForm'
import SkillsForm from '../components/forms/SkillsForm'
import ProjectsForm from '../components/forms/ProjectsForm'
import CertificationsForm from '../components/forms/CertificationsForm'
import LanguagesForm from '../components/forms/LanguagesForm'

// Import all templates
import ModernTemplate from '../components/templates/ModernTemplate'
import ClassicTemplate from '../components/templates/ClassicTemplate'
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate'
import CreativeTemplate from '../components/templates/CreativeTemplate'
import MinimalTemplate from '../components/templates/MinimalTemplate'
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate'
import TechnicalTemplate from '../components/templates/TechnicalTemplate'
import DesignerTemplate from '../components/templates/DesignerTemplate'
import AcademicTemplate from '../components/templates/AcademicTemplate'
import SimpleTemplate from '../components/templates/SimpleTemplate'
import ElegantTemplate from '../components/templates/ElegantTemplate'
import BoldTemplate from '../components/templates/BoldTemplate'
import CompactTemplate from '../components/templates/CompactTemplate'
import StylishTemplate from '../components/templates/StylishTemplate'
import CorporateTemplate from '../components/templates/CorporateTemplate'
import TimelineTemplate from '../components/templates/TimelineTemplate'
import TwoColumnTemplate from '../components/templates/TwoColumnTemplate'
import ColorfulTemplate from '../components/templates/ColorfulTemplate'
import StartupTemplate from '../components/templates/StartupTemplate'
import FinanceTemplate from '../components/templates/FinanceTemplate'

const templateComponents = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  technical: TechnicalTemplate,
  designer: DesignerTemplate,
  academic: AcademicTemplate,
  simple: SimpleTemplate,
  elegant: ElegantTemplate,
  bold: BoldTemplate,
  compact: CompactTemplate,
  stylish: StylishTemplate,
  corporate: CorporateTemplate,
  timeline: TimelineTemplate,
  twocolumn: TwoColumnTemplate,
  colorful: ColorfulTemplate,
  startup: StartupTemplate,
  finance: FinanceTemplate
}

const ResumeEditor = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { fetchResume, createResume, updateResume, currentResume } = useResume()
  const { user } = useAuth()
  
  const [activeSection, setActiveSection] = useState('personal')
  const [saving, setSaving] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [showATSScore, setShowATSScore] = useState(false)
  const [pages, setPages] = useState([0])
  const previewRef = useRef()
  const contentRef = useRef()
  const [resumeData, setResumeData] = useState({
    title: 'My Resume',
    template: 'modern',
    colors: {
      primary: '#3B82F6',    // Header/accent color
      text: '#1F2937',       // Main text color
      secondary: '#6B7280'   // Secondary/footer text
    },
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  })

  // Calculate ATS Score
  const atsScore = useMemo(() => {
    try {
      return calculateATSScore(resumeData)
    } catch (error) {
      console.error('Error calculating ATS score:', error)
      return { score: 0, level: 'poor', levelColor: 'red', feedback: [], details: {} }
    }
  }, [resumeData])

  useEffect(() => {
    console.log('ResumeEditor useEffect triggered, id:', id)
    
    if (id) {
      // Small delay to ensure localStorage is ready
      const loadResume = async () => {
        try {
          // Wait a bit to ensure context is initialized
          await new Promise(resolve => setTimeout(resolve, 100))
          
          console.log('Loading resume with id:', id)
          const result = await fetchResume(id)
          console.log('Fetch result:', result)
          
          if (result.success && result.data) {
            console.log('Resume data loaded:', result.data)
            // Ensure colors exist in the data
            const dataWithColors = {
              ...result.data,
              colors: result.data.colors || {
                primary: '#3B82F6',
                text: '#1F2937',
                secondary: '#6B7280'
              }
            }
            setResumeData(dataWithColors)
            console.log('Resume data set in state')
          } else {
            console.error('Failed to load resume:', result.message)
            // Don't navigate immediately - maybe the resume just needs to be created
            // Show an error or allow user to create new
          }
        } catch (error) {
          console.error('Error loading resume:', error)
        }
      }
      loadResume()
    } else {
      // Reset to default when no id (new resume)
      const defaultColors = {
        primary: '#3B82F6',
        text: '#1F2937',
        secondary: '#6B7280'
      }

      // Check for colors query parameter
      const colorsParam = searchParams.get('colors')
      let colors = defaultColors
      if (colorsParam) {
        try {
          colors = JSON.parse(decodeURIComponent(colorsParam))
        } catch (e) {
          console.error('Error parsing colors:', e)
        }
      }

      setResumeData({
        title: 'My Resume',
        template: 'modern',
        colors: colors,
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
      })
      
      // Check for template query parameter
      const templateParam = searchParams.get('template')
      if (templateParam) {
        setResumeData(prev => ({ ...prev, template: templateParam, colors: colors }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, searchParams])

  // Calculate pages based on content height
  useEffect(() => {
    if (contentRef.current && resumeData) {
      const calculatePages = () => {
        // Get the actual rendered height of the content
        const contentElement = contentRef.current
        const contentHeight = contentElement.scrollHeight
        
        // Convert 297mm (A4 height) to pixels
        // At 96 DPI: 1mm = 3.779527559 pixels
        const mmToPx = 3.779527559 // 1mm in pixels at 96 DPI
        const a4HeightInPx = 297 * mmToPx // ~1122.52px
        
        // Calculate number of pages needed
        const numPages = Math.ceil(contentHeight / a4HeightInPx)
        
        setPages(Array.from({ length: Math.max(1, numPages) }, (_, i) => i))
      }
      
      // Wait for content to render, then recalculate on resize
      const timeoutId = setTimeout(calculatePages, 200)
      
      // Recalculate on window resize
      const handleResize = () => {
        setTimeout(calculatePages, 100)
      }
      window.addEventListener('resize', handleResize)
      
      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [resumeData])

  const handleSave = async () => {
    setSaving(true)
    let result
    if (id) {
      result = await updateResume(id, resumeData)
    } else {
      result = await createResume(resumeData)
    }
    setSaving(false)
    
    if (result.success) {
      if (!id) {
        navigate(`/editor/${result.data._id}`)
      }
    }
  }

  const updateField = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certifications', label: 'Certifications', icon: '📜' },
    { id: 'languages', label: 'Languages', icon: '🌐' },
    { id: 'colors', label: 'Colors', icon: '🎨' }
  ]

  const templates = [
    { id: 'modern', name: 'Modern', color: 'from-blue-500 to-blue-600' },
    { id: 'classic', name: 'Classic', color: 'from-gray-700 to-gray-800' },
    { id: 'professional', name: 'Professional', color: 'from-indigo-500 to-indigo-600' },
    { id: 'creative', name: 'Creative', color: 'from-purple-500 to-pink-500' },
    { id: 'minimal', name: 'Minimal', color: 'from-slate-500 to-slate-600' },
    { id: 'executive', name: 'Executive', color: 'from-amber-600 to-amber-700' },
    { id: 'technical', name: 'Technical', color: 'from-green-500 to-green-600' },
    { id: 'designer', name: 'Designer', color: 'from-fuchsia-500 to-fuchsia-600' },
    { id: 'academic', name: 'Academic', color: 'from-blue-700 to-blue-800' },
    { id: 'simple', name: 'Simple', color: 'from-gray-500 to-gray-600' },
    { id: 'elegant', name: 'Elegant', color: 'from-rose-500 to-rose-600' },
    { id: 'bold', name: 'Bold', color: 'from-red-500 to-red-600' },
    { id: 'compact', name: 'Compact', color: 'from-teal-500 to-teal-600' },
    { id: 'stylish', name: 'Stylish', color: 'from-violet-500 to-violet-600' },
    { id: 'corporate', name: 'Corporate', color: 'from-cyan-600 to-cyan-700' },
    { id: 'timeline', name: 'Timeline', color: 'from-blue-600 to-indigo-600' },
    { id: 'twocolumn', name: 'Two Column', color: 'from-purple-600 to-pink-600' },
    { id: 'colorful', name: 'Colorful', color: 'from-rainbow-500 to-rainbow-600' },
    { id: 'startup', name: 'Startup', color: 'from-orange-500 to-red-500' },
    { id: 'finance', name: 'Finance', color: 'from-gray-800 to-gray-900' }
  ]

  const TemplateComponent = templateComponents[resumeData.template] || ModernTemplate

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sticky top-0 z-10 shadow-lg">
        <div className="w-full px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Left Side - Logo & Title */}
            <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-blue-100 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium text-sm sm:text-base hidden sm:inline">Back</span>
                </button>
                <div className="h-6 sm:h-8 w-px bg-white/20 hidden sm:block"></div>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
                  className="text-base sm:text-xl font-bold text-white bg-transparent border-b-2 border-transparent hover:border-white/50 focus:border-white outline-none px-1 sm:px-2 py-1 transition-colors flex-1 min-w-0 placeholder:text-white/70"
                  placeholder="Resume Title"
                />
              </div>
              
              <div className="hidden lg:flex h-10 w-px bg-white/20"></div>
              
              <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium text-white">
                  Welcome, <span className="font-bold">{user?.name}</span> 👋
                </span>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
                <span className="hidden sm:inline">Templates</span>
              </button>
              <button
                onClick={() => setShowATSScore(!showATSScore)}
                className={`hidden lg:flex px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors items-center gap-2 text-xs sm:text-sm font-medium ${
                  showATSScore 
                    ? 'bg-white/20 text-white border border-white/30' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
                title="ATS Score"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>ATS: {atsScore?.score || 0}%</span>
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`hidden lg:flex px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors items-center gap-2 text-xs sm:text-sm font-medium ${
                  showPreview 
                    ? 'bg-white/20 text-white border border-white/30' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <div className="h-6 sm:h-8 w-px bg-white/20 hidden sm:block"></div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 font-medium text-xs sm:text-sm shadow-lg"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Preview Button - Fixed at bottom */}
        <button
          onClick={() => navigate(`/preview/${id || 'new'}`)}
          className="lg:hidden fixed bottom-6 right-4 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all z-30 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Templates Drawer Overlay (Mobile) */}
        {isDrawerOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Templates Drawer */}
        <div 
          className={`bg-white border-r border-gray-200 transition-all duration-300 z-50 lg:z-auto ${
            isDrawerOpen ? 'w-64 lg:w-64' : 'w-0'
          } overflow-hidden fixed lg:relative inset-y-0 left-0 shadow-xl lg:shadow-none`}
        >
          <div className="h-full overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Templates</h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setResumeData(prev => ({ ...prev, template: template.id }))
                    setIsDrawerOpen(false) // Close drawer on mobile after selection
                  }}
                  className={`w-full text-left rounded-lg overflow-hidden transition-all ${
                    resumeData.template === template.id
                      ? 'ring-2 ring-blue-500 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className={`h-20 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                    <div className="text-white font-bold text-lg">{template.name.charAt(0)}</div>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-sm font-medium text-gray-900">{template.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Editor Section */}
        <div className={`flex-1 overflow-y-auto ${showPreview ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
          <div className="p-6">
            {/* Section Navigation Pills */}
            <div className="mb-4 sm:mb-6 flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm sm:text-base ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-base sm:text-lg">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              {activeSection === 'personal' && (
                <PersonalInfoForm
                  data={resumeData.personalInfo}
                  onChange={(data) => updateField('personalInfo', data)}
                />
              )}
              {activeSection === 'experience' && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) => updateField('experience', data)}
                />
              )}
              {activeSection === 'education' && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) => updateField('education', data)}
                />
              )}
              {activeSection === 'skills' && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) => updateField('skills', data)}
                />
              )}
              {activeSection === 'projects' && (
                <ProjectsForm
                  data={resumeData.projects}
                  onChange={(data) => updateField('projects', data)}
                />
              )}
              {activeSection === 'certifications' && (
                <CertificationsForm
                  data={resumeData.certifications}
                  onChange={(data) => updateField('certifications', data)}
                />
              )}
              {activeSection === 'languages' && (
                <LanguagesForm
                  data={resumeData.languages}
                  onChange={(data) => updateField('languages', data)}
                />
              )}
              {activeSection === 'colors' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Colors</h2>
                  <p className="text-gray-600 mb-6">Personalize your resume with custom colors</p>
                  
                  <div className="space-y-6">
                    {/* Primary Color */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Primary Color (Headers & Accents)
                      </label>
                      <p className="text-sm text-gray-600 mb-4">
                        Used for section headers, titles, and accent elements
                      </p>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={resumeData.colors.primary}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            colors: { ...prev.colors, primary: e.target.value }
                          }))}
                          className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={resumeData.colors.primary}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, primary: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                            placeholder="#3B82F6"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, primary: '#3B82F6' }
                              }))}
                              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Blue
                            </button>
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, primary: '#10B981' }
                              }))}
                              className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Green
                            </button>
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, primary: '#8B5CF6' }
                              }))}
                              className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                              Purple
                            </button>
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, primary: '#EF4444' }
                              }))}
                              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Red
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Text Color */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Text Color (Main Content)
                      </label>
                      <p className="text-sm text-gray-600 mb-4">
                        Used for body text, descriptions, and main content
                      </p>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={resumeData.colors.text}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            colors: { ...prev.colors, text: e.target.value }
                          }))}
                          className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={resumeData.colors.text}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, text: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                            placeholder="#1F2937"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, text: '#000000' }
                              }))}
                              className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-800"
                            >
                              Black
                            </button>
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, text: '#1F2937' }
                              }))}
                              className="px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700"
                            >
                              Dark Gray
                            </button>
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, text: '#374151' }
                              }))}
                              className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600"
                            >
                              Gray
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Secondary Color (Subtitles & Details)
                      </label>
                      <p className="text-sm text-gray-600 mb-4">
                        Used for dates, locations, and secondary information
                      </p>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={resumeData.colors.secondary}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            colors: { ...prev.colors, secondary: e.target.value }
                          }))}
                          className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={resumeData.colors.secondary}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, secondary: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                            placeholder="#6B7280"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, secondary: '#6B7280' }
                              }))}
                              className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                              Gray
                            </button>
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, secondary: '#9CA3AF' }
                              }))}
                              className="px-3 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                              Light Gray
                            </button>
                            <button
                              onClick={() => setResumeData(prev => ({
                                ...prev,
                                colors: { ...prev.colors, secondary: '#4B5563' }
                              }))}
                              className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                              Dark Gray
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="pt-4 border-t border-gray-300">
                      <button
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          colors: {
                            primary: '#3B82F6',
                            text: '#1F2937',
                            secondary: '#6B7280'
                          }
                        }))}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        Reset to Default Colors
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ATS Score Panel */}
        {showATSScore && (
          <div className="fixed lg:relative lg:block right-0 top-16 lg:top-0 w-full lg:w-80 bg-white border-l border-gray-200 shadow-xl lg:shadow-none z-40 h-[calc(100vh-4rem)] lg:h-auto overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ATS Score
                </h3>
                <button
                  onClick={() => setShowATSScore(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Score Display */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-3 ${
                  atsScore?.levelColor === 'green' ? 'bg-green-100 text-green-700' :
                  atsScore?.levelColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                  atsScore?.levelColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {atsScore?.score || 0}%
                </div>
                <p className="text-sm font-semibold text-gray-700 capitalize">{atsScore?.level || 'poor'}</p>
                <p className="text-xs text-gray-500 mt-1">ATS Compatibility</p>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-semibold text-gray-900">Checklist</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {atsScore?.details?.contactInfo ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={atsScore.details.contactInfo ? 'text-gray-700' : 'text-gray-400'}>Contact Information</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {atsScore?.details?.summary ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={atsScore.details.summary ? 'text-gray-700' : 'text-gray-400'}>Professional Summary</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {atsScore?.details?.experience ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={atsScore.details.experience ? 'text-gray-700' : 'text-gray-400'}>Work Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {atsScore?.details?.education ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={atsScore.details.education ? 'text-gray-700' : 'text-gray-400'}>Education</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {atsScore?.details?.skills ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={atsScore.details.skills ? 'text-gray-700' : 'text-gray-400'}>Skills</span>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {atsScore?.feedback && atsScore.feedback.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">Suggestions</h4>
                  {atsScore.feedback.map((item, index) => (
                    <div key={index} className={`p-3 rounded-lg text-sm ${
                      item.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
                      'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {item.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Preview Section */}
        {showPreview && (
          <div className="hidden lg:block lg:w-1/2 border-l border-gray-200 bg-gray-100 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Live Preview
                {pages.length > 1 && (
                  <span className="ml-auto text-xs text-gray-500 font-normal">
                    {pages.length} page{pages.length !== 1 ? 's' : ''}
                  </span>
                )}
              </h3>
            </div>
            <div className="p-6 flex justify-center items-start gap-4 flex-wrap">
              {/* Hidden full content for height calculation */}
              <div 
                ref={contentRef}
                style={{ 
                  position: 'absolute',
                  left: '-9999px',
                  top: '0',
                  width: '210mm',
                  visibility: 'hidden',
                  backgroundColor: '#ffffff'
                }}
              >
                <TemplateComponent data={resumeData} />
              </div>

              {/* Visible paginated preview */}
              {pages.map((pageNum) => {
                // Calculate the offset for this page in pixels
                const mmToPx = 3.779527559
                const pageHeightInPx = 297 * mmToPx
                const offsetInPx = pageNum * pageHeightInPx
                
                return (
                  <div
                    key={pageNum}
                    ref={pageNum === 0 ? previewRef : null}
                    className="bg-white shadow-2xl"
                    style={{
                      width: '210mm',
                      height: '297mm',
                      overflow: 'hidden',
                      position: 'relative',
                      transform: 'scale(0.85)',
                      transformOrigin: 'top center',
                      boxSizing: 'border-box',
                      pageBreakAfter: 'always'
                    }}
                  >
                    <div
                      style={{
                        transform: `translateY(-${offsetInPx}px)`,
                        width: '210mm',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                    >
                      <TemplateComponent data={resumeData} />
                    </div>
                    
                    {/* Page number indicator */}
                    {pages.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                        Page {pageNum + 1} of {pages.length}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeEditor

