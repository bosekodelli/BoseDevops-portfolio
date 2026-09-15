import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLenis } from '../context/SmoothScrollProvider';
import { 
  Mail, 
  Copy, 
  Check, 
  ArrowUp, 
  Send, 
  Globe, 
  Radio,
  Phone
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactFooter: React.FC = () => {
  const { scrollTo } = useLenis();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('DevOps Role');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const email = 'bose.kodelli09@gmail.com';
  const phone = '+91 9701237678';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#84a98c', '#d4a373', '#ede0d4', '#52796f'],
    });

    setFormSubmitted(true);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0c0d10] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-[#52796f]/10 via-[#d4a373]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Headline Trigger */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] font-code text-xs mb-4">
            <Radio className="w-3.5 h-3.5" />
            <span>INITIATE CONNECTION</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-[#f4f1ea] tracking-tight leading-[1.1] mb-6">
            Let's Build &amp; Automate <br />
            <span className="text-[#84a98c]">
              Scalable Cloud Systems.
            </span>
          </h2>

          <p className="font-body text-[#9c978d] text-base sm:text-lg max-w-xl mx-auto mb-8">
            Available for Senior DevOps, Cloud Infrastructure Architect, and DevSecOps engineering roles (Remote / Hybrid).
          </p>

          {/* Copy Email & Phone Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#15171c] border border-white/[0.08] shadow-md">
              <div className="flex items-center gap-2 pl-4 pr-2 font-code text-xs sm:text-sm text-[#d6d0c4]">
                <Mail className="w-4 h-4 text-[#84a98c]" />
                <span>{email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className={`px-4 py-2 rounded-full font-code text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  copied
                    ? 'bg-[#84a98c] text-[#0e0f12]'
                    : 'bg-[#84a98c]/15 text-[#84a98c] hover:bg-[#84a98c]/25'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#15171c] hover:bg-[#1d2027] border border-white/[0.08] text-xs sm:text-sm font-code text-[#d6d0c4] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#d4a373]" />
              <span>{phone}</span>
            </a>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#15171c] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#84a98c]/15 text-[#84a98c] flex items-center justify-center mx-auto border border-[#84a98c]/30">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#f4f1ea]">
                  Message Dispatched
                </h3>
                <p className="font-body text-sm text-[#9c978d] max-w-md mx-auto">
                  Thank you for reaching out. Bosu will review your inquiry and respond directly to <span className="text-[#84a98c]">{formData.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-full bg-[#1d2027] text-xs font-code text-[#d6d0c4] hover:text-[#f4f1ea]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Topic Selector */}
                <div>
                  <label className="block font-code text-xs text-[#9c978d] mb-2">
                    Inquiry Topic
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['DevOps Role', 'Cloud Architecture', 'Consulting / Other'].map((topic) => (
                      <button
                        type="button"
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`py-2 px-3 rounded-xl font-code text-xs transition-colors cursor-pointer text-center ${
                          selectedTopic === topic
                            ? 'bg-[#84a98c]/15 text-[#84a98c] border border-[#84a98c]/30 font-semibold'
                            : 'bg-[#111317] text-[#9c978d] border border-white/[0.05] hover:border-white/[0.1]'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-code text-xs text-[#9c978d] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111317] border border-white/[0.06] text-[#f4f1ea] placeholder-[#68645c] text-sm focus:outline-none focus:border-[#84a98c]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-code text-xs text-[#9c978d] mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@enterprise.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111317] border border-white/[0.06] text-[#f4f1ea] placeholder-[#68645c] text-sm focus:outline-none focus:border-[#84a98c]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-code text-xs text-[#9c978d] mb-1.5">
                    Project / Role Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your infrastructure needs, team objectives, or job specifications..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#111317] border border-white/[0.06] text-[#f4f1ea] placeholder-[#68645c] text-sm focus:outline-none focus:border-[#84a98c]/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#d4a373] text-[#0e0f12] font-semibold text-sm hover:bg-[#e2b78b] shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06] text-xs font-code text-[#9c978d]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#84a98c]" />
            <span>© {new Date().getFullYear()} Bosu Kodelli. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#9c978d] hover:text-[#f4f1ea] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#9c978d] hover:text-[#f4f1ea] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => scrollTo(0, { duration: 1.4 })}
              className="flex items-center gap-1 text-[#9c978d] hover:text-[#f4f1ea] transition-colors cursor-pointer ml-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
