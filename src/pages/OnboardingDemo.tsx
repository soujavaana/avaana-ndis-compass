
import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';

const OnboardingDemo = () => {
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Onboarding Questionnaire</h1>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div 
            data-tf-live="01JVKKXJB3GH774HBBVQT55SD4" 
            className="h-[80vh]"
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export default OnboardingDemo;
