(function () {
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

	document.addEventListener('DOMContentLoaded', function () {
		var lightbox = createLightbox();
		var zoomableMedia = document.querySelectorAll('.publication .col-lg-4 img, .publication .col-lg-4 video');

		function getVideoSource(sourceVideo) {
			var source = sourceVideo.querySelector('source');
			return source ? source.src : sourceVideo.currentSrc || sourceVideo.src;
		}

		function openLightbox(sourceMedia) {
			if (sourceMedia.tagName.toLowerCase() === 'video') {
				lightbox.image.hidden = true;
				lightbox.image.removeAttribute('src');
				lightbox.video.hidden = false;
				lightbox.video.src = getVideoSource(sourceMedia);
				lightbox.video.loop = sourceMedia.loop;
				lightbox.video.muted = sourceMedia.muted;
				lightbox.video.play();
			} else {
				lightbox.video.pause();
				lightbox.video.removeAttribute('src');
				lightbox.video.load();
				lightbox.video.hidden = true;
				lightbox.image.hidden = false;
				lightbox.image.src = sourceMedia.currentSrc || sourceMedia.src;
				lightbox.image.alt = sourceMedia.alt || '';
			}
			lightbox.el.classList.add('is-open');
			document.body.classList.add('lightbox-open');
			lightbox.closeButton.focus();
		}

		function closeLightbox() {
			lightbox.el.classList.remove('is-open');
			document.body.classList.remove('lightbox-open');
			lightbox.image.removeAttribute('src');
			lightbox.video.pause();
			lightbox.video.removeAttribute('src');
			lightbox.video.load();
		}

		zoomableMedia.forEach(function (media) {
			media.classList.add('zoomable-media');
			media.setAttribute('tabindex', '0');
			media.setAttribute('role', 'button');
			media.setAttribute('aria-label', 'Enlarge media');

			media.addEventListener('click', function () {
				openLightbox(media);
			});

			media.addEventListener('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					openLightbox(media);
				}
			});
		});

		lightbox.closeButton.addEventListener('click', closeLightbox);
		lightbox.el.addEventListener('click', function (event) {
			if (event.target === lightbox.el) {
				closeLightbox();
			}
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && lightbox.el.classList.contains('is-open')) {
				closeLightbox();
			}
		});
	});
}());
