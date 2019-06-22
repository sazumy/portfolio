$(document).ready(function(){
  $(".scroll-top-btn").each(function(){

    var $el = $(scrollableElement('html', 'body'));

    $(".scroll-top-btn").on('click', function(e){
      e.preventDefault();
      $($el).animate({ scrollTop: 0}, 300);
    });

    // scrollTop が利用できる要素を検出する関数
    // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links#update4
    function scrollableElement (elements) {
      var i, len, el, $el, scrollable;
      for (i = 0, len = arguments.length; i < len; i++) {
        el = arguments[i],
        $el = $(el);
        if ($el.scrollTop() > 0) {
          return el;
        } else {
          $el.scrollTop(1);
          scrollable = $el.scrollTop() > 0;
          $el.scrollTop(0);
          if (scrollable) {
            return el;
          }
        }
      }
      return [];
    }

  });
});
