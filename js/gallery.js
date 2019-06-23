$(document).ready(function(){
// ギャラリーを表示する関数 -----------------------------
  $('#gallery').each(function(){
    
    var $container = $(this);

    // masonryの初期値を設定 -----------------------------
    $container.masonry({
      columnWidth: 270,
      gutter: 10,
      itemSelector: '.gallery-item'
    });

    $.getJSON('./data/content.json', function (data) {

      var elements = [];

      $.each(data, function (i, item) {

        var itemHTML =
          '<li class="gallery-item is-loading" id="' + item.id + '">' +
              '<img src="' + item.images.thumb +
                  '" class="hidden_in_mordal"' +
                  'alt="' + item.title + '">' +
              '<div class="hidden">' + 
                '<img src="' + item.images.large + '" alt="' + item.title + '">' +
                '<div class="right__content">' +
                '<h3 class="works__title">' + item.title + '</h3>' +
                '<p>' + item.description + '</p>'
                '</div>'
              '</div>'
          '</li>';

        elements.push($(itemHTML).get(0));
      });

      $container.append(elements);

      // 画像の読み込みが完了したら Masonry レイアウト
      $container.imagesLoaded(function () {
        $(elements).removeClass('is-loading');
        $container.masonry('appended', elements);
      });
    });
  });

// クリックされた画像をモーダルで表示する関数---------------------------
  
  $('#gallery').on('click', 'li.gallery-item', function(){

    var mordalHTML = $(this).html(),
      $mordal = $('#mordal');
      $mordalInner = $('#mordal__inner'),
      $openInMordal = $(this).find('div.hidden'),
      $worksInfo = $('.works__info');

    $mordal.css({"display": "block"});
    $worksInfo.empty();
    $worksInfo.append(mordalHTML);
    $mordalInner.css({"display": "block"});

    if ($(this).closest('.mordal__inner').length > 0){
    $openInMordal.css({"display": "block"});
    }
  });

  $(document).ready(function(){
   
    $('.mordal__close').on('click', function(){
      $('#mordal').css({"display": "none"});
      $('#mordal__inner').css({"display": "none"});
    });
  });
});
