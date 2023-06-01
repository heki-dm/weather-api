/**
 * 
 * @param {num} code 都市コード
 */
function weather_ajax(code) {
  $.ajax({
    url: "https://weather.tsukumijima.net/api/forecast",
    type: 'get',
    dataType: 'json',
    data: {
      city: code
    }
  }).done((data) => {
    console.log(data);
    $("#forecast_wrapper").html();
    let html_text = '';
    html_text += `<div id="title"><h1>${data.title}</h1></div>`;    //  場所
    html_text += `<div id="week_forecast">`;
    $("#forecast_wrapper").append(html_text);

    for (let i = 0; i < data.forecasts.length; i++) {
      let section_text = '';
      let date = data.forecasts[i].date;
      section_text += `<section id="${date}" class="day_wrapper">`;

      // 日付
      section_text += `<p>${date}</p>`;

      // 天気アイコン
      section_text += `<img src="${data.forecasts[i].image.url}" alt="${data.forecasts[i].image.title}" class="icon">`; //  天気マーク

      // 天気
      section_text += `<p>${data.forecasts[i].detail.weather}</p>`;
      
      // 風
      section_text += `<p>${data.forecasts[i].detail.wind}</p>`;
      
      // 波
      let wave = data.forecasts[i].detail.wave;
      if (wave != null) {
        section_text += `<p>波の高さ　${wave}</p>`;
      }
      
      section_text += `</section>`;
      $("#week_forecast").append(section_text);
      let weather = data.forecasts[i].image.title;
      console.log(weather)
      weather_color(weather, date);
    }
    html_text = `</div>`
    $("#forecast_wrapper").append(html_text);

    let footer_text = `<p>${data.copyright.title}</p>`; //  コピーライト
    $("#footer").html(footer_text);

  }).fail((data, err) => {
    console.error(data.responseText);
    console.error(err);
  })
}
