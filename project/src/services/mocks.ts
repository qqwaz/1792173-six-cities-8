import { Offer } from '../types/offer';
import { OfferServer } from '../types/offer';
import { Comment } from '../types/comment';
import { CommentServer } from '../types/comment';
import { AuthInfo } from '../types/auth-info';
import { AuthInfoServer } from '../types/auth-info';
import { OfferType } from '../const';
import { AuthData } from '../types/auth-data';

export const OffersMock: Offer[] = [
  {
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
    },
    previewImage: 'https://7.react.pages.academy/static/hotel/5.jpg',
    images: [
      'https://7.react.pages.academy/static/hotel/8.jpg',
      'https://7.react.pages.academy/static/hotel/9.jpg',
      'https://7.react.pages.academy/static/hotel/16.jpg',
      'https://7.react.pages.academy/static/hotel/2.jpg',
      'https://7.react.pages.academy/static/hotel/10.jpg',
      'https://7.react.pages.academy/static/hotel/7.jpg',
      'https://7.react.pages.academy/static/hotel/1.jpg',
    ],
    title: 'Nice, cozy, warm big bed apartment',
    isFavorite: true,
    isPremium: false,
    rating: 3.5,
    type: OfferType.Hotel,
    bedrooms: 4,
    maxAdults: 9,
    price: 181,
    goods: [
      'Dishwasher',
      'Air conditioning',
      'Washer',
    ],
    host: {
      id: 25,
      name: 'Angelina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    description:
      'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    location: {
      latitude: 53.558341000000006,
      longitude: 10.001654,
      zoom: 16,
    },
    id: 1,
  },
  {
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
    },
    previewImage: 'https://7.react.pages.academy/static/hotel/13.jpg',
    images: [
      'https://7.react.pages.academy/static/hotel/2.jpg',
      'https://7.react.pages.academy/static/hotel/7.jpg',
      'https://7.react.pages.academy/static/hotel/16.jpg',
    ],
    title: 'Waterfront with extraordinary view',
    isFavorite: false,
    isPremium: true,
    rating: 3.7,
    type: OfferType.Room,
    bedrooms: 1,
    maxAdults: 2,
    price: 153,
    goods: [
      'Laptop friendly workspace',
      'Air conditioning',
      'Washer',
      'Baby seat',
      'Breakfast',
    ],
    host: {
      id: 25,
      name: 'Angelina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    description:
      'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    location: {
      latitude: 53.570341000000006,
      longitude: 9.975654,
      zoom: 16,
    },
    id: 2,
  },
  {
    city: {
      name: 'Dusseldorf',
      location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
    },
    previewImage: 'https://7.react.pages.academy/static/hotel/2.jpg',
    images: [
      'https://7.react.pages.academy/static/hotel/7.jpg',
      'https://7.react.pages.academy/static/hotel/13.jpg',
      'https://7.react.pages.academy/static/hotel/8.jpg',
      'https://7.react.pages.academy/static/hotel/6.jpg',
    ],
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    isFavorite: false,
    isPremium: true,
    rating: 3.1,
    type: OfferType.Hotel,
    bedrooms: 1,
    maxAdults: 7,
    price: 354,
    goods: [
      'Towels',
      'Washer',
      'Breakfast',
      'Laptop friendly workspace',
      'Baby seat',
      'Air conditioning',
    ],
    host: {
      id: 25,
      name: 'Angelina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    description:
      'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    location: {
      latitude: 51.214402,
      longitude: 6.764314000000001,
      zoom: 16,
    },
    id: 3,
  }];

