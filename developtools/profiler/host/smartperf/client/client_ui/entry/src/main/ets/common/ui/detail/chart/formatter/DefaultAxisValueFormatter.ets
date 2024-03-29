/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import IAxisValueFormatter from './IAxisValueFormatter'
import AxisBase from '../components/AxisBase'

export default class DefaultAxisValueFormatter implements IAxisValueFormatter {

  /**
    * the number of decimal digits this formatter uses
    */
  protected digits: number = 0;

  /**
    * Constructor that specifies to how many digits the value should be
    * formatted.
    *
    * @param digits
    */
  constructor(digits: number) {
    this.digits = digits;

    var b: string = "";
    for (var i = 0; i < digits; i++) {
      if (i == 0)
      b += ".";
      b += "0";
    }

  }

  public getFormattedValue(value: number, axis: AxisBase): string {
    // avoid memory allocations here (for performance)
    var str = String(value.toFixed(1)).split(".");
    if(str[1] == "0"){
      return str[0];
    }else{
      return String(value.toFixed(1))
    }
  }

  /**
    * Returns the number of decimal digits this formatter uses or -1, if unspecified.
    *
    * @return
    */
  public getDecimalDigits(): number {
    return this.digits;
  }
}
