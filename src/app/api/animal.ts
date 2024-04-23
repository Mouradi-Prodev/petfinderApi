export interface Animal {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: {
    primary: string;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  age: string;
  gender: string;
  size: string;
  coat: string;
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed: boolean;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: {
    children: boolean | null;
    dogs: boolean | null;
    cats: boolean | null;
  };
  tags: string[];
  name: string;
  description: string;
  organization_animal_id: string | null;
  photos: string[];
  primary_photo_cropped: {};
  videos: string[];
  status: string;
  status_changed_at: string;
  published_at: string;
  distance: number | null;
  contact: {
    email: string;
    phone: string;
    address: {
      address1: string | null;
      address2: string | null;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
  };
  _links: {
    self: {
      href: string;
    };
    type: {
      href: string;
    };
    organization: {
      href: string;
    };
  };
}
export interface Pagination {
  count_per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
  _links: {
    
  };
}
export interface AnimalResponse {
  animals: Animal[];
  pagination: Pagination;
}

export interface Types {
  name: string;
  coats:[];
  colors:[];
  genders:[];
  _links:{
    breeds:{
      href: string;
    }
  }
}
export interface Breed {
  name: string;
}