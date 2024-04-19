const form = document.querySelector('form');
const hiringRadio = document.getElementById('hiring');
const rateInput = document.getElementById('rate-input');

function toggleRateInput() {
    if (hiringRadio.checked) {
        rateInput.classList.remove('hidden');
    } else {
        rateInput.classList.add('hidden');
    }
}

hiringRadio.addEventListener('change', toggleRateInput);

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    let isValid = true;

    for (const [key, value] of formData.entries()) {
        if (value === '') {
            isValid = false;
            console.error(`${key} is required`);
        }
    }

    const postalCode = formData.get('postal');
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!postalCodeRegex.test(postalCode)) {
        isValid = false;
        console.error('Invalid postal code format');
    }

    if (hiringRadio.checked) {
        const rate = formData.get('rate');
        if (isNaN(rate) || rate <= 0) {
            isValid = false;
            console.error('Invalid rate value');
        }
    }

    if (isValid) {
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                form.reset();
                rateInput.classList.add('hidden');
                alert('Form submitted successfully!');
            })
            .catch(error => console.error('Error:', error));
    }
});