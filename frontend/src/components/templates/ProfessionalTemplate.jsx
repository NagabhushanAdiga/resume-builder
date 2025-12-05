const ProfessionalTemplate = ({ data }) => {
  return (
    <div className="bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-800 text-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo?.fullName || 'Your Name'}</h1>
            <p className="text-sm text-gray-300">{data.experience?.[0]?.position || 'Professional'}</p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 border-b border-gray-600 pb-2">Contact</h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo?.email && <p className="break-words">{data.personalInfo.email}</p>}
              {data.personalInfo?.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo?.location && <p>{data.personalInfo.location}</p>}
              {data.personalInfo?.linkedin && <p className="break-words">{data.personalInfo.linkedin}</p>}
            </div>
          </div>

          {/* Skills */}
          {data.skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-gray-600 pb-2">Skills</h2>
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-sm mb-1">{skillCat.category}</h3>
                  <ul className="text-xs space-y-1">
                    {skillCat.items.map((skill, i) => (
                      <li key={i}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-600 pb-2">Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-2 text-sm">
                  <span className="font-semibold">{lang.language}</span>
                  <span className="text-gray-300 ml-2 capitalize">({lang.proficiency})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {data.personalInfo?.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-800 pb-1">Profile</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-800 pb-1">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
                  <p className="text-xs text-gray-600 mb-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate} {exp.location && `• ${exp.location}`}
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-800 pb-1">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="text-base font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                  <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-800 pb-1">Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">{project.technologies.join(' • ')}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalTemplate

