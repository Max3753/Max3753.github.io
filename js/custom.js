// ===== 自定义 JavaScript =====

// 控制台输出欢迎信息
console.log('%c Max3753 Blog ', 'background: linear-gradient(135deg, #49B1F5, #00c4b6); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%c 用代码记录世界 ', 'color: #858585; font-size: 14px;');

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 为所有外部链接添加 target="_blank"
  document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])').forEach(function(link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});