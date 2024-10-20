import {mmkv} from "./storage";

// Helper function to interact with MMKV in the persist configuration
const zustandMMKVStorage = {
    setItem: (key, value) => {
        mmkv.set(key, value);
    },
    getItem: (key) => {
        const value = mmkv.getString(key);
        return value !== undefined ? value : null;
    },
    removeItem: (key) => {
        mmkv.delete(key);
    }
};

export default zustandMMKVStorage;