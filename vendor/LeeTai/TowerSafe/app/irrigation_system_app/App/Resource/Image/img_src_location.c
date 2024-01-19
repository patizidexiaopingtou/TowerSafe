#if defined(LV_LVGL_H_INCLUDE_SIMPLE)
#include "lvgl.h"
#else
#include "lvgl/lvgl.h"
#endif

#ifndef LV_ATTRIBUTE_MEM_ALIGN
#define LV_ATTRIBUTE_MEM_ALIGN
#endif
#ifndef LV_ATTRIBUTE_IMG_IMG_SRC_LOCATION
#define LV_ATTRIBUTE_IMG_IMG_SRC_LOCATION
#endif
const LV_ATTRIBUTE_MEM_ALIGN LV_ATTRIBUTE_IMG_IMG_SRC_LOCATION uint8_t img_src_location_map[] = {
#if LV_COLOR_DEPTH == 1 || LV_COLOR_DEPTH == 8
  /*Pixel format: Alpha 8 bit, Red: 3 bit, Green: 3 bit, Blue: 2 bit*/
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x80, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xbf, 0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xd4, 0xff, 0xc8, 0xff, 0x68, 0xff, 0x40, 0xff, 0x68, 0xff, 0xc8, 0xff, 0xd4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0xff, 0xb2, 0xff, 0x8e, 0x00, 0x00, 0x00, 0x00, 0xff, 0x40, 0x00, 0x00, 0x00, 0x00, 0xff, 0x8e, 0xff, 0xb2, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0xff, 0x14, 0xff, 0xf6, 0xff, 0x15, 0xff, 0x10, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xbf, 0xff, 0x10, 0xff, 0x15, 0xff, 0xf6, 0xff, 0x26, 0x00, 0x00, 
  0x00, 0x00, 0xff, 0x2f, 0xff, 0xd4, 0x00, 0x00, 0xff, 0x52, 0xff, 0xaa, 0x00, 0x00, 0xff, 0xaa, 0xff, 0x52, 0x00, 0x00, 0xff, 0xd4, 0xff, 0x5b, 0x00, 0x00, 
  0x00, 0x00, 0xff, 0x27, 0xff, 0xf0, 0x00, 0x00, 0xff, 0x49, 0xff, 0xd1, 0xff, 0x40, 0xff, 0xbf, 0xff, 0x49, 0x00, 0x00, 0xff, 0xf0, 0xff, 0x49, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0xff, 0xd2, 0xff, 0x67, 0x00, 0x00, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x80, 0x00, 0x00, 0xff, 0x67, 0xff, 0xd2, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0xff, 0x78, 0xff, 0xb5, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xb5, 0xff, 0x78, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0xff, 0x0e, 0xff, 0xca, 0xff, 0x74, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x74, 0xff, 0xca, 0xff, 0x0e, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x44, 0xff, 0xff, 0xff, 0x3a, 0x00, 0x00, 0xff, 0x3a, 0xff, 0xff, 0xff, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x7a, 0xff, 0xde, 0x00, 0x00, 0xff, 0xde, 0xff, 0x7a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xb0, 0xff, 0xaa, 0xff, 0xb0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x18, 0xff, 0x80, 0xff, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
#endif
#if LV_COLOR_DEPTH == 16 && LV_COLOR_16_SWAP == 0
  /*Pixel format: Alpha 8 bit, Red: 5 bit, Green: 6 bit, Blue: 5 bit*/
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x80, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd4, 0xff, 0xff, 0xc8, 0xff, 0xff, 0x68, 0xff, 0xff, 0x40, 0xff, 0xff, 0x68, 0xff, 0xff, 0xc8, 0xff, 0xff, 0xd4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb2, 0xff, 0xff, 0x8e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x8e, 0xff, 0xff, 0xb2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0xff, 0xff, 0x14, 0xff, 0xff, 0xf6, 0xff, 0xff, 0x15, 0xff, 0xff, 0x10, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0x10, 0xff, 0xff, 0x15, 0xff, 0xff, 0xf6, 0xff, 0xff, 0x26, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0xff, 0xff, 0x2f, 0xff, 0xff, 0xd4, 0x00, 0x00, 0x00, 0xff, 0xff, 0x52, 0xff, 0xff, 0xaa, 0x00, 0x00, 0x00, 0xff, 0xff, 0xaa, 0xff, 0xff, 0x52, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd4, 0xff, 0xff, 0x5b, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0xff, 0xff, 0x27, 0xff, 0xff, 0xf0, 0x00, 0x00, 0x00, 0xff, 0xff, 0x49, 0xff, 0xff, 0xd1, 0xff, 0xff, 0x40, 0xff, 0xff, 0xbf, 0xff, 0xff, 0x49, 0x00, 0x00, 0x00, 0xff, 0xff, 0xf0, 0xff, 0xff, 0x49, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd2, 0xff, 0xff, 0x67, 0x00, 0x00, 0x00, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0xff, 0xff, 0x67, 0xff, 0xff, 0xd2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x78, 0xff, 0xff, 0xb5, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb5, 0xff, 0xff, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x0e, 0xff, 0xff, 0xca, 0xff, 0xff, 0x74, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x74, 0xff, 0xff, 0xca, 0xff, 0xff, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x44, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3a, 0x00, 0x00, 0x00, 0xff, 0xff, 0x3a, 0xff, 0xff, 0xff, 0xff, 0xff, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x7a, 0xff, 0xff, 0xde, 0x00, 0x00, 0x00, 0xff, 0xff, 0xde, 0xff, 0xff, 0x7a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb0, 0xff, 0xff, 0xaa, 0xff, 0xff, 0xb0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x18, 0xff, 0xff, 0x80, 0xff, 0xff, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
#endif
#if LV_COLOR_DEPTH == 16 && LV_COLOR_16_SWAP != 0
  /*Pixel format: Alpha 8 bit, Red: 5 bit, Green: 6 bit, Blue: 5 bit  BUT the 2  color bytes are swapped*/
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x80, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd4, 0xff, 0xff, 0xc8, 0xff, 0xff, 0x68, 0xff, 0xff, 0x40, 0xff, 0xff, 0x68, 0xff, 0xff, 0xc8, 0xff, 0xff, 0xd4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb2, 0xff, 0xff, 0x8e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x8e, 0xff, 0xff, 0xb2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0xff, 0xff, 0x14, 0xff, 0xff, 0xf6, 0xff, 0xff, 0x15, 0xff, 0xff, 0x10, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0x10, 0xff, 0xff, 0x15, 0xff, 0xff, 0xf6, 0xff, 0xff, 0x26, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0xff, 0xff, 0x2f, 0xff, 0xff, 0xd4, 0x00, 0x00, 0x00, 0xff, 0xff, 0x52, 0xff, 0xff, 0xaa, 0x00, 0x00, 0x00, 0xff, 0xff, 0xaa, 0xff, 0xff, 0x52, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd4, 0xff, 0xff, 0x5b, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0xff, 0xff, 0x27, 0xff, 0xff, 0xf0, 0x00, 0x00, 0x00, 0xff, 0xff, 0x49, 0xff, 0xff, 0xd1, 0xff, 0xff, 0x40, 0xff, 0xff, 0xbf, 0xff, 0xff, 0x49, 0x00, 0x00, 0x00, 0xff, 0xff, 0xf0, 0xff, 0xff, 0x49, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd2, 0xff, 0xff, 0x67, 0x00, 0x00, 0x00, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0xff, 0xff, 0x67, 0xff, 0xff, 0xd2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x78, 0xff, 0xff, 0xb5, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb5, 0xff, 0xff, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x0e, 0xff, 0xff, 0xca, 0xff, 0xff, 0x74, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x74, 0xff, 0xff, 0xca, 0xff, 0xff, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x44, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3a, 0x00, 0x00, 0x00, 0xff, 0xff, 0x3a, 0xff, 0xff, 0xff, 0xff, 0xff, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x7a, 0xff, 0xff, 0xde, 0x00, 0x00, 0x00, 0xff, 0xff, 0xde, 0xff, 0xff, 0x7a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb0, 0xff, 0xff, 0xaa, 0xff, 0xff, 0xb0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x18, 0xff, 0xff, 0x80, 0xff, 0xff, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
#endif
#if LV_COLOR_DEPTH == 32
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x80, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xd4, 0xff, 0xff, 0xff, 0xc8, 0xff, 0xff, 0xff, 0x68, 0xff, 0xff, 0xff, 0x40, 0xff, 0xff, 0xff, 0x68, 0xff, 0xff, 0xff, 0xc8, 0xff, 0xff, 0xff, 0xd4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xb2, 0xff, 0xff, 0xff, 0x8e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x8e, 0xff, 0xff, 0xff, 0xb2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x14, 0xff, 0xff, 0xff, 0xf6, 0xff, 0xff, 0xff, 0x15, 0xff, 0xff, 0xff, 0x10, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0x10, 0xff, 0xff, 0xff, 0x15, 0xff, 0xff, 0xff, 0xf6, 0xff, 0xff, 0xff, 0x26, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x2f, 0xff, 0xff, 0xff, 0xd4, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x52, 0xff, 0xff, 0xff, 0xaa, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xaa, 0xff, 0xff, 0xff, 0x52, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xd4, 0xff, 0xff, 0xff, 0x5b, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x27, 0xff, 0xff, 0xff, 0xf0, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x49, 0xff, 0xff, 0xff, 0xd1, 0xff, 0xff, 0xff, 0x40, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0x49, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xf0, 0xff, 0xff, 0xff, 0x49, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xd2, 0xff, 0xff, 0xff, 0x67, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x67, 0xff, 0xff, 0xff, 0xd2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x78, 0xff, 0xff, 0xff, 0xb5, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xb5, 0xff, 0xff, 0xff, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x0e, 0xff, 0xff, 0xff, 0xca, 0xff, 0xff, 0xff, 0x74, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x74, 0xff, 0xff, 0xff, 0xca, 0xff, 0xff, 0xff, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x44, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3a, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x3a, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x7a, 0xff, 0xff, 0xff, 0xde, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xde, 0xff, 0xff, 0xff, 0x7a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xb0, 0xff, 0xff, 0xff, 0xaa, 0xff, 0xff, 0xff, 0xb0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x18, 0xff, 0xff, 0xff, 0x80, 0xff, 0xff, 0xff, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
#endif
};

const lv_img_dsc_t img_src_location = {
  .header.always_zero = 0,
  .header.w = 13,
  .header.h = 13,
  .data_size = 169 * LV_IMG_PX_SIZE_ALPHA_BYTE,
  .header.cf = LV_IMG_CF_TRUE_COLOR_ALPHA,
  .data = img_src_location_map,
};
