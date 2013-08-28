OEIT Player
========

Makes use of the JW Player 6. Takes a video source and transcript and displays them with interactivity.


# Usage

Need to include these stylesheet links in the head

```
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/reset.css" />
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/style.css" />
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/page.css" />
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/bootstrap-responsive.min.css" />
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/bootstrap-modal.css" />
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/bootstrap-select.min.css" />
<link rel="stylesheet" type="text/css" href="https://iihs-tatemae.s3.amazonaws.com/css/bootstrap-glyphicons.css" />
```

And need to include these script tags at the bottom of the body

```
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/parser.js"></script>
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/jquery.scrollTo.min.js"></script>
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/bootstrap-modal.js"></script>
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/bootstrap-modalmanager.js"></script>
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/bootstrap-select.min.js"></script>
<script src="http://jwpsrv.com/library/jLEt7AN+EeO1uxIxOUCPzg.js"></script> <!-- JW Player -->
<script type="text/javascript" src="https://iihs-tatemae.s3.amazonaws.com/js/player.js" ></script>
```

And finally to initialize

```
 <script type="text/javascript">
  $(document).ready(function() {
    SMPlayer.init();
  });
</script>
```

For a modal player the Data Attributes need to be in an element with class="vidinfo" with a nested element that has a class="video".

```
<td class="vidinfo" data-id="bish_sanyal" data-.....>
  <p><a href="https://iihs-tatemae.s3.amazonaws.com/IIHS_Bish_Sanyal_Oct2009.mov" class="video"></p>
</td>
```

For an inline player all you need is the Data Attributes in an element with class="vidinfo-inline".

```
<div class="vidinfo-inline" data-id="scot_osterweil" data-.......>
</div>
```

Each of the players require this template be inside the markup:

```
<div id="player-frame" class="modal hide fade" tabindex="-1" data-width="760">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3></h3>
  </div>
  <div class="modal-body">
    <div class="row-fluid">
      <div class="span6">
        <div class="player-control">
          <div id="player_"></div>
          <div class="player-speaker"></div>
          <div class="player-speaker-location"></div>
        </div><!-- player-control -->
      </div>
      <div class="span6">
        <div class="transcript-control">
          <div class="search-control">
            <span class="search-count"></span> <input class="search" type="text" size="15" value="Search transcript" />
          </div>
          <div class="transcript" class="pane"></div>
          <div class="transcript-search" class="pane"></div>
          <div class="control">
            <div class="control-selector">
              <select class="selectpicker transcript-locale-selector"></select>
            </div>
          </div>
        </div><!-- transcript-control -->
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <img class="branding" src="" alt="" />
  </div>
</div><!--player-frame-->
```


# Data Attributes

### data-id

This is the id for that player. It MUST be unique on the page, or else weird playback WILL occur.

```
data-id="walter_lewin"
```

### data-title

The title is what displays in the modal header.

```
data-title="Some sort of classroom video"
```

### data-speaker

The speaker is shown below the video.

```
data-speaker="Prof. Walter Lewin"
```

### data-speaker-location

The speaker location is shown below the speaker below the video.

```
data-speaker-location="Neverland, USA"
```

### data-video-srcs

Takes a hash of video titles and their srcs.

```
data-video-srcs='{"144p":"https://iihs-tatemae.s3.amazonaws.com/video/Lec_1_801_Physics_I_Classical_Mechanic_Fall_1999_Low_Quality_144p.mp4","240p":"https://iihs-tatemae.s3.amazonaws.com/video/Lec_1_801_Physics_I_Classical_Mechanics_Fall_1999_Low_Quality_240p.mp4","360p":"https://iihs-tatemae.s3.amazonaws.com/video/Lec_1_801_Physics_I_Classical_Mechanics_Fall_1999_Standard_Quality_360p.mp4"}'
```

### data-video-width

This is the width the video will be shown at.

```
data-video-width="320"
```

### data-video-height

This is the height the video will be shown at.

```
data-video-height="240"
```

### data-preview-src

This is the src for the splash screen in the video. Before the video actually plays, this image will be shown.

```
data-preview-src="https://iihs-tatemae.s3.amazonaws.com/img/Walter_Lewin.png"
```

### data-default-locale

The default locale will tell the player which transcript to use by default. If none is specified, then the first locale in the data-transcripts will be used.

```
data-default-locale="en-US"
```

### data-transcripts

The transcripts takes a hash of the locale and the vtt src. WebVTT format must be used.

```
data-transcripts='{"en-US":"https://iihs-tatemae.s3.amazonaws.com/transcripts/lec1-edit.vtt","hi-IN":"https://iihs-tatemae.s3.amazonaws.com/transcripts/lec1-edit-bfcoder.vtt"}'
```

### data-branding-src

The branding source is displayed in the lower right corner of the modal.

```
data-branding-src="https://iihs-tatemae.s3.amazonaws.com/img/tatemae_logo.png"
```

### data-display-branding

To show or hide the branding in the lower right corner of the modal. This can be true or false. It defaults to true.

```
data-display-branding=true
```

### data-transcript-highlight

Accepts pure css for styling the highlighting.

```
data-transcript-highlight="background-color: green;"
```

### data-transcript-position-style

Accepts pure css for styling the current possition in the transcript.

```
data-transcript-position-style="border-bottom: 2px solid orange;"
```

### data-transcript-width

Sets the width of the transcript in px.

```
data-transcript-width="500"
```

### data-transcript-height

Sets the height of the transcript in px.

```
data-transcript-height="600"
```

### data-autostart

To autostart playing the video. This can be true or false. Defaults to false.

```
data-autostart=true
```

### data-autostart-cc

To autostart the closed captioning inside the video player.

```
data-autostart-cc="true"
```
