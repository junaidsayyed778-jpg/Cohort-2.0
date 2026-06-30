import { IResume } from "@/types/resume-types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            default: "",
        },
        summary: {
            type: String,
            default: "",
        },
        personaInfo: {
            type: {
                fullname: String,
                email: String,
                mobile: String,
                location: String,
                github: String,
                portfolio: String,
            },
            default: {},
        },
        education: {
            type: [
                {
                    institute: String,
                    degree: String,
                    startData: String,
                    endDate: String,
                },
            ],
            default: []
        },
        workExperience: {
            type: [
                {
                    company: String,
                    position: String,
                    startData: String,
                    endDate: String,
                    description: String,
                },
            ],
            default: [],
        },
        projects: {
            type: [
                {
                    title: String,
                    description: String,
                    techStack: [String],
                    githubUrl: String,
                    liveUrl: String,
                },
            ],
            default: [],
        },
        skills: {
            type: [String],
            default: [],
        },
        certifications: {
            type: [String],
        },
    },
    {
        timestamps: true,
    },
);

const ResumeModel = mongoose.model("Resume", resumeSchema);
export default ResumeModel;
