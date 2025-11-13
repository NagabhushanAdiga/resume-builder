const CreativeTemplate = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl mb-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <p className="text-lg opacity-90">{data.experience?.[0]?.position || 'Creative Professional'}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {data.personalInfo?.email && <span>✉️ {data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>📞 {data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <section className="mb-6 bg-white p-5 rounded-xl shadow">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow mb-4">
              <h3 className="text-lg font-bold text-purple-700">{exp.position}</h3>
              <p className="text-gray-800 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills & Education Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {data.skills?.length > 0 && (
          <section className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Skills
            </h2>
            {data.skills.map((skillCat, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold text-purple-700 text-sm">{skillCat.category}</h3>
                <p className="text-xs text-gray-600">{skillCat.items.join(' • ')}</p>
              </div>
            ))}
          </section>
        )}

        {data.education?.length > 0 && (
          <section className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold text-purple-700 text-sm">{edu.degree}</h3>
                <p className="text-xs text-gray-700">{edu.school}</p>
                <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;

