const TimelineTemplate = ({ data }) => {
  const colors = data.colors || {
    primary: '#3B82F6',
    text: '#1F2937',
    secondary: '#6B7280'
  };

  return (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm 20mm', boxSizing: 'border-box', margin: 0 }}>
      {/* Header with colored background */}
      <header className="mb-6" style={{ backgroundColor: colors.primary, color: 'white', padding: '20px', margin: '-15mm -20mm 20px -20mm' }}>
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 text-sm">
          {data.personalInfo?.email && <span>📧 {data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>📱 {data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary, borderLeft: `4px solid ${colors.primary}`, paddingLeft: '10px' }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: colors.text }}>{data.personalInfo.summary}</p>
        </section>
      )}

      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1">
          {/* Experience with Timeline */}
          {data.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary, borderLeft: `4px solid ${colors.primary}`, paddingLeft: '10px' }}>
                Experience
              </h2>
              <div className="relative pl-6" style={{ borderLeft: `2px solid ${colors.primary}` }}>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-6 relative avoid-page-break">
                    <div className="absolute -left-8 w-4 h-4 rounded-full" style={{ backgroundColor: colors.primary, top: '5px' }}></div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>{exp.position}</h3>
                    <p className="font-medium text-sm mb-1" style={{ color: colors.text }}>{exp.company}</p>
                    <p className="text-xs mb-2" style={{ color: colors.secondary }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="whitespace-pre-line text-sm" style={{ color: colors.text }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education with Timeline */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary, borderLeft: `4px solid ${colors.primary}`, paddingLeft: '10px' }}>
                Education
              </h2>
              <div className="relative pl-6" style={{ borderLeft: `2px solid ${colors.primary}` }}>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-4 relative avoid-page-break">
                    <div className="absolute -left-8 w-4 h-4 rounded-full" style={{ backgroundColor: colors.primary, top: '5px' }}></div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: colors.text }}>{edu.school}</p>
                    <p className="text-xs" style={{ color: colors.secondary }}>
                      {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ width: '80mm' }}>
          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary, borderBottom: `2px solid ${colors.primary}`, paddingBottom: '5px' }}>
                Skills
              </h2>
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm mb-2" style={{ color: colors.text }}>{skillCat.category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {skillCat.items.map((item, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary, borderBottom: `2px solid ${colors.primary}`, paddingBottom: '5px' }}>
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm mb-1" style={{ color: colors.text }}>{project.name}</h3>
                  <p className="text-xs mb-1" style={{ color: colors.text }}>{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <p className="text-xs" style={{ color: colors.secondary }}>
                      {project.technologies.join(' • ')}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary, borderBottom: `2px solid ${colors.primary}`, paddingBottom: '5px' }}>
                Certifications
              </h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-sm" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-xs" style={{ color: colors.secondary }}>{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary, borderBottom: `2px solid ${colors.primary}`, paddingBottom: '5px' }}>
                Languages
              </h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: colors.text }}>{lang.language}</span>
                    <span className="capitalize" style={{ color: colors.secondary }}>{lang.proficiency}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineTemplate;

