
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, ImageIcon, MapPin, Phone, Shield, Users, Link as LinkIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';

interface KeyPersonnel {
  id: string;
  first_name: string | null;
  last_name: string | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  has_ownership: boolean | null;
  key_number: number;
}

interface Shareholder {
  id: string;
  name: string;
}

interface ProfileData {
  id?: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  business_name?: string | null;
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  abn?: string | null;
  acn?: string | null;
  entity_type?: string | null;
  business_email?: string | null;
  business_phone?: string | null;
  business_type?: string | null;
  registered_business_name?: string | null;
  is_gst_registered?: boolean | null;
  staff_count?: number | null;
  uses_contractors?: boolean | null;
  calendly_url?: string | null;
  scheduled_at?: string | null;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [keyPersonnel, setKeyPersonnel] = useState<KeyPersonnel[]>([]);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Get profile data
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            setProfile(profileData);
            
            // Fetch key personnel
            const { data: personnelData, error: personnelError } = await supabase
              .from('key_personnel')
              .select('*')
              .eq('profile_id', user.id)
              .order('key_number', { ascending: true });
              
            if (personnelError) {
              console.error('Error fetching key personnel:', personnelError);
            } else {
              setKeyPersonnel(personnelData || []);
            }
            
            // Fetch shareholders
            const { data: shareholderData, error: shareholderError } = await supabase
              .from('shareholders')
              .select('*')
              .eq('profile_id', user.id);
              
