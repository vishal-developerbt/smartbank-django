'use strict';

const html = document.documentElement;
const body = document.body;
let defaultLiquidImg = "url('../../assets/img/background-image/backgorund-image-1.jpg')";

document.addEventListener('DOMContentLoaded', function () {

    const btnLayoutModesDark = document.getElementById('btn-layout-modes-dark-page');
    if (btnLayoutModesDark) {
        btnLayoutModesDark.addEventListener('click', function () {
            if (this.checked) { // Use 'this' instead of $(this)
                setCookie('adminuiuxlayoutmode', 'dark-mode', 1);
                html.className = getCookie("adminuiuxlayoutmode"); // Use className
            } else {
                setCookie('adminuiuxlayoutmode', 'light-mode', 1);
                html.className = getCookie("adminuiuxlayoutmode"); // Use className
            }
        });
    }

    // color style
    let originstyle = body.dataset.theme;
    let curentstyle = body.dataset.theme;

    if (getCookie("adminuiuxtheme")) {
        body.classList.remove(curentstyle);
        body.classList.add(getCookie("adminuiuxtheme"));
        body.dataset.theme = getCookie("adminuiuxtheme");
        curentstyle = getCookie("adminuiuxtheme");

        const themeSelectBoxes = document.querySelectorAll('.theme-select .select-box');
        themeSelectBoxes.forEach(function (box) {
            if (box.dataset.title === getCookie("adminuiuxtheme")) {
                box.classList.add("active");
            }
        });
    }

    const themeSelectBoxes = document.querySelectorAll('.theme-select .select-box');
    themeSelectBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
            let curentstyle = body.dataset.theme;
            const setstyle = this.dataset.title;
            themeSelectBoxes.forEach(b => b.classList.remove('active'));

            if (!this.classList.contains('active') && setstyle.length > 0) {
                this.classList.add('active');
                body.classList.remove(curentstyle);
                body.classList.add(setstyle);
                body.dataset.theme = setstyle;
                setCookie('adminuiuxtheme', setstyle, 1);
                curentstyle = setstyle;
            } else {
                this.classList.add('active');
                body.classList.remove(curentstyle);
                body.classList.add(originstyle);
                body.dataset.theme = originstyle;
                setCookie('adminuiuxtheme', originstyle, 1);
                curentstyle = originstyle;
            }
        });
    });

    /* background images */
    const adminuiuxsetimagepath = getCookie("adminuiuxsetimagepath");

    if (adminuiuxsetimagepath) {
        const mainBgs = document.querySelectorAll('.main-bg');
        mainBgs.forEach(mainBg => {
            mainBg.style.setProperty('--adminuiux-main-bg', `url("../../${adminuiuxsetimagepath}")`);
        });
        const themeBackgroundSelectBoxes = document.querySelectorAll('.theme-background .select-box');
        themeBackgroundSelectBoxes.forEach(selectBox => {
            if (selectBox.dataset.src === adminuiuxsetimagepath) {
                selectBox.classList.add("active");
            }
        });
    }
    const themeBackgroundSelectBoxes = document.querySelectorAll('.theme-background .select-box');
    themeBackgroundSelectBoxes.forEach(selectBox => {
        selectBox.addEventListener('click', () => {
            // Remove active class from all boxes
            themeBackgroundSelectBoxes.forEach(b => b.classList.remove('active'));

            const mainbgimage = selectBox.querySelector('img')?.getAttribute('src');
            selectBox.classList.add("active");

            const mainBgs = document.querySelectorAll('.main-bg'); // Get mainBgs inside click handler

            if (mainbgimage) {
                setCookie('adminuiuxsetimagepath', mainbgimage, 1);
                defaultLiquidImg = "url('../../" + mainbgimage + "')";
                mainBgs.forEach(mainBg => {
                    mainBg.style.setProperty('--adminuiux-main-bg', `url(../../${mainbgimage})`);
                });
            } else {
                setCookie('adminuiuxsetimagepath', '', 1); // Clear the cookie
                mainBgs.forEach(mainBg => {
                    mainBg.style.setProperty('--adminuiux-main-bg', 'none');
                });
            }
        });
    });

    /* sidebar color fill type */
    let currentSidebarFill = body.dataset.sidebarfill;
    const adminuiuxsidebarfilledCookie = getCookie("adminuiuxsidebarfilled");
    if (adminuiuxsidebarfilledCookie) {
        body.classList.remove(currentSidebarFill);
        body.classList.add(adminuiuxsidebarfilledCookie);
        body.dataset.sidebarfill = adminuiuxsidebarfilledCookie;
        currentSidebarFill = adminuiuxsidebarfilledCookie;

        const sidebarSelectBoxes = document.querySelectorAll('#personalise-preview-sidebar .select-box');
        sidebarSelectBoxes.forEach(selectBox => {
            selectBox.classList.remove("active");
            if (selectBox.dataset.title === adminuiuxsidebarfilledCookie) {
                selectBox.classList.add("active");
            }
        });
    }
    const sidebarSelectBoxes = document.querySelectorAll('#personalise-preview-sidebar .select-box');
    sidebarSelectBoxes.forEach(selectBox => {
        selectBox.addEventListener('click', () => {
            currentSidebarFill = body.dataset.sidebarfill;
            const setSidebarfill = selectBox.dataset.title;

            // Remove active from all boxes first
            sidebarSelectBoxes.forEach(b => b.classList.remove('active'));
            selectBox.classList.add("active");

            body.classList.remove(currentSidebarFill);

            if (setSidebarfill) {
                const adminuiuxsidebarfilledCookie = getCookie("adminuiuxsidebarfilled");
                if (adminuiuxsidebarfilledCookie) {
                    body.classList.remove(adminuiuxsidebarfilledCookie);
                }
                body.classList.add(setSidebarfill);
                body.dataset.sidebarfill = setSidebarfill;
                setCookie('adminuiuxsidebarfilled', setSidebarfill, 1);
            } else {
                const adminuiuxsidebarfilledCookie = getCookie("adminuiuxsidebarfilled");
                if (adminuiuxsidebarfilledCookie) {
                    body.classList.remove(adminuiuxsidebarfilledCookie);
                }
                body.dataset.sidebarfill = 'adminuiux-sidebar-fill-none';
                removeCookie('adminuiuxsidebarfilled');
            }
        });
    });

    /* sidebar layout */
    let currentSidebarLayout = body.dataset.sidebarlayout;
    const adminuiuxsidebarlayoutCookie = getCookie("adminuiuxsidebarlayout");

    if (adminuiuxsidebarlayoutCookie) {
        for (let i = 0; i < currentSidebarLayout.length; i++) {
            body.classList.remove(currentSidebarLayout[i]);
        }

        for (let i = 0; i < adminuiuxsidebarlayoutCookie.split(" ").length; i++) {
            body.classList.add(adminuiuxsidebarlayoutCookie.split(" ")[i]);
        }
        body.dataset.sidebarlayout = adminuiuxsidebarlayoutCookie;
        currentSidebarLayout = adminuiuxsidebarlayoutCookie;

        const sidebarLayoutBoxes = document.querySelectorAll('.sidebar-layout .select-box');
        sidebarLayoutBoxes.forEach(selectBox => {
            selectBox.classList.remove("active");
            if (selectBox.dataset.title === adminuiuxsidebarlayoutCookie) {
                selectBox.classList.add("active");
            }
        });
    }

    const sidebarLayoutBoxes = document.querySelectorAll('.sidebar-layout .select-box');

    sidebarLayoutBoxes.forEach(selectBox => {
        selectBox.addEventListener('click', () => {
            currentSidebarLayout = body.dataset.sidebarlayout;
            const setSidebarLayout = selectBox.dataset.title;

            sidebarLayoutBoxes.forEach(b => b.classList.remove('active'));
            selectBox.classList.add("active");

            for (let i = 0; i < currentSidebarLayout.split(" ").length; i++) {
                body.classList.remove(currentSidebarLayout.split(" ")[i]);
            }


            if (setSidebarLayout) {
                const adminuiuxsidebarlayoutCookie = getCookie("adminuiuxsidebarlayout");
                if (adminuiuxsidebarlayoutCookie) {
                    for (let i = 0; i < adminuiuxsidebarlayoutCookie.split(" ").length; i++) {
                        body.classList.remove(adminuiuxsidebarlayoutCookie.split(" ")[i]);
                    }
                }
                for (let i = 0; i < setSidebarLayout.split(" ").length; i++) {
                    body.classList.add(setSidebarLayout.split(" ")[i]);
                }
                body.dataset.sidebarlayout = setSidebarLayout;
                setCookie('adminuiuxsidebarlayout', setSidebarLayout, 1);
            } else {
                const adminuiuxsidebarlayoutCookie = getCookie("adminuiuxsidebarlayout");
                if (adminuiuxsidebarlayoutCookie) {
                    for (let i = 0; i < adminuiuxsidebarlayoutCookie.split(" ").length; i++) {
                        body.classList.remove(adminuiuxsidebarlayoutCookie.split(" ")[i]);
                    }
                }
                removeCookie('adminuiuxsidebarlayout');
            }
        });
    });


    /* header style */
    let currentHeaderFill = body.dataset.headerfill;
    const adminuiuxheaderfilledCookie = getCookie("adminuiuxheaderfilled");

    if (adminuiuxheaderfilledCookie) {
        body.classList.remove(currentHeaderFill);
        body.classList.add(adminuiuxheaderfilledCookie);
        body.dataset.headerfill = adminuiuxheaderfilledCookie;
        currentHeaderFill = adminuiuxheaderfilledCookie;
        const headerFillSelectBoxes = document.querySelectorAll('#personalise-preview-header .select-box');
        headerFillSelectBoxes.forEach(selectBox => {
            selectBox.classList.remove("active");
            if (selectBox.dataset.title === adminuiuxheaderfilledCookie) {
                selectBox.classList.add("active");
            }
        });
    }

    const headerFillSelectBoxes = document.querySelectorAll('#personalise-preview-header .select-box');

    headerFillSelectBoxes.forEach(selectBox => {
        selectBox.addEventListener('click', () => {
            currentHeaderFill = body.dataset.headerfill;
            const setHeaderFill = selectBox.dataset.title;

            headerFillSelectBoxes.forEach(b => b.classList.remove('active'));
            selectBox.classList.add("active");

            body.classList.add(setHeaderFill);
            body.classList.remove(currentHeaderFill);
            body.dataset.headerfill = setHeaderFill;
            setCookie('adminuiuxheaderfilled', setHeaderFill, 1);
        });
    });

    /* header layout */
    let currentHeaderLayout = body.dataset.headerlayout;
    const adminuiuxheaderlayoutCookie = getCookie("adminuiuxheaderlayout");

    if (adminuiuxheaderlayoutCookie) {
        body.classList.remove(currentHeaderLayout);
        body.classList.add(adminuiuxheaderlayoutCookie);
        body.dataset.headerlayout = adminuiuxheaderlayoutCookie;
        currentHeaderLayout = adminuiuxheaderlayoutCookie;

        const headerLayoutBoxes = document.querySelectorAll('#header-layout .select-box');
        headerLayoutBoxes.forEach(selectBox => {
            selectBox.classList.remove("active");
            if (selectBox.dataset.title === adminuiuxheaderlayoutCookie) {
                selectBox.classList.add("active");
            }
        });
    }
    const headerLayoutBoxes = document.querySelectorAll('#header-layout .select-box');
    headerLayoutBoxes.forEach(selectBox => {
        selectBox.addEventListener('click', () => {
            currentHeaderLayout = body.dataset.headerlayout;
            const setHeaderLayout = selectBox.dataset.title;

            headerLayoutBoxes.forEach(b => b.classList.remove('active'));
            selectBox.classList.add("active");

            body.classList.remove(currentHeaderLayout);

            if (setHeaderLayout) {
                const adminuiuxheaderlayoutCookie = getCookie("adminuiuxheaderlayout");
                if (adminuiuxheaderlayoutCookie) {
                    body.classList.remove(adminuiuxheaderlayoutCookie);
                }
                body.classList.add(setHeaderLayout);
                body.dataset.headerlayout = setHeaderLayout;
                setCookie('adminuiuxheaderlayout', setHeaderLayout, 1);
            } else {
                const adminuiuxheaderlayoutCookie = getCookie("adminuiuxheaderlayout");
                if (adminuiuxheaderlayoutCookie) {
                    body.classList.remove(adminuiuxheaderlayoutCookie);
                }
                removeCookie('adminuiuxheaderlayout');
            }
        });
    });

    /* bg gradient */
    let currentBgGradient = body.dataset.bggradient;
    const adminuiuxbggradientCookie = getCookie("adminuiuxbggradient");
    if (adminuiuxbggradientCookie) {
        body.classList.remove(currentBgGradient);
        body.classList.add(adminuiuxbggradientCookie);
        body.dataset.bggradient = adminuiuxbggradientCookie;
        currentBgGradient = adminuiuxbggradientCookie;

        const gradientBoxes = document.querySelectorAll('.theme-background .gradient-box');
        gradientBoxes.forEach(gradientBox => {
            gradientBox.classList.remove("active");
            if (gradientBox.dataset.title === adminuiuxbggradientCookie) {
                gradientBox.classList.add("active");
            }
        });
    }

    const gradientBoxes = document.querySelectorAll('.theme-background .gradient-box');

    gradientBoxes.forEach(gradientBox => {
        gradientBox.addEventListener('click', () => {
            currentBgGradient = body.dataset.bggradient;
            const setBgGradient = gradientBox.dataset.title;

            gradientBoxes.forEach(b => b.classList.remove('active'));
            gradientBox.classList.add("active");

            body.classList.remove(currentBgGradient);

            if (setBgGradient) {
                const adminuiuxbggradientCookie = getCookie("adminuiuxbggradient");
                if (adminuiuxbggradientCookie) {
                    body.classList.remove(adminuiuxbggradientCookie);
                }
                body.classList.add(setBgGradient);
                body.dataset.bggradient = setBgGradient;
                setCookie('adminuiuxbggradient', setBgGradient, 1);
            } else {
                const adminuiuxbggradientCookie = getCookie("adminuiuxbggradient");
                if (adminuiuxbggradientCookie) {
                    body.classList.remove(adminuiuxbggradientCookie);
                }
                removeCookie('adminuiuxbggradient');
            }
        });
    });


    //dark mode
    initDarkMode();

    // RTL 
    initRTL();

    // auto theme mode
    //autoThemeMode();

    /* Right to left to right directions */
    const btnLayoutRTL = document.getElementById('btn-layout-RTL');
    if (getCookie('adminuiuxdirectionmode') === 'rtl') {
        setDirection(true);
    } else {
        setDirection(false);
    }
    function setDirection(isRTL) {
        html.dir = isRTL ? 'rtl' : 'ltr';
        html.classList.toggle('rtl', isRTL);
        if (btnLayoutRTL) {
            btnLayoutRTL.checked = isRTL;
        }
    }
    if (btnLayoutRTL) {
        btnLayoutRTL.addEventListener('click', function () {
            setDirection(this.checked);
            setCookie('adminuiuxdirectionmode', this.checked ? 'rtl' : 'ltr', 1);
        });
    }

});


