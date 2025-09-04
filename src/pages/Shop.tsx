import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Award, Gift } from 'lucide-react';

const Shop: React.FC = () => {
  const [userPoints] = useState(450);
  const [cart, setCart] = useState<string[]>([]);

  const products = [
    {
      id: '1',
      name: 'Eco-Friendly Water Bottle',
      description: 'Reusable stainless steel water bottle with eco-friendly coating',
      points: 100,
      category: 'Lifestyle',
      image: '🌿',
      inStock: true,
    },
    {
      id: '2',
      name: 'Organic Cotton Tote Bag',
      description: 'Sustainable shopping bag made from 100% organic cotton',
      points: 75,
      category: 'Accessories',
      image: '👜',
      inStock: true,
    },
    {
      id: '3',
      name: 'Solar Power Bank',
      description: 'Portable charger powered by solar energy',
      points: 200,
      category: 'Electronics',
      image: '🔋',
      inStock: true,
    },
    {
      id: '4',
      name: 'Bamboo Cutlery Set',
      description: 'Complete cutlery set made from sustainable bamboo',
      points: 60,
      category: 'Lifestyle',
      image: '🍴',
      inStock: false,
    },
    {
      id: '5',
      name: 'Tree Planting Certificate',
      description: 'Plant a tree in your name - includes digital certificate',
      points: 150,
      category: 'Environmental',
      image: '🌱',
      inStock: true,
    },
    {
      id: '6',
      name: 'Composting Kit',
      description: 'Complete home composting starter kit with guide',
      points: 180,
      category: 'Gardening',
      image: '🌱',
      inStock: true,
    },
  ];

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(id => id !== productId));
  };

  const categories = ['All', 'Lifestyle', 'Electronics', 'Accessories', 'Environmental', 'Gardening'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Eco Shop</h1>
          <p className="text-muted-foreground">Redeem your environmental points for sustainable products</p>
        </div>

        {/* Points Balance */}
        <Card className="card-elevated mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">{userPoints} Points</h2>
                  <p className="text-muted-foreground">Available for redemption</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Gift className="w-4 h-4 mr-2" />
                  Earn More Points
                </Button>
                {cart.length > 0 && (
                  <Button variant="default">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart ({cart.length})
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="card-elevated hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">{product.image}</div>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{product.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {product.description}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {product.inStock ? (
                      <Badge variant="default" className="bg-success">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  
                  {product.inStock ? (
                    <div className="flex gap-2">
                      {cart.includes(product.id) ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => addToCart(product.id)}
                          disabled={userPoints < product.points}
                        >
                          {userPoints < product.points ? 'Not Enough Points' : 'Add to Cart'}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      Notify When Available
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Earn Points */}
        <Card className="card-elevated mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              How to Earn More Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Complete Training</h3>
                <p className="text-sm text-muted-foreground">Earn 50-100 points per completed training module</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-medium mb-2">Report Issues</h3>
                <p className="text-sm text-muted-foreground">Get 25 points for each verified waste report</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-medium mb-2">Community Actions</h3>
                <p className="text-sm text-muted-foreground">Participate in community cleanups and events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shop;