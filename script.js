// 导航栏移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-text, .about-stats, .project-card, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // 简单验证
        if (!name || !email || !subject || !message) {
            alert('请填写所有必填字段');
            return;
        }
        
        // 模拟发送成功
        alert('消息发送成功！我会尽快回复你。');
        contactForm.reset();
    });
}

// 数字计数动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = element.textContent.replace(/[\d+]+/, target);
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/[\d+]+/, Math.floor(start));
        }
    }, 16);
}

// 当关于我部分进入视口时触发计数动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/[\d+]+/);
                if (match) {
                    const target = parseInt(match[0]);
                    animateCounter(stat, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// 技能标签悬停效果
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// 项目卡片悬停效果增强
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// 社交链接点击统计
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = link.querySelector('i').classList[1].replace('fa-', '');
        console.log(`点击了 ${platform} 链接`);
    });
});

// 页面加载完成动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 导航栏活跃状态更新
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// 添加活跃链接样式
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb;
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// 复制邮箱功能
const emailElement = document.querySelector('.contact-method p');
if (emailElement && emailElement.textContent.includes('@')) {
    emailElement.style.cursor = 'pointer';
    emailElement.addEventListener('click', () => {
        const email = emailElement.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // 显示复制成功提示
            const originalText = emailElement.textContent;
            emailElement.textContent = '邮箱已复制到剪贴板！';
            emailElement.style.color = '#10b981';
            
            setTimeout(() => {
                emailElement.textContent = originalText;
                emailElement.style.color = '#64748b';
            }, 2000);
        });
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K 快速搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        alert('搜索功能开发中...');
    }
    
    // ESC 关闭移动菜单
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 防抖处理滚动事件
window.addEventListener('scroll', debounce(() => {
    // 滚动相关的防抖处理
}, 100));

console.log('%c🎨 个人网站已加载完成！', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c欢迎访问我的个人网站！', 'color: #8b5cf6; font-size: 16px;');
