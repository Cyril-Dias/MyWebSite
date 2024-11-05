import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import Navbar from './components/Navbar/navbar'
import Logo from "./components/Logo/logo";
import "./globals.css";

export async function generateStaticParams({ params }) {
  const { lng } = await params
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({ children, params }) {
  const { lng } = await params
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body className='relative'>
        <header>
          <div className='absolute bottom-0'>
            <Navbar lng={lng} /> 
          </div>
            <Logo />     
        </header>
        {children}
      </body>
    </html>
  )
}