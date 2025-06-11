export default function Pagination() {
    return (
      <div className="flex justify-center mt-12">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded">1</button>
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:border-red-600">2</button>
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:border-red-600">3</button>
          <span className="px-2">...</span>
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:border-red-600">10</button>
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:border-red-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:border-red-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
  