// Sample resume data for demonstration
export const sampleResumes = [
  {
    _id: '1',
    title: 'Software Engineer Resume',
    template: 'modern',
    colors: {
      primary: '#3B82F6',
      text: '#1F2937',
      secondary: '#6B7280'
    },
    personalInfo: {
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'https://johnsmith.dev',
      linkedin: 'https://linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith',
      summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and solving complex problems. Proficient in React, Node.js, and cloud technologies.'
    },
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: 'Jan 2021',
        endDate: '',
        current: true,
        description: 'Led development of microservices architecture serving 1M+ users\nImplemented CI/CD pipeline reducing deployment time by 60%\nMentored junior developers and conducted code reviews'
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        location: 'Remote',
        startDate: 'Jun 2019',
        endDate: 'Dec 2020',
        current: false,
        description: 'Built responsive web applications using React and Node.js\nDesigned and implemented RESTful APIs\nOptimized database queries improving performance by 40%'
      }
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Stanford, CA',
        startDate: 'Sep 2015',
        endDate: 'May 2019',
        gpa: '3.8/4.0'
      }
    ],
    skills: [
      {
        category: 'Programming Languages',
        items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go']
      },
      {
        category: 'Frameworks & Libraries',
        items: ['React', 'Node.js', 'Express', 'Next.js', 'Vue.js']
      },
      {
        category: 'Tools & Technologies',
        items: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL']
      }
    ],
    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce platform with payment integration and real-time inventory management',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://github.com/johnsmith/ecommerce',
        startDate: 'Jan 2023',
        endDate: 'Mar 2023'
      },
      {
        name: 'Task Management App',
        description: 'Developed a collaborative task management application with real-time updates',
        technologies: ['React', 'Firebase', 'Material-UI'],
        link: 'https://github.com/johnsmith/taskapp',
        startDate: 'Sep 2022',
        endDate: 'Nov 2022'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: 'Jan 2023',
        credentialId: 'AWS-123456'
      }
    ],
    languages: [
      { language: 'English', proficiency: 'native' },
      { language: 'Spanish', proficiency: 'intermediate' }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  }
];

export const defaultResumeData = {
  title: 'My Resume',
  template: 'modern',
  colors: {
    primary: '#3B82F6',
    text: '#1F2937',
    secondary: '#6B7280'
  },
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: []
};

