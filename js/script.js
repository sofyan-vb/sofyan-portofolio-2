document.addEventListener("DOMContentLoaded", () => {


    var typed_splash = new Typed('#typed-splash', {
        strings: ['ofyan .....'],
        typeSpeed: 100,
        showCursor: true,
        cursorChar: '|',
        loop: false,
        onComplete: (self) => {
            const splashScreen = document.querySelector('.splash-screen');
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';
            setTimeout(() => {
                splashScreen.remove();
            }, 1000); 
        }
    });

    
   
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section');
    window.onscroll = () => {
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');
            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
        const scrollTop = document.querySelector('.scroll-top');
        if (scrollTop) {
            scrollTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        }
    };
    

const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressCircles = document.querySelectorAll('.circle');

    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
          
            if (entry.isIntersecting) {
                
              
                progressBars.forEach(bar => {
                 
                    const targetWidth = bar.dataset.width;
                    bar.style.setProperty('--w', targetWidth);
                });

              
                progressCircles.forEach(circle => {
                   
                    const targetPercent = circle.dataset.percent;
                
                    circle.style.setProperty('--p', targetPercent);
                  
                    circle.style.animation = 'progress 2s forwards';
                });
                
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(animateSkills, {
            threshold: 0.5
        });
        skillsObserver.observe(skillsSection);
    }

    
    const filterButtons = document.querySelectorAll('.portfolio-filter .btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            portfolioItems.forEach(item => item.classList.add('hide'));
            setTimeout(() => {
                portfolioItems.forEach(item => {
                    const shouldShow = filter === 'all' || item.getAttribute('data-category') === filter;
                    if (shouldShow) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.remove('hide'), 10);
                    } else {
                        item.style.display = 'none';
                    }
                });
            }, 400);
        });
    });

  
    const allSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    allSections.forEach(section => sectionObserver.observe(section));

    class TextScramble {
        constructor(el) { this.el = el; this.chars = '!<>-_\\/[]{}—=+*^?#________'; this.update = this.update.bind(this); }
        setText(newText) {
            const oldText = this.el.innerText; const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve); this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || ''; const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40); const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest); this.frame = 0; this.update(); return promise;
        }
        update() {
            let output = ''; let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) { complete++; output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) { char = this.randomChar(); this.queue[i].char = char; }
                    output += `<span class="dud">${char}</span>`;
                } else { output += from; }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) { this.resolve();
            } else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
        }
        randomChar() { return this.chars[Math.floor(Math.random() * this.chars.length)]; }
    }
    const el = document.querySelector('.multiple-text');
    if (el) {
        const fx = new TextScramble(el);
        let phrases = ['UX/UI Developer', 'Web Designer', 'Frontend Developer', 'Editor'];
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => { setTimeout(next, 2000); });
            counter = (counter + 1) % phrases.length;
        };
        next();

 
        window.updateScramblePhrases = (newPhrases) => {
            phrases = newPhrases;
            counter = 0; 
            next();
        };
    }
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}


