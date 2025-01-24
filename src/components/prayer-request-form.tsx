'use client'

import { useState } from 'react'

export function PrayerRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      isConfidential: formData.get('isConfidential') === 'true',
      request: formData.get('request'),
    }

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'prayerRequest',
          data,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus('success')
      event.currentTarget.reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="pr-name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          type="text"
          name="name"
          id="pr-name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="pr-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="pr-email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">Optional - for follow-up if needed</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Keep Request Confidential?
        </label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="isConfidential"
              value="true"
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">Yes, share with pastoral staff only</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="isConfidential"
              value="false"
              defaultChecked
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">No, the church can pray for this request</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="pr-request" className="block text-sm font-medium text-gray-700">
          Prayer Request *
        </label>
        <textarea
          name="request"
          id="pr-request"
          rows={6}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Please share your prayer request..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Your prayer request has been submitted. We will be praying for you.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Sorry, something went wrong. Please try again later.
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  )
} 