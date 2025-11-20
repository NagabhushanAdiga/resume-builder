const ColorfulTemplate = ({ data }) => {
  const colors = data.colors || {
    primary: '#3B82F6',
    text: '#1F2937',
    secondary: '#6B7280'
  };

  return (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm 20mm', boxSizing: 'border-box', margin: 0 }}>
      {/* Colorful Header */}
      <header className="mb-6" style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
        color: 'white',
        padding: '25px',
        margin: '-15mm -20mm 20px -20mm',
        borderRadius: '0 0 15px 15px'
      }}>
        <h1 className="text-4xl font-bold mb-3">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo?.email && <span>📧 {data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>📱 {data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
          {data.personalInfo?.website && <span>🌐 {data.personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${colors.primary}10` }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>Professional Summary</h2>
          <p className="text-sm leading-relaxed" style={{ color: colors.text }}>{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.primary }}>
            <span className="w-1 h-8 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
            Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5 p-4 rounded-lg border-l-4 avoid-page-break" style={{ borderColor: colors.primary, backgroundColor: `${colors.primary}05` }}>
              <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>{exp.position}</h3>
              <p className="font-medium text-sm mb-2" style={{ color: colors.text }}>{exp.company}</p>
              <p className="text-xs mb-2 px-2 py-1 inline-block rounded" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              <p className="whitespace-pre-line text-sm mt-2" style={{ color: colors.text }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.primary }}>
            <span className="w-1 h-8 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 rounded-lg avoid-page-break" style={{ backgroundColor: `${colors.primary}05` }}>
              <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </h3>
              <p className="text-sm mb-1" style={{ color: colors.text }}>{edu.school}</p>
              <p className="text-xs" style={{ color: colors.secondary }}>
                {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.primary }}>
            <span className="w-1 h-8 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skillCat, index) => (
              skillCat.items.map((item, i) => (
                <span key={`${index}-${i}`} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.primary, color: 'white' }}>
                  {item}
                </span>
              ))
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.primary }}>
            <span className="w-1 h-8 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4 p-3 rounded-lg" style={{ backgroundColor: `${colors.primary}05` }}>
              <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>{project.name}</h3>
              <p className="text-sm mb-2" style={{ color: colors.text }}>{project.description}</p>
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ColorfulTemplate;

