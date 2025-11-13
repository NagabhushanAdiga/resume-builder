const ExecutiveTemplate = ({ data }) => {
  return (
    <div className="bg-white p-10 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header with Gold Accent */}
      <header className="mb-6 pb-4 border-b-4 border-yellow-600">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <p className="text-lg text-yellow-700 font-semibold mb-3">{data.experience?.[0]?.position || 'Executive Leader'}</p>
        <div className="flex gap-6 text-sm text-gray-700">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>|</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>|</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Executive Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-yellow-700 mb-3 uppercase tracking-wider">Executive Summary</h2>
          <p className="text-gray-800 leading-relaxed text-justify">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-yellow-700 mb-3 uppercase tracking-wider">Professional Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 pl-4 border-l-4 border-yellow-600">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600 whitespace-nowrap">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-base font-semibold text-gray-700 mb-2">{exp.company} {exp.location && `• ${exp.location}`}</p>
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-yellow-700 mb-3 uppercase tracking-wider">Education & Credentials</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-gray-700">{edu.school} {edu.location && `• ${edu.location}`} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
              <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {/* Core Competencies */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-yellow-700 mb-3 uppercase tracking-wider">Core Competencies</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skillCat, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900 mb-1">{skillCat.category}</h3>
                <p className="text-sm text-gray-700">{skillCat.items.join(' • ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExecutiveTemplate;

