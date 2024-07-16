const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const schedule = require('node-schedule');

// Define all constant values
const URL = 'https://na.wotblitz.com/en/tournaments/streams/528/#/active';
const XPATH_LOGIN_BUTTON = '/html/body/div[1]/div/div[3]/div[1]/p/button';
const XPATH_REGION_SELECTION = '//*[@id="app"]/div/div[2]/div/div/div/div/div/div/ul/li[1]/a';
const XPATH_EMAIL_FIELD = '//*[@id="id_login"]';
const XPATH_PASSWORD_FIELD = '//*[@id="id_password"]';
const XPATH_SUBMIT_BUTTON = '/html/body/div[1]/div/div[3]/div/div/div/div[1]/span/form/div/fieldset[2]/span[1]/button';
const XPATH_COOKIE_BANNER = '/html/body/div[3]/div[2]/div/div[2]/button'; // XPath for the X button on the cookie banner
const EMAIL = '';
const PASSWORD = '';
const SCHEDULED_TIME = '2024-07-16T10:55:00Z'; // Convert 07/16/2024 03:55:00 AM PST to UTC
const LIVE_EVENT_DURATION_IN_MS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

async function main() {
	let options = new chrome.Options();
	options.addArguments('--start-maximized');

	let driver = await new Builder()
		.forBrowser('chrome')
		.setChromeOptions(options)
		.build();

	try {
		// Step 1: Open a page on the browser
		await driver.get(URL);

		// Step 2: Click on the "Log In" button
		console.log('Waiting for the login button to be located using XPath:', XPATH_LOGIN_BUTTON);
		await driver.wait(until.elementLocated(By.xpath(XPATH_LOGIN_BUTTON)), 10000);
		console.log('Login button located, attempting to click it.');
		await driver.findElement(By.xpath(XPATH_LOGIN_BUTTON)).click();
		console.log('Login button clicked.');

		// Step 3: Select region "North America"
		await driver.wait(until.elementLocated(By.xpath(XPATH_REGION_SELECTION)), 10000);
		await driver.findElement(By.xpath(XPATH_REGION_SELECTION)).click();

		// Step 4: Handle cookie consent banner if it exists
		try {
			let cookieBanner = await driver.wait(until.elementLocated(By.xpath(XPATH_COOKIE_BANNER)), 5000);
			if (cookieBanner) {
				await driver.findElement(By.xpath(XPATH_COOKIE_BANNER)).click();
				console.log('Cookie consent banner closed.');
			}
		} catch (e) {
			console.log('No cookie consent banner found or could not interact with it.');
		}
		
		// Step 5: Log in with email and password
		await driver.wait(until.elementLocated(By.xpath(XPATH_EMAIL_FIELD)), 10000);
		await driver.findElement(By.xpath(XPATH_EMAIL_FIELD)).sendKeys(EMAIL);
		await driver.findElement(By.xpath(XPATH_PASSWORD_FIELD)).sendKeys(PASSWORD);

		// Step 6: Click the submit button
		await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(XPATH_SUBMIT_BUTTON))), 10000); // Ensure the button is visible
		await driver.findElement(By.xpath(XPATH_SUBMIT_BUTTON)).click();

		// Keep the browser tab open until the end of the live event
		await driver.sleep(LIVE_EVENT_DURATION_IN_MS);

	} finally {
		// Close the browser after the event
		await driver.quit();
	}
}

// Schedule the job
const date = new Date(SCHEDULED_TIME);
schedule.scheduleJob(date, function(){
	console.log('Starting the automated login process...');
	main().catch(console.error);
});