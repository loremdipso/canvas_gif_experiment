
const TEXT_HEIGHT = 20;


class Game {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	frames: HTMLImageElement[] = [];
	currentFrame: number = 0;
	imageHeight: number = 5;

	frameCount: number = 0;
	totalDelay: number = 0;
	average_ms_between_frames: number = 0;

	constructor() {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.context = this.canvas.getContext("2d");

		this.resizeCanvas();
		this.canvas.parentElement.addEventListener("resize", () => { this.resizeCanvas(); });

		// catches rest of resize events
		window.addEventListener("resize", () => { this.resizeCanvas(); });

		this.setup();
	}

	private resizeCanvas() {
		this.canvas.width = this.canvas.parentElement.clientWidth;
		this.canvas.height = this.canvas.parentElement.clientHeight;
	}


	private setup() {
		let count = 10;
		let to_load = 0;
		for (let i = 1; i < count; i++) {
			to_load++;
			let image = document.createElement("img");
			image.src = `images/smile-${i}.png`
			image.onload = () => {
				this.frames[i - 1] = image;
				to_load--;
				if (to_load == 0) {
					this.start();
				}
			};
		}
	}


	private start() {
		let lastUpdate = Date.now();
		let MIN_DELTA = 80;

		// TODO: cap the framerate on this
		const cb = () => {
			let delta = Date.now() - lastUpdate;

			if (delta > MIN_DELTA) {
				let drawStart = Date.now();

				lastUpdate = Date.now();
				this.update(delta);
				this.draw();

				this.frameCount++;
				this.totalDelay += Date.now() - drawStart;
			}

			window.requestAnimationFrame(cb);
		};
		window.requestAnimationFrame(cb);
	}


	private update(delta: number) {
		this.currentFrame = (this.currentFrame + 1) % this.frames.length;
	}

	private draw() {
		this.clear();

		let canvasWidth = this.canvas.width;
		let canvasHeight = this.canvas.height;
		let image = this.frames[this.currentFrame];
		let imageRatio = image.width / image.height;

		let imageHeight = this.imageHeight;
		let imageWidth = imageRatio * imageHeight;

		let num_drawn = 0;
		for (let x = 0; x < canvasWidth - imageWidth; x += imageWidth) {
			for (let y = 0; y < canvasHeight - imageHeight; y += imageHeight) {
				num_drawn++;
				this.context.drawImage(this.frames[this.currentFrame], x, y, imageWidth, imageHeight);
			}
		}


		this.drawText(`Average MS/frame: ${Math.round(
			this.totalDelay / this.frameCount
		)}`, TEXT_HEIGHT);
		this.drawText(`Num Rendered: ${num_drawn} `, 0);
	}

	private drawText(text: string, top: number) {
		this.context.fillStyle = "black";
		this.context.textBaseline = "top";
		this.context.font = `${TEXT_HEIGHT}px Arial`;

		let textWidth = this.context.measureText(text).width;

		drawRect(this.context, {
			x: 0,
			y: top,
			width: textWidth,
			height: TEXT_HEIGHT,
		}, "white");

		this.context.fillText(text, 0, top);
	}


	private clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

export interface Rect {
	x: number,
	y: number,
	height: number,
	width: number,
}


export function drawRect(context: CanvasRenderingContext2D, rect: Rect, color: string, opacity: number = 1.0) {
	context.save();
	context.beginPath();
	context.globalAlpha = opacity;
	context.fillStyle = color;
	context.fillRect(rect.x, rect.y, rect.width, rect.height);
	context.closePath();
	context.fill();
	context.restore();
}


// TODO: remove
if (!(window as any).did_load) {
	(window as any).did_load = true;
	// TODO: can we make this a singleton?
	new Game();
}

