const FinanceTemplate = ({ data }) => {
  const colors = data.colors || {
    primary: '#1F2937',
    text: '#1F2937',
    secondary: '#6B7280'
  }

  return (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm 20mm', boxSizing: 'border-box', margin: 0 }}>
      {/* Professional Header */}
      <header className="mb-6 pb-4" style={{ borderBottom: `3px double ${colors.primary}` }}>
        <h1 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: colors.primary, letterSpacing: '0.5px' }}>
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wide" style={{ color: colors.secondary }}>
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '3px' }}>
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: colors.text }}>{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '3px' }}>
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5 avoid-page-break">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="text-base font-bold" style={{ color: colors.text }}>{exp.position}</h3>
                  <p className="text-sm font-semibold" style={{ color: colors.primary }}>{exp.company}</p>
                </div>
                <p className="text-xs font-medium" style={{ color: colors.secondary }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: colors.text }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '3px' }}>
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 avoid-page-break">
                  <h3 className="text-base font-bold mb-1" style={{ color: colors.text }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-sm mb-1" style={{ color: colors.text }}>{edu.school}</p>
                  <p className="text-xs" style={{ color: colors.secondary }}>
                    {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '3px' }}>
                Certifications
              </h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="text-sm font-semibold" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-xs" style={{ color: colors.secondary }}>{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '3px' }}>
                Core Competencies
              </h2>
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-sm font-semibold mb-2" style={{ color: colors.text }}>{skillCat.category}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: colors.text }}>{skillCat.items.join(', ')}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '3px' }}>
                Languages
              </h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: colors.text }}>{lang.language}</span>
                    <span className="text-xs capitalize" style={{ color: colors.secondary }}>{lang.proficiency}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default FinanceTemplate

