
export default [
  { label: '数据统计', icon: 'el-icon-s-data', path: '/dataShow', activeName: 'DataShow' },
  { label: '用户管理', icon: 'el-icon-s-custom', child: [
    { label: '用户列表', icon: 'el-icon-user', path: '/user/users', activeName: 'User' },
    { label: '用户反馈', icon: 'el-icon-chat-dot-square', path: '/user/feedbacks', activeName: 'Feedback' },
    { label: '订单管理', icon: 'el-icon-tickets', path: '/user/orders', activeName: 'Order' },
  ] },
  { label: '项目管理', icon: 'el-icon-s-management', child: [
    { label: '竞赛项目', icon: 'el-icon-folder-opened', path: '/project/compProjects', activeName: 'CompProject' },
    { label: '课设项目', icon: 'el-icon-folder-opened', path: '/project/classProjects', activeName: 'ClassProject' },
  ] },
  { label: '运营助手', icon: 'el-icon-s-platform', child: [
    { label: '轮播图', icon: 'el-icon-data-board', path: '/operation/slideCard', activeName: 'SlideCard' },
    { label: '活动管理', icon: 'el-icon-date', path: '/operation/activity', activeName: 'Activity' },
    { label: '系统公告', icon: 'el-icon-chat-dot-round', path: '/operation/notice', activeName: 'Notice' },
    { label: '系统通知', icon: 'el-icon-chat-dot-round', path: '/operation/systemInform', activeName: 'SystemInforms' },
    { label: '竞赛信息', icon: 'el-icon-trophy', path: '/operation/competition', activeName: 'Competition' },
    { label: '推文评论', icon: 'el-icon-chat-dot-square', path: '/operation/tweetComments', activeName: 'TweetComments' },
  ] },
  { label: '开发助手', icon: 'el-icon-s-cooperation', child: [
    { label: '文件上传', icon: 'el-icon-upload', path: '/exploit/filesUpload', activeName: 'FilesUpload' },
    { label: '部署平台', icon: 'el-icon-trophy', path: '/exploit/deploy', activeName: 'Deploy' },
    { label: '应用配置', icon: 'el-icon-trophy', path: '/exploit/applications', activeName: 'Applications' },
    { label: 'scheme配置', icon: 'el-icon-trophy', path: '/exploit/scheme', activeName: 'Scheme' },
  ] },
  { label: '管理员设置', icon: 'el-icon-setting', path: '/admin/admins', activeName: 'Admin' },
]
