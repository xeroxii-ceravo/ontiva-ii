export default function Footer() {
  return (
    <footer className="border-t border-luxury-lighter/20 bg-luxury-dark/50">
      <div className="px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfairDisplay text-xl mb-4 text-luxury-gold">ONTIVA</h3>
            <p className="text-luxury-lighter/60">
              Luxury accessories for the discerning client. Timeless pieces crafted to perfection.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <span className="sr-only">Instagram</span>
                {/* Instagram Icon - using lucide-react would be better, but for simplicity we use a placeholder */}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4h8l4 4v8a2 2 0 01-2 2h-5l-2-2V8"></path></svg>
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <span className="sr-only">Pinterest</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.049 2.027a3.5 3.5 0 00-1.2 2.2 1.636 1.636 0 01-2.577.92v.4c0 .6.2 1.1.555 1.502L9.87 6.9l-.238 2.356a1.636 1.636 0 00-.897.896l-.594-.018A3.5 3.5 0 005 12c0 2.206 1.32 4.14 3.185 4.952A4.61 4.61 0 018.75 14.5v-.05a2.25 2.25 0 00-1.5-3.75 2.25 2.25 0 011.5-3.75V9.5a2.25 2.25 0 00-1.5-.375 2.583 2.583 0 015.37.657 4.61 4.61 0 004.123-.763z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-luxury-lighter">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Sale</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Gift Guide</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Care & Repair</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-luxury-lighter">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Store Locations</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-luxury-lighter">Newsletter</h4>
            <p className="text-luxury-lighter/60 mb-4">
              Subscribe for exclusive offers and early access to new collections.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-luxury-lighter/20 border border-luxury-lighter/30 rounded px-4 py-2 text-white placeholder-luxury-lighter/50 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              />
              <button type="submit" className="bg-luxury-gold text-luxury-dark px-4 py-2 hover:bg-luxury-gold/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-luxury-lighter/20 flex flex-col items-center text-center space-x-4 md:flex-row md:justify-between">
          <span className="text-luxury-lighter/60 text-sm">
            © 2026 ONTIVA. All rights reserved.
          </span>
          <div className="flex space-x-4">
            <a href="#" className="text-luxury-lighter/60 hover:text-luxury-gold transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-luxury-lighter/60 hover:text-luxury-gold transition-colors text-sm">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

