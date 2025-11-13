import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Templates = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      category: 'professional',
      description: 'Clean and contemporary design perfect for tech roles',
      color: 'from-blue-500 to-blue-600',
      icon: '💼'
    },
    {
      id: 'classic',
      name: 'Classic',
      category: 'traditional',
      description: 'Timeless design suitable for any industry',
      color: 'from-gray-700 to-gray-800',
      icon: '📋'
    },
    {
      id: 'professional',
      name: 'Professional',
      category: 'professional',
      description: 'Formal and polished for corporate positions',
      color: 'from-indigo-500 to-indigo-600',
      icon: '👔'
    },
    {
      id: 'creative',
      name: 'Creative',
      category: 'creative',
      description: 'Stand out with bold design choices',
      color: 'from-purple-500 to-pink-500',
      icon: '🎨'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      category: 'simple',
      description: 'Less is more - focus on content',
      color: 'from-slate-500 to-slate-600',
      icon: '⚪'
    },
    {
      id: 'executive',
      name: 'Executive',
      category: 'professional',
      description: 'Premium design for senior positions',
      color: 'from-amber-600 to-amber-700',
      icon: '👑'
    },
    {
      id: 'technical',
      name: 'Technical',
      category: 'professional',
      description: 'Optimized for developers and engineers',
      color: 'from-green-500 to-green-600',
      icon: '💻'
    },
    {
      id: 'designer',
      name: 'Designer',
      category: 'creative',
      description: 'Showcase your creative portfolio',
      color: 'from-fuchsia-500 to-fuchsia-600',
      icon: '✨'
    },
    {
      id: 'academic',
      name: 'Academic',
      category: 'traditional',
      description: 'Perfect for research and education roles',
      color: 'from-blue-700 to-blue-800',
      icon: '🎓'
    },
    {
      id: 'simple',
      name: 'Simple',
      category: 'simple',
      description: 'Straightforward and easy to read',
      color: 'from-gray-500 to-gray-600',
      icon: '📄'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      category: 'creative',
      description: 'Sophisticated and refined',
      color: 'from-rose-500 to-rose-600',
      icon: '💎'
    },
    {
      id: 'bold',
      name: 'Bold',
      category: 'creative',
      description: 'Make a strong first impression',
      color: 'from-red-500 to-red-600',
      icon: '🔥'
    },
    {
      id: 'compact',
      name: 'Compact',
      category: 'simple',
      description: 'Fit more content in less space',
      color: 'from-teal-500 to-teal-600',
      icon: '📦'
    },
    {
      id: 'stylish',
      name: 'Stylish',
      category: 'creative',
      description: 'Trendy and eye-catching',
      color: 'from-violet-500 to-violet-600',
      icon: '✌️'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      category: 'professional',
      description: 'Traditional business format',
      color: 'from-cyan-600 to-cyan-700',
      icon: '🏢'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', icon: '📚' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'simple', label: 'Simple', icon: '📄' },
    { id: 'traditional', label: 'Traditional', icon: '📋' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (templateId) => {
    navigate(`/editor?template=${templateId}`);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="w-full px-6 py-3 sm:py-4 lg:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium text-sm sm:text-base">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Choose Your Template</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Select a design that best represents you</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
              <span className="text-xs sm:text-sm text-gray-600 hidden md:inline">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 sm:gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full px-6 py-4 sm:py-6 lg:py-8">
        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-2.5 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base sm:text-lg"
                />
                <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1 sm:mr-2">{category.icon}</span>
                  <span className="hidden xs:inline">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Showing <span className="font-semibold text-gray-900">{filteredTemplates.length}</span> template{filteredTemplates.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleSelectTemplate(template.id)}
              >
                {/* Template Preview Card */}
                <div className={`h-48 bg-gradient-to-br ${template.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <div className="text-6xl relative z-10 transform group-hover:scale-110 transition-transform">
                    {template.icon}
                  </div>
                  {/* Preview Lines */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2 opacity-20">
                    <div className="h-2 bg-white rounded w-3/4"></div>
                    <div className="h-2 bg-white rounded w-1/2"></div>
                    <div className="h-2 bg-white rounded w-2/3"></div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                    <span>Use Template</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Templates;

