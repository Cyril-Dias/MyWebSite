import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import Navbar from './components/Navbar/navbar'
import "./globals.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        <header>
              <Navbar lng={lng} />
        </header>
        {children}
      </body>
    </html>
  )
}