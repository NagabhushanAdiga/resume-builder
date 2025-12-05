const AcademicTemplate = ({ data }) => {
  return (
    <div className="bg-white p-10 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b-2 border-gray-900">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-700 space-x-2">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>•</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
        </div>
        {data.personalInfo?.website && (
          <div className="text-sm text-gray-700 mt-1">{data.personalInfo.website}</div>
        )}
      </header>

      {/* Research Interests */}
      {data.personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase">Research Interests</h2>
          <p className="text-gray-800 text-sm leading-relaxed text-justify">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-sm text-gray-700 italic">{edu.school} {edu.location && `• ${edu.location}`}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Academic Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase">Academic Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-700 italic mb-2">{exp.company} {exp.location && `• ${exp.location}`}</p>
              <p className="text-sm text-gray-700 text-justify whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Publications / Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase">Publications & Research</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700 italic text-justify">{project.description}</p>
              {project.link && <p className="text-xs text-gray-600 mt-1">{project.link}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills & Competencies */}
      {data.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase">Skills & Competencies</h2>
          {data.skills.map((skillCat, index) => (
            <div key={index} className="mb-1 text-sm">
              <span className="font-bold text-gray-900">{skillCat.category}:</span>
              <span className="text-gray-700 ml-1">{skillCat.items.join(', ')}</span>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase">Certifications & Awards</h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-2 text-sm">
              <span className="font-bold text-gray-900">{cert.name}</span>
              <span className="text-gray-700"> • {cert.issuer}</span>
              {cert.date && <span className="text-gray-600"> • {cert.date}</span>}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <section>
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase">Languages</h2>
          <div className="text-sm text-gray-700">
            {data.languages.map((lang, index) => (
              <span key={index}>
                {lang.language} ({lang.proficiency})
                {index < data.languages.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default AcademicTemplate

