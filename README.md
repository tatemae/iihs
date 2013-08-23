OEIT Player
========

Makes use of the JW Player 6. Takes a video source and transcript and displays them with interactivity.

# Data Attributes

### data-id

This is the id for that player. It MUST be unique on the page, or else weird playback WILL occur.

```Example
data-id="walter_lewin"
```

### data-title

The title is what displays in the modal header.

```Example
data-title="Some sort of classroom video"
```

### data-speaker

The speaker is shown below the video.

```Example
data-speaker="Prof. Walter Lewin"
```

### data-speaker-location

The speaker location is shown below the speaker below the video.

```Example
data-speaker-location="Neverland, USA"
```

### data-video-srcs

Takes a hash of video titles and their srcs.

```Example
data-video-srcs='{"144p":"https://iihs-tatemae.s3.amazonaws.com/video/Lec_1_801_Physics_I_Classical_Mechanic_Fall_1999_Low_Quality_144p.mp4","240p":"https://iihs-tatemae.s3.amazonaws.com/video/Lec_1_801_Physics_I_Classical_Mechanics_Fall_1999_Low_Quality_240p.mp4","360p":"https://iihs-tatemae.s3.amazonaws.com/video/Lec_1_801_Physics_I_Classical_Mechanics_Fall_1999_Standard_Quality_360p.mp4"}'
```

### data-video-width

This is the width the video will be shown at.

```Example
data-video-width="320"
```

### data-video-height

This is the height the video will be shown at.

```Example
data-video-height="240"
```

### data-preview-src

This is the src for the splash screen in the video. Before the video actually plays, this image will be shown.

```Example
data-preview-src="https://iihs-tatemae.s3.amazonaws.com/img/Walter_Lewin.png"
```

### data-default-locale

The default locale will tell the player which transcript to use by default. If none is specified, then the first locale in the data-transcripts will be used.

```Example
data-default-locale="en-US"
```

### data-transcripts

The transcripts takes a hash of the locale and the vtt src. WebVTT format must be used.

```Example
data-transcripts='{"en-US":"https://iihs-tatemae.s3.amazonaws.com/transcripts/lec1-edit.vtt","hi-IN":"https://iihs-tatemae.s3.amazonaws.com/transcripts/lec1-edit-bfcoder.vtt"}'
```

### data-branding-src

The branding source is displayed in the lower right corner of the modal.

```Example
data-branding-src="https://iihs-tatemae.s3.amazonaws.com/img/tatemae_logo.png"
```

### data-display-branding

To show or hide the branding in the lower right corner of the modal. This can be true or false. It defaults to true.

```Example
data-display-branding=true
```

### data-transcript-highlight

Accepts pure css for styling the highlighting.

```Example
data-transcript-highlight="background-color: green;"
```

### data-transcript-position-style

Accepts pure css for styling the current possition in the transcript.

```Example
data-transcript-position-style="border-bottom: 2px solid orange;"
```

### data-transcript-width

Sets the width of the transcript in px.

```Example
data-transcript-width="500"
```

### data-transcript-height

Sets the height of the transcript in px.

```Example
data-transcript-height="600"
```

### data-autostart

To autostart playing the video. This can be true or false. Defaults to false.

```Example
data-autostart=true
```

### data-autostart-cc

To autostart the closed captioning inside the video player.

```Example
data-autostart-cc="true"
```

