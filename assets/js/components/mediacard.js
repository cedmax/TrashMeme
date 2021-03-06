import React from 'react';
import {Card,CardMedia, CardTitle } from 'material-ui/Card';
import CopyButton from 'js/components/buttons/copy';
import GifIcon from 'material-ui/svg-icons/action/gif';
import Button from 'js/components/buttons/generic';
import Link from 'js/components/link';
import Video from 'js/components/video';
import VideoIcon from 'material-ui/svg-icons/av/videocam';
import style from 'js/style';
import props from 'js/props';

function forceGif( props ) {
  return props.format === 'gif';
}

function getVideoTitle( props ) {
  return props.currentVideo && props.currentVideo.title;
}

export default class MediaCard extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      gif: forceGif( props )
    };
    this.toggleGif = this.toggleGif.bind( this );
  }

  toggleGif() {
    this.setState({
      gif: !this.state.gif
    });
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( getVideoTitle( nextProps ) !== getVideoTitle( this.props )) {
      nextState.gif = forceGif( nextProps );
    }
    return true;
  }

  render() {
    const {
      currentVideo
    } = this.props;

    let {
      url,
      gif,
      title
    } = currentVideo;

    let alternateButton;
    let media = ( <Video videoUrl={url} /> );

    const isGifEnabled = gif;
    const isGifVisible = this.state.gif;

    if ( isGifEnabled && !isGifVisible ) {
      alternateButton = (
        <Button
          onClick={ this.toggleGif }
          tooltip='Show the GIF instead'
          icon={ <GifIcon /> }
        />
      );
    } else if ( isGifVisible ) {
      url = gif;
      alternateButton = (
        <Button
          onClick={this.toggleGif }
          tooltip='Show the video instead'
          icon={ <VideoIcon /> }
        />
      );
      media = (
        <img
          title={ title }
          src={ url }
        />
      );
    }

    let subtitle = (
      <div
        style={ style.mediaCard.subtitle }
      >
        {alternateButton}

        <CopyButton
          toBeCopied={ url }
          onCopyReady={ this.props.onCopyReady }
        />
        <Link
          url={ url }
        />
      </div>
    );

    return (
      <div style={ style.mediaCard.container }>
        <Card>
          <CardMedia>
            { media }
          </CardMedia>
          <CardTitle
            subtitle={ subtitle }
          />
        </Card>
      </div>
    );
  }
}

MediaCard.propTypes = {
  title: React.PropTypes.string,
  currentVideo: props.video.isRequired,
  selected: React.PropTypes.string,
  onCopyReady: React.PropTypes.func.isRequired
};