const DesignerTemplate = ({ data }) => {
  return (
    <div className="bg-white p-8 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Artistic Header */}
      <header className="relative mb-8 pb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200 to-teal-200 rounded-full opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
            {data.personalInfo?.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-700 italic">{data.experience?.[0]?.position || 'Creative Designer'}</p>
          <div className="mt-4 flex gap-4 text-sm text-gray-600">
            {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo?.website && <span>🎨 {data.personalInfo.website}</span>}
          </div>
        </div>
      </header>

      {/* About */}
      {data.personalInfo?.summary && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">About</h2>
          </div>
          <p className="text-gray-700 leading-relaxed pl-10">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
          </div>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 pl-10 relative">
              <div className="absolute left-0 top-2 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"></div>
              <h3 className="text-lg font-bold text-purple-700">{exp.position}</h3>
              <p className="text-gray-800 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills & Projects Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {data.skills?.length > 0 && (
          <section className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-teal-500"></div>
              <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
            </div>
            <div className="pl-10 space-y-2">
              {data.skills.map((skillCat, index) => (
                <div key={index}>
                  <h3 className="font-bold text-sm text-blue-700">{skillCat.category}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillCat.items.map((skill, i) => (
                      <span key={i} className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 px-2 py-1 rounded-full text-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects?.length > 0 && (
          <section className="col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            </div>
            <div className="pl-10 space-y-3">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-bold text-teal-700">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Education */}
      {data.education?.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-yellow-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          </div>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2 pl-10">
              <h3 className="font-bold text-green-700">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-sm text-gray-700">{edu.school} • {edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default DesignerTemplate;

