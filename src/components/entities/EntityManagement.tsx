
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { accountingService } from '@/services/accountingService';
import { Entity } from '@/types/accounting';
import { Building2, Plus, Edit, MapPin } from 'lucide-react';

export const EntityManagement = () => {
  const [entities] = useState<Entity[]>(accountingService.getEntities());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEntityTypeColor = (type: string) => {
    switch (type) {
      case 'head_office':
        return 'bg-blue-100 text-blue-800';
      case 'branch':
        return 'bg-green-100 text-green-800';
      case 'commissary':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEntityTypeIcon = (type: string) => {
    return <Building2 className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Entity Management</h1>
          <p className="text-gray-600">Manage branches, commissary, and head office</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Entity
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search entities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Entity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-800">1</p>
                <p className="text-sm text-blue-600">Head Office</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">5</p>
                <p className="text-sm text-green-600">Branches</p>
              </div>
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-800">1</p>
                <p className="text-sm text-purple-600">Commissary</p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entity List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEntities.map((entity) => (
          <Card key={entity.id} className="financial-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getEntityTypeIcon(entity.type)}
                  <div>
                    <CardTitle className="text-lg">{entity.name}</CardTitle>
                    <p className="text-sm text-gray-600">Code: {entity.code}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getEntityTypeColor(entity.type)}>
                    {entity.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant={entity.isActive ? 'default' : 'secondary'}>
                    {entity.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                {entity.address && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {entity.address}
                  </div>
                )}

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Accounts:</span>
                    <span className="font-medium">--</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Entry:</span>
                    <span className="font-medium">--</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
