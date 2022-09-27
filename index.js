const { Builder, By, Key, until, ChromiumWebDriver } = require("selenium-webdriver");
const fs = require("fs");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { Options } = require("selenium-webdriver/chrome");
const { Client, GatewayIntentBits, TextChannel } = require('discord.js');
const { isObject } = require("util");
const client = new Client({intents: [GatewayIntentBits.Guilds]})

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

let booked = false;
let people = 2;

async function sendEmail() {
  const send = require("gmail-send")({
    user: 'naveencena42@gmail.com',
    pass: 'nevergiveup1999',
    to: [
      "velnaveen99@gmail.com"
    ],
    text: `hi`,
  });

  send(
    {
      subject: `Alert -  Tickets available at `
    },
    async function(err, res, full) {
      if (err) return console.log(err);
      console.log("res:", res);
      console.log("full:", full);
    }
  );
}

async function example() {
  let options = new Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage')
  let driver = await new Builder()
                  .forBrowser("chrome")
                  .setChromeOptions(options)
                  .build();
  try {
    driver
      .manage()
      .window()
      .maximize();
    console.log('here')
    await driver.get(`https://in.bookmyshow.com/buytickets/ponniyin-selvan-part-1-pondicherry/movie-pond-ET00323897-MT/20220930`);
    console.log(`Searching for theatre - `);
    await driver.findElement(By.className("__search")).click();
    await driver.findElement(By.id("fltrsearch")).sendKeys("PVR: The Cinema Providence");
    let showTimes = await driver.findElements(
      By.css("#venuelist > li:not(._none) > .body > .showtime-pill-wrapper > div:not(._soldout) > a")
    );
    console.log(showTimes)
    if(showTimes.length !==0) {
      console.log('sending message');
      (await client.channels.fetch('1024225185538248727')).send('tickets open for PS-I at PVR @everyone');
      return;
    }
    
  } finally {
    await driver.quit();
    setTimeout(example, 10000);
  }
}



client.once('ready', () => {
  example();
	console.log('Ready!');
});

client.login(process.env.TOKEN)