import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon - SVG for modern browsers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=1" />
        <link rel="alternate icon" href="/favicon.svg?v=1" />
        <link rel="shortcut icon" href="/favicon.svg?v=1" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Character Set */}
        <meta charSet="utf-8" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Primary Meta Tags */}
        <title>FlatShare - Find Your Perfect Flatmate</title>
        <meta name="title" content="FlatShare - Find Your Perfect Flatmate" />
        <meta name="description" content="Find your perfect flatmate and shared accommodation. Connect with verified users and discover affordable housing options. Join our community of trusted flatmates." />
        <meta name="keywords" content="flatmate, shared accommodation, room rental, housing, flat sharing, roommate finder, shared housing, affordable housing, student accommodation, co-living" />
        <meta name="author" content="FlatShare" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flat-share-frontend.vercel.app/" />
        <meta property="og:title" content="FlatShare - Find Your Perfect Flatmate" />
        <meta property="og:description" content="Connect with verified flatmates and discover affordable shared accommodation. Join our trusted community today!" />
        <meta property="og:image" content="/logo-icon.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="FlatShare" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://flat-share-frontend.vercel.app/" />
        <meta name="twitter:title" content="FlatShare - Find Your Perfect Flatmate" />
        <meta name="twitter:description" content="Connect with verified flatmates and discover affordable shared accommodation. Join our trusted community today!" />
        <meta name="twitter:image" content="/logo-icon.svg" />
        <meta name="twitter:creator" content="@flatshare" />

        {/* LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flat-share-frontend.vercel.app/" />
        <meta property="og:title" content="FlatShare - Find Your Perfect Flatmate" />
        <meta property="og:description" content="Connect with verified flatmates and discover affordable shared accommodation. Join our trusted community today!" />
        <meta property="og:image" content="/logo-icon.svg" />

        {/* Mobile & App Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FlatShare" />
        <meta name="application-name" content="FlatShare" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Theme Colors */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo-icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-icon.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/logo-icon.svg" />

        {/* Security & Performance */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />

        {/* Additional SEO */}
        <meta name="google-site-verification" content="your-verification-code" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "FlatShare",
              "description": "Find your perfect flatmate and shared accommodation. Connect with verified users and discover affordable housing options.",
              "url": "https://flat-share-frontend.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://flat-share-frontend.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "FlatShare",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://flat-share-frontend.vercel.app/logo-icon.svg"
                }
              }
            })
          }}
        />
      </Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
