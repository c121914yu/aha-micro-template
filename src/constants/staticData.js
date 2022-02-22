export const LOGO = 'https://aha-public-1301319986.cos.ap-shanghai.myqcloud.com/system_static/LOGO/logo.png'
export const PRIZE_LEVELS = [// 获奖等级
  { label: '保研国一', value: 53, max: 4000, min: 2000 },
  { label: '保研国二', value: 52, max: 3000, min: 1500 },
  { label: '保研国三', value: 51, max: 2000, min: 1000 },
  { label: '国一', value: 43, max: 3500, min: 1750 },
  { label: '国二', value: 42, max: 2500, min: 1250 },
  { label: '国三', value: 41, max: 1500, min: 750 },
  { label: '省一', value: 33, max: 2000, min: 1000 },
  { label: '省二', value: 32, max: 1400, min: 700 },
  { label: '省三', value: 31, max: 800, min: 400 },
  { label: '市一', value: 23, max: 1200, min: 600 },
  { label: '市二', value: 22, max: 600, min: 300 },
  { label: '市三', value: 21, max: 400, min: 200 },
  { label: '校一', value: 13, max: 300, min: 150 },
  { label: '校二', value: 12, max: 200, min: 100 },
  { label: '校三', value: 11, max: 100, min: 50 },
]
export const COMP_TYPE = [ // 比赛类型
  { label: '经济类', value: 1 },
  { label: '管理类', value: 2 },
  { label: '法学类', value: 3 },
  { label: '公管类', value: 4 },
  { label: '语言类', value: 5 },
  { label: '艺术传媒类', value: 6 },
  { label: '学科类', value: 7 },
  { label: '计算机类', value: 8 },
  { label: '机械类', value: 9 },
  { label: '建筑类', value: 10 },
  { label: '化工类', value: 11 },
  { label: '科研创业类', value: 12 },
]
export const FILE_CLASSIFY = [ // 附件分类
  { label: 'PPT', value: 1, rate: 1 },
  { label: '文档', value: 2, rate: 3 },
  { label: '论文', value: 3, rate: 1 },
  { label: '成果展示', value: 4, rate: 1 },
  { label: '竞赛心得', value: 5, rate: 0.5 }
]
export const FILE_TYPES = [ // 附件类型
  { label: '图片', value: 0, reg: /\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/i }, // 图片
  { label: '视频', value: 1, reg: /\.(avi|wmv|mpg|mpeg|mov|rm|ram|swf|raw|flv|mp4|wma|avi|rmvb|mkv)$/i }, // 视频,音频
  { label: '文档/PPT', value: 2, reg: /\.(doc|docx|ppt|pptx|xls|xlsx|pdf)$/i }, // 文档
  { label: '其他', value: 3, reg: /./ }, // 其他
]
