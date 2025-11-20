import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Import all templates
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import TechnicalTemplate from '../components/templates/TechnicalTemplate';
import DesignerTemplate from '../components/templates/DesignerTemplate';
import AcademicTemplate from '../components/templates/AcademicTemplate';
import SimpleTemplate from '../components/templates/SimpleTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import BoldTemplate from '../components/templates/BoldTemplate';
import CompactTemplate from '../components/templates/CompactTemplate';
import StylishTemplate from '../components/templates/StylishTemplate';
import CorporateTemplate from '../components/templates/CorporateTemplate';
import TimelineTemplate from '../components/templates/TimelineTemplate';
import TwoColumnTemplate from '../components/templates/TwoColumnTemplate';
import ColorfulTemplate from '../components/templates/ColorfulTemplate';
import StartupTemplate from '../components/templates/StartupTemplate';
import FinanceTemplate from '../components/templates/FinanceTemplate';

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
};

const ResumePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResume, currentResume } = useResume();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [exportType, setExportType] = useState('pdf'); // 'pdf' or 'word'
  const [pages, setPages] = useState([]);
  const resumeRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (id && id !== 'new') {
      const loadResume = async () => {
        try {
          const result = await fetchResume(id);
          setLoading(false);
          if (result.success && result.data) {
            // Ensure colors exist
            if (!result.data.colors) {
              result.data.colors = {
                primary: '#3B82F6',
                text: '#1F2937',
                secondary: '#6B7280'
              };
            }
          } else {
            console.error('Failed to load resume:', result.message);
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error loading resume:', error);
          setLoading(false);
          navigate('/dashboard');
        }
      };
      loadResume();
    } else {
      setLoading(false);
    }
  }, [id, fetchResume, navigate]);

  // Calculate pages based on content height
  useEffect(() => {
    if (contentRef.current && currentResume) {
      const calculatePages = () => {
        // Get the actual rendered height of the content
        const contentElement = contentRef.current;
        const contentHeight = contentElement.scrollHeight;
        
        // Convert 297mm (A4 height) to pixels
        // At 96 DPI: 1mm = 3.779527559 pixels
        // So 297mm = 297 * 3.779527559 = 1122.52 pixels
        // But we need to account for the actual rendered size
        // Since the element has width: 210mm, we can calculate based on that
        const mmToPx = 3.779527559; // 1mm in pixels at 96 DPI
        const a4HeightInPx = 297 * mmToPx; // ~1122.52px
        
        // Calculate number of pages needed
        const numPages = Math.ceil(contentHeight / a4HeightInPx);
        
        console.log('Content height:', contentHeight, 'px');
        console.log('A4 height:', a4HeightInPx, 'px');
        console.log('Number of pages:', numPages);
        
        setPages(Array.from({ length: Math.max(1, numPages) }, (_, i) => i));
      };
      
      // Wait for content to render, then recalculate on resize
      const timeoutId = setTimeout(calculatePages, 200);
      
      // Recalculate on window resize
      const handleResize = () => {
        setTimeout(calculatePages, 100);
      };
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [currentResume]);

  const handleDownloadPDF = async () => {
    if (!currentResume || !contentRef.current) return;

    setDownloading(true);
    try {
      // Store original styles
      const originalStyles = {
        position: contentRef.current.style.position,
        left: contentRef.current.style.left,
        top: contentRef.current.style.top,
        visibility: contentRef.current.style.visibility,
        zIndex: contentRef.current.style.zIndex,
        opacity: contentRef.current.style.opacity
      };

      // Temporarily make content visible and positioned for capture
      contentRef.current.style.position = 'fixed';
      contentRef.current.style.left = '0';
      contentRef.current.style.top = '0';
      contentRef.current.style.visibility = 'visible';
      contentRef.current.style.zIndex = '99999';
      contentRef.current.style.opacity = '1';
      contentRef.current.style.backgroundColor = '#ffffff';

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 300));

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const a4Width = 210; // A4 width in mm
      const a4Height = 297; // A4 height in mm
      
      // Capture the content with improved settings
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight,
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
        allowTaint: false,
        foreignObjectRendering: true
      });

      // Restore original styles
      Object.keys(originalStyles).forEach(key => {
        contentRef.current.style[key] = originalStyles[key] || '';
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('Failed to capture content - canvas is empty');
      }

      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgWidth = a4Width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Calculate how many pages we need
      const pageHeight = a4Height;
      const totalPages = Math.ceil(imgHeight / pageHeight);

      // Add pages to PDF
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const yOffset = -(i * pageHeight);
        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight, undefined, 'FAST');
      }
      
      const fileName = currentResume?.title || 'resume';
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error.message}. Please try again.`);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadWord = async () => {
    if (!currentResume) return;

    setDownloading(true);
    try {
      // Create HTML content for Word document
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20mm;
                width: 210mm;
              }
              h1 { color: ${currentResume.colors?.primary || '#3B82F6'}; }
              h2 { color: ${currentResume.colors?.primary || '#3B82F6'}; border-bottom: 2px solid ${currentResume.colors?.primary || '#3B82F6'}; padding-bottom: 5px; }
              p { color: ${currentResume.colors?.text || '#1F2937'}; }
              .section { margin-bottom: 20px; }
            </style>
          </head>
          <body>
            ${generateWordHTML(currentResume)}
          </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentResume.title || 'resume'}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Word document:', error);
      alert('Error generating Word document. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const escapeHtml = (text) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const generateWordHTML = (data) => {
    const colors = data.colors || { primary: '#3B82F6', text: '#1F2937', secondary: '#6B7280' };
    
    let html = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: ${colors.primary}; font-size: 28px; margin-bottom: 10px;">
          ${escapeHtml(data.personalInfo?.fullName || 'Your Name')}
        </h1>
        <div style="color: ${colors.secondary}; font-size: 12px;">
          ${data.personalInfo?.email ? `📧 ${escapeHtml(data.personalInfo.email)} | ` : ''}
          ${data.personalInfo?.phone ? `📱 ${escapeHtml(data.personalInfo.phone)} | ` : ''}
          ${data.personalInfo?.location ? `📍 ${escapeHtml(data.personalInfo.location)}` : ''}
        </div>
      </div>
    `;

    if (data.personalInfo?.summary) {
      html += `
        <div class="section">
          <h2 style="color: ${colors.primary}; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px;">
            Professional Summary
          </h2>
          <p style="color: ${colors.text}; line-height: 1.6;">${escapeHtml(data.personalInfo.summary)}</p>
        </div>
      `;
    }

    if (data.experience?.length > 0) {
      html += `<div class="section"><h2 style="color: ${colors.primary}; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px;">Experience</h2>`;
      data.experience.forEach(exp => {
        html += `
          <div style="margin-bottom: 15px;">
            <h3 style="color: ${colors.text}; font-size: 16px; margin-bottom: 5px;">${escapeHtml(exp.position)}</h3>
            <p style="color: ${colors.text}; font-weight: bold; margin-bottom: 3px;">${escapeHtml(exp.company)} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}</p>
            <p style="color: ${colors.secondary}; font-size: 12px; margin-bottom: 5px;">
              ${escapeHtml(exp.startDate)} - ${exp.current ? 'Present' : escapeHtml(exp.endDate)}
            </p>
            <p style="color: ${colors.text}; white-space: pre-line; line-height: 1.5;">${escapeHtml(exp.description || '')}</p>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (data.education?.length > 0) {
      html += `<div class="section"><h2 style="color: ${colors.primary}; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px;">Education</h2>`;
      data.education.forEach(edu => {
        html += `
          <div style="margin-bottom: 12px;">
            <h3 style="color: ${colors.text}; font-size: 16px; margin-bottom: 3px;">
              ${escapeHtml(edu.degree)} ${edu.field ? `in ${escapeHtml(edu.field)}` : ''}
            </h3>
            <p style="color: ${colors.text}; margin-bottom: 3px;">${escapeHtml(edu.school)} ${edu.location ? `• ${escapeHtml(edu.location)}` : ''}</p>
            <p style="color: ${colors.secondary}; font-size: 12px;">
              ${escapeHtml(edu.startDate)} - ${escapeHtml(edu.endDate)} ${edu.gpa ? `• GPA: ${escapeHtml(edu.gpa)}` : ''}
            </p>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (data.skills?.length > 0) {
      html += `<div class="section"><h2 style="color: ${colors.primary}; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px;">Skills</h2>`;
      data.skills.forEach(skillCat => {
        html += `
          <div style="margin-bottom: 10px;">
            <span style="color: ${colors.text}; font-weight: bold;">${escapeHtml(skillCat.category)}:</span>
            <span style="color: ${colors.text};"> ${skillCat.items.map(item => escapeHtml(item)).join(', ')}</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (data.projects?.length > 0) {
      html += `<div class="section"><h2 style="color: ${colors.primary}; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px;">Projects</h2>`;
      data.projects.forEach(project => {
        html += `
          <div style="margin-bottom: 12px;">
            <h3 style="color: ${colors.text}; font-size: 16px; margin-bottom: 3px;">${escapeHtml(project.name)}</h3>
            <p style="color: ${colors.text}; margin-bottom: 3px;">${escapeHtml(project.description || '')}</p>
            ${project.technologies?.length > 0 ? `<p style="color: ${colors.secondary}; font-size: 12px;">Technologies: ${project.technologies.map(t => escapeHtml(t)).join(', ')}</p>` : ''}
          </div>
        `;
      });
      html += `</div>`;
    }

    if (data.certifications?.length > 0) {
      html += `<div class="section"><h2 style="color: ${colors.primary}; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px;">Certifications</h2>`;
      data.certifications.forEach(cert => {
        html += `
          <div style="margin-bottom: 10px;">
            <h3 style="color: ${colors.text}; font-size: 14px;">${escapeHtml(cert.name)}</h3>
            <p style="color: ${colors.secondary}; font-size: 12px;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</p>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (data.languages?.length > 0) {
      html += `<div class="section"><h2 style="color: ${colors.primary}; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px;">Languages</h2>`;
      data.languages.forEach(lang => {
        html += `
          <div style="margin-bottom: 5px;">
            <span style="color: ${colors.text};">${escapeHtml(lang.language)}</span>
            <span style="color: ${colors.secondary}; margin-left: 10px;">(${escapeHtml(lang.proficiency)})</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    return html;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const TemplateComponent = currentResume?.template 
    ? templateComponents[currentResume.template] 
    : ModernTemplate;

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
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-blue-100 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium text-sm sm:text-base hidden sm:inline">Back</span>
                </button>
                <div className="h-6 sm:h-8 w-px bg-white/20 hidden sm:block"></div>
                <h1 className="text-base sm:text-xl font-bold text-white drop-shadow-lg truncate">
                  {currentResume?.title || 'Resume Preview'}
                </h1>
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
              {pages.length > 0 && (
                <>
                  <span className="text-xs sm:text-sm text-white/90 whitespace-nowrap hidden sm:inline">
                    {pages.length} page{pages.length !== 1 ? 's' : ''}
                  </span>
                  <div className="h-6 sm:h-8 w-px bg-white/20 hidden sm:block"></div>
                </>
              )}
              <button
                onClick={() => navigate(`/editor/${id}`)}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="hidden sm:inline">Edit</span>
              </button>
              <div className="h-6 sm:h-8 w-px bg-white/20 hidden sm:block"></div>
              
              {/* Export Type Dropdown */}
              <div className="relative">
                <select
                  value={exportType}
                  onChange={(e) => setExportType(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs sm:text-sm appearance-none pr-8 cursor-pointer"
                  disabled={downloading}
                >
                  <option value="pdf" className="bg-gray-800 text-white">PDF</option>
                  <option value="word" className="bg-gray-800 text-white">Word</option>
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <button
                onClick={exportType === 'pdf' ? handleDownloadPDF : handleDownloadWord}
                disabled={downloading}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-medium text-xs sm:text-sm shadow-lg"
              >
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="hidden sm:inline">Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden xs:inline">Download {exportType.toUpperCase()}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Area */}
      <main className="flex-1 overflow-auto py-4 sm:py-6 lg:py-8 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full">
          {currentResume ? (
            <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 flex-wrap">
              {/* Hidden full content for PDF generation and height calculation */}
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
                <TemplateComponent data={currentResume} />
              </div>

              {/* Visible paginated preview */}
              {pages.map((pageNum) => {
                // Calculate the offset for this page in pixels
                // Each page is 297mm tall, so we offset by pageNum * 297mm
                const mmToPx = 3.779527559;
                const pageHeightInPx = 297 * mmToPx;
                const offsetInPx = pageNum * pageHeightInPx;
                
                return (
                  <div
                    key={pageNum}
                    className="bg-white shadow-2xl"
                    style={{
                      width: '210mm',
                      height: '297mm',
                      overflow: 'hidden',
                      position: 'relative',
                      margin: '0 auto',
                      boxSizing: 'border-box',
                      pageBreakAfter: 'always'
                    }}
                  >
                    <div
                      ref={pageNum === 0 ? resumeRef : null}
                      style={{
                        transform: `translateY(-${offsetInPx}px)`,
                        width: '210mm',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                    >
                      <TemplateComponent data={currentResume} />
                    </div>
                    
                    {/* Page number indicator */}
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-gray-800 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                      Page {pageNum + 1} of {pages.length}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white shadow-xl rounded-xl p-20 text-center max-w-2xl mx-auto">
              <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl text-gray-500">No resume data available</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumePreview;

