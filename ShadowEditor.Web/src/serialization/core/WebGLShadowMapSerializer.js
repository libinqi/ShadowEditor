import BaseSerializer from '../BaseSerializer';
import TexturesSerializer from '../texture/TexturesSerializer';

/**
 * WebGLShadowMapSerializer
 * @author tengge / https://github.com/tengge1
 * @param {*} app 
 */
function WebGLShadowMapSerializer(app) {
    BaseSerializer.call(this, app);
}

WebGLShadowMapSerializer.prototype = Object.create(BaseSerializer.prototype);
WebGLShadowMapSerializer.prototype.constructor = WebGLShadowMapSerializer;

WebGLShadowMapSerializer.prototype.toJSON = function (obj) {
    var json = BaseSerializer.prototype.toJSON.call(this, obj);

    json.autoUpdate = obj.autoUpdate;
    json.enabled = obj.enabled;
    json.needsUpdate = obj.needsUpdate;
    json.type = obj.type;

    return json;
};

WebGLShadowMapSerializer.prototype.fromJSON = function (json, parent) {
    if (parent === undefined) {
        console.warn(`WebGLShadowMapSerializer: parent不允许为空！`);
        return null;
    }

    var obj = parent;

    obj.autoUpdate = json.autoUpdate;
    obj.enabled = json.enabled;
    obj.needsUpdate = true;
    obj.type = json.type;

    return obj;
};

export default WebGLShadowMapSerializer;