// components/CategoryNav.js
import Image from 'next/image';

export default function CategoryNav() {
  return (
    <div className="flex items-center justify-center space-x-6 overflow-x-auto py-6">
      
      <div className="flex flex-col items-center text-sm">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src="https://mahagrid.net/banner/sun_s_1.jpg"
            alt="View All"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <span className="mt-2 text-xs text-center text-gray-800">View All</span>
      </div>

      <div className="flex flex-col items-center text-sm">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src="https://mahagrid.net/banner/sun_s_6.jpg"
            alt="New Arrivals"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <span className="mt-2 text-xs text-center text-gray-800">New Arrivals</span>
      </div>

      <div className="flex flex-col items-center text-sm">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src="https://mahagrid.net/banner/sun_s_2.jpg"
            alt="Outerwear"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <span className="mt-2 text-xs text-center text-gray-800">Outerwear</span>
      </div>

      <div className="flex flex-col items-center text-sm">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src="https://mahagrid.net/banner/sun_s_3.jpg"
            alt="Tops"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <span className="mt-2 text-xs text-center text-gray-800">Tops</span>
      </div>

      <div className="flex flex-col items-center text-sm">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src="https://mahagrid.net/banner/sun_s_4.jpg"
            alt="Bottoms"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <span className="mt-2 text-xs text-center text-gray-800">Bottoms</span>
      </div>

      <div className="flex flex-col items-center text-sm">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src="https://mahagrid.net/banner/sun_s_5.jpg"
            alt="Accessories"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <span className="mt-2 text-xs text-center text-gray-800">Accessories</span>
      </div>

    </div>
  );
}
