
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
    title: "Modern Minimalist Apartment",
    description: "A beautifully designed minimalist apartment with stunning city views.",
    location: "San Francisco, California",
    price: 199,
    rating: 4.92,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1560&q=80",
    isNew: true,
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Workspace", "Pool"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  {
    id: "2",
    title: "Luxury Penthouse with Ocean Views",
    description: "Enjoy panoramic ocean views in this upscale penthouse with designer furnishings.",
    location: "Malibu, California",
    price: 599,
    rating: 4.96,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1575&q=80",
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Workspace", "Pool", "Gym", "Parking"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2
  },
  {
    id: "3",
    title: "Secluded Mountain Cabin",
    description: "Escape to this peaceful cabin surrounded by forests and mountain views.",
    location: "Aspen, Colorado",
    price: 299,
    rating: 4.88,
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80",
    isNew: true,
    amenities: ["Wifi", "Kitchen", "Fireplace", "Mountain View"],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2
  },
  {
    id: "4",
    title: "Bright Urban Loft",
    description: "A beautifully renovated loft space with high ceilings and modern amenities.",
    location: "New York, New York",
    price: 249,
    rating: 4.91,
    imageUrl: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Workspace", "Elevator"],
    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1
  },
  {
    id: "5",
    title: "Beachfront Villa",
    description: "Step directly onto the sand from this stunning modern beachfront property.",
    location: "Miami Beach, Florida",
    price: 429,
    rating: 4.95,
    imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    isNew: true,
    isFeatured: true,
    amenities: ["Wifi", "Kitchen", "Pool", "Beach Access", "AC"],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 3
  },
  {
    id: "6",
    title: "Historic Townhouse",
    description: "Experience the charm of this beautifully preserved historic townhouse.",
    location: "Boston, Massachusetts",
    price: 279,
    rating: 4.87,
    imageUrl: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    amenities: ["Wifi", "Kitchen", "Workspace", "Heating"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1.5
  }
];

export const featuredProperties = properties.filter(property => property.isFeatured);
export const newProperties = properties.filter(property => property.isNew);
