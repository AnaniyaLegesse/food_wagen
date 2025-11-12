import React from 'react'

const footer = () => {
  return (
      <footer className="bg-gray-900 text-white mt-12 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
        {/* Company Links */}
        <div>
          <h4 className="font-bold text-lg mb-4 ">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-600 transition">About Us</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Blog</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Careers</a></li>
          </ul>
        </div>
        {/* Contact Links */}
        <div>
          <h4 className="font-bold text-lg mb-4 ">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-600 transition">Help & Support</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Partner with us</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Ride with us</a></li>
          </ul>
        </div>
        {/* Legal Links */}
        <div>
          <h4 className="font-bold text-lg mb-4 ">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-600 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Refund & Cancellation</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Cookie Policy</a></li>
          </ul>
        </div>
        {/* Newsletter & Social */}
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <h4 className="font-bold text-lg mb-4 ">Follow Us</h4>
          <div className="flex space-x-4 text-gray-400 mb-6">
            <a href="#" className="hover:text-white transition">
              
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.178 3.774 9.444 8.705 10.187v-7.14h-2.54v-3.047h2.54v-2.186c0-2.527 1.543-3.905 3.79-3.905 1.084 0 2.016.08 2.292.116v2.607h-1.545c-1.22 0-1.458.577-1.458 1.428v1.875h3.298l-.53 3.047h-2.768v7.14c4.931-.743 8.705-5.009 8.705-10.187C22 6.477 17.523 2 12 2z" /></svg>
            </a>
            <a href="#" className="hover:text-white transition">
              
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4.028c-.787.35-1.635.586-2.52.686.904-.543 1.594-1.4 1.916-2.435-.845.5-1.78.865-2.776 1.066C18.237 3.518 17.152 3 15.986 3c-2.42 0-4.385 1.965-4.385 4.385 0 .343.039.678.113.998C7.452 8.01 4.5 5.503 2.478 2.52-.023 6.643 2.5 9.876 4.67 11.087c-.773-.024-1.49-.237-2.126-.59.001.052.001.104.001.157 0 2.158 1.535 3.966 3.566 4.375-.375.102-.772.157-1.185.157-.291 0-.573-.028-.847-.083.569 1.777 2.217 3.076 4.17 3.111C7.792 19.34 5.923 20 3.882 20c-.395 0-.782-.023-1.163-.067C4.69 20.916 6.94 21.5 9.278 21.5c11.135 0 17.218-9.207 17.218-17.218 0-.262-.007-.523-.017-.783.593-.428 1.107-.958 1.517-1.564z" /></svg>
            </a>
          </div>

          <p className="text-sm font-semibold mb-3">Receive exclusive offers in your mailbox</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="px-4 py-2 w-full text-gray-900 rounded-l-xl focus:ring-amber-400 focus:border-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-r-xl transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        All Rights Reserved &copy; Your Company, {new Date().getFullYear()}. Made with ❤️ by FoodWagon.
      </div>
    </div>
  </footer>
  )
}

export default footer