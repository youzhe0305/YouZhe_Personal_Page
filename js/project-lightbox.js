(function () {
	var lightbox = null;

	function createLightbox() {
		var lightbox = document.createElement('div');
		lightbox.className = 'image-lightbox';
		lightbox.setAttribute('role', 'dialog');
		lightbox.setAttribute('aria-modal', 'true');

		var closeButton = document.createElement('button');
		closeButton.className = 'image-lightbox-close';
		closeButton.type = 'button';
		closeButton.setAttribute('aria-label', 'Close enlarged image');
		closeButton.innerHTML = '&times;';

		var image = document.createElement('img');
		image.alt = '';

		var video = document.createElement('video');
		video.controls = true;
		video.playsInline = true;

		lightbox.appendChild(closeButton);
		lightbox.appendChild(image);
		lightbox.appendChild(video);
		document.body.appendChild(lightbox);

		return {
			el: lightbox,
			closeButton: closeButton,
			image: image,
			video: video
		};
	}

	function getLightbox() {
		if (!lightbox) {
			lightbox = createLightbox();
			lightbox.closeButton.addEventListener('click', closeLightbox);
			lightbox.el.addEventListener('click', function (event) {
				if (event.target === lightbox.el) {
					closeLightbox();
				}
			});
		}

		return lightbox;
	}

	function getVideoSource(sourceVideo) {
		var source = sourceVideo.querySelector('source');
		return source ? source.src : sourceVideo.currentSrc || sourceVideo.src;
	}

	function openLightbox(sourceMedia) {
		var activeLightbox = getLightbox();

		if (sourceMedia.tagName.toLowerCase() === 'video') {
			activeLightbox.image.hidden = true;
			activeLightbox.image.removeAttribute('src');
			activeLightbox.video.hidden = false;
			activeLightbox.video.src = getVideoSource(sourceMedia);
			activeLightbox.video.loop = sourceMedia.loop;
			activeLightbox.video.muted = sourceMedia.muted;
			activeLightbox.video.play();
		} else {
			activeLightbox.video.pause();
			activeLightbox.video.removeAttribute('src');
			activeLightbox.video.load();
			activeLightbox.video.hidden = true;
			activeLightbox.image.hidden = false;
			activeLightbox.image.src = sourceMedia.currentSrc || sourceMedia.src;
			activeLightbox.image.alt = sourceMedia.alt || '';
		}
		activeLightbox.el.classList.add('is-open');
		document.body.classList.add('lightbox-open');
		activeLightbox.closeButton.focus();
	}

	function closeLightbox() {
		if (!lightbox) {
			return;
		}

		lightbox.el.classList.remove('is-open');
		document.body.classList.remove('lightbox-open');
		lightbox.image.removeAttribute('src');
		lightbox.video.pause();
		lightbox.video.removeAttribute('src');
		lightbox.video.load();
	}

	document.addEventListener('click', function (event) {
		var media = event.target.closest('.publication .col-lg-4 img, .publication .col-lg-4 video');

		if (media) {
			openLightbox(media);
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && lightbox && lightbox.el.classList.contains('is-open')) {
			closeLightbox();
		}
	});
}());
