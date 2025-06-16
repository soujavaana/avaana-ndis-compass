
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddKeyPersonnel, useKeyPersonnel } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface AddPersonnelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPersonnelModal: React.FC<AddPersonnelModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    position: '',
    email: '',
    phone: '',
    date_of_birth: '',
    has_ownership: false,
    ownership_percentage: '',
    start_date: '',
  });

  const { data: existingPersonnel } = useKeyPersonnel();
  const addPersonnelMutation = useAddKeyPersonnel();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const nextKeyNumber = (existingPersonnel?.length || 0) + 1;
      
      await addPersonnelMutation.mutateAsync({
        ...formData,
        key_number: nextKeyNumber,
        ownership_percentage: formData.ownership_percentage ? parseFloat(formData.ownership_percentage) : null,
        date_of_birth: formData.date_of_birth || null,
        start_date: formData.start_date || null,
      });
      
      toast({
        title: 'Success',
        description: 'Key personnel added successfully',
      });
      
      setFormData({
        first_name: '',
        last_name: '',
        position: '',
        email: '',
        phone: '',
        date_of_birth: '',
        has_ownership: false,
        ownership_percentage: '',
        start_date: '',
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add key personnel',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Key Personnel</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name*</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name*</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_ownership"
              checked={formData.has_ownership}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, has_ownership: !!checked }))
              }
            />
            <Label htmlFor="has_ownership">Has ownership interest</Label>
          </div>
          
          {formData.has_ownership && (
            <div className="space-y-2">
              <Label htmlFor="ownership_percentage">Ownership Percentage (%)</Label>
              <Input
                id="ownership_percentage"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.ownership_percentage}
                onChange={(e) => setFormData(prev => ({ ...prev, ownership_percentage: e.target.value }))}
              />
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addPersonnelMutation.isPending}>
              {addPersonnelMutation.isPending ? 'Adding...' : 'Add Personnel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPersonnelModal;
