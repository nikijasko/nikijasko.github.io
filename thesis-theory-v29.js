function renderThesisPage(project, gallery, nextProject) {
 const theory=project.theory;
 const image=src=>project.media.find(item=>item.src===src);
 const figure=(item,caption,className='')=>`<figure class="thesis-figure ${className}"><a href="${item.src}" target="_blank" rel="noopener"><img src="${item.src}" width="${item.width}" height="${item.height}" alt="${caption}" loading="lazy"></a><figcaption>${caption}</figcaption></figure>`;
 const chapter=(id,title,media)=>`<section class="thesis-chapter" id="${id}" aria-labelledby="heading-${id}"><h2 id="heading-${id}">${title}</h2>${gallery(media)}</section>`;
 return `
  <a class="back" href="index.html?v=29">← Projects</a>
  <div class="project-heading thesis-heading"><h1>${project.title}</h1><span>Master thesis · Urban planning · ${project.year}</span></div>
  <figure class="thesis-epigraph"><blockquote><p>“${theory.quote.text}”</p></blockquote><figcaption>${theory.quote.author} · <cite>${theory.quote.work}</cite>, ${theory.quote.year}</figcaption></figure>
  <div class="thesis-overview"><p class="thesis-question">${theory.question}</p><p>${theory.summary}</p><p class="thesis-credits-line">Chalmers University of Technology · January–June 2026<br>Supervisor: Job van Eldijk · Examiner: Lars Marcus</p><p class="thesis-download"><a href="${caseAnalyses.thesisUrl}" target="_blank" rel="noopener noreferrer">Read the full thesis (PDF) ↗</a></p></div>
  <nav class="thesis-nav" aria-label="Thesis sections"><a href="#theory">Theory</a><a href="#analysis">Case-study analyses</a><a href="#framework">Spatial framework</a><a href="#exhibition">Exhibition</a></nav>
  <section class="thesis-chapter thesis-theory" id="theory" aria-labelledby="heading-theory">
   <h2 id="heading-theory">Theoretical framework</h2>
   <p>Cities evolve through the interactions of many people, each making decisions and responding to the spaces around them. Over time, repeated local interactions can accumulate into larger patterns of activity and urban form.</p>
   <p>Self-organisation describes the processes through which order develops from these interactions. Emergence describes the larger patterns that materialise. The thesis considers urban outcomes as properties of ongoing processes, rather than fixed end states.</p>
   ${figure(image('mt-network.jpg'),'Local interactions organising into larger patterns.')}
   <h3>Spatial configuration</h3>
   <p>The arrangement of streets and spaces influences how people move and where their paths intersect. Accessibility and visibility help shape the opportunities for repeated encounter.</p>
   <p>Movement and urban activity can reinforce one another. Spatial configuration is therefore central to the conditions that support these interactions over time.</p>
   ${figure(image('mt-original-1.jpg'),'Feedback between configuration, attraction and movement.','thesis-feedback')}
   <h3>Adaptation and balance</h3>
   <p>Self-organisation does not automatically produce an adaptive city. If interactions remain too weak, feedback cannot accumulate and patterns may fail to develop. If reinforcement becomes too strong, a single pattern can dominate and reduce the capacity to adapt. The aim is to keep opportunities for repeated encounter, variation and multiple patterns open.</p>
   <h3>The role of design</h3>
   <p>Design can shape the conditions within which urban processes unfold. Plot structure, access to development, and policy and economic instruments influence whether multiple actors can contribute to incremental change. Once space is built, spatial conditions need to continue supporting movement, co-presence and diversity of uses.</p>
   <p>The thesis focuses on spatial conditions observable in the built environment. Institutional and economic instruments are acknowledged, but are outside the analysis.</p>
   <p>The case-study analyses below examine interaction potential, reinforcement, functional differentiation and balance. The indicators describe spatial conditions and materialised patterns; they do not establish direct causality between spatial configuration and emergent outcomes.</p>
  </section>
  ${renderCaseComparison(caseAnalyses)}
  ${chapter('framework','Spatial framework & outcomes',project.media.filter(item=>item.section==='framework'))}
  ${chapter('exhibition','Exhibition',project.media.filter(item=>item.section==='exhibition'))}
  <div class="next"><a href="index.html?v=29">← Projects</a><a href="project.html?v=29&id=${nextProject.id}">Next project →</a></div>`;
}
