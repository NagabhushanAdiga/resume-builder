const CompactTemplate = ({ data }) => {
  return (
    <div className="bg-white p-8 shadow-lg text-xs" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Compact Header */}
      <header className="mb-4 pb-3 border-b-2 border-gray-900">
        <h1 className="text-2xl font-bold text-gray-900">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="mt-1 flex flex-wrap gap-3 text-gray-600">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>|</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>|</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="col-span-2">
          {data.personalInfo?.summary && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Summary</h2>
              <p className="text-gray-700 leading-snug">{data.personalInfo.summary}</p>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-gray-600 text-xs">{exp.startDate} - {exp.current ? 'Now' : exp.endDate}</span>
                  </div>
                  <p className="text-gray-700 font-semibold">{exp.company}</p>
                  <p className="text-gray-600 leading-snug mt-1 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {data.projects?.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 leading-snug">{project.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <div>
          {data.skills?.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase bg-gray-200 p-1">Skills</h2>
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-gray-900">{skillCat.category}</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {skillCat.items.map((skill, i) => (
                      <li key={i} className="leading-tight">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {data.education?.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase bg-gray-200 p-1">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}</p>
                  <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase bg-gray-200 p-1">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-700">{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {data.languages?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase bg-gray-200 p-1">Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-1">
                  <span className="font-bold text-gray-900">{lang.language}</span>
                  <span className="text-gray-600 ml-1 capitalize">({lang.proficiency})</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactTemplate;

