import React from 'react';
import { LandingHero } from '@/components/landing/hero';
import { ValueProp } from '@/components/landing/value-prop';
import { ProblemSolution } from '@/components/landing/problem-solution';
import { HowItWorks } from '@/components/landing/how-it-works';
import { ProductShowcase } from '@/components/landing/product-showcase';
import { PersonalitySection } from '@/components/landing/personality-section';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { SharingSection } from '@/components/landing/sharing-section';
import { FinalCtaFaq } from '@/components/landing/final-cta-faq';

export default function MarketingLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      <main className="space-y-4">
        {/* Hero Section */}
        <LandingHero />

        {/* Value Proposition */}
        <ValueProp />

        {/* Problem → Solution */}
        <ProblemSolution />

        {/* How It Works */}
        <HowItWorks />

        {/* Product Showcase */}
        <ProductShowcase />

        {/* Personality & Customization */}
        <PersonalitySection />

        {/* Features */}
        <FeaturesGrid />

        {/* Sharing */}
        <SharingSection />

        {/* Final CTA & FAQ */}
        <FinalCtaFaq />
      </main>
    </div>
  );
}
