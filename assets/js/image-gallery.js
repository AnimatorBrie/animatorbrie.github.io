var images = document.querySelectorAll("div.image-gallery > img");

var zoom = document.querySelector("div.image-gallery > div.gallery-zoom");
var zoomed_img = zoom.querySelector("img");
var btn_prev = zoom.querySelector("button.prev");
var btn_next = zoom.querySelector("button.next");

function get_img(images, index) {
	var idx = index % (images.length - 1);
	if (idx < 0) {
		idx = images.length - Math.abs(idx);
	}
	var result = images[idx];
	return result;
}

var set_zoomed = (img) => {
	zoomed_img.src = img.src;
	zoomed_img.gallery_index = img.gallery_index;
};

var advance_zoomed = (amt) => {
	set_zoomed(get_img(images, zoomed_img.gallery_index + amt));
};

var index = 0;
for (const img of images) {
	img.gallery_index = index;
	index += 1;
	img.addEventListener("click", () => {
		zoom.hidden = false;
		zoom.style.display = "flex";
		set_zoomed(img);
	}, {});
}

// btn_prev.addEventListener("click", () => { advance_zoomed(-1); });
// btn_next.addEventListener("click", () => { advance_zoomed(1); });

document.addEventListener("keydown", (event) => {
	if (!zoom.hidden) {
		switch (event.key) {
			case 'Escape':
				zoom.hidden = true;
				zoom.style.display = "none";
				break;
			case 'ArrowRight':
				advance_zoomed(1);
				break;
			case 'ArrowLeft':
				advance_zoomed(-1);
				break;
		}
	}
});
