const puppeteer = require('puppeteer')

const username = process.env.JAVACLASS_USERNAME;
const password = process.env.JAVACLASS_PASSWORD;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto('https://javaclass.top/')

  await page.click('.login-btn')
  await page.waitForSelector('.ajax-signup-form')
  await page.type('input[name="username"]', username)
  await page.type('input[name="password"]', password)
  await page.click('.go-login')
  await page.waitForNavigation()

  await page.goto('https://javaclass.top/user/')

  await page.click('.go-user-qiandao')

  await page.waitForNavigation()

  await browser.close()
})()