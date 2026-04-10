function initComparisonWidget(widget) {
  const dataset = widget.dataset.dataset;
  const prefix = widget.dataset.prefix;
  const maxIndex = Number(widget.dataset.maxIndex || "14");

  const gtImage = widget.querySelector("[data-role='gt']");
  const augImage = widget.querySelector("[data-role='aug']");
  const illusImage = widget.querySelector("[data-role='illus']");
  const sampleSlider = widget.querySelector("[data-role='sample-slider']");
  const sampleValue = widget.querySelector("[data-role='sample-value']");

  function buildPath(kind, idx) {
    if (kind === "gt") {
      return `../static/images/${dataset}/${prefix}_gt.png`;
    }
    return `../static/images/${dataset}/${prefix}_${kind}${idx}.png`;
  }

  function updateImages() {
    const idx = Number(sampleSlider.value);
    sampleValue.textContent = String(idx);
    gtImage.src = buildPath("gt", idx);
    augImage.src = buildPath("aug", idx);
    illusImage.src = buildPath("illus", idx);
  }

  sampleSlider.max = String(maxIndex);
  sampleSlider.addEventListener("input", updateImages);
  updateImages();
}

document.querySelectorAll(".widget[data-dataset]").forEach(initComparisonWidget);
