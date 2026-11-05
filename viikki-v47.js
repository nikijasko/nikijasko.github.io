function renderViikkiContent(project,gallery){
 const split=project.media.findIndex(item=>item.src==='figure-40.jpg');
 return `${gallery(project.media.slice(0,split),true)}
 <section class="project-section viikki-construction" id="construction" aria-labelledby="viikki-construction-heading">
  <h2 id="viikki-construction-heading">Construction</h2>
  <p>The model shows Building B’s primary timber frame, CLT slabs and timber elevator shaft. Use the element switches and cutaway to see how they fit together.</p>
  <iframe class="viikki-model" title="Interactive construction model of Viikki Building B" src="viikki-viewer-v2.html" loading="lazy"></iframe>
  <p class="viikki-model-note">Based on the original Archicad model and thesis drawings. <a href="viikki-viewer-v2.html" target="_blank" rel="noopener">Open the model in a new tab ↗</a></p>
 </section>
 ${gallery(project.media.slice(split))}`;
}
