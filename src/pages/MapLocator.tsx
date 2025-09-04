import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Search, Phone, Clock, ExternalLink } from 'lucide-react';

const MapLocator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  // Mock facilities data - in real app, would come from API
  const facilities = [
    {
      id: '1',
      name: 'Green Recycling Center',
      type: 'Recycling Center',
      address: '123 Eco Street, Green District',
      distance: '0.8 km',
      phone: '+1-234-567-8900',
      hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
      services: ['Paper', 'Plastic', 'Metal', 'Glass'],
      lat: 12.9716,
      lng: 77.5946,
      status: 'open',
    },
    {
      id: '2',
      name: 'City Composting Facility',
      type: 'Composting',
      address: '456 Organic Avenue, Eco City',
      distance: '1.2 km',
      phone: '+1-234-567-8901',
      hours: 'Mon-Sat: 7AM-5PM',
      services: ['Organic Waste', 'Garden Waste', 'Food Scraps'],
      lat: 12.9716,
      lng: 77.5946,
      status: 'open',
    },
    {
      id: '3',
      name: 'Hazardous Waste Collection',
      type: 'Hazardous Waste',
      address: '789 Safety Road, Industrial Zone',
      distance: '2.1 km',
      phone: '+1-234-567-8902',
      hours: 'Mon-Fri: 9AM-4PM',
      services: ['Batteries', 'Electronics', 'Chemicals', 'Paint'],
      lat: 12.9716,
      lng: 77.5946,
      status: 'open',
    },
    {
      id: '4',
      name: 'Bio-methanization Plant',
      type: 'Treatment Plant',
      address: '321 Innovation Drive, Tech Park',
      distance: '3.5 km',
      phone: '+1-234-567-8903',
      hours: 'Mon-Fri: 8AM-5PM',
      services: ['Biogas Production', 'Slurry Processing'],
      lat: 12.9716,
      lng: 77.5946,
      status: 'maintenance',
    },
    {
      id: '5',
      name: 'E-Waste Processing Hub',
      type: 'E-Waste',
      address: '654 Digital Boulevard, Cyber City',
      distance: '4.2 km',
      phone: '+1-234-567-8904',
      hours: 'Tue-Sat: 10AM-6PM',
      services: ['Computers', 'Mobile Phones', 'Appliances'],
      lat: 12.9716,
      lng: 77.5946,
      status: 'open',
    },
  ];

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-success';
      case 'closed': return 'bg-destructive';
      case 'maintenance': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getDirections = (facility: any) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Facility Locator</h1>
          <p className="text-muted-foreground">Find nearby waste management and recycling facilities</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search & Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search by name, type, or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="focus-ring"
                  />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Quick Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Recycling', 'Composting', 'E-Waste', 'Hazardous'].map((filter) => (
                        <Button
                          key={filter}
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchTerm(filter)}
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Facility Details */}
            {selectedFacility && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Facility Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const facility = facilities.find(f => f.id === selectedFacility);
                    if (!facility) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-1">{facility.name}</h3>
                          <p className="text-sm text-muted-foreground">{facility.type}</p>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                            <span>{facility.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>{facility.phone}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 mt-0.5 text-primary" />
                            <span>{facility.hours}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Services</h4>
                          <div className="flex flex-wrap gap-1">
                            {facility.services.map((service) => (
                              <Badge key={service} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={() => getDirections(facility)}
                          className="w-full"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map & Facilities List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <Card className="card-elevated">
              <CardContent className="p-0">
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Shows facility locations and user position
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Nearby Facilities ({filteredFacilities.length})
                </h2>
                <Button variant="outline" size="sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  Sort by Distance
                </Button>
              </div>

              {filteredFacilities.map((facility) => (
                <Card 
                  key={facility.id} 
                  className={`card-elevated cursor-pointer transition-all duration-200 ${
                    selectedFacility === facility.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFacility(facility.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{facility.name}</h3>
                        <p className="text-muted-foreground">{facility.type}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(facility.status)}>
                          {facility.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{facility.distance}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{facility.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{facility.hours}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(facility);
                        }}
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`tel:${facility.phone}`);
                        }}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLocator;