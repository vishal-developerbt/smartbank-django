/*! main.js | Wealthuiux 2025 */

/* ==========================================================================
Main initialization file
========================================================================== */

"use strict";

document.addEventListener('DOMContentLoaded', function () {

    // hide page loader 
    PageLoaderHide()

    // main links active 
    setActivelink();

    // set header space 
    fixedHeaderSpace()

    // fixed sticky footer space
    fixedFooterSpace()

    //feature icons 
    featherjs();

    // cover img background set
    coverimg();

    // don't close dropdown
    dontclosedd()

    // bs tooltip 
    bstooltip();

    // swiper common 
    swipernav();
    swipernavpagination();
    swipergallerythumbnav();

    // dropzone 
    mydropzone();

    // froala editor 
    froalaeditor();

    //datepicker class
    datepicker();

    // global date range 
    daterange();

    // date range with ranges
    daterangeranges();

    // date range with ranges with class
    // daterangerangesclass();

    //dataTable global
    dataTables();

    //inline datepicker
    inlinedatepicker();

    /* bootstrap popover  */
    bspopover();

    /* bootstrap toast message */
    bstoast();

    /* bootstrap tooltips */
    bstooltip();

    /* header padding top */
    headerpaddingTop();

    /* selectable active toggle */
    selectable();

    /* back to top */
    initBackToTop();

    // in iframe 
    isinframe();

    // increamenter 
    increamenter();

    // chosen js 
    chosenselect();

    // vector map js 
    jsvectormaps();

});

window.addEventListener('scroll', () => {
    // active header
    activeHeader();

    scrolldirection();
})

window.addEventListener('resize', () => {
    // active header
    adjustDataTable();

})
