webpackHotUpdate("main",{

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_bootstrap_es_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/es/Grid */ "./node_modules/react-bootstrap/es/Grid.js");
/* harmony import */ var pnnl_react_core_lib_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pnnl-react-core/lib/Header */ "./node_modules/pnnl-react-core/lib/Header/index.js");
/* harmony import */ var pnnl_react_core_lib_Header__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(pnnl_react_core_lib_Header__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_pages_Home__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pages/Home */ "./src/components/pages/Home/index.js");
/* harmony import */ var _components_pages_About__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pages/About */ "./src/components/pages/About/index.js");
/* harmony import */ var _components_pages_404__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/pages/404 */ "./src/components/pages/404/index.js");
/* harmony import */ var _components_core_Navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/core/Navigation */ "./src/components/core/Navigation/index.js");
/* harmony import */ var _actions_me__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./actions/me */ "./src/actions/me.js");
var _jsxFileName = "/Users/sche566/OneDrive - PNNL/Desktop/ies_tm30_web_app/src/App.js";











class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentWillMount() {
    const dispatch = this.props.dispatch;
    dispatch(Object(_actions_me__WEBPACK_IMPORTED_MODULE_9__["fetchLoggedInUser"])('self'));
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "App",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(pnnl_react_core_lib_Header__WEBPACK_IMPORTED_MODULE_4___default.a, {
      appLogo: "".concat("", "/images/ies-logo.jpg"),
      appTitle: 'IES - TM30',
      primaryNav: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_core_Navigation__WEBPACK_IMPORTED_MODULE_8__["default"], {
        user: this.props.me,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }),
      hasSearch: false,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_es_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/about",
      component: _components_pages_About__WEBPACK_IMPORTED_MODULE_6__["default"],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/home",
      component: _components_pages_Home__WEBPACK_IMPORTED_MODULE_5__["default"],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      exact: true,
      path: "/",
      component: _components_pages_Home__WEBPACK_IMPORTED_MODULE_5__["default"],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      component: _components_pages_404__WEBPACK_IMPORTED_MODULE_7__["default"],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }))))));
  }

}

const mapStateToProps = state => {
  const me = state.me;
  return {
    me
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, null)(App));

/***/ })

})
//# sourceMappingURL=main.7c8378d15a55d2de7e69.hot-update.js.map