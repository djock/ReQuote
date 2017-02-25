import {
    createRouter,
} from '@exponent/ex-navigation';

import App from '../Modules/App/App';
import Likes from '../Modules/Likes/Likes';
import SelectCategories from '../Modules/SelectCategories/Categories'
import RootNavigation from '../Modules/Navigation/RootNavigation';

export default createRouter(() => ({
    app: () => App,
    likes: () => Likes,
    selectCategories: () => SelectCategories,
    rootNavigation: () => RootNavigation,
}));
