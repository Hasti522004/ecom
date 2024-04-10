import React, { useContext, useState } from 'react';

// Create a context for managing language
const LanguageContext = React.createContext();

// Separate component for displaying language options
function LanguageOption({ language }) {
    const { handleLanguageSelect } = useContext(LanguageContext);

    return (
        <button onClick={() => handleLanguageSelect(language.code)}>
            {language.name}
        </button>
    );
}

// Welcome message component
function WelcomeMessage() {
    const { selectedLanguage } = useContext(LanguageContext);

    const messages = {
        en: 'Welcome to our website!',
        fr: 'Bienvenue sur notre site Web!',
        es: '¡Bienvenido a nuestro sitio web!',
        // Add more languages as needed
    };

    return <h1>{messages[selectedLanguage]}</h1>;
}

// Language selection page
function LanguageSelectionPage() {
    const { handleLanguageSelect, languages } = useContext(LanguageContext);

    return (
        <div>
            <h1>Select a Language</h1>
            <div>
                {/* Display language options */}
                {languages.map((language, index) => (
                    <LanguageOption
                        key={index}
                        language={language}
                    />
                ))}
            </div>
        </div>
    );
}

// Main component
function LanguagePage() {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    // Array of supported languages
    const languages = [
        { name: 'English', code: 'en' },
        { name: 'French', code: 'fr' },
        { name: 'Spanish', code: 'es' },
        // Add more languages as needed
    ];

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <LanguageContext.Provider value={{ selectedLanguage, handleLanguageSelect, languages }}>
            <div>
                {/* Display language selection page */}
                <LanguageSelectionPage />
                {/* Display welcome message */}
                <WelcomeMessage />
            </div>
        </LanguageContext.Provider>
    );
}

export default LanguagePage;
