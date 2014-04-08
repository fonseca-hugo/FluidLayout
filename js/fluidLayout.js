/* ===================================================
* fluidLayout.js v1.1
* https://github.com/fonseca-hugo/FluidLayout
* 
* @name fluidLayout.js
* @author Hugo Fonseca (fonseca.hugo@gmail.com)
* @version 1.1
* @date 03/04/2013
* ===================================================
* Copyright (c) 2011-2013 Hugo Fonseca (fonseca.hugo@gmail.com)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ========================================================== */

FluidLayout = (function () {
    "use strict"; /* global FluidLayout, $ */
    return {
        defaults: {
            container: '.fluid-layout',
            itemClass: '.tile',
            itemWidth: 0,
            itemPositionedClass: 'positioned',
            offset: 15,
            autoResize: true,
            resizeDelay: 30
        },
        displayOptions: {},
        containerHeights: {},
        containerBottom: 0,
        adjustingLayout: false,
        length: 0,
        setup: function (options) {
            if (!this.setupComplete) {
                this.setDisplayOptions(options);
                this.allTiles(true);
                this.attachEvents();
                this.setupComplete = true;
            }
        },
        /**
         * Attached the necessary events
         **/
        attachEvents: function () {
            if (!this.attachEventsComplete) {
                // Listen to resize event if requested.
                if (this.displayOptions.autoResize) {
                    // This timer ensures that layout is not continuously called as window is being dragged.
                    this.displayResizeTimer = null;
                    this.redrawOnResize = function () {
                        if (this.displayResizeTimer) {
                            clearTimeout(this.displayResizeTimer);
                        }
                        this.displayResizeTimer = setTimeout($.proxy(this.allTiles, this), this.displayOptions.resizeDelay);
                    };
                    // Bind event listener.
                    $(window).resize($.proxy(this, "redrawOnResize"));
                }
                this.attachEventsComplete = true;
            }
        },
        /**
         * Sets the options to display the tiles.
         *
         * @param options Options to override the defaults
         **/
        setDisplayOptions: function (options) {
            if (typeof options !== "undefined") {
                this.displayOptions = options;
            }
            // Override defaults for submitted options.
            for (var i in this.defaults) {
                if (!this.displayOptions[i]) {
                    this.displayOptions[i] = this.defaults[i];
                }
            }
            // Layout variables.
            if (!this.displayColumns) {
                this.displayColumns = [];
            }
            if (this.displayOptions.itemWidth <= 0) { // get width from first tile
                this.displayOptions.itemWidth = $(this.displayOptions.container).find(this.displayOptions.itemClass).first().outerWidth();
            }
        },
        /**
         * Apply the logic to tiles positioning
         *
         * @param reset Forces all tiles to be repositioned
         **/
        allTiles: function (reset) {
            // Calculate basic layout parameters.
            var columnWidth = this.displayOptions.itemWidth + this.displayOptions.offset,
                containerWidth = $(this.displayOptions.container).width(),
                columns = Math.floor((containerWidth + this.displayOptions.offset) / columnWidth);

            // Cast to boolean
            reset = !!reset;
            this.adjustingLayout = true;

            // If container and column count hasn't changed, we can only update the columns.
            if (this.displayColumns.length === columns && !reset) {
                this.updateTileColumns(columnWidth, false);
            } else {
                this.updateAllTiles(columnWidth, columns);
            }

            // Set container height to new height.
            $(this.displayOptions.container).css('height', this.containerBottom + 'px');
        },
        /**
         * This function only updates the vertical position of the
         * existing column assignments.
         */
        updateTileColumns: function (columnWidth, reset) {
            var item,
                i,
                k,
                length = $(this.displayOptions.container).find(this.displayOptions.itemClass).length, shortest = null, shortestIndex = null;

            // Loop over items.
            for (i = 0; i < length; i++) {
                item = $($(this.displayOptions.container).find(this.displayOptions.itemClass)[i]);
                if (!item.hasClass(this.displayOptions.itemPositionedClass) || reset) {
                    // Find the shortest column.
                    shortest = null;
                    shortestIndex = 0;
                    for (k = 0; k < this.displayColumns.length; k++) {
                        if (shortest === null || this.containerHeights[k] < shortest) {
                            shortest = this.containerHeights[k];
                            shortestIndex = k;
                        }
                    }
                    // Postion the item.
                    item.css({
                        position: 'absolute',
                        top: shortest + 'px',
                        left: (shortestIndex * columnWidth) + 'px'
                    }
                    );
                    item.addClass(this.displayOptions.itemPositionedClass);

                    // Update column height.
                    this.containerHeights[shortestIndex] = shortest + item.outerHeight() + this.displayOptions.offset;
                    this.containerBottom = Math.max(this.containerBottom, this.containerHeights[shortestIndex]);

                    this.displayColumns[shortestIndex].push(item);
                }
            }
            this.adjustingLayout = false;
        },
        /**
         * This function updates the position of all existing tiles.
         */
        updateAllTiles: function (columnWidth, columns) {
            this.containerBottom = 0;
            // Prepare Array to store height of columns.
            this.containerHeights = [];
            while (this.containerHeights.length < columns) {
                this.containerHeights.push(0);
            }

            // Store column data.
            this.displayColumns = [];
            while (this.displayColumns.length < columns) {
                this.displayColumns.push([]);
            }

            this.updateTileColumns(columnWidth, true);
        }
    };
})();