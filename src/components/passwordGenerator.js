// src/components/PasswordGenerator.js
import React, { useState, useEffect } from 'react';
import './passwordGenerator.css';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeAlphabets, setIncludeAlphabets] = useState(true);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
    const [previousPasswords, setPreviousPasswords] = useState([]);

    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem('previousPasswords')) || [];
        setPreviousPasswords(storedPasswords);
    }, []);

    const generatePassword = () => {
        let characters = '';
        if (includeNumbers) characters += '0123456789';
        if (includeAlphabets) characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeSpecialChars) characters += '!@#$%^&*()_+[]{}|;:,.<>?';
        let newPassword = '';
        for (let i = 0; i < 12; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(newPassword);
        updatePreviousPasswords(newPassword);
    };

    const updatePreviousPasswords = (newPassword) => {
        const updatedPasswords = [newPassword, ...previousPasswords].slice(0, 5);
        setPreviousPasswords(updatedPasswords);
        localStorage.setItem('previousPasswords', JSON.stringify(updatedPasswords));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Password copied to clipboard');
    };

    return (
        <div className="password-generator">
            <h1>Random Password Generator</h1>
            <div>
                <label>
                    <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                    Include Numbers
                </label>
                <label>
                    <input type="checkbox" checked={includeAlphabets} onChange={() => setIncludeAlphabets(!includeAlphabets)} />
                    Include Alphabets
                </label>
                <label>
                    <input type="checkbox" checked={includeSpecialChars} onChange={() => setIncludeSpecialChars(!includeSpecialChars)} />
                    Include Special Characters
                </label>
            </div>
            <button onClick={generatePassword}>Generate Password</button>
            {password && (
                <div>
                    <h2>{password}</h2>
                    <button onClick={copyToClipboard}>Copy to Clipboard</button>
                </div>
            )}
            <div>
                <h3>Last 5 Passwords</h3>
                <ul>
                    {previousPasswords.map((pwd, index) => (
                        <li key={index}>{pwd}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PasswordGenerator;
