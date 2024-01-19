/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */

import * as webgl from "./webgl";

type GLint64 = number;
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
type GLuint64 = number;
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
interface WebGLQuery {
}
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
interface WebGLSampler {
}
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
interface WebGLSync {
}
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
interface WebGLTransformFeedback {
}
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
interface WebGLVertexArrayObject {
}
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
type Uint32List = Uint32Array | webgl.GLuint[];
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
interface WebGL2RenderingContextBase {
    readonly READ_BUFFER: webgl.GLenum;
    readonly UNPACK_ROW_LENGTH: webgl.GLenum;
    readonly UNPACK_SKIP_ROWS: webgl.GLenum;
    readonly UNPACK_SKIP_PIXELS: webgl.GLenum;
    readonly PACK_ROW_LENGTH: webgl.GLenum;
    readonly PACK_SKIP_ROWS: webgl.GLenum;
    readonly PACK_SKIP_PIXELS: webgl.GLenum;
    readonly COLOR: webgl.GLenum;
    readonly DEPTH: webgl.GLenum;
    readonly STENCIL: webgl.GLenum;
    readonly RED: webgl.GLenum;
    readonly RGB8: webgl.GLenum;
    readonly RGBA8: webgl.GLenum;
    readonly RGB10_A2: webgl.GLenum;
    readonly TEXTURE_BINDING_3D: webgl.GLenum;
    readonly UNPACK_SKIP_IMAGES: webgl.GLenum;
    readonly UNPACK_IMAGE_HEIGHT: webgl.GLenum;
    readonly TEXTURE_3D: webgl.GLenum;
    readonly TEXTURE_WRAP_R: webgl.GLenum;
    readonly MAX_3D_TEXTURE_SIZE: webgl.GLenum;
    readonly UNSIGNED_INT_2_10_10_10_REV: webgl.GLenum;
    readonly MAX_ELEMENTS_VERTICES: webgl.GLenum;
    readonly MAX_ELEMENTS_INDICES: webgl.GLenum;
    readonly TEXTURE_MIN_LOD: webgl.GLenum;
    readonly TEXTURE_MAX_LOD: webgl.GLenum;
    readonly TEXTURE_BASE_LEVEL: webgl.GLenum;
    readonly TEXTURE_MAX_LEVEL: webgl.GLenum;
    readonly MIN: webgl.GLenum;
    readonly MAX: webgl.GLenum;
    readonly DEPTH_COMPONENT24: webgl.GLenum;
    readonly MAX_TEXTURE_LOD_BIAS: webgl.GLenum;
    readonly TEXTURE_COMPARE_MODE: webgl.GLenum;
    readonly TEXTURE_COMPARE_FUNC: webgl.GLenum;
    readonly CURRENT_QUERY: webgl.GLenum;
    readonly QUERY_RESULT: webgl.GLenum;
    readonly QUERY_RESULT_AVAILABLE: webgl.GLenum;
    readonly STREAM_READ: webgl.GLenum;
    readonly STREAM_COPY: webgl.GLenum;
    readonly STATIC_READ: webgl.GLenum;
    readonly STATIC_COPY: webgl.GLenum;
    readonly DYNAMIC_READ: webgl.GLenum;
    readonly DYNAMIC_COPY: webgl.GLenum;
    readonly MAX_DRAW_BUFFERS: webgl.GLenum;
    readonly DRAW_BUFFER0: webgl.GLenum;
    readonly DRAW_BUFFER1: webgl.GLenum;
    readonly DRAW_BUFFER2: webgl.GLenum;
    readonly DRAW_BUFFER3: webgl.GLenum;
    readonly DRAW_BUFFER4: webgl.GLenum;
    readonly DRAW_BUFFER5: webgl.GLenum;
    readonly DRAW_BUFFER6: webgl.GLenum;
    readonly DRAW_BUFFER7: webgl.GLenum;
    readonly DRAW_BUFFER8: webgl.GLenum;
    readonly DRAW_BUFFER9: webgl.GLenum;
    readonly DRAW_BUFFER10: webgl.GLenum;
    readonly DRAW_BUFFER11: webgl.GLenum;
    readonly DRAW_BUFFER12: webgl.GLenum;
    readonly DRAW_BUFFER13: webgl.GLenum;
    readonly DRAW_BUFFER14: webgl.GLenum;
    readonly DRAW_BUFFER15: webgl.GLenum;
    readonly MAX_FRAGMENT_UNIFORM_COMPONENTS: webgl.GLenum;
    readonly MAX_VERTEX_UNIFORM_COMPONENTS: webgl.GLenum;
    readonly SAMPLER_3D: webgl.GLenum;
    readonly SAMPLER_2D_SHADOW: webgl.GLenum;
    readonly FRAGMENT_SHADER_DERIVATIVE_HINT: webgl.GLenum;
    readonly PIXEL_PACK_BUFFER: webgl.GLenum;
    readonly PIXEL_UNPACK_BUFFER: webgl.GLenum;
    readonly PIXEL_PACK_BUFFER_BINDING: webgl.GLenum;
    readonly PIXEL_UNPACK_BUFFER_BINDING: webgl.GLenum;
    readonly FLOAT_MAT2x3: webgl.GLenum;
    readonly FLOAT_MAT2x4: webgl.GLenum;
    readonly FLOAT_MAT3x2: webgl.GLenum;
    readonly FLOAT_MAT3x4: webgl.GLenum;
    readonly FLOAT_MAT4x2: webgl.GLenum;
    readonly FLOAT_MAT4x3: webgl.GLenum;
    readonly SRGB: webgl.GLenum;
    readonly SRGB8: webgl.GLenum;
    readonly SRGB8_ALPHA8: webgl.GLenum;
    readonly COMPARE_REF_TO_TEXTURE: webgl.GLenum;
    readonly RGBA32F: webgl.GLenum;
    readonly RGB32F: webgl.GLenum;
    readonly RGBA16F: webgl.GLenum;
    readonly RGB16F: webgl.GLenum;
    readonly VERTEX_ATTRIB_ARRAY_INTEGER: webgl.GLenum;
    readonly MAX_ARRAY_TEXTURE_LAYERS: webgl.GLenum;
    readonly MIN_PROGRAM_TEXEL_OFFSET: webgl.GLenum;
    readonly MAX_PROGRAM_TEXEL_OFFSET: webgl.GLenum;
    readonly MAX_VARYING_COMPONENTS: webgl.GLenum;
    readonly TEXTURE_2D_ARRAY: webgl.GLenum;
    readonly TEXTURE_BINDING_2D_ARRAY: webgl.GLenum;
    readonly R11F_G11F_B10F: webgl.GLenum;
    readonly UNSIGNED_INT_10F_11F_11F_REV: webgl.GLenum;
    readonly RGB9_E5: webgl.GLenum;
    readonly UNSIGNED_INT_5_9_9_9_REV: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_MODE: webgl.GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_VARYINGS: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_START: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_SIZE: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: webgl.GLenum;
    readonly RASTERIZER_DISCARD: webgl.GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: webgl.GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: webgl.GLenum;
    readonly INTERLEAVED_ATTRIBS: webgl.GLenum;
    readonly SEPARATE_ATTRIBS: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_BINDING: webgl.GLenum;
    readonly RGBA32UI: webgl.GLenum;
    readonly RGB32UI: webgl.GLenum;
    readonly RGBA16UI: webgl.GLenum;
    readonly RGB16UI: webgl.GLenum;
    readonly RGBA8UI: webgl.GLenum;
    readonly RGB8UI: webgl.GLenum;
    readonly RGBA32I: webgl.GLenum;
    readonly RGB32I: webgl.GLenum;
    readonly RGBA16I: webgl.GLenum;
    readonly RGB16I: webgl.GLenum;
    readonly RGBA8I: webgl.GLenum;
    readonly RGB8I: webgl.GLenum;
    readonly RED_INTEGER: webgl.GLenum;
    readonly RGB_INTEGER: webgl.GLenum;
    readonly RGBA_INTEGER: webgl.GLenum;
    readonly SAMPLER_2D_ARRAY: webgl.GLenum;
    readonly SAMPLER_2D_ARRAY_SHADOW: webgl.GLenum;
    readonly SAMPLER_CUBE_SHADOW: webgl.GLenum;
    readonly UNSIGNED_INT_VEC2: webgl.GLenum;
    readonly UNSIGNED_INT_VEC3: webgl.GLenum;
    readonly UNSIGNED_INT_VEC4: webgl.GLenum;
    readonly INT_SAMPLER_2D: webgl.GLenum;
    readonly INT_SAMPLER_3D: webgl.GLenum;
    readonly INT_SAMPLER_CUBE: webgl.GLenum;
    readonly INT_SAMPLER_2D_ARRAY: webgl.GLenum;
    readonly UNSIGNED_INT_SAMPLER_2D: webgl.GLenum;
    readonly UNSIGNED_INT_SAMPLER_3D: webgl.GLenum;
    readonly UNSIGNED_INT_SAMPLER_CUBE: webgl.GLenum;
    readonly UNSIGNED_INT_SAMPLER_2D_ARRAY: webgl.GLenum;
    readonly DEPTH_COMPONENT32F: webgl.GLenum;
    readonly DEPTH32F_STENCIL8: webgl.GLenum;
    readonly FLOAT_32_UNSIGNED_INT_24_8_REV: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: webgl.GLenum;
    readonly FRAMEBUFFER_DEFAULT: webgl.GLenum;
    readonly UNSIGNED_INT_24_8: webgl.GLenum;
    readonly DEPTH24_STENCIL8: webgl.GLenum;
    readonly UNSIGNED_NORMALIZED: webgl.GLenum;
    readonly DRAW_FRAMEBUFFER_BINDING: webgl.GLenum;
    readonly READ_FRAMEBUFFER: webgl.GLenum;
    readonly DRAW_FRAMEBUFFER: webgl.GLenum;
    readonly READ_FRAMEBUFFER_BINDING: webgl.GLenum;
    readonly RENDERBUFFER_SAMPLES: webgl.GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: webgl.GLenum;
    readonly MAX_COLOR_ATTACHMENTS: webgl.GLenum;
    readonly COLOR_ATTACHMENT1: webgl.GLenum;
    readonly COLOR_ATTACHMENT2: webgl.GLenum;
    readonly COLOR_ATTACHMENT3: webgl.GLenum;
    readonly COLOR_ATTACHMENT4: webgl.GLenum;
    readonly COLOR_ATTACHMENT5: webgl.GLenum;
    readonly COLOR_ATTACHMENT6: webgl.GLenum;
    readonly COLOR_ATTACHMENT7: webgl.GLenum;
    readonly COLOR_ATTACHMENT8: webgl.GLenum;
    readonly COLOR_ATTACHMENT9: webgl.GLenum;
    readonly COLOR_ATTACHMENT10: webgl.GLenum;
    readonly COLOR_ATTACHMENT11: webgl.GLenum;
    readonly COLOR_ATTACHMENT12: webgl.GLenum;
    readonly COLOR_ATTACHMENT13: webgl.GLenum;
    readonly COLOR_ATTACHMENT14: webgl.GLenum;
    readonly COLOR_ATTACHMENT15: webgl.GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: webgl.GLenum;
    readonly MAX_SAMPLES: webgl.GLenum;
    readonly HALF_FLOAT: webgl.GLenum;
    readonly RG: webgl.GLenum;
    readonly RG_INTEGER: webgl.GLenum;
    readonly R8: webgl.GLenum;
    readonly RG8: webgl.GLenum;
    readonly R16F: webgl.GLenum;
    readonly R32F: webgl.GLenum;
    readonly RG16F: webgl.GLenum;
    readonly RG32F: webgl.GLenum;
    readonly R8I: webgl.GLenum;
    readonly R8UI: webgl.GLenum;
    readonly R16I: webgl.GLenum;
    readonly R16UI: webgl.GLenum;
    readonly R32I: webgl.GLenum;
    readonly R32UI: webgl.GLenum;
    readonly RG8I: webgl.GLenum;
    readonly RG8UI: webgl.GLenum;
    readonly RG16I: webgl.GLenum;
    readonly RG16UI: webgl.GLenum;
    readonly RG32I: webgl.GLenum;
    readonly RG32UI: webgl.GLenum;
    readonly VERTEX_ARRAY_BINDING: webgl.GLenum;
    readonly R8_SNORM: webgl.GLenum;
    readonly RG8_SNORM: webgl.GLenum;
    readonly RGB8_SNORM: webgl.GLenum;
    readonly RGBA8_SNORM: webgl.GLenum;
    readonly SIGNED_NORMALIZED: webgl.GLenum;
    readonly COPY_READ_BUFFER: webgl.GLenum;
    readonly COPY_WRITE_BUFFER: webgl.GLenum;
    readonly COPY_READ_BUFFER_BINDING: webgl.GLenum;
    readonly COPY_WRITE_BUFFER_BINDING: webgl.GLenum;
    readonly UNIFORM_BUFFER: webgl.GLenum;
    readonly UNIFORM_BUFFER_BINDING: webgl.GLenum;
    readonly UNIFORM_BUFFER_START: webgl.GLenum;
    readonly UNIFORM_BUFFER_SIZE: webgl.GLenum;
    readonly MAX_VERTEX_UNIFORM_BLOCKS: webgl.GLenum;
    readonly MAX_FRAGMENT_UNIFORM_BLOCKS: webgl.GLenum;
    readonly MAX_COMBINED_UNIFORM_BLOCKS: webgl.GLenum;
    readonly MAX_UNIFORM_BUFFER_BINDINGS: webgl.GLenum;
    readonly MAX_UNIFORM_BLOCK_SIZE: webgl.GLenum;
    readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: webgl.GLenum;
    readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: webgl.GLenum;
    readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT: webgl.GLenum;
    readonly ACTIVE_UNIFORM_BLOCKS: webgl.GLenum;
    readonly UNIFORM_TYPE: webgl.GLenum;
    readonly UNIFORM_SIZE: webgl.GLenum;
    readonly UNIFORM_BLOCK_INDEX: webgl.GLenum;
    readonly UNIFORM_OFFSET: webgl.GLenum;
    readonly UNIFORM_ARRAY_STRIDE: webgl.GLenum;
    readonly UNIFORM_MATRIX_STRIDE: webgl.GLenum;
    readonly UNIFORM_IS_ROW_MAJOR: webgl.GLenum;
    readonly UNIFORM_BLOCK_BINDING: webgl.GLenum;
    readonly UNIFORM_BLOCK_DATA_SIZE: webgl.GLenum;
    readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS: webgl.GLenum;
    readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: webgl.GLenum;
    readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: webgl.GLenum;
    readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: webgl.GLenum;
    readonly INVALID_INDEX: webgl.GLenum;
    readonly MAX_VERTEX_OUTPUT_COMPONENTS: webgl.GLenum;
    readonly MAX_FRAGMENT_INPUT_COMPONENTS: webgl.GLenum;
    readonly MAX_SERVER_WAIT_TIMEOUT: webgl.GLenum;
    readonly OBJECT_TYPE: webgl.GLenum;
    readonly SYNC_CONDITION: webgl.GLenum;
    readonly SYNC_STATUS: webgl.GLenum;
    readonly SYNC_FLAGS: webgl.GLenum;
    readonly SYNC_FENCE: webgl.GLenum;
    readonly SYNC_GPU_COMMANDS_COMPLETE: webgl.GLenum;
    readonly UNSIGNALED: webgl.GLenum;
    readonly SIGNALED: webgl.GLenum;
    readonly ALREADY_SIGNALED: webgl.GLenum;
    readonly TIMEOUT_EXPIRED: webgl.GLenum;
    readonly CONDITION_SATISFIED: webgl.GLenum;
    readonly WAIT_FAILED: webgl.GLenum;
    readonly SYNC_FLUSH_COMMANDS_BIT: webgl.GLenum;
    readonly VERTEX_ATTRIB_ARRAY_DIVISOR: webgl.GLenum;
    readonly ANY_SAMPLES_PASSED: webgl.GLenum;
    readonly ANY_SAMPLES_PASSED_CONSERVATIVE: webgl.GLenum;
    readonly SAMPLER_BINDING: webgl.GLenum;
    readonly RGB10_A2UI: webgl.GLenum;
    readonly INT_2_10_10_10_REV: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_PAUSED: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_ACTIVE: webgl.GLenum;
    readonly TRANSFORM_FEEDBACK_BINDING: webgl.GLenum;
    readonly TEXTURE_IMMUTABLE_FORMAT: webgl.GLenum;
    readonly MAX_ELEMENT_INDEX: webgl.GLenum;
    readonly TEXTURE_IMMUTABLE_LEVELS: webgl.GLenum;
    readonly TIMEOUT_IGNORED: GLint64;
    readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL: webgl.GLenum;
    copyBufferSubData(readTarget: webgl.GLenum, writeTarget: webgl.GLenum, readOffset: webgl.GLintptr, writeOffset: webgl.GLintptr, size: webgl.GLsizeiptr): void;
    getBufferSubData(target: webgl.GLenum, srcByteOffset: webgl.GLintptr, dstBuffer: ArrayBufferView, dstOffset?: webgl.GLuint, length?: webgl.GLuint): void;
    blitFramebuffer(srcX0: webgl.GLint, srcY0: webgl.GLint, srcX1: webgl.GLint, srcY1: webgl.GLint, dstX0: webgl.GLint, dstY0: webgl.GLint, dstX1: webgl.GLint, dstY1: webgl.GLint, mask: webgl.GLbitfield, filter: webgl.GLenum): void;
    framebufferTextureLayer(target: webgl.GLenum, attachment: webgl.GLenum, texture: webgl.WebGLTexture | null, level: webgl.GLint, layer: webgl.GLint): void;
    invalidateFramebuffer(target: webgl.GLenum, attachments: webgl.GLenum[]): void;
    invalidateSubFramebuffer(target: webgl.GLenum, attachments: webgl.GLenum[], x: webgl.GLint, y: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei): void;
    readBuffer(src: webgl.GLenum): void;
    getInternalformatParameter(target: webgl.GLenum, internalformat: webgl.GLenum, pname: webgl.GLenum): any;
    renderbufferStorageMultisample(target: webgl.GLenum, samples: webgl.GLsizei, internalformat: webgl.GLenum, width: webgl.GLsizei, height: webgl.GLsizei): void;
    texStorage2D(target: webgl.GLenum, levels: webgl.GLsizei, internalformat: webgl.GLenum, width: webgl.GLsizei, height: webgl.GLsizei): void;
    texStorage3D(target: webgl.GLenum, levels: webgl.GLsizei, internalformat: webgl.GLenum, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei): void;
    texImage3D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, pboOffset: webgl.GLintptr): void;
    texImage3D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, source: webgl.TexImageSource): void;
    texImage3D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, srcData: ArrayBufferView | null): void;
    texImage3D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, srcData: ArrayBufferView, srcOffset: webgl.GLuint): void;
    texSubImage3D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, zoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, pboOffset: webgl.GLintptr): void;
    texSubImage3D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, zoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, source: webgl.TexImageSource): void;
    texSubImage3D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, zoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, srcData: ArrayBufferView | null, srcOffset?: webgl.GLuint): void;
    copyTexSubImage3D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, zoffset: webgl.GLint, x: webgl.GLint, y: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei): void;
    compressedTexImage3D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLenum, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, border: webgl.GLint, imageSize: webgl.GLsizei, offset: webgl.GLintptr): void;
    compressedTexImage3D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLenum, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, border: webgl.GLint, srcData: ArrayBufferView, srcOffset?: webgl.GLuint, srcLengthOverride?: webgl.GLuint): void;
    compressedTexSubImage3D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, zoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, format: webgl.GLenum, imageSize: webgl.GLsizei, offset: webgl.GLintptr): void;
    compressedTexSubImage3D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, zoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, depth: webgl.GLsizei, format: webgl.GLenum, srcData: ArrayBufferView, srcOffset?: webgl.GLuint, srcLengthOverride?: webgl.GLuint): void;
    getFragDataLocation(program: webgl.WebGLProgram, name: string): webgl.GLint;
    uniform1ui(location: webgl.WebGLUniformLocation | null, v0: webgl.GLuint): void;
    uniform2ui(location: webgl.WebGLUniformLocation | null, v0: webgl.GLuint, v1: webgl.GLuint): void;
    uniform3ui(location: webgl.WebGLUniformLocation | null, v0: webgl.GLuint, v1: webgl.GLuint, v2: webgl.GLuint): void;
    uniform4ui(location: webgl.WebGLUniformLocation | null, v0: webgl.GLuint, v1: webgl.GLuint, v2: webgl.GLuint, v3: webgl.GLuint): void;
    uniform1uiv(location: webgl.WebGLUniformLocation | null, data: Uint32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform2uiv(location: webgl.WebGLUniformLocation | null, data: Uint32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform3uiv(location: webgl.WebGLUniformLocation | null, data: Uint32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform4uiv(location: webgl.WebGLUniformLocation | null, data: Uint32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix3x2fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix4x2fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix2x3fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix4x3fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix2x4fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix3x4fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    vertexAttribI4i(index: webgl.GLuint, x: webgl.GLint, y: webgl.GLint, z: webgl.GLint, w: webgl.GLint): void;
    vertexAttribI4iv(index: webgl.GLuint, values: webgl.Int32List): void;
    vertexAttribI4ui(index: webgl.GLuint, x: webgl.GLuint, y: webgl.GLuint, z: webgl.GLuint, w: webgl.GLuint): void;
    vertexAttribI4uiv(index: webgl.GLuint, values: Uint32List): void;
    vertexAttribIPointer(index: webgl.GLuint, size: webgl.GLint, type: webgl.GLenum, stride: webgl.GLsizei, offset: webgl.GLintptr): void;
    vertexAttribDivisor(index: webgl.GLuint, divisor: webgl.GLuint): void;
    drawArraysInstanced(mode: webgl.GLenum, first: webgl.GLint, count: webgl.GLsizei, instanceCount: webgl.GLsizei): void;
    drawElementsInstanced(mode: webgl.GLenum, count: webgl.GLsizei, type: webgl.GLenum, offset: webgl.GLintptr, instanceCount: webgl.GLsizei): void;
    drawRangeElements(mode: webgl.GLenum, start: webgl.GLuint, end: webgl.GLuint, count: webgl.GLsizei, type: webgl.GLenum, offset: webgl.GLintptr): void;
    drawBuffers(buffers: webgl.GLenum[]): void;
    clearBufferfv(buffer: webgl.GLenum, drawbuffer: webgl.GLint, values: webgl.Float32List, srcOffset?: webgl.GLuint): void;
    clearBufferiv(buffer: webgl.GLenum, drawbuffer: webgl.GLint, values: webgl.Int32List, srcOffset?: webgl.GLuint): void;
    clearBufferuiv(buffer: webgl.GLenum, drawbuffer: webgl.GLint, values: Uint32List, srcOffset?: webgl.GLuint): void;
    clearBufferfi(buffer: webgl.GLenum, drawbuffer: webgl.GLint, depth: webgl.GLfloat, stencil: webgl.GLint): void;
    createQuery(): WebGLQuery | null;
    deleteQuery(query: WebGLQuery | null): void;
    isQuery(query: WebGLQuery | null): webgl.GLboolean;
    beginQuery(target: webgl.GLenum, query: WebGLQuery): void;
    endQuery(target: webgl.GLenum): void;
    getQuery(target: webgl.GLenum, pname: webgl.GLenum): WebGLQuery | null;
    getQueryParameter(query: WebGLQuery, pname: webgl.GLenum): any;
    createSampler(): WebGLSampler | null;
    deleteSampler(sampler: WebGLSampler | null): void;
    isSampler(sampler: WebGLSampler | null): webgl.GLboolean;
    bindSampler(unit: webgl.GLuint, sampler: WebGLSampler | null): void;
    samplerParameteri(sampler: WebGLSampler, pname: webgl.GLenum, param: webgl.GLint): void;
    samplerParameterf(sampler: WebGLSampler, pname: webgl.GLenum, param: webgl.GLfloat): void;
    getSamplerParameter(sampler: WebGLSampler, pname: webgl.GLenum): any;
    fenceSync(condition: webgl.GLenum, flags: webgl.GLbitfield): WebGLSync | null;
    isSync(sync: WebGLSync | null): webgl.GLboolean;
    deleteSync(sync: WebGLSync | null): void;
    clientWaitSync(sync: WebGLSync, flags: webgl.GLbitfield, timeout: GLuint64 ): webgl.GLenum;
    waitSync(sync: WebGLSync, flags: webgl.GLbitfield, timeout: GLint64): void;
    getSyncParameter(sync: WebGLSync, pname: webgl.GLenum): any;
    createTransformFeedback(): WebGLTransformFeedback | null;
    deleteTransformFeedback(tf: WebGLTransformFeedback | null): void;
    isTransformFeedback(tf: WebGLTransformFeedback | null): webgl.GLboolean;
    bindTransformFeedback(target: webgl.GLenum, tf: WebGLTransformFeedback | null): void;
    beginTransformFeedback(primitiveMode: webgl.GLenum): void;
    endTransformFeedback(): void;
    transformFeedbackVaryings(program: webgl.WebGLProgram, varyings: string[], bufferMode: webgl.GLenum): void;
    getTransformFeedbackVarying(program: webgl.WebGLProgram, index: webgl.GLuint): webgl.WebGLActiveInfo | null;
    pauseTransformFeedback(): void;
    resumeTransformFeedback(): void;
    bindBufferBase(target: webgl.GLenum, index: webgl.GLuint, buffer: webgl.WebGLBuffer | null): void;
    bindBufferRange(target: webgl.GLenum, index: webgl.GLuint, buffer: webgl.WebGLBuffer | null, offset: webgl.GLintptr, size: webgl.GLsizeiptr): void;
    getIndexedParameter(target: webgl.GLenum, index: webgl.GLuint): any;
    getUniformIndices(program: webgl.WebGLProgram, uniformNames: string[]): webgl.GLuint[] | null;
    getActiveUniforms(program: webgl.WebGLProgram, uniformIndices: webgl.GLuint[], pname: webgl.GLenum): any;
    getUniformBlockIndex(program: webgl.WebGLProgram, uniformBlockName: string): webgl.GLuint;
    getActiveUniformBlockParameter(program: webgl.WebGLProgram, uniformBlockIndex: webgl.GLuint, pname: webgl.GLenum): any;
    getActiveUniformBlockName(program: webgl.WebGLProgram, uniformBlockIndex: webgl.GLuint): string | null;
    uniformBlockBinding(program: webgl.WebGLProgram, uniformBlockIndex: webgl.GLuint, uniformBlockBinding: webgl.GLuint): void;
    createVertexArray(): WebGLVertexArrayObject | null;
    deleteVertexArray(vertexArray: WebGLVertexArrayObject | null): void;
    isVertexArray(vertexArray: WebGLVertexArrayObject | null): webgl.GLboolean;
    bindVertexArray(array: WebGLVertexArrayObject | null): void;
}
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
interface WebGL2RenderingContextOverloads {
    bufferData(target: webgl.GLenum, size: webgl.GLsizeiptr, usage: webgl.GLenum): void;
    bufferData(target: webgl.GLenum, srcData: BufferSource | null, usage: webgl.GLenum): void;
    bufferSubData(target: webgl.GLenum, dstByteOffset: webgl.GLintptr, srcData: BufferSource): void;
    bufferData(target: webgl.GLenum, srcData: ArrayBufferView, usage: webgl.GLenum, srcOffset: webgl.GLuint, length?: webgl.GLuint): void;
    bufferSubData(target: webgl.GLenum, dstByteOffset: webgl.GLintptr, srcData: ArrayBufferView, srcOffset: webgl.GLuint, length?: webgl.GLuint): void;
    texImage2D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, pixels: ArrayBufferView | null): void;
    texImage2D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, source: webgl.TexImageSource): void;
    texSubImage2D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, pixels: ArrayBufferView | null): void;
    texSubImage2D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, source: webgl.TexImageSource): void;
    texImage2D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, pboOffset: webgl.GLintptr): void;
    texImage2D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, source: webgl.TexImageSource): void;
    texImage2D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, border: webgl.GLint, format: webgl.GLenum, type: webgl.GLenum, srcData: ArrayBufferView, srcOffset: webgl.GLuint): void;
    texSubImage2D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, pboOffset: webgl.GLintptr): void;
    texSubImage2D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, source: webgl.TexImageSource): void;
    texSubImage2D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, srcData: ArrayBufferView, srcOffset: webgl.GLuint): void;
    compressedTexImage2D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLenum, width: webgl.GLsizei, height: webgl.GLsizei, border: webgl.GLint, imageSize: webgl.GLsizei, offset: webgl.GLintptr): void;
    compressedTexImage2D(target: webgl.GLenum, level: webgl.GLint, internalformat: webgl.GLenum, width: webgl.GLsizei, height: webgl.GLsizei, border: webgl.GLint, srcData: ArrayBufferView, srcOffset?: webgl.GLuint, srcLengthOverride?: webgl.GLuint): void;
    compressedTexSubImage2D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, imageSize: webgl.GLsizei, offset: webgl.GLintptr): void;
    compressedTexSubImage2D(target: webgl.GLenum, level: webgl.GLint, xoffset: webgl.GLint, yoffset: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, srcData: ArrayBufferView, srcOffset?: webgl.GLuint, srcLengthOverride?: webgl.GLuint): void;
    uniform1fv(location: webgl.WebGLUniformLocation | null, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform2fv(location: webgl.WebGLUniformLocation | null, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform3fv(location: webgl.WebGLUniformLocation | null, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform4fv(location: webgl.WebGLUniformLocation | null, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform1iv(location: webgl.WebGLUniformLocation | null, data: webgl.Int32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform2iv(location: webgl.WebGLUniformLocation | null, data: webgl.Int32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform3iv(location: webgl.WebGLUniformLocation | null, data: webgl.Int32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniform4iv(location: webgl.WebGLUniformLocation | null, data: webgl.Int32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix2fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix3fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    uniformMatrix4fv(location: webgl.WebGLUniformLocation | null, transpose: webgl.GLboolean, data: webgl.Float32List, srcOffset?: webgl.GLuint, srcLength?: webgl.GLuint): void;
    readPixels(x: webgl.GLint, y: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, dstData: ArrayBufferView | null): void;
    readPixels(x: webgl.GLint, y: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, offset: webgl.GLintptr): void;
    readPixels(x: webgl.GLint, y: webgl.GLint, width: webgl.GLsizei, height: webgl.GLsizei, format: webgl.GLenum, type: webgl.GLenum, dstData: ArrayBufferView, dstOffset: webgl.GLuint): void;
}
/**
 * WebGL 2.0
 * @see https://www.khronos.org/registry/webgl/specs/latest/2.0/
 * @since 7
 * @syscap SystemCapability.Graphic.Graphic2D.WebGL2
 */
export interface WebGL2RenderingContext extends WebGL2RenderingContextBase, WebGL2RenderingContextOverloads, WebGLRenderingContextBase {
}
