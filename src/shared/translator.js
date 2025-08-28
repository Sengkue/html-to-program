const translate = require('google-translate-api-x');

/**
 * Translation utility class for Google Translate functionality
 */
class Translator {
    constructor() {
        // Common language codes
        this.languages = {
            'auto': 'auto',
            'english': 'en',
            'spanish': 'es',
            'french': 'fr',
            'german': 'de',
            'italian': 'it',
            'portuguese': 'pt',
            'russian': 'ru',
            'japanese': 'ja',
            'korean': 'ko',
            'chinese': 'zh',
            'arabic': 'ar',
            'hindi': 'hi',
            'thai': 'th',
            'vietnamese': 'vi',
            'lao': 'lo',
            'laotian': 'lo', // Alternative name for Lao  
            'laos': 'lo', // Alternative name for Lao
            'hmong': 'hmn',
            'khmer': 'km',
            'cambodian': 'km', // Alternative name for Khmer
            'burmese': 'my',
            'myanmar': 'my', // Alternative name for Burmese
            'tagalog': 'tl',
            'filipino': 'tl', // Alternative name for Tagalog
            'indonesian': 'id',
            'malay': 'ms',
            'dutch': 'nl',
            'norwegian': 'no',
            'polish': 'pl',
            'swedish': 'sv',
            'danish': 'da',
            'finnish': 'fi',
            'greek': 'el',
            'hebrew': 'he',
            'turkish': 'tr',
            'czech': 'cs',
            'hungarian': 'hu',
            'romanian': 'ro',
            'bulgarian': 'bg',
            'croatian': 'hr',
            'serbian': 'sr',
            'slovenian': 'sl',
            'slovak': 'sk',
            'lithuanian': 'lt',
            'latvian': 'lv',
            'estonian': 'et',
            'ukrainian': 'uk'
        };
    }

    /**
     * Translate text from one language to another
     * @param {string} text - Text to translate
     * @param {string} to - Target language code (e.g., 'en', 'es', 'fr')
     * @param {string} from - Source language code (default: 'auto' for auto-detection)
     * @returns {Promise<Object>} Translation result object
     */
    async translateText(text, to, from = 'auto') {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text must be a non-empty string');
            }

            if (!to) {
                throw new Error('Target language is required');
            }

            // Convert language names to codes if necessary
            const fromCode = this.getLanguageCode(from);
            const toCode = this.getLanguageCode(to);

            const result = await translate(text, { 
                from: fromCode, 
                to: toCode 
            });

            return {
                success: true,
                originalText: text,
                translatedText: result.text,
                sourceLanguage: result.from.language.iso,
                targetLanguage: toCode,
                confidence: result.from.text.autoCorrected || result.from.text.didYouMean
            };

        } catch (error) {
            console.error('Translation error:', error);
            return {
                success: false,
                error: error.message,
                originalText: text
            };
        }
    }

    /**
     * Translate multiple texts at once
     * @param {Array<string>} texts - Array of texts to translate
     * @param {string} to - Target language code
     * @param {string} from - Source language code (default: 'auto')
     * @returns {Promise<Array>} Array of translation results
     */
    async translateMultiple(texts, to, from = 'auto') {
        if (!Array.isArray(texts)) {
            throw new Error('Texts must be an array');
        }

        const translations = await Promise.all(
            texts.map(text => this.translateText(text, to, from))
        );

        return translations;
    }

    /**
     * Get language code from language name or return the code if already provided
     * @param {string} language - Language name or code
     * @returns {string} Language code
     */
    getLanguageCode(language) {
        if (!language) return 'auto';
        
        const lowercaseLanguage = language.toLowerCase();
        return this.languages[lowercaseLanguage] || language;
    }

    /**
     * Get available languages
     * @returns {Object} Object with language names as keys and codes as values
     */
    getAvailableLanguages() {
        return { ...this.languages };
    }

    /**
     * Detect the language of given text
     * @param {string} text - Text to detect language for
     * @returns {Promise<Object>} Detection result
     */
    async detectLanguage(text) {
        try {
            const result = await translate(text, { to: 'en' });
            return {
                success: true,
                detectedLanguage: result.from.language.iso,
                confidence: result.from.text.autoCorrected || result.from.text.didYouMean,
                text: text
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                text: text
            };
        }
    }
}

module.exports = Translator;
