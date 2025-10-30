"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-retry-allowed";
exports.ids = ["vendor-chunks/is-retry-allowed"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-retry-allowed/index.js":
/*!************************************************!*\
  !*** ./node_modules/is-retry-allowed/index.js ***!
  \************************************************/
/***/ ((module) => {

eval("\n\nconst denyList = new Set([\n\t'ENOTFOUND',\n\t'ENETUNREACH',\n\n\t// SSL errors from https://github.com/nodejs/node/blob/fc8e3e2cdc521978351de257030db0076d79e0ab/src/crypto/crypto_common.cc#L301-L328\n\t'UNABLE_TO_GET_ISSUER_CERT',\n\t'UNABLE_TO_GET_CRL',\n\t'UNABLE_TO_DECRYPT_CERT_SIGNATURE',\n\t'UNABLE_TO_DECRYPT_CRL_SIGNATURE',\n\t'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',\n\t'CERT_SIGNATURE_FAILURE',\n\t'CRL_SIGNATURE_FAILURE',\n\t'CERT_NOT_YET_VALID',\n\t'CERT_HAS_EXPIRED',\n\t'CRL_NOT_YET_VALID',\n\t'CRL_HAS_EXPIRED',\n\t'ERROR_IN_CERT_NOT_BEFORE_FIELD',\n\t'ERROR_IN_CERT_NOT_AFTER_FIELD',\n\t'ERROR_IN_CRL_LAST_UPDATE_FIELD',\n\t'ERROR_IN_CRL_NEXT_UPDATE_FIELD',\n\t'OUT_OF_MEM',\n\t'DEPTH_ZERO_SELF_SIGNED_CERT',\n\t'SELF_SIGNED_CERT_IN_CHAIN',\n\t'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',\n\t'UNABLE_TO_VERIFY_LEAF_SIGNATURE',\n\t'CERT_CHAIN_TOO_LONG',\n\t'CERT_REVOKED',\n\t'INVALID_CA',\n\t'PATH_LENGTH_EXCEEDED',\n\t'INVALID_PURPOSE',\n\t'CERT_UNTRUSTED',\n\t'CERT_REJECTED',\n\t'HOSTNAME_MISMATCH'\n]);\n\n// TODO: Use `error?.code` when targeting Node.js 14\nmodule.exports = error => !denyList.has(error && error.code);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtcmV0cnktYWxsb3dlZC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9ub2RlX21vZHVsZXMvaXMtcmV0cnktYWxsb3dlZC9pbmRleC5qcz83MjgwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGVueUxpc3QgPSBuZXcgU2V0KFtcblx0J0VOT1RGT1VORCcsXG5cdCdFTkVUVU5SRUFDSCcsXG5cblx0Ly8gU1NMIGVycm9ycyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL2ZjOGUzZTJjZGM1MjE5NzgzNTFkZTI1NzAzMGRiMDA3NmQ3OWUwYWIvc3JjL2NyeXB0by9jcnlwdG9fY29tbW9uLmNjI0wzMDEtTDMyOFxuXHQnVU5BQkxFX1RPX0dFVF9JU1NVRVJfQ0VSVCcsXG5cdCdVTkFCTEVfVE9fR0VUX0NSTCcsXG5cdCdVTkFCTEVfVE9fREVDUllQVF9DRVJUX1NJR05BVFVSRScsXG5cdCdVTkFCTEVfVE9fREVDUllQVF9DUkxfU0lHTkFUVVJFJyxcblx0J1VOQUJMRV9UT19ERUNPREVfSVNTVUVSX1BVQkxJQ19LRVknLFxuXHQnQ0VSVF9TSUdOQVRVUkVfRkFJTFVSRScsXG5cdCdDUkxfU0lHTkFUVVJFX0ZBSUxVUkUnLFxuXHQnQ0VSVF9OT1RfWUVUX1ZBTElEJyxcblx0J0NFUlRfSEFTX0VYUElSRUQnLFxuXHQnQ1JMX05PVF9ZRVRfVkFMSUQnLFxuXHQnQ1JMX0hBU19FWFBJUkVEJyxcblx0J0VSUk9SX0lOX0NFUlRfTk9UX0JFRk9SRV9GSUVMRCcsXG5cdCdFUlJPUl9JTl9DRVJUX05PVF9BRlRFUl9GSUVMRCcsXG5cdCdFUlJPUl9JTl9DUkxfTEFTVF9VUERBVEVfRklFTEQnLFxuXHQnRVJST1JfSU5fQ1JMX05FWFRfVVBEQVRFX0ZJRUxEJyxcblx0J09VVF9PRl9NRU0nLFxuXHQnREVQVEhfWkVST19TRUxGX1NJR05FRF9DRVJUJyxcblx0J1NFTEZfU0lHTkVEX0NFUlRfSU5fQ0hBSU4nLFxuXHQnVU5BQkxFX1RPX0dFVF9JU1NVRVJfQ0VSVF9MT0NBTExZJyxcblx0J1VOQUJMRV9UT19WRVJJRllfTEVBRl9TSUdOQVRVUkUnLFxuXHQnQ0VSVF9DSEFJTl9UT09fTE9ORycsXG5cdCdDRVJUX1JFVk9LRUQnLFxuXHQnSU5WQUxJRF9DQScsXG5cdCdQQVRIX0xFTkdUSF9FWENFRURFRCcsXG5cdCdJTlZBTElEX1BVUlBPU0UnLFxuXHQnQ0VSVF9VTlRSVVNURUQnLFxuXHQnQ0VSVF9SRUpFQ1RFRCcsXG5cdCdIT1NUTkFNRV9NSVNNQVRDSCdcbl0pO1xuXG4vLyBUT0RPOiBVc2UgYGVycm9yPy5jb2RlYCB3aGVuIHRhcmdldGluZyBOb2RlLmpzIDE0XG5tb2R1bGUuZXhwb3J0cyA9IGVycm9yID0+ICFkZW55TGlzdC5oYXMoZXJyb3IgJiYgZXJyb3IuY29kZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-retry-allowed/index.js\n");

/***/ })

};
;