
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingDemo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to the signup page
    navigate('/signup');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to signup page...</p>
    </div>
  );
};

export default OnboardingDemo;
