/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire, audiojs*/

(function($) {
  var iScrollPos = 0;

  // Ajax Pagination by taxonomy term
  var pagination_ajax_loadmore = function() {
    var parent_ajax = $(this).parents('.ajax-loadmore-pagination');

    if ( parent_ajax.hasClass('pager-unvisible') ) {
      return false;
    }

    var post_type = parent_ajax.find('input[name="post_type"]').val();
    var taxonomy = parent_ajax.find('input[name="taxonomy"]').val();
    var term_id = parent_ajax.find('input[name="term_id"]').val();
    var current_posts_id = parent_ajax.find('input[name="current_posts_id"]').val();
    var more_items = parent_ajax.find('input[name="more_items"]').val();
    var max_items = parent_ajax.find('input[name="max_items"]').val();
    var list_result = parent_ajax.find('input[name="list_result"]').val();

    $.ajax({
      type : "post",
      dataType : "json",
      url : themeAjax.ajaxurl,
      data : {
        action: "pager_loadmore_by_term",
        post_type: post_type,
        taxonomy: taxonomy,
        term_id: term_id,
        current_posts_id: current_posts_id,
        max_items: max_items,
        more_items: more_items,
        list_result: list_result
      },
      beforeSend: function() {
        //parent_views.find('.load-views').empty();
        parent_ajax.find('.ajax-loadmore-pagination-inner').append('<span class="ajax-load-icon"></span>');
      },
      success: function(response) {
        parent_ajax.find('.ajax-load-icon').remove();
        $(list_result).append(response.markup);
        parent_ajax.find('input[name="current_posts_id"]').val(response.post_ids);
        parent_ajax.addClass(response.pager_class);
        //console.log(response.post_ids);
      },
      error: function(response) {
        console.log('error');
      }
    });

    return false;
  }

  // Swich when web loading on mobile or small device
  function mobileMenu() {
    $(this).toggleClass('open');
    $('body').toggleClass('cover-overflow');
    $('.main-menu').toggleClass('menu-show');
  }

  function mobileMenuClose() {
    $('body').removeClass('cover-overflow');
    $('.main-menu').removeClass('menu-show');
    $('.js-toogle--menu').removeClass('open');
  }

  // Back to Top
  function backToTopShow() {
    var height_show = $('.header-full').outerHeight(true);

    if ($(this).scrollTop() > height_show) {
      $('.js-back-top').addClass('btn-show');
    } else {
      $('.js-back-top').removeClass('btn-show');
    }
  }

  function backToTop() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }

  // Scroll Down
  function scrollDown() {
    var height_scroll = $('.header-full').outerHeight(true);

    $("html, body").animate({ scrollTop: height_scroll }, 600);
  }

  // Counter up
  function counterUp() {
    $('.js-count-up').counterUp({
      delay: 5,
      time: 1000
    });
  }

  // Change Style Quantity input
  function productQiantity() {
    // This button will increment the value
    $('[data-quantity="plus"]').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal) && currentVal > 0) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);
        }
    });
    // This button will decrement the value till 0
    $('[data-quantity="minus"]').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 1) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);
        }
    });
  }

  function quantityStyle($name) {
    $($name).wrap('<div class="group-quantity" />');
    $($name).before('<span data-quantity="minus" class="quantity-minus qty-control" data-field="quantity">-</span>');
    $($name).after('<span data-quantity="plus" class="quantity-plus qty-control" data-field="quantity">+</span>');
    productQiantity();
  }

  // Slick slider override product detail
  function productGallerySlider() {
    $('.single-product-details .wpgis-slider-for').slick('slickSetOption', {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      //adaptiveHeight: true,
      infinite: true
    }, true);
    $('.single-product-details .wpgis-slider-nav').slick('slickSetOption', {
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      infinite: true,
      arrows: false
    }, true);
    $('.single-product-details .wpgis-slider-for, .single-product-details .wpgis-slider-nav').slick('refresh');
  }

  /* ==================================================================
   *
   * Loading Jquery
   *
   ================================================================== */
  $(document).ready(function() {
    //console.log(PythagorasEquirectangular(20.999591499999998, 105.8404626, 21.6074228, 105.8395769));

    // Call to function
    $('.js-toogle--menu').on('click', mobileMenu);
    $('.js-close--menu').on('click', mobileMenuClose);
    //$('.js-back-top').on('click', backToTop);
    $('.js-scroll-down').on('click', scrollDown);

    counterUp();

    $('.news-slide').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    $('.block-testimonials-slider').slick({
      adaptiveHeight: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      slidesToShow: 1,
      speed: 300
    });

    $('.block-partner-slider').slick({
      adaptiveHeight: true,
      arrows: false,
      //autoplay: true,
      //autoplaySpeed: 3000,
      dots: true,
      slidesToShow: 1,
      speed: 300,
      slidesPerRow: 3,
      rows: 2,
    });

    $('.news-slide .slide-item .archive-item-inner').matchHeight({property: 'min-height'});
    $('.blog-posts .archive-list .archive-item-inner').matchHeight({property: 'min-height'});
    $('.block-products li.product a.woocommerce-loop-product__link').matchHeight({property: 'min-height'});
    $('.archive-list .archive-post-item .post-title').matchHeight({property: 'min-height'});
    quantityStyle('.cart .quantity input[name="quantity"]');
    productGallerySlider();
    $('.ajax-loadmore-pagination a').on('click', pagination_ajax_loadmore);
    $('.fancybox-viewmap').fancybox();

    var image = document.getElementsByClassName('paralax-image');
    new simpleParallax(image, {
      scale: 1.4
    });

    // Custom for form nop ho so
    $('.form-group-recruit .form-item').each(function(index){
      var val_return = $(this).find('input[type="hidden"]').val();
      $(this).find('> label').after('<span class="value-return">' + val_return + '</span>')
    });

    $( 'body' ).on( 'added_to_cart', function( e, fragments, cart_hash, this_button ) {
      $cart_count = $('.block-navigation .cart-icon .cart-count').text();

      $.ajax({
        type : "post",
        dataType : "json",
        url : themeAjax.ajaxurl,
        data : {
          action: "notice_add_to_cart",
          product_id: this_button['context']['dataset']['product_id']
        },
        beforeSend: function() {},
        success: function(response) {
          $('.block-navigation .cart-icon .cart-count').text(parseInt($cart_count) + 1);

          $('.page-wrapper').append('<div id="notice-add-to-cart" class="woocommerce-message">' + response.markup + '</div>');

          setTimeout(function() {
            $("#notice-add-to-cart").remove();
          }, 3000);
        },
        error: function(response) {
          console.log('error');
        }
      });
    });
  });

  $(window).scroll(function() {
    backToTopShow();
  });

  $(window).load(function() {
    // Call to function
  });

  $(window).resize(function() {
    // Call to function
  });

})(jQuery);