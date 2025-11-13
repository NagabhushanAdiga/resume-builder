const TechnicalTemplate = ({ data }) => {
  return (
    <div className="bg-gray-50 p-8 shadow-lg font-mono" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <header className="bg-gray-900 text-green-400 p-6 rounded-lg mb-6">
        <div className="mb-2">
          <span className="text-green-500">$</span> <span className="text-white">whoami</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="text-sm space-y-1">
          {data.personalInfo?.email && <div><span className="text-green-500">email:</span> {data.personalInfo.email}</div>}
          {data.personalInfo?.phone && <div><span className="text-green-500">phone:</span> {data.personalInfo.phone}</div>}
          {data.personalInfo?.github && <div><span className="text-green-500">github:</span> {data.personalInfo.github}</div>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-6 bg-white p-4 rounded border-l-4 border-green-500">
          <div className="text-green-600 font-bold mb-2">// Professional Summary</div>
          <p className="text-gray-700 text-sm">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Tech Stack */}
      {data.skills?.length > 0 && (
        <section className="mb-6 bg-white p-4 rounded border-l-4 border-blue-500">
          <div className="text-blue-600 font-bold mb-3">// Tech Stack</div>
          {data.skills.map((skillCat, index) => (
            <div key={index} className="mb-2">
              <span className="text-gray-800 font-bold text-sm">{skillCat.category}:</span>
              <div className="ml-4 text-xs text-gray-600 mt-1">
                {skillCat.items.map((item, i) => (
                  <span key={i} className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-1">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <div className="text-purple-600 font-bold mb-3 text-lg">// Work Experience</div>
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-white p-4 rounded mb-3 border-l-4 border-purple-500">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{exp.company}</p>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono">{exp.description}</pre>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <div className="text-orange-600 font-bold mb-3 text-lg">// Projects</div>
          {data.projects.map((project, index) => (
            <div key={index} className="bg-white p-4 rounded mb-3 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-1">{project.name}</h3>
              <p className="text-xs text-gray-700 mb-2">{project.description}</p>
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section>
          <div className="text-red-600 font-bold mb-3 text-lg">// Education</div>
          {data.education.map((edu, index) => (
            <div key={index} className="bg-white p-4 rounded mb-2 border-l-4 border-red-500">
              <h3 className="font-bold text-gray-900 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-xs text-gray-700">{edu.school} • {edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default TechnicalTemplate;

