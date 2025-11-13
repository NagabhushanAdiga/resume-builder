const SimpleTemplate = ({ data }) => {
  return (
    <div className="bg-white p-10 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="mt-2 text-sm text-gray-600 space-x-2">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>|</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>|</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      {data.personalInfo?.summary && (
        <section className="mb-5">
          <p className="text-gray-700 text-sm">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">WORK EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-900">{exp.position} - {exp.company}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `- ${edu.field}`}</h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-700">{edu.school}</p>
            </div>
          ))}
        </section>
      )}

      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">SKILLS</h2>
          {data.skills.map((skillCat, index) => (
            <div key={index} className="mb-1 text-sm">
              <span className="font-bold text-gray-900">{skillCat.category}:</span>
              <span className="text-gray-700 ml-1">{skillCat.items.join(', ')}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default SimpleTemplate;

