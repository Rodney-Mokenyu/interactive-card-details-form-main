# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [YOUR_GITHUB_REPO_URL_HERE](https://github.com/Rodney-Mokenyu/interactive-card-details-form-main)
- Live Site URL: [YOUR_LIVE_SITE_URL_HERE](https://Rodney-Mokenyu.github.io/interactive-card-details-form-main/)
## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Vanilla JavaScript for interactivity and validation
- [Bootstrap 5](https://getbootstrap.com/) for basic styling and responsive utilities

### What I learned

During this project, I focused on several key areas to meet the challenge requirements:

-   **Real-time Input Updates:** Implementing JavaScript event listeners (`input` event) to dynamically update the credit card preview based on user input for cardholder name, number, expiry date, and CVC. This involved using `textContent` to reflect the current input.

    ```js
    cardholderNameInput.addEventListener('input', function() {
        const value = this.value;
        previewCardholderName.textContent = value || 'Jane Appleseed';
        // ... validation logic ...
    });
    ```

-   **Form Validation:** Developing robust JavaScript validation logic for all form fields, triggered both on input and on form submission. This included:
    * Checking for empty fields.
    * Validating number-only input for card number and CVC using regular expressions.
    * Specific length checks for card number (16 digits) and CVC (3 or 4 digits).
    * Combined validation for month and year, ensuring both are filled and formatted correctly, and managing a single error message for the pair.
    * Implementing a reusable `updateValidationState` function to streamline error message display and `is-invalid` class toggling.

    ```js
    function updateValidationState(inputElement, errorElement, message, isValid) {
        errorElement.textContent = message;
        inputElement.classList.toggle('is-invalid', !isValid);
    }

    function validateExpDate() {
        const monthValue = expMonthInput.value.trim();
        const yearValue = expYearInput.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (!monthValue || !yearValue) {
            errorMessage = 'Can\'t be blank';
            isValid = false;
        } else if (!/^\d+$/.test(monthValue) || parseInt(monthValue) < 1 || parseInt(monthValue) > 12) {
            errorMessage = 'Invalid month';
            isValid = false;
        } else if (!/^\d+$/.test(yearValue)) {
            errorMessage = 'Invalid year';
            isValid = false;
        }

        updateValidationState(expMonthInput, expDateError, errorMessage, isValid);
        expYearInput.classList.toggle('is-invalid', !isValid); // Apply to year as well
        return isValid;
    }
    ```

-   **Card Number Formatting:** Implementing client-side formatting for the card number input to automatically add spaces every four digits, enhancing readability for the user. This was done by removing non-digits, applying a regex for spacing, and updating the input's `value`.

    ```js
    cardNumberInput.addEventListener('input', function() {
        let cleanValue = this.value.replace(/\D/g, '');
        if (cleanValue.length > 16) {
            cleanValue = cleanValue.substring(0, 16);
        }
        const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        this.value = formattedValue;
        // ... validation ...
    });
    ```

-   **Responsive Design:** Utilizing CSS media queries to adapt the layout for desktop and mobile screen sizes, specifically adjusting the positioning and sizing of the card previews and the overall form arrangement. This involved changing `flex-direction` and using `position: absolute` for card overlaps.

    ```css
    /* Mobile Styles (Default) */
    .cards-section {
      /* ... mobile card positioning ... */
    }

    /* Desktop Styles */
    @media (min-width: 992px) {
      body {
        background: url('../images/bg-main-desktop.png') no-repeat left center / auto 100vh;
        flex-direction: row; /* Arrange main content wrapper side-by-side */
      }
      .cards-section {
        /* ... desktop card positioning ... */
      }
    }
    ```

-   **Accessibility (ARIA):** Enhanced accessibility by correctly associating error messages with input fields using `aria-describedby` and ensuring error messages are live regions with `aria-live="polite"`. Also added a `visually-hidden` `<h1>` for better screen reader experience.

### Continued development

In future projects, I would like to continue focusing on:

-   **Advanced Date Validation:** Implementing more comprehensive date validation for the expiry date, ensuring the date is not only correctly formatted but also in the future.
-   **Performance Optimization:** Exploring techniques to optimize JavaScript event handling for very high-frequency inputs, although for this challenge, the current approach is sufficient.
-   **CSS Custom Properties for Themability:** Further leveraging CSS custom properties for a more dynamic and easily customizable theme, beyond just colors.
-   **Component-Based JavaScript:** For larger projects, organizing JavaScript into more modular, reusable components to improve maintainability and scalability.

### Useful resources

-   [MDN Web Docs](https://developer.mozilla.org/en-US/) - Invaluable resource for JavaScript methods (e.g., `String.prototype.replace()`, `RegExp`), CSS properties, and HTML elements.
-   [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - Helpful for understanding and correctly implementing ARIA attributes for accessibility.
-   [Frontend Mentor Community](https://www.frontendmentor.io/community) - For inspiration and understanding common approaches to similar challenges.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@Rodney-Mokenyu](https://www.frontendmentor.io/profile/@Rodney-Mokenyu)


## Acknowledgments

Special thanks to [Frontend Mentor](https://www.frontendmentor.io/) for providing this wonderful challenge, and to Gemini AI for assistance and helpful suggestions during development.