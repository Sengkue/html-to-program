const Translator = require('./translator');

/**
 * Example usage of the Translator class
 */
async function demonstrateTranslation() {
    const translator = new Translator();
    
    console.log('=== Translation Examples ===\n');
    
    // Example 1: Basic translation
    console.log('1. Basic Translation:');
    const result1 = await translator.translateText('Hello, how are you?', 'es');
    if (result1.success) {
        console.log(`Original: ${result1.originalText}`);
        console.log(`Translated: ${result1.translatedText}`);
        console.log(`From: ${result1.sourceLanguage} to ${result1.targetLanguage}\n`);
    } else {
        console.log(`Error: ${result1.error}\n`);
    }
    
    // Example 2: Translation with specified source language
    console.log('2. Translation with Source Language:');
    const result2 = await translator.translateText('Bonjour, comment allez-vous?', 'en', 'fr');
    if (result2.success) {
        console.log(`Original: ${result2.originalText}`);
        console.log(`Translated: ${result2.translatedText}`);
        console.log(`From: ${result2.sourceLanguage} to ${result2.targetLanguage}\n`);
    } else {
        console.log(`Error: ${result2.error}\n`);
    }
    
    // Example 3: Language detection
    console.log('3. Language Detection:');
    const detection = await translator.detectLanguage('Guten Tag! Wie geht es Ihnen?');
    if (detection.success) {
        console.log(`Text: ${detection.text}`);
        console.log(`Detected Language: ${detection.detectedLanguage}\n`);
    } else {
        console.log(`Error: ${detection.error}\n`);
    }
    
    // Example 4: Multiple translations
    console.log('4. Multiple Translations:');
    const texts = ['Hello', 'Good morning', 'Thank you'];
    const results = await translator.translateMultiple(texts, 'fr');
    results.forEach((result, index) => {
        if (result.success) {
            console.log(`${texts[index]} → ${result.translatedText}`);
        } else {
            console.log(`Error translating "${texts[index]}": ${result.error}`);
        }
    });
    
    console.log('\n5. Available Languages:');
    const languages = translator.getAvailableLanguages();
    console.log(Object.keys(languages).join(', '));
}

// Usage examples for different contexts
async function exampleUsageInElectronApp() {
    const translator = new Translator();
    
    // Example: Translate user input
    async function translateUserText(userInput, targetLang) {
        const result = await translator.translateText(userInput, targetLang);
        
        if (result.success) {
            return {
                original: result.originalText,
                translated: result.translatedText,
                from: result.sourceLanguage,
                to: result.targetLanguage
            };
        } else {
            throw new Error(`Translation failed: ${result.error}`);
        }
    }
    
    // Example: Translate file content
    async function translateFileContent(content, targetLang) {
        // Split content into smaller chunks if needed
        const chunks = content.match(/.{1,5000}/g) || [content];
        const translations = await translator.translateMultiple(chunks, targetLang);
        
        const translatedChunks = translations
            .filter(t => t.success)
            .map(t => t.translatedText);
            
        return translatedChunks.join('');
    }
    
    console.log('\n=== Electron App Usage Examples ===');
    
    // Test the functions
    try {
        const userResult = await translateUserText('Hello World!', 'es');
        console.log('User text translation:', userResult);
        
        const fileResult = await translateFileContent('This is a sample file content.', 'fr');
        console.log('File content translation:', fileResult);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run examples if this file is executed directly
if (require.main === module) {
    demonstrateTranslation()
        .then(() => exampleUsageInElectronApp())
        .catch(console.error);
}

module.exports = {
    demonstrateTranslation,
    exampleUsageInElectronApp
};
