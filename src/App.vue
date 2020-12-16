<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef H5
			this.$AppEntryController.handleH5BrowserAddressBarAuth();
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import  "./common/css/common.css";
	@import  "./common/css/base.scss";
	@import  "./common/css/style.scss"
</style>