            if (shareholderError) {
              console.error('Error fetching shareholders:', shareholderError);
            } else {
              setShareholders(shareholderData || []);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get service delivery type text
  const getServiceDeliveryText = (businessType: string | null | undefined) => {
    if (!businessType) return 'Not specified';
    if (businessType.includes('Fixed')) return 'Services provided at own premises';
    if (businessType.includes('people')) return 'Services provided at client locations';
    return businessType;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-4">Loading profile data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <PageBreadcrumb items={[{ label: 'Business Profile Details' }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[32px] font-[400] leading-[48px] font-recoleta">Business Details</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your business information and settings</p>
        </div>
        <Button variant="default">Save changes</Button>
      </div>

      <Tabs defaultValue="business">
        <TabsList className="mb-6">
          <TabsTrigger value="business">
            <Building2 className="mr-2 h-4 w-4" />
            Business Information
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="mr-2 h-4 w-4" />
            Contact Details
          </TabsTrigger>
          <TabsTrigger value="personnel">
            <Users className="mr-2 h-4 w-4" />
            Key Personnel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Business Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="abn">ABN<span className="text-red-500">*</span></Label>
                  <Input id="abn" value={profile?.abn || ''} className="flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registeredName">Registered business name<span className="text-red-500">*</span></Label>
                    <Input id="registeredName" value={profile?.registered_business_name || ''} placeholder="Enter registered business name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entityType">Entity type</Label>
                    <Input id="entityType" value={profile?.entity_type || ''} placeholder="Entity type" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acn">ACN</Label>
                  <Input id="acn" value={profile?.acn || ''} placeholder="Enter ACN" />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="gstRegistered"
                    checked={profile?.is_gst_registered || false}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="gstRegistered">Registered for GST</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Business Address</CardTitle>
              <p className="text-sm text-gray-500">Your primary business location</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address<span className="text-red-500">*</span></Label>
                <Input id="address" value={profile?.address || ''} placeholder="Street address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Address line 2</Label>
                <Input id="address2" value={profile?.address_line_2 || ''} placeholder="Apartment, suite, etc." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
                  <Input id="city" value={profile?.city || ''} placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State<span className="text-red-500">*</span></Label>
                  <Input id="state" value={profile?.state || ''} placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postal code<span className="text-red-500">*</span></Label>
                  <Input id="postcode" value={profile?.postal_code || ''} placeholder="Postal code" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country<span className="text-red-500">*</span></Label>
                <Input id="country" value={profile?.country || ''} placeholder="Country" />
              </div>
            </CardContent>
          </Card>
          
          {/* Service Delivery Section - Simplified */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Service delivery</CardTitle>
              <p className="text-sm text-gray-500">How you provide services</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service location</Label>
                <div className="p-3 bg-gray-50 rounded-md flex items-center gap-2">
                  <MapPin className="text-gray-600" size={18} />
                  <span>{getServiceDeliveryText(profile?.business_type)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Staff Information</CardTitle>
              <p className="text-sm text-gray-500">Details about your staffing arrangements</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staffCount">Number of staff</Label>
                <Input 
                  id="staffCount" 
                  type="number" 
                  value={profile?.staff_count || 0} 
                  placeholder="Number of staff" 
                />
                <p className="text-xs text-gray-500">Staff likely to require more than incidental contact with people with disability.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="usesContractors"
                  checked={profile?.uses_contractors || false}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="usesContractors">Works with contractors/subcontractors</Label>
              </div>
            </CardContent>
          </Card>
          
          {/* Scheduled Sessions */}
          {profile?.calendly_url && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Scheduled Sessions</CardTitle>
                <p className="text-sm text-gray-500">Your upcoming onboarding sessions</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Onboarding Call</p>
                    {profile?.scheduled_at && (
                      <p className="text-sm text-gray-500">Scheduled for {formatDate(profile.scheduled_at)}</p>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LinkIcon size={16} />
                    <a href={profile.calendly_url} target="_blank" rel="noopener noreferrer">
                      View Booking
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Personal Contact Details</CardTitle>
              <p className="text-sm text-gray-500">Your personal contact information</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name<span className="text-red-500">*</span></Label>
                  <Input id="firstName" value={profile?.first_name || ''} placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name<span className="text-red-500">*</span></Label>
                  <Input id="lastName" value={profile?.last_name || ''} placeholder="Enter last name" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address<span className="text-red-500">*</span></Label>
                  <Input id="email" value={profile?.email || ''} placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number<span className="text-red-500">*</span></Label>
                  <Input id="phone" value={profile?.phone || ''} placeholder="Enter phone number" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Business Contact Details</CardTitle>
              <p className="text-sm text-gray-500">Contact information for your business</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business email</Label>
                  <Input id="businessEmail" value={profile?.business_email || ''} placeholder="Enter business email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business phone</Label>
                  <Input id="businessPhone" value={profile?.business_phone || ''} placeholder="Enter business phone" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personnel" className="space-y-6">
          {/* Key Personnel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Key Personnel</CardTitle>
              <p className="text-sm text-gray-500">People with significant involvement in your business</p>
            </CardHeader>
            <CardContent>
              {keyPersonnel.length > 0 ? (
                <div className="space-y-4">
                  {keyPersonnel.map((person) => (
                    <div key={person.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{person.first_name} {person.last_name}</h3>
                          <p className="text-sm text-gray-500">{person.position}</p>
                        </div>
                        {person.has_ownership && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Ownership Interest
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Email:</span> {person.email}
                        </div>
                        <div>
                          <span className="text-gray-500">Phone:</span> {person.phone}
                        </div>
                        {person.date_of_birth && (
                          <div>
                            <span className="text-gray-500">Date of Birth:</span> {formatDate(person.date_of_birth)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-lg mb-1">No key personnel found</h3>
                  <p className="text-gray-500 text-sm">Key personnel information will appear here once added</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Shareholders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Shareholders</CardTitle>
              <p className="text-sm text-gray-500">Individuals or entities that hold shares in your business</p>
            </CardHeader>
            <CardContent>
              {shareholders.length > 0 ? (
                <div className="space-y-2">
                  {shareholders.map((shareholder) => (
                    <div key={shareholder.id} className="p-3 border rounded-md">
                      <p className="font-medium">{shareholder.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-lg mb-1">No shareholders found</h3>
                  <p className="text-gray-500 text-sm">Shareholder information will appear here once added</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
