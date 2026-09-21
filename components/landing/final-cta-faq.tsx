'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'What is this?',
    a: 'A personal profile page where you can share your interests, hobbies, favorites and the things that represent you.',
  },
  {
    q: 'What can I add?',
    a: 'You can add your introduction, hobbies, interests, favorites, social links and other personal sections.',
  },
  {
    q: 'Do I have to add everything?',
    a: 'No. You decide what you want to share.',
  },
  {
    q: 'Can I edit my profile later?',
    a: 'Yes.',
  },
  {
    q: 'Can I share my profile?',
    a: 'Yes. Your profile has a shareable link.',
  },
  {
    q: 'Do visitors need an account?',
    a: 'No. Visitors should be able to view a public profile without signing up.',
  },
];

export function FinalCtaFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-20 py-12">
      
      {/* 11. FINAL CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 p-8 sm:p-14 text-center text-white space-y-6 shadow-2xl shadow-blue-500/25 relative overflow-hidden">
          
          {/* Subtle Floating Decorative Elements */}
          <div className="absolute top-4 left-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-100 hidden sm:block">
            🎵 Music & Vibes
          </div>
          <div className="absolute bottom-6 right-8 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-100 hidden sm:block">
            📸 Photography & Hobbies
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to show the world a little more of you?
          </h2>
          
          <p className="text-blue-100 max-w-xl mx-auto text-base sm:text-lg font-medium">
            Create your personal profile and share the things that make you, you.
          </p>

          <div className="pt-2 flex flex-col items-center gap-3">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-base rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Create My Profile</span>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </Link>
            
            <span className="text-xs text-blue-200 font-medium pt-1">
              Free to start · No complicated setup
            </span>
          </div>

        </div>
      </section>

      {/* 12. FAQ ACCORDION SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Questions & Answers
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-extrabold text-slate-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
