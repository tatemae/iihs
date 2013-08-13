var SMPlayer = {
  currentPosition: 0,
  currentVolume: 80,
  prevSegLocId: null,
  segLocId: null,
  scroll: 0,
  SCROLL_OFFSET: -70,
  defaults: {
    "videoWidth": 320,
    "videoHeight": 240,
    "verticalWidth": 465,
    "verticalHeight": 555,
    "horizontalWidth": 666,
    "horizontalHeight": 370,
    "widthFudge": 50,
    "preview": null
  },
  player: null
};

// transcript highlighting function based on JW Player player position
SMPlayer.positionListener = function(o) {
  SMPlayer.currentPosition = o.position;
  SMPlayer.segLocId = '#T' + Math.round(SMPlayer.currentPosition);
  if($(SMPlayer.segLocId).size() > 0) {
    if (SMPlayer.prevSegLocId != null && SMPlayer.prevSegLocId != SMPlayer.segLocId && !$(SMPlayer.prevSegLocId).hasClass("passed")) {
        $(SMPlayer.prevSegLocId).css("border-bottom-color", "transparent");
        $(SMPlayer.prevSegLocId).animate({"opacity": 0.65}, {"duration": 5000});
      $(SMPlayer.prevSegLocId).removeClass("current").addClass("passed");
    }
    if(!$(SMPlayer.segLocId).hasClass("current")) {
      if ( $(SMPlayer.segLocId).position().top - SMPlayer.scroll + SMPlayer.SCROLL_OFFSET > 5)
      $('#transcript').scrollTo($(SMPlayer.segLocId), {"offset": {"top": SMPlayer.SCROLL_OFFSET}, "duration": 250});
      $(SMPlayer.segLocId).css("opacity", 1).css("border-bottom-color", "black");
      $(SMPlayer.segLocId).addClass("current").removeClass("passed");
      SMPlayer.prevSegLocId = SMPlayer.segLocId;
      SMPlayer.scroll = $(SMPlayer.segLocId).position().top + SMPlayer.SCROLL_OFFSET;
    }
  }
};

// helper function translating seconds to minutes:seconds string
SMPlayer.secondsToTime = function(t) {
  var min = Math.floor(t / 60.0);
  var sec = t - (min * 60);
  var time = min + ":" + ((sec < 10) ? "0" : "") + sec;
  return time;
};

// mode switching function based on play/pause state of JW Player
SMPlayer.pauseListener = function(o) {
  $('#transcript span').css('cursor', 'pointer').animate({'opacity': 1});
  $('#transcript span').addClass('paused');
  $('#transcript span').each(function() {
    var secs = $(this).attr('id').substr(1);
    var time = SMPlayer.secondsToTime(secs);
    $(this).attr('title', "skip to " + time + " mark");
  });
  $('#transcript span').on('click', function() {
    jwplayer("player").seek($(this).attr('id').substr(1));
  });
};

// mode switching function based on play/pause state of JW Player
SMPlayer.playListener = function(o) {
  if (o.oldstate === "PAUSED") {
    $('#transcript span').off();
    $('#transcript span').removeClass('paused');
    $('#transcript span').css('cursor', 'default').attr('title', null);
    $('#transcript span').filter(function() {
      return $(this).css('border-bottom-color') == 'transparent';
    }).animate({'opacity': 0.65});
  }
};

// reloading JW Player Flash
SMPlayer.create = function(file, duration, opts) {
  if (opts != null) {
    if (typeof opts.width === undefined || opts.width === null) {
      opts.width = SMPlayer.defaults.videoWidth;
    }
    if (typeof opts.height === undefined || opts.height === null) {
      opts.height = SMPlayer.defaults.videoHeight;
    }
  } else {
    opts = SMPlayer.defaults;
  }

  var args = {
    file: file,
    width: opts.width,
    height: opts.height,
    image: opts.preview,
    allowfullscreen: "true",
    allowscriptaccess: "always",
    flashplayer: "swf/jwplayer.flash.swf",
    autostart: true
  };

  jwplayer("player").setup(args);
  // jwplayer("player").onReady(SMPlayer.ready);
  jwplayer("player").onTime(SMPlayer.positionListener);
  jwplayer("player").onPause(SMPlayer.pauseListener);
  jwplayer("player").onPlay(SMPlayer.playListener);
};

// takes a video identifier and returns the video data structure
SMPlayer.getVideo = function(id) {
  var vid = null;
  for (var v in SMData.videos) {
    if (SMData.videos[v].id == id) {
      vid = SMData.videos[v];
      break;
    }
  }
  return vid;    
};

