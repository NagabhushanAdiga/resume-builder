const TwoColumnTemplate = ({ data }) => {
  const colors = data.colors || {
    primary: '#3B82F6',
    text: '#1F2937',
    secondary: '#6B7280'
  };

  return (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm 20mm', boxSizing: 'border-box', margin: 0 }}>
      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>{data.personalInfo?.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-3 text-sm" style={{ color: colors.secondary }}>
              {data.personalInfo?.email && <span>📧 {data.personalInfo.email}</span>}
              {data.personalInfo?.phone && <span>📱 {data.personalInfo.phone}</span>}
              {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
            </div>
          </header>

          {/* Summary */}
          {data.personalInfo?.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>Summary</h2>
              <p className="text-sm leading-relaxed" style={{ color: colors.text }}>{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary, borderBottom: `3px solid ${colors.primary}`, paddingBottom: '5px' }}>
                Professional Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-5 avoid-page-break">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{exp.position}</h3>
                      <p className="font-medium text-sm" style={{ color: colors.text }}>{exp.company}</p>
                    </div>
                    <p className="text-xs whitespace-nowrap ml-4" style={{ color: colors.secondary }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <p className="whitespace-pre-line text-sm" style={{ color: colors.text }}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary, borderBottom: `3px solid ${colors.primary}`, paddingBottom: '5px' }}>
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 avoid-page-break">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-sm" style={{ color: colors.text }}>{edu.school}</p>
                    </div>
                    <p className="text-xs whitespace-nowrap ml-4" style={{ color: colors.secondary }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  {edu.gpa && <p className="text-xs" style={{ color: colors.secondary }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary, borderBottom: `3px solid ${colors.primary}`, paddingBottom: '5px' }}>
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>{project.name}</h3>
                  <p className="text-sm mb-1" style={{ color: colors.text }}>{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <p className="text-xs" style={{ color: colors.secondary }}>
                      Tech: {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div style={{ width: '70mm', backgroundColor: `${colors.primary}08`, padding: '15px', borderRadius: '8px' }}>
          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Skills</h2>
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm mb-2" style={{ color: colors.text }}>{skillCat.category}</h3>
                  <ul className="list-disc list-inside text-xs space-y-1" style={{ color: colors.text }}>
                    {skillCat.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-sm mb-1" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-xs" style={{ color: colors.secondary }}>{cert.issuer}</p>
                  <p className="text-xs" style={{ color: colors.secondary }}>{cert.date}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: colors.text }}>{lang.language}</span>
                    <span className="capitalize text-xs" style={{ color: colors.secondary }}>{lang.proficiency}</span>
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

export default TwoColumnTemplate;

