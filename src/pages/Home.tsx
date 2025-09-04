import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Recycle, Award, MapPin, ShoppingBag, Users, Leaf, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Recycle className="w-8 h-8" />,
      title: 'Smart Waste Management',
      description: 'Report waste issues, track collection schedules, and monitor your area\'s cleanliness status in real-time.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Interactive Training',
      description: 'Learn proper waste segregation and earn certificates through engaging video lessons and quizzes.'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Facility Locator',
      description: 'Find nearby recycling centers, waste treatment facilities, and eco-friendly disposal points.'
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Eco Shop',
      description: 'Purchase sustainable products and redeem your environmental contribution points for rewards.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Engagement',
      description: 'Join local Green Champions and participate in community-driven environmental initiatives.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Impact Tracking',
      description: 'Monitor your environmental impact and see how your actions contribute to a cleaner city.'
    }
  ];

  const benefits = [
    'Real-time waste collection tracking',
    'Incentive points for proper waste management',
    'Community leaderboards and challenges',
    'Professional training and certification',
    'Direct connection with municipal services',
    'Environmental impact analytics'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
              Transform Your City into a
              <span className="gradient-text block mt-2">Green Paradise</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of citizens in creating cleaner, more sustainable communities through smart waste management, education, and collective action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth/register">
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for 
              <span className="gradient-text"> Smart Waste Management</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform combines technology, education, and community engagement to make waste management effortless and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const demoRoutes = [
                '/demo/report',
                '/demo/training', 
                '/demo/map',
                '/demo/shop',
                '/demo/dashboard',
                '/demo/dashboard'
              ];
              
              return (
                <Link key={index} to={demoRoutes[index]} className="block">
                  <Card className="card-elevated hover:shadow-glow transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          Try Demo <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose 
                <span className="gradient-text"> GreenRoute?</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-elevated text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Active Users</div>
              </Card>
              <Card className="card-elevated text-center p-6">
                <div className="text-3xl font-bold text-secondary mb-2">1M+</div>
                <div className="text-muted-foreground">Waste Reports</div>
              </Card>
              <Card className="card-elevated text-center p-6">
                <div className="text-3xl font-bold text-accent mb-2">95%</div>
                <div className="text-muted-foreground">User Satisfaction</div>
              </Card>
              <Card className="card-elevated text-center p-6">
                <div className="text-3xl font-bold text-success mb-2">200+</div>
                <div className="text-muted-foreground">Cities Covered</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Join our community of environmental champions and start your journey towards a cleaner, greener future today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glass" size="xl" asChild>
                <Link to="/auth/register">
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-white/30 text-white hover:bg-white/10">
                <Link to="/training">
                  Start Training
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;