const translations = {
    en: {
        navHome: "Home",
        navAbout: "About",
        navServices: "Services",
        navSkills: "Skills",
        navPortfolio: "Portfolio",
        navContact: "Contact",
        homeTitle: "Hi! I'm Sofyan Ibnu",
        homeStaticSubtitle: "And I'm a",
        homeSubtitle: "And I'm a <span class='multiple-text'></span>",
        homeParagraph: "Product Designer and Digital Creative Director working in the design field for 10 years so far, specialized in UI/UX, Branding, and digital designs.",
        email: "Email :",
        github: "Github :",
        downloadCV: "Download CV",
        hireMeNow: "Hire Me Now!",
        aboutIntro: "LET ME INTRODUCE MYSELF",
        aboutTitle: "About Me",
        aboutSubtitle: "A story of good",
        aboutYearsExp: "Years of Experience",
        aboutProjectComplete: "Project Complete",
        aboutHappyClients: "Happy Clients",
        aboutParagraph: "My name is Sofyan. I am a Product Designer and Digital Creative Director with over 10 years of experience in design. I focus on UI/UX, Branding, and digital design. To date, I have completed over 150 projects and served over 200 satisfied clients. I am passionate about creating designs that not only look good but also function well. Every project is an opportunity to tell a compelling story and deliver innovative creative solutions. I am always up for new challenges.",
        servicesTitle: "Our Services",
        servicesSubtitle: "WHAT I WILL DO FOR YOU",
        graphicDesignerTitle: "Graphic Designer",
        graphicDesignerDesc: "We create engaging and professional visual designs to meet your branding and marketing needs. From logos and brochures to promotional materials, we're ready to transform your ideas into stunning visual masterpieces",
        webDevTitle: "Web Development",
        webDevDesc: "We build responsive and functional websites, ensuring a smooth user experience across all devices. We focus on speed, security, and modern design",
        uiUxTitle: "UI/UX Design",
        uiUxDesc: "We design intuitive user interfaces (UI) and seamless user experiences (UX), ensuring your digital products not only look great, but are also easy to use and effective in achieving your business goals",
        skillsMainTitle: "Technical and Professional",
        skillsSubtitle: "My Skills",
        technicalSkills: "Technical Skills",
        professionalSkills: "Professional Skills",
        teamwork: "Team Work",
        creativity: "Creativity",
        projectManagement: "Project Management",
        communication: "Communication",
        portfolioTitle: "Latest Project",
        portfolioSubtitle: "WHAT I WILL DO FOR YOU",
        portfolioAll: "All",
        portfolioProduct: "Product",
        portfolioInteracting: "Interacting",
        portfolioWebApp: "Web App",
        contactTitle: "Contact Me",
        contactSubtitle: "ASK ME A QUESTION",
        contactName: "Your Name",
        contactEmail: "Your Email",
        contactAddress: "Your Address",
        contactPhone: "Nomor Telepon",
        contactMessage: "Your Message",
        sendMessage: "Kirim Pesan",
        copyright: "Copyright © 2024 by Sofyan || All Right Reserved."
    },
    id: {
        navHome: "Beranda",
        navAbout: "Tentang",
        navServices: "Layanan",
        navSkills: "Keahlian",
        navPortfolio: "Portofolio",
        navContact: "Kontak",
        homeTitle: "Halo! Saya Sofyan Ibnu",
        homeStaticSubtitle: "Dan saya seorang",
        homeSubtitle: "Dan saya seorang <span class='multiple-text'></span>",
        homeParagraph: "Product Designer dan Digital Creative Director yang bekerja di bidang desain selama 10 tahun, berspesialisasi dalam UI/UX, Branding, dan desain digital.",
        email: "Email :",
        github: "Github :",
        downloadCV: "Unduh CV",
        hireMeNow: "Rekrut Saya Sekarang!",
        aboutIntro: "IZINKAN SAYA MEMPERKENALKAN DIRI",
        aboutTitle: "Tentang Saya",
        aboutSubtitle: "Kisah yang baik",
        aboutYearsExp: "Tahun Pengalaman",
        aboutProjectComplete: "Proyek Selesai",
        aboutHappyClients: "Klien Bahagia",
        aboutParagraph: "Nama saya Sofyan. Saya adalah seorang Product Designer dan Digital Creative Director dengan pengalaman lebih dari 10 tahun di bidang desain. Saya berfokus pada UI/UX, Branding, dan desain digital. Hingga saat ini, saya telah menyelesaikan lebih dari 150 proyek dan melayani lebih dari 200 klien yang puas. Saya bersemangat dalam menciptakan desain yang tidak hanya terlihat bagus tetapi juga berfungsi dengan baik. Setiap proyek adalah kesempatan untuk menceritakan kisah yang menarik dan memberikan solusi kreatif yang inovatif. Saya selalu siap untuk tantangan baru.",
        servicesTitle: "Layanan Kami",
        servicesSubtitle: "APA YANG AKAN SAYA LAKUKAN UNTUK ANDA",
        graphicDesignerTitle: "Desainer Grafis",
        graphicDesignerDesc: "Kami menciptakan desain visual yang menarik dan profesional untuk memenuhi kebutuhan branding dan pemasaran Anda. Mulai dari logo, brosur, hingga materi promosi, kami siap mengubah ide Anda menjadi karya visual yang luar biasa.",
        webDevTitle: "Pengembangan Web",
        webDevDesc: "Kami membangun situs web yang responsif dan fungsional, memastikan pengalaman pengguna yang lancar di setiap perangkat. Kami fokus pada kecepatan, keamanan, dan desain yang modern.",
        uiUxTitle: "Desain UI/UX",
        uiUxDesc: "Kami merancang antarmuka pengguna (UI) yang intuitif dan pengalaman pengguna (UX) yang mulus, memastikan produk digital Anda tidak hanya terlihat bagus, tetapi juga mudah digunakan dan efektif dalam mencapai tujuan bisnis Anda.",
        skillsMainTitle: "Teknis dan Profesional",
        skillsSubtitle: "Keahlian Saya",
        technicalSkills: "Keahlian Teknis",
        professionalSkills: "Keahlian Profesional",
        teamwork: "Kerja Tim",
        creativity: "Kreativitas",
        projectManagement: "Manajemen Proyek",
        communication: "Komunikasi",
        portfolioTitle: "Proyek Terbaru",
        portfolioSubtitle: "APA YANG AKAN SAYA LAKUKAN UNTUK ANDA",
        portfolioAll: "Semua",
        portfolioProduct: "Produk",
        portfolioInteracting: "Interaksi",
        portfolioWebApp: "Aplikasi Web",
        contactTitle: "Hubungi Saya",
        contactSubtitle: "AJUKAN PERTANYAAN",
        contactName: "Nama Anda",
        contactEmail: "Email Anda",
        contactAddress: "Alamat Anda",
        contactPhone: "Nomor Telepon",
        contactMessage: "Pesan Anda",
        sendMessage: "Kirim Pesan",
        copyright: "Hak Cipta © 2024 oleh Sofyan || Semua Hak Dilindungi."
    }
};

