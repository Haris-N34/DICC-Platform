import { UserProfile } from '../types';
import { getItem, removeItem, setItem } from './storageService';

const PROFILE_KEY = 'ascend_profile';

/**
 * Reads the saved user profile from local storage.
 */
export const getProfile = (): UserProfile | null => getItem<UserProfile>(PROFILE_KEY);

/**
 * Persists the full user profile to local storage.
 */
export const saveProfile = (profile: UserProfile): void => {
    setItem(PROFILE_KEY, profile);
};

/**
 * Removes the saved user profile from local storage.
 */
export const clearProfile = (): void => {
    removeItem(PROFILE_KEY);
};

/**
 * Merges partial profile updates into the current saved profile and returns the result.
 */
export const updateProfile = (updates: Partial<UserProfile>): UserProfile => {
    const currentProfile = getProfile() || ({} as UserProfile);
    const updatedProfile = { ...currentProfile, ...updates };

    saveProfile(updatedProfile);

    return updatedProfile;
};
