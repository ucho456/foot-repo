/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const buildSitemap = functions.region('asia-northeast1').https.onRequest(async (_, res) => {
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const baseURL = `<url><loc>https://foot-repo.com/</loc></url>`

  const rSnapshot = await admin.database().ref('reports').once('value')
  const reports = rSnapshot.val()
  const reportURLs = Object.keys(reports).reduce((acc, url) => {
    acc = acc + `<url><loc>https://foot-repo.com/${url}</loc></url>`
    return acc
  }, '')

  const sitemapFooter = `</urlset>`

  const sitemapString = sitemapHeader + baseURL + reportURLs + sitemapFooter

  res.set('Content-Type', 'text/xml')
  res.status(200).send(sitemapString)
})

export default buildSitemap
