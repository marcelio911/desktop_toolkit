"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.schema = void 0;
var electron_store_1 = __importDefault(require("electron-store"));
var json_schema_typed_1 = require("json-schema-typed");
var schema = {
    useMacOSWindowActionButtons: {
        type: json_schema_typed_1.JSONSchemaType.Boolean,
        default: false
    },
    windowBounds: {
        type: json_schema_typed_1.JSONSchemaType.Object,
        default: {
            width: 1100,
            minWidth: 1000,
            minHeight: 600,
            height: 700
        }
    }
};
exports.schema = schema;
var config = new electron_store_1.default({
    schema: schema,
    watch: true
});
exports.config = config;
//# sourceMappingURL=config.js.map