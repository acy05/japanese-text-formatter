const inputText = document.querySelector("#inputText");
const outputText = document.querySelector("#outputText");
const fillSampleButton = document.querySelector("#fillSampleButton");
const resetButton = document.querySelector("#resetButton");
const formatButton = document.querySelector("#formatButton");
const copyButton = document.querySelector("#copyButton");
const statusMessage = document.querySelector("#statusMessage");

const ruleFullWidth = document.querySelector("#ruleFullWidth");
const ruleSpaces = document.querySelector("#ruleSpaces");
const ruleBlankLines = document.querySelector("#ruleBlankLines");
const ruleBullets = document.querySelector("#ruleBullets");
const ruleTrimTrailing = document.querySelector("#ruleTrimTrailing");

const sampleText = `ＡＩ　で作った　文章です。


・項目１
・項目２`;

function setStatus(message, tone = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status${tone ? ` ${tone}` : ""}`;
}

function toHalfWidthAlphaNumeric(text) {
  return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0xfee0),
  );
}

function normalizeSpaces(text) {
  return text
    .replace(/\u3000/g, " ")
    .replace(/[ \t]{2,}/g, " ");
}

function normalizeBlankLines(text) {
  return text.replace(/\n{3,}/g, "\n\n");
}

function normalizeBullets(text) {
  return text.replace(/^[ \t]*[・*•●◦▪■]\s*/gm, "- ");
}

function trimTrailingSpaces(text) {
  return text.replace(/[ \t]+$/gm, "");
}

function formatJapaneseText(text) {
  let formatted = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  if (ruleFullWidth.checked) {
    formatted = toHalfWidthAlphaNumeric(formatted);
  }
  if (ruleSpaces.checked) {
    formatted = normalizeSpaces(formatted);
  }
  if (ruleBullets.checked) {
    formatted = normalizeBullets(formatted);
  }
  if (ruleTrimTrailing.checked) {
    formatted = trimTrailingSpaces(formatted);
  }
  if (ruleBlankLines.checked) {
    formatted = normalizeBlankLines(formatted);
  }

  return formatted.trim();
}

function handleFormat() {
  const value = inputText.value;

  if (!value.trim()) {
    outputText.value = "";
    setStatus("テキストを入力してください", "error");
    return;
  }

  const formatted = formatJapaneseText(value);
  outputText.value = formatted;
  setStatus("整形しました。内容を確認して、そのままコピーできます。", "success");
}

function fallbackCopyText() {
  outputText.focus();
  outputText.select();
  outputText.setSelectionRange(0, outputText.value.length);

  const copied = document.execCommand("copy");

  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }

  outputText.blur();
  return copied;
}

async function handleCopy() {
  if (!outputText.value.trim()) {
    setStatus("先に整形結果を作ってください", "error");
    return;
  }

  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(outputText.value);
    } else if (!fallbackCopyText()) {
      throw new Error("fallback-copy-failed");
    }
    setStatus("整形後テキストをコピーしました", "success");
  } catch (error) {
    setStatus("コピーに失敗しました。もう一度お試しください", "error");
  }
}

function handleReset() {
  inputText.value = "";
  outputText.value = "";
  ruleFullWidth.checked = true;
  ruleSpaces.checked = true;
  ruleBlankLines.checked = true;
  ruleBullets.checked = true;
  ruleTrimTrailing.checked = true;
  setStatus("テキストを入力すると、ここに整形結果が表示されます");
}

fillSampleButton.addEventListener("click", () => {
  inputText.value = sampleText;
  outputText.value = "";
  setStatus("サンプルを入れました。整形して結果を確認してください");
});

resetButton.addEventListener("click", handleReset);
formatButton.addEventListener("click", handleFormat);
copyButton.addEventListener("click", handleCopy);

inputText.addEventListener("input", () => {
  if (!inputText.value.trim()) {
    outputText.value = "";
    setStatus("テキストを入力すると、ここに整形結果が表示されます");
  }
});
