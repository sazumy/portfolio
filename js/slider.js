$(document).ready(function(){
// 関数の定義--------------------------
  var $container = $('.slideshow'),
  $slideGroup = $container.find('.slideshow-slides'),
  $slides = $slideGroup.find('.slide'),
  $nav = $container.find('.slideshow-nav'),
  isNavNext = true,
  isNavPrev = false,
  mousePosition = 0,

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
        isNavPrev = false;
      } else {
        $navPrev.removeClass('disabled');
        isNavPrev = true;
      };

      if(currentIndex === slideCount -1){
        $navNext.addClass('disabled');
        isNavNext = false;
      } else {
        $navNext.removeClass('disabled');
        isNavNext = true;
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

  // ドラッグ移動でページ送り-----------------//
  $slideGroup.mousedown(function (e) {
    e.preventDefault();
    // 0のクリック初期位置
    mousePosition = getPosition(e);

    $slideGroup.off('mousemove mouseup');
    $slideGroup.on('mousemove mouseup', function handler(e) {
      if (e.type === 'mousemove') {
        // 右に30以上マウス移動していた場合
        if (mousePosition - getPosition(e) > 30 && isNavNext) {
          goToSlide(currentIndex + 1);
          $slideGroup.off('mousemove');
          // クリック発火させない（今後クリックで何かする場合用）
          $slideGroup.click(function(e) {
              e.preventDefault();
          });
        // 左に30以上マウス移動していた場合
        } else if (mousePosition - getPosition(e) < -30 && isNavPrev) {
          goToSlide(currentIndex - 1);
          $slideGroup.off('mousemove');
          // クリック発火させない（今後クリックで何かする場合用）
          $slideGroup.click(function(e) {
              e.preventDefault();
          });
        }
      // マウスクリックを外した時かつ、左右30以上動いていなかったら何もしない
      } else if (e.type === 'mouseup' && (mousePosition - getPosition(e) > -30) && (mousePosition - getPosition(e) < 30)) {
        $slideGroup.off('mousemove mouseup');
      }
    })
  });

  // マウス位置取得-----------------//
  var getPosition = function(e) {
      return e.originalEvent.pageX;
  }

  // スライダーを動作させる-----------------//
    goToSlide(currentIndex);
});
