import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
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
  corporate: CorporateTemplate
};

const ResumePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResume, currentResume } = useResume();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [pages, setPages] = useState([]);
  const resumeRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (id && id !== 'new') {
      fetchResume(id).then((result) => {
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
        }
      });
    } else {
      setLoading(false);
    }
  }, [id, fetchResume]);

  // Calculate pages based on content height
  useEffect(() => {
    if (contentRef.current && currentResume) {
      const calculatePages = () => {
        const contentHeight = contentRef.current.scrollHeight;
        const a4HeightInPx = 1122; // A4 height at 96dpi (~297mm)
        const numPages = Math.ceil(contentHeight / a4HeightInPx);
        setPages(Array.from({ length: Math.max(1, numPages) }, (_, i) => i));
      };
      
      // Wait for content to render
      setTimeout(calculatePages, 100);
    }
  }, [currentResume]);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setDownloading(true);
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const a4Width = 210; // A4 width in mm
      const a4Height = 297; // A4 height in mm
      
      // Capture the entire content
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowHeight: contentRef.current.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
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
        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
      }
      
      const fileName = currentResume?.title || 'resume';
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
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
      <header className="bg-white shadow-sm">
        <div className="w-full px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1 sm:gap-2 transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm sm:text-base">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate flex-1">
                {currentResume?.title || 'Resume Preview'}
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {pages.length > 0 && (
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {pages.length} page{pages.length !== 1 ? 's' : ''}
                </span>
              )}
              <button
                onClick={() => navigate(`/editor/${id}`)}
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex-1 sm:flex-initial px-3 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-medium text-sm"
              >
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="hidden sm:inline">Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden xs:inline">Download</span>
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
              {/* Hidden full content for PDF generation */}
              <div 
                ref={contentRef}
                style={{ 
                  position: 'absolute',
                  left: '-9999px',
                  width: '210mm'
                }}
              >
                <TemplateComponent data={currentResume} />
              </div>

              {/* Visible paginated preview */}
              {pages.map((pageNum) => (
                <div
                  key={pageNum}
                  className="bg-white shadow-2xl"
                  style={{
                    width: '100%',
                    maxWidth: '210mm',
                    minHeight: '297mm',
                    maxHeight: '297mm',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <div
                    ref={pageNum === 0 ? resumeRef : null}
                    className="sm:transform-none"
                    style={{
                      transform: `translateY(-${pageNum * 297}mm)`,
                      width: '100%'
                    }}
                  >
                    <TemplateComponent data={currentResume} />
                  </div>
                  
                  {/* Page number indicator */}
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-gray-800 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    Page {pageNum + 1}
                  </div>
                </div>
              ))}
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

