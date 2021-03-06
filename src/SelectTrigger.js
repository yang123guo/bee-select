import Trigger from 'bee-overlay/build/trigger';
import React, { Component } from 'react';
import classnames from 'classnames';
import DropdownMenu from './DropdownMenu';
import ReactDOM from 'react-dom';
import { isSingleMode } from './util';
import PropTypes from 'prop-types';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

const propTypes = {
    onPopupFocus: PropTypes.func,
    dropdownMatchSelectWidth: PropTypes.bool,
    dropdownAlign: PropTypes.object,
    visible: PropTypes.bool,
    disabled: PropTypes.bool,
    showSearch: PropTypes.bool,
    dropdownClassName: PropTypes.string,
    multiple: PropTypes.bool,
    inputValue: PropTypes.string,
    filterOption: PropTypes.any,
    options: PropTypes.any,
    clsPrefix: PropTypes.string,
    popupClassName: PropTypes.string,
    children: PropTypes.any,
}

class SelectTrigger extends Component{

  constructor(props) {
    super(props);
    this.getInnerMenu = this.getInnerMenu.bind(this);
    this.getPopupDOMNode = this.getPopupDOMNode.bind(this);
    this.getDropdownTransitionName = this.getDropdownTransitionName.bind(this);
    this.getDropdownElement = this.getDropdownElement.bind(this);
    this.getDropdownPrefixCls = this.getDropdownPrefixCls.bind(this);
    this.saveMenu = this.saveMenu.bind(this);
    this.state = {
      dropdownWidth: null,
    }

  }
  componentDidMount() {
    this.setDropdownWidth();
  }

  componentDidUpdate() {
    this.setDropdownWidth();
  }

  setDropdownWidth = () => {
    const width = ReactDOM.findDOMNode(this).offsetWidth;
    if (width !== this.state.dropdownWidth) {
      this.setState({ dropdownWidth: width });
    }
  }

  getInnerMenu() {
    return this.popupMenu && this.popupMenu.refs.menu;
  }

  getPopupDOMNode() {
    return this.refs.trigger.getPopupDomNode();
  }

  getDropdownElement(newProps) {
    const props = this.props;
    return (<DropdownMenu
      ref={this.saveMenu}
      {...newProps}
      clsPrefix={this.getDropdownPrefixCls()}
      onMenuSelect={props.onMenuSelect}
      scrollToEnd = {props.scrollToEnd}
      onMenuDeselect={props.onMenuDeselect}
      value={props.value}
      defaultActiveFirstOption={props.defaultActiveFirstOption}
      dropdownMenuStyle={props.dropdownMenuStyle}
    />);
  }

  getDropdownTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${this.getDropdownPrefixCls()}-${props.animation}`;
    }
    return transitionName;
  }

  getDropdownPrefixCls() {
    return `${this.props.clsPrefix}-dropdown`;
  }

  saveMenu(menu) {
    this.popupMenu = menu;
  }
  render() {
    const { onPopupFocus, ...props } = this.props;
    const { multiple, visible, inputValue, dropdownAlign,
      disabled, showSearch, dropdownClassName,dropdownStyle,dropdownMatchSelectWidth } = props;
    const dropdownPrefixCls = this.getDropdownPrefixCls();
    const popupClassName = {
      [dropdownClassName]: !!dropdownClassName,
      [`${dropdownPrefixCls}--${multiple ? 'multiple' : 'single'}`]: 1,
    };
    const popupElement = this.getDropdownElement({
      menuItems: props.options,
      onPopupFocus,
      multiple,
      inputValue,
      visible,
    });
    let hideAction;
    if (disabled) {
      hideAction = [];
    } else if (isSingleMode(props) && !showSearch) {
      hideAction = ['click'];
    } else {
      hideAction = ['blur'];
    }
    const popupStyle = { ...dropdownStyle };
    const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
    if (this.state.dropdownWidth) {
      popupStyle[widthProp] = `${this.state.dropdownWidth}px`;
    }
    return (<Trigger {...props}
      showAction={disabled ? [] : ['click']}
      hideAction={hideAction}
      ref="trigger"
      popupPlacement="bottomLeft"
      builtinPlacements={BUILT_IN_PLACEMENTS}
      clsPrefix={dropdownPrefixCls}
      // popupTransitionName={this.getDropdownTransitionName()}
      onPopupVisibleChange={props.onDropdownVisibleChange}
      popup={popupElement}
      popupAlign={dropdownAlign}
      popupVisible={visible}
      getPopupContainer={props.getPopupContainer}
      popupClassName={classnames(popupClassName)}
      popupStyle={popupStyle}
    >{props.children}</Trigger>);
  }
};

SelectTrigger.propTypes = propTypes;

export default SelectTrigger;
