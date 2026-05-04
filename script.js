const CURRENT_YEAR = 2026;
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxkjcNuRDa1zlB0X37yj6G1Q8iyy_97MVTLmLMPp9uGkS0oP-7SNBjv1rl76Pxk5DHRig/exec";
const fillerWords = [
  "the","of","and","if","as","is","was","are","be","been","to","in","on","for",
  "with","by","from","this","that","it","or","an","a","so","but","then","than",
  "also","very","good","okay","ok","test","testing","sample","dummy","done",
  "fine","yes","no","maybe","check","checked"
];

const automotiveTerms = [
  "engine","motor","power unit","powertrain","transmission","gearbox","t/m","tm",
  "at","mt","cvt","transfer","transfer case","differential","diff","propeller shaft",
  "prop shaft","drive shaft","axle","bearing","wheel bearing","brake","braking",
  "caliper","disc","rotor","pad","abs","steering","rack","eps","suspension",
  "shock","strut","bushing","sensor","ecu","ecm","battery","alternator","wiring",
  "connector","harness","fuel","injector","turbo","coolant","radiator","oil",
  "tire","wheel","chassis","underbody","compressor","a/c","ac","headlight",
  "noise","sound","squeak","rattle","knock","click","grinding","hum","buzz",
  "whine","vibration","shake","shudder","judder","hesitation","jerk","slip",
  "leak","leakage","warning","lamp","dtc","code","fault","abnormal","intermittent",
  "continuous","drive","driving","accelerate","acceleration","accelerator","throttle",
  "pedal","idle","coasting","turn","left","right","straight","lock","full lock",
  "reverse","forward","d","r","shift","gear","speed","rpm","temperature","warm",
  "hot","cold","load","towing","trailer","incline","flat","uphill","downhill",
  "road","highway","paved","diagnosis","inspection","inspect","checked","verified",
  "confirmed","found","detected","identified","measured","scan","scanner","obd",
  "road test","test drive","removed","compared","analysis","result"
];

const usageTerms = [
  "personal","commercial","fleet","customer","daily","weekly","city","highway",
  "loaded","unloaded","passenger","occupant","front","rear","towing","trailer",
  "cargo","load","operation","usage","driving","route","traffic","duration",
  "mileage","service","off-road","normal use",
  ...automotiveTerms
];

const reproduceTerms = [
  "start","drive","accelerate","brake","shift","reverse","forward","warm","idle",
  "road","speed","rpm","turn","stop","condition","observe","repeat","reproduce",
  "duplicate","duplicated","confirm","confirmed","result","step","first","then",
  "after","finally","temperature","coolant","engine","transmission","gear","d","r",
  ...automotiveTerms
];

const diagnosisTerms = [
  "diagnosis","inspect","inspection","checked","check","examined","verified",
  "confirmed","found","detected","identified","observed","measured","measurement",
  "scan","scanner","obd","dtc","fault code","live data","road test","test drive",
  "chassis ear","sdr","removed","disassembled","compared","analysis","result",
  "voltage","pressure","temperature","rpm","speed","sensor","connector","harness",
  "bearing","shaft","oil","condition","noise source",
  ...automotiveTerms
];

const repairConfirmationTerms = [
  "part","component","assembly","replace","replaced","replacement","changed",
  "renewed","installed","repair","repaired","fix","fixed","rectify","rectified",
  "correct","corrected","adjust","adjusted","tighten","tightened","clean","cleaned",
  "calibrate","calibrated","reset","resolved","solved","confirmed","verified",
  "normal","no abnormality","issue not occurring","not occurring","not happening",
  "no recurrence","functioning properly","operating normally","passed road test",
  "road test","condition improved","improved","completed","successful"
];

const requestCommentTerms = [
  "tmc","request","requested","we request","kindly investigate","investigate",
  "investigation","technical support","engineering support","please advise",
  "please confirm","need investigation","root cause","root cause analysis",
  "countermeasure","solution","approval","review","clarification","response",
  "recommendation","report","action","ti","trf","tsb","ftr","field report",
  "technical information","service bulletin","feedback","dlr","dist","qa","qc"
];

const strictKeywordFields = [
  { id: "customerComplaint", section: "Background Phenomenon", terms: automotiveTerms },
  { id: "usageCondition", section: "Usage Condition", terms: usageTerms },
  { id: "reproduce", section: "How to Reproduce", terms: reproduceTerms },
  { id: "diagnosis", section: "Detailed Diagnosis", terms: diagnosisTerms }
];

