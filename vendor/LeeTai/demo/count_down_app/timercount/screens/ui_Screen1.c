// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.3.0
// LVGL version: 8.3.6
// Project name: SquareLine_Project

#include "../ui.h"

void ui_Screen1_screen_init(void)
{
    ui_Screen1 = lv_obj_create(NULL);
    lv_obj_clear_flag(ui_Screen1, LV_OBJ_FLAG_SCROLLABLE);      /// Flags

    ui_MinTime = lv_roller_create(ui_Screen1);
    lv_roller_set_options(ui_MinTime, "00\n01\n02\n03\n04\n05\n06\n07\n08\n09\n10", LV_ROLLER_MODE_INFINITE);
    lv_obj_set_height(ui_MinTime, 100);
    lv_obj_set_width(ui_MinTime, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_x(ui_MinTime, -60);
    lv_obj_set_y(ui_MinTime, -40);
    lv_obj_set_align(ui_MinTime, LV_ALIGN_CENTER);
    lv_obj_set_style_text_color(ui_MinTime, lv_color_hex(0x808080), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_text_opa(ui_MinTime, 255, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_border_color(ui_MinTime, lv_color_hex(0x000000), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_border_opa(ui_MinTime, 0, LV_PART_MAIN | LV_STATE_DEFAULT);

    lv_obj_set_style_text_font(ui_MinTime, &lv_font_montserrat_18, LV_PART_SELECTED | LV_STATE_DEFAULT);

    ui_SecTime = lv_roller_create(ui_Screen1);
    lv_roller_set_options(ui_SecTime,
                          "00\n01\n02\n03\n04\n05\n06\n07\n08\n09\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59",
                          LV_ROLLER_MODE_INFINITE);
    lv_obj_set_height(ui_SecTime, 100);
    lv_obj_set_width(ui_SecTime, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_x(ui_SecTime, 60);
    lv_obj_set_y(ui_SecTime, -40);
    lv_obj_set_align(ui_SecTime, LV_ALIGN_CENTER);
    lv_obj_set_style_text_color(ui_SecTime, lv_color_hex(0x808080), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_text_opa(ui_SecTime, 255, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_border_color(ui_SecTime, lv_color_hex(0x000000), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_border_opa(ui_SecTime, 0, LV_PART_MAIN | LV_STATE_DEFAULT);

    lv_obj_set_style_text_font(ui_SecTime, &lv_font_montserrat_18, LV_PART_SELECTED | LV_STATE_DEFAULT);

    ui_Button2 = lv_btn_create(ui_Screen1);
    lv_obj_set_width(ui_Button2, 60);
    lv_obj_set_height(ui_Button2, 60);
    lv_obj_set_x(ui_Button2, -100);
    lv_obj_set_y(ui_Button2, 70);
    lv_obj_set_align(ui_Button2, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_Button2, LV_OBJ_FLAG_SCROLL_ON_FOCUS);     /// Flags
    lv_obj_clear_flag(ui_Button2, LV_OBJ_FLAG_SCROLLABLE);      /// Flags
    lv_obj_set_style_radius(ui_Button2, 50, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_Button2, lv_color_hex(0xB7B5B5), LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_opa(ui_Button2, 255, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_Button2, lv_color_hex(0x2095F6), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_bg_opa(ui_Button2, 255, LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_color(ui_Button2, lv_color_hex(0x787373), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_opa(ui_Button2, 255, LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_width(ui_Button2, 1, LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_spread(ui_Button2, 1, LV_PART_MAIN | LV_STATE_PRESSED);

    ui_Label2 = lv_label_create(ui_Button2);
    lv_obj_set_width(ui_Label2, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_Label2, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_align(ui_Label2, LV_ALIGN_CENTER);
    lv_label_set_text(ui_Label2, "Clear");
    lv_obj_set_style_text_font(ui_Label2, &lv_font_montserrat_18, LV_PART_MAIN | LV_STATE_DEFAULT);

    ui_Button1 = lv_btn_create(ui_Screen1);
    lv_obj_set_width(ui_Button1, 60);
    lv_obj_set_height(ui_Button1, 60);
    lv_obj_set_x(ui_Button1, 100);
    lv_obj_set_y(ui_Button1, 70);
    lv_obj_set_align(ui_Button1, LV_ALIGN_CENTER);
    lv_obj_add_flag(ui_Button1, LV_OBJ_FLAG_SCROLL_ON_FOCUS);     /// Flags
    lv_obj_clear_flag(ui_Button1, LV_OBJ_FLAG_SCROLLABLE);      /// Flags
    lv_obj_set_style_radius(ui_Button1, 50, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_Button1, lv_color_hex(0xF29879), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_bg_opa(ui_Button1, 255, LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_color(ui_Button1, lv_color_hex(0x787373), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_opa(ui_Button1, 255, LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_width(ui_Button1, 1, LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_shadow_spread(ui_Button1, 1, LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_bg_color(ui_Button1, lv_color_hex(0xF88379), LV_PART_MAIN | LV_STATE_FOCUSED);
    lv_obj_set_style_bg_opa(ui_Button1, 255, LV_PART_MAIN | LV_STATE_FOCUSED);

    ui_Label1 = lv_label_create(ui_Button1);
    lv_obj_set_width(ui_Label1, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_Label1, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_align(ui_Label1, LV_ALIGN_CENTER);
    lv_label_set_text(ui_Label1, "Start");
    lv_obj_set_style_text_font(ui_Label1, &lv_font_montserrat_18, LV_PART_MAIN | LV_STATE_DEFAULT);
    lv_obj_set_style_bg_color(ui_Label1, lv_color_hex(0xFFFFFF), LV_PART_MAIN | LV_STATE_CHECKED);
    lv_obj_set_style_bg_opa(ui_Label1, 255, LV_PART_MAIN | LV_STATE_CHECKED);

    ui_LableMin = lv_label_create(ui_Screen1);
    lv_obj_set_width(ui_LableMin, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_LableMin, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_LableMin, -15);
    lv_obj_set_y(ui_LableMin, -40);
    lv_obj_set_align(ui_LableMin, LV_ALIGN_CENTER);
    lv_label_set_text(ui_LableMin, "min");

    ui_LabelSec = lv_label_create(ui_Screen1);
    lv_obj_set_width(ui_LabelSec, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_LabelSec, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_LabelSec, 95);
    lv_obj_set_y(ui_LabelSec, -40);
    lv_obj_set_align(ui_LabelSec, LV_ALIGN_CENTER);
    lv_label_set_text(ui_LabelSec, "s");

    ui_Label4 = lv_label_create(ui_Screen1);
    lv_obj_set_width(ui_Label4, LV_SIZE_CONTENT);   /// 1
    lv_obj_set_height(ui_Label4, LV_SIZE_CONTENT);    /// 1
    lv_obj_set_x(ui_Label4, 6);
    lv_obj_set_y(ui_Label4, -40);
    lv_obj_set_align(ui_Label4, LV_ALIGN_CENTER);
    lv_label_set_text(ui_Label4, ":");

    lv_obj_add_event_cb(ui_MinTime, ui_event_MinTime, LV_EVENT_ALL, NULL);
    lv_obj_add_event_cb(ui_SecTime, ui_event_SecTime, LV_EVENT_ALL, NULL);
    lv_obj_add_event_cb(ui_Button2, ui_event_Button2, LV_EVENT_ALL, NULL);
    lv_obj_add_event_cb(ui_Button1, ui_event_Button1, LV_EVENT_ALL, NULL);

}