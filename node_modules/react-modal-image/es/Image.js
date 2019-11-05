function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";

import { SpinnerIcon } from "./icons";

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image() {
    var _temp, _this, _ret;

    _classCallCheck(this, Image);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      loading: true
    }, _this.handleOnLoad = function () {
      _this.setState({ loading: false });
    }, _this.handleOnContextMenu = function (event) {
      !_this.props.contextMenu && event.preventDefault();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Image.prototype.render = function render() {
    var _props = this.props,
        id = _props.id,
        className = _props.className,
        src = _props.src,
        style = _props.style,
        handleDoubleClick = _props.handleDoubleClick;


    return React.createElement(
      "div",
      null,
      this.state.loading && React.createElement(SpinnerIcon, null),
      React.createElement("img", {
        id: id,
        className: className,
        src: src,
        style: style,
        onLoad: this.handleOnLoad,
        onDoubleClick: handleDoubleClick,
        onContextMenu: this.handleOnContextMenu
      })
    );
  };

  return Image;
}(Component);

export { Image as default };