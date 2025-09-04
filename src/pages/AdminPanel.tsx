import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, Shield, Settings, BarChart3, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const AdminPanel: React.FC = () => {
  // Mock admin data
  const systemStats = {
    totalUsers: 5247,
    activeReports: 89,
    resolvedToday: 156,
    systemUptime: 99.8,
    trainingCompletions: 342,
    pointsRedeemed: 12450,
  };

  const usersByRole = [
    { role: 'Citizens', count: 4890, percentage: 93.2 },
    { role: 'Workers', count: 234, percentage: 4.5 },
    { role: 'Champions', count: 78, percentage: 1.5 },
    { role: 'Admins', count: 45, percentage: 0.8 },
  ];

  const recentActivity = [
    { id: '1', type: 'user_registration', message: 'New citizen registered: John Smith', time: '5 minutes ago', status: 'info' },
    { id: '2', type: 'report_escalated', message: 'High priority report escalated to emergency team', time: '12 minutes ago', status: 'warning' },
    { id: '3', type: 'training_completed', message: '25 users completed Waste Segregation training', time: '1 hour ago', status: 'success' },
    { id: '4', type: 'system_alert', message: 'Database backup completed successfully', time: '2 hours ago', status: 'success' },
    { id: '5', type: 'violation_detected', message: 'Potential spam reports detected from IP range', time: '3 hours ago', status: 'error' },
  ];

  const champions = [
    { id: '1', name: 'Sarah Johnson', area: 'Downtown', reportsVerified: 89, rating: 4.9, status: 'active' },
    { id: '2', name: 'Mike Chen', area: 'Suburb East', reportsVerified: 76, rating: 4.8, status: 'active' },
    { id: '3', name: 'Priya Patel', area: 'Industrial Zone', reportsVerified: 92, rating: 4.7, status: 'active' },
    { id: '4', name: 'Alex Rivera', area: 'City Center', reportsVerified: 67, rating: 4.6, status: 'inactive' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return <Users className="w-4 h-4" />;
      case 'report_escalated': return <AlertTriangle className="w-4 h-4" />;
      case 'training_completed': return <CheckCircle className="w-4 h-4" />;
      case 'system_alert': return <Settings className="w-4 h-4" />;
      case 'violation_detected': return <Shield className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">System overview and management dashboard</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{systemStats.totalUsers.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Reports</p>
                  <p className="text-3xl font-bold text-warning">{systemStats.activeReports}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                  <p className="text-3xl font-bold text-success">{systemStats.resolvedToday}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full lg:w-[600px] grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="champions">Champions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* System Health */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>System Uptime</span>
                          <span>{systemStats.systemUptime}%</span>
                        </div>
                        <Progress value={systemStats.systemUptime} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-success">{systemStats.trainingCompletions}</div>
                          <div className="text-sm text-muted-foreground">Training Completions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{systemStats.pointsRedeemed.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Points Redeemed</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Recent System Activity</CardTitle>
                    <CardDescription>Latest system events and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted ${getActivityColor(activity.status)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                          <Badge variant={activity.status === 'error' ? 'destructive' : 'secondary'}>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Logs
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                {/* System Alerts */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-warning/10 rounded-lg">
                        <p className="text-sm font-medium text-warning">High Report Volume</p>
                        <p className="text-xs text-muted-foreground">45% increase in reports this week</p>
                      </div>
                      <div className="p-3 bg-success/10 rounded-lg">
                        <p className="text-sm font-medium text-success">Backup Completed</p>
                        <p className="text-xs text-muted-foreground">Daily backup successful</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                  <CardDescription>Breakdown of users by role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usersByRole.map((role) => (
                      <div key={role.role}>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{role.role}</span>
                          <span>{role.count} ({role.percentage}%)</span>
                        </div>
                        <Progress value={role.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Recent user activity and management tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">24</div>
                        <div className="text-sm text-muted-foreground">New Today</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-success">87%</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Users className="w-4 h-4 mr-2" />
                        View All Users
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Shield className="w-4 h-4 mr-2" />
                        Manage Permissions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="champions" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Green Champions</CardTitle>
                <CardDescription>Community champions and their performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {champions.map((champion) => (
                    <div key={champion.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{champion.name}</h4>
                        <p className="text-sm text-muted-foreground">{champion.area}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-sm font-medium">{champion.reportsVerified} reports</div>
                            <div className="text-xs text-muted-foreground">Rating: {champion.rating}/5</div>
                          </div>
                          <Badge variant={champion.status === 'active' ? 'default' : 'secondary'}>
                            {champion.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Core system settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    General Settings
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    User Permissions
                  </Button>
                  <Button className="w-full" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Config
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Database and data management tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Export Data
                  </Button>
                  <Button className="w-full" variant="outline">
                    Database Backup
                  </Button>
                  <Button className="w-full" variant="outline">
                    Clear Cache
                  </Button>
                  <Button className="w-full" variant="destructive">
                    System Maintenance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;