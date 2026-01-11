console.log('Main JS initializing...');
// ------- Osmo [https://osmo.supply/] ------- //

function initWillemLoadingAnimation() {
	const container = document.querySelector('.willem-header')
	if (!container) return

	const loadingLetter = container.querySelectorAll('.willem__letter')
	const box = container.querySelectorAll('.willem-loader__box')
	const growingImage = container.querySelectorAll('.willem__growing-image')
	const headingStart = container.querySelectorAll('.willem__h1-start')
	const headingEnd = container.querySelectorAll('.willem__h1-end')
	const coverImageExtra = container.querySelectorAll(
		'.willem__cover-image-extra'
	)
	const headerLetter = container.querySelectorAll('.willem__letter-white')
	const navLinks = container.querySelectorAll('.willen-nav a, .osmo-credits__p')

	/* GSAP Timeline */
	const tl = gsap.timeline({
		defaults: {
			ease: 'expo.inOut',
		},
		onStart: () => {
			container.classList.remove('is--hidden')
		},
	})

	/* Start of Timeline */
	// 1. Name comes in (y-axis slide up)
	if (loadingLetter.length) {
		tl.from(loadingLetter, {
			yPercent: 100,
			stagger: 0.05,
			duration: 1.25,
		})
	}

	// 2. Split the name and show the image box in the middle
	if (box.length) {
		tl.to(
			box,
			{
				width: '1.5em', // Adjust width to match the split feel
				duration: 1.25,
			},
			'>' // Start after name comes in
		)

		tl.to(
			growingImage,
			{
				width: '100%',
				duration: 1.25,
			},
			'<' // Parallel with box width expansion
		)

		if (headingStart.length) {
			tl.to(
				headingStart,
				{
					x: '-0.1em',
					duration: 1.25,
				},
				'<'
			)
		}

		if (headingEnd.length) {
			tl.to(
				headingEnd,
				{
					x: '0.1em',
					duration: 1.25,
				},
				'<'
			)
		}
	}

	// 3. Cycle through images in the middle
	if (coverImageExtra.length) {
		tl.to(
			coverImageExtra,
			{
				opacity: 0,
				duration: 0.1,
				ease: 'none',
				stagger: 0.6, // Delay between each image change
			},
			'+=0.2'
		)
	}

	// 4. Zoom the last image to fill the screen (The Portfolio image)
	if (growingImage.length) {
		tl.to(
			growingImage,
			{
				width: '100vw',
				height: '100dvh',
				duration: 1.5,
				ease: 'expo.inOut'
			},
			'+=0.5'
		)

		tl.to(
			box,
			{
				width: '100vw',
				duration: 1.5,
				ease: 'expo.inOut'
			},
			'<'
		)

		// Hide letters while zooming
		tl.to([headingStart, headingEnd], {
			autoAlpha: 0,
			duration: 0.5
		}, '<')
	}

	// 5. Final reveal: Fade out the loader to show the actual site
	console.log('Loader: Sequence finished, starting fade-out');
	tl.to(container, {
		opacity: 0,
		duration: 1.5,
		ease: 'power2.inOut',
		onStart: () => {
			console.log('Loader: Fade-out started');
		},
		onComplete: () => {
			console.log('Loader: Fade-out complete');
			container.style.display = 'none';
			document.body.style.overflow = 'auto';
			document.body.style.height = 'auto';
		}
	})

	if (headerLetter.length) {
		tl.from(
			headerLetter,
			{
				yPercent: 100,
				duration: 1.25,
				ease: 'expo.out',
				stagger: 0.025,
			},
			'-=0.5'
		)
	}

	if (navLinks.length) {
		tl.from(
			navLinks,
			{
				yPercent: 100,
				duration: 1.25,
				ease: 'expo.out',
				stagger: 0.1,
			},
			'<'
		)
	}
}

// Initialize Willem Loading Animation
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		console.log('Loader: DOMContentLoaded fired');
		initWillemLoadingAnimation();
	});
} else {
	console.log('Loader: Document already loaded, initializing immediately');
	initWillemLoadingAnimation();
}

// Safety fallback: If loader is still visible after 10 seconds, hide it anyway
setTimeout(() => {
	const container = document.querySelector('.willem-header');
	if (container && window.getComputedStyle(container).display !== 'none') {
		console.warn('Loader fallback: Forcing hide after timeout');
		gsap.to(container, { autoAlpha: 0, duration: 1, onComplete: () => container.style.display = 'none' });
		document.body.style.overflow = 'auto';
		document.body.style.height = 'auto';
	}
}, 10000);
