
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Settings, CreditCard, Bookmark, LogOut, Lock, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  
  // Mock user data
  const userData = {
    name: "Raj Sharma",
    email: "raj.sharma@example.com",
    phone: "+91 9876543210",
    address: "123 Lake View Apartments, Park Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    bio: "Travel enthusiast and foodie. Always looking for the next adventure in India's hidden gems."
  };
  
  // Mock booking data
  const bookings = [
    {
      id: "B12345",
      propertyName: "Lakeside Villa",
      location: "Udaipur, Rajasthan",
      checkIn: "2025-05-12",
      checkOut: "2025-05-15",
      amount: 15600,
      status: "Confirmed",
      imageUrl: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFqYXN0aGFufGVufDB8fDB8fHww",
    },
    {
      id: "B12346",
      propertyName: "Mountain Retreat",
      location: "Manali, Himachal Pradesh",
      checkIn: "2025-06-20",
      checkOut: "2025-06-25",
      amount: 22800,
      status: "Upcoming",
      imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "B12347",
      propertyName: "Beachfront Cottage",
      location: "Goa",
      checkIn: "2025-04-05",
      checkOut: "2025-04-10",
      amount: 18500,
      status: "Completed",
      imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hfGVufDB8fDB8fHww",
    }
  ];
  
  // Mock favorites data
  const favorites = [
    {
      id: "P12345",
      name: "Wooden Houseboat",
      location: "Alleppey, Kerala",
      price: 4800,
      imageUrl: "https://images.unsplash.com/photo-1623809884906-95346b4462de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2Vib2F0fGVufDB8fDB8fHww",
    },
    {
      id: "P12346",
      name: "Heritage Haveli",
      location: "Jaipur, Rajasthan",
      price: 5600,
      imageUrl: "https://images.unsplash.com/photo-1599661046827-9a64bd16bc35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFpcHVyfGVufDB8fDB8fHww",
    },
    {
      id: "P12347",
      name: "Tea Estate Bungalow",
      location: "Darjeeling, West Bengal",
      price: 4200,
      imageUrl: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyamVlbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const handleSaveProfile = () => {
    // Simulate saving profile
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };
  
  const handleLogout = () => {
    // Simulate logout
    toast.info("Logged out successfully");
    // In a real app, you would clear the auth state and redirect
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden">
            {/* Header section with user info */}
            <div className="relative bg-gradient-to-r from-violet-500 to-purple-500 text-white py-12 px-6">
              <div className="absolute top-0 right-0 p-4">
                <Button variant="ghost" onClick={handleLogout} className="text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-violet-500" />
                </div>
                
                <div>
                  <h1 className="text-2xl font-playfair font-semibold">{userData.name}</h1>
                  <p className="text-white/80 mb-2">{userData.email}</p>
                  <p className="text-white/80 text-sm">{userData.city}, {userData.state}</p>
                </div>
              </div>
            </div>
            
            {/* Tabs section */}
            <Tabs defaultValue="profile" className="p-6">
              <TabsList className="mb-6">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="bookings" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  My Bookings
                </TabsTrigger>
                <TabsTrigger value="favorites" className="gap-2">
                  <Bookmark className="w-4 h-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              {/* Profile tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-playfair font-medium">Personal Information</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
                
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={userData.email} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={userData.phone} />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={userData.address} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue={userData.city} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue={userData.state} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input id="pincode" defaultValue={userData.pincode} />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={userData.bio} rows={4} />
                    </div>
                    
                    <div className="md:col-span-2 flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{userData.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{userData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{userData.address}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{userData.city}, {userData.state}, {userData.pincode}</p>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Bio</p>
                      <p>{userData.bio}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Bookings tab */}
              <TabsContent value="bookings">
                <h2 className="text-xl font-playfair font-medium mb-6">My Bookings</h2>
                
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium mb-1">No bookings yet</h3>
                      <p className="text-muted-foreground mb-4">Start exploring places to book your next stay</p>
                      <Button asChild>
                        <Link to="/places">Browse Places</Link>
                      </Button>
                    </div>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking.id} className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="sm:w-1/4 aspect-[3/2] rounded-lg overflow-hidden">
                            <img 
                              src={booking.imageUrl} 
                              alt={booking.propertyName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                              <div>
                                <h3 className="font-playfair text-lg font-medium">{booking.propertyName}</h3>
                                <p className="text-sm text-muted-foreground">{booking.location}</p>
                              </div>
                              
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 sm:mt-0
                                ${booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : 
                                  booking.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 
                                  'bg-gray-100 text-gray-700'}
                              `}>
                                {booking.status}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                              <div>
                                <p className="text-xs text-muted-foreground">Booking ID</p>
                                <p className="text-sm font-medium">{booking.id}</p>
                              </div>
                              
                              <div>
                                <p className="text-xs text-muted-foreground">Stay Dates</p>
                                <p className="text-sm font-medium">
                                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                                </p>
                              </div>
                              
                              <div>
                                <p className="text-xs text-muted-foreground">Amount Paid</p>
                                <p className="text-sm font-medium">₹{booking.amount.toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <Button variant="outline" size="sm">View Details</Button>
                              {booking.status !== 'Completed' && (
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                  Cancel Booking
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              
              {/* Favorites tab */}
              <TabsContent value="favorites">
                <h2 className="text-xl font-playfair font-medium mb-6">Saved Places</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.length === 0 ? (
                    <div className="sm:col-span-2 lg:col-span-3 text-center py-8 bg-gray-50 rounded-xl">
                      <Bookmark className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium mb-1">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">Save places you like for future reference</p>
                      <Button asChild>
                        <Link to="/places">Browse Places</Link>
                      </Button>
                    </div>
                  ) : (
                    favorites.map((favorite) => (
                      <div key={favorite.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all">
                        <div className="aspect-[3/2] overflow-hidden">
                          <img 
                            src={favorite.imageUrl} 
                            alt={favorite.name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-playfair text-lg font-medium mb-1">{favorite.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{favorite.location}</p>
                          
                          <div className="flex justify-between items-center">
                            <p className="font-medium">
                              <span className="text-accent">₹{favorite.price}</span> <span className="text-sm text-muted-foreground">/ night</span>
                            </p>
                            
                            <Button variant="outline" size="sm">View Place</Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              
              {/* Settings tab */}
              <TabsContent value="settings">
                <h2 className="text-xl font-playfair font-medium mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Password section */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-5 h-5 text-accent" />
                      <h3 className="font-medium">Password & Security</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={() => toast.success("Password updated successfully")}>Update Password</Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment methods section */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-5 h-5 text-accent" />
                      <h3 className="font-medium">Payment Methods</h3>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 bg-white mb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-accent/10 rounded-md p-2">
                            <CreditCard className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" onClick={() => toast.info("Payment method functionality coming soon")}>
                      Add Payment Method
                    </Button>
                  </div>
                  
                  {/* Notifications section */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="w-5 h-5 text-accent" />
                      <h3 className="font-medium">Notification Settings</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
                        </div>
                        <input type="checkbox" className="toggle toggle-accent" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive alerts about your bookings</p>
                        </div>
                        <input type="checkbox" className="toggle toggle-accent" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Communications</p>
                          <p className="text-sm text-muted-foreground">Receive offers and promotions</p>
                        </div>
                        <input type="checkbox" className="toggle toggle-accent" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
