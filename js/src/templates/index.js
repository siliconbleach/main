const INITIAL_TEMPLATE = `<div id="toastModal" class="js-is-hidden">
<div class="card">
   <div class="card-header">
   {{headerContent}}</div>
   <div class="card-content">
   {{content}}
   </div>
</div>
</div>`;

export default class Toast {
	constructor(toastTemplate = INITIAL_TEMPLATE) {
		this.template = toastTemplate;
	}
}