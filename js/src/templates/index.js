const INITIAL_TEMPLATE = `<div id="toastModal" class="js-is-hidden">
<div class="card">
   <div class="card-header"></div>

   <div class="card-content">
	<strong class={{statusClass}}> {{message}}</strong>
   </div>
</div>
</div>`;

export default class Toast {
	constructor(toastTemplate = INITIAL_TEMPLATE) {

	}
}