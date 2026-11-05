function renderViikkiContent(project,gallery){
 const split=project.media.findIndex(item=>item.src==='figure-40.jpg');
 return `${gallery(project.media.slice(0,split),true)}
 <section class="project-section viikki-construction" id="construction" aria-labelledby="viikki-construction-heading">
  <h2 id="viikki-construction-heading">Construction</h2>
  <p>The model shows how the repeating bays of Building B fit together, from the floor and roof slabs to the columns, beams and outer frame. Use the element switches and cutaway to look inside the frame and around the central core.</p>
  <iframe class="viikki-model" title="Interactive construction model of Viikki Building B" src="viikki-viewer-v1.html" loading="lazy"></iframe>
  <p class="viikki-model-note">Based on the original Archicad model and thesis drawings. <a href="viikki-viewer-v1.html" target="_blank" rel="noopener">Open the model in a new tab ↗</a></p>
 </section>
 ${gallery(project.media.slice(split))}`;
}
