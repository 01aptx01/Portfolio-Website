export interface ProjectArchitecture {
  overview: string;
  keyComponents: string[];
  dataFlow?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "Full-Stack" | "Backend & Systems" | "Frontend & UI" | "AI & Machine Learning";
  featured: boolean;
  role: string;
  timeline: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics: string[];
  image?: string;
  challenges: {
    problem: string;
    solution: string;
  }[];
  architecture: ProjectArchitecture;
}

export interface SkillItem {
  name: string;
  highlight?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Work" | "Education" | "Milestone";
  highlights: string[];
  technologies: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  subRole: string;
  tagline: string;
  bio: string[];
  location: string;
  status: string;
  email: string;
  resumeUrl?: string;
  socials: {
    github: string;
    linkedin: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}
