const express = require('express')
const Wappalyzer = require('wappalyzer')
const morgan = require('morgan')

const PORT = 3000

const app = express()

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Wappalyzer API is ready! 🚀')
})

app.get('/extract', (req, res) => {

  // TODO: Handle missing URL

  let url = req.query.url

  if (url == undefined || url == '') {
    res.status(400).send('missing url query parameter')
    return
  }

  const options = {
    // browser: 'puppeteer',
    debug: false,
    maxDepth: 1,
    recursive: false,
    maxWait: 20000,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
  }

  const wappalyzer = new Wappalyzer(url, options)
  wappalyzer.analyze()
    .then((json) => {
      res.send(`${JSON.stringify(json, null, 2)}`)
    })
    .catch((error) => {
      res.status(500).send(`${error}\n`)
    })
})

app.listen(PORT, () => console.log(`Starting Wappalyzer on http://0.0.0.0:${PORT}`))