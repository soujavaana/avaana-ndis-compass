import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Users, MapPin, Plus, Trash2, LinkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { useProfile, useUpdateProfile, useKeyPersonnel, useShareholders, useDeleteKeyPersonnel, useDeleteShareholder } from '@/hooks/useProfile';
import AddPersonnelModal from '@/components/modals/AddPersonnelModal';
import AddShareholderModal from '@/components/modals/AddShareholderModal';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type ProfileData = Database['public']['Tables']['profiles']['Row'];

const Profile = () => {
  const {
    data: profile,
    isLoading
  } = useProfile();
  const {
    data: keyPersonnel = []
  } = useKeyPersonnel();
  const {
    data: shareholders = []
  } = useShareholders();
  const updateProfileMutation = useUpdateProfile();
  const deletePersonnelMutation = useDeleteKeyPersonnel();
  const deleteShareholderMutation = useDeleteShareholder();
  const {
    toast
  } = useToast();
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);
  const [isShareholderModalOpen, setIsShareholderModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileData>>(profile || {});
  
  React.useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);
  
  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync(formData);
      toast({
        title: 'Success',
        description: 'Profile updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    }
  };
  
  const handleDeletePersonnel = async (id: string) => {
    try {
      await deletePersonnelMutation.mutateAsync(id);
      toast({
        title: 'Success',
        description: 'Personnel removed successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove personnel',
        variant: 'destructive'
      });
    }
  };
  
  const handleDeleteShareholder = async (id: string) => {
    try {
      await deleteShareholderMutation.mutateAsync(id);
      toast({
        title: 'Success',
        description: 'Shareholder removed successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove shareholder',
        variant: 'destructive'
      });
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const getServiceDeliveryText = (businessType: string | null | undefined) => {
    if (!businessType) return 'Not specified';
    if (businessType.includes('Fixed')) return 'Services provided at own premises';
    if (businessType.includes('people')) return 'Services provided at client locations';
    return businessType;
  };
  
  if (isLoading) {
    return <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-4">Loading profile data...</p>
          </div>
        </div>
      </Layout>;
  }
  
  return <Layout>
      <PageBreadcrumb items={[{
      label: 'Business Profile Details'
    }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[32px] font-[400] leading-[48px] font-recoleta">Business Details</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your business information and settings</p>
        </div>
        <Button variant="default" onClick={handleSave} disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending ? 'Saving...' : 'Save changes'}
        </Button>
      </div>

      <Tabs defaultValue="business">
        <TabsList className="mb-6">
          <TabsTrigger value="business" className="bg-avaana-warning">
            <Building2 className="mr-2 h-4 w-4" />
            Business Information
          </TabsTrigger>
          <TabsTrigger value="personnel">
            <Users className="mr-2 h-4 w-4" />
            Key Personnel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          {/* Combined Contact & Registration Details */}
          <Card>
            
            <CardContent className="space-y-6">
              {/* Personal Contact */}
              <div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name<span className="text-red-500">*</span></Label>
                    <Input id="firstName" value={formData.first_name || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    first_name: e.target.value
                  }))} placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name<span className="text-red-500">*</span></Label>
                    <Input id="lastName" value={formData.last_name || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    last_name: e.target.value
                  }))} placeholder="Enter last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address<span className="text-red-500">*</span></Label>
                    <Input id="email" value={formData.email || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))} placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number<span className="text-red-500">*</span></Label>
                    <Input id="phone" value={formData.phone || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))} placeholder="Enter phone number" />
                  </div>
                </div>
              </div>

              {/* Business Contact */}
              <div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business email</Label>
                    <Input id="businessEmail" value={formData.business_email || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    business_email: e.target.value
                  }))} placeholder="Enter business email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business phone</Label>
                    <Input id="businessPhone" value={formData.business_phone || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    business_phone: e.target.value
                  }))} placeholder="Enter business phone" />
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="abn">ABN<span className="text-red-500">*</span></Label>
                    <Input id="abn" value={formData.abn || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    abn: e.target.value
                  }))} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registeredName">Registered business name<span className="text-red-500">*</span></Label>
                      <Input id="registeredName" value={formData.registered_business_name || ''} onChange={e => setFormData(prev => ({
                      ...prev,
                      registered_business_name: e.target.value
                    }))} placeholder="Enter registered business name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entityType">Entity type</Label>
                      <Input id="entityType" value={formData.entity_type || ''} onChange={e => setFormData(prev => ({
                      ...prev,
                      entity_type: e.target.value
                    }))} placeholder="Entity type" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acn">ACN</Label>
                    <Input id="acn" value={formData.acn || ''} onChange={e => setFormData(prev => ({
                    ...prev,
                    acn: e.target.value
                  }))} placeholder="Enter ACN" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gstRegistered" checked={formData.is_gst_registered || false} onCheckedChange={checked => setFormData(prev => ({
                    ...prev,
                    is_gst_registered: !!checked
                  }))} />
                    <Label htmlFor="gstRegistered">Registered for GST</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Address */}
          <Card>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address<span className="text-red-500">*</span></Label>
                <Input id="address" value={formData.address || ''} onChange={e => setFormData(prev => ({
                ...prev,
                address: e.target.value
              }))} placeholder="Street address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Address line 2</Label>
                <Input id="address2" value={formData.address_line_2 || ''} onChange={e => setFormData(prev => ({
                ...prev,
                address_line_2: e.target.value
              }))} placeholder="Apartment, suite, etc." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
                  <Input id="city" value={formData.city || ''} onChange={e => setFormData(prev => ({
                  ...prev,
                  city: e.target.value
                }))} placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State<span className="text-red-500">*</span></Label>
                  <Input id="state" value={formData.state || ''} onChange={e => setFormData(prev => ({
                  ...prev,
                  state: e.target.value
                }))} placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postal code<span className="text-red-500">*</span></Label>
                  <Input id="postcode" value={formData.postal_code || ''} onChange={e => setFormData(prev => ({
                  ...prev,
                  postal_code: e.target.value
                }))} placeholder="Postal code" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country<span className="text-red-500">*</span></Label>
                <Input id="country" value={formData.country || ''} onChange={e => setFormData(prev => ({
                ...prev,
                country: e.target.value
              }))} placeholder="Country" />
              </div>
            </CardContent>
          </Card>
          
          {/* Service Delivery & Staff Information */}
          <Card>
            
            <CardContent className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="staffCount">Number of staff</Label>
                <Input id="staffCount" type="number" value={formData.staff_count || 0} onChange={e => setFormData(prev => ({
                ...prev,
                staff_count: parseInt(e.target.value) || 0
              }))} placeholder="Number of staff" />
                <p className="text-xs text-gray-500">Staff likely to require more than incidental contact with people with disability.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="usesContractors" checked={formData.uses_contractors || false} onCheckedChange={checked => setFormData(prev => ({
                ...prev,
                uses_contractors: !!checked
              }))} />
                <Label htmlFor="usesContractors">Works with contractors/subcontractors</Label>
              </div>
            </CardContent>
          </Card>
          
          {/* Scheduled Sessions */}
          {profile?.calendly_url && <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Scheduled Sessions</CardTitle>
                <p className="text-sm text-gray-500">Your upcoming onboarding sessions</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Onboarding Call</p>
                    {profile?.scheduled_at && <p className="text-sm text-gray-500">Scheduled for {formatDate(profile.scheduled_at)}</p>}
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LinkIcon size={16} />
                    <a href={profile.calendly_url} target="_blank" rel="noopener noreferrer">
                      View Booking
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>}
        </TabsContent>

        <TabsContent value="personnel" className="space-y-6">
          {/* Key Personnel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-medium">Key Personnel</CardTitle>
                <p className="text-sm text-gray-500">People with significant involvement in your business</p>
              </div>
              <Button onClick={() => setIsPersonnelModalOpen(true)} className="flex items-center gap-2">
                <Plus size={16} />
                Add Personnel
              </Button>
            </CardHeader>
            <CardContent>
              {keyPersonnel.length > 0 ? <div className="space-y-4">
                  {keyPersonnel.map(person => <div key={person.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{person.first_name} {person.last_name}</h3>
                          <p className="text-sm text-gray-500">{person.position}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {person.has_ownership && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Ownership Interest
                            </Badge>}
                          <Button variant="ghost" size="sm" onClick={() => handleDeletePersonnel(person.id)} className="text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Email:</span> {person.email}
                        </div>
                        <div>
                          <span className="text-gray-500">Phone:</span> {person.phone}
                        </div>
                        {person.date_of_birth && <div>
                            <span className="text-gray-500">Date of Birth:</span> {formatDate(person.date_of_birth)}
                          </div>}
                      </div>
                    </div>)}
                </div> : <div className="text-center py-8 bg-gray-50 rounded-md">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-lg mb-1 text-left">No key personnel found</h3>
                  <p className="text-gray-500 text-sm">Key personnel information will appear here once added</p>
                </div>}
            </CardContent>
          </Card>
          
          {/* Shareholders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-medium">Shareholders</CardTitle>
                <p className="text-sm text-gray-500">Individuals or entities that hold shares in your business</p>
              </div>
              <Button onClick={() => setIsShareholderModalOpen(true)} className="flex items-center gap-2">
                <Plus size={16} />
                Add Shareholder
              </Button>
            </CardHeader>
            <CardContent>
              {shareholders.length > 0 ? <div className="space-y-2">
                  {shareholders.map(shareholder => <div key={shareholder.id} className="flex items-center justify-between p-3 border rounded-md">
                      <p className="font-medium">{shareholder.name}</p>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteShareholder(shareholder.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 size={16} />
                      </Button>
                    </div>)}
                </div> : <div className="text-center py-8 bg-gray-50 rounded-md">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-lg mb-1">No shareholders found</h3>
                  <p className="text-gray-500 text-sm">Shareholder information will appear here once added</p>
                </div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddPersonnelModal open={isPersonnelModalOpen} onOpenChange={setIsPersonnelModalOpen} />
      
      <AddShareholderModal open={isShareholderModalOpen} onOpenChange={setIsShareholderModalOpen} />
    </Layout>;
};
export default Profile;
