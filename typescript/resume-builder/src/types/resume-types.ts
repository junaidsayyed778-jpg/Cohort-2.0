import { Types } from "mongoose";

export interface IPersonalInfo {
  fullname: string;
  email: string;
  mobile: string;
  location: string;
  github: string;
  linkedIn: string;
  portfolio: string;
}

export interface IWorkExperience {
  company: string;
  position: string;
  startDate: string;
  endData: string;
  description: string;
}

export interface IProjects {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
}

export interface IEducation {
  institute: string;
  degree: string;
  startData: string;
  endDate: string;
}

export interface IResume {
  _id?: string;
  user_id: Types.ObjectId;
  title: string;
  summary: string;
  personaInfo: IPersonalInfo;
  workExperience?: IWorkExperience[];
  projects: IProjects[];
  skills: string[];
  education: IEducation[];
  certifications?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
