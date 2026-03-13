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