// takes a video identifier and sets up the browser transcript and
// per-video options, based on associated metadata
SMPlayer.setup = function(id) {
  var vid = SMPlayer.getVideo(id);
  if (vid != null) {
    SMPlayer.create(
      vid.video,
      vid.duration,
      {
        "width": vid.width,
        "height": vid.height,
        "preview": vid.preview
      });
    $('#player-speaker').text(vid.speaker);
    var browserLocales = ("language" in navigator ? navigator.language : navigator.browserLanguage).split(";");
    var def = vid.defaultLocale;
    for (var l = 0; l < browserLocales.length; l++) {
      var locale = browserLocales[l];
      if (locale in vid.transcripts) {
        def = locale;
        break;
      }
    }
    for (var t in vid.transcripts) {
      $('#transcript-locale-selector').append('<option value="' + vid.transcripts[t] + '"' + ((def == t) ? ' selected="selected"' : '') +'>'+SMData.locales[t]+'</option>\n');
      $('#audio-locale-selector').append('<option value="' + vid.audio[t] + '"' + ((def == t) ? ' selected="selected"' : '') +'>'+SMData.locales[t]+'</option>\n');
      if (def == t) {
        SMPlayer.loadTranscript(vid.transcripts[t]);
        SMPlayer.loadAudio(vid.audio[t]);
      }
    }
    $('#transcript-locale-selector').on('change', function() {
      SMPlayer.loadTranscript($(this).val());
    });
    $('#audio-locale-selector').on('change', function() {
      SMPlayer.loadAudio($(this).val());
    });
  } else {
    SMPlayer.error("Video not found.  Please contact the administrator to fix this problem.");
  }
};

// load transcript into browser transcript display
SMPlayer.loadTranscript = function(url) {
  $('#transcript').load(url);
};

// load separate language audio track
SMPlayer.loadAudio = function(url) {
  // not defined
};

// display an error in the same vein as the browser
SMPlayer.error = function(msg) {
  $.fn.ceebox.popup('<div class="error"><a id="cee_closeBtn" class="cee_close" title="close" href="#">close</a><p>' + msg + '</p></div>', { "modal": true, "html": true, "htmlGallery": false, "borderColor": '#f00', "width": 400, "height": 100});
};

// unnecessary, but keep for now as an exercise in searching the whole
// transcript, not just its fragments
SMPlayer.search = function(string) {
  var matches = [];
  var text = $('#transcript').text();
  var re = new RegExp(string, 'igm');
  var m = text.search(re);
  while (m >= 0) {
    var prev = 0;
    if (matches.length > 0) {
      prev = string.length + matches[matches.length-1];
    }
    matches.push(m + prev);
    text = text.substr(m + string.length);
    m = text.search(re);
  }
};

// perform search
SMPlayer.doSearch = function(query) {
  if (query.length > 0) {
    $('#transcript').hide();
    $('#transcript-search').show();
    $('#transcript-search').empty();
    var hits = $('#transcript span:contains(' + query + ')').size();
    $('#search-count').text(hits + ' match' + ((hits == 1) ? '' : 'es'));
    $('#transcript span:contains(' + query + ')').each(function() {
      var seek = $(this).attr('id').substr(1);
      var startIdx = $(this).text().indexOf(query);
      var highlighted = $(this).text().substr(0, startIdx) + '<span class="highlight">' + $(this).text().substr(startIdx, query.length) + '</span>' + $(this).text().substr(startIdx+query.length);
      var result = '<div title="seek to result at ' + SMPlayer.secondsToTime(seek) + '"><span class="time">' + SMPlayer.secondsToTime(seek) + '</span> ';
      result += $(this).prev().text() + ' ' + highlighted + ' ' + $(this).next().text();
      result += '</div>\n';
      var jqresult = $(result);
      $('#transcript-search').append(jqresult);
      jqresult.on('click', function() {
        jwplayer("player").seek(seek);
        $('#search-count').empty();
        $('#transcript-search').hide();
        $('#transcript').show();
      });
    });
  } else {
    $('#search-count').empty();
    $('#transcript-search').hide();
    $('#transcript').show();
  }
};

