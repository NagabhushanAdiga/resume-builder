const ElegantTemplate = ({ data }) => {
  return (
    <div className="bg-white p-10 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Elegant Header with serif font */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-serif text-gray-900 mb-3">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-3"></div>
        <div className="text-sm text-gray-600 space-x-3">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>•</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>•</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      {data.personalInfo?.summary && (
        <section className="mb-6 text-center">
          <p className="text-gray-700 italic leading-relaxed max-w-3xl mx-auto">{data.personalInfo.summary}</p>
        </section>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-serif text-center text-gray-900 mb-4">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700 italic">{exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              </div>
              <p className="text-sm text-gray-700 text-center max-w-2xl mx-auto whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-serif text-center text-gray-900 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3 text-center">
              <h3 className="font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-sm text-gray-700 italic">{edu.school}</p>
              <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {data.skills?.length > 0 && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
          <section>
            <h2 className="text-2xl font-serif text-center text-gray-900 mb-4">Skills</h2>
            <div className="max-w-2xl mx-auto">
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-2 text-center">
                  <span className="font-semibold text-gray-900">{skillCat.category}:</span>
                  <span className="text-gray-700 ml-2">{skillCat.items.join(' • ')}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default ElegantTemplate

