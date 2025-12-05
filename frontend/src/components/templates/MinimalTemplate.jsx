const MinimalTemplate = ({ data }) => {
  return (
    <div className="bg-white p-12 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-2">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="flex gap-4 text-sm text-gray-600 font-light">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed font-light">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4 pb-2 border-b border-gray-200">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between">
                <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600 font-light">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-600 font-light whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4 pb-2 border-b border-gray-200">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-base font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <span className="text-sm text-gray-600 font-light">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-700">{edu.school}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-xl font-light text-gray-900 mb-4 pb-2 border-b border-gray-200">Skills</h2>
          {data.skills.map((skillCat, index) => (
            <div key={index} className="mb-2 text-sm">
              <span className="font-medium text-gray-900">{skillCat.category}</span>
              <span className="text-gray-600 font-light ml-2">{skillCat.items.join(', ')}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default MinimalTemplate

