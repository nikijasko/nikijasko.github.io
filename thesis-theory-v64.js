function renderThesisPage(project, gallery, nextProject) {
 const theory=project.theory;
 const processSteps=[{"id":"theory","title":"Theory","description":"Start with self-organisation, emergence and spatial configuration."},{"id":"analysis","title":"Case-study analyses","description":"Compare three neighbourhoods to identify spatial conditions."},{"id":"framework","title":"Spatial framework & masterplan","description":"Apply the findings in Gothenburg through streets, plots and shared development rules."},{"id":"outcomes","title":"Speculative outcomes","description":"Explore alternative development paths within those rules."},{"id":"exhibition","title":"Exhibition","description":"Explore collective decisions through a participatory model."}];
 const image=src=>project.media.find(item=>item.src===src);
 const figure=(item,caption,className='')=>`<figure class="thesis-figure ${className}"><a href="${item.src}" target="_blank" rel="noopener"><img src="${item.src}" width="${item.width}" height="${item.height}" alt="${caption}" loading="lazy"></a><figcaption>${caption}</figcaption></figure>`;
 const chapter=(id,title,media)=>`<section class="thesis-chapter" id="${id}" aria-labelledby="heading-${id}"><h2 id="heading-${id}">${title}</h2>${gallery(media)}</section>`;
 return `
  <a class="back" href="index.html?v=46">← Projects</a>
  <div class="project-heading thesis-heading"><h1>${project.title}</h1><span>Master thesis · Urban planning · ${project.year}</span></div>
  <figure class="thesis-epigraph"><blockquote><p>“${theory.quote.text}”</p></blockquote><figcaption>${theory.quote.author} · <cite>${theory.quote.work}</cite>, ${theory.quote.year}</figcaption></figure>
  <div class="thesis-overview"><p class="thesis-question">${theory.question}</p><p>${theory.summary}</p><p class="thesis-credits-line">Chalmers University of Technology · January–June 2026<br>Supervisor: Job van Eldijk · Examiner: Lars Marcus</p><p class="thesis-download"><a href="${caseAnalyses.thesisUrl}" target="_blank" rel="noopener noreferrer">Read the full thesis (PDF) ↗</a></p></div>
  <div class="thesis-process" aria-labelledby="thesis-process-heading">
   <h2 id="thesis-process-heading">Thesis process</h2>
   <nav class="thesis-nav" aria-label="Thesis process">${processSteps.map((step,i)=>`<a href="#${step.id}" class="thesis-process-step" aria-labelledby="process-title-${step.id}" aria-describedby="process-copy-${step.id}"><span class="thesis-step-heading"><span class="thesis-step-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="thesis-step-title" id="process-title-${step.id}">${step.title}</span></span><span class="thesis-step-copy" id="process-copy-${step.id}">${step.description}</span></a>`).join('')}</nav>
  </div>
  <section class="thesis-chapter thesis-theory" id="theory" aria-labelledby="heading-theory">
   <h2 id="heading-theory">Theoretical framework</h2>
   <div class="thesis-theory-composition">
    <div class="thesis-theory-reading">
     <div class="thesis-theory-copy thesis-theory-opening">
      <p>Cities evolve through the interactions of many people, each making decisions and responding to the spaces around them. Over time, repeated local interactions can accumulate into larger patterns of activity and urban form.</p>
      <p>Self-organisation describes the processes through which order develops from these interactions. Emergence describes the larger patterns that materialise. The thesis considers urban outcomes as properties of ongoing processes, rather than fixed end states.</p>
     </div>
     <div class="thesis-theory-copy thesis-theory-spatial">
      <h3>Spatial configuration</h3>
      <p>The arrangement of streets and spaces influences how people move and where their paths intersect. Accessibility and visibility help shape the opportunities for repeated encounter.</p>
      <p>Movement and urban activity can reinforce one another. Spatial configuration is therefore central to the conditions that support these interactions over time.</p>
     </div>
     <div class="thesis-theory-copy thesis-theory-adaptation">
      <h3>Adaptation and balance</h3>
      <p>Self-organisation does not automatically produce an adaptive city. If interactions remain too weak, feedback cannot accumulate and patterns may fail to develop. If reinforcement becomes too strong, a single pattern can dominate and reduce the capacity to adapt. The aim is to keep opportunities for repeated encounter, variation and multiple patterns open.</p>
     </div>
     <div class="thesis-theory-copy thesis-theory-design">
      <h3>The role of design</h3>
      <p>Design can shape the conditions within which urban processes unfold. Plot structure, access to development, and policy and economic instruments influence whether multiple actors can contribute to incremental change. Once space is built, spatial conditions need to continue supporting movement, co-presence and diversity of uses.</p>
      <p>The thesis focuses on spatial conditions observable in the built environment. Institutional and economic instruments are acknowledged, but are outside the analysis.</p>
     </div>
    </div>
    <div class="thesis-theory-visuals">
     <figure class="thesis-figure thesis-theory-diagram thesis-interaction-diagram">
      <a href="from-interactions-to-patterns-v51.gif" target="_blank" rel="noopener" title="Open From interactions to patterns in a new tab">
       <img data-thesis-animation data-animation="from-interactions-to-patterns-v51.gif" data-still="from-interactions-to-patterns-still-v51.webp" src="from-interactions-to-patterns-still-v51.webp" width="1200" height="1200" alt="Thirty-three dots move from scattered encounters into four clusters that continue to exchange movement." loading="lazy">
      </a>
     </figure>
     ${figure(image('mt-original-1.jpg'),'Feedback between configuration, attraction and movement.','thesis-feedback thesis-theory-diagram')}
    </div>
   </div>
  </section>
  ${renderCaseComparison(caseAnalyses)}
  <section class="thesis-chapter" id="framework" aria-labelledby="heading-framework"><h2 id="heading-framework">Spatial framework &amp; masterplan</h2>${renderNetworkStudy()}${renderInteractiveMasterplan(masterplanData)}</section>
  <section class="thesis-chapter" id="outcomes" aria-labelledby="heading-outcomes">
   <h2 id="heading-outcomes">Speculative outcomes</h2>
   <div class="thesis-copy thesis-outcomes-copy"><p>The two plans explore possible development trajectories within the same detaljplan. Both use the same street network, plot structure and planning rules. Architectural expression, the sequence of development and the distribution of uses can vary as different actors make decisions over time.</p><p>Small plots allow development to happen in increments. The framework gives these individual decisions a shared structure, while leaving room for different building footprints and relationships to the street. Together, the plans show how the area could evolve through successive rounds of development and change.</p></div>
   <div class="thesis-pair-scroll" tabindex="0" role="region" aria-label="Two speculative outcomes side by side"><div class="thesis-pair thesis-outcomes-pair">
    <figure><a href="mt-original-13.jpg" target="_blank" rel="noopener"><img src="mt-original-13.jpg" width="1432" height="2025" alt="Speculative outcome 1: new development within the shared street and plot framework" loading="lazy"></a><figcaption><strong>Outcome 1</strong>A possible arrangement of new buildings, with repeated plots forming continuous street edges and larger blocks.</figcaption></figure>
    <figure><a href="mt-original-14.jpg" target="_blank" rel="noopener"><img src="mt-original-14.jpg" width="1432" height="2025" alt="Speculative outcome 2: an alternative arrangement of building footprints within the same framework" loading="lazy"></a><figcaption><strong>Outcome 2</strong>An alternative arrangement with more variation in building depths and frontages, within the same network and planning rules.</figcaption></figure>
   </div></div><p class="thesis-pair-hint">Scroll sideways to compare the plans.</p>
  </section>
  <section class="thesis-chapter" id="exhibition" aria-labelledby="heading-exhibition">
   <h2 id="heading-exhibition">Exhibition & physical model</h2>
   <div class="thesis-exhibition-composition"><div class="thesis-copy"><p>The exhibition invited visitors to test the proposal by adding wooden blocks to a shared physical model. A simplified set of rules, derived from the masterplan, guided the placements within the available plots.</p><p>Unpainted buildings show the existing context; coloured pieces mark new additions. The sequence records how individual placements accumulate into a collective layout within the shared street and plot structure.</p></div>
   <div class="thesis-exhibition-scroll" role="region" aria-label="Exhibition photograph and physical model progress"><div class="thesis-exhibition-layout">
    <a class="exhibition-photo" href="exhibition-photo-v31.webp" target="_blank" rel="noopener"><img src="exhibition-photo-v31.webp" width="999" height="756" alt="Exhibition installation with thesis panels, a physical model and wooden pieces for visitors" loading="lazy"></a>
    <a class="exhibition-sequence" href="model-progress-v31.gif" target="_blank" rel="noopener"><img data-thesis-animation data-animation="model-progress-v53.webp" data-still="model-progress-still-v31.webp" src="model-progress-still-v31.webp" width="800" height="534" alt="Eleven stages of the physical model, showing coloured building pieces accumulating across the plots" loading="lazy"></a>
   </div></div>
   </div>
  </section>
  <div class="next"><a href="index.html?v=46">← Projects</a><a href="project.html?v=46&id=${nextProject.id}">Next project →</a></div>`;
}
