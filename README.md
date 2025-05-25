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

## Tech Stack

*   HTML
*   CSS
*   Vanilla JavaScript

## Project Structure

*   `index.html`: Main HTML file.
*   `style.css`: Styles for the application.
*   `app.js`: Core JavaScript logic for calculator and dashboard.
*   `components/`: Directory for potential future JavaScript components (currently contains placeholders `ROICalculator.js` and `Dashboard.js` which are not actively importing separate logic but `app.js` handles their conceptual roles).
*   `img/`: Directory for images (currently empty).
*   `tests/`: Directory for unit tests.
    *   `roi.test.js`: Unit tests for the ROI calculation logic.
    *   `test_runner.html`: HTML page to run the tests in a browser.

## How to Run

1.  **View the Application:**
    *   Simply open the `index.html` file in your web browser.

2.  **Run Unit Tests:**
    *   Open the `tests/test_runner.html` file in your web browser.
    *   Open the browser's developer console (usually by pressing F12) to see the test results.

## Future Enhancements (Ideas)

*   User authentication.
*   Cloud data storage.
*   Advanced charting for the dashboard.
*   More detailed campaign tracking.
*   Export data functionality (CSV/PDF).
