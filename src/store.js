import { writable } from 'svelte/store';

export const page = writable('Index');
export const ctrl = writable({});
export const Explain = writable({});
export const role = writable([
  {
    avatar: "",
    prop: ["织雪缘", 18, "红封卫小队长", "控制自己的血控制自己的血控制自己的血控制自己的血"],
    intro: "大商户织雪家的大小姐，不喜欢经商，为摆脱家族命运而努力着。",
    detail:
      "因为家族原因，交际圈都是非常优秀的人，虽然已经很强，却从未得到过认可，想着以强大的姿态登上舞台，但又总是觉得有变得更强的空间，一直延后，可能比妹妹都不擅长社交，不过没有这方面的烦恼，稍微自卑且做任何事都会拼尽全力。\n影射学习了很多技能却无法找到理想工作的人，有能力但没有能完全发挥的地方，为了学习那些技能浪费了没必要的时间。她只是想拜托家族命运，但加入红封局只是因为自己有一些战斗天赋，实际上并没有想好自己的未来，她想象中的未来是从脱离家族后开始的。",
    story: "误认为男主是危险妖怪，一刀将其秒杀。",
    display: "preview",
    create: 1709916432277,
    tag: [],
  },
]);
export const prop = writable([
  "名字", "年龄", "身份", "能力"
]);
export const tag = writable([
  "反派", "次要角色", "后宫团", "红封局", "清露镇"
]);
export const setting = writable({
  font_family: "normal",
  background: -1,
  role_amount_of_line: 2
});
export const dustbin = writable([]);
export const cache = writable({});
export const frameEvent = writable({});
export const Admin = writable({});