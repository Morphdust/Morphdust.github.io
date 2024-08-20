(function () {
  'use strict';

  var css_248z$3 = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n  top: 0;\n  right: 0;\n}\n\n::slotted(*) {\n  all: unset !important;\n}\n\n#container {\n  background-color: #295ff6;\n  border-radius: 8px;\n  padding: 12px 24px;\n  margin: 16px;\n  width: 30vw;\n  right: 0;\n  top: 0;\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n  font-family: system-ui;\n  transform: translateX(calc(100% + 20px));\n  transition: all 0.5s cubic-bezier(0.3, -0.1, 1, 1);\n}\n\n#container.active {\n  transform: translateX(0);\n}\n\n#heading {\n  font-size: 16px;\n  margin: 4px 0;\n  font-weight: 600;\n  line-height: 1.4;\n}\n\n#heading-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 2px;\n}\n\n#heading-container div {\n  display: flex;\n  flex-direction: row;\n}\n\n#close-icon {\n  align-self: center;\n  cursor: pointer;\n}\n\n#content-container {\n  display: flex;\n  flex-direction: row;\n  width: 96%;\n}\n\n#content {\n  font-size: 13px;\n  line-height: 1.4;\n}\n\n#icon-container {\n  height: 20px;\n  width: 20px;\n  padding-right: 6px;\n  align-self: center;\n}\n\n#icon-container img {\n  height: 20px;\n  width: 20px;\n  background: #2a2a2a;\n  border-radius: 4px;\n}\n";

  const registerCustomElement = (tagName, elementConstructor) => {
      if (!customElements.get(tagName)) {
          customElements.define(tagName, elementConstructor);
      }
  };
  const setInnerHTML = (element, content) => {
      try {
          element.innerHTML = content;
      }
      catch (e) {
          // @ts-ignore
          const trustedTypesPolicy = window.trustedTypes?.createPolicy?.("rq-html-policy", {
              createHTML: (html) => html,
          });
          element.innerHTML = trustedTypesPolicy.createHTML(content);
      }
  };
  const getEpochToMMSSFormat = (epochTime) => {
      const date = new Date(epochTime);
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
  };

  var CloseIcon = "<svg width=\"8\" height=\"8\" viewBox=\"0 0 8 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.167368 0.167368C0.390524 -0.0557892 0.752333 -0.0557892 0.97549 0.167368L4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333 7.83263 0.97549L4.80812 4L7.83263 7.02451C8.05579 7.24767 8.05579 7.60948 7.83263 7.83263C7.60948 8.05579 7.24767 8.05579 7.02451 7.83263L4 4.80812L0.97549 7.83263C0.752333 8.05579 0.390524 8.05579 0.167368 7.83263C-0.0557892 7.60948 -0.0557892 7.24767 0.167368 7.02451L3.19188 4L0.167368 0.97549C-0.0557892 0.752333 -0.0557892 0.390524 0.167368 0.167368Z\" fill=\"#E3E3E3\"/>\n</svg>";

  class RQToast extends HTMLElement {
      #shadowRoot;
      #time = 10000;
      constructor() {
          super();
          this.#shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.#shadowRoot, this._getDefaultMarkup());
          this.show = this.show.bind(this);
          this.hide = this.hide.bind(this);
      }
      connectedCallback() {
          const heading = this.#shadowRoot.getElementById("heading");
          heading.textContent = this.attributes.getNamedItem("heading")?.value ?? null;
          const time = Number(this.attributes.getNamedItem("time")?.value) ?? null;
          if (time) {
              this.#time = time;
          }
          const iconPath = this.attributes.getNamedItem("icon-path")?.value;
          if (iconPath) {
              const iconContainer = this.#shadowRoot.getElementById("icon-container");
              const icon = document.createElement("img");
              icon.setAttribute("src", iconPath);
              iconContainer?.appendChild(icon);
          }
          this.#shadowRoot.getElementById("close-icon").addEventListener("click", this.hide);
          this.show();
      }
      _getDefaultMarkup() {
          return `
    <style>${css_248z$3}</style>
    <div id="container">
        <div id="heading-container">
          <div>
            <div id="icon-container"></div>
            <div id="heading"></div>
          </div>
          <div id="close-icon">${CloseIcon}</div>
        </div>
        <div id="content-container">
          <slot id="content" name="content"></slot>
        </div>
     </div>
    `;
      }
      show() {
          setTimeout(() => {
              this.#shadowRoot.getElementById("container").classList.add("active");
              setTimeout(this.hide, this.#time);
          }, 300);
      }
      hide() {
          this.#shadowRoot.getElementById("container").classList.remove("active");
      }
  }
  registerCustomElement("rq-toast", RQToast);

  var css_248z$2 = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n}\n\n#container {\n  background-color: #212121;\n  border-radius: 24px;\n  padding: 4px;\n  margin: auto;\n  color: #fff;\n  font-family: system-ui;\n  font-size: 13px;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 4px;\n  white-space: nowrap;\n  cursor: move;\n  display: none;\n}\n\n#container.visible {\n  display: flex;\n}\n\n.action {\n  cursor: pointer;\n  flex-shrink: 0;\n  -webkit-transition: border 0.2s;\n  -moz-transition: border 0.2s;\n  transition: border 0.2s;\n  border: 1px solid transparent;\n}\n\n.action:hover {\n  border: 1px solid #161a25;\n}\n\n.stop-recording {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border-radius: 35px;\n  background: #e43434;\n  font-size: 13px;\n  font-weight: 500;\n  color: #ffffff;\n  box-sizing: border-box;\n  margin-left: 7px;\n}\n\n.stop-recording svg {\n  width: 18px;\n  height: 18px;\n  margin-right: 7px;\n  flex-shrink: 0;\n}\n\n.discard-recording {\n  gap: 8px;\n  padding: 8px;\n  display: flex;\n  align-items: center;\n  border-radius: 35px;\n  background: #51525c;\n}\n\n.discard-recording svg {\n  width: 18px;\n  height: 18px;\n}\n\n.recording-time {\n  min-width: 37px;\n}\n\n.recording-info-icon {\n  display: none;\n  margin-right: 8px;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n}\n\n.recording-info-icon.visible {\n  display: flex;\n}\n\n.recording-info-icon.visible + .stop-recording {\n  margin-left: 0;\n}\n\n.recording-info-icon svg {\n  width: 24px;\n  height: 24px;\n  color: #ffffff;\n  cursor: pointer;\n}\n\n.recording-info-icon:hover::after {\n  display: block;\n}\n\n.recording-info-icon::after {\n  display: none;\n  content: attr(data-tooltip);\n  white-space: break-spaces;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  transform: translate(-30%, -112%);\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: 0.25px;\n  width: 218px;\n  max-width: 232px;\n  padding: 8px 12px;\n  border-radius: 4px;\n  background: #000000;\n  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.48);\n}\n\n@keyframes blink {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.recording-icon {\n  flex-shrink: 0;\n  display: inline-block;\n  margin-left: 12px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #e43434;\n  box-sizing: border-box;\n  animation: blink 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;\n}\n";

  var BinIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M3.47222 1.33333C3.47222 0.596954 4.09405 0 4.86111 0H9.02778C9.79484 0 10.4167 0.596954 10.4167 1.33333V2.66667H11.7984C11.8027 2.66663 11.807 2.66663 11.8113 2.66667H13.1944C13.578 2.66667 13.8889 2.96514 13.8889 3.33333C13.8889 3.70152 13.578 4 13.1944 4H12.4522L11.8499 12.095C11.7979 12.7927 11.1932 13.3333 10.4645 13.3333H3.42439C2.69572 13.3333 2.09094 12.7927 2.03903 12.095L1.43672 4H0.694444C0.310913 4 0 3.70152 0 3.33333C0 2.96514 0.310913 2.66667 0.694444 2.66667H2.0776C2.08191 2.66663 2.08621 2.66663 2.0905 2.66667H3.47222V1.33333ZM4.86111 2.66667H9.02778V1.33333H4.86111V2.66667ZM2.82915 4L3.42439 12H10.4645L11.0597 4H2.82915ZM5.55555 5.33333C5.93909 5.33333 6.25 5.63181 6.25 6V10C6.25 10.3682 5.93909 10.6667 5.55555 10.6667C5.17202 10.6667 4.86111 10.3682 4.86111 10V6C4.86111 5.63181 5.17202 5.33333 5.55555 5.33333ZM8.33333 5.33333C8.71686 5.33333 9.02778 5.63181 9.02778 6V10C9.02778 10.3682 8.71686 10.6667 8.33333 10.6667C7.9498 10.6667 7.63889 10.3682 7.63889 10V6C7.63889 5.63181 7.9498 5.33333 8.33333 5.33333Z\" fill=\"white\"/>\n</svg>";

  var StopRecordingIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path\n    d=\"M10.8333 18.3332C6.23096 18.3332 2.5 14.6022 2.5 9.99984C2.5 5.39746 6.23096 1.6665 10.8333 1.6665C15.4357 1.6665 19.1667 5.39746 19.1667 9.99984C19.1667 14.6022 15.4357 18.3332 10.8333 18.3332ZM10.8333 16.6665C14.5153 16.6665 17.5 13.6818 17.5 9.99984C17.5 6.31794 14.5153 3.33317 10.8333 3.33317C7.15143 3.33317 4.16667 6.31794 4.16667 9.99984C4.16667 13.6818 7.15143 16.6665 10.8333 16.6665ZM8.33333 7.49984H13.3333V12.4998H8.33333V7.49984Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var InfoIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\">\n  <path d=\"M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z\" fill=\"currentColor\"/>\n</svg>";

  var RQDraggableWidgetEvent;
  (function (RQDraggableWidgetEvent) {
      RQDraggableWidgetEvent["MOVED"] = "moved";
  })(RQDraggableWidgetEvent || (RQDraggableWidgetEvent = {}));
  class RQDraggableWidget extends HTMLElement {
      #isDragging;
      #defaultPosition;
      shadowRoot;
      constructor(defaultPosition) {
          super();
          this.#defaultPosition = defaultPosition;
      }
      connectedCallback() {
          this.addDragListeners();
      }
      addDragListeners() {
          // allow widget to be draggable using mouse events
          this.addEventListener("mousedown", (evt) => {
              evt.preventDefault();
              let x = evt.clientX;
              let y = evt.clientY;
              const onMouseMove = (evt) => {
                  evt.preventDefault();
                  this.#isDragging = true;
                  const dX = evt.clientX - x;
                  const dY = evt.clientY - y;
                  x = evt.clientX;
                  y = evt.clientY;
                  const xPos = Math.min(Math.max(this.offsetLeft + dX, 0), window.innerWidth - this.offsetWidth);
                  const yPos = Math.min(Math.max(this.offsetTop + dY, 0), window.innerHeight - this.offsetHeight);
                  this.moveToPostion({ top: yPos, left: xPos });
              };
              const onMouseUp = () => {
                  // Fallback incase click event is not triggered. Timeout because we need to stopPropogation in case isDragging=true. Else it will propogate it and cause weird behaviour
                  // This happens when mousedown and mouseup doesn't happen on the same element
                  // Similar to this https://melkornemesis.medium.com/handling-javascript-mouseup-event-outside-element-b0a34090bb56
                  setTimeout(() => {
                      this.#isDragging = false;
                  }, 100);
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("mouseup", onMouseUp);
              };
              document.addEventListener("mousemove", onMouseMove);
              document.addEventListener("mouseup", onMouseUp);
          });
          window.addEventListener("resize", () => {
              const boundingRect = this.getBoundingClientRect();
              if (boundingRect.left + boundingRect.width > window.innerWidth ||
                  boundingRect.top + boundingRect.height > window.innerHeight) {
                  this.moveToPostion(this.#defaultPosition);
              }
          });
          this.shadowRoot.addEventListener("click", (evt) => {
              if (this.#isDragging) {
                  // disable all clicks while widget is dragging
                  evt.stopPropagation();
                  this.#isDragging = false;
              }
          }, true);
      }
      moveToPostion(position) {
          const getCSSPostionValue = (num) => (typeof num !== "undefined" ? `${num}px` : "auto");
          this.style.left = getCSSPostionValue(position.left);
          this.style.top = getCSSPostionValue(position.top);
          this.style.bottom = getCSSPostionValue(position.bottom);
          this.style.right = getCSSPostionValue(position.right);
          this.dispatchEvent(new CustomEvent(RQDraggableWidgetEvent.MOVED, { detail: position }));
      }
  }

  var RQSessionRecordingWidgetEvent;
  (function (RQSessionRecordingWidgetEvent) {
      RQSessionRecordingWidgetEvent["STOP_RECORDING"] = "stop";
      RQSessionRecordingWidgetEvent["DISCARD_RECORDING"] = "discard";
  })(RQSessionRecordingWidgetEvent || (RQSessionRecordingWidgetEvent = {}));
  const TAG_NAME$2 = "rq-session-recording-widget";
  const DEFAULT_POSITION$2 = { left: 30, bottom: 30 };
  const EXPLICIT_RECORDING_LIMIT = 5 * 60 * 1000; // 5 mins * 60 secs * 1000 ms
  class RQSessionRecordingWidget extends RQDraggableWidget {
      #currentRecordingTime = 0;
      #recordingTimerIntervalId;
      constructor() {
          super(DEFAULT_POSITION$2);
          this.shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.shadowRoot, this._getDefaultMarkup());
          this.show = this.show.bind(this);
          this.hide = this.hide.bind(this);
      }
      connectedCallback() {
          super.connectedCallback();
          this.addListeners();
          this.show();
      }
      addListeners() {
          this.shadowRoot.querySelector(".stop-recording").addEventListener("click", (evt) => {
              evt.stopPropagation();
              this.resetTimer();
              this.triggerEvent(RQSessionRecordingWidgetEvent.STOP_RECORDING);
          });
          this.shadowRoot.querySelector(".discard-recording").addEventListener("click", (evt) => {
              evt.stopPropagation();
              this.triggerEvent(RQSessionRecordingWidgetEvent.DISCARD_RECORDING);
              this.hide();
          });
          this.addEventListener("show", (evt) => {
              this.show(evt.detail?.position, evt.detail?.currentRecordingTime);
          });
          this.addEventListener("hide", this.hide);
      }
      triggerEvent(name, detail) {
          this.dispatchEvent(new CustomEvent(name, { detail }));
      }
      _getDefaultMarkup() {
          const tooltipContent = "Session recording is limited to the most recent 5 minutes. The recording is still active, but you can only view the last 5 minutes of the session.";
          return `
      <style>${css_248z$2}</style>
      <div id="container">
          <span class="recording-icon"></span>
          <span class="recording-time">00:00</span>
          <div title="Recording info" class="recording-info-icon" data-tooltip="${tooltipContent}">
            ${InfoIcon}
          </div>
          <div class="action stop-recording">${StopRecordingIcon} Stop & watch</div>
          <div class="action discard-recording" title="Discard">${BinIcon}</div>
      </div>
    `;
      }
      show(position = DEFAULT_POSITION$2, currentRecordingTime = null) {
          this.moveToPostion(position);
          this.setAttribute("draggable", "true");
          const container = this.getContainer();
          container.classList.add("visible");
          if (currentRecordingTime === null)
              return;
          this.#currentRecordingTime = currentRecordingTime;
          if (this.#recordingTimerIntervalId) {
              clearInterval(this.#recordingTimerIntervalId);
          }
          if (this.#currentRecordingTime < EXPLICIT_RECORDING_LIMIT) {
              container.querySelector(".recording-time").innerHTML = getEpochToMMSSFormat(this.#currentRecordingTime);
          }
          this.#recordingTimerIntervalId = setInterval(() => {
              this.#currentRecordingTime = this.#currentRecordingTime + 1000;
              if (this.#currentRecordingTime < EXPLICIT_RECORDING_LIMIT) {
                  container.querySelector(".recording-time").innerHTML = getEpochToMMSSFormat(this.#currentRecordingTime);
              }
              else {
                  container.querySelector(".recording-time").innerHTML = "05:00";
                  container.querySelector(".recording-info-icon").classList.add("visible");
                  clearInterval(this.#recordingTimerIntervalId);
              }
          }, this.#currentRecordingTime < EXPLICIT_RECORDING_LIMIT ? 1000 : 0);
      }
      resetTimer() {
          if (this.#recordingTimerIntervalId) {
              clearInterval(this.#recordingTimerIntervalId);
          }
          this.#currentRecordingTime = 0;
          this.#recordingTimerIntervalId = null;
          this.getContainer().querySelector(".recording-time").innerHTML = "00:00";
          this.getContainer().querySelector(".recording-info-icon").classList.remove("visible");
      }
      hide() {
          this.resetTimer();
          this.getContainer().classList.remove("visible");
      }
      getContainer() {
          return this.shadowRoot.getElementById("container");
      }
  }
  registerCustomElement(TAG_NAME$2, RQSessionRecordingWidget);

  var ReplayLastFiveMinuteIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path\n    d=\"M18.3333 9.99984C18.3333 5.39746 14.6023 1.6665 9.99996 1.6665C7.48671 1.6665 5.23331 2.77908 3.70543 4.53857L1.66663 2.49984V7.49984H6.66663L4.88739 5.72103C6.11032 4.26136 7.94674 3.33317 9.99996 3.33317C13.6819 3.33317 16.6666 6.31794 16.6666 9.99984C16.6666 13.6818 13.6819 16.6665 9.99996 16.6665C6.31806 16.6665 3.33329 13.6818 3.33329 9.99984H1.66663C1.66663 14.6022 5.39758 18.3332 9.99996 18.3332C14.6023 18.3332 18.3333 14.6022 18.3333 9.99984ZM12.0833 8.33317V7.08317H7.91663V10.6248H10.5208C10.8085 10.6248 11.0416 10.858 11.0416 11.1457C11.0416 11.4333 10.8085 11.6665 10.5208 11.6665H7.91663V12.9165H10.5208C11.4988 12.9165 12.2916 12.1237 12.2916 11.1457C12.2916 10.1677 11.4988 9.37484 10.5208 9.37484H9.16663V8.33317H12.0833Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var RQLogo = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g id=\"Group 107779\">\n      <path\n        id=\"REQUESTLY\"\n        d=\"M10.6008 14.0028V17.4513C10.4772 17.4872 10.2805 17.5231 10.0107 17.5591C9.75216 17.595 9.49362 17.6129 9.23509 17.6129C8.97655 17.6129 8.74611 17.589 8.54378 17.5411C8.35268 17.5052 8.18969 17.4333 8.0548 17.3256C7.93115 17.2178 7.8356 17.0681 7.76816 16.8766C7.70071 16.685 7.66699 16.4335 7.66699 16.1222V7.6626C7.66699 7.41115 7.72882 7.21957 7.85247 7.08785C7.98736 6.94417 8.16721 6.83042 8.39202 6.7466C8.77421 6.60291 9.21822 6.50113 9.72406 6.44126C10.2299 6.36942 10.7695 6.3335 11.3427 6.3335C12.894 6.3335 14.063 6.68074 14.8499 7.37523C15.6367 8.06972 16.0302 9.00967 16.0302 10.1951C16.0302 10.9375 15.8503 11.5721 15.4906 12.0989C15.1309 12.6258 14.7037 13.0329 14.2091 13.3203C14.6138 13.907 15.0129 14.4578 15.4063 14.9727C15.7997 15.4876 16.1088 15.9546 16.3337 16.3736C16.2213 16.7927 16.0133 17.116 15.7098 17.3435C15.4175 17.5591 15.0859 17.6668 14.715 17.6668C14.4677 17.6668 14.2541 17.6369 14.0743 17.577C13.8944 17.5172 13.737 17.4333 13.6021 17.3256C13.4673 17.2178 13.3436 17.0861 13.2312 16.9304C13.1188 16.7748 13.012 16.6071 12.9108 16.4275L11.4945 14.0028H10.6008ZM11.6631 11.614C12.0903 11.614 12.4275 11.5003 12.6748 11.2727C12.9221 11.0333 13.0457 10.686 13.0457 10.231C13.0457 9.776 12.9052 9.43475 12.6242 9.20724C12.3544 8.96776 11.9216 8.84802 11.3259 8.84802C11.1573 8.84802 11.0224 8.85401 10.9212 8.86598C10.82 8.87796 10.7076 8.89592 10.584 8.91987V11.614H11.6631Z\"\n        fill=\"white\"\n      />\n      <path\n        id=\"Vector\"\n        fill-rule=\"evenodd\"\n        clip-rule=\"evenodd\"\n        d=\"M5.00934 21.8862C5.00934 21.5845 5.25355 21.3399 5.55481 21.3399H20.2148C21.7988 21.3399 23.0779 20.0599 23.0779 18.4814V13.4355C23.0779 13.1338 22.8337 12.8892 22.5325 12.8892H21.9188H21.3393C21.038 12.8892 20.7938 13.1338 20.7938 13.4355V17.9084C20.7938 18.5443 20.2844 19.0522 19.6563 19.0522H5.55481C5.25356 19.0522 5.00934 18.8076 5.00934 18.5059V16.9396C5.00934 16.4529 4.42179 16.2092 4.07817 16.5533L0.826756 19.8097C0.613738 20.0231 0.613737 20.369 0.826756 20.5823L4.07817 23.8388C4.42179 24.1829 5.00934 23.9392 5.00934 23.4525V21.8862Z\"\n        fill=\"white\"\n      />\n      <path\n        id=\"Vector_2\"\n        fill-rule=\"evenodd\"\n        clip-rule=\"evenodd\"\n        d=\"M18.7807 2.11382C18.7807 2.41554 18.5365 2.66013 18.2352 2.66013H3.57526C1.9912 2.66013 0.712093 3.94008 0.712093 5.51857V10.5645C0.712093 10.8662 0.956308 11.1108 1.25756 11.1108H1.87121H2.45077C2.75202 11.1108 2.99624 10.8662 2.99624 10.5645V6.09163C2.99624 5.45566 3.50561 4.9478 4.13375 4.9478H18.2352C18.5365 4.9478 18.7807 5.19239 18.7807 5.49411V7.06039C18.7807 7.5471 19.3682 7.79085 19.7119 7.44669L22.9633 4.19026C23.1763 3.97692 23.1763 3.63101 22.9633 3.41767L19.7119 0.161238C19.3682 -0.182918 18.7807 0.0608263 18.7807 0.547535V2.11382Z\"\n        fill=\"white\"\n      />\n    </g>\n  </svg>";

  var css_248z$1 = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n}\n\n#container {\n  font-family: system-ui;\n  white-space: nowrap;\n  cursor: move;\n  border-radius: 48px;\n  background: #161a25;\n  box-sizing: border-box;\n  padding: 4px;\n  position: relative;\n  align-items: center;\n  display: none;\n}\n\n#container.visible {\n  display: flex;\n}\n\n.watch-replay,\n.watch-replay .rq-logo,\n.watch-replay .btn-text {\n  -webkit-transition: all 0.3s;\n  -moz-transition: all 0.3s;\n  transition: all 0.3s;\n}\n\n.watch-replay {\n  flex-shrink: 0;\n  margin: 0;\n  padding: 0;\n  border: none;\n  border-radius: 35px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  position: relative;\n  background: #004eeb;\n  max-width: 36px;\n  min-width: 36px;\n  overflow: hidden;\n}\n\n.rq-logo {\n  padding: 6px;\n  width: 36px;\n  color: #ffffff;\n  border-radius: 50px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  background: transparent;\n}\n\n.rq-logo svg {\n  width: 24px;\n  height: 24px;\n  color: #ffffff;\n}\n\n.watch-replay .btn-text {\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  column-gap: 8px;\n  padding: 8px 16px;\n  font-size: 13px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  transform: scaleX(0);\n  transform-origin: left center;\n}\n\n.watch-replay:hover {\n  min-width: 196px;\n}\n\n.watch-replay:hover .rq-logo {\n  opacity: 0;\n}\n\n.watch-replay:hover .btn-text {\n  opacity: 1;\n  transform: scaleX(1);\n}\n";

  var RQSessionAutoModeRecordingWidgetEvent;
  (function (RQSessionAutoModeRecordingWidgetEvent) {
      RQSessionAutoModeRecordingWidgetEvent["WATCH"] = "watch";
  })(RQSessionAutoModeRecordingWidgetEvent || (RQSessionAutoModeRecordingWidgetEvent = {}));
  const TAG_NAME$1 = "rq-session-recording-auto-mode-widget";
  const DEFAULT_POSITION$1 = { left: 30, bottom: 30 };
  class RQSessionRecordingAutoModeWidget extends RQDraggableWidget {
      constructor() {
          super(DEFAULT_POSITION$1);
          this.shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.shadowRoot, this._getDefaultMarkup());
          this.show = this.show.bind(this);
          this.hide = this.hide.bind(this);
      }
      connectedCallback() {
          super.connectedCallback();
          this.addListeners();
          this.show();
      }
      addListeners() {
          this.shadowRoot.querySelector(".watch-replay").addEventListener("click", (evt) => {
              evt.stopPropagation();
              this.triggerEvent(RQSessionAutoModeRecordingWidgetEvent.WATCH);
          });
          this.addEventListener("show", (evt) => {
              this.show(evt.detail?.position);
          });
          this.addEventListener("hide", this.hide);
      }
      triggerEvent(name, detail) {
          this.dispatchEvent(new CustomEvent(name, { detail }));
      }
      _getDefaultMarkup() {
          return `
    <style>${css_248z$1}</style>
    <div id="container">
      <button class="watch-replay">
        <span class="rq-logo">${RQLogo}</span>
        <span class="btn-text">${ReplayLastFiveMinuteIcon} Watch last 5 min replay</span>
      </button>
    </div>
    `;
      }
      show(position = DEFAULT_POSITION$1) {
          this.moveToPostion(position);
          this.setAttribute("draggable", "true");
          this.getContainer().classList.add("visible");
      }
      hide() {
          this.getContainer().classList.remove("visible");
      }
      getContainer() {
          return this.shadowRoot.getElementById("container");
      }
  }
  registerCustomElement(TAG_NAME$1, RQSessionRecordingAutoModeWidget);

  var css_248z = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n  top: 10px;\n  right: 10px;\n  width: 32vw;\n}\n\n#container {\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n  font-family: system-ui;\n  background: #1c1d21;\n  border: 1px solid #5c5b5b;\n  cursor: move;\n}\n\n#rule-name {\n  font-size: 12px;\n  margin: 4px 0;\n  font-weight: bolder;\n  line-height: 1.4;\n}\n\n#heading-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  border-bottom: 1px solid #5c5b5b;\n  padding: 12px 18px;\n  background: transparent;\n}\n\n#heading-container div {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-content: center;\n}\n\n#content-container {\n  display: flex;\n  flex-direction: column;\n  padding: 12px 18px;\n  background: #242529;\n  border-radius: 8px;\n  justify-content: space-between;\n  font-size: 13px;\n  line-height: 1.4;\n  gap: 8px;\n}\n\n#rule-status-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n\n#info-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n}\n\n#info-icon {\n  color: #dc6803;\n  align-self: flex-start;\n  margin-top: 1px;\n}\n\n#rule-status-comment {\n  align-self: center;\n}\n\n#icon-container {\n  height: 20px;\n  width: 20px;\n  padding-right: 4px;\n  align-self: center;\n}\n\n#icon-container img {\n  height: 16px;\n  width: 16px;\n  background: #2a2a2a;\n  border-radius: 4px;\n}\n\n#view-result-btn {\n  all: unset;\n  background: #1e69ff;\n  color: #fff;\n  border-radius: 4px;\n  padding: 4px 12px;\n  font-size: 12px;\n}\n\n#view-result-btn:hover {\n  cursor: pointer;\n  border-color: #0f4cd9;\n  background: #0f4cd9;\n}\n\n#rule-status {\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: center;\n  gap: 4px;\n}\n\n.secondary-text {\n  font-size: 11px;\n  color: #b0b0b5b3;\n}\n\n.hidden {\n  display: none !important;\n}\n\na {\n  color: #9370db;\n}\n";

  var RQTestRuleWidgetEvent;
  (function (RQTestRuleWidgetEvent) {
      RQTestRuleWidgetEvent["VIEW_RESULTS"] = "view-results";
  })(RQTestRuleWidgetEvent || (RQTestRuleWidgetEvent = {}));
  const TAG_NAME = "rq-test-rule-widget";
  const DEFAULT_POSITION = { right: 10, top: 10 };
  class RQTestRuleWidget extends RQDraggableWidget {
      #testRuleId;
      constructor() {
          super(DEFAULT_POSITION);
          this.shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.shadowRoot, this._getDefaultMarkup());
      }
      connectedCallback() {
          this.setAttribute("draggable", "true");
          super.connectedCallback();
          this.addListeners();
          this.#testRuleId = this.attributes.getNamedItem("rule-id")?.value;
          const ruleName = this.shadowRoot.getElementById("rule-name");
          ruleName.textContent = "Testing " + this.attributes.getNamedItem("rule-name")?.value ?? null;
          const iconPath = this.attributes.getNamedItem("icon-path")?.value;
          if (iconPath) {
              const iconContainer = this.shadowRoot.getElementById("icon-container");
              const icon = document.createElement("img");
              icon.setAttribute("src", iconPath);
              iconContainer?.appendChild(icon);
          }
          const appliedStatus = this.attributes.getNamedItem("applied-status")?.value;
          this.showRuleAppliedStatus(appliedStatus === "true");
          const infoTextContent = this.attributes.getNamedItem("info-text-content")?.value;
          if (infoTextContent) {
              const infoContainer = this.shadowRoot.getElementById("info-container");
              const infoContainerText = this.shadowRoot.getElementById("info-text");
              infoContainerText.innerHTML = infoTextContent;
              infoContainer.classList.remove("hidden");
          }
      }
      addListeners() {
          this.shadowRoot.getElementById("view-result-btn").addEventListener("click", (evt) => {
              evt.preventDefault();
              evt.stopPropagation();
              this.triggerEvent(RQTestRuleWidgetEvent.VIEW_RESULTS);
          });
          this.addEventListener("new-rule-applied", (evt) => {
              if (evt.detail?.appliedRuleId === this.#testRuleId) {
                  this.setAttribute("applied-status", "true");
                  this.showRuleAppliedStatus(true);
              }
          });
      }
      triggerEvent(name, detail) {
          this.dispatchEvent(new CustomEvent(name, { detail }));
      }
      showRuleAppliedStatus(appliedStatus) {
          const ruleStatusContainer = this.shadowRoot.getElementById("rule-status");
          if (appliedStatus) {
              ruleStatusContainer.innerHTML = `
				✅&nbsp;&nbsp;Rule applied
			`;
          }
          else {
              ruleStatusContainer.innerHTML = `
				❌&nbsp;&nbsp;Rule not applied yet
			`;
          }
      }
      _getDefaultMarkup() {
          return `
    <style>${css_248z}</style>
    <div id="container">
      <div id="heading-container">
      	<div>
          <div id="icon-container"></div>
          <div id="rule-name"></div>
        </div>
        <button id="view-result-btn">View Results</button>
      </div>
      <div id="content-container">
        <div id="rule-status-container">
          <div id="rule-status"></div>
          <div id="rule-status-comment" class="secondary-text">You can view detailed logs in console</div>
        </div>
        <div id="info-container" class="hidden">
          <div id="info-icon">${InfoIcon}</div>
          <div id="info-text" class="secondary-text"></div>
        </div>
      </div>
    </div>
    `;
      }
  }
  registerCustomElement(TAG_NAME, RQTestRuleWidget);

})();