const mildEmptyFields = [
  { id: "reasonDecision", section: "Reason of Decision" },
  { id: "amendComments", section: "Comments on Amendment" },
  { id: "riskFactors", section: "Risk Factors", allowNA: true },
  { id: "warrantyTrend", section: "Warranty / Problem Trend" }
];

const repairResultFields = [
  { id: "correction", section: "Correction" },
  { id: "repairResult", section: "Repair Result" }
];

const requiredShortFields = [
  { id: "ftrNo", section: "Header", label: "FTR number" },
  { id: "company", section: "Header", label: "Company" },
  { id: "country", section: "Header", label: "Country / region" },
  { id: "createdBy", section: "Header", label: "Created by" },
  { id: "creationDate", section: "Header", label: "Creation date" },
  { id: "vin", section: "Vehicle Information", label: "VIN" },
  { id: "model", section: "Vehicle Information", label: "Model" },
  { id: "modelCode", section: "Vehicle Information", label: "Model code" },
  { id: "engineType", section: "Vehicle Information", label: "Engine type" },
  { id: "engineNo", section: "Vehicle Information", label: "Engine number" },
  { id: "transmissionType", section: "Vehicle Information", label: "Transmission type" },
  { id: "mileage", section: "Vehicle Information", label: "Mileage" },
  { id: "modelYear", section: "Vehicle Information", label: "Model year" },
  { id: "deliveryDate", section: "Vehicle Information", label: "Delivery date" },
  { id: "repairDate", section: "Vehicle Information", label: "Repair date" },
  { id: "speedCondition", section: "Detailed Condition", label: "Speed condition" },
  { id: "shiftCondition", section: "Detailed Condition", label: "Shift / gear condition" },
  { id: "rpmCondition", section: "Detailed Condition", label: "Engine RPM condition" },
  { id: "warningLamps", section: "Detailed Condition", label: "Warning lamps" },
  { id: "externalTime", section: "External Condition", label: "External condition time" },
  { id: "externalWeather", section: "External Condition", label: "External weather" },
  { id: "altitude", section: "External Condition", label: "Altitude" },
  { id: "season", section: "External Condition", label: "Season" },
  { id: "placeLocation", section: "External Condition", label: "Place / location" },
  { id: "frontOccupants", section: "Usage Condition", label: "Front occupants" },
  { id: "rearOccupants", section: "Usage Condition", label: "Rear occupants" },
  { id: "marketRank", section: "Header", label: "Market impact rank" },
  { id: "technicalRank", section: "Header", label: "Technical rank" }
];

