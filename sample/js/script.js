$(() => {
  // 読み込み後に実行
  $("#search").on("click", () => {
    $("#forecast_wrapper").html('');
    let city_code = $("#prefecture").val();
    console.log(city_code);
    weather_ajax(city_code);
  })
})

/**
 * 
 * @param {string} weather  天気情報
 * @param {date} date       日付
 */
function weather_color(weather, date) {
  if (weather != null) {
    let color_first_code = '';
    let color_last_code = '';

    // 文字列初めから検索
    let first_char = weather.charAt(0);
    if (first_char == "晴") {
      color_first_code = '#f0a856';
    } else if (first_char == "雨") {
      color_first_code = '#68b4ed';
    } else if (first_char == "曇") {
      color_first_code = '#e3e8e8';
    }else{
      color_first_code = '#eaaefc';
    }

    // 文字列終わりから検索
    let last_char = weather.charAt(weather.length - 1);
    if (last_char == "晴") {
      color_last_code = '#f0a856';
    } else if (last_char == "雨") {
      color_last_code = '#68b4ed';
    } else if (last_char == "曇" || last_char == "り") {
      color_last_code = '#e3e8e8';
    }else{
      color_last_code = '#eaaefc';  
    }

    if(weather.indexOf('のち')!=-1){
      // のちあり
      $(`#${date}`).css('background-image', `linear-gradient(90deg, ${color_first_code}, ${color_last_code})`);
    }else{
      // のちなし
      $(`#${date}`).css('background-image', `linear-gradient(135deg, ${color_first_code},75%, ${color_last_code})`);
    }
  }
}