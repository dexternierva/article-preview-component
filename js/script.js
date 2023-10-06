const shareBtn = document.querySelector(".share-btn");
const shareModule = document.querySelector(".card__share");

let breakPoint = 768;
let shareIsVisible = true;
let mm = gsap.matchMedia();

mm.add(
	{
		isDesktop: `(min-width: ${breakPoint}px)`,
		isMobile: `(max-width: ${breakPoint - 1}px)`
	},
	(context) => {
		context.add("animate", () => {
			let { isDesktop, isMobile } = context.conditions;
			let tl = gsap.timeline();

			if (isDesktop) {
				if (shareIsVisible) {
					tl.fromTo(shareModule,
						{ y: 20, scale: 0, yPercent: 90, visibility: 'hidden', opacity: 0 },
						{ visibility: 'visible', opacity: 1, y: 0, scale: 1, yPercent: 0, duration: 2, ease: 'elastic.out' }
					)
					tl.fromTo('.card__share-item',{ opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out', stagger: 0.5 }, "-=1")
					shareIsVisible = false;
				} else {
					tl.to('.card__share-item',{ opacity: 0, scale: 0, duration: 0.5, stagger: 0.25, ease: 'back.in' })
					tl.to(shareModule, { y: 20, scale: 0, yPercent: 90, ease: 'elastic.inOut', duration: 1 })
					shareIsVisible = true;
				}

				tl.play();
			} else if (isMobile) {
				if (shareIsVisible) {
					tl.fromTo(shareModule,
						{ y: 100, yPercent: 100, scale: 1, visibility: 'visible', opacity: 1 },
						{ visibility: 'visible', opacity: 1, y: 0, yPercent: 0, duration: 1, ease: 'bounce'  }
					)
					tl.fromTo('.card__share-item',{ opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out', stagger: 0.5 })
					shareIsVisible = false;
				} else {
					tl.to('.card__share-item',{ opacity: 0, scale: 0, duration: 0.5, stagger: 0.25, ease: 'back.in' })
					tl.to(shareModule, { y: 20, yPercent: 80, duration: 1, ease: 'bounce.out' })
					shareIsVisible = true;
				}

				tl.play();
			}
		})

		shareBtn.addEventListener("click", function () {
			this.classList.toggle("share-btn--active");
			context.animate();
		})

		return () => {
			shareBtn.removeEventListener("click", context.animate);
			tl.restart();
		}
})
