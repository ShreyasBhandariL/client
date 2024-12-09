(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
      module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
      define([], factory);
    } else if (typeof exports === "object") {
      exports.PureCounter = factory();
    } else {
      root.PureCounter = factory();
    }
  })(self, function () {
    return (function (modules) {
      var installedModules = {};
  
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module = (installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {},
        });
  
        modules[moduleId].call(
          module.exports,
          module,
          module.exports,
          __webpack_require__
        );
  
        module.l = true;
  
        return module.exports;
      }
  
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
  
      __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter,
          });
        }
      };
  
      __webpack_require__.r = function (exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module",
          });
        }
        Object.defineProperty(exports, "__esModule", { value: true });
      };
  
      __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if (
          mode & 4 &&
          typeof value === "object" &&
          value &&
          value.__esModule
        )
          return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
          enumerable: true,
          value: value,
        });
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(
              ns,
              key,
              function (key) {
                return value[key];
              }.bind(null, key)
            );
        return ns;
      };
  
      __webpack_require__.n = function (module) {
        var getter =
          module && module.__esModule
            ? function getDefault() {
                return module["default"];
              }
            : function getModuleExports() {
                return module;
              };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
  
      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
  
      __webpack_require__.p = "";
  
      return __webpack_require__((__webpack_require__.s = 638));
    })({
      638: function (module, exports, __webpack_require__) {
        (function (factory) {
          "use strict";
  
          function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
              var symbols = Object.getOwnPropertySymbols(object);
              if (enumerableOnly)
                symbols = symbols.filter(function (sym) {
                  return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                });
              keys.push.apply(keys, symbols);
            }
            return keys;
          }
  
          function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i] != null ? arguments[i] : {};
              if (i % 2) {
                ownKeys(Object(source), true).forEach(function (key) {
                  _defineProperty(target, key, source[key]);
                });
              } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(
                  target,
                  Object.getOwnPropertyDescriptors(source)
                );
              } else {
                ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key)
                  );
                });
              }
            }
            return target;
          }
  
          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
              });
            } else {
              obj[key] = value;
            }
            return obj;
          }
  
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }
  
          function PureCounter() {
            var defaults =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : {};
  
            var config = {
              start: 0,
              end: 100,
              duration: 2000,
              delay: 10,
              once: true,
              pulse: false,
              decimals: 0,
              legacy: true,
              filesizing: false,
              currency: false,
              separator: false,
              formater: "us-US",
              selector: ".purecounter",
            };
  
            function parseValue(data) {
              if (/^[0-9]+\.[0-9]+$/.test(data)) return parseFloat(data);
              if (/^[0-9]+$/.test(data)) return parseInt(data);
              if (/^true|false/i.test(data)) return /^true/i.test(data);
              return data;
            }
  
            function createCounter(element, options) {
              var count = (options.end - options.start) / (options.duration / options.delay),
                direction = options.start > options.end ? "dec" : "inc",
                value = parseValue(options.start);
  
              element.innerHTML = formatNumber(value, options);
  
              if (options.once) {
                element.setAttribute("data-purecounter-duration", 0);
              }
  
              var counter = setInterval(function () {
                var newValue = direction === "inc"
                  ? value + count
                  : value - count;
                element.innerHTML = formatNumber(newValue, options);
  
                if ((newValue >= options.end && direction === "inc") || (newValue <= options.end && direction === "dec")) {
                  element.innerHTML = formatNumber(options.end, options);
  
                  if (options.pulse) {
                    element.setAttribute("data-purecounter-duration", 0);
                    setTimeout(function () {
                      element.setAttribute("data-purecounter-duration", options.duration / 1000);
                    }, options.pulse);
                  }
  
                  clearInterval(counter);
                }
  
                value = newValue;
              }, options.delay);
            }
  
            function formatNumber(value, options) {
              var formattedValue = {
                minimumFractionDigits: options.decimals,
                maximumFractionDigits: options.decimals,
              };
              var formater = _typeof(options.formater) === "string" ? options.formater : undefined;
  
              value = formatFilesize(value, options);
              value = formatCurrency(value, options);
              value = formatSeparator(value, options);
  
              return options.formater
                ? value.toLocaleString(formater, formattedValue)
                : parseInt(value).toString();
            }
  
            function formatFilesize(value, options) {
              if (options.filesizing) {
                var fileSizeUnits = ["bytes", "KB", "MB", "GB", "TB"];
                var fileSize = Math.abs(Number(value));
                var unitIndex = 0;
                var unit = "";
  
                for (var i = 4; i >= 0; i--) {
                  if (fileSize >= Math.pow(1024, i)) {
                    value = (fileSize / Math.pow(1024, i)).toFixed(options.decimals) + " " + fileSizeUnits[i];
                    break;
                  }
                }
  
                return value;
              }
  
              return value;
            }
  
            function formatCurrency(value, options) {
              if (options.currency && typeof options.currency === "string") {
                value = options.currency + value;
              }
  
              return value;
            }
  
            function formatSeparator(value, options) {
              if (options.separator) {
                var separator = typeof options.separator === "string" ? options.separator : ",";
                return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
              }
  
              return value;
            }
  
            function initialize() {
              var elements = document.querySelectorAll(config.selector);
              elements.forEach(function (element) {
                var elementConfig = Object.assign({}, config);
  
                Object.keys(element.attributes).forEach(function (attribute) {
                  if (attribute.startsWith("data-purecounter-")) {
                    var key = attribute.replace("data-purecounter-", "").toLowerCase();
                    var value = parseValue(element.getAttribute(attribute));
                    elementConfig[key] = value;
                  }
                });
  
                createCounter(element, elementConfig);
              });
            }
  
            return initialize();
          }
  
          module.exports = PureCounter;
        })();
      },
    });
  });
  //# sourceMappingURL=purecounter_vanilla.js.map
  