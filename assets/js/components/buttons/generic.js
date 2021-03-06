import React from 'react';
import IconButton from 'material-ui/IconButton';
import style from 'js/style';

export default class Button extends React.Component {
  render() {
    return (
      <IconButton
        onClick={ this.props.onClick }
        style={ style.buttons }
        tooltip={ this.props.tooltip }
      >
        { this.props.icon }
      </IconButton>
    );
  }
}

Button.propTypes = {
  icon: React.PropTypes.element.isRequired,
  tooltip: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};
