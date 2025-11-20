import { createContext, useState, useContext, useEffect } from 'react';
import { sampleResumes } from '../data/mockData';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize with sample data or load from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const userResumes = JSON.parse(localStorage.getItem(`resumes_${user._id}`) || '[]');
      if (userResumes.length === 0) {
        // Use sample data on first load
        localStorage.setItem(`resumes_${user._id}`, JSON.stringify(sampleResumes));
        setResumes(sampleResumes);
      } else {
        setResumes(userResumes);
      }
    }
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const userResumes = JSON.parse(localStorage.getItem(`resumes_${user._id}`) || '[]');
      setResumes(userResumes);
    }
    
    setLoading(false);
    return { success: true };
  };

  const fetchResume = async (id) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const userResumes = JSON.parse(localStorage.getItem(`resumes_${user._id}`) || '[]');
      console.log('Fetching resume with id:', id, 'Type:', typeof id);
      console.log('Available resumes:', userResumes.map(r => ({ id: r._id, type: typeof r._id, title: r.title })));
      
      // Convert both to strings for comparison to handle type mismatches
      const resume = userResumes.find(r => String(r._id) === String(id));
      console.log('Found resume:', resume ? 'Yes' : 'No');
      
      if (resume) {
        setCurrentResume(resume);
        setLoading(false);
        return { success: true, data: resume };
      }
    }
    
    setLoading(false);
    return { success: false, message: 'Resume not found' };
  };

  const createResume = async (resumeData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const newResume = {
        ...resumeData,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const userResumes = JSON.parse(localStorage.getItem(`resumes_${user._id}`) || '[]');
      const updatedResumes = [newResume, ...userResumes];
      localStorage.setItem(`resumes_${user._id}`, JSON.stringify(updatedResumes));
      setResumes(updatedResumes);
      
      setLoading(false);
      return { success: true, data: newResume };
    }
    
    setLoading(false);
    return { success: false, message: 'User not found' };
  };

  const updateResume = async (id, resumeData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const userResumes = JSON.parse(localStorage.getItem(`resumes_${user._id}`) || '[]');
      const updatedResumes = userResumes.map(r => 
        String(r._id) === String(id) ? { ...resumeData, _id: id, updatedAt: new Date() } : r
      );
      
      localStorage.setItem(`resumes_${user._id}`, JSON.stringify(updatedResumes));
      setResumes(updatedResumes);
      
      const updatedResume = updatedResumes.find(r => String(r._id) === String(id));
      setCurrentResume(updatedResume);
      
      setLoading(false);
      return { success: true, data: updatedResume };
    }
    
    setLoading(false);
    return { success: false, message: 'Failed to update' };
  };

  const deleteResume = async (id) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const userResumes = JSON.parse(localStorage.getItem(`resumes_${user._id}`) || '[]');
      const updatedResumes = userResumes.filter(r => String(r._id) !== String(id));
      localStorage.setItem(`resumes_${user._id}`, JSON.stringify(updatedResumes));
      setResumes(updatedResumes);
      
      setLoading(false);
      return { success: true };
    }
    
    setLoading(false);
    return { success: false, message: 'Failed to delete' };
  };

  const duplicateResume = async (id) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const userResumes = JSON.parse(localStorage.getItem(`resumes_${user._id}`) || '[]');
      const resumeToDuplicate = userResumes.find(r => String(r._id) === String(id));
      
      if (resumeToDuplicate) {
        const duplicatedResume = {
          ...resumeToDuplicate,
          _id: Date.now().toString(),
          title: `${resumeToDuplicate.title} (Copy)`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const updatedResumes = [duplicatedResume, ...userResumes];
        localStorage.setItem(`resumes_${user._id}`, JSON.stringify(updatedResumes));
        setResumes(updatedResumes);
        
        setLoading(false);
        return { success: true, data: duplicatedResume };
      }
    }
    
    setLoading(false);
    return { success: false, message: 'Failed to duplicate' };
  };

  const value = {
    resumes,
    currentResume,
    setCurrentResume,
    loading,
    fetchResumes,
    fetchResume,
    createResume,
    updateResume,
    deleteResume,
    duplicateResume
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

