<script>
	// import "css-doodle";

	import Msg from "./page/msg.svelte";
	import Explain from "./addon/explain.svelte";
	import Index from "./page/index.svelte";
	import Menu from "./addon/menu.svelte";

	import { page, frameEvent } from "./store";

	const render = {
		Index,
	};

	// $ctrl = {
	// 	page: (p) => {
	// 		$page = "loading";
	// 		$loading = true;
	// 		setTimeout((_) => ($page = p), 300);
	// 	},
	// };

	window.deepCopy = (obj) => {
		if (Array.isArray(obj)) {
			let arr = obj;
			var newArr = [];
			for (var i = 0; i < arr.length; i++) {
				if (Array.isArray(arr[i])) {
					var list = deepCopy(arr[i]);
					newArr.push(list);
				} else {
					newArr.push(arr[i]);
				}
			}
			return newArr;
		} else {
			let temp = obj.constructor === Array ? [] : {};
			for (let val in obj) {
				temp[val] = typeof obj[val] == "object" ? deepCopy(obj[val]) : obj[val];
			}
			return temp;
		}
	};
	window.retain = function (value, n) {
		if (n === "null" || n === "undefined" || n === 0) return parseInt(value);
		let tran = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
		let tranV = tran.toString();
		let newVal = tranV.indexOf(".");
		if (newVal < 0) {
			tranV += ".";
		}
		for (let i = tranV.length - tranV.indexOf("."); i <= n; i++) {
			tranV += "0";
		}
		return tranV;
	};

	Array.prototype.rd = function () {
		for (
			var j, x, i = this.length;
			i;
			j = parseInt(Math.random() * i),
				x = this[--i],
				this[i] = this[j],
				this[j] = x
		);
		return this;
	};
	Array.prototype.sum = function () {
		let res = 0;
		for (let i of this) res += i;
		return res;
	};
	Array.prototype.isIncludedBy = function (arr) {
		return this.filter(i => arr.includes(i)).length == this.length;
	}
	Array.prototype.merge = function (arr) {
		for (let i of arr) this.push(i);
	}
	String.prototype.getByteLen = function () {
		let len = 0;
		for (let i = 0; i < this.length; i++) {
			this.charCodeAt(i) < 256 ? (len += 1) : (len += 2);
		}
		return len;
	};
	window.r = Math.random;
	class RAF {
		constructor() {
			this.init();
		}
		init() {
			this._timerIdMap = {
				timeout: {},
				interval: {},
			};
		}
		run(type = "interval", cb, interval = 16.7) {
			const now = Date.now;
			let stime = now();
			let etime = stime;
			//创建Symbol类型作为key值，保证返回值的唯一性，用于清除定时器使用
			const timerSymbol = Symbol();
			const loop = () => {
				this.setIdMap(timerSymbol, type, loop);
				etime = now();
				if (etime - stime >= interval) {
					if (type === "interval") {
						stime = now();
						etime = stime;
					}
					cb();
					type === "timeout" && this.clearTimeout(timerSymbol);
				}
			};
			this.setIdMap(timerSymbol, type, loop);
			return timerSymbol; // 返回Symbol保证每次调用setTimeout/setInterval返回值的唯一性
		}
		setIdMap(timerSymbol, type, loop) {
			const id = requestAnimationFrame(loop);
			this._timerIdMap[type][timerSymbol] = id;
		}
		setTimeout(cb, interval) {
			// 实现setTimeout 功能
			return this.run("timeout", cb, interval);
		}
		clearTimeout(timer) {
			cancelAnimationFrame(this._timerIdMap.timeout[timer]);
		}
		setInterval(cb, interval) {
			// 实现setInterval功能
			return this.run("interval", cb, interval);
		}
		clearInterval(timer) {
			cancelAnimationFrame(this._timerIdMap.interval[timer]);
		}
	}
	window.RAF = RAF;

	frameEvent.set({
		list: {},
		add: function (k, f, t) {
			this.list[k] = {
				handle: f,
				time: t,
				left: t,
				pause: false,
			};
		},
		clear: function (k) {
			if (k) delete this.list[k];
			else this.list = {};
		},
		pause: function (k) {},
	});
	const fps = setInterval((_) => {
		let list = $frameEvent.list;
		for (let e in list) {
			if (list[e].left == 1) {
				list[e].left = list[e].time;
				list[e].handle();
			} else list[e].left--;
		}
	}, 16);
</script>

<div id="root">
	<svelte:component this={render[$page]} />
	<Msg />
	<Explain />
	<Menu />
</div>

<style>
	#root {
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		background-color: black;
	}
</style>
