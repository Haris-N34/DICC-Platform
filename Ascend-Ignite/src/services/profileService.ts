import { UserProfile } from '../types';
import { setItem, getItem, removeItem } from './storageService';

const PROFILE_KEY = 'ascend_profile';

export const getProfile = (): UserProfile | null => {
    return getItem<UserProfile>(PROFILE_KEY);
};

export const saveProfile = (profile: UserProfile): void => {
    setItem(PROFILE_KEY, profile);
};

export const clearProfile = (): void => {
    removeItem(PROFILE_KEY);
};

export const updateProfile = (updates: Partial<UserProfile>): UserProfile => {
    const current = getProfile() || {} as UserProfile;
    const updated = { ...current, ...updates };
    saveProfile(updated);
    return updated;
};
