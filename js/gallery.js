$(document).ready(function(){

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
          '<li class="gallery-item is-loading">' +
            '<a href="' + item.images.large + '">' +
              '<img src="' + item.images.thumb +
                  '" alt="' + item.title + '">' +
            '</a>' +
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
});
