/*! auth.js | Wealthuiux 2025-2026 */

/* ==========================================================================
Auth pages js
========================================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // main links active 
    setActivelink();

    // set header space 
    fixedHeaderSpace()

    // auto theme mode
    //autoThemeMode();

    //feature icons 
    featherjs();

    // cover img background set
    coverimg();

    // don't close dropdown
    dontclosedd()

    // check strength password 
    checkstrength();

    // bs tooltip 
    bstooltip();

    //swiper carousel
    swipernavpagination();
    swipernavpaginationarrow()

    // hide page loader 
    PageLoaderHide();

    // page redirect onboaring 
    redirectpage();

});


function swipernavpaginationarrow() {
    const swiperElementA = document.querySelector('.swipernavpaginationarrow');
    if (swiperElementA) {
        new Swiper(swiperElementA, {
            slidesPerView: "auto",
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: ".btn-next",
                prevEl: ".btn-prev",
            },
            on: {
                reachEnd: function () {
                    setTimeout(function () {
                        const nextButton = document.querySelector('.btn-next');
                        if (nextButton) {
                            nextButton.disabled = false;
                            nextButton.classList.remove('swiper-button-disabled');
                            nextButton.addEventListener('click', function () {
                                this.disabled = true;
                                this.innerHTML = '<div class="spinner-border text-white spinner-border-sm" role="status"><span class="visually-hidden"> Loading...</span></div>';
                                setTimeout(function () {
                                    window.location.replace("adminuiux-onboarding2.html");
                                }, 1500);
                            });
                        } else {
                            console.warn("Element with class '.btn-next' not found.");
                        }
                    }, 100);
                }
            }
        });
    }
}

/* redirect page */
function redirectpage() {
    /* loader */
    if ($('#timer').length > 0) {
        $('#timer').innerHTML = '0' + ':' + '20';

        startTimer();
        function startTimer() {
            var presentTime = $('#timer').html();
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = checkSecond((timeArray[1] - 1));
            if (s == 59) {
                m = m - 1
            }
            if (m < 0) {
                return
            }
            $('#timer').html(m + ":" + s);
            setTimeout(startTimer, 1000);

            /* redirect page on timer ends */
            if (m === '0' && s === '00') {
                window.location.replace('adminux-dashboard.html');
            }
        }
        function checkSecond(sec) {
            if (sec < 10 && sec >= 0) {
                sec = "0" + sec
            }; // add zero in front of numbers < 10
            if (sec < 0) {
                sec = "59"
            };
            return sec;
        }
    }

}