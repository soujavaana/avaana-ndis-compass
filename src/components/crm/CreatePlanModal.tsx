
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CommunicationPlan } from '@/hooks/useCommunicationPlans';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: Omit<CommunicationPlan, 'id' | 'created_at' | 'updated_at'>) => void;
  editingPlan?: CommunicationPlan | null;
}

const CreatePlanModal = ({ isOpen, onClose, onSubmit, editingPlan }: CreatePlanModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'draft' as CommunicationPlan['status'],
    frequency: 'monthly' as CommunicationPlan['frequency'],
    target_audience: '',
    channels: [] as string[],
  });

  const availableChannels = ['Email', 'Phone', 'SMS', 'Portal', 'Newsletter', 'Webinar', 'Social Media'];

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        title: editingPlan.title,
        description: editingPlan.description,
        status: editingPlan.status,
        frequency: editingPlan.frequency,
        target_audience: editingPlan.target_audience,
        channels: editingPlan.channels,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'draft',
        frequency: 'monthly',
        target_audience: '',
        channels: [],
      });
    }
  }, [editingPlan, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      channels: checked 
        ? [...prev.channels, channel]
        : prev.channels.filter(c => c !== channel)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPlan ? 'Edit Communication Plan' : 'Create New Communication Plan'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Plan Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter plan title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the communication plan objectives and approach"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: CommunicationPlan['status']) => 
                setFormData(prev => ({ ...prev, status: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value: CommunicationPlan['frequency']) => 
                setFormData(prev => ({ ...prev, frequency: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_audience">Target Audience</Label>
            <Input
              id="target_audience"
              value={formData.target_audience}
              onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value }))}
              placeholder="Who is this communication plan for?"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Communication Channels</Label>
            <div className="grid grid-cols-2 gap-3">
              {availableChannels.map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={channel}
                    checked={formData.channels.includes(channel)}
                    onCheckedChange={(checked) => 
                      handleChannelChange(channel, checked as boolean)
                    }
                  />
                  <Label htmlFor={channel} className="text-sm">
                    {channel}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingPlan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlanModal;
