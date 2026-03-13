import { getItem, setItem } from './storageService';

const PROGRESS_KEY = 'ascend_progress';

export interface ModuleProgress {
    moduleId: string;
    quizPassed: boolean;
    quizScore: number;
    completedAt: string;
}

export interface ProgressData {
    completedModules: ModuleProgress[];
}

export const getProgress = (): ProgressData => {
    const data = getItem<ProgressData>(PROGRESS_KEY);
    return { completedModules: Array.isArray(data?.completedModules) ? data.completedModules : [] };
};

export const completeModule = (moduleId: string, quizScore: number): void => {
    const progress = getProgress();
    const existing = progress.completedModules.findIndex(m => m.moduleId === moduleId);

    const entry: ModuleProgress = {
        moduleId,
        quizPassed: quizScore >= 70,
        quizScore,
        completedAt: new Date().toISOString(),
    };

    if (existing >= 0) {
        progress.completedModules[existing] = entry;
    } else {
        progress.completedModules.push(entry);
    }

    setItem(PROGRESS_KEY, progress);
};

export const isModuleCompleted = (moduleId: string): boolean => {
    const progress = getProgress();
    return progress.completedModules.some(m => m.moduleId === moduleId && m.quizPassed);
};

export const getCompletedModuleIds = (): string[] => {
    const progress = getProgress();
    return progress.completedModules.filter(m => m.quizPassed).map(m => m.moduleId);
};

export const getQuizzesPassed = (): number => {
    const progress = getProgress();
    return progress.completedModules.filter(m => m.quizPassed).length;
};

export const getModuleProgress = (moduleId: string): ModuleProgress | undefined => {
    const progress = getProgress();
    return progress.completedModules.find(m => m.moduleId === moduleId);
};