const langSwitcher = document.querySelector('.lang-switcher');
let currentLang = 'en';

function updateLanguage(lang) {
    

    function updateTime() {
    const now = new Date();
    // Mendapatkan waktu dalam format HH:MM:SS
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Format 24 jam
    });
    
    // Memperbarui elemen HTML dengan ID "current-time"
    document.getElementById('current-time').textContent = timeString;
}

// Memanggil fungsi updateTime setiap 1 detik
setInterval(updateTime, 1000);

// Memanggilnya sekali saat awal untuk menampilkan waktu segera
updateTime();
   
    document.documentElement.lang = lang;
 
    document.querySelector('a[href="#home"]').textContent = translations[lang].navHome;
    document.querySelector('a[href="#about"]').textContent = translations[lang].navAbout;
    document.querySelector('a[href="#services"]').textContent = translations[lang].navServices;
    document.querySelector('a[href="#skills"]').textContent = translations[lang].navSkills;
    document.querySelector('a[href="#portfolio"]').textContent = translations[lang].navPortfolio;
    document.querySelector('a[href="#contact"]').textContent = translations[lang].navContact;

    
    document.querySelector('.home-content h3').textContent = translations[lang].homeTitle;
    document.querySelector('.home-content h1 .static-text').textContent = translations[lang].homeStaticSubtitle; 
    document.querySelector('.home-content p').textContent = translations[lang].homeParagraph;
    document.querySelector('.email-info h5').textContent = translations[lang].email;
    document.querySelector('.github-info h5').textContent = translations[lang].github;
    document.querySelector('.btn-box a:nth-child(1)').textContent = translations[lang].downloadCV;
    document.querySelector('.btn-box a:nth-child(2)').textContent = translations[lang].hireMeNow;

    
    document.querySelector('.about-content span').textContent = translations[lang].aboutIntro;
    document.querySelector('.about-content h2').textContent = translations[lang].aboutTitle;
    document.querySelector('.about-content h3').textContent = translations[lang].aboutSubtitle;
    document.querySelector('.info-about1 p').textContent = translations[lang].aboutYearsExp;
    document.querySelector('.info-about2 p').textContent = translations[lang].aboutProjectComplete;
    document.querySelector('.info-about3 p').textContent = translations[lang].aboutHappyClients;
    document.querySelector('.about-content p').textContent = translations[lang].aboutParagraph;

   
    document.querySelector('.services .heading').textContent = translations[lang].servicesTitle;
    document.querySelector('.services span').textContent = translations[lang].servicesSubtitle;
    document.querySelector('.service-box:nth-child(1) h3').textContent = translations[lang].graphicDesignerTitle;
    document.querySelector('.service-box:nth-child(1) p').textContent = translations[lang].graphicDesignerDesc;
    document.querySelector('.service-box:nth-child(2) h3').textContent = translations[lang].webDevTitle;
    document.querySelector('.service-box:nth-child(2) p').textContent = translations[lang].webDevDesc;
    document.querySelector('.service-box:nth-child(3) h3').textContent = translations[lang].uiUxTitle;
    document.querySelector('.service-box:nth-child(3) p').textContent = translations[lang].uiUxDesc;

    
    document.querySelector('.skills .heading').textContent = translations[lang].skillsMainTitle;
    document.querySelector('.skills span').textContent = translations[lang].skillsSubtitle;
    document.querySelector('.skill-box:nth-child(1) h3').textContent = translations[lang].technicalSkills;
    document.querySelector('.skill-box:nth-child(2) h3').textContent = translations[lang].professionalSkills;
    document.querySelector('.circle:nth-child(1) span').textContent = translations[lang].teamwork;
    document.querySelector('.circle:nth-child(2) span').textContent = translations[lang].creativity;
    document.querySelector('.circle:nth-child(3) span').textContent = translations[lang].projectManagement;
    document.querySelector('.circle:nth-child(4) span').textContent = translations[lang].communication;

 
    document.querySelector('.portfolio .heading').textContent = translations[lang].portfolioTitle;
    document.querySelector('.portfolio span').textContent = translations[lang].portfolioSubtitle;
    document.querySelector('.portfolio-filter button:nth-child(1)').textContent = translations[lang].portfolioAll;
    document.querySelector('.portfolio-filter button:nth-child(2)').textContent = translations[lang].portfolioProduct;
    document.querySelector('.portfolio-filter button:nth-child(3)').textContent = translations[lang].portfolioInteracting;
    document.querySelector('.portfolio-filter button:nth-child(4)').textContent = translations[lang].portfolioWebApp;

    
    document.querySelector('.contact .heading').textContent = translations[lang].contactTitle;
    document.querySelector('.contact span').textContent = translations[lang].contactSubtitle;
    document.querySelector('.contact form .input-box input:nth-child(1)').placeholder = translations[lang].contactName;
    document.querySelector('.contact form .input-box input:nth-child(2)').placeholder = translations[lang].contactEmail;
    document.querySelector('.contact form .input-box input:nth-child(3)').placeholder = translations[lang].contactAddress;
    document.querySelector('.contact form .input-box input:nth-child(4)').placeholder = translations[lang].contactPhone;
    document.querySelector('.contact form textarea').placeholder = translations[lang].contactMessage;
    document.querySelector('.contact form .btn').value = translations[lang].sendMessage;

    
    document.querySelector('.copyright p').textContent = translations[lang].copyright;

    const phrases = lang === 'en' ? ['UX/UI Developer', 'Web Designer', 'Frontend Developer', 'Editor'] : ['Pengembang UX/UI', 'Perancang Web', 'Pengembang Frontend', 'Editor'];
    window.updateScramblePhrases(phrases);
}

langSwitcher.addEventListener('click', (e) => {
    e.preventDefault();
    currentLang = (currentLang === 'en') ? 'id' : 'en';
    updateLanguage(currentLang);
});


updateLanguage(currentLang);


