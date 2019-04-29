(function($) {
    "use strict";

    $(document).ready(function() {

        /*=========================================================================
         ===  DYNAMIC SITE PATH
         ========================================================================== */

        var csi_path = window.location.protocol + '//' + window.location.host;
        var pathArray = window.location.pathname.split('/');
        for (var i = 1; i < (pathArray.length - 1); i++) {
            csi_path += '/';
            csi_path += pathArray[i];
        }

        /*=========================================================================
         ===  // SITE PATH END
         ========================================================================== */


        /*=========================================================================
         ===  MENU SCROLL FIXED
         ========================================================================== */
        var s = $(".csi-header-bottom");
        var pos = s.position();

        $(window).on('scroll', function () {
            var windowpos = $(window).scrollTop();
            if (windowpos >= pos.top) {
                s.addClass("menu-onscroll");
            } else {
                s.removeClass("menu-onscroll");
            }
        });
        /*=========================================================================
         ===  MENU SCROLL FIXED END
         ========================================================================== */


        /*=========================================================================
         ===  HOME PAGE Slider
         ========================================================================== */
        var csiMainSlider = $("#csi-main-slider");
        if (csiMainSlider.length) {
            csiMainSlider.owlCarousel({
                margin: 0,
                items: 1,
                loop: true,
                autoplay:true,
                dots: false,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                autoplayTimeout: 5000,
                autoplaySpeed: 500,
                nav: true,
                addClassActive : true
            });
        }
        /*=========================================================================
         ===  HOME PAGE Slider END
         ========================================================================== */



        /*=========================================================================
         ===  Achievments SLIDER
         ========================================================================== */
        var csiOwlachievments = $('#csi-owlachievments');
        if (csiOwlachievments.length) {
            csiOwlachievments.owlCarousel({
                margin: 0,
                items: 1,
                loop: true,
                autoplay:true,
                dots: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                autoplayTimeout: 5000,
                autoplaySpeed: 500,
                nav: true,
                addClassActive : true
            });
        }
        /*=========================================================================
         ===  Achievments SLIDER END
         ========================================================================== */


        /*=========================================================================
         ===  COUNTER START
         ========================================================================== */
        var csiCounter = $('.csi-counter');
        if (csiCounter.length) {
            csiCounter.counterUp({
                delay: 10,
                time: 5000
            });
        }
        /*=========================================================================
         ===  COUNTER END
         ========================================================================== */


        /*=========================================================================
         ===  magnific popup
         ========================================================================== */
        $('#csi-gallery').magnificPopup({
            delegate: '.csi-single a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery: {
                enabled: true
            },
            image: {
                titleSrc: 'title'
            }
            // other options
        });
        /*=========================================================================
         ===  magnific popup END
         ========================================================================== */



        /*=========================================================================
         ===  SMOOTH SCROLL - REQUIRES JQUERY EASING PLUGIN
         ========================================================================== */

        $( 'a.csi-scroll' ).on( 'click', function(event) {
            var $anchor = $(this);
            var topTo   = $( $anchor.attr('href') ).offset().top;

            if ( window.innerWidth < 768 ) {
                topTo = ( topTo - 90 );
            }

            $( 'html, body' ).stop().animate({
                scrollTop: topTo
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
            return false;
        } );

        /*=========================================================================
         ===  SMOOTH SCROLL - REQUIRES JQUERY EASING PLUGIN END
         ========================================================================== */





        /*=========================================================================
         ===  GOOGLE MAP
         ========================================================================== */
        if (typeof google != 'undefined') {
            //for Default  map
            var mapCanvasDefault = $('.map-canvas-default');
            if (mapCanvasDefault.length) {
                mapCanvasDefault.googleMap({
                    zoom: 8, // Initial zoom level (optiona
                    coords: [40.7127, 74.0059], // Map center (optional)
                    type: "ROADMAP", // Map type (optional),
                    mouseZoom: false
                });

                //for marker
                mapCanvasDefault.addMarker({
                    coords: [40.7127, 74.0059], // GPS coords
                    title: 'PoliticX',
                    text: '121 King St, Melbourne VIC 3000, Australia',
                    icon: csi_path + '/assets/img/map/map-icon.png'
                });
            }

            // FOR DARK MAP
            if (mapCanvasDefault.length) {
                mapCanvasDefault.googleMap({
                    zoom: 8, // Initial zoom level (optiona
                    coords: [40.7127, 74.0059], // Map center (optional)
                    type: "HYBRID", // Map type (optional),
                    mouseZoom: false
                });

                //for marker
                mapCanvasDefault.addMarker({
                    coords: [40.7127, 74.0059], // GPS coords
                    title: 'PoliticX',
                    text: '121 King St, Melbourne VIC 3000, Australia',
                    icon: csi_path + '/assets/img/map/map-icon.png'
                });
            }
        }

        /*=========================================================================
         ===  //GOOGLE MAP END
         ========================================================================== */


        /*=========================================================================
         ===  Start Contact Form Validation And Ajax Submission
         ========================================================================== */

        var alertInterval;//store the timeout interval ID

        //clear interval for alert message window
        $('#csi-form-modal').on('hide.bs.modal', function (ev) {
            clearInterval(alertInterval);
        });

        var $contactForm = $('form.csi-contactform');
        $contactForm.validate({
            submitHandler: function (form) {
                //console.log(form);
                var $form = $(form);
                //console.log($form.serialize());
                $.ajax({
                    url: csi_path + '/assets/php/contact.php',
                    type: 'post',
                    data: $form.serialize(),
                    beforeSubmit: function (argument) {
                        //ajax loading icon
                    },
                    success: function (ajaxResponse) {
                        try {
                            var ajaxResponse = $.parseJSON(ajaxResponse);
                            if (ajaxResponse.error) {
                                //for field error
                                //console.log(ajaxResponse.error_field);
                                for (var i = 0; i < ajaxResponse.error_field.length; i++) {
                                    if ($('p#' + ajaxResponse.error_field[i] + '-error').length) {
                                        $('p#' + ajaxResponse.error_field[i] + '-error').text(ajaxResponse.message[ajaxResponse.error_field[i]]);
                                    } else {
                                        $('#' + ajaxResponse.error_field[i]).after('<p id="' + ajaxResponse.error_field[i] + '-error" class="help-block">' + ajaxResponse.message[ajaxResponse.error_field[i]] + '</p>');
                                    }
                                }

                            } else {
                                $('.csi-form-msg').removeClass('alert-danger').addClass('alert-success').text(ajaxResponse.message);
                                $('#csi-form-modal').modal('show');
                                alertInterval = setInterval(function () {
                                    $('#csi-form-modal').modal('hide');
                                }, 5000);
                                $form[0].reset();
                            }
                        } catch (e) {
                            $('.csi-form-msg').removeClass('alert-success').addClass('alert-danger').text('Sorry, we are failed to contact with you. Please reload the page and try again.');
                            $('#csi-form-modal').modal('show');
                            alertInterval = setInterval(function () {
                                $('#csi-form-modal').modal('hide');
                            }, 5000);
                        }
                    },
                    error: function (argument) {
                        $('.csi-form-msg').removeClass('alert-success').addClass('alert-danger').text('Sorry, we can not communicate with you. Please make sure you are connected with internet.');
                        $('#csi-form-modal').modal('show');
                        alertInterval = setInterval(function () {
                            $('#csi-form-modal').modal('hide');
                        }, 5000);
                    },
                    complete: function () {

                    }
                });

                return false;
            },
            errorElement: 'p',
            errorClass: 'help-block',
            rules: {
                'csiname': {
                    required: true,
                    minlength: 3
                },

                'csiemail': {
                    required: true,
                    email: true
                },

                'csisubject': {
                    required: true,
                    minlength: 5
                },

                'csimessage': {
                    required: true,
                    minlength: 5
                }
            }
        });

        /*=========================================================================
         ===  Start Contact Form Validation And Ajax Submission END
         ========================================================================== */

    });//DOM READY


})(jQuery);




