export interface UserProfile {
    name: string;
    email: string;
    major: string;
    year: string;
    careerInterest: string;
    aiUsageLevel: string;
    biggestFear: string;
    learningStyle: string;
    mindsetType: string;
    profileSummary: string;
    recommendedModule: string;
}

export interface Event {
    id: string;
    name: string;
    date: string;
    speaker: string;
    description: string;
    type: 'networking' | 'advising';
}

export interface ModuleTemplate {
    id: string;
    title: string;
    topic: string;
    description: string;
    videoUrl?: string;
    videoPlaylist?: {
        title: string;
        src: string;
    }[];
    thumbnail?: string;
    infographics: Infographic[];
    scenario: Scenario;
    keyTakeaways: string[];
}

export interface Infographic {
    title: string;
    content: string;
}

export interface Scenario {
    context: string;
    options: ScenarioOption[];
}

export interface ScenarioOption {
    text: string;
    feedback: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export interface Quiz {
    moduleId: string;
    title: string;
    questions: QuizQuestion[];
}

// --- Practical Intelligence Module ---

export interface AnalogyEntry {
    term: string;
    analogy: string;
    explanation: string;
    emoji: string;
}

export interface InsightSource {
    label: string;
    url: string;
}

export interface TraceNode {
    id: string;
    label: string;
    role: string;
    description: string;
    icon: string;
    color: string;
}

export interface TraceFlow {
    id: string;
    title: string;
    nodes: TraceNode[];
}

export interface SandboxConfig {
    id: string;
    type: 'text-analysis' | 'prompt-playground';
    title: string;
    description: string;
    placeholder: string;
    examples: string[];
}

export interface MajorTool {
    name: string;
    url: string;
    domain: string;
    oneLiner: string;
    howToUse: string;
    free: boolean;
}

export interface MajorPrompt {
    task: string;
    prompt: string;
}

export interface MajorUseCase {
    scenario: string;
    toolUsed: string;
    steps: string[];
}

export interface MajorToolkit {
    major: string;
    headline: string;
    description: string;
    tools: MajorTool[];
    useCases: MajorUseCase[];
    prompts: MajorPrompt[];
}

export interface ToolArticle {
    id: string;
    name: string;
    tagline: string;
    url: string;
    domain: string;
    free: boolean;
    pricing?: string;
    whatItDoes: string;
    whyItMatters: string;
    getStarted: string;
    bestFor: string[];
    studentTip: string;
}
