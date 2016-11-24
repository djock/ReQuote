import {
  createRouter,
} from '@exponent/ex-navigation';

import Cards from '../components/views/Cards';
import Likes from '../components/views/Likes';
import Test from '../components/views/Test';
import RootNavigation from '../components/RootNavigation';

export default createRouter(() => ({
  cards: () => Cards,
  likes: () => Likes,
  test: () => Test,
  rootNavigation: () => RootNavigation,
}));
