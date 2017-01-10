$('#click').off().on("click", function() {
    $('.outer').css("margin-top", "0");
    $('#click').css("padding", "0px");
    $('#click').css("font-size", "2vw");
    $('.outer').css("height", "100vh");
    var output = document.getElementById("out");
    var out = $('#out');
    var time;
    var location;

    var icon = {
        "clear-day": [1.78, "ClassicDisastrousHanumanmonkey"],
        "clear-night": [1.85, "WavyWastefulAllosaurus"],
        "rain": [1.77, "ExcitablePoisedAmericanbobtail"],
        "snow": [1.39, "HeartfeltJampackedBarbet"],
        "sleet": [1.78, "HarmlessForthrightDorado"],
        "wind": [1.78, "SneakyWigglyDodo"],
        "fog": [1.78, "ImpoliteVigorousArachnid"],
        "cloudy": [1.78, "GleamingOblongArieltoucan"],
        "partly-cloudy-day": [1.78, "SpecificLikableConure"],
        "partly-cloudy-night": [1.78, "EverySlimAfricangroundhornbill"]
    };

    var dt = new Date();

    var day = dt.getDay();
    var dayarr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = dayarr[day];
    var month = dt.getMonth();
    var montharr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    month = montharr[month];
    var date = dt.getDate();
    var year = dt.getFullYear();
    var min = dt.getMinutes();
    if (dt.getMinutes() < 10) {
        min = "0" + min;
    }

    var am = "am";
    if (dt.getHours() > 11) {
        am = "pm";
    }

    $('#click').html('Your current weather:');

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        $.ajax({
                type: "GET",
                dataType: "json",
                data: {
                    latlng: latitude + "," + longitude,
                    key: "AIzaSyCMgqloGfFS4ka2dQsLlDstjaSZSvt8FzM"
                },

                url: "https://maps.googleapis.com/maps/api/geocode/json?",
                success: function(response) {

                    location = response.results[1].formatted_address;

                    var hours = dt.getHours() % 12;

                    if (hours == 0) {
                        hours = '12';
                    }

                    time = hours + ':' + min + am;

                    var fivehr = [];

                    for (var i = 1; i < 13; i++) {
                        var tmp = dt.getHours() + i % 24;
                        var pm = "am";
                        if (tmp > 11 && tmp < 24) {
                            pm = "pm";
                        }
                        tmp = tmp % 12;
                        if (tmp == 0) {
                            tmp = "12";
                        }

                        fivehr[i - 1] = tmp + pm;
                    }

                    $.ajax({
                            type: "GET",
                            dataType: "jsonp",

                            url: "https://api.darksky.net/forecast/30c1e2af0f983407c00546c70f6b6ab9/" + latitude + "," + longitude,
                            success: function(response) {
                                if (response) {
                                    var current = response.currently.summary;
                                    var temp = Math.round(response.currently.temperature * 10) / 10;
                                    var forecast = response.minutely.summary;
                                    out.html('<div class="content"> <div class="row"><div class="col s12" id="loc-time">' + time + '</div></div><div class="row" id="loc-time"> <div class="col s12">' + day + ', ' + month + ' ' + date + ', ' + year + '</div></div><div class="row" id="loc-time2"> <div class="col s12">' + location + '</div></div><div class="row"> <div class="col s12" id="temp"><span id="num">' + temp + '</span><a href="#" id="convert"><sup>°F</sup></a></div></div><div class="row"> <div class="col s12"> <div class="row" id="current">' + current + '</div><div class="row" id="forecast">' + forecast.slice(0, -1) + '</div></div></div><div class="row next5"> <div class="no-scroll"> <div class="col s2"> <div class="row">Time</div><div class="row">Temp</div><div class="row">Forecast</div><div class="row">Precip</div></div><div class="scroll"> <div class="col s2"> <div class="row">' + fivehr[0] + '</div><div class="row">' + Math.round(response.hourly.data[1].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[1].summary + '</div><div class="row">' + Math.round(response.hourly.data[1].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[1] + '</div><div class="row">' + Math.round(response.hourly.data[2].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[2].summary + '</div><div class="row">' + Math.round(response.hourly.data[2].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[2] + '</div><div class="row">' + Math.round(response.hourly.data[3].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[3].summary + '</div><div class="row">' + Math.round(response.hourly.data[3].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[3] + '</div><div class="row">' + Math.round(response.hourly.data[4].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[4].summary + '</div><div class="row">' + Math.round(response.hourly.data[4].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[4] + '</div><div class="row">' + Math.round(response.hourly.data[5].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[5].summary + '</div><div class="row">' + Math.round(response.hourly.data[5].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[5] + '</div><div class="row">' + Math.round(response.hourly.data[6].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[6].summary + '</div><div class="row">' + Math.round(response.hourly.data[6].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[6] + '</div><div class="row">' + Math.round(response.hourly.data[7].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[7].summary + '</div><div class="row">' + Math.round(response.hourly.data[7].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[7] + '</div><div class="row">' + Math.round(response.hourly.data[8].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[8].summary + '</div><div class="row">' + Math.round(response.hourly.data[8].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[8] + '</div><div class="row">' + Math.round(response.hourly.data[9].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[9].summary + '</div><div class="row">' + Math.round(response.hourly.data[9].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[9] + '</div><div class="row">' + Math.round(response.hourly.data[10].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[10].summary + '</div><div class="row">' + Math.round(response.hourly.data[10].precipProbability * 100) + '%</div></div><div class="col s2"> <div class="row">' + fivehr[10] + '</div><div class="row">' + Math.round(response.hourly.data[11].temperature * 10) / 10 + '°F</div><div class="row">' + response.hourly.data[11].summary + '</div><div class="row">' + Math.round(response.hourly.data[11].precipProbability * 100) + '%</div></div></div></div></div></div></div>');

                                    var ic = response.currently.icon;
                                    out.append("<div class='gfy' style='position:relative;padding-bottom:calc(100% / " + icon[ic][0] + ")'><iframe src='https://gfycat.com/ifr/" + icon[ic][1] + "' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>");
                                }


                            },
                        })
                        .done(function() {
                            console.log('SUCCESS :)');
                        })
                        .fail(function() {
                            console.log('FAIL :(');
                        })
                        .always(function() {
                            console.log('weather Ajax call complete');
                        });;

                },
            })
            .done(function() {
                console.log('SUCCESS :)');
            })
            .fail(function() {
                console.log('FAIL :(');
            })
            .always(function() {
                console.log('address Ajax call complete');
            });;

        /* var img = new Image();
         img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false&maptype=hybrid&markers=color:blue|label:Your Location|" + latitude + "," + longitude;

         output.appendChild(img);*/
    };

    function error() {
        output.innerHTML = "Unable to retrieve your location. Are you connected via https?";
    };

    output.innerHTML = "<p>Loading…</p>";
    out.fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);

    navigator.geolocation.getCurrentPosition(success, error);
});

$(document).on('click', '#convert', function() {
    if ($('sup').html() == '°F') {
        var num = $('#num').html();
        $('#num').html(Math.round(((num - 32) * (5 / 9)) * 10) / 10);
        $('sup').html('°C');
    } else {
        var num = $('#num').html();
        $('#num').html(Math.round(((num * (9 / 5)) + 32) * 10) / 10);
        $('sup').html('°F');
    }
});