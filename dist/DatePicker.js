"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DatePicker;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _react = require("react");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _ChevronLeft = _interopRequireDefault(require("./assets/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("./assets/ChevronRight"));
var _ChevronsLeft = _interopRequireDefault(require("./assets/ChevronsLeft"));
var _ChevronsRight = _interopRequireDefault(require("./assets/ChevronsRight"));
var _Home = _interopRequireDefault(require("./assets/Home"));
var _Select = _interopRequireDefault(require("./components/Select"));
var _useOnClickOutside = require("./hooks/useOnClickOutside");
var _jsxRuntime = require("react/jsx-runtime");
var Container = _styledComponents.default.div.withConfig({
  displayName: "DatePicker__Container",
  componentId: "sc-1hg4lhw-0"
})(["position:relative;--mainColor:#449f21;--lightGreen:#f3fff3;font-family:'Lexend Deca',sans-serif;"]);
var InputContainer = _styledComponents.default.div.withConfig({
  displayName: "DatePicker__InputContainer",
  componentId: "sc-1hg4lhw-1"
})(["display:flex;flex-direction:column;align-items:flex-start;margin:20px 0;font-size:18px;width:calc(100% - 4px);& label{font-size:18px;font-weight:600;color:var(--mainColor);margin:5px 0;}& input{font-size:18px;padding:.4em;width:calc(100% - .8em);border:2px solid var(--mainColor);background-color:white;border-radius:5px;color:var(--mainColor);font-family:'Lexend Deca',sans-serif;font-weight:600;transition:all 200ms ease;cursor:pointer;&::-webkit-datetime-edit-day-field:focus,::-webkit-datetime-edit-month-field:focus,::-webkit-datetime-edit-year-field:focus{color:var(--mainColor);background-color:var(--lightGreen);}&:focus-visible{outline:none;background-color:var(--lightGreen);}&:hover{box-shadow:0 4px 4px #ceeca464;}}"]);
var CalendarContainer = _styledComponents.default.div.withConfig({
  displayName: "DatePicker__CalendarContainer",
  componentId: "sc-1hg4lhw-2"
})(["padding:20px;border-radius:10px;border:2px solid var(--mainColor);background-color:white;display:none;position:absolute;z-index:50;width:400px;&.active{display:block;}& ul.table-header{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;list-style-type:none;padding:0;position:relative;opacity:.6;z-index:-1;& li{text-align:center;color:var(--mainColor);}&::before{content:'';position:absolute;width:100%;height:2px;bottom:-12px;background-color:var(--mainColor);border-radius:5px;}}& div.header{display:flex;width:100%;height:50px;justify-content:space-between;align-items:center;& div.date{display:flex;flex-direction:column;align-items:center;position:absolute;left:50%;transform:translateX(-50%);& p{margin:0;color:var(--mainColor);}}& div.button-container{display:flex;justify-content:flex-end;gap:10px;&.prev{justify-content:flex-start;}& button{width:35px;height:35px;display:grid;place-content:center;border:0;padding:10px;margin:0;border-radius:50%;cursor:pointer;background-color:var(--mainColor);& svg{height:15px;fill:var(--lightGreen);}}}}& div.days-container{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;& div.day{border-radius:5px;padding:10px 0;color:var(--mainColor);text-align:center;cursor:pointer;transition:all 200ms ease;&.today{background-color:var(--lightGreen);outline:2px solid var(--mainColor);}&:hover{background-color:#e4f6c7;}&.other-month{opacity:.5;}}}"]);
var timestamp = new Date();
function DatePicker(_ref) {
  var label = _ref.label,
    name = _ref.name,
    whiteBackground = _ref.whiteBackground,
    onChange = _ref.onChange;
  var ref = (0, _react.useRef)();
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    daysOfMonth = _useState2[0],
    setDaysOfMonth = _useState2[1];
  var _useState3 = (0, _react.useState)(timestamp.getFullYear()),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    year = _useState4[0],
    setYear = _useState4[1];
  var _useState5 = (0, _react.useState)(timestamp.getMonth()),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    month = _useState6[0],
    setMonth = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    active = _useState8[0],
    setActive = _useState8[1];
  var _useState9 = (0, _react.useState)("".concat(timestamp.getFullYear(), "-").concat(('0' + (timestamp.getMonth() + 1)).slice(-2), "-").concat(('0' + timestamp.getDate()).slice(-2))),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    inputDate = _useState10[0],
    setInputDate = _useState10[1];
  (0, _useOnClickOutside.useOnClickOutside)(ref, function () {
    return setActive(false);
  });
  function getNumberOfDays() {
    return 40 - new Date(2022, month, 40).getDate();
  }
  (0, _react.useEffect)(function () {
    function getDaysOfMonth() {
      var tempMonthArray = [];
      var firstDay = new Date(year, month).getDay();
      var lastDay = 7 - new Date(year, month + 1).getDay();
      for (var i = -firstDay + 1; i <= getNumberOfDays() + lastDay; i++) {
        var day = new Date(year, month, i);
        var otherMonth = false;
        if (i <= 0 || i > getNumberOfDays()) {
          otherMonth = true;
        }
        tempMonthArray.push({
          day: day.getDate(),
          date: day,
          otherMonth: otherMonth
        });
      }
      setDaysOfMonth(tempMonthArray);
    }
    getDaysOfMonth();
  }, [month, year]);
  function handleNextMonth(e) {
    e.preventDefault();
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }
  function handlePreviousMonth(e) {
    e.preventDefault();
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }
  function handleToday(e) {
    e.preventDefault();
    setYear(timestamp.getFullYear());
    setMonth(timestamp.getMonth());
  }
  function handleNextYear(e) {
    e.preventDefault();
    setYear(year + 1);
  }
  function handlePreviousYear(e) {
    e.preventDefault();
    setYear(year - 1);
  }
  function handleActive() {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  }
  function handleDayClick(e) {
    var date = new Date(year, month, e.target.textContent);
    setInputDate("".concat(date.getFullYear(), "-").concat(('0' + (date.getMonth() + 1)).slice(-2), "-").concat(('0' + date.getDate()).slice(-2)));
    setActive(false);
    onChange(date, name);
  }
  return daysOfMonth && /*#__PURE__*/(0, _jsxRuntime.jsxs)(Container, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(InputContainer, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        htmlFor: name,
        children: label
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        id: name,
        type: "date",
        value: inputDate,
        onChange: function onChange(e) {
          return console.log(e);
        },
        onClick: handleActive
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(CalendarContainer, {
      className: active ? 'active' : '',
      ref: ref,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "header",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "button-container prev",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: handlePreviousYear,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChevronsLeft.default, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: handlePreviousMonth,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChevronLeft.default, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: handleToday,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {})
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "date",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
            defaultData: year,
            sendData: function sendData(e) {
              return setYear(e);
            },
            dataSource: "years",
            customStyle: {
              margin: 0,
              fontSize: '32px',
              fontWeight: 600
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
            defaultData: month,
            sendData: function sendData(e) {
              return setMonth(e);
            },
            dataSource: "months"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "button-container",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: handleNextMonth,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChevronRight.default, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: handleNextYear,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChevronsRight.default, {})
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
        className: "table-header",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "S"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "M"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "T"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "W"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "T"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "F"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "S"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "days-container",
        children: daysOfMonth.map(function (day, index) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            date: day.date,
            className: "day".concat(day.otherMonth ? ' other-month' : '', " ").concat(year === timestamp.getFullYear() && month === timestamp.getMonth() && day.day === timestamp.getDate() ? 'today' : ''),
            onClick: handleDayClick,
            children: day.day
          }, index);
        })
      })]
    })]
  });
}