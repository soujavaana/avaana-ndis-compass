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
  const contacts: Contact[] = [{
    id: 1,
    initial: 'S',
    lastName: 'Johnson',
    role: 'Support Coordinator',
    location: 'Brisbane, QLD',
    distance: '3.2 km',
    phone: '0412 XXX XXX',
    email: 's.johnson@provider.com.au'
  }, {
    id: 2,
    initial: 'M',
    lastName: 'Williams',
    role: 'Plan Manager',
    location: 'Brisbane, QLD',
    distance: '5.1 km',
    phone: '0433 XXX XXX',
    email: 'm.williams@planlink.com.au'
  }, {
    id: 3,
    initial: 'J',
    lastName: 'Thompson',
    role: 'Support Coordinator',
    location: 'Gold Coast, QLD',
    distance: '12.3 km',
    phone: '0455 XXX XXX',
    email: 'j.thompson@supportco.com.au'
  }, {
    id: 4,
    initial: 'L',
    lastName: 'Garcia',
    role: 'Plan Manager',
    location: 'Brisbane, QLD',
    distance: '4.6 km',
    phone: '0478 XXX XXX',
    email: 'l.garcia@ndisplan.com.au'
  }, {
    id: 5,
    initial: 'R',
    lastName: 'Mitchell',
    role: 'Support Coordinator',
    location: 'Ipswich, QLD',
    distance: '15.7 km',
    phone: '0498 XXX XXX',
    email: 'r.mitchell@supportplus.com.au'
  }];
  return <Layout>
      <div className="flex flex-col space-y-4 sm:space-y-6 max-w-full">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-[32px] font-[400] leading-[48px] font-recoleta flex items-center gap-[5px]">Networking</h1>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm md:text-base">
              Connect with Support Coordinators and Plan Managers in your area
            </p>
          </div>
          <Network className="h-6 w-6 sm:h-8 sm:w-8 text-[#F97316]" />
        </div>

        <Card className="border-[#F97316]/20">
          <CardHeader className="bg-[#F97316]/5 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
            <CardTitle className="text-base sm:text-lg md:text-xl flex items-center justify-between">
              <span>Unlock Networking Features</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base">
              Subscribe to our monthly networking plan at $199 per month to view contact details and connect directly with professionals in your area.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-3 pb-3 px-3 sm:pt-4 sm:pb-4 sm:px-4 md:pt-6 md:pb-6 md:px-6">
            <Button variant="default" className="bg-[#F97316] hover:bg-[#EA580C] text-xs sm:text-sm md:text-base">
              Subscribe Now
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-base sm:text-lg md:text-xl mt-1 sm:mt-2 font-normal">Professionals Near You</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {contacts.map(contact => <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-1 sm:pb-2 px-3 md:px-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm sm:text-base font-normal md:text-xl">
                      {contact.initial}. {contact.lastName}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">{contact.role}</CardDescription>
                  </div>
                  <div className="bg-[#F97316]/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium">
                    {contact.distance}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 md:px-4 pb-3">
                <p className="text-xs md:text-sm mb-2">{contact.location}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium">Phone</span>
                    <span className={`text-xs md:text-sm ${!showContactInfo ? 'blur-sm select-none' : ''}`}>
                      {contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium">Email</span>
                    <span className={`text-xs md:text-sm truncate max-w-[130px] sm:max-w-[120px] md:max-w-[150px] ${!showContactInfo ? 'blur-sm select-none' : ''}`}>
                      {contact.email}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2 text-xs md:text-sm h-7 sm:h-8" onClick={() => setShowContactInfo(!showContactInfo)} disabled={!showContactInfo}>
                    {showContactInfo ? <>
                        <Eye className="mr-1 h-3 w-3 md:h-4 md:w-4" /> View Contact Info
                      </> : <>
                        <EyeOff className="mr-1 h-3 w-3 md:h-4 md:w-4" /> Subscribe to View
                      </>}
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </Layout>;
};
export default NetworkingPage;