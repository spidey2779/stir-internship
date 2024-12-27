const axios = require("axios");
const { Builder, By, until } = require("selenium-webdriver");
const { v4: uuidv4 } = require("uuid");
const proxy = require("selenium-webdriver/proxy");
const HttpsProxyAgent = require("https-proxy-agent"); // Import as function, not constructor

const username = process.env.USER_NAME; // Replace with your actual ProxyMesh username
const password = process.env.PASSWORD; // Replace with your actual ProxyMesh password
const proxyHost = process.env.PROXY_HOST;
const proxyPort =process.env.PROXY_PORT;

// Proxy URL and Authentication
const proxyUrl = `http://${username}:${password}@${proxyHost}:${proxyPort}`;

// Create Proxy Agent using the correct API
const agent = new HttpsProxyAgent(proxyUrl);

const runSeleniumScript = async () => {
  let driver;
  try {
    // Fetch proxy IP
    const ipResponse = await axios.get("https://api.ipify.org?format=json", {
      httpsAgent: agent,
    });
    const proxyIp = ipResponse.data.ip; // This is the IP of the proxy

    // console.log('Proxy IP Address:', proxyIp);  // Print the IP address being used by the proxy

    // Use the fetched proxy IP in the Selenium script
    const seleniumProxyUrl = `http://${username}:${password}@${proxyHost}:${proxyPort}`;

    driver = await new Builder()
      .forBrowser("chrome")
      .setProxy(proxy.manual({ http: seleniumProxyUrl }))
      .build();

    // Selenium actions for Twitter login and trend collection
    await driver.get("https://x.com/i/flow/login");

    const userInput = await driver.wait(
      until.elementLocated(By.name("text")),
      20000 // wait for up to 10 seconds
    );
    await userInput.sendKeys("gtejaSpidey");

    const nextButton = await driver.findElement(
      By.css(
        "button.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-ywje51.r-184id4b.r-13qz1uu.r-2yi16.r-1qi8awa.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
      )
    );
    await nextButton.click();

    const passwordInput = await driver.wait(
      until.elementLocated(By.name("password")),
      20000
    );
    await passwordInput.sendKeys("Spidey@123");

    const loginButton = await driver.findElement(
      By.css('[data-testid="LoginForm_Login_Button"]')
    );
    await loginButton.click();

    await driver.wait(until.urlContains("https://x.com/home"), 15000);
    // console.log("Login successful!");

    let trendsElements = await driver.wait(
      until.elementsLocated(
        By.css(
          'div[dir="ltr"] span.r-18u37iz > span[dir="ltr"].css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3'
        )
      ),
      30000 // Wait up to 30 seconds
    );


    const topTrends = [];
    for (let i = 0; i < Math.min(5, trendsElements.length); i++) {
      const trendText = await trendsElements[i].getText();
      if (trendText) {
        topTrends.push(trendText);
      }
    }

    const uniqueID = uuidv4();

    return {
      uniqueID,
      trends: topTrends,
      timestamp: new Date(),
      ipAddress: proxyIp, // Add the fetched proxy IP to the result
    };
  } catch (error) {
    console.error("Error running Selenium script:", error);
    throw error;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
};

module.exports = { runSeleniumScript };
