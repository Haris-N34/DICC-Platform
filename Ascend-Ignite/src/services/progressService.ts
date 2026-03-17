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

/**
 * Reads persisted learning progress and normalizes the completed modules array.
 */
export const getProgress = (): ProgressData => {
    const progress = getItem<ProgressData>(PROGRESS_KEY);

    return {
        completedModules: Array.isArray(progress?.completedModules) ? progress.completedModules : [],
    };
};

/**
 * Builds the persisted progress record for a completed module.
 */
function createModuleProgress(moduleId: string, quizScore: number): ModuleProgress {
    return {
        moduleId,
        quizPassed: quizScore >= 70,
        quizScore,
        completedAt: new Date().toISOString(),
    };
}

/**
 * Stores completion data for a module, replacing any previous attempt for the same module.
 */
export const completeModule = (moduleId: string, quizScore: number): void => {
    const progress = getProgress();
    const existingIndex = progress.completedModules.findIndex((module) => module.moduleId === moduleId);
    const updatedEntry = createModuleProgress(moduleId, quizScore);

    if (existingIndex >= 0) {
        progress.completedModules[existingIndex] = updatedEntry;
    } else {
        progress.completedModules.push(updatedEntry);
    }

    setItem(PROGRESS_KEY, progress);
};

/**
 * Returns whether a module has been completed with a passing quiz score.
 */
export const isModuleCompleted = (moduleId: string): boolean =>
    getProgress().completedModules.some((module) => module.moduleId === moduleId && module.quizPassed);

/**
 * Returns the identifiers for all modules completed with a passing score.
 */
export const getCompletedModuleIds = (): string[] =>
    getProgress()
        .completedModules
        .filter((module) => module.quizPassed)
        .map((module) => module.moduleId);

/**
 * Returns the total number of quizzes passed.
 */
export const getQuizzesPassed = (): number =>
    getProgress().completedModules.filter((module) => module.quizPassed).length;

/**
 * Returns the saved progress entry for a single module.
 */
export const getModuleProgress = (moduleId: string): ModuleProgress | undefined =>
    getProgress().completedModules.find((module) => module.moduleId === moduleId);
