import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
const Employees = () => {
  const employees = [{
    name: "John Smith",
    role: "Senior Developer",
    department: "Engineering",
    email: "john.smith@company.com",
    status: "Active"
  }, {
    name: "Sarah Johnson",
    role: "HR Manager",
    department: "Human Resources",
    email: "sarah.j@company.com",
    status: "Active"
  }, {
    name: "Michael Chen",
    role: "Product Manager",
    department: "Product",
    email: "m.chen@company.com",
    status: "On Leave"
  }];
  return <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-normal">Employees</h1>
          <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Employee
          </Button>
        </div>

        <div className="mb-6">
          <Input placeholder="Search employees..." className="max-w-md" />
        </div>

        <div className="grid gap-4">
          {employees.map((employee, index) => <Card key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{employee.name}</h3>
                  <p className="text-gray-600">{employee.role}</p>
                  <p className="text-gray-500 text-sm mt-1">{employee.department}</p>
                  <p className="text-gray-500 text-sm">{employee.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {employee.status}
                </span>
              </div>
            </Card>)}
        </div>
      </div>
    </Layout>;
};
export default Employees;