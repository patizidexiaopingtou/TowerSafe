// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.3.0
// LVGL version: 8.3.6
// Project name: display_sensor_data

#ifndef _DISPLAY_SENSOR_DATA_UI_H
#define _DISPLAY_SENSOR_DATA_UI_H

#ifdef __cplusplus
extern "C" {
#endif

#include "lvgl.h"

#include "ui_helpers.h"
#include "ui_events.h"
// SCREEN: ui_Screen1
void ui_Screen1_screen_init(void);
extern lv_obj_t * ui_Screen1;
extern lv_obj_t * ui_Title;
void ui_event_ButtonHumi(lv_event_t * e);
extern lv_obj_t * ui_ButtonHumi;
extern lv_obj_t * ui_btnHumi;
extern lv_obj_t * ui_humidityBar;
extern lv_obj_t * ui_LightBar;
extern lv_obj_t * ui_LabelLightPer;
extern lv_obj_t * ui_LabelLight;
void ui_event_ButtonLight(lv_event_t * e);
extern lv_obj_t * ui_ButtonLight;
extern lv_obj_t * ui_btnLight;
void ui_event_ButtonTemp(lv_event_t * e);
extern lv_obj_t * ui_ButtonTemp;
extern lv_obj_t * ui_btnTemp;
extern lv_obj_t * ui_Chart2;
void ui_event_SwitchWater(lv_event_t * e);
extern lv_obj_t * ui_SwitchWater;
extern lv_obj_t * ui_LableWaterStatus;
extern lv_obj_t * ui_Label1;
extern lv_obj_t * ui_LabelTemp;
extern lv_obj_t * ui_LabelHumiPer;
extern lv_obj_t * ui_LabelHumi;
extern lv_obj_t * ui____initial_actions0;

void ui_init(void);

#ifdef __cplusplus
} /*extern "C"*/
#endif

#endif
