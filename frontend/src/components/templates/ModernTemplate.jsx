const ModernTemplate = ({ data }) => {
  const colors = data.colors || {
    primary: '#3B82F6',
    text: '#1F2937',
    secondary: '#6B7280'
  };

  return (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm 20mm', boxSizing: 'border-box', margin: 0 }}>
      {/* Header */}
      <header className="pb-4 sm:pb-6 mb-4 sm:mb-6" style={{ borderBottom: `4px solid ${colors.primary}` }}>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: colors.text }}>
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm" style={{ color: colors.secondary }}>
          {data.personalInfo?.email && <span className="break-all">📧 {data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>📱 {data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
          {data.personalInfo?.website && <span className="break-all">🌐 {data.personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>
            Professional Summary
          </h2>
          <p className="leading-relaxed text-sm sm:text-base" style={{ color: colors.text }}>{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3 sm:mb-4 avoid-page-break">
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: colors.text }}>{exp.position}</h3>
              <p className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>
                {exp.company} {exp.location && `• ${exp.location}`}
              </p>
              <p className="text-xs sm:text-sm mb-2" style={{ color: colors.secondary }}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              <p className="whitespace-pre-line text-sm sm:text-base" style={{ color: colors.text }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2 sm:mb-3 avoid-page-break">
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: colors.text }}>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </h3>
              <p className="text-sm sm:text-base" style={{ color: colors.text }}>
                {edu.school} {edu.location && `• ${edu.location}`}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: colors.secondary }}>
                {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>Skills</h2>
          {data.skills.map((skillCat, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold text-sm sm:text-base" style={{ color: colors.text }}>{skillCat.category}:</span>
              <span className="ml-2 text-sm sm:text-base" style={{ color: colors.text }}>{skillCat.items.join(', ')}</span>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-2 sm:mb-3">
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: colors.text }}>{project.name}</h3>
              <p className="text-sm sm:text-base" style={{ color: colors.text }}>{project.description}</p>
              {project.technologies?.length > 0 && (
                <p className="text-xs sm:text-sm mt-1" style={{ color: colors.secondary }}>
                  Technologies: {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;

