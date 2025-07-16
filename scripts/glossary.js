const glossary = {
  // Saturated/Monounsaturated/Polyunsaturated Fats
  'Saturated Fatty Acid': 'Chemically stable fat; resistant to oxidation.',
  'SFA': 'Chemically stable fat; resistant to oxidation.',
  'Monounsaturated Fatty Acid': 'More stable than PUFA; oleic acid is primary example (e.g., olive oil)',
  'MUFA': 'More stable than PUFA; oleic acid is primary example (e.g., olive oil)',
  'Polyunsaturated Fatty Acid': 'Highly unstable fats with multiple double bonds; includes both n-6 and n-3',
  'PUFA': 'Highly unstable fats with multiple double bonds; includes both n-6 and n-3',

  // PUFA Types
  'Docosahexaenoic Acid': 'Marine omega-3; crucial for brain, eye, and mitochondrial health',
  'DHA': 'Marine omega-3; crucial for brain, eye, and mitochondrial health',
  'Eicosapentaenoic Acid': 'Marine omega-3; anti-inflammatory and cardioprotective',
  'EPA': 'Marine omega-3; anti-inflammatory and cardioprotective',
  'Alpha-Linolenic Acid': 'Plant-based omega-3; poorly converted to EPA/DHA in humans',
  'ALA': 'Plant-based omega-3; poorly converted to EPA/DHA in humans',
  'Linoleic Acid': 'Primary omega-6 PUFA in the modern diet; prone to oxidation',
  'LA': 'Primary omega-6 PUFA in the modern diet; prone to oxidation',
  'Arachidonic Acid': 'Derived from LA; precursor to inflammatory eicosanoids',
  'AA': 'Derived from LA; precursor to inflammatory eicosanoids',

  // Cholesterol Terms
  'Total Cholesterol': 'Combined LDL + HDL + VLDL; crude marker with limited diagnostic power',
  'TC': 'Combined LDL + HDL + VLDL; crude marker with limited diagnostic power',
  'High-Density Lipoprotein': 'Removes cholesterol from tissues; associated with lower CVD risk',
  'HDL': 'Removes cholesterol from tissues; associated with lower CVD risk',
  'Low-Density Lipoprotein': 'Carries cholesterol; harmless unless oxidized',
  'LDL': 'Carries cholesterol; harmless unless oxidized',
  'Very Low-Density Lipoprotein': 'Delivers triglycerides; can convert to LDL after fat delivery',
  'VLDL': 'Delivers triglycerides; can convert to LDL after fat delivery',
  'Large Buoyant LDL': 'Larger, less dense particles that are considered less atherogenic. Typically found in healthier lipid profiles',
  'lbLDL': 'Larger, less dense particles that are considered less atherogenic. Typically found in healthier lipid profiles',
  'Small Dense LDL': 'Smaller, denser particles associated with higher cardiovascular risk.',
  'sdLDL': 'Smaller, denser particles associated with higher cardiovascular risk.',
  'Oxidized Low-Density Lipoprotein': 'Damaged form of LDL; highly atherogenic and contributes to plaque formation',
  'OxLDL': 'Damaged form of LDL; highly atherogenic and contributes to plaque formation',
  'Triglycerides': 'Blood fats that rise with sugar, alcohol, or metabolic dysfunction',
  'TG': 'Blood fats that rise with sugar, alcohol, or metabolic dysfunction',

  // Apolipoproteins
  'Apolipoprotein B': 'Protein on atherogenic particles (LDL, VLDL, Lp(a))',
  'ApoB': 'Protein on atherogenic particles (LDL, VLDL, Lp(a))',
  'Apolipoprotein B-100': 'Produced by the liver. Associated with VLDL, IDL, LDL, Lp(a)',
  'ApoB-100': 'Produced by the liver. Associated with VLDL, IDL, LDL, Lp(a)',
  'Apolipoprotein B-48': 'Produced by Intestinal enterocytes. Truncated version (48% of ApoB-100). Used to assemble and secrete chylomicrons to carry dietary fat and cholesterol. Not considered atherogenic unless clearance is impaired.',
  'ApoB-48': 'Produced by Intestinal enterocytes. Truncated version (48% of ApoB-100). Used to assemble and secrete chylomicrons to carry dietary fat and cholesterol. Not considered atherogenic unless clearance is impaired.',
  'Apolipoprotein A-I': 'The main structural and functional protein of HDL ("good cholesterol"). Promotes reverse cholesterol transport (from tissues to liver). Anti-atherogenic.',
  'ApoA-I': 'The main structural and functional protein of HDL ("good cholesterol"). Promotes reverse cholesterol transport (from tissues to liver). Anti-atherogenic.',
  'Apolipoprotein A-II': 'Second most abundant HDL apoprotein. Role less clear; may modulate HDL metabolism and influence insulin sensitivity. Possibly pro- or anti-atherogenic depending on context.',
  'ApoA-II': 'Second most abundant HDL apoprotein. Role less clear; may modulate HDL metabolism and influence insulin sensitivity. Possibly pro- or anti-atherogenic depending on context.',

  // Other Lipid Terms
  'Lipoprotein(a)': 'LDL-like particle with strong atherogenic and thrombogenic potential',
  'Lp(a)': 'LDL-like particle with strong atherogenic and thrombogenic potential',

  // Oxylipin Classes
  'Aldehydes': 'Initiate DNA adduct formation, mitochondrial dysfunction, endothelial injury, and malignant transformation',
  'Epoxides': 'Modulate vascular tone and immune pathways toward carcinogenic progression',
  'Keto-fatty acids': 'Drive leukocyte infiltration and atherogenesis',
  'Hydroxy-acids': 'Signal insulin resistance, prime adipose tissue inflammation, and promote metabolic disease',
  'Dicarboxylic acids': 'Perpetuate low-grade immune activation, advancing fibrosis and autoimmunity',
};

function addGlossaryTooltips(root = document.body) {
  const terms = Object.keys(glossary);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
if (
  node.nodeValue &&
  node.nodeValue.trim() &&
  node.parentNode &&
  node.parentNode.nodeType === 1 &&
  !['SCRIPT', 'STYLE', 'TEXTAREA'].includes(node.parentNode.tagName)
) {
      nodes.push(node);
    }
  }

  nodes.forEach((node) => {
    const originalText = node.nodeValue;
    let replaced = originalText;

    terms.forEach((term) => {
      const regex = new RegExp(`\\b(${term})\\b`, 'g');
      replaced = replaced.replace(regex, `<span class="tooltip" title="${glossary[term]}">$1</span>`);
    });

    if (replaced !== originalText) {
      const span = document.createElement('span');
      span.innerHTML = replaced;
      node.parentNode.replaceChild(span, node);
    }
  });
}

// Observe content changes (for AEM Franklin's dynamic loading)
const observer = new MutationObserver(() => {
  addGlossaryTooltips(document.querySelector('main')); // only scan content
});
observer.observe(document.querySelector('main'), { childList: true, subtree: true });

// Also run once after initial load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => addGlossaryTooltips(document.querySelector('main')), 500);
});, addGlossaryTooltips);

