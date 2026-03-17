/**
 * Writes a JSON-serializable value into local storage.
 */
export const setItem = (key: string, value: unknown): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        return;
    }
};

/**
 * Reads and parses a value from local storage.
 */
export const getItem = <T>(key: string): T | null => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    } catch {
        return null;
    }
};

/**
 * Removes a value from local storage.
 */
export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch {
        return;
    }
};
