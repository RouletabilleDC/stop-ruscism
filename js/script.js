let selectedLanguage = 'en'; // Default language is English
const formElement = document.getElementById('signup-form');
const linkElement = document.getElementById('mobile-link');
const linkExternalElement = document.getElementById('mobile-link-external');
const creditsBtn = document.getElementById('credits-btn');
const creditsOverlay = document.getElementById('credits-overlay');

const pdfjs = require('pdfjs-dist');
import be from '../../pdfs/Manifesto_BE.pdf';
import de from '../../pdfs/Manifesto_DE.pdf';
import en from '../../pdfs/Manifesto_EN.pdf';
import fr from '../../pdfs/Manifesto_FR.pdf';
import it from '../../pdfs/Manifesto_IT.pdf';
import ru from '../../pdfs/Manifesto_RU.pdf';
import ukr from '../../pdfs/Manifesto_UKR.pdf';
import pl from '../../pdfs/Manifesto_PL.pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.js';

// Create a function to load and render a PDF

const formLinks = {
    en: 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ktzv5LdKCMyrQWy0SdpnSne7KPi5l1EOL42FhFxbmtzJqA/viewform?embedded=true',
    ru: 'https://docs.google.com/forms/d/e/1FAIpQLSeHJztf37gSVXOYNSKJ6XuJ5DCPoyXTDp337fDC96bUF1lDcA/viewform?embedded=true',
    ukr: 'https://docs.google.com/forms/d/e/1FAIpQLSeA25P6BVLJCl92EhjYAiFMzctGYmyMwpEZfVxwJcaq5BSnEw/viewform?embedded=true'
};

const formExternalLinks = {
    en: 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ktzv5LdKCMyrQWy0SdpnSne7KPi5l1EOL42FhFxbmtzJqA/viewform?embedded=true',
    ru: 'https://docs.google.com/forms/d/e/1FAIpQLSeHJztf37gSVXOYNSKJ6XuJ5DCPoyXTDp337fDC96bUF1lDcA/viewform?embedded=true',
    ukr: 'https://docs.google.com/forms/d/e/1FAIpQLSeA25P6BVLJCl92EhjYAiFMzctGYmyMwpEZfVxwJcaq5BSnEw/viewform?embedded=true'
}

const formLanguages = {
    be: {
        link: formLinks.ukr,
        externalLink: formExternalLinks.ukr,
    },
    de: {
        link: formLinks.en,
        externalLink: formExternalLinks.en
    },
    en: {
        link: formLinks.en,
        externalLink: formExternalLinks.en
    },
    fr: {
        link: formLinks.en,
        externalLink: formExternalLinks.en
    },
    it: {
        link: formLinks.en,
        externalLink: formExternalLinks.en
    },
    ru: {
        link: formLinks.ru,
        externalLink: formExternalLinks.ru
    },
    ukr: {
        link: formLinks.ukr,
        externalLink: formExternalLinks.ukr
    },
    pl: {
        link: formLinks.en,
        externalLink: formExternalLinks.en
    }
};

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

    const pdfPathMap = {
        en,
        de,
        be,
        fr,
        de,
        it,
        ru,
        ukr,
        pl
    };



    async function renderPDF(url, container) {
        const loadingTask = pdfjs.getDocument(url);

        try {
            const pdfDocument = await loadingTask.promise;

            for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
                console.log(pageNumber);
                // const page = await pdfDocument.getPage(pageNumber);
                // const canvasWrapper = document.createElement('div');
                // canvasWrapper.className = 'pdf-page-wrapper';
                // container.appendChild(canvasWrapper);

                // const canvas = document.createElement('canvas');
                // canvasWrapper.appendChild(canvas);

                // const viewport = page.getViewport({ scale: 1 });

                // // Calculate the scale factor to fit the page width to the container's width
                // const containerWidth = container.clientWidth;
                // const scale = containerWidth / viewport.width;

                // canvas.height = viewport.height * scale;
                // canvas.width = containerWidth;

                // const renderContext = {
                //     canvasContext: canvas.getContext('2d'),
                //     viewport: page.getViewport({ scale })
                // };

                // await page.render(renderContext);

                pdfDocument.getPage(pageNumber).then(function (page) {
                    const canvasWrapper = document.createElement('div');
                    canvasWrapper.className = 'pdf-page-wrapper';
                    container.appendChild(canvasWrapper);

                    const canvas = document.createElement('canvas');
                    canvasWrapper.appendChild(canvas);

                    const viewport = page.getViewport({ scale: 1 });

                    // Calculate the scale factor to fit the page width to the container's width
                    const containerWidth = container.clientWidth;
                    const scale = containerWidth / viewport.width;

                    canvas.height = viewport.height * scale;
                    canvas.width = containerWidth;

                    const renderContext = {
                        canvasContext: canvas.getContext('2d'),
                        viewport: page.getViewport({ scale })
                    };

                    // Render the page content on the canvas
                    page.render(renderContext);
                });
            }
        } catch (error) {
            console.error('Error rendering PDF:', error);
        }
    }


    // Call the renderPDF function with the PDF URL and container element
    const pdfContainer = document.getElementById('pdfContainer');
    renderPDF(pdfPathMap[selectedLanguage], pdfContainer);

}

// Function to update the website content based on the selected language
function updateContent() {
    // Update the link text with the selected language
    formElement.src = formLanguages[selectedLanguage].link;

    linkExternalElement.href = formLanguages[selectedLanguage].externalLink


    // Update the PDF path based on the selected language



}

function openCredits() {

    creditsOverlay.style.display = 'flex'

}

function closeCredits() {
    creditsOverlay.style.display = 'none'
}





// Call the updateContent function whenever the selectedLanguage changes
// const languageSelect = document.getElementById('language-select');
// languageSelect.addEventListener('change', acceptLanguage); // Add event listener to the language select element

// Attach the event listener for the "Accept" button when the document is ready
document.addEventListener('DOMContentLoaded', function () {

    const yearElement = document.getElementById('current-year')
    yearElement.innerHTML = new Date().getFullYear();
    const languagePopup = document.getElementById('language-popup');
    languagePopup.style.display = 'flex'; // Show the language pop-up

    const acceptButton = document.getElementById('accept-btn');
    acceptButton.addEventListener('click', acceptLanguage); // Add event listener to the "Accept" button

    creditsBtn.addEventListener('click', openCredits)
    creditsOverlay.addEventListener('click', closeCredits)


    const titleElement = document.getElementById('main-title');
    const embedElement = document.querySelector('.embed-wrapper');

    let offsetHeight = titleElement.offsetHeight + linkElement.offsetHeight + 60
    embedElement.style.height = `calc(100% - ${offsetHeight})`;

    pdfContainer.style.maxHeight = `calc(100% - ${offsetHeight})`;

});