<template>
	<view class="container">
		<view class="width-100-percent flex-column margin-bottom-70">
			<view class="width-100-percent title-wrapper">
				<text class="fn-sz-48 fn-cl-333 fn-bold margin-right-20">{{regTitle}}</text>
				<text class="fn-sz-24 fn-cl-theme fn-bold image-sz-32 ask-icon" v-if="role == 'channeler' || role == 'supplier'"
				 @tap="goPage('richText',{role})">?</text>
			</view>
			<text v-if="role == 'soldier' || role == 'channeler' || role == 'supplier'" class="fn-sz-28 fn-cl-666">需平台审核</text>
		</view>
		<view class="flex-column width-100-percent">
			<!-- 渠道商注册 -->
			<view v-if="role == 'channeler' || role == 'supplier'" class="input-wrapper">
				<input class="input-item" type="text" v-model.trim="regInfo.company_name" placeholder="输入公司名称">
			</view>
			<view v-if="role == 'channeler' " class="input-wrapper">
				<input class="input-item" type="text" v-model.trim="regInfo.company_code" placeholder="输入统一信用代码">
			</view>
			<view class="">
				<view v-if="role == 'channeler' || role == 'supplier'" class="width-100-percent flex-column margin-bottom-20">
					<text class="fn-sz-28 fn-cl-333  line-height-80">公司营业执照</text>
					<view class="license-wrapper">
						<insert-media :isSlot="true" @getImage="getImages($event,'company_card')">
							<image class="license-wrapper-img" :src="preview.company_card"></image>
						</insert-media>
					</view>
					
					
				</view>
				<view v-if="role == 'supplier'" class="width-100-percent flex-column margin-bottom-20">
					<text class="fn-sz-28 fn-cl-333  line-height-80">法人授权委托书</text>
					<view class="license-wrapper">
						<insert-media :isSlot="true" @getImage="getImages($event,'legal_card')">
							<image class="license-wrapper-img" :src="preview.legal_card"></image>
						</insert-media>
					</view>
					
					
				</view>
			</view>

			<view v-if="role == 'supplier'" class="width-100-percent flex-column margin-bottom-20">
				<text class="fn-sz-28 fn-cl-333  line-height-80">其他资料上传</text>
				<view class="license-wrapper">
					<insert-media :isSlot="true" @getImage="getImages($event,'other_card')">
						<image class="license-wrapper-img" :src="preview.other_card"></image>
					</insert-media>
				</view>
			</view>
			<view v-if="role == 'channeler' " class="input-wrapper">
				<region-picker class="width-100-percent" @getRegion="getRegion">
					<view class="width-100-percent">
						<text class="fn-sz-28">{{preview.area}}</text>
						<!-- <input class="input-item" type="text" placeholder="选择所在区域"> -->
					</view>
				</region-picker>
				<image class="image-sz-32" :src="require('../../static/images/register/icon-narraw.png')"></image>
			</view>
			<!-- 渠道商注册 -->

			<view class="input-wrapper">
				<input class="input-item" type="number" v-model.trim="regInfo.mobile" maxlength="11" placeholder="输入手机号">
			</view>
			<view class="input-wrapper">
				<input class="input-item" type="number" v-model.trim="regInfo.code" maxlength="6" placeholder="输入验证码">
				<valid-code :phone="regInfo.mobile" :type="'register'"></valid-code>
			</view>
			<!-- 军人证注册有 -->
			<view v-if="role == 'soldier'" class="width-100-percent flex-column margin-bottom-20">
				<text class="fn-sz-28 fn-cl-333  line-height-80">军人证件照</text>
				<view class="solider-paper">
					<insert-media :isSlot="true" @getImage="getImages($event,'armyman_card')">
						<image class="solider-paper-img" :src="preview.armyman_card"></image>
					</insert-media>
				</view>
			</view>
			<view v-if="role == 'soldier'" class="width-100-percent flex-column margin-bottom-20">
				<text class="fn-sz-28 fn-cl-333  line-height-80">身份证件照</text>
				<view class="idcard-wrapper">
					<insert-media :isSlot="true" @getImage="getImages($event,'id_card_1')">
						<image class="idcard-wrapper-img" :src="preview.id_card_1"></image>
					</insert-media>
					<insert-media :isSlot="true" @getImage="getImages($event,'id_card_2')">
						<image class="idcard-wrapper-img" :src="preview.id_card_2"></image>
					</insert-media>
				</view>
			</view>
			<!-- 军人证注册有 -->

			<view class="input-wrapper">
				<input class="input-item" type="text" password v-model.trim="regInfo.password" maxlength="18" placeholder="输入密码，6-18位">
			</view>
			<view class="input-wrapper">
				<input class="input-item" type="text" password v-model.trim="regInfo.confirm_pass" maxlength="18" placeholder="再次输入密码，6-18位">
			</view>

		</view>

		<view class="btn-wrapper margin-bottom-70">
			<solid-btn :txt="'注册'" @click="confirmReg"></solid-btn>
		</view>
	</view>