/* create set cookie */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";  path=/; SameSite=None; Secure";
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Dark Mode
function initDarkMode() {
    const btnLayoutModesDarkPage = document.getElementById('btn-layout-modes-dark-page');
    const btnLayoutModesDark = document.getElementById('btn-layout-modes-dark');

    function setDarkMode(isDark) {
        document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
        setCookie("adminuiuxlayoutmode", isDark ? 'dark' : 'light');
        btnLayoutModesDarkPage.classList.toggle('active', isDark);
        if (btnLayoutModesDark) {
            btnLayoutModesDark.checked = isDark;
        }
    }

    if (getCookie("adminuiuxlayoutmode") === 'dark') {
        setDarkMode(true);
    }

    if (btnLayoutModesDarkPage) {
        btnLayoutModesDarkPage.addEventListener('click', () => setDarkMode(!btnLayoutModesDarkPage.classList.contains('active')));
    }

    if (btnLayoutModesDark) {
        btnLayoutModesDark.addEventListener('change', () => setDarkMode(btnLayoutModesDark.checked));
    }
}

//rtl
function initRTL() {
    const btnLayoutDirRtl = document.getElementById('btn-layout-dir-rtl');
    const btnLayoutDirRtlPage = document.getElementById(' ');
    function setRTL(isRTL) {
        document.documentElement.dir = isRTL ? "rtl" : "ltr";
        html.classList.toggle('rtl', isRTL);
        btnLayoutDirRtl.checked = isRTL;
        setCookie('adminuiuxdirectionmode', isRTL ? "rtl" : "ltr", 1);
    }

    if (getCookie('adminuiuxdirectionmode') === 'rtl') {
        setRTL(true);
    }
    if (btnLayoutDirRtl) {
        btnLayoutDirRtl.addEventListener('change', () => setRTL(btnLayoutDirRtl.checked));
    }
    if (btnLayoutDirRtlPage) {
        btnLayoutDirRtlPage.addEventListener('change', () => setRTL(btnLayoutDirRtlPage.checked));
    }
}
