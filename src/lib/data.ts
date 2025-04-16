
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isFeatured?: boolean;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  region?: string; // north, northeast, east, west, south, central
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Hillside Cottage with Valley View",
    description: "Enjoy panoramic views of the Khasi Hills from this charming cottage nestled in the clouds.",
    location: "Shillong, Meghalaya",
    price: 4990,
    rating: 4.92,
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isNew: true,
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Mountain View", "Fireplace"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    region: "northeast"
  },
  {
    id: "2",
    title: "Riverside Eco Retreat",
    description: "Sustainable bamboo cottage set beside the crystal clear waters of the Umngot River.",
    location: "Dawki, Meghalaya",
    price: 3890,
    rating: 4.96,
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isFeatured: true,
    amenities: ["Wifi", "Riverfront", "Eco-friendly", "Breakfast"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    region: "northeast"
  },
  {
    id: "3",
    title: "Tea Estate Bungalow",
    description: "Colonial-era heritage bungalow surrounded by lush tea plantations with stunning sunrise views.",
    location: "Dibrugarh, Assam",
    price: 5990,
    rating: 4.88,
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isNew: true,
    amenities: ["Wifi", "Kitchen", "Garden", "Tea Tour"],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    region: "northeast"
  },
  {
    id: "4",
    title: "Misty Mountain Lodge",
    description: "Traditional wooden homestay with sweeping views of the Eastern Himalayas and Buddhist monasteries.",
    location: "Tawang, Arunachal Pradesh",
    price: 4590,
    rating: 4.91,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Mountain View", "Cultural Tours"],
    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    region: "northeast"
  },
  {
    id: "5",
    title: "Floating Lake Cottage",
    description: "Unique stilt house on the famous Loktak Lake with views of the floating phumdis (islands).",
    location: "Moirang, Manipur",
    price: 3590,
    rating: 4.95,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isNew: true,
    isFeatured: true,
    amenities: ["Lake View", "Fishing", "Boat Tour", "Local Cuisine"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    region: "northeast"
  },
  {
    id: "6",
    title: "Heritage Tribal Longhouse",
    description: "Experience authentic Naga tribal living in this modernized traditional longhouse with cultural activities.",
    location: "Kohima, Nagaland",
    price: 4290,
    rating: 4.87,
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    amenities: ["Cultural Experience", "Home Cooking", "Guided Treks", "Bonfire"],
    maxGuests: 8,
    bedrooms: 3,
    beds: 6,
    baths: 2,
    region: "northeast"
  },
  {
    id: "7",
    title: "Beachfront Villa in Goa",
    description: "Luxurious villa with private access to Anjuna Beach, featuring Portuguese-inspired architecture.",
    location: "Anjuna, Goa",
    price: 12990,
    rating: 4.93,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isFeatured: true,
    amenities: ["Beach Access", "Swimming Pool", "Air Conditioning", "Chef Service", "beaches", "Beachfront"],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 3,
    region: "west"
  },
  // Add more properties in Goa
  {
    id: "10",
    title: "Cozy Beach Hut in South Goa",
    description: "Simple but charming beach hut just steps from the tranquil shores of Palolem Beach.",
    location: "Palolem, Goa",
    price: 3990,
    rating: 4.85,
    imageUrl: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80",
    isNew: true,
    amenities: ["Beach Access", "Wifi", "Air Conditioning", "Breakfast", "beaches", "Beachfront"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    region: "west"
  },
  {
    id: "11",
    title: "Colonial Portuguese Villa",
    description: "Restored Portuguese mansion with antique furniture, large garden, and swimming pool.",
    location: "Fontainhas, Goa",
    price: 8990,
    rating: 4.92,
    imageUrl: "https://images.unsplash.com/photo-1542321993-8fc36217e26d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    amenities: ["Swimming Pool", "Garden", "Heritage", "heritage", "Air Conditioning", "Chef Available"],
    maxGuests: 10,
    bedrooms: 5,
    beds: 6,
    baths: 4,
    region: "west"
  },
  {
    id: "8",
    title: "Houseboat on Kerala Backwaters",
    description: "Traditional Kerala houseboat (kettuvallam) offering serene cruises through the picturesque backwaters.",
    location: "Alleppey, Kerala",
    price: 7990,
    rating: 4.97,
    imageUrl: "https://images.unsplash.com/photo-1623691774023-4d14f2bb7e69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isNew: true,
    isFeatured: true,
    amenities: ["Full Board Meals", "Guided Tour", "Sunset Deck", "Air Conditioning"],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3,
    region: "south"
  },
  {
    id: "9",
    title: "Heritage Haveli in Rajasthan",
    description: "Restored 19th-century haveli with intricate jaali work, traditional courtyard, and royal Rajasthani hospitality.",
    location: "Jaipur, Rajasthan",
    price: 8490,
    rating: 4.89,
    imageUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isFeatured: true,
    amenities: ["Heritage Architecture", "Rooftop Restaurant", "Cultural Shows", "City Tours"],
    maxGuests: 12,
    bedrooms: 6,
    beds: 8,
    baths: 6,
    region: "north"
  }
];

export const featuredProperties = properties.filter(property => property.isFeatured);
export const newProperties = properties.filter(property => property.isNew);

// Properties by region
export const northeastProperties = properties.filter(property => property.region === "northeast");
export const northProperties = properties.filter(property => property.region === "north");
export const southProperties = properties.filter(property => property.region === "south");
export const westProperties = properties.filter(property => property.region === "west");
export const eastProperties = properties.filter(property => property.region === "east");
export const centralProperties = properties.filter(property => property.region === "central");
