let selectedLanguage = 'en'; // Default language is English
const manifestoElement = document.getElementById('manifesto')

const formElement = document.getElementById('signup-form')

const formLinks = {
    en: 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ktzv5LdKCMyrQWy0SdpnSne7KPi5l1EOL42FhFxbmtzJqA/viewform?embedded=true',
    ru: 'https://docs.google.com/forms/d/e/1FAIpQLSeHJztf37gSVXOYNSKJ6XuJ5DCPoyXTDp337fDC96bUF1lDcA/viewform?embedded=true',
    ukr: 'https://docs.google.com/forms/d/e/1FAIpQLSeA25P6BVLJCl92EhjYAiFMzctGYmyMwpEZfVxwJcaq5BSnEw/viewform?embedded=true'
}

const formLanguages = {
    be: {
        link: formLinks.ukr
    },
    de: {
        link: formLinks.en
    },
    en: {
        link: formLinks.en
    },
    fr: {
        link: formLinks.en
    },
    it: {
        link: formLinks.en
    },
    ru: {
        link: formLinks.ru
    },
    ukr: {
        link: formLinks.ukr
    }

}




// Function to handle the accept button click
function acceptLanguage() {
    const languageSelect = document.getElementById('language-select');
    selectedLanguage = languageSelect.value;

    const languagePopup = document.getElementById('language-popup');
    languagePopup.style.display = 'none'; // Hide the pop-up

    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'flex'; // Show the main content

    // Update the website content based on the selected language
    updateContent();

    console.log('git live')
}

// Function to update the website content based on the selected language
function updateContent() {
    // Update the link text with the selected language
    manifestoElement.src = './manifestos/Manifesto_' + selectedLanguage.toUpperCase() + '.pdf'
    console.log(formLanguages[selectedLanguage].link)
    formElement.src = formLanguages[selectedLanguage].link


}

// Attach the event listener for the "Accept" button when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    const languagePopup = document.getElementById('language-popup');
    languagePopup.style.display = 'flex'; // Show the language pop-up

    const acceptButton = document.getElementById('accept-btn');
    acceptButton.addEventListener('click', acceptLanguage); // Add event listener to the "Accept" button

    const titleElement = document.getElementById('main-title')
    const embedElement = document.querySelector('.embed-wrapper')
    embedElement.style.height = `calc(100% - ${titleElement.offsetHeight})`




    updateContent();
});