</template>

<script>
	import validCode from "@/components/register/ValidCode.vue";
	import solidBtn from "@/components/common/SolidBtn.vue";
	import regionPicker from "@/components/common/regionPicker/RegionPicker.vue"
	import insertMedia from "@/components/froum/InsertMedia.vue"
	export default {
		components: {
			validCode,
			solidBtn,
			regionPicker,
			insertMedia
		},
		data() {
			return {
				role: 'user', //注册角色
				regTitle: '用户注册',
				regInfo: {
					id:0,
					mobile: '',
					role_type: '', //	2普通用户，3军人，4渠道商，5供应商
					password: '', //
					confirm_pass: '', //
					code: '',
					armyman_card: '', //军人证件照
					id_card_1: '', //身份证正面
					id_card_2: '', //身份证反面
					company_name:"", //公司名称 渠道商 供应商
					company_code:"", //公司统一信用代码 渠道商
					company_card:"", //营业执照 渠道商  供应商
					legal_card:"", //法人授权书  供应商
					other_card:"", //其他资料（非必传） 供应商
					province:"", //省 渠道商
					city:"", //市 渠道商
					county:"", //区 渠道商
					province_code:"", //省code 渠道商
					city_code:"", //市code 渠道商
					county_code:"", //区code 渠道商
				},
				preview: {
					armyman_card: this.imgPrefix('/static/images/register/add-soldier.png'), //军人证件照
					id_card_1: this.imgPrefix('/static/images/register/add-emblem.png'), //身份证正面
					id_card_2: this.imgPrefix('/static/images/register/add-portrait.png'), //身份证反面
					company_card:this.imgPrefix('/static/images/register/add-license.png'), ////营业执照 渠道商
					legal_card:this.imgPrefix('/static/images/register/add-license.png'), //法人授权书  供应商
					other_card:this.imgPrefix("/static/images/register/add-license.png"), //其他资料（非必传） 供应商 
					area:'选择所在区域'
				},
				 
			}
		},
		watch: {
			preview: {
				immediate: true,
				deep: true,
				handler: function(val) {
					console.log("---------",val);
					return val;
				}
			}
		},
		onLoad(options) {
			this.role = options.role || 'user'; //注册角色
			this.regInfo.role_type = this.roleToCode(this.role);
			this.regInfo.id=options.id || '';  //有id 表示 注册审核未通过
			console.log("根据注册角色", this.regInfo.role_type);
			//根据注册角色 设置 标题
			this.setRegTitle();
			
		},
		//点击顶部导航菜单按钮
		onNavigationBarButtonTap(e) {
			console.log("点击顶部导航菜单按钮", e.text);
			if (e.index == 0) { //点击已有账号，去登录
				this.goPage('login', {
					role: this.role
				})
			}
		},
		methods: {
			
			//上传 图片
			getImages(e, type) {
				console.log("上传 图片", e, type);
				this.$nextTick(() => {
					this.preview[type] = e[0].preview_url;
					this.regInfo[type] = e[0].url
				})

			},
			// 选择所在区域
			getRegion(e){
				console.log("选择所在区域",e);
				this.preview.area=e.province.text+e.city.text+e.county.text;
				this.regInfo.province=e.province.text;
				this.regInfo.city=e.city.text;
				this.regInfo.county=e.county.text;
				this.regInfo.province_code=e.province.adcode;
				this.regInfo.city_code=e.city.adcode;
				this.regInfo.county_code=e.county.adcode;
			},

			//根据注册角色 设置 标题
			setRegTitle() {
				var titles = {
					user: "用户注册",
					soldier: '军人注册',
					channeler: '渠道商注册',
					supplier: '供应商注册'
				}
				this.regTitle = titles[this.role];
			},
			//点击 注册
			confirmReg() {
				console.log('点击 注册', this.regInfo);
				let info = this.regInfo;

				//验证数据
				// 手机号
				if (!info.mobile) {
					this.$mUtils.toast('请输入手机号');
					return;
				} else if (!this.$regs.isPhone.test(info.mobile)) {
					this.$mUtils.toast('请输入正确的手机号');
					return;
				}
				//验证码
				if (!info.code) {
					this.$mUtils.toast('请输入验证码');
					return;
				}
				//密码
				if (!info.password) {
					this.$mUtils.toast('请输入密码');
					return;
				} else if (info.password.length < 6) {
					this.$mUtils.toast('密码长度必须大于等于6位');
					return;
				}
				//确认密码
				if (!info.confirm_pass) {
					this.$mUtils.toast('请输入确认密码');
					return;
				} else if (info.confirm_pass != info.password) {
					this.$mUtils.toast('两次输入的密码不一致');
					return;
				}

				//军人 专有数据 验证 start
				if(this.role == 'soldier'){
					if(!info.armyman_card){
						this.$mUtils.toast('请上传军人证件照');
						return;
					}
					
					if(!info.id_card_1){
						this.$mUtils.toast('请上传身份证国徽面');
						return;
					}
					if(!info.id_card_2){
						this.$mUtils.toast('请上传身份证人像面');
						return;
					}
				}
				//军人 专有数据 验证 end
				
				//渠道商 专有数据 验证 start
				if(this.role == 'channeler'){
					if(!info.company_name){
						this.$mUtils.toast('请输入公司名称');
						return;
					}
					
					if(!info.company_code){
						this.$mUtils.toast('请输入公司统一信用代码');
						return;
					}
					if(!info.company_card){
						this.$mUtils.toast('请上传营业执照');
						return;
					}
					if(!info.province_code || !info.city_code || !info.county_code ){
						this.$mUtils.toast('请选择所在区域');
						return;
					}
					
					
				}
				//渠道商 专有数据 验证 end
				
				//供应商 专有数据 验证 start
				if(this.role == 'supplier'){
					if(!info.company_name){
						this.$mUtils.toast('请输入公司名称');
						return;
					}
					
					if(!info.company_card){
						this.$mUtils.toast('请上传营业执照');
						return;
					}
					if(!info.legal_card){
						this.$mUtils.toast('请上传法人授权书');
						return;
					}
					
				}
				//供应商 专有数据 验证 end
				
				
				if(this.regInfo.id){
					//用户修改注册 
					this.updateRegister()
				}else{
					//注册
					this.doRegister();
				}
				

			},
			//注册
			doRegister() {
				this.$api.register({
					...this.regInfo
				}).then(res => {
					console.log("注册结果", res);
					if (res.code == 200 || res.code ==201) {

						this.$mUtils.toast(res.msg, true).then(() => {
							//跳转登录页
							this.$mRouter.redirectTo({
								route: this.$mRoutesConfig.login,
								query: {
									role: this.role
								}
							})
						})


					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//用户修改注册 
			updateRegister(){
				this.$api.updateRegister({
					...this.regInfo
				}).then(res => {
					console.log("注册结果", res);
					if (res.code == 200 || res.code == 201) {

						this.$mUtils.toast(res.msg, true).then(() => {
							//跳转登录页
							this.$mRouter.redirectTo({
								route: this.$mRoutesConfig.login,
								query: {
									role: this.role
								}
							})
						})


					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			}
		
		
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 40upx;

		.title-wrapper {
			padding-top: 40upx;

			align-items: baseline;

			.ask-icon {
				display: inline-block;
				border: 4upx solid var(--theme-color);
				border-radius: 50%;
				text-align: center;
				line-height: 25upx;
			}
		}

		.btn-wrapper {
			margin-top: 120upx;
		}

		.solider-paper {

			&-img {
				width: 675upx;
				height: 280upx;
			}
		}

		.idcard-wrapper {
			justify-content: space-between;

			&-img {
				width: 330upx;
				height: 240upx;
			}
		}

		.license-wrapper {
			&-img {
				width: 280upx;
				height: 360upx;
			}
		}
	}
</style>
