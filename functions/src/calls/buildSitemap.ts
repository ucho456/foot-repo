/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const buildSitemap = functions.https.onRequest(async (_, res) => {
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  const baseURL = `<url><loc>https://foot-repo.com/</loc></url>`
  const rRef = admin.firestore().collection('reports')
  const rSnapshot = await rRef.get()
  let reportURLs = ''
  rSnapshot.forEach((doc) => {
    if (doc.exists) reportURLs += `<url><loc>https://foot-repo.com/reports/${doc.id}</loc></url>`
  })
  const sitemapFooter = `</urlset>`
  const sitemapString = sitemapHeader + baseURL + reportURLs + sitemapFooter
  res.set('Content-Type', 'text/xml')
  res.status(200).send(sitemapString)
})

export default buildSitemap
