$(function(){
  imagesProgress();

  function imagesProgress(){
    // console.log('worked');
    var $container = $('#progress'),
        $progressBar = $container.find('.progress-bar'),
        $progressText = $container.find('.progress-text'),

        count = 0, //今の秒数
        goal = 20, //終わりの秒数

        current = 0, //プログレスバーの現在地

        progressTimer = setInterval(updateProgress, 500);


    function updateProgress(){
      count++;
      var target = (count / goal ) * 100;

      // current (現在地) と target (目的地) の距離をもとにイージングをかける
      current += (target - current) * 0.1;

      $progressBar.css({width: current + '%'});
      $progressText.text(Math.floor(current) + '%');

      if(current >= 100){
        current = 100;
        clearInterval(progressTimer);
        $container.addClass('progress-complete')
        // 0.5 秒待つ
        .delay(500)
        // 0.25 秒かけてプログレスバーとテキストを透明にする
        .animate({ opacity: 0 }, 250, function () {
            // 1 秒かけてオーバーレイを上方向へスライドアウト
            $container.removeClass('progress');
            $('.works-content').css({position: 'relative'});
        });
      }

    };
  };
});
