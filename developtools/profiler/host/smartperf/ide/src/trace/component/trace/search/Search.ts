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

import {BaseElement, element} from "../../../../base-ui/BaseElement.js";

@element("lit-search")
export class LitSearch extends BaseElement {
    valueChangeHandler: ((str: string) => void) | undefined | null;
    private search: HTMLInputElement | undefined | null;
    private _total: number = 0;
    private _index: number = 0;
    private _list: Array<any> = [];
    private totalEL: HTMLSpanElement | null | undefined;
    private indexEL: HTMLSpanElement | null | undefined;

    get list(): Array<any> {
        return this._list;
    }

    set list(value: Array<any>) {
        this._list = value;
        this.total = value.length;
    }

    get index(): number {
        return this._index;
    }

    set index(value: number) {
        this._index = value;
        this.indexEL!.textContent = `${value + 1}`;
    }

    get searchValue(){
        return this.search?.value
    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        value > 0 ? this.setAttribute("show-search-info", '') : this.removeAttribute("show-search-info");
        this._total = value;
        this.indexEL!.textContent = '0';
        this.totalEL!.textContent = value.toString();
    }

    get isLoading(): boolean{
        return this.hasAttribute('isLoading')
    }

    set isLoading(va){
        if (va) {
            this.setAttribute('isLoading','');
        } else {
            this.removeAttribute('isLoading')
        }
    }

    setPercent(name: string = "", value: number) {
        let searchHide = this.shadowRoot!.querySelector<HTMLElement>(".root")
        let searchIcon = this.shadowRoot!.querySelector<HTMLElement>("#search-icon")
        this.isLoading = false
        if (value > 0 && value <= 100) {
            searchHide!.style.display = "flex"
            searchHide!.style.backgroundColor = "var(--dark-background5,#e3e3e3)"
            searchIcon?.setAttribute('name', "cloud-sync");
            this.search!.setAttribute('placeholder', `${name}${value}%`);
            this.search!.setAttribute('readonly', "");
            this.search!.className = "readonly"
            this.isLoading = true
        } else if (value > 100) {
            searchHide!.style.display = "flex"
            searchHide!.style.backgroundColor = "var(--dark-background5,#fff)"
            searchIcon?.setAttribute('name', "search");
            this.search?.setAttribute('placeholder', `search`);
            this.search?.removeAttribute('readonly');
            this.search!.className = "write"
        } else if (value == -1) {
            searchHide!.style.display = "flex"
            searchHide!.style.backgroundColor = "var(--dark-background5,#e3e3e3)"
            searchIcon?.setAttribute('name', "cloud-sync");
            this.search!.setAttribute('placeholder', `${name}`);
            this.search!.setAttribute('readonly', "");
            this.search!.className = "readonly"
        } else {
            searchHide!.style.display = "none"
        }
    }

    clear() {
        this.search = this.shadowRoot!.querySelector<HTMLInputElement>("input");
        this.search!.value = "";
        this.list = [];
    }

    blur() {
        this.search?.blur();
    }

    initElements(): void {
        this.search = this.shadowRoot!.querySelector<HTMLInputElement>("input");
        this.totalEL = this.shadowRoot!.querySelector<HTMLSpanElement>("#total");
        this.indexEL = this.shadowRoot!.querySelector<HTMLSpanElement>("#index");
        this.search!.addEventListener("focus", (e) => {
            this.dispatchEvent(new CustomEvent("focus", {
                detail: {
                    value: this.search!.value
                }
            }));
        });
        this.search!.addEventListener("blur", (e) => {
            this.dispatchEvent(new CustomEvent("blur", {
                detail: {
                    value: this.search!.value
                }
            }));
        });
        this.search!.addEventListener('change', (event) => {
            this.index = -1;
        });

        this.search!.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.code == "Enter") {
                if (e.shiftKey) {
                    this.dispatchEvent(new CustomEvent("previous-data", {
                        detail: {
                            value: this.search!.value
                        },
                        composed:false
                    }));
                } else {
                    this.dispatchEvent(new CustomEvent("next-data", {
                        detail: {
                            value: this.search!.value
                        },
                        composed:false
                    }));
                }
            } else {
                this.valueChangeHandler?.(this.search!.value);
            }
            e.stopPropagation();
        });
        this.shadowRoot?.querySelector("#arrow-left")?.addEventListener("click", (e) => {
            this.dispatchEvent(new CustomEvent("previous-data", {
                detail: {
                    value: this.search!.value
                }
            }));
        });
        this.shadowRoot?.querySelector("#arrow-right")?.addEventListener("click", (e) => {
            this.dispatchEvent(new CustomEvent("next-data", {
                detail: {
                    value: this.search!.value
                }
            }));
        });
    }

    initHtml(): string {
        return `
        <style>
        :host{
        }
        .root{
            background-color: var(--dark-background5,#fff);
            border-radius: 40px;
            padding: 3px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--dark-border,#c5c5c5);
            width: 35vw;
            }
        .root input{
            outline: none;
            border: 0px;
            background-color: transparent;
            font-size: inherit;
            color: var(--dark-color,#666666);
            flex: 1;
            height: auto;
            vertical-align:middle;
            line-height:inherit;
            height:inherit;
            padding: 6px 6px 6px 6px};
            max-height: inherit;
            box-sizing: border-box;
        }
        ::placeholder {
          color: #b5b7ba;
          font-size: 1em;
        }
        .write::placeholder {
          color: #b5b7ba;
          font-size: 1em;
        }
        .readonly::placeholder {
          color: #4f7ab3;
          font-size: 1em;
        }
        :host([show-search-info]) .search-info{
            display: inline-flex;
        }
        :host(:not([show-search-info])) .search-info{
            display: none;
        }
        .search-info span{
            color:#ABABAB;
        }
        .search-info lit-icon{
            font-weight: bold;
        }

        </style>
        <div class="root" style="display: none">
            <lit-icon id="search-icon" name="search" size="20" color="#aaaaaa">
            </lit-icon>
            <input class="readonly" placeholder="Search" readonly/>
            <div class="search-info">
                <span id="index">0</span><span>/</span><span id="total">0</span>
                <lit-icon class="icon" id="arrow-left" name="caret-left" color="#AAAAAA" size="22">
                </lit-icon>
                <span>|</span>
                <lit-icon class="icon" id="arrow-right"  name="caret-right" color="#AAAAAA" size="22">
                </lit-icon>
            </div>
        </div>
        `;
    }
}
