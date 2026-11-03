function renderThesisPage(project, gallery, nextProject) {
 const theory=project.theory;
 const image=src=>project.media.find(item=>item.src===src);
 const figure=(item,caption,className='')=>`<figure class="thesis-figure ${className}"><a href="${item.src}" target="_blank" rel="noopener"><img src="${item.src}" width="${item.width}" height="${item.height}" alt="${caption}" loading="lazy"></a><figcaption>${caption}</figcaption></figure>`;
 const chapter=(id,number,title,media)=>`<section class="thesis-chapter" id="${id}" aria-labelledby="heading-${id}"><div class="thesis-chapter-heading"><span class="thesis-index" aria-hidden="true">${number}</span><h2 id="heading-${id}">${title}</h2></div>${gallery(media)}</section>`;
 return `
  <a class="back" href="index.html?v=28">← Projects</a>
  <div class="project-heading thesis-heading"><h1>${project.title}</h1><span>Master thesis · Urban planning · ${project.year}</span></div>
  <figure class="thesis-epigraph">
   <blockquote><p>“${theory.quote.text}”</p></blockquote>
   <figcaption>${theory.quote.author} · <cite>${theory.quote.work}</cite>, ${theory.quote.year}</figcaption>
  </figure>
  <div class="thesis-overview">
   <div><span class="thesis-label">Research question</span><p class="thesis-question">${theory.question}</p><p class="thesis-summary">${theory.summary}</p><p class="thesis-download"><a href="${caseAnalyses.thesisUrl}" target="_blank" rel="noopener noreferrer">Read the full thesis (PDF) ↗</a></p></div>
   <dl class="thesis-credits"><div><dt>Institution</dt><dd>Chalmers University of Technology</dd></div><div><dt>Period</dt><dd>January–June 2026</dd></div><div><dt>Supervisor</dt><dd>Job van Eldijk</dd></div><div><dt>Examiner</dt><dd>Lars Marcus</dd></div></dl>
  </div>
  <nav class="thesis-nav" aria-label="Thesis sections"><a href="#theory">Theory</a><a href="#analysis">Case-study analyses</a><a href="#framework">Spatial framework</a><a href="#exhibition">Exhibition</a></nav>
  <section class="thesis-chapter thesis-theory" id="theory" aria-labelledby="heading-theory">
   <div class="thesis-chapter-heading"><span class="thesis-index" aria-hidden="true">01</span><h2 id="heading-theory">Theoretical framework</h2></div>
   <div class="thesis-opening">
    <h3>Self-organisation<br> and emergence</h3>
    <div class="thesis-copy"><p>Cities evolve through the interactions of many people, each making decisions and responding to the spaces around them. Over time, repeated local interactions can accumulate into larger patterns of activity and urban form.</p><p>Self-organisation describes the processes through which order develops from these interactions. Emergence describes the larger patterns that materialise. The thesis considers urban outcomes as properties of ongoing processes, rather than fixed end states.</p></div>
   </div>
   ${figure(image('mt-network.jpg'),'Local interactions organising into larger patterns.','thesis-network')}
   <dl class="thesis-terms"><div><dt>Self-organisation</dt><dd>The continuous processes through which interactions generate order within a system.</dd></div><div><dt>Emergence</dt><dd>The larger-scale patterns that arise through those processes.</dd></div><div><dt>Co-presence</dt><dd>People sharing a spatial environment, creating opportunities for encounter and interaction.</dd></div></dl>
   <div class="thesis-pair">
    <div class="thesis-copy"><h3>Spatial configuration<br> and co-presence</h3><p>The arrangement of streets and spaces influences how people move and where their paths intersect. Accessibility and visibility help shape the opportunities for repeated encounter.</p><p>Movement and urban activity can reinforce one another. The role of spatial configuration is therefore central to the conditions that support these interactions over time.</p></div>
    ${figure(image('mt-original-1.jpg'),'Configuration, attraction and movement: the feedback relationships used in the thesis.','thesis-feedback')}
   </div>
   <div class="thesis-balance"><div class="thesis-balance-heading"><h3>Adaptation and balance</h3><p>Self-organisation does not automatically produce an adaptive city. The thesis distinguishes between insufficient interaction and excessive reinforcement of a single pattern.</p></div><div class="thesis-comparison"><div><h4>Insufficient interaction</h4><p>Local encounters remain too weak for feedback to accumulate and patterns to develop.</p></div><div><h4>Continued adaptation</h4><p>The aim is to keep opportunities for repeated encounter, variation and multiple patterns open.</p></div><div><h4>Single-pattern dominance</h4><p>Excessive reinforcement can allow one pattern to dominate, reducing the capacity to adapt.</p></div></div></div>
   <div class="thesis-design-role"><h3>The role of design</h3><div class="thesis-copy"><p>Design can shape the conditions within which urban processes unfold. A distinction is made between allowing these processes to materialise and sustaining them once space has been built.</p><div class="thesis-conditions"><div><h4>Enabling materialisation</h4><p>Plot structure, access to development, and policy and economic instruments influence whether multiple actors can contribute to incremental change.</p></div><div><h4>Sustaining processes</h4><p>Spatial conditions need to keep supporting movement, co-presence and diversity of uses after development has taken place.</p></div></div><p>The thesis focuses on spatial conditions observable in the built environment. Institutional and economic instruments are acknowledged, but are outside the analysis.</p></div></div>
   <div class="thesis-analysis-bridge"><span class="thesis-label">From theory to analysis</span><h3>Four categories guide the investigation</h3><ol class="thesis-lenses">${theory.lenses.map((lens,i)=>`<li><span class="thesis-index" aria-hidden="true">0${i+1}</span><h4>${lens.title}</h4><p>${lens.text}</p></li>`).join('')}</ol><p class="thesis-scope">The categories describe spatial conditions and materialised patterns. They do not establish direct causality between spatial configuration and emergent outcomes.</p></div>
   <details class="thesis-references"><summary>Selected references</summary><ul>${theory.references.map(reference=>`<li>${reference}</li>`).join('')}</ul></details>
  </section>
  ${renderCaseComparison(caseAnalyses)}
  ${chapter('framework','03','Spatial framework & outcomes',project.media.filter(item=>item.section==='framework'))}
  ${chapter('exhibition','04','Exhibition',project.media.filter(item=>item.section==='exhibition'))}
  <div class="next"><a href="index.html?v=28">← Projects</a><a href="project.html?v=28&id=${nextProject.id}">Next project →</a></div>`;
}
