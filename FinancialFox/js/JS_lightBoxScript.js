// JavaScript source code
// Code that determines what fancybox does for the portfolio app

if($(window).width() <= 375){
 $(".fancybox_portfolio").fancybox({
    autoDimensions: false,
    padding      : 0,
    margin: 0,
    width        : '100%',
//    height       : '100%',
    autoScale     : false,
    fitToView : true,
    autoSize : false,
    transitionIn  : 'none',
    transitionOut : 'none',
    type: 'iframe',
    title: null,
    helpers: {
        overlay: { 'closeClick': true }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
});
 
}
else if($(window).width() < 992){
 $(".fancybox_portfolio").fancybox({
    autoDimensions: false,
    padding      : 0,
    width        : '100%',
    height       : '620',
    autoScale     : false,
    fitToView : true,
    autoSize : false,
    transitionIn  : 'none',
    transitionOut : 'none',
    type: 'iframe',
//    padding: 1,
    title: null,
    helpers: {
        overlay: { 'closeClick': false }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
});
 
}
else{ $(".fancybox_portfolio").fancybox({
    autoDimensions: false,
    padding      : 0,
    width        : '100%',
    height       : '100%',
	 maxHeight   : 900,
    autoScale     : false,
    fitToView : false,
    autoSize : false,
    transitionIn  : 'none',
    transitionOut : 'none',
    type: 'iframe',
//    padding: 1,
    title: null,
    helpers: {
        overlay: { 'closeClick': false }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
 });
}
// -------------------------------------------------------
// ^^ END OF Portfolio Portion ^^
// -------------------------------------------------------


// JavaScript source code
$(document).ready(function () {
    $(".fancybox2").fancybox({
        type: 'image',
        width: '930px',
        height: '700px',
        transitionIn: 'none',
        transitionOut: 'none',
        type: 'iframe',
        padding: 0,
        title: null,
        wrapCSS: 'fancybox2', 
        helpers: {
            overlay: { 'closeClick': false
        }},

        keys: {
            close: null //prevent ESC from closing it
        },
        afterShow: function () {
            $(".fancybox2-close").unbind();
            $(".fancybox2-close").click(function () { // create own click event
                sweetAlert({
                    title: "Are You Sure You want to Close?",
                    text: "All your data will be lost.",
                    confirmButtonText: "Yes, Exit.",
                    showCancelButton: true,
                    type: "warning",
                },
                   function () {
                       $.fancybox2.close();
                   });
            });
        }
    });
});


$(".fancybox_FuelSavings").fancybox({
    //type: 'image',
    width: "900",
    height: "810",
    transitionIn: 'none',
    transitionOut: 'none',
    type: 'iframe',
    padding: 1,
    title: null,
    helpers: {
        overlay: { 'closeClick': false }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
});

$(".fancybox_ContactUs").fancybox({
    height: '400px',
    width: '450px',
    transitionIn: 'none',
    transitionOut: 'none',
    type: 'iframe',
    padding: 1,
    title: null,
    wrapCSS: 'fancybox_ContactUs',
    helpers: {
        overlay: { 'closeClick': false }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
});


if($(window).width() < 992){
 $(".fancybox_offer").fancybox({
    autoDimensions: false,
    padding      : 0,
    width        : '100%',
    height       : '100%',
	maxHeight :700,
	maxWidth: 625,
    autoScale     : false,
    fitToView : true,
    autoSize : true,
    transitionIn  : 'none',
    transitionOut : 'none',
    type: 'iframe',
//    padding: 1,
    title: null,
    helpers: {
        overlay: { 'closeClick': false }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
});
 
}
else{
  $(".fancybox_offer").fancybox({
      autoDimensions: false,
      padding      : 0,
      width        : '100%',
      height       : '100%',
	  // maxWidth: 706,
	  //maxHeight: 600,
      autoScale     : false,
      fitToView : false,
      autoSize : false,
      transitionIn  : 'none',
      transitionOut : 'none',
      type: 'iframe',
  //    padding: 1,
      title: null,
      helpers: {
          overlay: { 'closeClick': false }
      },
      keys: {
          close: null //prevent ESC from closing it
      },
      afterShow: function () {
          $(".fancybox-close").unbind();
          $(".fancybox-close").click(function () { // create own click event
              sweetAlert({
                  title: "Are You Sure You want to Close?",
                  text: "All your data will be lost.",
                  confirmButtonText: "Yes, Exit.",
                  showCancelButton: true,
                  type: "warning",
              },
                 function () {
                     $.fancybox.close();
                 });
          });
      }
  });  
}

if($(window).width() < 375){
 $(".fancybox_tfsa").fancybox({
    autoDimensions: false,
    padding      : 0,
    margin: 0,
    width        : '100%',
//    height       : '100%',
    autoScale     : false,
    fitToView : true,
    autoSize : false,
    transitionIn  : 'none',
    transitionOut : 'none',
    type: 'iframe',
    title: null,
    helpers: {
        overlay: { 'closeClick': true }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
});
 
}
else if($(window).width() < 992){
 $(".fancybox_tfsa").fancybox({
    autoDimensions: false,
    padding      : 0,
    width        : '100%',
//    height       : '100%',
    autoScale     : false,
    fitToView : true,
    autoSize : true,
    transitionIn  : 'none',
    transitionOut : 'none',
    type: 'iframe',
//    padding: 1,
    title: null,
    helpers: {
        overlay: { 'closeClick': false }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
});
 
}
else{ $(".fancybox_tfsa").fancybox({
    autoDimensions: false,
    padding      : 0,
    width        : '100%',
    height       : '100%',
	maxHeight   : 900,
    autoScale     : false,
    fitToView : false,
    autoSize : false,
    transitionIn  : 'none',
    transitionOut : 'none',
    type: 'iframe',
//    padding: 1,
    title: null,
    helpers: {
        overlay: { 'closeClick': false }
    },
    keys: {
        close: null //prevent ESC from closing it
    },
    afterShow: function () {
        $(".fancybox-close").unbind();
        $(".fancybox-close").click(function () { // create own click event
            sweetAlert({
                title: "Are You Sure You want to Close?",
                text: "All your data will be lost.",
                confirmButtonText: "Yes, Exit.",
                showCancelButton: true,
                type: "warning",
            },
               function () {
                   $.fancybox.close();
               });
        });
    }
 });
}
