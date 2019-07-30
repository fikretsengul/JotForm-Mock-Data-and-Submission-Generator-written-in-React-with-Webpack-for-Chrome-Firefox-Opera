import ext from '../utils/ext';

let copyFields = null;

function onRequest(request, sender, sendResponse) {
  if (request.action === 'get-url') {
    sendResponse({ info: window.location.href });
  } else if (request.action === 'get-questions') {
    const stringQuestions = document.head.getElementsByTagName('script')

    for (const key in stringQuestions) {
      var number = /[0-9]/;
      if (number.test(key)) {
        if (stringQuestions[key].text.includes("prepareCalculationsOnTheFly")) {
          const found = stringQuestions[key].text.split('prepareCalculationsOnTheFly([null,').map(el => el.split(']);')).reduce((acc, curr) => acc.concat(curr))[1];

          const questions = JSON.parse('[' + found + ']');
          copyFields = questions

          sendResponse({ info: questions });
        }
      }
    }
  } else if (request.action === 'fill-form') {
    const fields = request.data.fields;
    let split

    for (const key in fields) {
      switch (fields[key].name) {
        case 'control_fullname':
          split = fields[key].value.split(" ");

          document.querySelector(`#first_${fields[key].qid}`).value = split[0]
          document.querySelector(`#last_${fields[key].qid}`).value = split[1]
          break;
        case 'control_email':
          document.querySelector(`#input_${fields[key].qid}`).value = fields[key].value
          break;
        case 'control_address':
          split = fields[key].value.split(" ");

          document.querySelector(`#input_${fields[key].qid}_addr_line1`).value = split[0] + " " + split[1]
          document.querySelector(`#input_${fields[key].qid}_addr_line2`).value = split[2]
          document.querySelector(`#input_${fields[key].qid}_city`).value = "Manhattan"
          document.querySelector(`#input_${fields[key].qid}_state`).value = "New York"
          document.querySelector(`#input_${fields[key].qid}_postal`).value = "10026"
          break;
        case 'control_phone':
          split = fields[key].value.split(" ");

          document.querySelector(`#input_${fields[key].qid}_area`).value = split[0]
          document.querySelector(`#input_${fields[key].qid}_phone`).value = split[1] + " " + split[2]
          break;
        case 'control_datetime':
          document.querySelector(`#lite_mode_${fields[key].qid}`).value = fields[key].value
          break;
        case 'control_time':
          const hour = ["00", "10", "20", "30", "40", "50"]

          document.querySelector(`#input_${fields[key].qid}_hourSelect`).value = Math.round(1 + Math.random() * (12 - 1))
          document.querySelector(`#input_${fields[key].qid}_minuteSelect`).value = parseInt(hour[Math.round(Math.random() * hour.length)], 10)
          document.querySelector(`#input_${fields[key].qid}_ampm`).value = "PM"
          break;
        case 'control_textbox':
          document.querySelector(`#input_${fields[key].qid}`).value = fields[key].value
          break;
        case 'control_textarea':
          document.querySelector(`#input_${fields[key].qid}`).value = fields[key].value
          break;
        case 'control_number':
          document.querySelector(`#input_${fields[key].qid}`).value = fields[key].value
          break;
        case 'control_dropdown':
          let realOptions = []
          const options = document.querySelector(`#input_${fields[key].qid}`)

          for (let i = 0; i < options.length; i++) {
            if (options[i].value !== "") {
              realOptions.push(options[i].value)
            }
          }
          console.log(options)
          const selectedOption = realOptions[Math.floor(Math.random() * realOptions.length)]
          console.log(selectedOption)
          document.querySelector(`#input_${fields[key].qid}`).value = selectedOption
          break;
        case 'control_radio':
          const radios = document.querySelectorAll(`[id^="input_${fields[key].qid}"]`)

          const selectedRadio = [Math.floor(Math.random() * radios.length)]

          document.querySelector(`#input_${fields[key].qid}_${selectedRadio}`).checked = true
          break;
        case 'control_checkbox':
          const checkboxes = document.querySelectorAll(`[id^="input_${fields[key].qid}"]`)

          for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].value !== "") {
              document.querySelector(`#input_${fields[key].qid}_${i}`).checked = false
            }
          }

          const selectedCheckbox = [Math.floor(Math.random() * radios.length)]

          document.querySelector(`#input_${fields[key].qid}_${selectedCheckbox}`).checked = true
          break;
        default: break;
      }
    }
  }
}

ext.runtime.onMessage.addListener(onRequest);
