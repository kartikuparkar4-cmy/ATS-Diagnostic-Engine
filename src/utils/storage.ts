export interface HistoryItem {
  id: string;
  date: string;
  score: string;
  title: string;
  fullResult: string;
  jobDescription?: string;
  resume?: string;
}

const STORAGE_KEY = 'ats_analysis_history';

export const saveToHistory = (item: HistoryItem): void => {
  try {
    const existing = getHistory();
    const updated = [item, ...existing].slice(0, 20); // Keep last 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
};

export const getHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
};

export const deleteHistoryItem = (id: string): void => {
  try {
    const existing = getHistory();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete history item:', error);
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};
