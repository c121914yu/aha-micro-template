export const prodPaths = { // 生产环境路径
  DataShow: '/ahaManagement/dataShow/#/', // 数据面板
  Users: '/ahaManagement/user/#/users', // 用户列表
  Feedbacks: '/ahaManagement/user/#/feedbacks', // 用户反馈
  Orders: '/ahaManagement/user/#/orders', // 订单列表
  CompProjects: '/ahaManagement/project/#/compProjects', // 比赛项目
  ClassProjects: '/ahaManagement/project/#/classProjects', // 课设项目
  SlideCard: '/ahaManagement/operation/#/slideCard', // 轮播图
  Activity: '/ahaManagement/operation/#/activity', // 活动管理
  Notice: '/ahaManagement/operation/#/notice', // 系统公告
  SystemInform: '/ahaManagement/operation/#/systemInform', // 系统通知
  Competition: '/ahaManagement/operation/#/competition', // 竞赛信息
  FilesUpload: '/ahaManagement/exploit/#/filesUpload', // 静态资源上传
  Deploy: '/ahaManagement/exploit/#/deploy', // 部署平台
  Applications: '/ahaManagement/exploit/#/applications', // 应用配置
  Scheme: '/ahaManagement/exploit/#/scheme', // scheme配置
  Admins: '/ahaManagement/admin/#/admins', // 管理员设置
}

export const devPaths = { // 开发环境路径，如果填写了会替代生产环境路径
  DataShow: 'http://localhost:4001/#/', // 数据面板
  Users: 'http://localhost:4002/#/users', // 用户列表
  Feedbacks: 'http://localhost:4002/#/feedbacks', // 用户反馈
  Orders: 'http://localhost:4002/#/orders', // 订单列表
  CompProjects: 'http://localhost:4003/#/compProjects', // 比赛项目
  ClassProjects: 'http://localhost:4003/#/classProjects', // 课设项目
  SlideCard: 'http://localhost:4004/#/slideCard', // 轮播图
  Activity: 'http://localhost:4004/#/activity', // 活动管理
  Notice: 'http://localhost:4004/#/notice', // 系统公告
  SystemInform: 'http://localhost:4004/#/systemInform', // 系统通知
  Competition: 'http://localhost:4004/#/competition', // 竞赛信息
  FilesUpload: 'http://localhost:4005/#/filesUpload', // 静态资源上传
  Deploy: 'http://localhost:4005/#/deploy', // 部署平台
  Applications: 'http://localhost:4005/#/applications', // 应用配置
  Scheme: 'http://localhost:4005/#/scheme', // scheme配置
  Admins: 'http://localhost:4006/#/admins', // 管理员设置
}

export const leftNavs = [
  { label: '数据统计', icon: 'el-icon-s-data', name: 'DataShow', activeName: 'DataShow' },
  { label: '用户管理', icon: 'el-icon-s-custom', child: [
    { label: '用户列表', icon: 'el-icon-user', name: 'Users', activeName: 'User' },
    { label: '用户反馈', icon: 'el-icon-chat-dot-square', name: 'Feedbacks', activeName: 'Feedback' },
    { label: '订单管理', icon: 'el-icon-tickets', name: 'Orders', activeName: 'Order' },
  ] },
  { label: '项目管理', icon: 'el-icon-s-management', child: [
    { label: '竞赛项目', icon: 'el-icon-folder-opened', name: 'CompProjects', activeName: 'CompProject' },
    { label: '课设项目', icon: 'el-icon-folder-opened', name: 'ClassProjects', activeName: 'ClassProject' },
  ] },
  { label: '运营助手', icon: 'el-icon-s-platform', child: [
    { label: '轮播图', icon: 'el-icon-data-board', name: 'SlideCard', activeName: 'SlideCard' },
    { label: '活动管理', icon: 'el-icon-date', name: 'Activity', activeName: 'Activity' },
    { label: '系统公告', icon: 'el-icon-chat-dot-round', name: 'Notice', activeName: 'Notice' },
    { label: '系统通知', icon: 'el-icon-chat-dot-round', name: 'SystemInform', activeName: 'SystemInforms' },
    { label: '竞赛信息', icon: 'el-icon-trophy', name: 'Competition', activeName: 'Competition' },
  ] },
  { label: '开发助手', icon: 'el-icon-s-cooperation', child: [
    { label: '静态文件', icon: 'el-icon-trophy', name: 'FilesUpload', activeName: 'FilesUpload' },
    { label: '部署平台', icon: 'el-icon-trophy', name: 'Deploy', activeName: 'Deploy' },
    { label: '应用配置', icon: 'el-icon-trophy', name: 'Applications', activeName: 'Applications' },
    { label: 'scheme配置', icon: 'el-icon-trophy', name: 'Scheme', activeName: 'Scheme' },
  ] },
  { label: '管理员设置', icon: 'el-icon-setting', name: 'Admins', activeName: 'Admin' },
]
