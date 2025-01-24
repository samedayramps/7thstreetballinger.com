import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p>&copy; {currentYear} Seventh Street Baptist Church</p>
            <p className="text-sm text-gray-400">All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="text-center space-x-6">
            <a
              href="https://www.facebook.com/7thstreetballinger"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-blue-400 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Admin Link */}
          <div className="text-center md:text-right">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 