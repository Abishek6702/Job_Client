import React from "react";

const FooterLanding = () => {
  return (
    <footer className="bg-[#2b7fff] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white text-[#2b7fff] font-bold text-lg flex items-center justify-center rounded-full">
              A
            </div>
            <span className="text-2xl font-semibold">Agency</span>
          </div>
          <p className="text-sm max-w-xs leading-relaxed">
            Launch your own Software As A Service Application with Flex
            Solutions.
          </p>
        </div>

        <div className="flex items-center justify-evenly md:gap-8">
          <div>
          <h4 className="text-lg font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Features</li>
            <li className="hover:underline cursor-pointer">Solutions</li>
            <li className="hover:underline cursor-pointer">Pricing</li>
            <li className="hover:underline cursor-pointer">Tutorials</li>
            <li className="hover:underline cursor-pointer">Updates</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">Newsletter</li>
            <li className="hover:underline cursor-pointer">Help Centre</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Support</li>
          </ul>
        </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm mb-4">
            Subscribe to our newsletter to get the latest updates.
          </p>
          <form className="flex bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 text-black text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-[#1a5ed2] text-white px-5 py-2 text-sm font-medium hover:bg-[#144db0] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-white/30 pt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} Agency. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterLanding;
