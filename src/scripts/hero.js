import { gsap } from 'gsap';

const prefersReducedMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)'
).matches;

const hero = () => {
	if (prefersReducedMotion) return;
	function playAnimation(shape) {
		// the timeline
		let tl = gsap.timeline();
		tl.from(shape, {
			opacity: 0,
			duration: 0.1
		})
			.from(
				shape,
				{
					scale: 0.8,
					ease: 'elastic.out(2,0.4)'
				},
				'<'
			)
			.to(
				shape,
				{
					y: '120vh',
					rotation: 'random(-60, 60)',
					ease: 'back.in(.4)',
					duration: 1
				},
				0
			);
	}

	/* --------------------------------
  
  The other stuff...
  
  ------------------------------------*/
	let images = gsap.utils.toArray('.Hero__image');
	let gap = 200; // if you're nosy though, this number spaces the images out
	let index = 0;
	let wrapper = gsap.utils.wrap(0, images.length);
	gsap.defaults({ duration: 1 });

	let mousePos = { x: 0, y: 0 };
	let lastMousePos = mousePos;
	let cachedMousePos = mousePos;

	window.addEventListener('mousemove', (e) => {
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
