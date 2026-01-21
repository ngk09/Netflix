import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-[#808080] px-6 md:px-20 py-24 border-t border-zinc-900 mt-20 relative z-30 font-medium">
      <div className="max-w-6xl mx-auto">
        <p className="mb-10 text-lg hover:text-white transition-colors cursor-pointer inline-block">
          Questions? Contact us.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-12 text-[13px] mb-12">
          <ul className="space-y-4">
            <li className="hover:underline cursor-pointer transition-all hover:text-white">FAQ</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Investor Relations</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Privacy</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Speed Test</li>
          </ul>
          <ul className="space-y-4">
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Help Center</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Jobs</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Cookie Preferences</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Legal Notices</li>
          </ul>
          <ul className="space-y-4">
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Account</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Ways to Watch</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Corporate Information</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Only on Netflix</li>
          </ul>
          <ul className="space-y-4">
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Media Center</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Terms of Use</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Contact Us</li>
            <li className="hover:underline cursor-pointer transition-all hover:text-white">Ad Choices</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-8 mt-12">
          <div className="inline-block border border-zinc-800 bg-black px-6 py-3 rounded-sm text-sm hover:border-zinc-500 transition-colors">
            <span className="mr-3 opacity-70">🌐</span>
            <select className="bg-transparent outline-none cursor-pointer font-bold text-zinc-300">
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="tam"> தமிழ்(Tamil)</option>
              
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
          
          <div className="pt-6 border-t border-zinc-900">
            <p className="text-zinc-600 text-xs font-bold tracking-widest uppercase mb-2">Netflix India Clone</p>
            <p className="text-sm">Developed with <span className="text-red-600">❤</span> by Nandan G.K.</p>
            <p className="mt-4 text-xs max-w-2xl leading-loose opacity-60">
              Explore Netflix TV shows and movies and discover bonus cinematic content
              <span className="text-white hover:underline cursor-pointer font-bold ml-1"></span>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;