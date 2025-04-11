
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Upload, ReceiptText, FileIcon, Calendar, Calculator, ArrowRight } from 'lucide-react';

const TaxAccounting = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'BAS_Q1_2023.pdf', date: 'Feb 28, 2023', status: 'Approved' },
    { id: 2, name: 'BAS_Q2_2023.pdf', date: 'May 31, 2023', status: 'Approved' },
    { id: 3, name: 'BAS_Q3_2023.pdf', date: 'Aug 31, 2023', status: 'Pending' },
  ]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tax & Accounting</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Connect Your Accounting Software</CardTitle>
            <CardDescription>
              Link your accounting software to streamline financial reporting and tax preparation.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-avaana-primary transition-colors">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/Xero_logo.svg" 
                alt="Xero" 
                className="h-16 mb-4" 
              />
              <h3 className="text-lg font-medium mb-2">Connect Xero</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Integrate with Xero for seamless financial management
              </p>
              <Button className="mt-auto">
                Connect <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-avaana-primary transition-colors">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Quickbooks-logo.png" 
                alt="QuickBooks" 
                className="h-16 mb-4" 
              />
              <h3 className="text-lg font-medium mb-2">Connect QuickBooks</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Integrate with QuickBooks for comprehensive accounting
              </p>
              <Button className="mt-auto">
                Connect <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tax Calendar</CardTitle>
            <CardDescription>Important upcoming tax dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-avaana-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Q4 BAS Due</h4>
                  <p className="text-sm text-gray-500">February 28, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calculator className="h-5 w-5 text-avaana-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Tax Return Due</h4>
                  <p className="text-sm text-gray-500">October 31, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-avaana-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Q1 BAS Due</h4>
                  <p className="text-sm text-gray-500">May 28, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>BAS Statements</CardTitle>
          <CardDescription>Upload and manage your Business Activity Statements</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload BAS</TabsTrigger>
              <TabsTrigger value="history">Upload History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-1">Upload BAS Statement</h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Drag and drop your BAS document or click to browse
                </p>
                <Button variant="outline" className="mb-2">
                  <Upload className="mr-2 h-4 w-4" /> Select File
                </Button>
                <p className="text-xs text-gray-400">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quarter">BAS Quarter</Label>
                  <select 
                    id="quarter" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a quarter</option>
                    <option value="Q1-2024">Quarter 1 (Jul-Sep 2023)</option>
                    <option value="Q2-2024">Quarter 2 (Oct-Dec 2023)</option>
                    <option value="Q3-2024">Quarter 3 (Jan-Mar 2024)</option>
                    <option value="Q4-2024">Quarter 4 (Apr-Jun 2024)</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="comment">Comments (Optional)</Label>
                  <Input id="comment" placeholder="Add any notes or comments" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Submit BAS Statement</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted p-4 font-medium">
                  <div className="col-span-5">Filename</div>
                  <div className="col-span-3">Uploaded</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="grid grid-cols-12 p-4 border-t items-center">
                    <div className="col-span-5 flex items-center gap-2">
                      <FileIcon className="h-5 w-5 text-gray-400" />
                      {file.name}
                    </div>
                    <div className="col-span-3 text-gray-600">{file.date}</div>
                    <div className="col-span-2">
                      {file.status === 'Approved' ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-4 w-4" /> Approved
                        </span>
                      ) : (
                        <span className="text-amber-600">Pending</span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <Button variant="ghost" size="sm">
                        <ReceiptText className="h-4 w-4 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TaxAccounting;
