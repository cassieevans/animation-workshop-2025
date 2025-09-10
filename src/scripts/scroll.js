import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scroll = () => {
	const slideWrappers = gsap.utils.toArray('.Content__wrapper');
	const slides = gsap.utils.toArray('.Content__slide');

	slideWrappers.forEach((wrapper, i) => {
		const card = slides[i];

		gsap.to(card, {
			scrollTrigger: {
				trigger: wrapper,
				start: 'top top',
				end: 'bottom bottom',
				endTrigger: slides[slides.length - 1],
				scrub: 1,
				pin: wrapper,
				pinSpacing: false,
				markers: {
					indent: 100 * i,
					fontSize: '14px'
				},
				id: i + 1
			}
		});
	});
};

export default scroll;
