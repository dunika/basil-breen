import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import theme from '../src/theme'

const googleTag = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PBQWJ2J');
`

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#fff" />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="theme-color" content="#ffffff" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700&display=swap"
          />
          {(this.props as any).emotionStyleTags}
          <script dangerouslySetInnerHTML={{ __html: googleTag }} />
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PBQWJ2J"
              height="0"
              width="0"
              style={{
                display: 'none',
                visibility: 'hidden',
              }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
