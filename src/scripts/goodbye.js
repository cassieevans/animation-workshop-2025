import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

const goodbye = () => {
	let wrapper = document.querySelector('.Goodbye');
	let text = document.querySelector('.Goodbye__text');
	let split = SplitText.create('.Goodbye__text', { type: 'chars, words' });

	const scrollTween = gsap.to(text, {
		xPercent: -100,
		ease: 'none',
		scrollTrigger: {
			trigger: wrapper,
			pin: true,
			end: '+=5000px',
			scrub: true
		}
	});

	split.chars.forEach((char) => {
		gsap.from(char, {
			scale: 0,
			scrollTrigger: {
				trigger: char,
				containerAnimation: scrollTween,
				start: 'left 90%',
				end: 'left 20%',
				scrub: 1
			}
		});
	});
};

export default goodbye;
