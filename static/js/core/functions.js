"use strict";

document.addEventListener('DOMContentLoaded', function () {

    const body = document.body; // Direct reference to the body element

    /* default window width */
    let windowswidth = window.innerWidth; // Use window.innerWidth
    window.addEventListener('resize', () => { // Use addEventListener and arrow function
        windowswidth = window.innerWidth;
    });

    // Pageloader hide
    function PageLoaderHide() {
        const pageLoader = document.querySelector('.pageloader');
        if (pageLoader) { // Check if the element exists
            pageLoader.style.display = 'none'; // Use style.display
        }
        body.classList.remove('overflow-hidden');
    }
    window.PageLoaderHide = PageLoaderHide;

    // fixed header content space
    function fixedHeaderSpace() {
        const navbar = document.querySelector('.adminuiux-header .navbar');
        if (navbar && navbar.classList.contains('fixed-top')) { // Check if element exists and has class
            const navbarHeight = navbar.offsetHeight;
            const sidebar = document.querySelector('.adminuiux-sidebar');
            const content = document.querySelector('.adminuiux-content');
            if (sidebar) sidebar.style.paddingTop = `${navbarHeight}px`;
            if (content) content.style.paddingTop = `${navbarHeight}px`;
        }
    }
    window.fixedHeaderSpace = fixedHeaderSpace;

    function fixedFooterSpace() {
        const mobileFooter = document.querySelector(".adminuiux-mobile-footer");
        if (mobileFooter) {
            if (!document.querySelector(".adminuiux-sidebar")) { // Check if sidebar exists
                mobileFooter.style.marginLeft = '0';
            }
            body.style.paddingBottom = `${mobileFooter.offsetHeight}px`;
        }
    }
    window.fixedFooterSpace = fixedFooterSpace;

    function activeHeader() {
        if (window.scrollY > 30) { // Use window.scrollY
            const header = document.querySelector('.adminuiux-header');
            if (header) header.classList.add('active');
        } else {
            const header = document.querySelector('.adminuiux-header');
            if (header) header.classList.remove('active');
        }
    }
    window.activeHeader = activeHeader;

    // scrolling direction
    function scrolldirection() {
        let lastScrollTop = document.documentElement.scrollTop;
        const pagelength = document.documentElement.scrollHeight - 50;

        window.addEventListener("scroll", function () {
            const st = document.documentElement.scrollTop;
            if ((st + document.documentElement.clientHeight) <= pagelength && document.documentElement.scrollTop >= 50) {
                if (st > lastScrollTop) {
                    body.classList.add('scrolldown');
                    body.classList.remove('scrollup');
                } else if (st <= lastScrollTop) {
                    body.classList.add('scrollup');
                    body.classList.remove('scrolldown');
                }
                lastScrollTop = st;
            } else {
                body.classList.add('scrollup');
                body.classList.remove('scrolldown');
            }

            /* fixed buttons space */
            const mobileFooter = document.querySelector(".adminuiux-mobile-footer");
            const fixedButtons = document.getElementById("fixedbuttons");
            if (mobileFooter && body.classList.contains('scrollup') && fixedButtons) {
                fixedButtons.style.paddingBottom = `${mobileFooter.offsetHeight}px`;
            } else if (fixedButtons) {
                fixedButtons.style.paddingBottom = '0px';
            }
        }, false);
    }
    window.scrolldirection = scrolldirection;

    // search open close
    function openSearch() {
        const searchFull = document.querySelector('.adminuiux-search-full');
        if (searchFull) searchFull.classList.add('active');
    }
    window.openSearch = openSearch;

    function closeSearch() {
        const searchFull = document.querySelector('.adminuiux-search-full');
        if (searchFull) searchFull.classList.remove('active');
    }
    window.closeSearch = closeSearch;

    function contentClick() {
        const searchFull = document.querySelector('.adminuiux-search-full');
        if (searchFull && searchFull.classList.contains('active')) {
            searchFull.classList.remove('active');
        }
        if (body.classList.contains('sidebar-open')) {
            body.classList.remove('sidebar-open');
        }
    }
    window.contentClick = contentClick;

    //Set Active Links
    function setActivelink() {
        const url = window.location.href;
        const activePage = url;

        const headerNavLinks = document.querySelectorAll('#header-navbar .navbar-nav .nav-item .nav-link');
        headerNavLinks.forEach(link => {
            if (activePage === link.href) {
                link.classList.add("active");
                link.setAttribute('aria-current', 'page');
            }
        });

        const sidebarNavLinks = document.querySelectorAll(".adminuiux-sidebar .adminuiux-sidebar-inner .nav .nav-item .nav-link");
        sidebarNavLinks.forEach(link => {
            if (activePage === link.href) {
                link.classList.add("active");
                const dropdown = link.closest('.dropdown');
                if (dropdown) {
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                    if (dropdownMenu) dropdownMenu.classList.add('show');
                    if (dropdownToggle) dropdownToggle.classList.add('show');
                }
            }
        });

        const mobileFooterNavLinks = document.querySelectorAll(".adminuiux-mobile-footer .nav .nav-item .nav-link");
        mobileFooterNavLinks.forEach(link => {
            if (activePage === link.href) {
                link.classList.add("active");
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    window.setActivelink = setActivelink;

    //Sidebar
    function initSidebar() {
        //Open/Close sidebar
        if (windowswidth >= 992) {
            body.classList.toggle('sidebar-close');
        } else {
            body.classList.toggle('sidebar-open');
        }
    }
    window.initSidebar = initSidebar;

    // image cover ion background set
    function coverimg() {
        const coverImgs = document.querySelectorAll('.coverimg');
        coverImgs.forEach(coverImg => {
            const img = coverImg.querySelector('img');
            if (img) { // Check if the image exists
                coverImg.style.backgroundImage = `url(${img.src})`;
                img.style.display = 'none';
            }
        });
    }
    window.coverimg = coverimg;

    // drop down menu click dont close
    function dontclosedd() {
        const dropdownDontCloseElements = document.querySelectorAll('.dropdown-dontclose');
        dropdownDontCloseElements.forEach(dropdownDontClose => {
            dropdownDontClose.addEventListener('click', (event) => {
                const dropdownItems = dropdownDontClose.querySelectorAll('.dropdown-item');
                dropdownItems.forEach(item => item.classList.remove('show'));
                const dropdownMenus = dropdownDontClose.querySelectorAll('.dropdown-menu');
                dropdownMenus.forEach(menu => menu.classList.remove('show'));

                event.stopPropagation();

                const clickedItem = event.target.closest('.dropdown-item');
                if (clickedItem) {
                    clickedItem.classList.add('show');
                    const nextMenu = clickedItem.nextElementSibling;
                    if (nextMenu && nextMenu.classList.contains('dropdown-menu')) {
                        nextMenu.classList.add('show');
                    }
                }
            });

            dropdownDontClose.addEventListener('blur', (event) => {
                const dropdownItems = dropdownDontClose.querySelectorAll('.dropdown-item');
                dropdownItems.forEach(item => item.classList.remove('show'));
                const dropdownMenus = dropdownDontClose.querySelectorAll('.dropdown-menu');
                dropdownMenus.forEach(menu => menu.classList.remove('show'));
            });
        });
    }
    window.dontclosedd = dontclosedd;

    // copy code
    $('.copycode').on('click', function () {
        const thisEl = this;
        const text = $(this).addClass('active').prev().find('code').text();
        const elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = text;
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);
        setTimeout(() => thisEl.classList.remove('active'), 500);
    });

    //Scroll to top
    function scrollToTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    window.scrollToTop = scrollToTop;

    /* auto select mode */
    function autoThemeMode() {
        const runColorMode = (isDarkMode) => {
            document.documentElement.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
        };

        if (!window.matchMedia) return;

        const query = window.matchMedia('(prefers-color-scheme: dark)');
        runColorMode(query.matches);
        query.addEventListener('change', (event) => runColorMode(event.matches));
    }
    window.autoThemeMode = autoThemeMode;

    // Go back in history
    function goBack() {
        window.history.go(-1);
    }
    window.goBack = goBack;

    // Back to top
    function initBackToTop() {
        let backtotop = document.getElementById('backtotop');
        if (backtotop) {
            const pxShow = 300;
            const scrollSpeed = 1000;

            window.addEventListener('scroll', () => {
                const backToTop = document.getElementById("backtotop");
                if (window.scrollY >= pxShow) {
                    backToTop.classList.remove('d-none');
                } else {
                    backToTop.classList.add('d-none');
                }
            });

            backtotop.addEventListener('click', () => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            });
        }
    }
    window.initBackToTop = initBackToTop;

    // Customize Datatable (placeholder function)
    function customizeDatatable() { }
    window.customizeDatatable = customizeDatatable;

    // feather icons
    function featherjs() {
        feather.replace();
    }
    window.featherjs = featherjs;

    // bootstrap tooltips
    function bstooltip() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
    window.bstooltip = bstooltip;

    // swiper auto play no nav
    function swipernav() {
        const swiperElements = document.querySelectorAll('.swipernav');
        swiperElements.forEach(swiperElement => {
            new Swiper(swiperElement, {
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true,
                },
            });
        });
    }
    window.swipernav = swipernav;

    // swiper auto play nav
    function swipernavpagination() {
        const swiperElement = document.querySelector('.swipernavpagination');
        if (swiperElement) {
            new Swiper(swiperElement, {
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
            });
        }
    }
    window.swipernavpagination = swipernavpagination;


    // swiper gallery thumb nav
    function swipergallerythumbnav() {
        const swiperThumbElements = document.querySelectorAll('.swiperthumb');
        const swiperNavElements = document.querySelectorAll('.swiperthumbnav');

        swiperNavElements.forEach((swiperNavElement, index) => {
            if (swiperThumbElements[index]) {
                const swiperNav = new Swiper(swiperNavElement, {
                    spaceBetween: 16,
                    slidesPerView: 'auto',
                    freeMode: true,
                    watchSlidesProgress: true,
                    pagination: {
                        el: swiperNavElement.querySelector('.swiper-pagination'), // Target pagination within each swiper
                        type: 'bullets',
                    },
                });

                new Swiper(swiperThumbElements[index], {
                    spaceBetween: 0,
                    thumbs: {
                        swiper: swiperNav,
                    },
                });
            }
        });

    }
    window.swipergallerythumbnav = swipergallerythumbnav;

    // dropzone
    function mydropzone() {
        if (document.querySelector('.dropzone')) {
            window.Dropzone;
        }
    }
    window.mydropzone = mydropzone;

    // editor FroalaEditor
    function froalaeditor() {
        const froalaEditors = document.querySelectorAll('.FroalaEditor');
        froalaEditors.forEach(editorElement => {
            new FroalaEditor(editorElement);
        });
    }
    window.froalaeditor = froalaeditor;

    /* date picker calendar */
    function datepicker() {
        const datepickerElement = document.getElementById('datepicker');
        if (datepickerElement) {
            $(datepickerElement).daterangepicker({
                "singleDatePicker": true,
                "minYear": 1989,
                "autoApply": true,
                "linkedCalendars": false,
                "alwaysShowCalendars": true,
                "startDate": "19/03/2024",
                "endDate": "25/03/2024",
                "opens": "center",
                "buttonClasses": "btn",
                "drops": "auto",
                "locale": {
                    "format": 'DD/MM/YYYY'
                },
                "applyButtonClasses": "btn-theme",
                "cancelClass": "btn-light"
            });
        }
    }
    window.datepicker = datepicker;

    /* inline calendar */
    function inlinedatepicker() {
        const inlinewrap1 = document.getElementById('inlinewrap1');
        if (inlinewrap1) {
            $(inlinewrap1).daterangepicker({
                "singleDatePicker": true,
                "minYear": 2023,
                "autoApply": true,
                "linkedCalendars": false,
                "alwaysShowCalendars": true,
                "parentEl": ".inlinewrap1",
                "startDate": "19/03/2024",
                "endDate": "25/03/2024",
                "opens": "center",
                "buttonClasses": "btn",
                "drops": "up",
                "locale": {
                    "format": 'DD/MM/YYYY'
                },
                "applyButtonClasses": "btn-theme",
                "cancelClass": "btn-light"
            });

            /* inline calendar activate  */
            inlinewrap1.click();
        }
    }
    window.inlinedatepicker = inlinedatepicker;

    // date range picker
    function daterange() {
        const daterangepickerElement = document.getElementById('daterangepicker');
        if (daterangepickerElement) {
            $(daterangepickerElement).daterangepicker({
                "minYear": 2023,
                "autoApply": true,
                "linkedCalendars": false,
                "alwaysShowCalendars": true,
                "startDate": "19/05/2025",
                "endDate": "25/06/2025",
                "opens": "center",
                "buttonClasses": "btn",
                "drops": "down",
                "locale": {
                    "format": 'DD/MM/YYYY'
                },
                "applyButtonClasses": "btn-theme",
                "cancelClass": "btn-light"
            });
        }
    }
    window.daterange = daterange;

    // date range picker with predefined range
    function daterangeranges() {
        const daterangepickerrangesElement = document.querySelectorAll('.daterangepickerranges');
        if (daterangepickerrangesElement.length) {
            daterangepickerrangesElement.forEach(function (element) {
                $(element).daterangepicker({
                    "minYear": 2024,
                    "autoApply": false,
                    "linkedCalendars": false,
                    "alwaysShowCalendars": true,
                    "startDate": "19/05/2025",
                    "endDate": "25/06/2025",
                    "opens": "center",
                    "buttonClasses": "btn",
                    "drops": "down",
                    "locale": {
                        "format": 'DD/MM/YYYY'
                    },
                    "container": 'body',
                    "applyButtonClasses": "btn-theme",
                    "cancelClass": "btn-light",
                    "ranges": {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                });
            });
        }
    }
    window.daterangeranges = daterangeranges;

    function daterangerangesclass() {
        const daterangepickerrangesElement = document.querySelectorAll('.daterangepickers');
        if (daterangepickerrangesElement.length) {
            daterangepickerrangesElement.forEach(function (element) {
                $(element).daterangepicker({ // Keep jQuery for this plugin
                    "minYear": 2024,
                    "autoApply": false,
                    "linkedCalendars": false,
                    "alwaysShowCalendars": true,
                    "startDate": "19/05/2025",
                    "endDate": "25/06/2025",
                    "opens": "center",
                    "buttonClasses": "btn",
                    "drops": "down",
                    "locale": {
                        "format": 'DD/MM/YYYY'
                    },
                    "applyButtonClasses": "btn-theme",
                    "cancelClass": "btn-light",
                });
            })
        }
    }
    window.daterangerangesclass = daterangerangesclass;

    // dataTable global
    function dataTables() {
        const dataTableElement = document.getElementById('dataTable');
        if (dataTableElement) {
            $(dataTableElement).DataTable({
                searching: false,
                lengthChange: false,
                autoWidth: false,
                columnDefs: [{ orderable: false, targets: 4 }],
                order: [[0, 'desc']],
                pageLength: 6,
                responsive: true,
            });
            const tableRows = dataTableElement.querySelectorAll('.table tbody tr');

            tableRows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                cells.forEach(cell => cell.classList.remove('lastvisible')); // Remove class from all cells

                const visibleCells = cells.filter(cell => {
                    const computedStyle = window.getComputedStyle(cell);
                    return computedStyle.display !== 'none' &&
                        computedStyle.visibility !== 'hidden';
                });

                if (visibleCells.length > 0) {
                    visibleCells[visibleCells.length - 1].classList.add('lastvisible');
                }
            });
        }

    }
    window.dataTables = dataTables;

    function adjustDataTable() {
        const dataTableElement = document.getElementById('dataTable');
        if (dataTableElement) {
            const table = $(dataTableElement).DataTable(); // Keep jQuery for this plugin
            table.columns.adjust().draw();

            const tableRows = document.querySelectorAll('.table tbody tr');

            tableRows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                cells.forEach(cell => cell.classList.remove('lastvisible')); // Remove class from all cells

                const visibleCells = cells.filter(cell => {
                    const computedStyle = window.getComputedStyle(cell);
                    return computedStyle.display !== 'none' &&
                        computedStyle.visibility !== 'hidden';
                });

                if (visibleCells.length > 0) {
                    visibleCells[visibleCells.length - 1].classList.add('lastvisible');
                }
            });
        }
    }
    window.adjustDataTable = adjustDataTable;

    /* responsive last visible table cell after cell hides*/
    function lastVisibleTd() {
        const tableRows = document.querySelectorAll('.table tbody tr');

        tableRows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            cells.forEach(cell => cell.classList.remove('lastvisible')); // Remove class from all cells

            const visibleCells = cells.filter(cell => {
                const computedStyle = window.getComputedStyle(cell);
                return computedStyle.display !== 'none' &&
                    computedStyle.visibility !== 'hidden';
            });

            if (visibleCells.length > 0) {
                visibleCells[visibleCells.length - 1].classList.add('lastvisible');
            }
        });
    }

    window.lastVisibleTd = lastVisibleTd;

    /* pasword strength checker */
    function checkStrength(password, fieldpasswrap) {
        var strength = 0;
        var checksterngthdisplay = document.getElementById('checksterngthdisplay');
        var textpassword = document.getElementById('textpassword');

        if (password.length < 6 || password.length < 1) {
            checksterngthdisplay.className = "";
            checksterngthdisplay.classList.add('check-strength');
            checksterngthdisplay.classList.add('short');

            textpassword.className = "";
            textpassword.classList.add('text-secondary');
            textpassword.classList.add('small');
            return 'Too short'
        }
        if (password.length > 7) strength += 1
        // If password contains both lower and uppercase characters, increase strength value.  
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        // If it has numbers and characters, increase strength value.  
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        // If it has one special character, increase strength value.  
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // If it has two special characters, increase strength value.  
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Calculated strength value, we can return messages  
        // If value is less than 2  
        if (strength < 2) {
            checksterngthdisplay.className = "";
            checksterngthdisplay.classList.add('check-strength');
            checksterngthdisplay.classList.add('weak');

            textpassword.className = "";
            textpassword.classList.add('text-danger');
            textpassword.classList.add('small');

            fieldpasswrap.classList.remove('is-valid');
            return 'This is a weak';
        } else if (strength == 2) {
            checksterngthdisplay.className = "";
            checksterngthdisplay.classList.add('good');
            checksterngthdisplay.classList.add('check-strength');

            textpassword.className = "";
            textpassword.classList.add('text-warning');
            textpassword.classList.add('small');

            fieldpasswrap.classList.remove('is-valid');
            return 'This is a good';
        } else {
            checksterngthdisplay.className = "";
            checksterngthdisplay.classList.add('strong');
            checksterngthdisplay.classList.add('check-strength');

            textpassword.className = "";
            textpassword.classList.add('text-success');
            textpassword.classList.add('small');

            fieldpasswrap.classList.add('is-valid');
            return 'Wow! Its a strong';
        }
    }
    window.checkStrength = checkStrength;

    /* passsword strength checker */
    function checkstrength() {
        const checkstrengthElement = document.getElementById('checkstrength');

        if (checkstrengthElement) {
            checkstrengthElement.addEventListener('keyup', function () {
                const fieldpass = this;
                const fieldpasswrap = fieldpass.closest('.form-floating').parentElement;
                const feedbackText = checkStrength(fieldpass.value, fieldpasswrap);
                const textPassword = document.getElementById('textpassword');
                textPassword.innerHTML = feedbackText;

                const invalidFeedback = fieldpasswrap.nextElementSibling.classList;
                if (fieldpass.value) {
                    invalidFeedback.remove('show'); // Hide invalid feedback
                } else {
                    invalidFeedback.add('show'); // Show invalid feedback
                    textPassword.innerHTML = '';
                }

                // Update validity class based on strength (can be improved)
                fieldpasswrap.classList.remove('is-valid');
            });
        }
    }
    window.checkstrength = checkstrength;

    /* toggle view password  */
    function toggleview() {
        const viewpasswordElements = document.querySelectorAll('.viewpassword');
        viewpasswordElements.forEach(function (viewpassword) {
            viewpassword.addEventListener('click', function () {
                const passwordInput = this.closest('.input-group').querySelector('.password');
                if (this.classList.contains('active')) {
                    passwordInput.type = 'password';
                    this.classList.remove('active');
                } else {
                    passwordInput.type = 'text';
                    this.classList.add('active');
                }
            });
        });
    }

    window.toggleview = toggleview;

    /* increamenter */
    function increamenter() {
        const increamenterElements = document.querySelectorAll('.increamenter');
        increamenterElements.forEach(function (increamenter) {
            const elValue = increamenter.querySelector('.increamenter-value');
            let value = parseInt(elValue.value);

            const addButton = increamenter.querySelector('.increamenter-add');
            addButton.addEventListener('click', function (event) {
                event.preventDefault();
                value++;
                elValue.value = value;
            });

            const removeButton = increamenter.querySelector('.increamenter-remove');
            removeButton.addEventListener('click', function (event) {
                event.preventDefault();
                if (value > 0) {
                    value--;
                    elValue.value = value;
                    removeButton.disabled = false;
                } else {
                    removeButton.disabled = true;
                }
            });
        });
    }
    window.increamenter = increamenter;

    /* inner sidebar close */
    function innersidebar() {
        document.body.classList.toggle('innermenu-close');
    }
    window.innersidebar = innersidebar;

    /* header h padding top*/
    function headerpaddingTop() {
        const headerPtElements = document.querySelectorAll('.header-pt');
        headerPtElements.forEach(function (headerPt) {
            const header = document.querySelector('header.adminuiux-header > .navbar');
            if (header) {
                headerPt.style.top = header.offsetHeight + 'px';
            }
        });
    }
    window.headerpaddingTop = headerpaddingTop;

    /* bootstrap popover  */
    function bspopover() {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    }
    window.bspopover = bspopover;

    /* bootstrap toast message */
    function bstoast() {
        const toastElList = document.querySelectorAll('.toast')
        const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))
    }
    window.bstoast = bstoast;

    /* Range Customize */
    function range2() {
        const rangeEle = document.querySelector("#range2")
        const rangeValue = document.querySelector(".value2")

        rangeEle.addEventListener("input", (event) => {
            const temprangeValue = event.target.value;
            rangeValue.textContent = temprangeValue;

            const progress = (temprangeValue / rangeEle.max) * 100;

            rangeEle.style.background = `linear-gradient(to right, var(--adminuiux-theme-1) ${progress}%, var(--adminuiux-bg-1) ${progress}%)`;
        })
    }
    window.range2 = range2;

    // 2
    function range3() {
        const rangeEle3 = document.querySelector("#range3")
        const rangeValue3 = document.querySelector(".value3")

        rangeEle3.addEventListener("input", (event) => {
            const temprangeValue = Number(event.target.value);

            rangeValue3.textContent = temprangeValue;

            const progress = (temprangeValue / rangeEle3.max) * 100;

            rangeEle3.style.background = `linear-gradient(to right, var(--adminuiux-theme-1) ${progress}%, var(--adminuiux-bg-1) ${progress}%)`;

            rangeEle3.style.setProperty("--thumb-rotate", `${(temprangeValue / 100) * 2160}deg`)
        })
    }
    window.range3 = range3;

    // 2
    function range4() {
        const rangeEle4 = document.querySelector("#range4")
        const rangeValue4 = document.querySelector(".value4")

        rangeEle4.addEventListener("input", (event) => {
            const temprangeValue = event.target.value;
            rangeValue4.textContent = temprangeValue;

            const progress = (temprangeValue / rangeEle4.max) * 100;

            rangeEle4.style.background = `linear-gradient(to right, var(--adminuiux-theme-1) ${progress}%, var(--adminuiux-bg-1) ${progress}%)`;
        })
    }
    window.range4 = range4;

    // Convert the first block to vanilla JS
    const rangeValueElements = document.querySelectorAll('.rangevalue');
    rangeValueElements.forEach(range => {
        const targetInputId = range.getAttribute('data-value');
        const targetInput = document.getElementById(targetInputId);

        // Initial synchronization
        targetInput.value = range.value;

        range.addEventListener('mousemove', () => {
            targetInput.value = range.value;
        });
    });

    // Convert the second block to vanilla JS
    const rangeValuesElements = document.querySelectorAll('.rangevalues');
    rangeValuesElements.forEach(range => {
        const targetInputSelector = `[data-value="${range.id}"]`;
        const targetInputs = document.querySelectorAll(targetInputSelector);

        range.addEventListener('change', () => {
            targetInputs.forEach(input => {
                input.value = range.value;
            });
        });
    });

    // swipe to unlock
    function swipetounlock() {
        const unlockRanges = document.querySelectorAll('.unlockrange');
        unlockRanges.forEach(unlockRange => {
            unlockRange.addEventListener('input', () => {
                if (unlockRange.value > 90) {
                    unlockRange.value = '100';
                    unlockRange.closest('.swipeunlock').classList.add('unlocked');
                    unlockRange.closest('.swipeunlock').classList.remove('locked');
                } else if (unlockRange.value < 15) {
                    unlockRange.value = '0';
                    unlockRange.closest('.swipeunlock').classList.remove('unlocked');
                    unlockRange.closest('.swipeunlock').classList.add('locked');
                } else {
                    unlockRange.closest('.swipeunlock').classList.remove('unlocked');
                    unlockRange.closest('.swipeunlock').classList.add('locked');
                }
            });
        });
    }
    window.swipetounlock = swipetounlock;

    // selectable
    function selectable() {
        const selectableElements = document.querySelectorAll('.selectable');
        selectableElements.forEach(element => {
            element.addEventListener('click', () => {
                if (element.classList.contains('anyone')) {
                    selectableElements.forEach(otherElement => {
                        otherElement.classList.remove('active');
                    });
                    element.classList.add('active');
                } else {
                    element.classList.toggle('active');
                }
            });
        });
    }
    window.selectable = selectable;

    // page is in iframe 
    function isinframe() {
        if (self !== top) {
            body.classList.add('adminuiux-in-iframe');
        } else {
            body.classList.remove('adminuiux-in-iframe');
        }
    }
    window.isinframe = isinframe;


    // chosen general upto 3 
    function chosenselect() {
        const choicesElement = document.querySelectorAll('.choices');
        if (choicesElement) {
            choicesElement.forEach(function (element) {
                const choices = new Choices(element, {
                    maxItemCount: 3,
                    removeItems: true,
                    removeItemButton: true,
                    itemSelectText: 'Select',
                    classNames: {
                        containerOuter: ['choices', 'maxwidth-dynamic'],
                    }
                });
            });
        }
    }
    window.chosenselect = chosenselect;


    // spotlight js photo gallery 
    function gallerySpotlight() {
        var gallaryElement = document.querySelector('.spotlight-group');
        if (gallaryElement) {
            Spotlight.show(gallery /*, options */);
        }
    }
    // vector map world
    function jsvectormaps() {
        const worldMapElement = document.getElementById('jsvectormap');
        if (worldMapElement) {
            const map = new jsVectorMap({
                regionStyle: {
                    initial: {
                        fill: 'rgba(0, 73, 232, 0.15)',
                        stroke: 'rgba(0, 73, 232, 0.4)',
                        strokeWidth: 1,
                    },
                },
                visualizeData: {
                    scale: ['#f3faff', '#0049e8'],
                    values: {
                        AF: 16.63, AL: 11.58, DZ: 158.97, AO: 85.81, AG: 1.1, AR: 351.02, AM: 8.83, AU: 1219.72, AT: 366.26, AZ: 52.17, BS: 7.54, BH: 21.73, BD: 105.4, BB: 3.96, BY: 52.89, BE: 461.33, BZ: 1.43, BJ: 6.49, BT: 1.4, BO: 19.18, BA: 16.2, BW: 12.5, BR: 2023.53, BN: 11.96, BG: 44.84, BF: 8.67, BI: 1.47, KH: 11.36, CM: 21.88, CA: 1563.66, CV: 1.57, CF: 2.11, TD: 7.59, CL: 199.18, CN: 5745.13, CO: 283.11, KM: 0.56, CD: 12.6, CG: 11.88, CR: 35.02, CI: 22.38, HR: 59.92, CY: 22.75, CZ: 195.23, DK: 304.56, DJ: 1.14, DM: 0.38, DO: 50.87, EC: 61.49, EG: 216.83, SV: 21.8, GQ: 14.55, ER: 2.25, EE: 19.22, ET: 30.94, FJ: 3.15, FI: 231.98, FR: 2555.44, GA: 12.56, GM: 1.04, GE: 11.23, DE: 3305.9, GH: 18.06, GR: 305.01, GD: 0.65, GT: 40.77, GN: 4.34, GW: 0.83, GY: 2.2, HT: 6.5, HN: 15.34, HK: 226.49, HU: 132.28, IS: 12.77, IN: 1430.02, ID: 695.06, IR: 337.9, IQ: 84.14, IE: 204.14, IL: 201.25, IT: 2036.69, JM: 13.74, JP: 5390.9, JO: 27.13, KZ: 129.76, KE: 32.42, KI: 0.15, KR: 986.26, KW: 117.32, KG: 4.44, LA: 6.34, LV: 23.39, LB: 39.15, LS: 1.8, LR: 0.98, LY: 77.91, LT: 35.73, LU: 52.43, MK: 9.58, MG: 8.33, MW: 5.04, MY: 218.95, MV: 1.43, ML: 9.08, MT: 7.8, MR: 3.49, MU: 9.43, MX: 1004.04, MD: 5.36, MN: 5.81, ME: 3.88, MA: 91.7, MZ: 10.21, MM: 35.65, NA: 11.45, NP: 15.11, NL: 770.31, NZ: 138, NI: 6.38, NE: 5.6, NG: 206.66, NO: 413.51, OM: 53.78, PK: 174.79, PA: 27.2, PG: 8.81, PY: 17.17, PE: 153.55, PH: 189.06, PL: 438.88, PT: 223.7, QA: 126.52, RO: 158.39, RU: 1476.91, RW: 5.69, WS: 0.55, ST: 0.19, SA: 434.44, SN: 12.66, RS: 38.92, SC: 0.92, SL: 1.9, SG: 217.38, SK: 86.26, SI: 46.44, SB: 0.67, ZA: 354.41, ES: 1374.78, LK: 48.24, KN: 0.56, LC: 1, VC: 0.58, SD: 65.93, SR: 3.3, SZ: 3.17, SE: 444.59, CH: 422.44, SY: 59.63, TW: 426.98, TJ: 5.58, TZ: 22.43, TH: 312.61, TL: 0.62, TG: 3.07, TO: 0.3, TT: 21.2, TN: 43.86, TR: 729.05, TM: 0, UG: 17.12, UA: 136.56, AE: 239.65, GB: 2258.57, US: 1462.18, UY: 40.71, UZ: 37.72, VU: 0.72, VE: 285.21, VN: 101.99, YE: 30.02, ZM: 15.69, ZW: 5.57
                    },
                },
                selector: worldMapElement,
                map: 'world',

            })
        }
    }
    window.jsvectormaps = jsvectormaps;

});