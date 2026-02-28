import fs from 'fs/promises';
import path from 'path';

// Define Email Interface
export interface Email {
    id: string;
    from: string;
    subject: string;
    message: string;
    date: string;
    folder: 'inbox' | 'sent' | 'trash';
    read: boolean;
}

const DB_PATH = path.join(process.cwd(), 'data', 'emails.json');

// Ensure DB exists
async function ensureDB() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, '[]', 'utf-8');
    }
}

// Read all emails
export async function getEmails(): Promise<Email[]> {
    await ensureDB();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

// Save a new email
export async function saveEmail(email: Email) {
    const emails = await getEmails();
    emails.unshift(email); // Add to top
    await fs.writeFile(DB_PATH, JSON.stringify(emails, null, 2), 'utf-8');
}

// Delete an email (or move to trash)
export async function deleteEmail(id: string) {
    let emails = await getEmails();
    emails = emails.filter(e => e.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(emails, null, 2), 'utf-8');
}

// Mark as read
export async function markAsRead(id: string) {
    const emails = await getEmails();
    const email = emails.find(e => e.id === id);
    if (email) {
        email.read = true;
        await fs.writeFile(DB_PATH, JSON.stringify(emails, null, 2), 'utf-8');
    }
}

// Define Skill Interface
export interface Skill {
    id: string;
    name: string;
    category: 'language' | 'tool' | 'framework' | 'other';
}

const SKILLS_DB_PATH = path.join(process.cwd(), 'data', 'skills.json');

// Ensure Skills DB exists
async function ensureSkillsDB() {
    try {
        await fs.access(SKILLS_DB_PATH);
    } catch {
        // Default skills
        const defaultSkills: Skill[] = [
            { id: '1', name: 'Docker', category: 'tool' },
            { id: '2', name: 'Kubernetes', category: 'tool' },
            { id: '3', name: 'AWS', category: 'tool' },
            { id: '4', name: 'Terraform', category: 'tool' },
            { id: '5', name: 'Jenkins', category: 'tool' },
            { id: '6', name: 'Linux/Bash', category: 'language' },
            { id: '7', name: 'CI/CD', category: 'other' },
            { id: '8', name: 'Ansible', category: 'tool' },
            { id: '9', name: 'Python', category: 'language' },
            { id: '10', name: 'Prometheus', category: 'tool' },
            { id: '11', name: 'Grafana', category: 'tool' },
            { id: '12', name: 'GitOps', category: 'other' }
        ];
        await fs.writeFile(SKILLS_DB_PATH, JSON.stringify(defaultSkills, null, 2), 'utf-8');
    }
}

// Read all skills
export async function getSkills(): Promise<Skill[]> {
    await ensureSkillsDB();
    const data = await fs.readFile(SKILLS_DB_PATH, 'utf-8');
    return JSON.parse(data);
}

// Save a new skill
export async function saveSkill(skill: Skill) {
    const skills = await getSkills();
    skills.push(skill);
    await fs.writeFile(SKILLS_DB_PATH, JSON.stringify(skills, null, 2), 'utf-8');
}

// Delete a skill
export async function deleteSkill(id: string) {
    let skills = await getSkills();
    skills = skills.filter(s => s.id !== id);
    await fs.writeFile(SKILLS_DB_PATH, JSON.stringify(skills, null, 2), 'utf-8');
}
// Define Project Interface
export interface Project {
    id: string;
    title: string;
    desc: string;
    link: string;
    tags: string[];
    iconName: string; // 'Shield' | 'Cpu' | 'Wifi' | 'Code2' | 'Terminal'
}

const PROJECTS_DB_PATH = path.join(process.cwd(), 'data', 'projects.json');

// Ensure Projects DB exists
async function ensureProjectsDB() {
    try {
        await fs.access(PROJECTS_DB_PATH);
    } catch {
        // Default projects from the page
        const defaultProjects: Project[] = [
            {
                id: '1',
                title: "Konvexa",
                desc: "Enterprise-grade certificate generation and verification platform.",
                iconName: "Shield",
                tags: ["React", "Node.js", "Blockchain", "Security"],
                link: "https://konvexa.certiswift.in/"
            },
            {
                id: '2',
                title: "Kube-Guard",
                desc: "Automated Kubernetes cluster security auditor.",
                iconName: "Cpu",
                tags: ["Kubernetes", "Go", "Security", "CI/CD"],
                link: "#"
            },
            {
                id: '3',
                title: "Terra-Former",
                desc: "Infrastructure as Code modules for multi-cloud deployments.",
                iconName: "Wifi",
                tags: ["Terraform", "AWS", "Azure"],
                link: "#"
            },
            {
                id: '4',
                title: "Pipeline-X",
                desc: "High-throughput CI/CD engine optimized for microservices.",
                iconName: "Code2",
                tags: ["Jenkins", "Docker", "Groovy"],
                link: "#"
            },
            {
                id: '5',
                title: "Log-Sentinel",
                desc: "Centralized logging and monitoring stack.",
                iconName: "Terminal",
                tags: ["ELK Stack", "Prometheus", "Grafana"],
                link: "#"
            },
            {
                id: '6',
                title: "Auto-Scale Bot",
                desc: "Predictive scaling agent for AWS EC2 instances.",
                iconName: "Wifi",
                tags: ["Python", "AWS Lambda", "ML"],
                link: "#"
            },
            {
                id: '7',
                title: "Net-Weaver",
                desc: "Zero-trust service mesh configuration manager.",
                iconName: "Cpu",
                tags: ["Istio", "Envoy", "Networking"],
                link: "#"
            }
        ];
        await fs.writeFile(PROJECTS_DB_PATH, JSON.stringify(defaultProjects, null, 2), 'utf-8');
    }
}

// Read all projects
export async function getProjects(): Promise<Project[]> {
    await ensureProjectsDB();
    const data = await fs.readFile(PROJECTS_DB_PATH, 'utf-8');
    return JSON.parse(data);
}

// Save a new project
export async function saveProject(project: Project) {
    const projects = await getProjects();
    projects.push(project);
    await fs.writeFile(PROJECTS_DB_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}

// Delete a project
export async function deleteProject(id: string) {
    let projects = await getProjects();
    projects = projects.filter(p => p.id !== id);
    await fs.writeFile(PROJECTS_DB_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}
