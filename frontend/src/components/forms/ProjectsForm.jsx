const ProjectsForm = ({ data, onChange }) => {
  const addProject = () => {
    onChange([
      ...data,
      {
        name: '',
        description: '',
        technologies: [''],
        link: '',
        startDate: '',
        endDate: ''
      }
    ])
  }

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateProject = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addTechnology = (projectIndex) => {
    const updated = [...data]
    updated[projectIndex].technologies = [...updated[projectIndex].technologies, '']
    onChange(updated)
  }

  const removeTechnology = (projectIndex, techIndex) => {
    const updated = [...data]
    updated[projectIndex].technologies = updated[projectIndex].technologies.filter((_, i) => i !== techIndex)
    onChange(updated)
  }

  const updateTechnology = (projectIndex, techIndex, value) => {
    const updated = [...data]
    updated[projectIndex].technologies[techIndex] = value
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No projects added yet. Click "Add Project" to get started.
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
              <button
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Project Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={project.startDate}
                    onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Jan 2023"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={project.endDate}
                    onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Mar 2023"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Describe the project..."
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Technologies Used
                  </label>
                  <button
                    onClick={() => addTechnology(index)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Technology
                  </button>
                </div>

                <div className="space-y-2">
                  {project.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateTechnology(index, techIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Technology name"
                      />
                      {project.technologies.length > 1 && (
                        <button
                          onClick={() => removeTechnology(index, techIndex)}
                          className="px-3 text-red-600 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsForm

