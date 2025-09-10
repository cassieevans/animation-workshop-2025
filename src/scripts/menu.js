//accessibleweb.dev/navigation
// GSAP for the main animation
import { gsap } from 'gsap';
// SplitText if you'd like to do text animation
import { SplitText } from 'gsap/SplitText';
// if you want to use any other plugins, you can grab the imports here
//gsap.com/docs/v3/Installation

// remember to register them if you use a plugin!
// gsap.registerPlugin(SplitText);

const menu = () => {
	let anim = gsap.to('.Menu', {
		xPercent: -100,
		autoAlpha: 1,
		paused: true
	});

	function openNavigation() {
		navButton.setAttribute('aria-expanded', 'true');
		anim.play();
	}

	function closeNavigation() {
		navButton.setAttribute('aria-expanded', 'false');
		anim.reverse();
	}

	// No animation stuff down here. Just some nice accessible event handling bits that call the close and enter functions. 💚
	const navButton = document.getElementById('menu');
	const disclosure = document.getElementById('nav');
	const listItems = disclosure.querySelectorAll('a');
	function toggleNavigation() {
		const open = navButton.getAttribute('aria-expanded');
		open === 'false' ? openNavigation() : closeNavigation();
	}
	// This function closes an open disclosure if a user tabs away from the last anchor element in the list. It is reliant on the ul container having a class to check whether the relatedTarget is within the disclosure. If not, it will close.
	function handleBlur() {
		const navList = event.currentTarget.closest('.primaryNavList');
		if (!event.relatedTarget || !navList.contains(event.relatedTarget)) {
			closeNavigation();
		}
	}
	navButton.addEventListener('click', toggleNavigation);
	// add event to the last item in the nav list to trigger the disclosure to close if the user tabs out of the disclosure
	listItems[listItems.length - 1].addEventListener('blur', handleBlur);
	// Close the disclosure if a user presses the escape key
	window.addEventListener('keyup', (e) => {
		if (e.key === 'Escape') {
			navButton.focus();
			closeNavigation();
		}
	});
};

export default menu;
