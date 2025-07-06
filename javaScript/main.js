// main.js

/**
 * Executes code after the DOM is fully loaded and parsed.
 * This is a standard practice to ensure all HTML elements are available before script attempts to access them.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DOM Element References ---
    // Grouping: Cache references to all necessary DOM elements at the top.
    // Using `const` for variables that won't be reassigned.
    const cardForm = document.getElementById('card-form');
    // ... other buttons and input elements ...
    const cardholderNameInput = document.getElementById('cardholderName');
    // ... other error message containers ...
    const cardholderNameError = document.getElementById('cardholderNameError');
    // ... other card preview elements ...
    const previewCardholderName = document.querySelector('.cardholder-name');


    // --- 2. Helper Functions / Utilities ---
    // Grouping: Define all reusable helper functions here.
    // This promotes modularity and avoids code duplication within event listeners.
    /**
     * JSDoc comment explaining function purpose, parameters, and return.
     */
    const displayError = (inputElement, errorElement, message) => { /* ... */ };

    /**
     * Another JSDoc comment for the update function.
     */
    const updateCardPreview = () => { /* ... */ };

    // ... other validation functions like validateInputField, validateExpiryDate ...


    // --- 3. Event Listeners ---
    // Grouping: Attach all event listeners in a centralized location.
    // Listeners should ideally be lean, primarily calling helper functions.
    cardholderNameInput.addEventListener('input', () => {
        updateCardPreview();
        validateInputField(cardholderNameInput, cardholderNameError, 'text');
    });

    // ... other input listeners ...

    cardForm.addEventListener('submit', (event) => { /* ... */ });

    if (continueButton) {
        continueButton.addEventListener('click', () => { /* ... */ });
    }


    // --- 4. Initial State Setup ---
    // Grouping: Code that runs once on load to set up the initial UI state.
    updateCardPreview();
});
