const StartupTemplate = ({ data }) => {
  const colors = data.colors || {
    primary: '#3B82F6',
    text: '#1F2937',
    secondary: '#6B7280'
  }

  return (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm 20mm', boxSizing: 'border-box', margin: 0 }}>
      {/* Header with accent bar */}
      <header className="mb-6 relative">
        <div className="absolute left-0 top-0 bottom-0 w-2 rounded" style={{ backgroundColor: colors.primary }}></div>
        <div className="pl-6">
          <h1 className="text-4xl font-bold mb-2" style={{ color: colors.text }}>{data.personalInfo?.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.secondary }}>
            {data.personalInfo?.email && <span>✉️ {data.personalInfo.email}</span>}
            {data.personalInfo?.phone && <span>📞 {data.personalInfo.phone}</span>}
            {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
            {data.personalInfo?.linkedin && <span>💼 {data.personalInfo.linkedin}</span>}
            {data.personalInfo?.github && <span>💻 {data.personalInfo.github}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-6 p-4 rounded" style={{ backgroundColor: `${colors.primary}08`, borderLeft: `4px solid ${colors.primary}` }}>
          <p className="text-sm leading-relaxed italic" style={{ color: colors.text }}>"{data.personalInfo.summary}"</p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary }}>Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-5 avoid-page-break">
                  <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>{exp.position}</h3>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.primary }}>{exp.company}</p>
                  <p className="text-xs mb-2" style={{ color: colors.secondary }}>
                    {exp.startDate} → {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <p className="whitespace-pre-line text-sm" style={{ color: colors.text }}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary }}>Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 avoid-page-break">
                  <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>
                    {edu.degree} {edu.field && `- ${edu.field}`}
                  </h3>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.primary }}>{edu.school}</p>
                  <p className="text-xs" style={{ color: colors.secondary }}>
                    {edu.startDate} → {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                  </p>
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
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary }}>Skills</h2>
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-sm mb-2" style={{ color: colors.text }}>{skillCat.category}</h3>
                  <p className="text-sm" style={{ color: colors.text }}>{skillCat.items.join(' • ')}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary }}>Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-sm mb-1" style={{ color: colors.text }}>{project.name}</h3>
                  <p className="text-xs mb-1" style={{ color: colors.text }}>{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <p className="text-xs" style={{ color: colors.secondary }}>{project.technologies.join(' • ')}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary }}>Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold text-sm" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-xs" style={{ color: colors.secondary }}>{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary }}>Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: colors.text }}>{lang.language}</span>
                    <span className="uppercase text-xs font-semibold" style={{ color: colors.primary }}>{lang.proficiency}</span>
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

export default StartupTemplate

