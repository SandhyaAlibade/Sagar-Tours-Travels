// EMAILJS BOOKING FORM

document.addEventListener("DOMContentLoaded", function(){

const form = document.getElementById("enquiryForm");
if(!form) return;

const status = document.getElementById("formStatus");
const btn = document.getElementById("submitBtn");

form.addEventListener("submit", function(e){
    e.preventDefault();

    btn.innerText = "Sending...";
    btn.disabled = true;

    emailjs.sendForm(
        "service_booking",
        "template_booking",
        this
    ).then(function(){

        status.innerText = "Booking request sent successfully! We will call you shortly.";
        form.reset();
        btn.innerText = "Send Booking Request";
        btn.disabled = false;

    }, function(error){

        status.style.color = "red";
        status.innerText = "Failed to send request. Please call us directly.";
        btn.innerText = "Send Booking Request";
        btn.disabled = false;

    });
});

});


// ===== RESPONSIVE CAROUSEL =====
document.addEventListener("DOMContentLoaded", function(){

const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if(!track || !nextBtn || !prevBtn) return;

let index = 0;
let slides;
let slideWidth;

function setupCarousel(){
    slides = track.querySelectorAll('.car-slide');
    slideWidth = slides[0].getBoundingClientRect().width + 20;
    moveCarousel();
}

function moveCarousel(){
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener('click', ()=>{
    if(index < slides.length - 1){
        index++;
    }else{
        index = 0; // infinite loop
    }
    moveCarousel();
});

prevBtn.addEventListener('click', ()=>{
    if(index > 0){
        index--;
    }else{
        index = slides.length - 1;
    }
    moveCarousel();
});

// mobile swipe
let startX = 0;

track.addEventListener('touchstart', e=>{
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e=>{
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if(diff > 50){
        nextBtn.click();
    }
    if(diff < -50){
        prevBtn.click();
    }
});

// recalc on resize
window.addEventListener('resize', setupCarousel);

setupCarousel();

});

// COUNTER
const statsSection = document.querySelector('.stats');

if(statsSection){

    const counters = document.querySelectorAll('.counter');
    let started = false;

    const startCounting = () => {

        if(started) return;
        started = true;

        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let count = 0;

            const update = () => {
                const increment = target / 120;

                if(count < target){
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target + "+";
                }
            };

            update();
        });
    };

    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
            startCounting();
        }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
}
// ===== TESTIMONIAL REVIEW CAROUSEL =====
// ===== TESTIMONIAL REVIEW CAROUSEL (AUTO SCROLL) =====
document.addEventListener("DOMContentLoaded", function(){

   const track = document.querySelector('.review-track');
const nextBtn = document.querySelector('.review-next');
const prevBtn = document.querySelector('.review-prev');

if(!track || !nextBtn || !prevBtn) return;

// swipe events
track.addEventListener('swipeleft', moveNext);
track.addEventListener('swiperight', movePrev);


    let position = 0;
    const slideWidth = 355;
    let autoSlide;

    function moveNext(){
        position -= slideWidth;

        if(Math.abs(position) >= track.scrollWidth - track.clientWidth){
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
    }

    function movePrev(){
        position += slideWidth;

        if(position > 0){
            position = -(track.scrollWidth - track.clientWidth);
        }

        track.style.transform = `translateX(${position}px)`;
    }

    // arrow buttons
    nextBtn.addEventListener('click', moveNext);
    prevBtn.addEventListener('click', movePrev);

    // ===== AUTO SLIDE =====
    function startAutoSlide(){
        autoSlide = setInterval(moveNext, 2000); // 4 seconds
    }

    function stopAutoSlide(){
        clearInterval(autoSlide);
    }

    // start automatically
    startAutoSlide();

    // pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

});
// ===== MOBILE SWIPE SUPPORT FOR REVIEWS =====

document.addEventListener("DOMContentLoaded", function(){

    const track = document.querySelector('.review-track');
    if(!track) return;

    let startX = 0;
    let endX = 0;
    const swipeThreshold = 50; // minimum finger distance

    function handleSwipe(){
        const diff = startX - endX;

        // swipe left → next
        if(diff > swipeThreshold){
            track.dispatchEvent(new Event('swipeleft'));
        }
        // swipe right → previous
        if(diff < -swipeThreshold){
            track.dispatchEvent(new Event('swiperight'));
        }
    }

    // touch start
    track.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
    });

    // touch end
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    });

});
// ===== PROFESSIONAL SCROLL REVEAL (UP + DOWN) =====

document.addEventListener("DOMContentLoaded", function(){

    const reveals = document.querySelectorAll(
    '.service-box, .car, .why-box, .review-card, .footer-col, .stat-box, .client-box, .car-slide, .hero-image, .airport-box'
);


    // add reveal class
    reveals.forEach(el => {
        el.classList.add('reveal');
    });

    function revealOnScroll(){
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            // element visible threshold
            if(elementTop < windowHeight - 80){
                el.classList.add("active");
            }else{
                // IMPORTANT: remove when scrolling up
                el.classList.remove("active");
            }
        });
    }

    // run once
    revealOnScroll();

    // run on scroll
    window.addEventListener("scroll", revealOnScroll);

});

// MODERN TIME PICKER
document.addEventListener("DOMContentLoaded", function(){

const timeInput = document.getElementById("pickupTime");
if(!timeInput) return;

flatpickr(timeInput, {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    time_24hr: false,
    minuteIncrement: 5,
    defaultHour: 9,
    position: "auto",
});
});
// MODERN DATE PICKER
document.addEventListener("DOMContentLoaded", function(){

const dateInput = document.getElementById("travelDate");
if(!dateInput) return;

flatpickr(dateInput, {
    minDate: "today",   
    dateFormat: "d M Y",  
    disableMobile: true, 
});
});
dateInput.addEventListener("focus", function(){
    dateInput._flatpickr.open();
});

