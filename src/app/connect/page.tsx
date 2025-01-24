import { ConnectForm } from '@/components/connect-form'
import { PrayerRequestForm } from '@/components/prayer-request-form'

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Connect With Us</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We&apos;d love to meet you and welcome you to our church family.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <a href="tel:+13253652585" className="text-blue-600 hover:text-blue-700">
                        (325) 365-2585
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <a 
                        href="https://maps.google.com/?q=1200+N+7th+St,+Ballinger,+TX+76821"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        1200 N 7th St<br />
                        Ballinger, TX 76821
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Service Times</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Sunday</h3>
                      <p className="text-gray-600">
                        Sunday School - 9:45 AM<br />
                        Morning Worship - 11:00 AM<br />
                        Evening Worship - 6:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Wednesday</h3>
                      <p className="text-gray-600">
                        Prayer Meeting - 6:00 PM<br />
                        Bible Study - 7:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.4726446927775!2d-99.95161548485288!3d31.73893998129095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865cc0a5b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s1200%20N%207th%20St%2C%20Ballinger%2C%20TX%2076821!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Forms */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ConnectForm />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Submit a Prayer Request</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <PrayerRequestForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 