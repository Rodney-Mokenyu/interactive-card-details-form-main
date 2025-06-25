document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded ✅');

    const cardForm = document.getElementById('card-form');

    // Input fields
    const cardholderNameInput = document.getElementById('cardholderName');
    const cardNumberInput = document.getElementById('cardNumber');
    const expMonthInput = document.getElementById('expMonth');
    const expYearInput = document.getElementById('expYear');
    const cvcInput = document.getElementById('cvc');

    // Error message containers
    const cardholderNameError = document.getElementById('cardholderNameError');
    const cardNumberError = document.getElementById('cardNumberError');
    const expDateError = document.getElementById('expDateError'); // Combined error for month/year
    const cvcError = document.getElementById('cvcError');

    // Preview elements (update these in real-time)
    const previewCardholderName = document.querySelector('.cardholder-name');
    const previewCardNumber = document.querySelector('.card-number');
    const previewExpDate = document.querySelector('.card-expiry-date');
    const previewCvc = document.querySelector('.card-cvc');

    // Completed state and continue button
    const completedState = document.querySelector('.completed-state');
    const continueButton = document.querySelector('.btn-continue');

    // Helper function to update preview for expiry date
    function updateExpDatePreview() {
        const month = expMonthInput.value.trim();
        const year = expYearInput.value.trim();
        previewExpDate.textContent = `${month || 'MM'}/${year || 'YY'}`;
    }

    // Validation function for EXP. DATE fields
    function validateExpDate() {
        const monthValue = expMonthInput.value.trim();
        const yearValue = expYearInput.value.trim();

        let isValid = true;
        let errorMessage = '';

        if (!monthValue && !yearValue) {
            errorMessage = 'Can\'t be blank';
            isValid = false;
        } else if (!monthValue) {
            errorMessage = 'Can\'t be blank';
            isValid = false;
        } else if (!yearValue) {
            errorMessage = 'Can\'t be blank';
            isValid = false;
        } else if (!/^\d{2}$/.test(monthValue) || parseInt(monthValue) < 1 || parseInt(monthValue) > 12) {
             errorMessage = 'Invalid month'; // Basic month format check
             isValid = false;
        } else if (!/^\d{2}$/.test(yearValue)) {
            errorMessage = 'Invalid year'; // Basic year format check
            isValid = false;
        }

        // Apply invalid class to both inputs if there's an error
        expMonthInput.classList.toggle('is-invalid', !isValid);
        expYearInput.classList.toggle('is-invalid', !isValid);

        // Display error message
        expDateError.textContent = errorMessage;

        return isValid;
    }


    // --- Event Listeners for Input Fields ---

    cardholderNameInput.addEventListener('input', function() {
        const value = cardholderNameInput.value.trim();
        previewCardholderName.textContent = value || 'Cardholder Name';
        cardholderNameError.textContent = value ? '' : 'Cardholder name is required.';
        if (!value) {
            cardholderNameInput.classList.add('is-invalid');
        } else {
            cardholderNameInput.classList.remove('is-invalid');
        }
    });

    cardNumberInput.addEventListener('input', function() {
        let value = cardNumberInput.value.replace(/\s/g, ''); // Remove spaces for validation
        // Format for display (add spaces every 4 digits)
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        cardNumberInput.value = formattedValue; // Update input field with formatted value

        previewCardNumber.textContent = formattedValue || '0000 0000 0000 0000'; // Default preview

        // Validation for numbers only and length
        if (!/^\d+$/.test(value)) {
            cardNumberInput.classList.add('is-invalid');
            cardNumberError.textContent = value ? 'Wrong format, numbers only.' : 'Card number is required.';
        } else if (value.length !== 16) { // Assuming 16 digits for card number
            cardNumberInput.classList.add('is-invalid');
            cardNumberError.textContent = 'Card number must be 16 digits.';
        } else {
            cardNumberInput.classList.remove('is-invalid');
            cardNumberError.textContent = '';
        }
    });

    expMonthInput.addEventListener('input', function() {
        // Only allow digits and max 2 characters
        this.value = this.value.replace(/\D/g, '').substring(0, 2);
        updateExpDatePreview(); // Update preview
        validateExpDate(); // Validate on each input
    });

    expYearInput.addEventListener('input', function() {
        // Only allow digits and max 2 characters
        this.value = this.value.replace(/\D/g, '').substring(0, 2);
        updateExpDatePreview(); // Update preview
        validateExpDate(); // Validate on each input
    });

    cvcInput.addEventListener('input', function() {
        // Only allow digits and max 4 characters
        this.value = this.value.replace(/\D/g, '').substring(0, 4);

        const value = cvcInput.value.trim();
        previewCvc.textContent = value || '000'; // Default preview

        if (!value) {
            cvcError.textContent = 'Can\'t be blank.';
            this.classList.add('is-invalid');
        } else if (!/^\d+$/.test(value)) {
            cvcError.textContent = 'Wrong format, numbers only.';
            this.classList.add('is-invalid');
        } else {
            cvcError.textContent = '';
            this.classList.remove('is-invalid');
        }
    });


    // --- Form Submission (Example) ---
    const confirmButton = document.getElementById('confirm-button'); // Assuming you have a confirm button with this ID

    if (confirmButton) {
        confirmButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Re-run all validations on submit
            const isNameValid = !cardholderNameInput.classList.contains('is-invalid');
            const isNumberValid = !cardNumberInput.classList.contains('is-invalid');
            const isExpDateValid = validateExpDate(); // This function now handles adding/removing 'is-invalid'
            const isCvcValid = !cvcInput.classList.contains('is-invalid');

            // You might want to re-check all inputs explicitly here if they haven't been touched
            // Force validation check on fields that might be empty on submit
            if (cardholderNameInput.value.trim() === '') {
                cardholderNameInput.classList.add('is-invalid');
                cardholderNameError.textContent = 'Cardholder name is required.';
            }
            if (cardNumberInput.value.trim() === '') {
                 cardNumberInput.classList.add('is-invalid');
                 cardNumberError.textContent = 'Card number is required.';
            }
            if (cvcInput.value.trim() === '') {
                 cvcInput.classList.add('is-invalid');
                 cvcError.textContent = 'Can\'t be blank.';
            }


            if (isNameValid && isNumberValid && isExpDateValid && isCvcValid) {
                // All fields are valid, proceed to completed state
                cardForm.style.display = 'none'; // Hide the form
                if (completedState) {
                    completedState.classList.remove('d-none'); // shows it

                }
                
            } else {
                console.log("Form has errors. Please check all fields.");
            }
        });
    
    }

    // For the "Continue" button on the completed state (if you have one)
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            // Reset form or navigate away
            cardForm.style.display = 'block'; // Show the form again
            if (completedState) {
                completedState.classList.add('d-none'); // Hide completed state
            }
            // Optionally, reset all form fields and error messages here
            cardForm.reset();
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
            // Reset preview values
            previewCardholderName.textContent = 'Cardholder Name';
            previewCardNumber.textContent = '0000 0000 0000 0000';
            previewExpDate.textContent = 'MM/YY';
            previewCvc.textContent = '000';
        });
    }
});