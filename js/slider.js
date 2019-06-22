$(document).ready(function(){
// 関数の定義--------------------------
  var $container = $('.slideshow'),
  $slideGroup = $container.find('.slideshow-slides'),
  $slides = $slideGroup.find('.slide'),
  $nav = $container.find('.slideshow-nav'),
 
  slideCount = $slides.length,
  indicatorHtml = '',
  currentIndex = 0,
  duration = 200,
  easing = 'linear';

  // 各スライドの位置を決定.インジケーターを生成-----------------//
  $slides.each(function(i){
    $(this).css({left: 280 * i + 'px'});
  });


  // 任意のスライドを表示する関数-----------------------------//

  function goToSlide(index){
    $slideGroup.animate({ left: -280 * index + 'px' },
      duration, easing);

      currentIndex = index;
      updateNav();
    }
  
  // ナビゲーターの値を更新する関数----------------------------//

    function updateNav (){
      var $navPrev = $nav.find('.prev'),
      $navNext = $nav.find('.next');

      if(currentIndex === 0){
        $navPrev.addClass('disabled');
      } else {
        $navPrev.removeClass('disabled');
      };

      if(currentIndex === slideCount -1){
        $navNext.addClass('disabled');
      } else {
        $navNext.removeClass('disabled');
      };
    }

  // ナビゲーターのリンクがクリックされたら該当するスライドを表示-----------------//
    $nav.on('click', 'a', function(e){
      e.preventDefault();
      if ($(this).hasClass('prev')){
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex+ 1);
      }
    });

  // スライダーを動作させる-----------------//
    goToSlide(currentIndex);
});
