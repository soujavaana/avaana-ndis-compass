
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, Eye, EyeOff } from 'lucide-react';

interface Contact {
  id: number;
  initial: string;
  lastName: string;
  role: string;
  location: string;
  distance: string;
  phone: string;
  email: string;
}

const NetworkingPage = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  
  const contacts: Contact[] = [
    { 
      id: 1, 
      initial: 'S', 
      lastName: 'Johnson', 
      role: 'Support Coordinator', 
      location: 'Brisbane, QLD', 
      distance: '3.2 km', 
      phone: '0412 XXX XXX', 
      email: 's.johnson@provider.com.au' 
    },
    { 
      id: 2, 
      initial: 'M', 
      lastName: 'Williams', 
      role: 'Plan Manager', 
      location: 'Brisbane, QLD', 
      distance: '5.1 km', 
      phone: '0433 XXX XXX', 
      email: 'm.williams@planlink.com.au' 
    },
    { 
      id: 3, 
      initial: 'J', 
      lastName: 'Thompson', 
      role: 'Support Coordinator', 
      location: 'Gold Coast, QLD', 
      distance: '12.3 km', 
      phone: '0455 XXX XXX', 
      email: 'j.thompson@supportco.com.au' 
    },
    { 
      id: 4, 
      initial: 'L', 
      lastName: 'Garcia', 
      role: 'Plan Manager', 
      location: 'Brisbane, QLD', 
      distance: '4.6 km', 
      phone: '0478 XXX XXX', 
      email: 'l.garcia@ndisplan.com.au' 
    },
    { 
      id: 5, 
      initial: 'R', 
      lastName: 'Mitchell', 
      role: 'Support Coordinator', 
      location: 'Ipswich, QLD', 
      distance: '15.7 km', 
      phone: '0498 XXX XXX', 
      email: 'r.mitchell@supportplus.com.au' 
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col space-y-6 max-w-full">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Networking</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Connect with Support Coordinators and Plan Managers in your area
            </p>
          </div>
          <Network className="h-8 w-8 text-avaana-primary" />
        </div>

        <Card className="border-avaana-primary/20">
          <CardHeader className="bg-avaana-primary/5 px-4 py-3 md:px-6 md:py-4">
            <CardTitle className="text-lg md:text-xl flex items-center justify-between">
              <span>Unlock Networking Features</span>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Subscribe to our monthly networking plan at $199 per month to view contact details and connect directly with professionals in your area.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
            <Button variant="default" className="bg-avaana-primary hover:bg-avaana-secondary text-sm md:text-base">
              Subscribe Now
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-lg md:text-xl font-bold mt-2">Professionals Near You</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 px-3 md:px-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base md:text-lg">
                      {contact.initial}. {contact.lastName}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">{contact.role}</CardDescription>
                  </div>
                  <div className="bg-avaana-primary/10 px-2 py-1 rounded text-xs font-medium">
                    {contact.distance}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 md:px-4">
                <p className="text-xs md:text-sm mb-2">{contact.location}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium">Phone</span>
                    <span className={`text-xs md:text-sm ${!showContactInfo ? 'blur-sm select-none' : ''} break-all`}>
                      {contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium">Email</span>
                    <span className={`text-xs md:text-sm ${!showContactInfo ? 'blur-sm select-none' : ''} break-all`}>
                      {contact.email}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2 text-xs md:text-sm" 
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    disabled={!showContactInfo}
                  >
                    {showContactInfo ? (
                      <>
                        <Eye className="mr-2 h-3 w-3 md:h-4 md:w-4" /> View Contact Info
                      </>
                    ) : (
                      <>
                        <EyeOff className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Subscribe to View
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NetworkingPage;
