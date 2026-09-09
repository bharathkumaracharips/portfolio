export interface StackLayer {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  technologies: string[];
  metrics: string;
  color: 'cyan' | 'emerald' | 'violet' | 'amber';
}

export interface PerformanceMetric {
  id: string;
  title: string;
  category: 'node' | 'rpc' | 'db' | 'network' | 'infra' | 'cost';
  before: string;
  after: string;
  improvement: string;
  rationale: string;
  metricType: 'latency' | 'throughput' | 'time' | 'cost' | 'resource';
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  clientType: 'Personal Protocol' | 'Client Infrastructure' | 'Enterprise Protocol';
  problem: string;
  analysis: string;
  architecture: string;
  implementation: string;
  optimization: string;
  result: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ClientProject {
  id: string;
  clientName: string;
  isConfidential: boolean;
  projectType: string;
  challenge: string;
  engineering: string;
  result: string;
  techStack: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  category: 'Protocol' | 'L2 & Rollups' | 'Infrastructure' | 'Smart Contracts' | 'Tooling';
  techStack: string[];
  status: 'Production' | 'Open Source' | 'Audit Complete' | 'Active R&D';
  githubUrl?: string;
  demoUrl?: string;
  caseStudyId?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  organization: string;
  position: string;
  period: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
  linkedInUrl?: string;
}
