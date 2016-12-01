import {
  createRouter,
} from '@exponent/ex-navigation';

import QuotesBrowser from '../Components/Views/QuotesBrowser';
import Likes from '../Components/Views/Likes/Likes';
import RootNavigation from '../Components/RootNavigation';

export default createRouter(() => ({
  quotesBrowser: () => QuotesBrowser,
  likes: () => Likes,
  rootNavigation: () => RootNavigation,
}));
