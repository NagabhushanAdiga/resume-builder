import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { defaultResumeData, sampleResumes } from '../data/mockData'

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

const Templates = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templateColors, setTemplateColors] = useState({})
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [previewScale, setPreviewScale] = useState(0.75)

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth
      if (width < 640) {
        setPreviewScale(0.4)
      } else if (width < 1024) {
        setPreviewScale(0.6)
      } else if (width < 1280) {
        setPreviewScale(0.75)
      } else {
        setPreviewScale(0.85)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      category: 'professional',
      description: 'Clean and contemporary design perfect for tech roles',
      color: 'from-blue-500 to-blue-600',
      icon: '💼'
    },
    {
      id: 'timeline',
      name: 'Timeline',
      category: 'professional',
      description: 'Visual timeline layout with side-by-side columns',
      color: 'from-blue-600 to-indigo-600',
      icon: '📅'
    },
    {
      id: 'twocolumn',
      name: 'Two Column',
      category: 'professional',
      description: 'Two-column layout with sidebar for skills',
      color: 'from-purple-600 to-pink-600',
      icon: '📑'
    },
    {
      id: 'colorful',
      name: 'Colorful',
      category: 'creative',
      description: 'Vibrant and eye-catching with colorful accents',
      color: 'from-pink-500 to-purple-500',
      icon: '🌈'
    },
    {
      id: 'startup',
      name: 'Startup',
      category: 'creative',
      description: 'Modern startup style with bold accents',
      color: 'from-orange-500 to-red-500',
      icon: '🚀'
    },
    {
      id: 'finance',
      name: 'Finance',
      category: 'professional',
      description: 'Formal and conservative for finance roles',
      color: 'from-gray-800 to-gray-900',
      icon: '💰'
    },
    {
      id: 'classic',
      name: 'Classic',
      category: 'traditional',
      description: 'Timeless design suitable for any industry',
      color: 'from-gray-700 to-gray-800',
      icon: '📋'
    },
    {
      id: 'professional',
      name: 'Professional',
      category: 'professional',
      description: 'Formal and polished for corporate positions',
      color: 'from-indigo-500 to-indigo-600',
      icon: '👔'
    },
    {
      id: 'creative',
      name: 'Creative',
      category: 'creative',
      description: 'Stand out with bold design choices',
      color: 'from-purple-500 to-pink-500',
      icon: '🎨'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      category: 'simple',
      description: 'Less is more - focus on content',
      color: 'from-slate-500 to-slate-600',
      icon: '⚪'
    },
    {
      id: 'executive',
      name: 'Executive',
      category: 'professional',
      description: 'Premium design for senior positions',
      color: 'from-amber-600 to-amber-700',
      icon: '👑'
    },
    {
      id: 'technical',
      name: 'Technical',
      category: 'professional',
      description: 'Optimized for developers and engineers',
      color: 'from-green-500 to-green-600',
      icon: '💻'
    },
    {
      id: 'designer',
      name: 'Designer',
      category: 'creative',
      description: 'Showcase your creative portfolio',
      color: 'from-fuchsia-500 to-fuchsia-600',
      icon: '✨'
    },
    {
      id: 'academic',
      name: 'Academic',
      category: 'traditional',
      description: 'Perfect for research and education roles',
      color: 'from-blue-700 to-blue-800',
      icon: '🎓'
    },
    {
      id: 'simple',
      name: 'Simple',
      category: 'simple',
      description: 'Straightforward and easy to read',
      color: 'from-gray-500 to-gray-600',
      icon: '📄'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      category: 'creative',
      description: 'Sophisticated and refined',
      color: 'from-rose-500 to-rose-600',
      icon: '💎'
    },
    {
      id: 'bold',
      name: 'Bold',
      category: 'creative',
      description: 'Make a strong first impression',
      color: 'from-red-500 to-red-600',
      icon: '🔥'
    },
    {
      id: 'compact',
      name: 'Compact',
      category: 'simple',
      description: 'Fit more content in less space',
      color: 'from-teal-500 to-teal-600',
      icon: '📦'
    },
    {
      id: 'stylish',
      name: 'Stylish',
      category: 'creative',
      description: 'Trendy and eye-catching',
      color: 'from-violet-500 to-violet-600',
      icon: '✌️'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      category: 'professional',
      description: 'Traditional business format',
      color: 'from-cyan-600 to-cyan-700',
      icon: '🏢'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Templates', icon: '📚' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'simple', label: 'Simple', icon: '📄' },
    { id: 'traditional', label: 'Traditional', icon: '📋' }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Green', primary: '#10B981', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Purple', primary: '#8B5CF6', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Red', primary: '#EF4444', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Orange', primary: '#F59E0B', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Teal', primary: '#14B8A6', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Pink', primary: '#EC4899', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Indigo', primary: '#6366F1', text: '#1F2937', secondary: '#6B7280' },
    { name: 'Dark', primary: '#1F2937', text: '#1F2937', secondary: '#4B5563' }
  ]

  const handleSelectTemplate = (templateId, colors = null) => {
    const defaultColors = {
      primary: '#3B82F6',
      text: '#1F2937',
      secondary: '#6B7280'
    }
    
    const selectedColors = colors || templateColors[templateId] || defaultColors
    const colorsParam = encodeURIComponent(JSON.stringify(selectedColors))
    navigate(`/editor?template=${templateId}&colors=${colorsParam}`)
  }

  const handleColorChange = (templateId, colorType, value) => {
    setTemplateColors(prev => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        [colorType]: value,
        primary: prev[templateId]?.primary || '#3B82F6',
        text: prev[templateId]?.text || '#1F2937',
        secondary: prev[templateId]?.secondary || '#6B7280'
      }
    }))
  }

  const handlePresetColor = (templateId, preset) => {
    setTemplateColors(prev => ({
      ...prev,
      [templateId]: preset
    }))
  }

  const handlePreviewTemplate = (templateId) => {
    setPreviewTemplate(templateId)
  }

  const handleClosePreview = () => {
    setPreviewTemplate(null)
  }

  const handleUseFromPreview = (templateId) => {
    const currentColors = templateColors[templateId] || {
      primary: '#3B82F6',
      text: '#1F2937',
      secondary: '#6B7280'
    }
    handleSelectTemplate(templateId, currentColors)
    setPreviewTemplate(null)
  }

  // Get sample data for preview (so users can see how template looks with content)
  const getPreviewData = (templateId) => {
    const sampleData = sampleResumes[0]
    const currentColors = templateColors[templateId] || {
      primary: '#3B82F6',
      text: '#1F2937',
      secondary: '#6B7280'
    }
    return {
      ...sampleData,
      template: templateId,
      colors: currentColors
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sticky top-0 z-10 shadow-lg">
        <div className="w-full px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Left Side - Logo & Title */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-blue-100 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium text-sm sm:text-base hidden sm:inline">Dashboard</span>
                </button>
                <div className="h-6 sm:h-8 w-px bg-white/20 hidden sm:block"></div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg">Choose Your Template</h1>
                  <p className="text-xs sm:text-sm text-blue-100 hidden sm:block">Select a design that best represents you</p>
                </div>
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
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden xs:inline">My Resumes</span>
              </button>
              <div className="h-6 sm:h-8 w-px bg-white/20 hidden sm:block"></div>
              <button
                onClick={logout}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-white/10 backdrop-blur-sm rounded-lg transition-all group border border-transparent hover:border-white/20"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full px-6 py-4 sm:py-6 lg:py-8">
        {/* Start with Blank Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Start from Scratch</h2>
                <p className="text-blue-100 text-base sm:text-lg">
                  Begin with a blank canvas and build your resume exactly how you want it
                </p>
              </div>
              <button
                onClick={() => navigate('/editor')}
                className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Start with Blank</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 font-medium text-sm sm:text-base">OR CHOOSE A TEMPLATE</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-2.5 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base sm:text-lg"
                />
                <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1 sm:mr-2">{category.icon}</span>
                  <span className="hidden xs:inline">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Showing <span className="font-semibold text-gray-900">{filteredTemplates.length}</span> template{filteredTemplates.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredTemplates.map((template) => {
              const currentColors = templateColors[template.id] || {
                primary: '#3B82F6',
                text: '#1F2937',
                secondary: '#6B7280'
              }
              const isSelected = selectedTemplate === template.id

              return (
                <div
                  key={template.id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Template Preview Card */}
                  <div className={`h-48 bg-gradient-to-br ${template.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    <div className="text-6xl relative z-10 transform group-hover:scale-110 transition-transform">
                      {template.icon}
                    </div>
                    {/* Preview Lines */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-2 opacity-20">
                      <div className="h-2 bg-white rounded w-3/4"></div>
                      <div className="h-2 bg-white rounded w-1/2"></div>
                      <div className="h-2 bg-white rounded w-2/3"></div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Color Customization */}
                    <div className="mb-4">
                      <button
                        onClick={() => setSelectedTemplate(isSelected ? null : template.id)}
                        className="w-full mb-2 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        {isSelected ? 'Hide Colors' : 'Customize Colors'}
                      </button>

                      {isSelected && (
                        <div className="p-3 bg-gray-50 rounded-lg space-y-3 border border-gray-200">
                          {/* Preset Colors */}
                          <div>
                            <label className="text-xs font-semibold text-gray-700 mb-2 block">Preset Colors</label>
                            <div className="flex flex-wrap gap-2">
                              {colorPresets.map((preset) => (
                                <button
                                  key={preset.name}
                                  onClick={() => handlePresetColor(template.id, preset)}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                                  style={{ backgroundColor: preset.primary }}
                                  title={preset.name}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Primary Color */}
                          <div>
                            <label className="text-xs font-semibold text-gray-700 mb-1 block">Primary Color</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={currentColors.primary}
                                onChange={(e) => handleColorChange(template.id, 'primary', e.target.value)}
                                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={currentColors.primary}
                                onChange={(e) => handleColorChange(template.id, 'primary', e.target.value)}
                                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="#3B82F6"
                              />
                            </div>
                          </div>

                          {/* Text Color */}
                          <div>
                            <label className="text-xs font-semibold text-gray-700 mb-1 block">Text Color</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={currentColors.text}
                                onChange={(e) => handleColorChange(template.id, 'text', e.target.value)}
                                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={currentColors.text}
                                onChange={(e) => handleColorChange(template.id, 'text', e.target.value)}
                                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="#1F2937"
                              />
                            </div>
                          </div>

                          {/* Secondary Color */}
                          <div>
                            <label className="text-xs font-semibold text-gray-700 mb-1 block">Secondary Color</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={currentColors.secondary}
                                onChange={(e) => handleColorChange(template.id, 'secondary', e.target.value)}
                                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={currentColors.secondary}
                                onChange={(e) => handleColorChange(template.id, 'secondary', e.target.value)}
                                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="#6B7280"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePreviewTemplate(template.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => handleSelectTemplate(template.id, currentColors)}
                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        <span>Use</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewTemplate && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
          onClick={handleClosePreview}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Preview: {templates.find(t => t.id === previewTemplate)?.name || 'Template'}
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                  See how your resume will look with this template (sample data shown)
                </p>
              </div>
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 mr-4 bg-white/10 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setPreviewScale(prev => Math.max(0.3, prev - 0.1))}
                  className="text-white hover:bg-white/20 p-1.5 rounded transition-colors"
                  title="Zoom Out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                <span className="text-white text-xs font-medium px-2 min-w-[3rem] text-center">
                  {Math.round(previewScale * 100)}%
                </span>
                <button
                  onClick={() => setPreviewScale(prev => Math.min(1.2, prev + 0.1))}
                  className="text-white hover:bg-white/20 p-1.5 rounded transition-colors"
                  title="Zoom In"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleClosePreview}
                className="text-white hover:text-blue-100 transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close preview"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 bg-gray-100 flex items-start justify-center min-h-0">
              <div 
                className="bg-white shadow-2xl rounded-lg"
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top center',
                  width: '210mm',
                  minHeight: '297mm',
                  margin: '0 auto',
                  transition: 'transform 0.2s ease'
                }}
              >
                {(() => {
                  const TemplateComponent = templateComponents[previewTemplate]
                  const previewData = getPreviewData(previewTemplate)
                  return TemplateComponent ? (
                    <TemplateComponent data={previewData} />
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      Template preview not available
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 sm:p-6 border-t border-gray-200 bg-white">
              <button
                onClick={handleClosePreview}
                className="w-full sm:w-auto px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Close Preview
              </button>
              <button
                onClick={() => handleUseFromPreview(previewTemplate)}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <span>Use This Template</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Templates

