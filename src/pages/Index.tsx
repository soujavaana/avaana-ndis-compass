
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const embedRef = useRef<HTMLDivElement>(null);
  
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <div 
          ref={embedRef} 
          data-tf-live="01JVKCRM3YDVW44NKP5T5SMKSE"
          className="h-[80vh]"
        ></div>
      </div>
    </div>
  );
};

export default Index;
