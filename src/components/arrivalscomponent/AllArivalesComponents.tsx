
import { AiOutlineStar } from "react-icons/ai";
import Link from "next/link"

interface Article {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface ApiResponse {
  products: Article[]
}

const AllArivalesComponents = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=8')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data: ApiResponse = await res.json()
  const products: Article[] = data.products

  return (
    <div className=" px-3   py-10 "  >
      <h1 className="text-6xl font-bold text-center mb-8 mt-12" >New   Arrivals  </h1>

      <div className=" px-4 py-3" >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"  >
          {products.map((item: Article) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/arrivals/${item.id}`} className="group relative block overflow-hidden" style={{ border: "4px solid #f3f3f3", backgroundColor: "#f3f3f3" }}>
                <img style={{ objectFit: 'cover' }}
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-64 w-full object-cover transition duration-500    group-hover:scale-105"
                />

                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 mt-2">{item.title}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    <AiOutlineStar className="text-yellow-500" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    {item.discountPercentage > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                    {item.discountPercentage > 0 && (
                      <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                        {item.discountPercentage}% off
                      </span>
                    )}
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/arrivals"
         className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
            View All Arrivals
         
        </Link>
      </div>

    </div>
  )
}

export default AllArivalesComponents