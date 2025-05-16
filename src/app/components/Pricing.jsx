import React, { useEffect, useState } from 'react';

const pricingPlans = [
  {
    title: "Basic",
    price: "฿30,000",
    features: [
      "Basic website design",
      "Mobile responsive",
      "3 pages included",
      "1 month support",
      "Basic SEO optimization"
    ]
  },
  {
    title: "Standard",
    price: "฿60,000",
    features: [
      "Professional design",
      "Mobile responsive",
      "5 pages included",
      "3 months support",
      "Advanced SEO optimization",
      "Content management system"
    ],
    isPopular: true
  },
  {
    title: "Premium",
    price: "฿120,000+",
    features: [
      "Custom premium design",
      "Mobile responsive",
      "10+ pages included",
      "6 months support",
      "Complete SEO optimization",
      "E-commerce functionality",
      "Custom features development",
      "Performance optimization"
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing-section" className="py-24 bg-white mx-auto">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-medium mb-4 text-black tracking-tight">
            Choose your plan
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base font-light">
            Simple pricing for every project. All plans include quality development and responsive design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-sm ${
                plan.isPopular ? 'ring-1 ring-black' : ''
              }`}
            >
              {/* Card Header */}
              <div className="p-8 pb-4">
                {plan.isPopular && (
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-black text-white rounded-full">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-medium text-black mb-1">{plan.title}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-medium">{plan.price}</span>
                </div>
                <button 
                  className={`w-full mb-6 ${
                    plan.isPopular 
                      ? 'bg-black hover:bg-gray-900 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-black'
                  } font-medium py-3 px-6 rounded-full transition duration-300`}
                >
                  Select
                </button>
              </div>
              
              {/* Card Body */}
              <div className="p-8 pt-2 border-t border-gray-100">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-black mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Need a custom solution? <a href="#contact" className="text-black font-medium hover:underline">Contact us</a> for personalized options.
          </p>
        </div>
      </div>
    </section>
  );
}
