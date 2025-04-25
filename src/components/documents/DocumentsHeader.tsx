import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
interface CategoryTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}
const CategoryTab = ({
  label,
  active,
  onClick
}: CategoryTabProps) => <button onClick={onClick} className={`px-4 py-2 font-medium rounded-md ${active ? 'bg-avaana-accent text-avaana-text' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
    {label}
  </button>;
const DocumentsHeader = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const categories = ['All', 'Policies', 'Certificates', 'Audits', 'Screening'];
  return <div className="space-y-6">
      <h1 className="text-3xl text-gray-900 font-normal">Document Management</h1>
      
      <div className="flex gap-2">
        {categories.map(category => <CategoryTab key={category} label={category} active={activeCategory === category} onClick={() => setActiveCategory(category)} />)}
      </div>
      
      <div className="flex gap-2">
        <Button className="bg-avaana-primary hover:bg-avaana-secondary">
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
        <Button variant="outline">Filter</Button>
      </div>
    </div>;
};
export default DocumentsHeader;