export const OffersServerMock: OfferServer[] = [
  {
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
    },
    'preview_image': 'https://7.react.pages.academy/static/hotel/5.jpg',
    images: [
      'https://7.react.pages.academy/static/hotel/8.jpg',
      'https://7.react.pages.academy/static/hotel/9.jpg',
      'https://7.react.pages.academy/static/hotel/16.jpg',
      'https://7.react.pages.academy/static/hotel/2.jpg',
      'https://7.react.pages.academy/static/hotel/10.jpg',
      'https://7.react.pages.academy/static/hotel/7.jpg',
      'https://7.react.pages.academy/static/hotel/1.jpg',
    ],
    title: 'Nice, cozy, warm big bed apartment',
    'is_favorite': true,
    'is_premium': false,
    rating: 3.5,
    type: 'hotel',
    bedrooms: 4,
    'max_adults': 9,
    price: 181,
    goods: [
      'Dishwasher',
      'Air conditioning',
      'Washer',
    ],
    host: {
      id: 25,
      name: 'Angelina',
      'is_pro': true,
      'avatar_url': 'img/avatar-angelina.jpg',
    },
    description:
        'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    location: {
      latitude: 53.558341000000006,
      longitude: 10.001654,
      zoom: 16,
    },
    id: 1,
  },
  {
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
    },
    'preview_image': 'https://7.react.pages.academy/static/hotel/13.jpg',
    images: [
      'https://7.react.pages.academy/static/hotel/2.jpg',
      'https://7.react.pages.academy/static/hotel/7.jpg',
      'https://7.react.pages.academy/static/hotel/16.jpg',
    ],
    title: 'Waterfront with extraordinary view',
    'is_favorite': false,
    'is_premium': true,
    rating: 3.7,
    type: 'room',
    bedrooms: 1,
    'max_adults': 2,
    price: 153,
    goods: [
      'Laptop friendly workspace',
      'Air conditioning',
      'Washer',
      'Baby seat',
      'Breakfast',
    ],
    host: {
      id: 25,
      name: 'Angelina',
      'is_pro': true,
      'avatar_url': 'img/avatar-angelina.jpg',
    },
    description:
        'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    location: {
      latitude: 53.570341000000006,
      longitude: 9.975654,
      zoom: 16,
    },
    id: 2,
  },
  {
    city: {
      name: 'Dusseldorf',
      location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
    },
    'preview_image': 'https://7.react.pages.academy/static/hotel/2.jpg',
    images: [
      'https://7.react.pages.academy/static/hotel/7.jpg',
      'https://7.react.pages.academy/static/hotel/13.jpg',
      'https://7.react.pages.academy/static/hotel/8.jpg',
      'https://7.react.pages.academy/static/hotel/6.jpg',
    ],
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    'is_favorite': false,
    'is_premium': true,
    rating: 3.1,
    type: 'hotel',
    bedrooms: 1,
    'max_adults': 7,
    price: 354,
    goods: [
      'Towels',
      'Washer',
      'Breakfast',
      'Laptop friendly workspace',
      'Baby seat',
      'Air conditioning',
    ],
    host: {
      id: 25,
      name: 'Angelina',
      'is_pro': true,
      'avatar_url': 'img/avatar-angelina.jpg',
    },
    description:
        'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    location: {
      latitude: 51.214402,
      longitude: 6.764314000000001,
      zoom: 16,
    },
    id: 3,
  }];

export const FavoritesMock = OffersMock.map(({isFavorite, ...rest}) => ({ isFavorite: true, ...rest }));

export const FavoritesServerMock = OffersServerMock.map(({'is_favorite': isFavorite, ...rest}) => ({ 'is_favorite': true, ...rest }));

export const CommentsMock: Comment[] = [
  {
    id: 1,
    user: {
      id: 15,
      isPro: false,
      name: 'Kendall',
      avatarUrl: 'https://7.react.pages.academy/static/avatar/6.jpg',
    },
    rating: 5,
    comment:
        'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: new Date('2021-10-03T13:29:26.175Z'),
  },
  {
    id: 2,
    user: {
      id: 15,
      isPro: false,
      name: 'Kendall',
      avatarUrl: 'https://7.react.pages.academy/static/avatar/6.jpg',
    },
    rating: 2,
    comment:
        'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: new Date('2021-09-26T13:29:26.175Z'),
  },
  {
    id: 3,
    user: {
      id: 17,
      isPro: false,
      name: 'Emely',
      avatarUrl: 'https://7.react.pages.academy/static/avatar/8.jpg',
    },
    rating: 3,
    comment:
        'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: new Date('2021-09-22T13:29:26.175Z'),
  },
  {
    id: 4,
    user: {
      id: 13,
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://7.react.pages.academy/static/avatar/4.jpg',
    },
    rating: 4,
    comment:
        'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: new Date('2021-09-22T13:29:26.175Z'),
  }];

export const CommentsServerMock: CommentServer[] = [
  {
    id: 1,
    user: {
      id: 15,
      'is_pro': false,
      name: 'Kendall',
      'avatar_url': 'https://7.react.pages.academy/static/avatar/6.jpg',
    },
    rating: 5,
    comment:
          'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2021-10-03T13:29:26.175Z',
  },
  {
    id: 2,
    user: {
      id: 15,
      'is_pro': false,
      name: 'Kendall',
      'avatar_url': 'https://7.react.pages.academy/static/avatar/6.jpg',
    },
    rating: 2,
    comment:
          'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2021-09-26T13:29:26.175Z',
  },
  {
    id: 3,
    user: {
      id: 17,
      'is_pro': false,
      name: 'Emely',
      'avatar_url': 'https://7.react.pages.academy/static/avatar/8.jpg',
    },
    rating: 3,
    comment:
          'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2021-09-22T13:29:26.175Z',
  },
  {
    id: 4,
    user: {
      id: 13,
      'is_pro': false,
      name: 'Zak',
      'avatar_url': 'https://7.react.pages.academy/static/avatar/4.jpg',
    },
    rating: 4,
    comment:
          'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2021-09-22T13:29:26.175Z',
  }];

export const AuthInfoMock: AuthInfo = {
  avatarUrl: 'img/1.png',
  email: 'Oliver.conner@gmail.com',
  id: 1,
  isPro: false,
  name: 'Oliver.conner',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};

export const AuthInfoServerMock: AuthInfoServer = {
  'avatar_url': 'img/1.png',
  email: 'Oliver.conner@gmail.com',
  id: 1,
  'is_pro': false,
  name: 'Oliver.conner',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};

export const AuthDataMock: AuthData = {
  login: 'Oliver.conner@gmail.com',
  password: '1q',
};