function getValue(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[\n\t]/g, " ")
    .replace(/[^a-z0-9/°.%\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordsOnly(text) {
  return normalize(text).split(" ").filter(word => word && !fillerWords.includes(word));
}

function uniqueWordRatio(text) {
  const words = wordsOnly(text).filter(word => word.length > 2);
  if (words.length === 0) return 0;
  return new Set(words).size / words.length;
}

function isFillerOrMeaningless(text) {
  const words = wordsOnly(text);
  if (words.length === 0) return true;
  if (words.length > 6 && uniqueWordRatio(text) < 0.35) return true;
  return false;
}

function containsAny(text, terms) {
  const clean = normalize(text);
  return terms.some(term => clean.includes(normalize(term)));
}

function matchedTerms(text, terms) {
  const clean = normalize(text);
  return Array.from(new Set(terms.filter(term => clean.includes(normalize(term)))));
}

function addFeedback(list, message) {
  if (!list.includes(message)) list.push(message);
}

function makeCheckboxGroupSingleSelect(labels) {
  const allLabels = Array.from(document.querySelectorAll("label.checkbox-item"));

  const group = allLabels
    .filter(label => labels.includes(label.textContent.trim()))
    .map(label => label.querySelector("input[type='checkbox']"))
    .filter(Boolean);

  group.forEach(box => {
    box.addEventListener("change", () => {
      if (box.checked) {
        group.forEach(other => {
          if (other !== box) other.checked = false;
        });
      }
    });
  });
}

function setupSingleSelectionCheckboxes() {
  makeCheckboxGroupSingleSelect(["Straight", "Left", "Right", "Full lock"]);
  makeCheckboxGroupSingleSelect(["Accelerator", "Brake", "No pedal input"]);
  makeCheckboxGroupSingleSelect(["P to D", "D to R", "Upshift", "Downshift", "No shift operation"]);
  makeCheckboxGroupSingleSelect(["A/C", "Headlight", "Others"]);
}

function syncRadioResult(name, hiddenId) {
  const selected = document.querySelector("input[name='" + name + "']:checked");
  const hidden = document.getElementById(hiddenId);
  if (hidden) hidden.value = selected ? selected.value : "";
}

document.querySelectorAll("input[name='repro']").forEach(radio => {
  radio.addEventListener("change", () => syncRadioResult("repro", "reproductionResult"));
});

document.querySelectorAll("input[name='towing']").forEach(radio => {
  radio.addEventListener("change", () => syncRadioResult("towing", "towingCondition"));
});

function validateRequiredShortFields(errors) {
  requiredShortFields.forEach(field => {
    const value = getValue(field.id);

    if (!value) {
      addFeedback(errors, "Section: " + field.section + " → " + field.label + " is missing.");
    } else if (isFillerOrMeaningless(value)) {
      addFeedback(errors, "Section: " + field.section + " → " + field.label + " contains meaningless data.");
    }
  });

  const km = document.getElementById("kmUnit");
  const mile = document.getElementById("mileUnit");

  if (km && mile && !km.checked && !mile.checked) {
    addFeedback(errors, "Section: Vehicle Information → Mileage unit must be selected as Km or Mile.");
  }
}

function validateStrictKeywordFields(errors, warnings) {
  strictKeywordFields.forEach(field => {
    const value = getValue(field.id);

    if (!value) {
      addFeedback(errors, "Section: " + field.section + " → Field is empty. Please check again.");
      return;
    }

    if (isFillerOrMeaningless(value)) {
      addFeedback(errors, "Section: " + field.section + " → Provided information appears to be filler/repetitive and lacks relevance.");
      return;
    }

    const matches = matchedTerms(value, field.terms);

    if (matches.length <= 3) {
      addFeedback(errors, "Section: " + field.section + " → Provided information appears irrelevant. Only ");
    } else if (matches.length <= 7) {
      addFeedback(warnings, "Section: " + field.section + " → Better if more information is given. Only ");
    }
  });
}

function validateMildOptionalFields(warnings) {
  mildEmptyFields.forEach(field => {
    const value = getValue(field.id);
    const clean = normalize(value);

    if (!value) {
      addFeedback(warnings, "Section: " + field.section + " is left empty, please review.");
      return;
    }

    if (field.allowNA && ["na", "n/a", "n.a", "n.a.", "not applicable"].includes(clean)) return;

    if (isFillerOrMeaningless(value)) {
      addFeedback(warnings, "Section: " + field.section + " lacks relevance.");
    }
  });
}

function validateRepairAndResultFields(warnings) {
  repairResultFields.forEach(field => {
    const value = getValue(field.id);

    if (!value) {
      addFeedback(warnings, "Section: " + field.section + " is left empty, please review.");
      return;
    }

    if (isFillerOrMeaningless(value)) {
      addFeedback(warnings, "Section: " + field.section + " lacks relevance.");
      return;
    }

    if (!containsAny(value, repairConfirmationTerms)) {
      addFeedback(warnings, "Section: " + field.section + " lacks repair/result confirmation words.");
    }
  });
}

function validateRequestComment(warnings) {
  const value = getValue("requestComment");

  if (!value) {
    addFeedback(warnings, "Section: Request / Comment is left empty, please review.");
    return;
  }

  if (isFillerOrMeaningless(value)) {
    addFeedback(warnings, "Section: Request / Comment lacks relevance.");
    return;
  }

  if (!containsAny(value, requestCommentTerms)) {
    addFeedback(warnings, "Section: Request / Comment lacks request/TMC/technical communication words.");
  }
}

function validateLogicalRules(errors) {
  const productionDate = getValue("productionDate");
  const deliveryDate = getValue("deliveryDate");
  const firstComplaintDate = getValue("firstComplaintDate");
  const repairDate = getValue("repairDate");
  const creationDate = getValue("creationDate");

  if (productionDate && deliveryDate && new Date(productionDate) > new Date(deliveryDate)) {
    addFeedback(errors, "Section: Vehicle Information → Production date cannot be after delivery date.");
  }

  if (deliveryDate && repairDate && new Date(deliveryDate) >= new Date(repairDate)) {
    addFeedback(errors, "Section: Vehicle Information → Delivery date must be before repair date.");
  }

  if (repairDate && creationDate && new Date(repairDate) > new Date(creationDate)) {
    addFeedback(errors, "Section: Vehicle Information → Repair date must be before or on IFTR creation date.");
  }

  if (deliveryDate && firstComplaintDate && new Date(firstComplaintDate) < new Date(deliveryDate)) {
    addFeedback(errors, "Section: Vehicle Information → First complaint date cannot be before delivery date.");
  }

  if (firstComplaintDate && repairDate && new Date(firstComplaintDate) > new Date(repairDate)) {
    addFeedback(errors, "Section: Vehicle Information → First complaint date cannot be after repair date.");
  }

  const mileage = Number(getValue("mileage"));
  if (!isNaN(mileage)) {
    if (mileage <= 0) addFeedback(errors, "Section: Vehicle Information → Mileage must be greater than 0 km.");
    else if (mileage > 150000) addFeedback(errors, "Section: Vehicle Information → Mileage cannot be above 150,000 km.");
  }

  const rpm = Number(getValue("rpmCondition"));
  if (!isNaN(rpm)) {
    if (rpm < 0) addFeedback(errors, "Section: Detailed Condition → RPM cannot be negative.");
    else if (rpm > 7000) addFeedback(errors, "Section: Detailed Condition → RPM value is unrealistically high.");
  }

  const modelYear = Number(getValue("modelYear"));
  if (!isNaN(modelYear) && modelYear > CURRENT_YEAR) {
    addFeedback(errors, "Section: Vehicle Information → Model year cannot be greater than " + CURRENT_YEAR + ".");
  }
}

function validateUniqueVehicleFields(errors) {
  const fields = [
    { id: "model", label: "Model" },
    { id: "modelCode", label: "Model Code" },
    { id: "engineType", label: "Engine Type" },
    { id: "engineNo", label: "Engine Number" },
    { id: "transmissionType", label: "Transmission Type" }
  ];

  for (let i = 0; i < fields.length; i++) {
    for (let j = i + 1; j < fields.length; j++) {
      const first = normalize(getValue(fields[i].id));
      const second = normalize(getValue(fields[j].id));

      if (first && second && first === second) {
        addFeedback(errors, "Section: Vehicle Information → " + fields[i].label + " and " + fields[j].label + " cannot contain identical values.");
      }
    }
  }
}

function validateConditionalRules(errors) {
  syncRadioResult("repro", "reproductionResult");
  syncRadioResult("towing", "towingCondition");

  const towing = getValue("towingCondition");

  if (!towing) {
    addFeedback(errors, "Section: Usage Condition → Towing condition must be selected.");
  }

  if (towing === "Yes" && !getValue("towingDetails")) {
    addFeedback(errors, "Section: Usage Condition → Towing is Yes, so towing load/details must be specified.");
  }

  const reproResult = getValue("reproductionResult");
  const reproduceText = getValue("reproduce");

  if (!reproResult) {
    addFeedback(errors, "Section: DLR/DIST Confirmation → Reproduction result must be selected.");
  }

  if (reproResult === "Reproducible" && !containsAny(reproduceText, ["reproduce", "duplicated", "confirmed", "step", "drive", "speed", "rpm", "condition", "result"])) {
    addFeedback(errors, "Section: How to Reproduce → Reproducible is selected, so reproduction steps and conditions must be explained.");
  }

  if (reproResult === "Non-Reproducible" && !containsAny(reproduceText, ["unable", "not duplicated", "not reproduced", "intermittent", "condition not met", "no abnormality", "customer only"])) {
    addFeedback(errors, "Section: How to Reproduce → Non-Reproducible is selected, so explain why it could not be reproduced.");
  }
}

function validateDiagnosisDepth(warnings) {
  const diagnosis = normalize(getValue("diagnosis"));
  if (!diagnosis) return;

  const sequenceTerms = ["step 1", "step 2", "1.", "2.", "3.", "first", "second", "third", "then", "after", "finally", "next"];
  let sequenceMatches = 0;

  sequenceTerms.forEach(term => {
    if (diagnosis.includes(term)) sequenceMatches++;
  });

  if (sequenceMatches < 2) {
    addFeedback(warnings, "Section: Detailed Diagnosis → Diagnosis should be written in chronological order.");
  }

  const measurementUnits = ["km/h", "kmph", "rpm", "volt", "volts", "v", "celsius", "bar", "psi", "mm", "cm", "%", "degree", "degrees"];
  const hasNumber = /\d/.test(diagnosis);
  const hasUnit = measurementUnits.some(unit => diagnosis.includes(unit));

  if (!hasNumber || !hasUnit) {
    addFeedback(warnings, "Section: Detailed Diagnosis → Better to include measurement values such as speed, RPM, temperature, voltage, pressure, or sensor readings.");
  }
}

function validateRepeatedDescriptions(warnings) {
  const fields = [
    { id: "customerComplaint", label: "Background Phenomenon" },
    { id: "usageCondition", label: "Usage Condition" },
    { id: "reproduce", label: "How to Reproduce" },
    { id: "diagnosis", label: "Detailed Diagnosis" },
    { id: "probableCause", label: "Probable Cause" },
    { id: "correction", label: "Correction" },
    { id: "repairResult", label: "Repair Result" },
    { id: "requestComment", label: "Request / Comment" }
  ];

  for (let i = 0; i < fields.length; i++) {
    for (let j = i + 1; j < fields.length; j++) {
      const first = normalize(getValue(fields[i].id));
      const second = normalize(getValue(fields[j].id));

      if (first && second && first === second && first.length > 20) {
        addFeedback(warnings, "Sections: " + fields[i].label + " and " + fields[j].label + " contain identical text. Avoid copying the same information.");
      }
    }
  }
}

document.getElementById("iftrForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const errors = [];
  const warnings = [];

  validateRequiredShortFields(errors);
  validateStrictKeywordFields(errors, warnings);
  validateMildOptionalFields(warnings);
  validateRepairAndResultFields(warnings);
  validateRequestComment(warnings);
  validateLogicalRules(errors);
  validateUniqueVehicleFields(errors);
  validateConditionalRules(errors);
  validateDiagnosisDepth(warnings);
  validateRepeatedDescriptions(warnings);

  const resultBox = document.getElementById("resultBox");
  const statusText = document.getElementById("statusText");
  const feedbackText = document.getElementById("feedbackText");

  resultBox.style.display = "block";
  resultBox.className = "result-box";

  if (errors.length > 0) {
    resultBox.classList.add("rejected");
    statusText.textContent = "IFTR Rejected - Critical Issues Found";
  } else if (warnings.length > 0) {
    resultBox.classList.add("warning");
    statusText.textContent = "IFTR Needs Improvement - Review Suggested";
  } else {
    resultBox.classList.add("approved");
    statusText.textContent = "IFTR Passed Validation";
  }

  let html = "";

  if (errors.length > 0) {
    html += "<strong>Critical Issues:</strong><ul>" + errors.map(item => "<li>" + item + "</li>").join("") + "</ul>";
  }

  if (warnings.length > 0) {
    html += "<br><strong>Warnings / Improvement Suggestions:</strong><ul>" + warnings.map(item => "<li>" + item + "</li>").join("") + "</ul>";
  }

  if (errors.length === 0 && warnings.length === 0) {
    html = "<p>No major issues found. The IFTR appears complete, logical, and meaningful for initial review.</p>";
  }

  feedbackText.innerHTML = html;
  resultBox.scrollIntoView({ behavior: "smooth" });
});

function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight) || 20;
  const minHeight = lineHeight * 2 + 12;
  const maxHeight = lineHeight * 10 + 12;
  const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
  textarea.style.height = newHeight + "px";
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
}

