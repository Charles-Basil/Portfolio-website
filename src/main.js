import '../styles/modern-normalize.css';
import '../styles/style.css';
import 'toastify-js/src/toastify.css';
import '../styles/components/header.css';
import '../styles/components/hero.css';
import '../styles/components/about.css';
import '../styles/components/featured.css';
import '../styles/components/work.css';
import '../styles/components/contact.css';
import '../styles/components/footer.css';
import '../styles/components/mobile-nav.css';
import '../styles/utils.css';

import mobileNav from './utils/mobile-nav';
import darkMode from './utils/dark-mode';
import lazyLoading from './utils/lazy-loading';
import { initEmailJS } from './utils/email';
import { initContactForm } from './utils/contact-form';
import { initAnimations } from './utils/animations';
import initTilt from './utils/tilt';

mobileNav();
darkMode();
lazyLoading();
initEmailJS();
initContactForm();
initAnimations();
initTilt();