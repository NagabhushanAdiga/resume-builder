const CorporateTemplate = ({ data }) => {
  return (
    <div className="bg-white p-10 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Corporate Header */}
      <header className="mb-6 pb-4 border-b-4 border-blue-900">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-1">{data.personalInfo?.fullName || 'Your Name'}</h1>
            <p className="text-lg text-gray-700 font-medium">{data.experience?.[0]?.position || 'Professional'}</p>
          </div>
          <div className="text-right text-sm text-gray-700">
            {data.personalInfo?.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo?.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo?.location && <div>{data.personalInfo.location}</div>}
          </div>
        </div>
      </header>

      {data.personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-2 pb-1 border-b-2 border-blue-200 uppercase">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-2 pb-1 border-b-2 border-blue-200 uppercase">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600 font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="font-semibold text-gray-700 mb-1">{exp.company} {exp.location && `| ${exp.location}`}</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {data.education?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 mb-2 pb-1 border-b-2 border-blue-200 uppercase">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-700 font-medium">{edu.school}</p>
                <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        )}

        {data.skills?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 mb-2 pb-1 border-b-2 border-blue-200 uppercase">
              Skills & Expertise
            </h2>
            {data.skills.map((skillCat, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold text-gray-900 text-sm">{skillCat.category}</h3>
                <p className="text-xs text-gray-700">{skillCat.items.join(' | ')}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      {data.certifications?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-2 pb-1 border-b-2 border-blue-200 uppercase">
            Certifications & Awards
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                <p className="text-xs text-gray-700">{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-blue-900 mb-2 pb-1 border-b-2 border-blue-200 uppercase">
            Key Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default CorporateTemplate;

