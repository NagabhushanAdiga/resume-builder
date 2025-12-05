const BoldTemplate = ({ data }) => {
  return (
    <div className="bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Bold Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-10">
        <h1 className="text-5xl font-black uppercase tracking-wide mb-2">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <p className="text-xl font-bold uppercase tracking-widest">{data.experience?.[0]?.position || 'Professional'}</p>
        <div className="mt-4 flex gap-6 text-sm font-semibold">
          {data.personalInfo?.email && <span>✉ {data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>☎ {data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>⚲ {data.personalInfo.location}</span>}
        </div>
      </header>

      <div className="p-10">
        {data.personalInfo?.summary && (
          <section className="mb-6">
            <div className="bg-red-600 text-white px-4 py-2 font-bold uppercase tracking-wide mb-3">
              Profile
            </div>
            <p className="text-gray-700 font-medium leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section className="mb-6">
            <div className="bg-red-600 text-white px-4 py-2 font-bold uppercase tracking-wide mb-3">
              Experience
            </div>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                <p className="text-lg font-semibold text-orange-600">{exp.company}</p>
                <p className="text-sm font-bold text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}</p>
                <p className="text-gray-700 font-medium whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.education?.length > 0 && (
            <section>
              <div className="bg-red-600 text-white px-4 py-2 font-bold uppercase tracking-wide mb-3">
                Education
              </div>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm font-semibold text-gray-700">{edu.school}</p>
                  <p className="text-xs font-bold text-gray-600">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <div className="bg-red-600 text-white px-4 py-2 font-bold uppercase tracking-wide mb-3">
                Skills
              </div>
              {data.skills.map((skillCat, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-orange-600 text-sm">{skillCat.category}</h3>
                  <p className="text-xs font-medium text-gray-700">{skillCat.items.join(' • ')}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default BoldTemplate

