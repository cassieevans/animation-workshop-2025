//accessibleweb.dev/navigation
// GSAP for the main animation
import { gsap } from 'gsap';
// SplitText if you'd like to do text animation
import { SplitText } from 'gsap/SplitText';
// if you want to use any other plugins, you can grab the imports here
//gsap.com/docs/v3/Installation

// remember to register them if you use a plugin!
gsap.registerPlugin(SplitText);

const header = () => {
	let exitTime = 0;

	let anim = gsap
		.timeline({
			paused: true,
			defaults: {
				ease: 'expo.inOut',
				duration: 0.8
			}
		})
		.to('.Header__menu-icon', {
			rotation: 220
		})
		.fromTo(
			'.Menu__list',
			{
				xPercent: 0,
				autoAlpha: 0
			},
			{
				xPercent: -100,
				stagger: 0.05,
				autoAlpha: 1
			},
			0
		);
	let wordSplits = gsap.utils.toArray('[data-anim="split-word"]');

	wordSplits.forEach((word, i) => {
		let split = SplitText.create(word, {
			type: 'chars, words',
			mask: 'words'
		});
		anim.from(
			split.chars,
			{
				y: 100,
				autoAlpha: 0,
				stagger: 0.01
			},
			0.1
		);
	});

	anim.addPause();
	exitTime = anim.duration(); // assign the exit time

	anim
		.to('.Menu__list', {
			y: () => window.innerHeight * 2,
			rotation: 'random(-30, 30)',
			ease: 'expo.in',
			stagger: {
				from: 'end',
				each: 0.1
			}
		})
		.to('.Header__menu-icon', { rotation: 0, ease: 'expo.inOut' }, '<');

	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	if (prefersReducedMotion) {
		anim.timeScale(100);
	} else {
		anim.timeScale(1);
	}

	function openNavigation() {
		navButton.setAttribute('aria-expanded', 'true');
		if (anim.time() < exitTime) {
			anim.play();
			console.log('OPEN TOGGLE');
		} else if (anim.time() === anim.totalDuration()) {
			anim.restart();
		} else {
			anim.reverse();
			console.log('REVERSE UP FROM BOTTOM');
		}
	}

	function closeNavigation() {
		navButton.setAttribute('aria-expanded', 'false');
		if (anim.time() < exitTime) {
			anim.reverse();
			console.log('CLOSE TOGGLE');
		} else {
			anim.seek(exitTime).play();
			console.log('CLOSE FALL');
		}
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

export default header;
