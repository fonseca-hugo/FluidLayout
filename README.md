FluidLayout
===========

FluidLayout is a light plugin that organizes tiles in a responsive, efficient and dynamic multi-column tile layout. It was inspired by [Pinterest](http://pinterest.com) and [Shopcade](http://www.shopcade.com) tile organization.

Dependencies
========

FluidLayout depends on [jQuery](http://jquery.com).

Features
========

FluidLayout allows tiles with diferent heights to be efficiently positioned on the screen, without wasting any space. It takes advantage of media queries to be responsive according to the screen size, having only the columns that fit on the screen.
It very easy to use and also highly customizable and lighweight.

Easy to use in an infinite scroll scenario, as it tries to avoid unnecessary javascript heavy calculations.

Usage
========

Default usage:

<pre>
$(document).ready(function () {
    FluidLayout.setup();
});
</pre>

Change the tile offset to 2px:

<pre>
FluidLayout.setup({offset: "2px"});
</pre>

Change resize delay to 10ms:

<pre>
FluidLayout.setup({resizeDelay: 10});
</pre>

Specify a custom element selector:

<pre>
FluidLayout.setup({container: ".container", itemClass: ".tile"});
</pre>

Options
=======

Various options may be passed along to FluidLayout:

<pre>
FluidLayout.setup({
	// options
	option1: 'value',
	option2: 'value',
	option3: 'value'
	// etc...
});
</pre>

List of options and description:

<pre>
    container
</pre>
The tiles wrapper element class.

<pre>
    itemClass
</pre>
The tile class.

<pre>
    itemWidth
</pre>
The tile width.

<pre>
    itemPositionedClass
</pre>
The class to add to the tile after being correctly positioned.

<pre>
    offset
</pre>
The width to separate the tiles.

<pre>
    autoResize
</pre>
A flag to recalculate the tiles position on the window resize event.
        
<pre>
    resizeDelay
</pre>
The delay before starting the calculations after the resize event is triggered.
        
License
========

FluidLayout is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).