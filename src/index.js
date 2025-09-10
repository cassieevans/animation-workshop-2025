import menu from './scripts/menu';
import hero from './scripts/hero';
import scroll from './scripts/scroll';
import goodbye from './scripts/goodbye';

menu();
hero();
scroll();

document.fonts.ready.then((fontFaceSet) => {
	goodbye();
});
