
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddShareholder } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface AddShareholderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddShareholderModal: React.FC<AddShareholderModalProps> = ({ open, onOpenChange }) => {
  const [name, setName] = useState('');
  const addShareholderMutation = useAddShareholder();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    try {
      await addShareholderMutation.mutateAsync({ name: name.trim() });
      
      toast({
        title: 'Success',
        description: 'Shareholder added successfully',
      });
      
      setName('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add shareholder',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Shareholder</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Shareholder Name*</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter shareholder name"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addShareholderMutation.isPending}>
              {addShareholderMutation.isPending ? 'Adding...' : 'Add Shareholder'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShareholderModal;
