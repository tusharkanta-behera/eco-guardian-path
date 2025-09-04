import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Camera, MapPin, Upload, AlertTriangle, Trash2, Construction } from 'lucide-react';

const ReportForm: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    lat: '',
    lng: '',
    urgency: 'medium',
  });
  
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const reportTypes = [
    { value: 'overflow', label: 'Waste Overflow', icon: <Trash2 className="w-4 h-4" /> },
    { value: 'illegal_dumping', label: 'Illegal Dumping', icon: <AlertTriangle className="w-4 h-4" /> },
    { value: 'missed_collection', label: 'Missed Collection', icon: <Trash2 className="w-4 h-4" /> },
    { value: 'damaged_bin', label: 'Damaged Bin', icon: <Construction className="w-4 h-4" /> },
    { value: 'other', label: 'Other Issue', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  const getCurrentLocation = () => {
    setUseCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
          });
          setUseCurrentLocation(false);
          toast({
            title: 'Location captured',
            description: 'Your current location has been added to the report.',
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUseCurrentLocation(false);
          toast({
            title: 'Location Error',
            description: 'Unable to get your location. Please enter it manually.',
            variant: 'destructive',
          });
        }
      );
    } else {
      setUseCurrentLocation(false);
      toast({
        title: 'Geolocation not supported',
        description: 'Your browser does not support geolocation.',
        variant: 'destructive',
      });
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length > 5) {
      toast({
        title: 'Too many photos',
        description: 'You can upload maximum 5 photos per report.',
        variant: 'destructive',
      });
      return;
    }
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.location && (!formData.lat || !formData.lng)) {
      toast({
        title: 'Location Required',
        description: 'Please provide either an address or GPS coordinates.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In real app, upload photos first, then submit report
      // const photoUrls = await uploadPhotos(photos);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Report Submitted Successfully!',
        description: 'Your waste management report has been submitted and will be reviewed by our team.',
      });

      // Reset form
      setFormData({
        type: '',
        description: '',
        location: '',
        lat: '',
        lng: '',
        urgency: 'medium',
      });
      setPhotos([]);
      
    } catch (error) {
      console.error('Failed to submit report:', error);
      toast({
        title: 'Submission Failed',
        description: 'Unable to submit your report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Report Waste Issue</h1>
            <p className="text-muted-foreground">Help keep your community clean by reporting waste-related problems</p>
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible to help us address the issue quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Issue Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Issue Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px] focus-ring"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <Label>Location *</Label>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter address or landmark"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="focus-ring"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentLocation}
                        disabled={useCurrentLocation}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        {useCurrentLocation ? 'Getting...' : 'Use Current'}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Latitude"
                        value={formData.lat}
                        onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                        className="focus-ring"
                      />
                      <Input
                        placeholder="Longitude"
                        value={formData.lng}
                        onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                        className="focus-ring"
                      />
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait a few days</SelectItem>
                      <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                      <SelectItem value="high">High - Needs immediate attention</SelectItem>
                      <SelectItem value="critical">Critical - Emergency situation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Photos */}
                <div className="space-y-4">
                  <Label>Photos (Optional)</Label>
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-24 border-dashed"
                    >
                      <div className="text-center">
                        <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm">Click to add photos</p>
                        <p className="text-xs text-muted-foreground">Up to 5 photos, max 10MB each</p>
                      </div>
                    </Button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />

                    {photos.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                              onClick={() => removePhoto(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="card-elevated mt-6">
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Your report will be reviewed by our verification team</p>
                <p>• If verified, it will be assigned to the appropriate municipal department</p>
                <p>• You'll receive updates on the resolution progress</p>
                <p>• Once resolved, you'll earn environmental points as a thank you</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;