document.querySelectorAll("textarea").forEach(textarea => {
  autoResizeTextarea(textarea);
  textarea.addEventListener("input", () => autoResizeTextarea(textarea));
});

window.addEventListener("beforeprint", () => {
  document.querySelectorAll("textarea").forEach(textarea => {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflow = "visible";
  });
});

window.addEventListener("afterprint", () => {
  document.querySelectorAll("textarea").forEach(textarea => autoResizeTextarea(textarea));
});

async function uploadAttachment(fileInputId, outputDivId) {
  const fileInput = document.getElementById(fileInputId);
  const outputDiv = document.getElementById(outputDivId);
  const attachmentBox = document.getElementById("confirmationAttachments");

  if (!fileInput || !outputDiv || !attachmentBox) return;

  const file = fileInput.files[0];

  if (!file) {
    outputDiv.innerHTML = "Please select a file first.";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    outputDiv.innerHTML = "File size exceeds 5 MB. Please upload a smaller file.";
    return;
  }

  outputDiv.innerHTML = "Uploading...";

  const reader = new FileReader();

  reader.onload = async function () {
    const base64Data = reader.result.split(",")[1];

    const payload = {
      fileName: file.name,
      mimeType: file.type,
      fileData: base64Data
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        const linkText = `${result.name}: ${result.url}`;

        outputDiv.innerHTML = `
          Uploaded: <a href="${result.url}" target="_blank">${result.name}</a>
        `;

        attachmentBox.value += attachmentBox.value
          ? "\n" + linkText
          : linkText;

        attachmentBox.dispatchEvent(new Event("input"));
      } else {
        outputDiv.innerHTML = "Upload failed: " + result.message;
      }
    } catch (error) {
      outputDiv.innerHTML = "Upload failed. Check Apps Script deployment/access.";
      console.error(error);
    }
  };

  reader.readAsDataURL(file);
}
setupSingleSelectionCheckboxes();
