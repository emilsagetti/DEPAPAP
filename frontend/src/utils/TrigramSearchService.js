/**
 * TrigramSearchService
 * Implements fuzzy search logic using 3-gram tokenization.
 * 
 * Algorithm:
 * 1. Normalize text (lowercase, remove excess whitespace).
 * 2. Generate trigrams (sliding window of 3 characters).
 * 3. Calculate similarity coefficient (Dice coefficient or Overlap).
 * 
 * Example:
 * "friend" -> "fri", "rie", "ien", "end"
 */

class TrigramSearchService {
    /**
     * Normalizes text for comparison
     * @param {string} text 
     * @returns {string}
     */
    static normalize(text) {
        return (text || '')
            .toLowerCase()
            .replace(/[^\w\u0400-\u04FF\s]/g, '') // Keep alphanumeric and Cyrillic
            .trim()
            .replace(/\s+/g, ' ');
    }

    /**
     * Generates a Set of trigrams from text
     * @param {string} text 
     * @returns {Set<string>}
     */
    static generateTrigrams(text) {
        const normalized = this.normalize(text);
        const trigrams = new Set();

        // Enhance short words by padding? 
        // For simplicity, we just process if length >= 3.
        // If length < 3, we can treat the whole word as one token or pad it.
        // User example strategy: "Дружба" -> "Дру", "руж", "ужб", "жба"

        if (normalized.length < 3) {
            if (normalized.length > 0) trigrams.add(normalized);
            return trigrams;
        }

        for (let i = 0; i < normalized.length - 2; i++) {
            trigrams.add(normalized.substring(i, i + 3));
        }

        return trigrams;
    }

    /**
     * Calculates similarity between two strings
     * @param {string} target - The text to search in (e.g. Service Title)
     * @param {string} query - The search query (e.g. User Input)
     * @returns {number} Score from 0.0 to 1.0 (Percentage of query trigrams found in target)
     */
    static getSimilarity(target, query) {
        if (!query) return 1.0; // Empty query matches everything
        if (!target) return 0.0;

        const targetTrigrams = this.generateTrigrams(target);
        const queryTrigrams = this.generateTrigrams(query);

        if (queryTrigrams.size === 0) return 1.0;

        let matchCount = 0;
        for (const trigram of queryTrigrams) {
            if (targetTrigrams.has(trigram)) {
                matchCount++;
            }
        }

        // Logic from User: "If 50% match... show results"
        // We calculate the percentage of QUERY trigrams that exist in TARGET.
        return matchCount / queryTrigrams.size;
    }

    /**
     * Checks if target matches query with a minimum threshold
     * @param {string} target 
     * @param {string} query 
     * @param {number} threshold - Default 0.4 (40% match)
     * @returns {boolean}
     */
    static match(target, query, threshold = 0.4) {
        // Optimization: Regular includes check first (fast path for exact matches)
        if (this.normalize(target).includes(this.normalize(query))) {
            return true;
        }

        const score = this.getSimilarity(target, query);
        return score >= threshold;
    }
}

export default TrigramSearchService;
