"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_n_book_Documents_GitHub_PactWeave_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\n-book\\\\Documents\\\\GitHub\\\\PactWeave\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_n_book_Documents_GitHub_PactWeave_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNuLWJvb2slNUNEb2N1bWVudHMlNUNHaXRIdWIlNUNQYWN0V2VhdmUlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q24tYm9vayU1Q0RvY3VtZW50cyU1Q0dpdEh1YiU1Q1BhY3RXZWF2ZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDd0M7QUFDckg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYWN0d2VhdmUvPzQyZGMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcbi1ib29rXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcUGFjdFdlYXZlXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG4tYm9va1xcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXFBhY3RXZWF2ZVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNJO0FBRXJDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyw4Q0FBV0E7QUFFTyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhY3R3ZWF2ZS8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvYXV0aCc7XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db/index.ts\");\n\n\n\n\nif (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {\n    throw new Error(\"Missing Google OAuth credentials\");\n}\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            if (!user.email) {\n                return false;\n            }\n            try {\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_3__.connectDB)();\n                const existingUser = await _lib_db__WEBPACK_IMPORTED_MODULE_3__.User.findOne({\n                    email: user.email\n                });\n                if (!existingUser) {\n                    await _lib_db__WEBPACK_IMPORTED_MODULE_3__.User.create({\n                        _id: new (mongoose__WEBPACK_IMPORTED_MODULE_2___default().Types).ObjectId(),\n                        name: user.name,\n                        email: user.email,\n                        image: user.image,\n                        emailVerified: new Date()\n                    });\n                }\n            } catch (error) {\n                console.error(\"Error in signIn callback (non-fatal):\", error);\n            }\n            return true;\n        },\n        async session ({ session, token }) {\n            if (session.user && token.sub) {\n                session.user.id = token.sub;\n            }\n            return session;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.sub = user.id;\n            }\n            return token;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst auth = ()=>(0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authOptions);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQThEO0FBQ047QUFDeEI7QUFDVztBQUUzQyxJQUFJLENBQUNLLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCLElBQUksQ0FBQ0YsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0IsRUFBRTtJQUN0RSxNQUFNLElBQUlDLE1BQU07QUFDbEI7QUFFTyxNQUFNQyxjQUErQjtJQUMxQ0MsV0FBVztRQUNUVixzRUFBY0EsQ0FBQztZQUNiVyxVQUFVUCxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtZQUN0Q00sY0FBY1IsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0I7UUFDaEQ7S0FDRDtJQUNETSxXQUFXO1FBQ1QsTUFBTUMsUUFBTyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsT0FBTyxFQUFFO1lBQ3JDLElBQUksQ0FBQ0YsS0FBS0csS0FBSyxFQUFFO2dCQUNmLE9BQU87WUFDVDtZQUVBLElBQUk7Z0JBQ0YsTUFBTWhCLGtEQUFTQTtnQkFFZixNQUFNaUIsZUFBZSxNQUFNaEIseUNBQUlBLENBQUNpQixPQUFPLENBQUM7b0JBQUVGLE9BQU9ILEtBQUtHLEtBQUs7Z0JBQUM7Z0JBRTVELElBQUksQ0FBQ0MsY0FBYztvQkFDakIsTUFBTWhCLHlDQUFJQSxDQUFDa0IsTUFBTSxDQUFDO3dCQUNoQkMsS0FBSyxJQUFJckIsdURBQWMsQ0FBQ3VCLFFBQVE7d0JBQ2hDQyxNQUFNVixLQUFLVSxJQUFJO3dCQUNmUCxPQUFPSCxLQUFLRyxLQUFLO3dCQUNqQlEsT0FBT1gsS0FBS1csS0FBSzt3QkFDakJDLGVBQWUsSUFBSUM7b0JBQ3JCO2dCQUNGO1lBQ0YsRUFBRSxPQUFPQyxPQUFPO2dCQUNkQyxRQUFRRCxLQUFLLENBQUMseUNBQXlDQTtZQUN6RDtZQUVBLE9BQU87UUFDVDtRQUNBLE1BQU1FLFNBQVEsRUFBRUEsT0FBTyxFQUFFQyxLQUFLLEVBQUU7WUFDOUIsSUFBSUQsUUFBUWhCLElBQUksSUFBSWlCLE1BQU1DLEdBQUcsRUFBRTtnQkFDNUJGLFFBQVFoQixJQUFJLENBQW9CbUIsRUFBRSxHQUFHRixNQUFNQyxHQUFHO1lBQ2pEO1lBQ0EsT0FBT0Y7UUFDVDtRQUNBLE1BQU1JLEtBQUksRUFBRUgsS0FBSyxFQUFFakIsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JpQixNQUFNQyxHQUFHLEdBQUdsQixLQUFLbUIsRUFBRTtZQUNyQjtZQUNBLE9BQU9GO1FBQ1Q7SUFDRjtJQUNBSSxPQUFPO1FBQ0x0QixRQUFRO0lBQ1Y7SUFDQWlCLFNBQVM7UUFDUE0sVUFBVTtJQUNaO0lBQ0FDLFFBQVFsQyxRQUFRQyxHQUFHLENBQUNrQyxlQUFlO0FBQ3JDLEVBQUU7QUFFSyxNQUFNQyxPQUFPLElBQU16QywyREFBZ0JBLENBQUNVLGFBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYWN0d2VhdmUvLi9hdXRoLnRzPzkyMzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zLCBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSc7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgY29ubmVjdERCLCBVc2VyIH0gZnJvbSAnQC9saWIvZGInO1xuXG5pZiAoIXByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHwgIXByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBHb29nbGUgT0F1dGggY3JlZGVudGlhbHMnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgc2lnbkluKHsgdXNlciwgYWNjb3VudCwgcHJvZmlsZSB9KSB7XG4gICAgICBpZiAoIXVzZXIuZW1haWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjb25uZWN0REIoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiB1c2VyLmVtYWlsIH0pO1xuXG4gICAgICAgIGlmICghZXhpc3RpbmdVc2VyKSB7XG4gICAgICAgICAgYXdhaXQgVXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgX2lkOiBuZXcgbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoKSxcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgaW1hZ2U6IHVzZXIuaW1hZ2UsXG4gICAgICAgICAgICBlbWFpbFZlcmlmaWVkOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBzaWduSW4gY2FsbGJhY2sgKG5vbi1mYXRhbCk6JywgZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyICYmIHRva2VuLnN1Yikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIHsgaWQ6IHN0cmluZyB9KS5pZCA9IHRva2VuLnN1YjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uc3ViID0gdXNlci5pZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9hdXRoL3NpZ25pbicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufTtcblxuZXhwb3J0IGNvbnN0IGF1dGggPSAoKSA9PiBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiJdLCJuYW1lcyI6WyJnZXRTZXJ2ZXJTZXNzaW9uIiwiR29vZ2xlUHJvdmlkZXIiLCJtb25nb29zZSIsImNvbm5lY3REQiIsIlVzZXIiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwiRXJyb3IiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsImNsaWVudElkIiwiY2xpZW50U2VjcmV0IiwiY2FsbGJhY2tzIiwic2lnbkluIiwidXNlciIsImFjY291bnQiLCJwcm9maWxlIiwiZW1haWwiLCJleGlzdGluZ1VzZXIiLCJmaW5kT25lIiwiY3JlYXRlIiwiX2lkIiwiVHlwZXMiLCJPYmplY3RJZCIsIm5hbWUiLCJpbWFnZSIsImVtYWlsVmVyaWZpZWQiLCJEYXRlIiwiZXJyb3IiLCJjb25zb2xlIiwic2Vzc2lvbiIsInRva2VuIiwic3ViIiwiaWQiLCJqd3QiLCJwYWdlcyIsInN0cmF0ZWd5Iiwic2VjcmV0IiwiTkVYVEFVVEhfU0VDUkVUIiwiYXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db/connect.ts":
/*!***************************!*\
  !*** ./lib/db/connect.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dns */ \"dns\");\n/* harmony import */ var dns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dns__WEBPACK_IMPORTED_MODULE_1__);\n\n\ndns__WEBPACK_IMPORTED_MODULE_1___default().setServers([\n    \"8.8.8.8\",\n    \"8.8.4.4\"\n]);\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable\");\n}\nlet cached = global.mongoose || {\n    conn: null,\n    promise: null\n};\nif (!global.mongoose) {\n    global.mongoose = cached;\n}\nasync function connectDB() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false,\n            serverSelectionTimeoutMS: 5000,\n            socketTimeoutMS: 45000,\n            family: 4\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        }).catch((error)=>{\n            console.error(\"MongoDB connection error:\", error.message);\n            throw error;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvY29ubmVjdC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFnQztBQUNWO0FBRXRCQyxxREFBYyxDQUFDO0lBQUM7SUFBVztDQUFVO0FBRXJDLE1BQU1FLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUUzQyxJQUFJLENBQUNBLGFBQWE7SUFDaEIsTUFBTSxJQUFJRyxNQUFNO0FBQ2xCO0FBV0EsSUFBSUMsU0FBd0JDLE9BQU9SLFFBQVEsSUFBSTtJQUFFUyxNQUFNO0lBQU1DLFNBQVM7QUFBSztBQUUzRSxJQUFJLENBQUNGLE9BQU9SLFFBQVEsRUFBRTtJQUNwQlEsT0FBT1IsUUFBUSxHQUFHTztBQUNwQjtBQUVBLGVBQWVJO0lBQ2IsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2YsT0FBT0YsT0FBT0UsSUFBSTtJQUNwQjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ25CLE1BQU1FLE9BQU87WUFDWEMsZ0JBQWdCO1lBQ2hCQywwQkFBMEI7WUFDMUJDLGlCQUFpQjtZQUNqQkMsUUFBUTtRQUNWO1FBRUFULE9BQU9HLE9BQU8sR0FBR1YsdURBQWdCLENBQUNHLGFBQWFTLE1BQzVDTSxJQUFJLENBQUMsQ0FBQ2xCO1lBQ0wsT0FBT0E7UUFDVCxHQUNDbUIsS0FBSyxDQUFDLENBQUNDO1lBQ05DLFFBQVFELEtBQUssQ0FBQyw2QkFBNkJBLE1BQU1FLE9BQU87WUFDeEQsTUFBTUY7UUFDUjtJQUNKO0lBRUEsSUFBSTtRQUNGYixPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9hLEdBQUc7UUFDVmhCLE9BQU9HLE9BQU8sR0FBRztRQUNqQixNQUFNYTtJQUNSO0lBRUEsT0FBT2hCLE9BQU9FLElBQUk7QUFDcEI7QUFFQSxpRUFBZUUsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhY3R3ZWF2ZS8uL2xpYi9kYi9jb25uZWN0LnRzPzUyYzQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBkbnMgZnJvbSAnZG5zJztcblxuZG5zLnNldFNlcnZlcnMoWyc4LjguOC44JywgJzguOC40LjQnXSk7XG5cbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkhO1xuXG5pZiAoIU1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUnKTtcbn1cblxuaW50ZXJmYWNlIE1vbmdvb3NlQ2FjaGUge1xuICBjb25uOiB0eXBlb2YgbW9uZ29vc2UgfCBudWxsO1xuICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsO1xufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBtb25nb29zZTogTW9uZ29vc2VDYWNoZSB8IHVuZGVmaW5lZDtcbn1cblxubGV0IGNhY2hlZDogTW9uZ29vc2VDYWNoZSA9IGdsb2JhbC5tb25nb29zZSB8fCB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcblxuaWYgKCFnbG9iYWwubW9uZ29vc2UpIHtcbiAgZ2xvYmFsLm1vbmdvb3NlID0gY2FjaGVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKTogUHJvbWlzZTx0eXBlb2YgbW9uZ29vc2U+IHtcbiAgaWYgKGNhY2hlZC5jb25uKSB7XG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICB9XG5cbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgICBzZXJ2ZXJTZWxlY3Rpb25UaW1lb3V0TVM6IDUwMDAsXG4gICAgICBzb2NrZXRUaW1lb3V0TVM6IDQ1MDAwLFxuICAgICAgZmFtaWx5OiA0LFxuICAgIH07XG5cbiAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpXG4gICAgICAudGhlbigobW9uZ29vc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIG1vbmdvb3NlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTW9uZ29EQiBjb25uZWN0aW9uIGVycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xuICAgIHRocm93IGU7XG4gIH1cblxuICByZXR1cm4gY2FjaGVkLmNvbm47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3REQjtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImRucyIsInNldFNlcnZlcnMiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiY29ubmVjdERCIiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwic2VydmVyU2VsZWN0aW9uVGltZW91dE1TIiwic29ja2V0VGltZW91dE1TIiwiZmFtaWx5IiwiY29ubmVjdCIsInRoZW4iLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/connect.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db/index.ts":
