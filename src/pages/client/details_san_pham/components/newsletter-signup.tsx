

export function NewsletterSignup() {
  return (
    <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Subscribe for More Updates</h2>
      <div className="max-w-md mx-auto flex space-x-2">
        <input type="email" placeholder="Enter your email address..." className="flex-1" />
        <button className="bg-red-500 hover:bg-red-600 text-white px-6">SUBSCRIBE</button>
      </div>
    </div>
  )
}
