// Related drawings share a row; source order is retained throughout.
const projectGalleryGroups={
 market:[['figure-58.jpg','figure-59.jpg','figure-60.jpg','figure-61.jpg']],
 gullbergsvass:[
  ['original-14.jpg','original-15.jpg'],
  ['original-24.jpg','original-25.jpg'],['original-26.jpg','original-27.jpg'],
  ['original-28.jpg','original-29.jpg'],['original-30.jpg','original-31.jpg'],
  ['original-32.jpg','original-33.jpg'],['original-34.jpg','original-35.jpg'],
  ['original-36.jpg','original-37.jpg'],
  ['original-38.jpg','original-39.jpg','original-40.jpg'],
  ['original-41.jpg','original-42.jpg'],
  ['original-48.jpg','original-49.jpg'],['original-50.jpg','original-51.jpg'],['original-52.jpg','original-53.jpg'],
  ['figure-51.jpg','figure-52.jpg','figure-53.jpg'],['figure-54.jpg','figure-55.jpg']
 ],
 viikki:[['figure-33.jpg','figure-34.jpg']],
 kapitulska:[['figure-28.jpg','figure-29.jpg']],
 matadorka:[['figure-19.jpg','figure-20.jpg'],['figure-21.jpg','figure-22.jpg']],
 dordrecht:[['original-1.jpg','original-2.jpg'],['original-3.jpg','original-4.jpg'],['original-5.jpg','original-6.jpg'],['original-7.jpg','original-8.jpg','original-13.jpg']],
 emergence:[['mt-original-9.jpg','mt-original-10.jpg']]
};
function renderProjectGallery(project,media,eager=false){
 const groups=projectGalleryGroups[project.id]||[];
 const rows=[];
 for(let i=0;i<media.length;){
  const group=groups.find(files=>files.every((src,j)=>media[i+j]?.src===src));
  const count=group?.length||1,items=media.slice(i,i+count);
  const ratio=Math.max(.5,Math.min(...items.map(item=>item.width/item.height)));
  const figures=items.map((item,j)=>`<figure class="project-figure"><a class="gallery-media" href="${item.src}" target="_blank" rel="noopener"><img src="${item.src}" alt="${project.title} — ${item.caption}" width="${item.width}" height="${item.height}" loading="${eager&&i+j===0?'eager':'lazy'}"></a><figcaption>${item.caption}</figcaption></figure>`).join('');
  rows.push(`<div class="gallery-row gallery-row--${count}" style="--media-ratio:${ratio.toFixed(5)}">${figures}</div>`);
  i+=count;
 }
 return `<div class="gallery project-gallery">${rows.join('')}</div>`;
}