/*!*************************!*\
  !*** ./lib/db/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomFieldSchema: () => (/* reexport safe */ _schemas__WEBPACK_IMPORTED_MODULE_1__.CustomFieldSchema),\n/* harmony export */   Pact: () => (/* reexport safe */ _schemas__WEBPACK_IMPORTED_MODULE_1__.Pact),\n/* harmony export */   User: () => (/* reexport safe */ _schemas__WEBPACK_IMPORTED_MODULE_1__.User),\n/* harmony export */   connectDB: () => (/* reexport safe */ _connect__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connect */ \"(rsc)/./lib/db/connect.ts\");\n/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schemas */ \"(rsc)/./lib/db/schemas/index.ts\");\n/* harmony import */ var _schemas_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schemas/types */ \"(rsc)/./lib/db/schemas/types.ts\");\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFrQztBQUN3QjtBQUVOO0FBQ3BCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFjdHdlYXZlLy4vbGliL2RiL2luZGV4LnRzPzZmOTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbm5lY3REQiBmcm9tICcuL2Nvbm5lY3QnO1xuaW1wb3J0IHsgVXNlciwgUGFjdCwgQ3VzdG9tRmllbGRTY2hlbWEgfSBmcm9tICcuL3NjaGVtYXMnO1xuXG5leHBvcnQgeyBjb25uZWN0REIsIFVzZXIsIFBhY3QsIEN1c3RvbUZpZWxkU2NoZW1hIH07XG5leHBvcnQgKiBmcm9tICcuL3NjaGVtYXMvdHlwZXMnO1xuIl0sIm5hbWVzIjpbImNvbm5lY3REQiIsIlVzZXIiLCJQYWN0IiwiQ3VzdG9tRmllbGRTY2hlbWEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/index.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db/schemas/Pact.ts":
/*!********************************!*\
  !*** ./lib/db/schemas/Pact.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomFieldSchema: () => (/* binding */ CustomFieldSchema),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CustomFieldSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    fieldId: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        required: true\n    },\n    name: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        required: true\n    },\n    type: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        enum: [\n            \"text\",\n            \"number\",\n            \"date\",\n            \"boolean\",\n            \"currency\"\n        ],\n        required: true\n    },\n    value: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.Mixed,\n        default: null\n    },\n    isRequired: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.Boolean,\n        default: false\n    }\n}, {\n    _id: false\n});\nconst PactSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    initiatorId: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n        ref: \"User\",\n        required: true,\n        index: true\n    },\n    counterpartyId: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n        ref: \"User\",\n        default: null,\n        index: true\n    },\n    title: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        required: true,\n        trim: true,\n        maxlength: 200\n    },\n    status: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        enum: [\n            \"Draft\",\n            \"Pending\",\n            \"Signed\",\n            \"Disputed\",\n            \"Resolved\",\n            \"Cancelled\"\n        ],\n        default: \"Draft\",\n        index: true\n    },\n    customFields: {\n        type: [\n            CustomFieldSchema\n        ],\n        default: []\n    },\n    inviteToken: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        unique: true,\n        sparse: true\n    }\n}, {\n    timestamps: true\n});\nPactSchema.index({\n    initiatorId: 1,\n    status: 1\n});\nPactSchema.index({\n    counterpartyId: 1,\n    status: 1\n});\nconst Pact = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Pact || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Pact\", PactSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pact);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvc2NoZW1hcy9QYWN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBbUQ7QUFHbkQsTUFBTUUsb0JBQW9CLElBQUlELDRDQUFNQSxDQUNsQztJQUNFRSxTQUFTO1FBQ1BDLE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNDLE1BQU07UUFDekJDLFVBQVU7SUFDWjtJQUNBQyxNQUFNO1FBQ0pKLE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNDLE1BQU07UUFDekJDLFVBQVU7SUFDWjtJQUNBSCxNQUFNO1FBQ0pBLE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNDLE1BQU07UUFDekJHLE1BQU07WUFBQztZQUFRO1lBQVU7WUFBUTtZQUFXO1NBQVc7UUFDdkRGLFVBQVU7SUFDWjtJQUNBRyxPQUFPO1FBQ0xOLE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNNLEtBQUs7UUFDeEJDLFNBQVM7SUFDWDtJQUNBQyxZQUFZO1FBQ1ZULE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNTLE9BQU87UUFDMUJGLFNBQVM7SUFDWDtBQUNGLEdBQ0E7SUFBRUcsS0FBSztBQUFNO0FBR2YsTUFBTUMsYUFBYSxJQUFJZiw0Q0FBTUEsQ0FDM0I7SUFDRWdCLGFBQWE7UUFDWGIsTUFBTUgsNENBQU1BLENBQUNJLEtBQUssQ0FBQ2EsUUFBUTtRQUMzQkMsS0FBSztRQUNMWixVQUFVO1FBQ1ZhLE9BQU87SUFDVDtJQUNBQyxnQkFBZ0I7UUFDZGpCLE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNhLFFBQVE7UUFDM0JDLEtBQUs7UUFDTFAsU0FBUztRQUNUUSxPQUFPO0lBQ1Q7SUFDQUUsT0FBTztRQUNMbEIsTUFBTUgsNENBQU1BLENBQUNJLEtBQUssQ0FBQ0MsTUFBTTtRQUN6QkMsVUFBVTtRQUNWZ0IsTUFBTTtRQUNOQyxXQUFXO0lBQ2I7SUFDQUMsUUFBUTtRQUNOckIsTUFBTUgsNENBQU1BLENBQUNJLEtBQUssQ0FBQ0MsTUFBTTtRQUN6QkcsTUFBTTtZQUFDO1lBQVM7WUFBVztZQUFVO1lBQVk7WUFBWTtTQUFZO1FBQ3pFRyxTQUFTO1FBQ1RRLE9BQU87SUFDVDtJQUNBTSxjQUFjO1FBQ1p0QixNQUFNO1lBQUNGO1NBQWtCO1FBQ3pCVSxTQUFTLEVBQUU7SUFDYjtJQUNBZSxhQUFhO1FBQ1h2QixNQUFNSCw0Q0FBTUEsQ0FBQ0ksS0FBSyxDQUFDQyxNQUFNO1FBQ3pCc0IsUUFBUTtRQUNSQyxRQUFRO0lBQ1Y7QUFDRixHQUNBO0lBQ0VDLFlBQVk7QUFDZDtBQUdGZCxXQUFXSSxLQUFLLENBQUM7SUFBRUgsYUFBYTtJQUFHUSxRQUFRO0FBQUU7QUFDN0NULFdBQVdJLEtBQUssQ0FBQztJQUFFQyxnQkFBZ0I7SUFBR0ksUUFBUTtBQUFFO0FBRWhELE1BQU1NLE9BQXFCL0Isd0RBQWUsQ0FBQytCLElBQUksSUFBSS9CLHFEQUFjLENBQVEsUUFBUWdCO0FBRWpGLGlFQUFlZSxJQUFJQSxFQUFDO0FBQ1MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYWN0d2VhdmUvLi9saWIvZGIvc2NoZW1hcy9QYWN0LnRzPzk3MjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgTW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBJUGFjdCwgUGFjdFN0YXR1cywgSUN1c3RvbUZpZWxkLCBDdXN0b21GaWVsZFR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgQ3VzdG9tRmllbGRTY2hlbWEgPSBuZXcgU2NoZW1hPElDdXN0b21GaWVsZD4oXG4gIHtcbiAgICBmaWVsZElkOiB7XG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuU3RyaW5nLFxuICAgICAgZW51bTogWyd0ZXh0JywgJ251bWJlcicsICdkYXRlJywgJ2Jvb2xlYW4nLCAnY3VycmVuY3knXSBhcyBDdXN0b21GaWVsZFR5cGVbXSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5NaXhlZCxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgICBpc1JlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHsgX2lkOiBmYWxzZSB9XG4pO1xuXG5jb25zdCBQYWN0U2NoZW1hID0gbmV3IFNjaGVtYTxJUGFjdD4oXG4gIHtcbiAgICBpbml0aWF0b3JJZDoge1xuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgICAgcmVmOiAnVXNlcicsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIGluZGV4OiB0cnVlLFxuICAgIH0sXG4gICAgY291bnRlcnBhcnR5SWQ6IHtcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICAgIHJlZjogJ1VzZXInLFxuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIGluZGV4OiB0cnVlLFxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5TdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBtYXhsZW5ndGg6IDIwMCxcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLlN0cmluZyxcbiAgICAgIGVudW06IFsnRHJhZnQnLCAnUGVuZGluZycsICdTaWduZWQnLCAnRGlzcHV0ZWQnLCAnUmVzb2x2ZWQnLCAnQ2FuY2VsbGVkJ10gYXMgUGFjdFN0YXR1c1tdLFxuICAgICAgZGVmYXVsdDogJ0RyYWZ0JyxcbiAgICAgIGluZGV4OiB0cnVlLFxuICAgIH0sXG4gICAgY3VzdG9tRmllbGRzOiB7XG4gICAgICB0eXBlOiBbQ3VzdG9tRmllbGRTY2hlbWFdLFxuICAgICAgZGVmYXVsdDogW10sXG4gICAgfSxcbiAgICBpbnZpdGVUb2tlbjoge1xuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLlN0cmluZyxcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICAgIHNwYXJzZTogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdGltZXN0YW1wczogdHJ1ZSxcbiAgfVxuKTtcblxuUGFjdFNjaGVtYS5pbmRleCh7IGluaXRpYXRvcklkOiAxLCBzdGF0dXM6IDEgfSk7XG5QYWN0U2NoZW1hLmluZGV4KHsgY291bnRlcnBhcnR5SWQ6IDEsIHN0YXR1czogMSB9KTtcblxuY29uc3QgUGFjdDogTW9kZWw8SVBhY3Q+ID0gbW9uZ29vc2UubW9kZWxzLlBhY3QgfHwgbW9uZ29vc2UubW9kZWw8SVBhY3Q+KCdQYWN0JywgUGFjdFNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IFBhY3Q7XG5leHBvcnQgeyBDdXN0b21GaWVsZFNjaGVtYSB9O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiQ3VzdG9tRmllbGRTY2hlbWEiLCJmaWVsZElkIiwidHlwZSIsIlR5cGVzIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJuYW1lIiwiZW51bSIsInZhbHVlIiwiTWl4ZWQiLCJkZWZhdWx0IiwiaXNSZXF1aXJlZCIsIkJvb2xlYW4iLCJfaWQiLCJQYWN0U2NoZW1hIiwiaW5pdGlhdG9ySWQiLCJPYmplY3RJZCIsInJlZiIsImluZGV4IiwiY291bnRlcnBhcnR5SWQiLCJ0aXRsZSIsInRyaW0iLCJtYXhsZW5ndGgiLCJzdGF0dXMiLCJjdXN0b21GaWVsZHMiLCJpbnZpdGVUb2tlbiIsInVuaXF1ZSIsInNwYXJzZSIsInRpbWVzdGFtcHMiLCJQYWN0IiwibW9kZWxzIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/schemas/Pact.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db/schemas/User.ts":
/*!********************************!*\
  !*** ./lib/db/schemas/User.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        default: null\n    },\n    email: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        required: true,\n        unique: true\n    },\n    image: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.String,\n        default: null\n    },\n    emailVerified: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.Date,\n        default: null\n    }\n}, {\n    timestamps: true\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvc2NoZW1hcy9Vc2VyLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFtRDtBQUduRCxNQUFNRSxhQUFhLElBQUlELDRDQUFNQSxDQUMzQjtJQUNFRSxNQUFNO1FBQ0pDLE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNDLE1BQU07UUFDekJDLFNBQVM7SUFDWDtJQUNBQyxPQUFPO1FBQ0xKLE1BQU1ILDRDQUFNQSxDQUFDSSxLQUFLLENBQUNDLE1BQU07UUFDekJHLFVBQVU7UUFDVkMsUUFBUTtJQUNWO0lBQ0FDLE9BQU87UUFDTFAsTUFBTUgsNENBQU1BLENBQUNJLEtBQUssQ0FBQ0MsTUFBTTtRQUN6QkMsU0FBUztJQUNYO0lBQ0FLLGVBQWU7UUFDYlIsTUFBTUgsNENBQU1BLENBQUNJLEtBQUssQ0FBQ1EsSUFBSTtRQUN2Qk4sU0FBUztJQUNYO0FBQ0YsR0FDQTtJQUNFTyxZQUFZO0FBQ2Q7QUFHRixNQUFNQyxPQUFxQmYsd0RBQWUsQ0FBQ2UsSUFBSSxJQUFJZixxREFBYyxDQUFRLFFBQVFFO0FBRWpGLGlFQUFlYSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFjdHdlYXZlLy4vbGliL2RiL3NjaGVtYXMvVXNlci50cz8xMDQ0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgSVVzZXIgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KFxuICB7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLlN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLlN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdW5pcXVlOiB0cnVlLFxuICAgIH0sXG4gICAgaW1hZ2U6IHtcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5TdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgIH0sXG4gICAgZW1haWxWZXJpZmllZDoge1xuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLkRhdGUsXG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlLFxuICB9XG4pO1xuXG5jb25zdCBVc2VyOiBNb2RlbDxJVXNlcj4gPSBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbDxJVXNlcj4oJ1VzZXInLCBVc2VyU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsIlVzZXJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlR5cGVzIiwiU3RyaW5nIiwiZGVmYXVsdCIsImVtYWlsIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJpbWFnZSIsImVtYWlsVmVyaWZpZWQiLCJEYXRlIiwidGltZXN0YW1wcyIsIlVzZXIiLCJtb2RlbHMiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/schemas/User.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db/schemas/index.ts":
/*!*********************************!*\
  !*** ./lib/db/schemas/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomFieldSchema: () => (/* reexport safe */ _Pact__WEBPACK_IMPORTED_MODULE_1__.CustomFieldSchema),\n/* harmony export */   Pact: () => (/* reexport safe */ _Pact__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   User: () => (/* reexport safe */ _User__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User */ \"(rsc)/./lib/db/schemas/User.ts\");\n/* harmony import */ var _Pact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pact */ \"(rsc)/./lib/db/schemas/Pact.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"(rsc)/./lib/db/schemas/types.ts\");\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvc2NoZW1hcy9pbmRleC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBeUM7QUFDbUI7QUFDcEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYWN0d2VhdmUvLi9saWIvZGIvc2NoZW1hcy9pbmRleC50cz9lMGI2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IGRlZmF1bHQgYXMgVXNlciB9IGZyb20gJy4vVXNlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhY3QsIEN1c3RvbUZpZWxkU2NoZW1hIH0gZnJvbSAnLi9QYWN0JztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuIl0sIm5hbWVzIjpbImRlZmF1bHQiLCJVc2VyIiwiUGFjdCIsIkN1c3RvbUZpZWxkU2NoZW1hIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/schemas/index.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db/schemas/types.ts":
/*!*********************************!*\
  !*** ./lib/db/schemas/types.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvc2NoZW1hcy90eXBlcy50cyIsIm1hcHBpbmdzIjoiO0FBZ0NDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFjdHdlYXZlLy4vbGliL2RiL3NjaGVtYXMvdHlwZXMudHM/NjgzMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5leHBvcnQgdHlwZSBDdXN0b21GaWVsZFR5cGUgPSAndGV4dCcgfCAnbnVtYmVyJyB8ICdkYXRlJyB8ICdib29sZWFuJyB8ICdjdXJyZW5jeSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUN1c3RvbUZpZWxkIHtcbiAgZmllbGRJZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IEN1c3RvbUZpZWxkVHlwZTtcbiAgdmFsdWU6IHVua25vd247XG4gIGlzUmVxdWlyZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIFBhY3RTdGF0dXMgPSAnRHJhZnQnIHwgJ1BlbmRpbmcnIHwgJ1NpZ25lZCcgfCAnRGlzcHV0ZWQnIHwgJ1Jlc29sdmVkJyB8ICdDYW5jZWxsZWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQYWN0IHtcbiAgX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZDtcbiAgaW5pdGlhdG9ySWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkO1xuICBjb3VudGVycGFydHlJZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBzdGF0dXM6IFBhY3RTdGF0dXM7XG4gIGN1c3RvbUZpZWxkczogSUN1c3RvbUZpZWxkW107XG4gIGludml0ZVRva2VuOiBzdHJpbmcgfCBudWxsO1xuICBjcmVhdGVkQXQ6IERhdGU7XG4gIHVwZGF0ZWRBdDogRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVXNlciB7XG4gIF9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQ7XG4gIG5hbWU6IHN0cmluZyB8IG51bGw7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIGltYWdlOiBzdHJpbmcgfCBudWxsO1xuICBlbWFpbFZlcmlmaWVkOiBEYXRlIHwgbnVsbDtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/schemas/types.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cn-book%5CDocuments%5CGitHub%5CPactWeave&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();