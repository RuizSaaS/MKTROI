# ROI Marketing Calculator

A simple web application to calculate the Return on Investment (ROI) for marketing campaigns and view a dashboard of consolidated results.

## Features

*   **ROI Calculator:**
    *   Input fields for "Investment Amount" and "Revenue Generated".
    *   Calculates ROI using the formula: `ROI = ((Revenue Generated - Investment Amount) / Investment Amount) * 100%`.
    *   Handles invalid inputs and division by zero scenarios.
*   **Dashboard:**
    *   Displays summary metrics:
        *   Total Investment
        *   Total Revenue
        *   Overall ROI
    *   Shows a history of past calculations in a table.
    *   Calculation history is persisted in the browser using `localStorage`.
*   **Modern & Clean UI:**
    *   Styled with CSS for a responsive and user-friendly experience.
*   **Side Menu Navigation:**
    *   Intuitive navigation via a side menu to access different application sections (ROI Calculator, Dashboard).
*   **Multilingual Support (i18n):**
    *   Interface available in Portuguese (pt) and English (en).
    *   Defaults to Portuguese, with an option to switch to English using a button in the menu.
    *   Language preference is saved in the browser's `localStorage`.

## Tech Stack

*   HTML
*   **Tailwind CSS (via CDN):** Utilized for the primary styling and layout of the application.
*   Vanilla JavaScript
*   **Custom CSS:** Minimal custom styles (for specific design elements like hexagons, custom color classes, and font imports) are included in a `<style>` block within `index.html`.

### Design System: "Abyss/Hive"

*   **Framework:** The "Abyss/Hive" design system is implemented using Tailwind CSS utility classes and a few custom CSS definitions.
*   **Palette:** Features a dark, high-contrast color scheme with "Abyss Blue" (deep blue/black) and "Deep Slate" (dark gray) as base colors, accented by "Golden Hive" (yellow/gold) and "Bright Pollen" (orange/amber) for highlights and calls to action. Supporting colors include "Light Nectar", "White Honey", "Honeycomb Gray", and "Pollen Dust".
*   **Typography:** Uses the 'Inter' font (imported from Google Fonts) for a clean and modern look.
*   **Visual Elements:** Incorporates thematic visual elements such as hexagons to enhance the user interface.

## Project Structure

*   `index.html`: Main HTML file for the single-page application. Contains the structure and the primary block of custom CSS.
*   `style.css`: Emptied; styles are primarily via Tailwind CSS and an inline `<style>` block in `index.html` for customizations.
*   `app.js`: Core JavaScript logic including navigation, DOM manipulation, ROI calculations, dashboard updates, and internationalization.
*   `locales.js`: Stores translation strings for internationalization (i18n).
*   `components/`: Directory for potential future JavaScript components (currently contains placeholders `ROICalculator.js` and `Dashboard.js` which are not actively importing separate logic but `app.js` handles their conceptual roles).
*   `img/`: Directory for images (currently empty).
*   `tests/`: Directory for unit tests.
    *   `roi.test.js`: Unit tests for the ROI calculation logic.
    *   `test_runner.html`: HTML page to run the tests in a browser.

## How to Run

1.  **View the Application:**
    *   Simply open the `index.html` file in your web browser.
    *   Use the side menu (accessible via the "hamburger" icon on the top-left) to navigate between the ROI Calculator and the Dashboard.
    *   To change the language, use the dedicated button within the side menu.

2.  **Run Unit Tests:**
    *   Open the `tests/test_runner.html` file in your web browser.
    *   Open the browser's developer console (usually by pressing F12) to see the test results.

## Future Enhancements (Ideas)

*   User authentication.
*   Cloud data storage.
*   Advanced charting for the dashboard.
*   More detailed campaign tracking.
*   Export data functionality (CSV/PDF).
