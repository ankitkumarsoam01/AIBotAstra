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
exports.id = "pages/api/upload-voice-sample";
exports.ids = ["pages/api/upload-voice-sample"];
exports.modules = {

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = import("formidable");;

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = import("node-fetch");;

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "(api)/./pages/api/upload-voice-sample.ts":
/*!******************************************!*\
  !*** ./pages/api/upload-voice-sample.ts ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node-fetch */ \"node-fetch\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([formidable__WEBPACK_IMPORTED_MODULE_0__, node_fetch__WEBPACK_IMPORTED_MODULE_2__]);\n([formidable__WEBPACK_IMPORTED_MODULE_0__, node_fetch__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nconst config = {\n    api: {\n        bodyParser: false\n    }\n};\nconst backendUrl = \"http://localhost:8000/upload-voice-sample/\";\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            error: \"Method not allowed\"\n        });\n    }\n    const form = (0,formidable__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        keepExtensions: true,\n        maxFileSize: 10 * 1024 * 1024\n    });\n    try {\n        // Convert form.parse to Promise\n        const [fields, files] = await new Promise((resolve, reject)=>{\n            form.parse(req, (err, fields, files)=>{\n                if (err) reject(err);\n                resolve([\n                    fields,\n                    files\n                ]);\n            });\n        });\n        const file = Array.isArray(files.file) ? files.file[0] : files.file;\n        if (!file) {\n            return res.status(400).json({\n                error: \"No file uploaded\"\n            });\n        }\n        const fileData = await fs_promises__WEBPACK_IMPORTED_MODULE_1___default().readFile(file.filepath);\n        const response = await (0,node_fetch__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(backendUrl, {\n            method: \"POST\",\n            body: fileData,\n            headers: {\n                \"Content-Type\": \"audio/webm\",\n                \"Accept\": \"application/json\"\n            }\n        });\n        // Clean up temporary file\n        await fs_promises__WEBPACK_IMPORTED_MODULE_1___default().unlink(file.filepath).catch(console.error);\n        if (!response.ok) {\n            const errorText = await response.text();\n            console.error(\"Backend error:\", errorText);\n            return res.status(response.status).json({\n                error: \"Backend error\",\n                details: errorText\n            });\n        }\n        const data = await response.json();\n        return res.status(200).json(data);\n    } catch (error) {\n        console.error(\"Upload error:\", error);\n        return res.status(500).json({\n            error: \"Failed to upload voice sample\",\n            details: error instanceof Error ? error.message : \"Unknown error\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdXBsb2FkLXZvaWNlLXNhbXBsZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDb0M7QUFDUDtBQUNFO0FBRXhCLE1BQU1HLFNBQVM7SUFDcEJDLEtBQUs7UUFDSEMsWUFBWTtJQUNkO0FBQ0YsRUFBRTtBQUVGLE1BQU1DLGFBQWE7QUFFSixlQUFlQyxRQUFRQyxHQUFtQixFQUFFQyxHQUFvQjtJQUM3RSxJQUFJRCxJQUFJRSxXQUFXLFFBQVE7UUFDekIsT0FBT0QsSUFBSUUsT0FBTyxLQUFLQyxLQUFLO1lBQUVDLE9BQU87UUFBcUI7SUFDNUQ7SUFFQSxNQUFNQyxPQUFPZCxzREFBVUEsQ0FBQztRQUN0QmUsZ0JBQWdCO1FBQ2hCQyxhQUFhLEtBQUssT0FBTztJQUMzQjtJQUVBLElBQUk7UUFDRixnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDQyxRQUFRQyxNQUFNLEdBQUcsTUFBTSxJQUFJQyxRQUFRLENBQUNDLFNBQVNDO1lBQ2xEUCxLQUFLUSxNQUFNZCxLQUFLLENBQUNlLEtBQUtOLFFBQVFDO2dCQUM1QixJQUFJSyxLQUFLRixPQUFPRTtnQkFDaEJILFFBQVE7b0JBQUNIO29CQUFRQztpQkFBTTtZQUN6QjtRQUNGO1FBRUEsTUFBTU0sT0FBT0MsTUFBTUMsUUFBUVIsTUFBTU0sUUFBUU4sTUFBTU0sSUFBSSxDQUFDLEVBQUUsR0FBR04sTUFBTU07UUFDL0QsSUFBSSxDQUFDQSxNQUFNO1lBQ1QsT0FBT2YsSUFBSUUsT0FBTyxLQUFLQyxLQUFLO2dCQUFFQyxPQUFPO1lBQW1CO1FBQzFEO1FBRUEsTUFBTWMsV0FBVyxNQUFNMUIsMkRBQVcyQixDQUFDSixLQUFLSztRQUV4QyxNQUFNQyxXQUFXLE1BQU01QixzREFBS0EsQ0FBQ0ksWUFBWTtZQUN2Q0ksUUFBUTtZQUNScUIsTUFBTUo7WUFDTkssU0FBUztnQkFDUCxnQkFBZ0I7Z0JBQ2hCLFVBQVU7WUFDWjtRQUNGO1FBRUEsMEJBQTBCO1FBQzFCLE1BQU0vQix5REFBU2dDLENBQUNULEtBQUtLLFVBQVVLLE1BQU1DLFFBQVF0QjtRQUU3QyxJQUFJLENBQUNpQixTQUFTTSxJQUFJO1lBQ2hCLE1BQU1DLFlBQVksTUFBTVAsU0FBU1E7WUFDakNILFFBQVF0QixNQUFNLGtCQUFrQndCO1lBQ2hDLE9BQU81QixJQUFJRSxPQUFPbUIsU0FBU25CLFFBQVFDLEtBQUs7Z0JBQ3RDQyxPQUFPO2dCQUNQMEIsU0FBU0Y7WUFDWDtRQUNGO1FBRUEsTUFBTUcsT0FBTyxNQUFNVixTQUFTbEI7UUFDNUIsT0FBT0gsSUFBSUUsT0FBTyxLQUFLQyxLQUFLNEI7SUFFOUIsRUFBRSxPQUFPM0IsT0FBTztRQUNkc0IsUUFBUXRCLE1BQU0saUJBQWlCQTtRQUMvQixPQUFPSixJQUFJRSxPQUFPLEtBQUtDLEtBQUs7WUFDMUJDLE9BQU87WUFDUDBCLFNBQVMxQixpQkFBaUI0QixRQUFRNUIsTUFBTTZCLFVBQVU7UUFDcEQ7SUFDRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWlib3QtYXN0cmEtZnJvbnRlbmQvLi9wYWdlcy9hcGkvdXBsb2FkLXZvaWNlLXNhbXBsZS50cz8xYzAwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IGZvcm1pZGFibGUgZnJvbSAnZm9ybWlkYWJsZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnO1xuaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBib2R5UGFyc2VyOiBmYWxzZSxcbiAgfSxcbn07XG5cbmNvbnN0IGJhY2tlbmRVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwL3VwbG9hZC12b2ljZS1zYW1wbGUvJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5qc29uKHsgZXJyb3I6ICdNZXRob2Qgbm90IGFsbG93ZWQnIH0pO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGZvcm1pZGFibGUoe1xuICAgIGtlZXBFeHRlbnNpb25zOiB0cnVlLFxuICAgIG1heEZpbGVTaXplOiAxMCAqIDEwMjQgKiAxMDI0LCAvLyAxME1CIGxpbWl0XG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgLy8gQ29udmVydCBmb3JtLnBhcnNlIHRvIFByb21pc2VcbiAgICBjb25zdCBbZmllbGRzLCBmaWxlc10gPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmb3JtLnBhcnNlKHJlcSwgKGVyciwgZmllbGRzLCBmaWxlcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgcmVzb2x2ZShbZmllbGRzLCBmaWxlc10pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWxlID0gQXJyYXkuaXNBcnJheShmaWxlcy5maWxlKSA/IGZpbGVzLmZpbGVbMF0gOiBmaWxlcy5maWxlO1xuICAgIGlmICghZmlsZSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdObyBmaWxlIHVwbG9hZGVkJyB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlRGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGUuZmlsZXBhdGgpO1xuICAgIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYmFja2VuZFVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBmaWxlRGF0YSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhdWRpby93ZWJtJyxcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBDbGVhbiB1cCB0ZW1wb3JhcnkgZmlsZVxuICAgIGF3YWl0IGZzLnVubGluayhmaWxlLmZpbGVwYXRoKS5jYXRjaChjb25zb2xlLmVycm9yKTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IGVycm9yVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0JhY2tlbmQgZXJyb3I6JywgZXJyb3JUZXh0KTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKHJlc3BvbnNlLnN0YXR1cykuanNvbih7IFxuICAgICAgICBlcnJvcjogJ0JhY2tlbmQgZXJyb3InLFxuICAgICAgICBkZXRhaWxzOiBlcnJvclRleHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKGRhdGEpO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVXBsb2FkIGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBcbiAgICAgIGVycm9yOiAnRmFpbGVkIHRvIHVwbG9hZCB2b2ljZSBzYW1wbGUnLFxuICAgICAgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcidcbiAgICB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImZvcm1pZGFibGUiLCJmcyIsImZldGNoIiwiY29uZmlnIiwiYXBpIiwiYm9keVBhcnNlciIsImJhY2tlbmRVcmwiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiZm9ybSIsImtlZXBFeHRlbnNpb25zIiwibWF4RmlsZVNpemUiLCJmaWVsZHMiLCJmaWxlcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGFyc2UiLCJlcnIiLCJmaWxlIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsZURhdGEiLCJyZWFkRmlsZSIsImZpbGVwYXRoIiwicmVzcG9uc2UiLCJib2R5IiwiaGVhZGVycyIsInVubGluayIsImNhdGNoIiwiY29uc29sZSIsIm9rIiwiZXJyb3JUZXh0IiwidGV4dCIsImRldGFpbHMiLCJkYXRhIiwiRXJyb3IiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/upload-voice-sample.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/upload-voice-sample.ts"));
module.exports = __webpack_exports__;

})();