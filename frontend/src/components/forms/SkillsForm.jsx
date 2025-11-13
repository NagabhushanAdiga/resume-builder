const SkillsForm = ({ data, onChange }) => {
  const addSkillCategory = () => {
    onChange([
      ...data,
      {
        category: '',
        items: ['']
      }
    ]);
  };

  const removeSkillCategory = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCategory = (index, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], category: value };
    onChange(updated);
  };

  const addSkillItem = (categoryIndex) => {
    const updated = [...data];
    updated[categoryIndex].items = [...updated[categoryIndex].items, ''];
    onChange(updated);
  };

  const removeSkillItem = (categoryIndex, itemIndex) => {
    const updated = [...data];
    updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== itemIndex);
    onChange(updated);
  };

  const updateSkillItem = (categoryIndex, itemIndex, value) => {
    const updated = [...data];
    updated[categoryIndex].items[itemIndex] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <button
          onClick={addSkillCategory}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No skills added yet. Click "Add Category" to get started.
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((skillCategory, categoryIndex) => (
            <div key={categoryIndex} className="border border-gray-200 rounded-lg p-6 relative">
              <button
                onClick={() => removeSkillCategory(categoryIndex)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={skillCategory.category}
                  onChange={(e) => updateCategory(categoryIndex, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Programming Languages, Tools, etc."
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <button
                    onClick={() => addSkillItem(categoryIndex)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Skill
                  </button>
                </div>

                {skillCategory.items.map((skill, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkillItem(categoryIndex, itemIndex, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Skill name"
                    />
                    {skillCategory.items.length > 1 && (
                      <button
                        onClick={() => removeSkillItem(categoryIndex, itemIndex)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;

