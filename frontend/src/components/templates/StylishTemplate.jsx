const StylishTemplate = ({ data }) => {
  return (
    <div className="bg-gray-900 p-8 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Stylish Header */}
      <header className="mb-6">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-lg">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">{data.personalInfo?.fullName || 'Your Name'}</h1>
          <p className="text-xl text-cyan-100 font-semibold">{data.experience?.[0]?.position || 'Professional'}</p>
        </div>
        <div className="mt-4 flex gap-4 text-sm text-cyan-400">
          {data.personalInfo?.email && <span>📧 {data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>📱 {data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
        </div>
      </header>

      {data.personalInfo?.summary && (
        <section className="mb-6 bg-gray-800 p-5 rounded-lg">
          <h2 className="text-lg font-bold text-cyan-400 mb-2 uppercase tracking-wide">About</h2>
          <p className="text-gray-300 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wide">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-gray-800 p-5 rounded-lg mb-3">
              <h3 className="text-lg font-bold text-white">{exp.position}</h3>
              <p className="text-cyan-400 font-semibold">{exp.company}</p>
              <p className="text-sm text-gray-400 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-300 text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wide">Skills</h2>
            {data.skills.map((skillCat, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2">
                <h3 className="font-bold text-white mb-2">{skillCat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillCat.items.map((skill, i) => (
                    <span key={i} className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {data.education?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wide">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2">
                <h3 className="font-bold text-white">{edu.degree}</h3>
                <p className="text-sm text-gray-300">{edu.school}</p>
                <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      {data.projects?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wide">Projects</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold text-white mb-1">{project.name}</h3>
                <p className="text-xs text-gray-300 mb-2">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default StylishTemplate;

