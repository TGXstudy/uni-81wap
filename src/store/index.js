import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const hasLogin = uni.getStorageSync("hasLogin") || false;
const token= uni.getStorageSync("token") || "";
const member = uni.getStorageSync("memeber") || {token:"",role:'',uid:''}
const address={};
const coupon={};
const store = new Vuex.Store({
	state: {
		hasLogin,
		member,
		token,
		address,coupon
	},
	getters: {
		hasLogin(state){
			return state.hasLogin;
		},
		getMember(state){
			return state.member ;
		},
		getToken(state){
			return state.token;
		},
		getAddress(state){
			return state.address;
		},
		getCoupon(state){
			return state.coupon
		}
		
		
	},
	mutations: {
		SET_MEMBER(state,data){
			state.member=data;
			uni.setStorageSync('member',data);
		},
		SET_HASLOGIN(state,data){
			state.hasLogin=data;
			uni.setStorageSync('hasLogin',data)
		},
		SET_TOKEN(state,data){
			state.token=data;
			uni.setStorageSync('token',data);
		},
		SET_ADDRESS(state,address){
			state.address=address;
		},
		SET_COUPON(state,coupon){
			state.coupon=coupon;
		}
	},
	actions: {
		/* setAuth({
			commit
		},auth) {
			commit("SET_AUTH", auth);
		}, */
		
	}
})

export default store
