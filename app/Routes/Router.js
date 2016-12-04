import {
  createRouter,
} from '@exponent/ex-navigation';

import QuotesBrowser from '../Modules/QuotesBrowser/QuotesBrowser';
import Likes from '../Modules/Likes/Likes';
import SelectCategories from '../Modules/SelectCategories/Categories'
import RootNavigation from '../Modules/Navigation/RootNavigation';

export default createRouter(() => ({
  quotesBrowser: () => QuotesBrowser,
  likes: () => Likes,
  selectCategories: () => SelectCategories,
  rootNavigation: () => RootNavigation,
}));
