import {test, expect} from '@playwright/test';
import MCR from "monocart-coverage-reports";

test('loads initial screen', async ({page}) => {
    await Promise.all([
        page.coverage.startJSCoverage({
            resetOnNavigation: false
        }),
        page.coverage.startCSSCoverage({
            resetOnNavigation: false
        })
    ]);

    // Start test body
    await page.goto('/');

    await expect(page.getByTestId('details')).toHaveText('Select a ship from the list to see details');

    await expect(page.getByTestId('ship-link')).toHaveText([
        "Infinity Drifter",
        "Star Hopper",
        "Galaxy Cruiser",
        "Planet Hopper",
        "Space Taxi",
        "Star Destroyer",
        "Interceptor",
        "Stealth Cruiser",
        "Battleship",
        "Dreadnought",
        "Cruiser",
        "Frigate",
        "Scout Ship",
    ])
    // End test body

    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
    ]);
    const coverageData = [... jsCoverage, ... cssCoverage];

    const coverageReport = MCR({
        name: 'My Coverage Report',
        outputDir: './coverage-reports',
        reports: ['v8', 'console-details']
    });
    await coverageReport.add(coverageData);
    await coverageReport.generate();
});
