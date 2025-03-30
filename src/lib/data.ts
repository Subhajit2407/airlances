
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
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Hillside Cottage with Valley View",
    description: "Enjoy panoramic views of the Khasi Hills from this charming cottage nestled in the clouds.",
    location: "Shillong, Meghalaya",
    price: 149,
    rating: 4.92,
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isNew: true,
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Mountain View", "Fireplace"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  {
    id: "2",
    title: "Riverside Eco Retreat",
    description: "Sustainable bamboo cottage set beside the crystal clear waters of the Umngot River.",
    location: "Dawki, Meghalaya",
    price: 129,
    rating: 4.96,
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isFeatured: true,
    amenities: ["Wifi", "Riverfront", "Eco-friendly", "Breakfast"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1
  },
  {
    id: "3",
    title: "Tea Estate Bungalow",
    description: "Colonial-era heritage bungalow surrounded by lush tea plantations with stunning sunrise views.",
    location: "Dibrugarh, Assam",
    price: 199,
    rating: 4.88,
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isNew: true,
    amenities: ["Wifi", "Kitchen", "Garden", "Tea Tour"],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2
  },
  {
    id: "4",
    title: "Misty Mountain Lodge",
    description: "Traditional wooden homestay with sweeping views of the Eastern Himalayas and Buddhist monasteries.",
    location: "Tawang, Arunachal Pradesh",
    price: 169,
    rating: 4.91,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Mountain View", "Cultural Tours"],
    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1
  },
  {
    id: "5",
    title: "Floating Lake Cottage",
    description: "Unique stilt house on the famous Loktak Lake with views of the floating phumdis (islands).",
    location: "Moirang, Manipur",
    price: 159,
    rating: 4.95,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isNew: true,
    isFeatured: true,
    amenities: ["Lake View", "Fishing", "Boat Tour", "Local Cuisine"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  {
    id: "6",
    title: "Heritage Tribal Longhouse",
    description: "Experience authentic Naga tribal living in this modernized traditional longhouse with cultural activities.",
    location: "Kohima, Nagaland",
    price: 139,
    rating: 4.87,
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    amenities: ["Cultural Experience", "Home Cooking", "Guided Treks", "Bonfire"],
    maxGuests: 8,
    bedrooms: 3,
    beds: 6,
    baths: 2
  }
];

export const featuredProperties = properties.filter(property => property.isFeatured);
export const newProperties = properties.filter(property => property.isNew);
