import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Clock, AlertTriangle, Users, Award, TrendingUp, FileText } from 'lucide-react';

const ChampionDashboard: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Mock data for Green Champion dashboard
  const stats = {
    pendingReports: 8,
    verifiedReports: 156,
    rejectedReports: 12,
    communityMembers: 342,
    thisMonthVerifications: 45,
    averageResponseTime: '2.3 hours',
  };

  const pendingReports = [
    {
      id: '1',
      type: 'Waste Overflow',
      description: 'Garbage bin overflowing near the park entrance, attracting stray animals.',
      location: 'Central Park, Main Entrance',
      submittedBy: 'John Doe',
      submittedAt: '2 hours ago',
      urgency: 'high',
      photos: 3,
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    {
      id: '2',
      type: 'Illegal Dumping',
      description: 'Construction waste dumped on the roadside, blocking pedestrian walkway.',
      location: '5th Avenue, Near Shopping Mall',
      submittedBy: 'Sarah Wilson',
      submittedAt: '4 hours ago',
      urgency: 'medium',
      photos: 2,
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    {
      id: '3',
      type: 'Missed Collection',
      description: 'Regular waste collection missed for 3 days in residential area.',
      location: 'Green Valley Apartments, Block B',
      submittedBy: 'Michael Brown',
      submittedAt: '6 hours ago',
      urgency: 'medium',
      photos: 1,
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    {
      id: '4',
      type: 'Damaged Bin',
      description: 'Public waste bin damaged and needs replacement.',
      location: 'Bus Stop #45, Commercial Street',
      submittedBy: 'Emily Davis',
      submittedAt: '1 day ago',
      urgency: 'low',
      photos: 2,
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
  ];

  const recentVerifications = [
    { id: '1', type: 'Verified', description: 'Waste overflow at Market Square', action: 'Escalated to Municipal Team', time: '30 minutes ago' },
    { id: '2', type: 'Rejected', description: 'False alarm - Normal waste levels', action: 'Marked as resolved', time: '1 hour ago' },
    { id: '3', type: 'Verified', description: 'Illegal dumping on Highway', action: 'Cleanup team dispatched', time: '2 hours ago' },
    { id: '4', type: 'Verified', description: 'Blocked drain due to waste', action: 'Emergency crew notified', time: '3 hours ago' },
  ];

  const handleReportAction = (reportId: string, action: 'verify' | 'reject' | 'escalate') => {
    // In real app, this would make API calls
    console.log(`${action} report ${reportId}`);
    
    // Remove from pending reports (mock)
    // In real app, refresh data from API
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Green Champion Dashboard</h1>
          <p className="text-muted-foreground">Review and verify community waste reports</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                  <p className="text-3xl font-bold text-warning">{stats.pendingReports}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified Reports</p>
                  <p className="text-3xl font-bold text-success">{stats.verifiedReports}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Community Members</p>
                  <p className="text-3xl font-bold text-primary">{stats.communityMembers}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                  <p className="text-3xl font-bold text-secondary">{stats.averageResponseTime}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full lg:w-[400px] grid-cols-2">
            <TabsTrigger value="pending">Pending Reports</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Reports List */}
              <div className="lg:col-span-2 space-y-4">
                {pendingReports.map((report) => (
                  <Card 
                    key={report.id} 
                    className={`card-elevated cursor-pointer transition-all duration-200 ${
                      selectedReport === report.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{report.type}</h3>
                          <p className="text-sm text-muted-foreground">by {report.submittedBy} • {report.submittedAt}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getUrgencyColor(report.urgency)}>
                            {report.urgency}
                          </Badge>
                          <Badge variant="outline">
                            {report.photos} photos
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm mb-4">{report.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{report.location}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReportAction(report.id, 'verify');
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReportAction(report.id, 'reject');
                          }}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReportAction(report.id, 'escalate');
                          }}
                        >
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Escalate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Report Details Sidebar */}
              <div className="space-y-6">
                {selectedReport ? (
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Report Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const report = pendingReports.find(r => r.id === selectedReport);
                        if (!report) return null;
                        
                        return (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Location</h4>
                              <p className="text-sm text-muted-foreground">{report.location}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Lat: {report.coordinates.lat}, Lng: {report.coordinates.lng}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Submitted By</h4>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>{report.submittedBy[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{report.submittedBy}</p>
                                  <p className="text-xs text-muted-foreground">Citizen</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Photos</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {Array.from({ length: report.photos }).map((_, i) => (
                                  <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground">Photo {i + 1}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <Button className="w-full" variant="outline">
                              View on Map
                            </Button>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="card-elevated">
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Select a report to view details</p>
                    </CardContent>
                  </Card>
                )}

                {/* Performance Card */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      This Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Verifications</span>
                        <span className="font-medium">{stats.thisMonthVerifications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="font-medium">{stats.averageResponseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Accuracy Rate</span>
                        <span className="font-medium text-success">94%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Verification Activity</CardTitle>
                <CardDescription>Your latest report reviews and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVerifications.map((verification) => (
                    <div key={verification.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          verification.type === 'Verified' ? 'bg-success/10' : 'bg-destructive/10'
                        }`}>
                          {verification.type === 'Verified' ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <XCircle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{verification.description}</p>
                          <p className="text-xs text-muted-foreground">{verification.action}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {verification.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChampionDashboard;