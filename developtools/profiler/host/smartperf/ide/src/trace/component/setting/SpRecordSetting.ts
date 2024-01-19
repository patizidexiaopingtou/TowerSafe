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

import {BaseElement, element} from "../../../base-ui/BaseElement.js";
import "../../../base-ui/radiobox/LitRadioBox.js";
import {LitRadioBox} from "../../../base-ui/radiobox/LitRadioBox.js";
import "../../../base-ui/slider/LitSlider.js";
import {LitSlider} from "../../../base-ui/slider/LitSlider.js";
import "../../../base-ui/popover/LitPopover.js"
import {info} from "../../../log/Log.js";

@element('record-setting')
export class SpRecordSetting extends BaseElement {
    private memoryBufferSlider: LitSlider | undefined;
    private maxDurationSliders: LitSlider | undefined;
    private radioBox: LitRadioBox | undefined
    private bufferNumber: HTMLElement | undefined
    private durationNumber: HTMLElement | undefined
    private outputPath: HTMLInputElement | undefined
    private lastMemoryValue: string | undefined;
    private lastDurationValue: string | undefined;

    get recordMod(): boolean {
        if (this.radioBox) {
            return this.radioBox.checked
        }
        return false;
    }

    get output(): string {
        if (this.outputPath && this.outputPath.value != '') {
            return "/data/local/tmp/" + this.outputPath.value
        }
        return "/data/local/tmp/hiprofiler_data.htrace";
    }

    get bufferSize(): number {
        if (this.bufferNumber?.hasAttribute('percent')) {
            info("bufferSize  is : ", this.bufferNumber!.getAttribute("percent"))
            return Number(this.bufferNumber!.getAttribute("percent"));
        }
        return 64
    }

    get maxDur(): number {
        if (this.durationNumber?.hasAttribute('percent')) {
            info("maxDur  is : ", this.durationNumber!.getAttribute("percent"))
            return Number(this.durationNumber!.getAttribute("percent"));
        }
        return 50
    }

    resetValue(): void{
        let bufferInput = this.shadowRoot?.querySelector('.memory_buffer_result') as HTMLInputElement;
        let parentElement = this.memoryBufferSlider!.parentNode as Element;
        if (bufferInput.style.color != 'var(--dark-color1,#000000)' && this.lastMemoryValue) {
            bufferInput.value = this.lastMemoryValue + '';
            this.memoryBufferSlider!.percent = this.lastMemoryValue + '';
            this.memoryBufferSlider!.sliderStyle = {
                minRange: 4,
                maxRange: 512,
                defaultValue: this.lastMemoryValue + '',
                resultUnit: "MB",
                stepSize: 2,
                lineColor: "var(--dark-color3,#46B1E3)",
                buttonColor: "#999999"
            };
            parentElement.setAttribute('percent', this.lastMemoryValue + '');
            this.lastMemoryValue = this.lastMemoryValue + ''
            bufferInput.style.color = 'var(--dark-color1,#000000)';
        }

        let durationInput = this.shadowRoot?.querySelector('.max_duration_result') as HTMLInputElement;
        let durationEl = this.maxDurationSliders!.parentNode as Element;
        if (durationInput.style.color != 'var(--dark-color1,#000000)' && this.lastDurationValue) {
            durationInput.style.color = 'var(--dark-color1,#000000)';
            let durationList = this.lastDurationValue.split(":");
            let resultDuration = Number(durationList[0]) * 3600 + Number(durationList[1]) * 60 + Number(durationList[2]);

            durationInput.value = this.lastDurationValue
            this.maxDurationSliders!.sliderStyle = {
                minRange: 10,
                maxRange: 3600,
                defaultValue: this.lastDurationValue!,
                resultUnit: "h:m:s",
                stepSize: 1,
                lineColor: "var(--dark-color4,#61CFBE)",
                buttonColor: "#999999"
            }
            durationEl.setAttribute('percent', resultDuration.toString());
        }
    }

    initElements(): void {
        this.bufferNumber = this.shadowRoot?.querySelector(".buffer-size") as HTMLElement
        this.durationNumber = this.shadowRoot?.querySelector(".max-duration") as HTMLElement
        let bu = this.shadowRoot?.querySelector('.record') as HTMLDivElement
        this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.MenuButton').forEach(button => {

            button!.addEventListener('mouseenter', e => {
                button.style.backgroundColor = '#EFEFEF'
            })

            button!.addEventListener('mouseout', e => {
                button.style.backgroundColor = '#E4E3E9'
            })
        })

        this.radioBox = this.shadowRoot?.querySelector("#litradio") as LitRadioBox
        this.outputPath = this.shadowRoot?.querySelector<HTMLInputElement>('#trace_path') as HTMLInputElement;

        this.initLitSlider()
    }

    initLitSlider() {
        this.memoryBufferSlider = this.shadowRoot?.querySelector<LitSlider>('#memory-buffer') as LitSlider;
        this.memoryBufferSlider.sliderStyle = {
            minRange: 4,
            maxRange: 512,
            defaultValue: "64",
            resultUnit: "MB",
            stepSize: 2,
            lineColor: "var(--dark-color3,#46B1E3)",
            buttonColor: "#999999"
        };
        this.lastMemoryValue = '64'
        let parentElement = this.memoryBufferSlider!.parentNode as Element;
        let bufferInput = this.shadowRoot?.querySelector('.memory_buffer_result') as HTMLInputElement;
        bufferInput.value = this.memoryBufferSlider.sliderStyle.defaultValue;
        this.memoryBufferSlider.addEventListener('input', evt => {
            bufferInput.value = this.bufferSize.toString();
        })
        parentElement.setAttribute('percent', '64');
        bufferInput.style.color = 'var(--dark-color1,#000000)';
        bufferInput.addEventListener('input', ev => {
            if (this.bufferNumber!.hasAttribute('percent')) {
                this.bufferNumber!.removeAttribute('percent');
            }
            bufferInput.style.color = 'var(--dark-color1,#000000)';
            bufferInput.parentElement!.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
            bufferInput.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
            if (bufferInput.value.trim() == '') {
                bufferInput.style.color = 'red';
                parentElement.setAttribute('percent', '64');
                return
            }
            let memorySize = Number(bufferInput.value);
            if (!memorySize || memorySize < this.memoryBufferSlider!.sliderStyle.minRange ||
                memorySize > this.memoryBufferSlider!.sliderStyle.maxRange) {
                bufferInput.style.color = 'red';
                parentElement.setAttribute('percent', '64');
            } else {
                this.memoryBufferSlider!.percent = bufferInput.value;
                let htmlInputElement = this.memoryBufferSlider!.shadowRoot?.querySelector("#slider") as HTMLInputElement;
                htmlInputElement.value = bufferInput.value;
                this.memoryBufferSlider!.sliderStyle = {
                    minRange: 4,
                    maxRange: 512,
                    defaultValue: bufferInput.value,
                    resultUnit: "MB",
                    stepSize: 2,
                    lineColor: "var(--dark-color3,#46B1E3)",
                    buttonColor: "#999999"
                };
                parentElement.setAttribute('percent', bufferInput.value);
                this.lastMemoryValue = bufferInput.value
            }
        })

        let memoryBufferInput = this.memoryBufferSlider!.shadowRoot?.querySelector('#slider') as HTMLInputElement;

        memoryBufferInput.addEventListener('input', ev => {
            bufferInput.style.color = 'var(--dark-color1,#000000)';
            bufferInput.parentElement!.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
            bufferInput.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
        })

        this.maxDurationSliders = this.shadowRoot?.querySelector<LitSlider>('#max-duration') as LitSlider;
        this.maxDurationSliders.sliderStyle = {
            minRange: 10,
            maxRange: 3600,
            defaultValue: '00:00:50',
            resultUnit: "h:m:s",
            stepSize: 1,
            lineColor: "var(--dark-color4,#61CFBE)",
            buttonColor: "#999999"
        }
        this.lastDurationValue = '00:00:50'
        let durationParentElement = this.maxDurationSliders!.parentNode as Element;
        let durationInput = this.shadowRoot?.querySelector('.max_duration_result') as HTMLInputElement;
        durationInput.value = this.maxDurationSliders.sliderStyle.defaultValue;
        this.maxDurationSliders.addEventListener('input', evt => {
            durationInput.value = this.maxDurationSliders!.formatSeconds(this.maxDur.toString());
        })

        durationInput.style.color = 'var(--dark-color1,#000000)';
        durationInput.addEventListener('input', ev => {
            if (this.durationNumber!.hasAttribute('percent')) {
                this.durationNumber!.removeAttribute('percent');
            }
            durationInput.style.color = 'var(--dark-color1,#000000)';
            durationInput.parentElement!.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
            durationInput.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
            let regExpMatchArray = durationInput.value.trim();
            if (regExpMatchArray == '') {
                durationInput.style.color = 'red';
                durationParentElement.setAttribute('percent', '50');
                return
            }
            let regExpMatch = durationInput.value.trim().match(`^\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}$`);
            if (regExpMatch) {
                let durationList = regExpMatchArray.split(":");
                let resultDuration = Number(durationList[0]) * 3600 + Number(durationList[1]) * 60 + Number(durationList[2]);
                if (Number(durationList[0]) > 60 || Number(durationList[1]) > 60 || Number(durationList[2]) > 60 ||
                    resultDuration > this.maxDurationSliders!.sliderStyle.maxRange ||
                    resultDuration < this.maxDurationSliders!.sliderStyle.minRange) {
                    durationInput.style.color = 'red';
                    durationParentElement.setAttribute('percent', '50');
                } else {
                    durationInput.style.color = 'var(--dark-color1,#000000)';
                    durationInput.parentElement!.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
                    durationInput.style.backgroundColor = "var(--dark-background5,#F2F2F2)";
                    let htmlInputElement = this.maxDurationSliders!.shadowRoot?.querySelector("#slider") as HTMLInputElement;
                    htmlInputElement.value = resultDuration + '';
                    this.maxDurationSliders!.sliderStyle = {
                        minRange: 10,
                        maxRange: 3600,
                        defaultValue: Number(durationList[0]) + ':' + Number(durationList[1]) + ':' + Number(durationList[2]),
                        resultUnit: "h:m:s",
                        stepSize: 1,
                        lineColor: "var(--dark-color4,#61CFBE)",
                        buttonColor: "#999999"
                    }
                    durationParentElement.setAttribute('percent', resultDuration.toString());
                    this.lastDurationValue = regExpMatchArray
                }
            } else {
                durationInput.style.color = 'red';
                durationParentElement.setAttribute('percent', '50');
            }
        })

        let maxDurationInput = this.maxDurationSliders!.shadowRoot?.querySelector('#slider') as HTMLInputElement;
        maxDurationInput.addEventListener('input', ev => {
            durationInput.style.color = 'var(--dark-color1,#000000)';
            durationInput.parentElement!.style.backgroundColor = "var(--dark-background5,#F2F2F2)"
            durationInput.style.backgroundColor = "var(--dark-background5,#F2F2F2)"
        })
    }

    initHtml(): string {
        return `
        <style>
        :host{
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
            background: background: var(--dark-background3,#FFFFFF);
            border-radius: 0px 16px 16px 0px;
        }
        .root {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: min-content min-content min-content;
            grid-gap: 50px;
            padding-top: 45px;
            padding-left: 41px;
            background: var(--dark-background3,#FFFFFF);
            font-size:16px;
            border-radius: 0px 16px 16px 0px;
            overflow-y: auto;
        }
        .record-mode{
            font-family: Helvetica-Bold;
            font-size: 16px;
            color: var(--dark-color1,#000000);
            line-height: 28px;
            font-weight: 700;
            margin-bottom: 16px;
            grid-column: span 1;
        }
        .record{
            display:flex;
            flex-direction: column;
        }
        
        .output{
            display:grid;
        }

        .trace_file_span {
            width: 20%;
            height: 1em;
            margin: 0;
        }
        
        #trace_path {
           background-color: var(--dark-background5,#FFFFFF)
           font-family: Helvetica-Bold;
           color:  var(--dark-color1,#8f8c8c);
           margin: 0;
           width: 25%;
           height: 25px;
           border-radius: 8px;
           outline: none;
           border: 1px solid #ccc;
        }
        .buffer-size{
            height: min-content;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr min-content;
        }

        .max-duration{
            height: min-content;
            display: grid;
            grid-template-rows: 1fr 1fr;
            grid-template-columns: 1fr 1fr min-content;
        }

        #litradio{
            opacity: 0.9;
            font-family: Helvetica;
            font-size: 14px;
            color: var(--dark-color1,#000000);
            text-align: left;
            line-height: 16px;
            font-weight: 400;
        }

        button{
            height: 25px;
            width: 100%;
            border: 0;
            text-align: left;
            padding-left: 20px;
            margin-top: 10px;
            background-color: #E4E3E9;
        }

        .line{
            border-top: 1px solid #C5C7CF;
            background: #E4E3E9;
            margin-top: 4px;
            display: inline-block;
            width: 100%;
            height: 1px;
            overflow: hidden;
            vertical-align: middle;
        }

        .max_duration_result, .memory_buffer_result{
            margin: 5px 0 5px 5px;
            background-color: var(--dark-background5,#F2F2F2);
            -webkit-appearance:none;
            outline:0;
            font-size:14px;
            color:var(--dark-color,#6a6f77);
            border: none;
            text-align: center;
            width: 90px;
        }
        
        .resultValue, .resultSize{
            margin: 0 30px 0 0;
            height: 40px;
            background-color: var(--dark-background5,#F2F2F2);
            -webkit-appearance:none;
            outline:0;
            border:1px solid var(--dark-border,#c8cccf);
            color:var(--dark-color,#6a6f77);
            border-radius:20px;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns:  min-content min-content;
            width: 150px;
        }

        #memory-buffer, #max-duration {
            margin: 0 8px;
            grid-column: span 2;
        }
        
        .record-title{
            margin-bottom: 16px;
            grid-column: span 3;
        }
        
        .record-prompt{
              opacity: 0.6;
              font-family: Helvetica;
              font-size: 14px;
              text-align: center;
              line-height: 35px;
              font-weight: 400;
        }

        </style>
        <div class="root">
          <div class="record">
            <span class="record-mode">Record mode</span>
            <lit-radio name="Stop when full" dis="round" id="litradio" checked>Stop when full</lit-radio>
          </div>
          <div class="output">
            <span class="record-mode">output file path</span>
            <div>
              <span class="trace_file_span">/data/local/tmp/</span>
              <input id="trace_path" type="text" value='hiprofiler_data.htrace'onkeydown="this.value.length >= 100 ? this.value = this.value.substring(0,99): 0" oninput="this.value= this.value.replace('__','_')" onkeyup="this.value=this.value.replace(/[^\\w\\.]/g,'')">
            </div>
          </div>
          <div class="buffer-size">
            <div class="record-title">
                <span class="record-mode">In-memory buffer size</span> 
                <span class="record-prompt"> (max memory buffer size is 512 MB) </span>
            </div>
            <lit-slider id="memory-buffer" defaultColor="var(--dark-color3,#46B1E3)" open dir="right">
            </lit-slider>
            <div class='resultSize'>
                <input class="memory_buffer_result" type="text" value='64' onkeyup="this.value=this.value.replace(/\\D/g,'')">
                <span style="text-align: center; margin: 8px"> MB </span>
            </div>
          </div>
          <div class="max-duration">
            <div class="record-title">
                <span class="record-mode" >Max duration</span>
                <span class="record-prompt"> (max duration value is 01:00:00) </span>
            </div>
            <lit-slider id="max-duration" defaultColor="var(--dark-color4,#61CFBE)" open dir="right">
            </lit-slider>
            <div class='resultValue'>
                <input class="max_duration_result" type="text" value = '00:00:50' >
                <span style="text-align: center; margin: 8px 8px 8px 0"> h:m:s </span>
            </div>
            
          </div>
        </div>
        `;
    }
}