// set up the browser when launched
SMPlayer.onOpen = function(id) {
  $('#cee_title').height($('#cee_title h2').height());
  $('#cee_box').height($('#cee_box').height() + $('#cee_title h2').height() - 20);
  $('#player-frame').empty();
  SMPlayer.setup(id);
  $('#search').on('focus', function() {
    if ($('#search').val() == "Search transcript") {
      $('#search').val('');
    } else {
      this.select();
      SMPlayer.doSearch($(this).val());
    }
    $('#search').css('color', '#000');
  });
  $('#search').on('blur', function(e) {
    if ($('#search').val() == '') {
        $('#search').val('Search transcript').css('color', '#999');
    }
    // hack, blur fires before click and swallows the triggering
    // click event in firefox (presumably all others as well) -
    // timeout may still fail to avoid the situation, but .2 seconds
    // on a modern cpu looks to be good enough - more robust but still
    // ugly solutions may be using a global flag and instrumenting all
    // clicks or introducing an explicit cancel search mode link
    var f = function() {
      if ($('#transcript:visible').size() == 0) {
        $('#transcript').show();
        $('#transcript-search').hide();
        $('#search-count').empty();
      }
    };
    setTimeout(f, 200);
  });
  $('#search').on('keyup', function() {
    SMPlayer.doSearch($(this).val());
  });
};

// modify the browser when closed to eliminate decorative items
SMPlayer.onClose = function() {
  $('#player-frame').html($('#player-live-wrapper').clone().html());
  $.fn.ceebox.closebox(null, function() {
    jwplayer("player").remove();
    $('#transcript-locale-selector').empty();
    $('#transcript').empty();
    $('#player-speaker').empty();
    $('#cee_closeBtn').remove();
    $('#cee_title').remove();
  });
};

// makes the player have a vertical orientation
SMPlayer.makeVertical = function() {
  // popup width is 465, height 555
  $('#player-control').css('float', 'none').css('width', '100%').css('text-align', 'center');
  $('#transcript-control').css('float', 'none').css('width', '100%');
  $('#transcript').css('height', '140px').css('padding-top', 0).css('padding-bottom', 0);
  $('#transcript-search').css('height', '140px');
  $('.control').css('text-align', 'center');
};

// public method to be called in the page within a
// $(document).ready() block.  options:
// vertical {boolean} Make the player have a vertical orientation
// popupWidth {int} Initial width of the popup
// popupHeight {int} Initial height of the popup (may change depending on video title length)
SMPlayer.init = function(opts) {
  if (typeof opts != "undefined" && opts != null) {
    if (typeof opts.vertical != "undefined") {
      SMPlayer.makeVertical();
      opts.width = SMPlayer.defaults.verticalWidth;
      opts.height = SMPlayer.defaults.verticalHeight;
    }
    if (typeof opts.popupWidth != "undefined") {
      opts.width = parseInt(opts.popupWidth);
    }
    if (typeof opts.popupHeight != "undefined") {
      opts.height = parseInt(opts.popupHeight);
    }
  } else {
    opts = {};
    opts.width = SMPlayer.defaults.horizontalWidth;
    opts.height = SMPlayer.defaults.horizontalHeight;
  }
  SMPlayer.create(null, 0);
  $('.video').on('click', function(e) {
    e.preventDefault();
    var clicked = this;
    var vid = SMPlayer.getVideo($(clicked).attr('rel'));
    var screenWidth = $(window).width();
    var width = opts.width;
    var isVertical = false;
    if(screenWidth + SMPlayer.defaults.widthFudge < opts.width){
      width = 350;
      isVertical = true;
    } else {
      isVertical = false;
    }
    if (vid != null) {
      $.fn.ceebox.popup(SMPlayer.ceebox_template(vid), {
        modal: true,
        titles: false,
        titleHeight: "20px",
        html: false,
        image: false,
        video: false,
        htmlGallery: false,
        imageGallery: false,
        videoGallery: false,
        animSpeed: 'slow',
        padding: 10,
        height: opts.height,
        width: width,
        borderWidth: "0px",
        onload: function() {
          SMPlayer.onOpen($(clicked).attr('rel'));
          $('#cee_closeBtn').on('click', SMPlayer.onClose);
          if(isVertical){
            $('#cee_box').addClass('vertical_player');
            $('#cee_box').css("top", "25%");
          } else {
            $('#cee_box').removeClass('vertical_player');
            $('#cee_box').css("top", "50%");
          }
        }
      });
    } else {
      SMPlayer.error("Video not found.  Please contact the administrator to fix this problem.");
    }
    return false;
  });
};

SMPlayer.ceebox_template = function(vid) {
  return '<div id="cee_title"><h2>' + vid.title  + '</h2></div><div id="player-live-wrapper"><a id="cee_closeBtn" class="cee_close" title="close" href="#">close</a>' + $('#player-frame').clone().html() + '</div>';
};