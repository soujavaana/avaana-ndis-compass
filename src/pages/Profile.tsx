
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Users, Plus, Trash2, LinkIcon } from 'lucide-react';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { useProfile, useUpdateProfile, useKeyPersonnel, useDeleteKeyPersonnel } from '@/hooks/useProfile';
import AddPersonnelModal from '@/components/modals/AddPersonnelModal';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type ProfileData = Database['public']['Tables']['profiles']['Row'];

const Profile = () => {
  const { data: profile, isLoading } = useProfile();
  const { data: keyPersonnel = [] } = useKeyPersonnel();
  const updateProfileMutation = useUpdateProfile();
  const deletePersonnelMutation = useDeleteKeyPersonnel();
  const { toast } = useToast();
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);
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
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  if (isLoading) {
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
      <PageBreadcrumb items={[{ label: 'Business Profile Details' }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[32px] font-[400] leading-[48px] font-recoleta">Business Details</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your business information and settings</p>
        </div>
        <Button variant="default" onClick={handleSave} disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending ? 'Saving...' : 'Save changes'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name<span className="text-red-500">*</span></Label>
                <Input 
                  id="firstName" 
                  value={formData.first_name || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))} 
                  placeholder="Enter first name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name<span className="text-red-500">*</span></Label>
                <Input 
                  id="lastName" 
                  value={formData.last_name || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))} 
                  placeholder="Enter last name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address<span className="text-red-500">*</span></Label>
                <Input 
                  id="email" 
                  value={formData.email || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                  placeholder="Enter email address" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number<span className="text-red-500">*</span></Label>
                <Input 
                  id="phone" 
                  value={formData.phone || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} 
                  placeholder="Enter phone number" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="abn">ABN<span className="text-red-500">*</span></Label>
              <Input 
                id="abn" 
                value={formData.abn || ''} 
                onChange={e => setFormData(prev => ({ ...prev, abn: e.target.value }))} 
                placeholder="Enter ABN"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registeredName">Registered business name<span className="text-red-500">*</span></Label>
                <Input 
                  id="registeredName" 
                  value={formData.registered_business_name || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, registered_business_name: e.target.value }))} 
                  placeholder="Enter registered business name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entityType">Entity type</Label>
                <Input 
                  id="entityType" 
                  value={formData.entity_type || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, entity_type: e.target.value }))} 
                  placeholder="e.g., Pty Ltd, Trust, Partnership"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="acn">ACN</Label>
                <Input 
                  id="acn" 
                  value={formData.acn || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, acn: e.target.value }))} 
                  placeholder="Enter ACN" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffCount">Number of staff</Label>
                <Input 
                  id="staffCount" 
                  type="number" 
                  value={formData.staff_count || 0} 
                  onChange={e => setFormData(prev => ({ ...prev, staff_count: parseInt(e.target.value) || 0 }))} 
                  placeholder="Number of staff" 
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gstRegistered" 
                checked={formData.is_gst_registered || false} 
                onCheckedChange={checked => setFormData(prev => ({ ...prev, is_gst_registered: !!checked }))} 
              />
              <Label htmlFor="gstRegistered">Registered for GST</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="usesContractors" 
                checked={formData.uses_contractors || false} 
                onCheckedChange={checked => setFormData(prev => ({ ...prev, uses_contractors: !!checked }))} 
              />
              <Label htmlFor="usesContractors">Works with contractors/subcontractors</Label>
            </div>
          </CardContent>
        </Card>

        {/* Business Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Business Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street address<span className="text-red-500">*</span></Label>
              <Input 
                id="address" 
                value={formData.address || ''} 
                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))} 
                placeholder="Enter street address" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
                <Input 
                  id="city" 
                  value={formData.city || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))} 
                  placeholder="City" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State<span className="text-red-500">*</span></Label>
                <Input 
                  id="state" 
                  value={formData.state || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))} 
                  placeholder="State" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postal code<span className="text-red-500">*</span></Label>
                <Input 
                  id="postcode" 
                  value={formData.postal_code || ''} 
                  onChange={e => setFormData(prev => ({ ...prev, postal_code: e.target.value }))} 
                  placeholder="Postal code" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Personnel */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Personnel
              </CardTitle>
              <p className="text-sm text-gray-500">People with significant involvement in your business</p>
            </div>
            <Button onClick={() => setIsPersonnelModalOpen(true)} className="flex items-center gap-2">
              <Plus size={16} />
              Add Personnel
            </Button>
          </CardHeader>
          <CardContent>
            {keyPersonnel.length > 0 ? (
              <div className="space-y-3">
                {keyPersonnel.map(person => (
                  <div key={person.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{person.first_name} {person.last_name}</h3>
                          {person.has_ownership && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Ownership
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{person.position}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>Email: {person.email}</div>
                          <div>Phone: {person.phone}</div>
                          {person.date_of_birth && (
                            <div>Date of Birth: {formatDate(person.date_of_birth)}</div>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeletePersonnel(person.id)} 
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-medium text-lg mb-1">No key personnel found</h3>
                <p className="text-gray-500 text-sm">Add key personnel to get started</p>
              </div>
            )}
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
      </div>

      <AddPersonnelModal open={isPersonnelModalOpen} onOpenChange={setIsPersonnelModalOpen} />
    </Layout>
  );
};

export default Profile;
