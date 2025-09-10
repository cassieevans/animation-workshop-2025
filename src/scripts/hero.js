import { gsap } from 'gsap';

const prefersReducedMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)'
).matches;

const hero = () => {
	function playAnimation(img) {
		// the timeline
		let tl = gsap.timeline();
		tl.from(img, {
			opacity: 0,
			duration: 0.1
		}).to(img, {
			opacity: 0,
			duration: 0.1
		});
	}

	/* --------------------------------
  
  The other stuff...
  
  ------------------------------------*/
	let images = gsap.utils.toArray('.Hero__image');
	let Hero = document.querySelector('.Hero');
	let gap = 200; // if you're nosy though, this number spaces the images out
	let index = 0;
	let wrapper = gsap.utils.wrap(0, images.length);
	gsap.defaults({ duration: 1 });

	let mousePos = { x: 0, y: 0 };
	let lastMousePos = mousePos;
	let cachedMousePos = mousePos;

	Hero.addEventListener('mousemove', (e) => {
		mousePos = {
			x: e.x,
			y: e.y
		};
	});

	gsap.ticker.add(ImageTrail);

	function ImageTrail() {
		let travelDistance = Math.hypot(
			lastMousePos.x - mousePos.x,
			lastMousePos.y - mousePos.y
		);

		// keep the previous mouse position for animation
		cachedMousePos.x = gsap.utils.interpolate(
			cachedMousePos.x || mousePos.x,
			mousePos.x,
			0.1
		);
		cachedMousePos.y = gsap.utils.interpolate(
			cachedMousePos.y || mousePos.y,
			mousePos.y,
			0.1
		);

		if (travelDistance > gap) {
			animateImage();
			lastMousePos = mousePos;
		}
	}

	function animateImage() {
		let wrappedIndex = wrapper(index);

		let img = images[wrappedIndex];
		gsap.killTweensOf(img);

		gsap.set(img, {
			clearProps: 'all'
		});

		gsap.set(img, {
			opacity: 1,
			left: mousePos.x,
			top: mousePos.y,
			xPercent: -50,
			yPercent: -50
		});

		playAnimation(img);

		index++;
	}
};

export default hero;
