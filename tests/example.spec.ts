import {test, expect} from '@playwright/test';

test('loads initial screen', async ({page}) => {
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
});
