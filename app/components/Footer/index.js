import { MapPin, Phone, Clock } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
  'Blogs', 'FAQ', 'Privacy Policy', 'Terms of Use', 
  'Shipping & Delivery Policy', 'Refund Policy', 'Age Policy',
  'About Us', 'Contact Us', 'IQOS Heets Review', 'Heets Sticks Flavors'
]

const deliveryLocations = [
  { name: 'Ajman', url: '/ajman' },
  { name: 'Abu Dhabi', url: '/abu-dhabi' },
  { name: 'Sharjah', url: '/sharjah' },
  { name: 'Al Ain', url: '/al-ain' },
  { name: 'Fujairah', url: '/fujairah' },
  { name: 'Ras Al-Khaimah', url: '/ras-al-khaimah' },
  { name: 'Umm Al Quwain', url: '/umm-al-quwain' }
];


const usefulLinks = [
  'Malls in Dubai', 'Dubai Airport', 'Dubai Map', 'Dubai Weather'
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Heets Iqos UAE</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <p>Address : 27 Street 56B - Al Barsha - Al Barsha 3 - Dubai - United Arab Emirates</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <p>+97154347196</p>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
              <p>Opening Hours : Monday – Sunday | 6:00 – 22:00</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Delivery Locations</h3>
            <ul className="space-y-2">
              {deliveryLocations.map((location,index) => (
                <li key={index}>
                  <Link href={location.url} className="hover:text-gray-300 transition-colors">
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="mb-4">© 2025, All Rights Reserved</p>
            <div className="flex justify-center space-x-4">
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <div className="bg-red-600 p-2 rounded-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <div className="bg-pink-600 p-2 rounded-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <div className="bg-blue-600 p-2 rounded-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <div className="bg-red-700 p-2 rounded-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
        {/* Disclaimer */}
        <div className="mt-8 py-4 bg-red-900 px-4">
          <p className="text-sm text-center">
            heetsiqosuae.ae has no affiliation with Philip Morris International (PMI). This is not official website of PMI and IQOS. You must be at least 18 years old to purchase products on Heets IQOS UAE
          </p>
        </div>
    </footer>
  )
}

