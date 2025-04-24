import React from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';

const Vault = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Vault</h1>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">3</span>
            </div>
            <div className="flex gap-2">
              <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M4 4.5H12V6.5H4V4.5Z" fill="currentColor" />
                  <path d="M4 7.5H12V9.5H4V7.5Z" fill="currentColor" />
                  <path d="M4 10.5H8V12.5H4V10.5Z" fill="currentColor" />
                </svg>
                Audit Log
              </Button>
              <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
                <span className="mr-1">+</span> Add a New
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M6 1L11 6L6 11L1 6L6 1Z" fill="currentColor" />
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <Input className="bg-white w-full md:w-auto max-w-md" placeholder="Search by name" />
            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Button variant="outline" className="bg-white">
                Created By <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                Document Type <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white" size="icon">
                <span className="sr-only">Search</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" />
                  <path d="M11 11L14 14" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </Button>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="bg-white rounded-md">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H13V13H2V2Z" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="bg-white rounded-md">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H13V3H2V2ZM2 7H13V8H2V7ZM2 12H13V13H2V12Z" fill="currentColor" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                title: "VAPT final Updated Reports",
                date: "Feb 10, 2025"
              },
              {
                title: "VAPT",
                date: "Dec 3, 2024"
              },
              {
                title: "Kickoff",
                date: "Nov 11, 2024"
              }
            ].map((doc, i) => (
              <Card key={i} className="bg-white p-4 hover:shadow-md transition-shadow">
                <div className="relative">
                  <Button variant="ghost" size="icon" className="absolute top-0 right-0">
                    <MoreVertical size={16} />
                  </Button>
                  
                  <div className="flex flex-col items-center py-6">
                    <div className="mb-2">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34 10H6C4.89543 10 4 10.8954 4 12V28C4 29.1046 4.89543 30 6 30H34C35.1046 30 36 29.1046 36 28V12C36 10.8954 35.1046 10 34 10Z" fill="#FFC107" />
                        <path d="M24 20H16V22H24V20Z" fill="#795548" />
                        <path d="M24 16H16V18H24V16Z" fill="#795548" />
                        <path d="M24 24H16V26H24V24Z" fill="#795548" />
                      </svg>
                    </div>
                    <div className="text-center mt-2">
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-gray-500 text-xs mt-1">{doc.date}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Help Button */}
        <div className="fixed bottom-6 right-6">
          <Button className="bg-blue-900 hover:bg-blue-800 text-white rounded-full h-10 w-10 flex items-center justify-center p-0">
            <span className="text-lg">?</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Vault;
