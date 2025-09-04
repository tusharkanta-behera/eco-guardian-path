import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Award, MapPin, ShoppingBag, FileText, TrendingUp, Recycle, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in real app, would come from API
  const stats = {
    reportsSubmitted: 12,
    trainingProgress: 75,
    pointsEarned: 450,
    impactScore: 8.5,
    completedTrainings: 3,
    totalTrainings: 4,
  };

  const recentActivities = [
    { id: 1, type: 'report', title: 'Waste overflow reported', location: 'Park Street', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'training', title: 'Waste Segregation completed', progress: 100, time: '1 day ago', status: 'completed' },
    { id: 3, type: 'reward', title: 'Points redeemed', amount: 100, time: '3 days ago', status: 'completed' },
    { id: 4, type: 'report', title: 'Illegal dumping reported', location: 'Main Road', time: '5 days ago', status: 'resolved' },
  ];

  const quickActions = [
    { icon: <FileText className="w-5 h-5" />, title: 'Report Issue', description: 'Report waste-related problems', href: '/report', color: 'bg-primary' },
    { icon: <MapPin className="w-5 h-5" />, title: 'Find Facilities', description: 'Locate recycling centers', href: '/map', color: 'bg-secondary' },
    { icon: <Award className="w-5 h-5" />, title: 'Take Training', description: 'Learn and earn certificates', href: '/training', color: 'bg-success' },
    { icon: <ShoppingBag className="w-5 h-5" />, title: 'Eco Shop', description: 'Redeem points for rewards', href: '/shop', color: 'bg-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Here's your environmental impact dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reports Submitted</p>
                  <p className="text-3xl font-bold text-primary">{stats.reportsSubmitted}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Points Earned</p>
                  <p className="text-3xl font-bold text-success">{stats.pointsEarned}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Training Progress</p>
                  <p className="text-3xl font-bold text-secondary">{stats.trainingProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Impact Score</p>
                  <p className="text-3xl font-bold text-accent">{stats.impactScore}/10</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="card-elevated mb-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.href}>
                      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                              <div className="text-white">
                                {action.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">{action.title}</h4>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest environmental actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'report' ? 'bg-primary/10' : 
                          activity.type === 'training' ? 'bg-success/10' : 'bg-accent/10'
                        }`}>
                          {activity.type === 'report' && <FileText className="w-4 h-4 text-primary" />}
                          {activity.type === 'training' && <Award className="w-4 h-4 text-success" />}
                          {activity.type === 'reward' && <Star className="w-4 h-4 text-accent" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.location && `${activity.location} • `}{activity.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        activity.status === 'completed' ? 'default' :
                        activity.status === 'resolved' ? 'secondary' : 'outline'
                      }>
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
            {/* Training Progress */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Training Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{stats.trainingProgress}%</span>
                    </div>
                    <Progress value={stats.trainingProgress} className="h-2" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats.completedTrainings} of {stats.totalTrainings} modules completed
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/training">Continue Training</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="w-5 h-5" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stats.impactScore}</div>
                    <div className="text-sm text-muted-foreground">Impact Score</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>CO₂ Saved</span>
                      <span className="font-medium text-success">12.5 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waste Diverted</span>
                      <span className="font-medium text-secondary">45.2 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Rank</span>
                      <span className="font-medium text-accent">#23</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium mb-1">Local Champions</div>
                    <div className="text-muted-foreground">24 active in your area</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium mb-1">This Month's Goal</div>
                    <div className="text-muted-foreground">500 reports submitted</div>
                    <Progress value={68} className="h-1 mt-2" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;