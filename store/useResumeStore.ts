import { create } from 'zustand';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    link: string;
    role:string;
  };
  experience: { company: string; role: string; date: string; description: string[] }[];
  education: { school: string; degree: string; year: string }[];
  skills: string[];
    summary: string; 

}

interface ResumeState {
  data: ResumeData;
  template: 'modern' | 'classic' | 'minimal' | 'sidebar' | 'executive' |'garamond' |'professional'; // Added this
  updateData: (newData: Partial<ResumeData>) => void;
  setFullData: (data: ResumeData) => void;
  setTemplate: (t: 'modern' | 'classic' | 'minimal' | 'executive' |'sidebar' | 'garamond' |'professional') => void; // Added this
}

export const useResumeStore = create<ResumeState>((set) => ({
  data: {
    personalInfo: { fullName: '', email: '', phone: '', location: '', link: '',role:''},
    experience: [],
    education: [],
    skills: [],
    summary: '',
  },
  template: 'modern',
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  setFullData: (data) => set({ data }),
  setTemplate: (template) => set({ template }),
}));