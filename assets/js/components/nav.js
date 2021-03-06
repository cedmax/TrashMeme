import React from 'react';
import AppBar from 'material-ui/AppBar';
import HelpOutlineIcon from 'material-ui/svg-icons/action/help-outline';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ControlPointIcon from 'material-ui/svg-icons/image/control-point';
import LeftNav from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import Menu from 'js/components/menu';
import SubmitDialog from 'js/components/submit-dialog';
import FlatButton from 'material-ui/FlatButton';
import style from 'js/style';

export default class Nav extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      openDialog: false,
      openMenu: false,
      openSubmitDialog: false
    };
    this.handleOpenDialog = this.handleOpenDialog.bind( this );
    this.handleOpenSubmitDialog = this.handleOpenSubmitDialog.bind( this );
    this.handleCloseDialog = this.handleCloseDialog.bind( this );
    this.handleCloseSubmitDialog = this.handleCloseSubmitDialog.bind( this );
    this.handleToggleMenu = this.handleToggleMenu.bind( this );
  }

  handleOpenDialog () {
    this.setState({ openDialog: true });
  }

  handleOpenSubmitDialog () {
    this.setState({ openSubmitDialog: true });
  }

  handleCloseDialog () {
    this.setState({ openDialog: false });
  }

  handleCloseSubmitDialog () {
    this.setState({ openSubmitDialog: false });
  }

  handleToggleMenu () {
    this.setState({ openMenu: !this.state.openMenu });
  }

  render() {
    const dialogIcons = (
      <div>
        <FlatButton
          style={ style.nav.button }
          onClick={ this.handleOpenSubmitDialog }
          label="Add"
          labelStyle={ style.nav.label } >
          <ControlPointIcon
            color="#fff"
          />
        </FlatButton>
        <FlatButton
          style={ style.nav.button }
          onClick={ this.handleOpenDialog }
          label="About"
          labelStyle={ style.nav.label } >
          <HelpOutlineIcon
            color="#fff"
          />
        </FlatButton>
      </div>
    );

    const menuIcon = (
      <FlatButton
        style={ style.nav.button }
        labelStyle={ style.nav.label }
        label="Menu"
        onClick={ this.handleToggleMenu }
      >
        <MenuIcon
          color="#fff"
        />
      </FlatButton>
    );

    let menu;
    if ( this.state.openMenu ) {
      menu = (
        <Menu
          { ...this.props }
          onClick={ ( menuKey, selection )=> {
            this.setState({
              openMenu: false
            });
            this.props.navigateTo( menuKey, selection );
          } }
        />
      );
    }

    let submitDialog;
    if ( this.state.openSubmitDialog ) {
      submitDialog = ( <SubmitDialog /> );
    }

    return (
      <div>
        <AppBar
          iconElementLeft={ menuIcon }
          iconElementRight={ dialogIcons }
          title={ this.props.title }
        />
        <Dialog
          title="About"
          modal={ false }
          autoScrollBodyContent={ true }
          open={ this.state.openDialog }
          onRequestClose={ this.handleCloseDialog }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.data.about
            }}
          ></div>
        </Dialog>
        <Dialog
          modal={ false }
          open={ this.state.openSubmitDialog }
          onRequestClose={ this.handleCloseSubmitDialog }
        >
          { submitDialog }
        </Dialog>
        <LeftNav
          docked={ false }
          onRequestChange={ openMenu => this.setState({ openMenu }) }
          open={ this.state.openMenu }
        >
          { menu }
        </LeftNav>
      </div>
    );
  }
}

Nav.propTypes = {
  data: React.PropTypes.shape({
    about: React.PropTypes.string.isRequired
  }).isRequired,
  title: React.PropTypes.string.isRequired,
  navigateTo: React.PropTypes.func.isRequired
};
