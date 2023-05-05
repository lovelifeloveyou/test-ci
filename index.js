const puppeteer = require('puppeteer')
const axios = require('axios')

const username = process.env.USERNAME
const password = process.env.PASSWORD
const API_PATH = 'https://javaclass.top/wp-admin/admin-ajax.php'

async function login () {
  try {
    await axios.post(API_PATH, {
      action: 'user_login',
      username,
      password,
      rememberme: 1,
    })
  } catch (error) {
    console.error('Login error:', error)
  }
}

async function signIn (nonce) {
  try {
    await axios.post(API_PATH, {
      action: 'user_qiandao',
      nonce
    })
  } catch (error) {
    console.error('Sign in error:', error)
  }
}

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://javaclass.top/')

  const isLoggedIn = await page.evaluate(() => {
    return !!document.cookie.match(/wordpress_logged_in_1083578057531482388f439dd1d0d527/);
  })

  console.log('isLoggedIn', isLoggedIn)

  if (!isLoggedIn) {
    await login()
  }

  await page.goto('https://javaclass.top/user/')
  const nonce = await page.$eval('.go-user-qiandao', el => el.dataset.nonce)
  console.log('nonce', nonce)

  await signIn(nonce)

  await browser.close()
})()