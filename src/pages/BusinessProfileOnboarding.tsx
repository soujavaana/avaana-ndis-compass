
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Widget } from '@typeform/embed-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';

const BusinessProfileOnboarding = () => {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (user) {
      setUserEmail(user.email || '');
    }
  }, [user]);

  const handleTypeformSubmit = async (response: any) => {
    console.log('Business profile form submitted:', response);
    
    // Mark the task as completed
    if (user) {
      try {
        const { error } = await supabase.rpc('check_task_completion', {
          user_uuid: user.id,
          task_name: 'complete_business_profile'
        });

        if (error) {
          console.error('Error marking task complete:', error);
        } else {
          toast({
            title: 'Profile Updated',
            description: 'Your business profile has been completed successfully!',
          });
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  return (
    <Layout>
      <PageBreadcrumb items={[{ label: 'Complete Business Profile' }]} />
      
      <div className="mb-6">
        <h1 className="text-[32px] font-[400] leading-[48px] font-recoleta">Complete Your Business Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Please fill out the form below to complete your business profile setup</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="h-[80vh]">
          <Widget 
            id="Ym8rFkcS" 
            height="100%"
            hidden={{
              email: userEmail,
              userId: user?.id || ''
            }}
            onSubmit={handleTypeformSubmit}
            onReady={() => console.log('Typeform ready')}
            source="business-profile-onboarding"
            transitiveSearchParams={['userId', 'email']}
            className="w-full h-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default BusinessProfileOnboarding;
