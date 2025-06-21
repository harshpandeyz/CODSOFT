$(document).ready(function () {
    // Toggle mobile nav (if reusing the same header)
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Show/hide scroll-to-top button
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    // Fetch and render certifications
    fetch('./projects.json')
        .then(res => res.json())
        .then(data => showCertifications(data))
        .catch(err => console.error('Error loading certifications:', err));

    function showCertifications(certs) {
        const container = document.querySelector('.cert-container');
        let html = '';

        certs.forEach(cert => {
            html += `
                <div class="cert-card tilt" tabindex="0">
                    <img src="${cert.image}" alt="${cert.title}" draggable="false"/>
                    <div class="cert-info">
                        <h3>${cert.title}</h3>
                        <p class="issuer">${cert.issuer}</p>
                        <p class="date">${cert.date}</p>
                        <a href="${cert.link}" class="btn view-cert" target="_blank">
                            <i class="fas fa-file-alt"></i> View Certificate
                        </a>
                    </div>
                </div>`;
        });

        container.innerHTML = html;

        // 1. VanillaTilt for 3D hover tilt
        VanillaTilt.init(document.querySelectorAll('.tilt'), {
            max: 25,
            speed: 500,
            glare: true,
            'max-glare': 0.5
        });

        // 2. ScrollReveal for fade-up with bounce effect
        ScrollReveal().reveal('.cert-card', {
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            interval: 150,
            easing: 'ease-in-out',
            scale: 0.9,
            reset: true
        });

        // 3. Extra hover scale with rotation effect
        document.querySelectorAll('.cert-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform += ' scale(1.05) rotate(1deg)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = card.style.transform.replace(' scale(1.05) rotate(1deg)', '');
            });
            card.addEventListener('focus', () => {
                card.style.transform += ' scale(1.05) rotate(1deg)';
            });
            card.addEventListener('blur', () => {
                card.style.transform = card.style.transform.replace(' scale(1.05) rotate(1deg)', '');
            });
        });

        // 4. Smooth scroll for in-page links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href'))
                    .scrollIntoView({ behavior: 'smooth' });
            });
        });

        // 5. Add particle effect on hover (using particles.js or similar library)
        document.querySelectorAll('.cert-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add particle effect here (e.g., using a library like tsParticles)
                tsParticles.load("tsparticles", {
                    particles: {
                        number: { value: 50 },
                        size: { value: 3 },
                        move: { speed: 2 },
                        opacity: { value: 0.5 },
                        color: { value: "#ff0000" }
                    }
                });
            });
        });
    }

    // Change title & favicon on visibility change
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Certifications | Portfolio Harsh Pandey";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        } else {
            document.title = "Come Back to My Certifications!";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });

    // Add a floating animation to the scroll-to-top button
    const scrollTopButton = document.querySelector('#scroll-top');
    if (scrollTopButton) {
        scrollTopButton.style.animation = 'float 3s infinite ease-in-out';
    }

    // Keyframes for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
});