
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EvidenceTasks = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Evidence Tasks</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white">Filter</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">+ Create Task</Button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="mb-4">
            <Input placeholder="Search tasks..." className="max-w-md" />
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger 
                value="active" 
                className="px-4 py-2 text-gray-600"
              >
                Active Tasks
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="px-4 py-2 text-gray-600"
              >
                Completed Tasks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-6 bg-gray-50 py-2 px-4 border-b">
                  <div className="font-medium">Task</div>
                  <div className="font-medium">Related Control</div>
                  <div className="font-medium">Assigned To</div>
                  <div className="font-medium">Due Date</div>
                  <div className="font-medium">Status</div>
                  <div className="font-medium">Actions</div>
                </div>
                
                {[
                  {
                    task: "Update Password Policy Documentation",
                    control: "Password Policy",
                    assignedTo: "John Smith",
                    dueDate: "Jul 15, 2025",
                    status: "In Progress" 
                  },
                  {
                    task: "Collect Access Control Audit Logs",
                    control: "Access Control",
                    assignedTo: "Emma Davis",
                    dueDate: "Jul 20, 2025",
                    status: "Not Started"
                  },
                  {
                    task: "Review Backup Success Rates",
                    control: "Data Backup",
                    assignedTo: "Sam Wilson",
                    dueDate: "Jul 22, 2025",
                    status: "In Progress"
                  },
                  {
                    task: "Update Incident Response Plan",
                    control: "Incident Response",
                    assignedTo: "John Smith",
                    dueDate: "Jul 30, 2025",
                    status: "Overdue"
                  }
                ].map((task, i) => (
                  <div key={i} className="grid grid-cols-6 py-3 px-4 border-b hover:bg-gray-50">
                    <div className="font-medium">{task.task}</div>
                    <div>{task.control}</div>
                    <div>{task.assignedTo}</div>
                    <div>{task.dueDate}</div>
                    <div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'Not Started' ? 'bg-gray-100 text-gray-800' : 
                        task.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="link" className="p-0 h-auto">View</Button>
                      <Button variant="link" className="p-0 h-auto">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-6 bg-gray-50 py-2 px-4 border-b">
                  <div className="font-medium">Task</div>
                  <div className="font-medium">Related Control</div>
                  <div className="font-medium">Completed By</div>
                  <div className="font-medium">Completed Date</div>
                  <div className="font-medium">Evidence</div>
                  <div className="font-medium">Actions</div>
                </div>
                
                {[
                  {
                    task: "Quarterly Password Audit",
                    control: "Password Policy",
                    completedBy: "John Smith",
                    completedDate: "Jun 15, 2025",
                    evidence: "Audit Report" 
                  },
                  {
                    task: "User Access Review",
                    control: "Access Control",
                    completedBy: "Emma Davis",
                    completedDate: "Jun 10, 2025",
                    evidence: "Review Document"
                  }
                ].map((task, i) => (
                  <div key={i} className="grid grid-cols-6 py-3 px-4 border-b hover:bg-gray-50">
                    <div className="font-medium">{task.task}</div>
                    <div>{task.control}</div>
                    <div>{task.completedBy}</div>
                    <div>{task.completedDate}</div>
                    <div>{task.evidence}</div>
                    <div>
                      <Button variant="link" className="p-0 h-auto">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default EvidenceTasks;
