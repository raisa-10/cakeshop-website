import { useState } from 'react';
import { Heart, ShoppingCart, Star, Mail, Phone, Instagram, Facebook, Twitter, X } from 'lucide-react';
import classicCake from './images/cake1.jpg';
import customCake from './images/cake5.jpg';
import specialtyCake from './images/cake6.jpg';
import premiumCake from './images/cake4.jpg';
import glutenFreeCake from './images/cake2.jpg';
import miniTreats from './images/cake3.jpg';
import cake7 from './images/cake7.jpg';
import cake8 from './images/cake8.jpg';
import cake9 from './images/cake9.jpg';
import cake10 from './images/cake10.jpg';

export default function CakesLandingPage() {
  const [cart, setCart] = useState(() => {
    const savedCart = window.sessionStorage.getItem('blissbakes-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = window.sessionStorage.getItem('blissbakes-wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState(() => {
    const savedEmails = window.sessionStorage.getItem('blissbakes-subscribers');
    return savedEmails ? JSON.parse(savedEmails) : [];
  });
  const [formData, setFormData] = useState({
    occasion: '',
    flavor: '',
    special: '',
    servings: '',
    deadline: '',
    date: ''
  });

  const cakes = [
    { id: 1, name: 'Classic cakes', price: 599, category: 'classic', image: classicCake },
    { id: 2, name: 'Custom themed cakes', price: 799, category: 'custom', image: customCake },
    { id: 3, name: 'Specialty cakes', price: 899, category: 'specialty', image: specialtyCake },
    { id: 4, name: 'Premium cakes', price: 1299, category: 'premium', image: premiumCake },
    { id: 5, name: 'Gluten free cakes', price: 699, category: 'glutenfree', image: glutenFreeCake },
    { id: 6, name: 'Mini treats', price: 299, category: 'mini', image: miniTreats }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (cake) => {
    const updatedCart = [...cart, cake];
    setCart(updatedCart);
    window.sessionStorage.setItem('blissbakes-cart', JSON.stringify(updatedCart));
  };

  const handleAddToWishlist = (cake) => {
    let updatedWishlist;
    if (wishlist.find(w => w.id === cake.id)) {
      updatedWishlist = wishlist.filter(w => w.id !== cake.id);
    } else {
      updatedWishlist = [...wishlist, cake];
    }
    setWishlist(updatedWishlist);
    window.sessionStorage.setItem('blissbakes-wishlist', JSON.stringify(updatedWishlist));
  };

  const handleRemoveFromCart = (idx) => {
    const updatedCart = cart.filter((_, i) => i !== idx);
    setCart(updatedCart);
    window.sessionStorage.setItem('blissbakes-cart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(w => w.id !== id);
    setWishlist(updatedWishlist);
    window.sessionStorage.setItem('blissbakes-wishlist', JSON.stringify(updatedWishlist));
  };

  const handleSubmitOrder = () => {
    if (formData.occasion && formData.flavor && formData.servings && formData.deadline && formData.date) {
      setFormData({ occasion: '', flavor: '', special: '', servings: '', deadline: '', date: '' });
      setShowOrderForm(false);
    } else {
      alert('Please fill all required fields!');
    }
  };

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      const updatedEmails = [...subscribedEmails, email];
      setSubscribedEmails(updatedEmails);
      window.sessionStorage.setItem('blissbakes-subscribers', JSON.stringify(updatedEmails));
      setEmail('');
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gradient-to-b from-pink-50 to-pink-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl sm:text-3xl font-bold text-black">Bliss Bakes</div>
          <div className="flex space-x-3 relative">
            <div className="relative">
              <ShoppingCart onClick={() => setShowCart(!showCart)} className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-pink-500 transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
              )}
            </div>
            <div className="relative">
              <Heart onClick={() => setShowWishlist(!showWishlist)} className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition ${wishlist.length > 0 ? 'fill-pink-500 text-pink-500' : 'hover:text-pink-500'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 pt-20">
          <div className="absolute right-0 top-16 w-full sm:w-96 bg-white h-screen overflow-y-auto shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                <button onClick={() => setShowCart(false)}><X className="w-6 h-6" /></button>
              </div>
              {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-pink-100 p-4 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-pink-600 font-bold">₹{item.price}</p>
                        </div>
                        <button onClick={() => handleRemoveFromCart(idx)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Remove</button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-pink-300 pt-4">
                    <p className="text-lg font-bold text-gray-800 mb-4">Total: ₹{totalPrice}</p>
                    <button onClick={() => { 
                      setShowCart(false); 
                      setCart([]);
                      window.sessionStorage.removeItem('blissbakes-cart');
                    }} className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600 transition">Checkout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Sidebar */}
      {showWishlist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 pt-20">
          <div className="absolute right-0 top-16 w-full sm:w-96 bg-white h-screen overflow-y-auto shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Wishlist</h2>
                <button onClick={() => setShowWishlist(false)}><X className="w-6 h-6" /></button>
              </div>
              {wishlist.length === 0 ? (
                <p className="text-gray-600">Your wishlist is empty</p>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-pink-100 p-4 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-pink-600 font-bold">₹{item.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleAddToCart(item)} className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 text-sm">Add</button>
                        <button onClick={() => handleRemoveFromWishlist(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 flex flex-col">
            <div className="flex justify-between items-center p-6 sm:p-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Shop</h2>
              <button onClick={() => setShowMenu(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="overflow-y-auto p-6 sm:p-8 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cakes.map(cake => (
                  <div key={cake.id} className="border-2 border-pink-200 rounded-lg p-4 hover:shadow-lg transition">
                    <img src={cake.image} alt={cake.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <p className="font-semibold text-gray-800 mb-2">{cake.name}</p>
                    <p className="text-pink-600 font-bold mb-3">₹{cake.price}</p>
                    <div className="flex gap-2">
                      <button onClick={() => { handleAddToCart(cake); setShowMenu(false); }} className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition text-sm font-semibold">Add to Cart</button>
                      <button onClick={() => handleAddToWishlist(cake)} className={`flex-1 border-2 py-2 rounded transition text-sm font-semibold ${wishlist.find(w => w.id === cake.id) ? 'bg-pink-500 text-white border-pink-500' : 'border-pink-500 text-pink-500 hover:bg-pink-50'}`}>♥</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-pink-300 rounded-2xl p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Cakes That Make Every Moment Sweeter!
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={() => setShowOrderForm(true)} className="bg-pink-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-pink-300 transition">
                Order now
              </button>
              <button onClick={() => setShowMenu(true)} className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                View menu
              </button>
            </div>
            <div className="mt-6 bg-white rounded-lg p-4 inline-block">
              <p className="text-xs sm:text-sm text-gray-700">✓ Same day cake delivery available. We deliver by 5 PM with minimum order.</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img src={cake7} alt="Colorful cake" className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover shadow-lg" />
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">What we offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <img src={cake10} alt="Custom cake" className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-lg mb-4 object-cover" />
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Custom-created cakes with Love</h3>
          </div>
          <div className="text-center">
            <img src={cake8} alt="Fresh baked" className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-lg mb-4 object-cover" />
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Freshly Baked Always</h3>
          </div>
          <div className="text-center">
            <img src={cake9} alt="Delivery" className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-lg mb-4 object-cover" />
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Seamless Delivery and Pickup</h3>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Discover your perfect cake</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cakes.map((cake) => (
            <div key={cake.id} className="bg-pink-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
              <img src={cake.image} alt={cake.name} className="w-full h-48 sm:h-56 object-cover" />
              <div className="p-4 text-center">
                <p className="font-bold text-gray-800 text-sm sm:text-base mb-3">{cake.name}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleAddToCart(cake)} className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition text-sm font-semibold">Add to Cart</button>
                  <button onClick={() => handleAddToWishlist(cake)} className={`px-3 py-2 rounded transition text-sm font-semibold ${wishlist.find(w => w.id === cake.id) ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50'}`}>♥</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <button onClick={() => setShowMenu(true)} className="bg-pink-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-pink-500 transition text-sm sm:text-base">
            See Menu →
          </button>
        </div>
      </section>

      {/* Custom Cake Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                🍰 Get your Custom cake now
              </h2>
              <button onClick={() => setShowOrderForm(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What's the occasion?</label>
                <input type="text" name="occasion" value={formData.occasion} onChange={handleInputChange} placeholder="Birthday, Anniversary, etc." className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What flavor would you like?</label>
                <div className="space-y-2">
                  {['Chocolate', 'Vanilla', 'Red velvet'].map(f => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="flavor" value={f} checked={formData.flavor === f} onChange={handleInputChange} className="w-4 h-4" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Do you have a specific theme in mind?</label>
                <input type="text" name="special" value={formData.special} onChange={handleInputChange} placeholder="Describe your theme..." className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">How many people will the cake serve?</label>
                <div className="space-y-2">
                  {['2-4', '5-10', '10-15', 'More than 15'].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="servings" value={s} checked={formData.servings === s} onChange={handleInputChange} className="w-4 h-4" />
                      <span className="text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What is your preferred mode of delivery?</label>
                <div className="space-y-2">
                  {['Delivery', 'Pick up'].map(d => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="deadline" value={d} checked={formData.deadline === d} onChange={handleInputChange} className="w-4 h-4" />
                      <span className="text-sm text-gray-700">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prefer the date you want the cake to be available?</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 text-sm" />
              </div>
              <div className="flex gap-3 pt-4 border-t-2 border-pink-200">
                <button onClick={handleSubmitOrder} className="flex-1 bg-pink-400 text-white py-3 rounded-lg font-bold hover:bg-pink-500 transition text-sm">
                  Submit ✓
                </button>
                <button onClick={() => setShowOrderForm(false)} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-400 transition text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Words from our happy clients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { text: "Their flavors have the best taste. I celebrated my daughter's birthday with their cakes and everyone complimented the taste." },
            { text: "Absolutely amazing! The cakes are not only beautiful to look at, but taste incredible. Everyone at my party loved it." },
            { text: "Best cakes and quality you can find. Very careful with allergies and special diets. Love these guys!" }
          ].map((review, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-pink-300 rounded-xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Subscribe to our newsletter</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()} className="flex-1 px-4 py-2 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-pink-400 text-sm" />
            <button onClick={handleSubscribe} className="bg-pink-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-500 transition text-sm">
              Subscribe ✉
            </button>
          </div>
          {subscribedEmails.length > 0 && (
            <p className="text-sm text-gray-700 mt-4">Total subscribers: {subscribedEmails.length}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-400 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Contact info</h4>
              <p className="text-xs sm:text-sm mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 1234567890
              </p>
              <p className="text-xs sm:text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                blissbakes@gmail.com
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Links</h4>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#" className="hover:underline">Our Services</a></li>
                <li><a href="#" className="hover:underline">Category</a></li>
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop" alt="Cake" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-2">Follow Us</h4>
                  <div className="flex gap-3">
                    <Instagram className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                    <Facebook className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                    <Twitter className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-pink-300 pt-6 text-center text-xs sm:text-sm">
            <p>© Copyright 2024. Bliss Bakes. All Rights Reserved.</p>
            <p className="mt-2"><a href="#" className="hover:underline">Terms & conditions</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}