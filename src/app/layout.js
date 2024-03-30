import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LinkCuty: Simplify URLs Effortlessly',
  description:
    'LinkCuty offers a perfect solution to shorten URLs quickly and efficiently. With our platform, generating concise links for social media, emails, and more is a breeze.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}
