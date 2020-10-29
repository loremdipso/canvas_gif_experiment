Inspired by the New York Times' [Derek Jeter](https://www.nytimes.com/interactive/2014/09/14/sports/baseball/jeter-swings.html?mtrref=undefined&assetType=REGIWALL) visualization, I wanted to see how they were able to render their Derek Jeter gif 10,000 times. Obviously they used a canvas, but was there any caching involved? Did they create a texture and render that, or was it done naively?

Well, the short of it is they could have just done it naively. With a minimal example I was able to render ~30K elements and still get around 90ms between frames. For reference 60fps is about 17ms between frames.

Ah, well. Good to know canvas is fast, at least.

Link to experiment [here](https://loremdipso.github.io/canvas_gif_experiment).
