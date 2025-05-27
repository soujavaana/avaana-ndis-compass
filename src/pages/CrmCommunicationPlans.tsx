
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCommunicationPlans, CommunicationPlan } from '@/hooks/useCommunicationPlans';
import { useTasks } from '@/hooks/useTasks';
import CommunicationPlanCard from '@/components/crm/CommunicationPlanCard';
import CreatePlanModal from '@/components/crm/CreatePlanModal';
import { Plus, Search, Filter, CheckCircle } from 'lucide-react';

const CrmCommunicationPlans = () => {
  const { plans, isLoading, createPlan, updatePlan, deletePlan } = useCommunicationPlans();
  const { updateTaskStatus } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<CommunicationPlan | null>(null);

  const filteredPlans = plans?.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePlan = (planData: Omit<CommunicationPlan, 'id' | 'created_at' | 'updated_at'>) => {
    createPlan.mutate(planData);
  };

  const handleEditPlan = (plan: CommunicationPlan) => {
    setEditingPlan(plan);
    setIsCreateModalOpen(true);
  };

  const handleUpdatePlan = (planData: Omit<CommunicationPlan, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingPlan) {
      updatePlan.mutate({
        id: editingPlan.id,
        updates: planData
      });
      setEditingPlan(null);
    }
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('Are you sure you want to delete this communication plan?')) {
      deletePlan.mutate(id);
    }
  };

  const handleCompleteTask = () => {
    // Mark the CRM communication plans task as completed
    updateTaskStatus.mutate({ 
      taskId: 'crm-communication-task-id', // This would come from the actual task
      status: 'completed' 
    });
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingPlan(null);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CRM Communication Plans</h1>
            <p className="text-gray-600 mt-1">Manage your customer communication strategies</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleCompleteTask}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle size={16} />
              Complete Task
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
              <Plus size={16} />
              Create Plan
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plans?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {plans?.filter(p => p.status === 'active').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Draft Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {plans?.filter(p => p.status === 'draft').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {plans?.filter(p => p.status === 'completed').length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search communication plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans Grid */}
        {filteredPlans && filteredPlans.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => (
              <CommunicationPlanCard
                key={plan.id}
                plan={plan}
                onEdit={handleEditPlan}
                onDelete={handleDeletePlan}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No communication plans match your filters'
                  : 'No communication plans created yet'
                }
              </div>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Create Your First Plan
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Modal */}
        <CreatePlanModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan}
          editingPlan={editingPlan}
        />
      </div>
    </Layout>
  );
};

export default CrmCommunicationPlans;
