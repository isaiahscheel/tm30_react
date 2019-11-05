webpackHotUpdate("main",{

/***/ "./src/components/pages/Home/Home.jsx":
/*!********************************************!*\
  !*** ./src/components/pages/Home/Home.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_es_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/es/Grid */ "./node_modules/react-bootstrap/es/Grid.js");
/* harmony import */ var react_bootstrap_es_Col__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap/es/Col */ "./node_modules/react-bootstrap/es/Col.js");
/* harmony import */ var pnnl_react_core_lib_ProfilePopover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pnnl-react-core/lib/ProfilePopover */ "./node_modules/pnnl-react-core/lib/ProfilePopover/index.js");
/* harmony import */ var pnnl_react_core_lib_ProfilePopover__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(pnnl_react_core_lib_ProfilePopover__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var pnnl_react_core_lib_ActionBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pnnl-react-core/lib/ActionBar */ "./node_modules/pnnl-react-core/lib/ActionBar/index.js");
/* harmony import */ var pnnl_react_core_lib_ActionBar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(pnnl_react_core_lib_ActionBar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var pnnl_react_core_lib_Action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! pnnl-react-core/lib/Action */ "./node_modules/pnnl-react-core/lib/Action/index.js");
/* harmony import */ var pnnl_react_core_lib_Action__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(pnnl_react_core_lib_Action__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Users/sche566/OneDrive - PNNL/Desktop/ies_tm30_web_app/src/components/pages/Home/Home.jsx";









const Home = ({
  me
}) => {
  if (me.id) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_es_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "home-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: undefined
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: undefined
    }, "TM30 Calculator"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: undefined
    }, "This is a place holder for text about the calculator, version, authors, etc."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(pnnl_react_core_lib_ProfilePopover__WEBPACK_IMPORTED_MODULE_5___default.a, {
      person: me,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: undefined
    }));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "home-container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: undefined
  }, "Home Page Title"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, "No Data was fetched yet."));
};

Home.propTypes = {
  /**
    * A Person object for the person you want to create the card for.
    *
    *
    * The object needs to have the same naming convention as: https://api.pnl.gov/operations/v2/people/{hid}/?expand=space,facility
    * */
  me: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    portraitLink: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    firstName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    lastName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  })
};
Home.defaultProps = {
  me: {}
};

const mapStateToProps = state => {
  const me = state.me;
  return {
    me
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(Home));

/***/ })

})
//# sourceMappingURL=main.7806e7acfaa9f0670472.hot-update.js.map