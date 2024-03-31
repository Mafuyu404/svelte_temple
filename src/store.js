import { writable } from 'svelte/store';

export const page = writable('Index');
export const ctrl = writable({});
export const Explain = writable({});
export const role = writable([
  {
    avatar: "",
    prop: ["莉莉安娜·卡缪", 18, "骑士团小队长", "龙牙骑枪"],
    intro: "大商户家的大小姐，不喜欢经商，为摆脱家族命运而成为骑士努力着。",
    detail:
      "因为家族原因，交际圈都是非常优秀的人，虽然已经很强，却从未得到过认可，想着以强大的姿态登上舞台，但又总是觉得有变得更强的空间，一直延后，可能比妹妹都不擅长社交，不过没有这方面的烦恼，稍微自卑且做任何事都会拼尽全力。",
    story: "第二卷中与妹妹相认，被赠予了使用一生的武器——龙牙骑枪。",
    display: "preview",
    create: 1709916432277,
    tag: [3, 4],
  },
]);
export const prop = writable([
  "名字", "年龄", "身份", "武器"
]);
export const tag = writable([
  "反派", "次要角色", "后宫团", "狮鹫骑士团", "艾德拉城"
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