/*
 * @author      Andreas Arledal (andreas.arledal@me.com)
 * @copyright   Copyright (c) 2012 Andreas Arledal
 * @license     This HoverablePopover jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * version      Version 1.0
 */
;(function ($) {

    "use strict";

    $.fn.hoverablePopover = function(options, threshold) {
        options.trigger = 'manual';

        return this.each(function() {
            threshold = threshold || 200;
            var popoverEntered = false,
                self = $(this),
                optionHideDelay = options.delay.hide || 0,
                calculatedHideDelay = optionHideDelay - threshold,
                hideTimeout;

            if (calculatedHideDelay < 0) {
                calculatedHideDelay = 0;
            }

            $(this).popover(options).hover(
                function() {
                    popoverEntered = false;
                    $(this).popover('show');
                },
                function() {
                    setTimeout(function() {
                        if (popoverEntered !== true) {
                            setTimeout(function() {
                                self.popover('hide');
                            }, calculatedHideDelay);
                        }
                    }, threshold);

                    $('.popover')
                        .mouseenter(function () { clearTimeout(hideTimeout); popoverEntered = true; })
                        .mouseleave(
                            function () {
                                hideTimeout = setTimeout(function() {
                                    popoverEntered = false;
                                    self.popover('hide');
                                }, optionHideDelay);
                            }
                        )
                    ;
                }
            );
        });
    };

})( jQuery );
