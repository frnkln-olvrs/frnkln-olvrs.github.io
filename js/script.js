// -----------header srolled----------------
let header = document.querySelector('header');

var prevScrollpos = window.pageYOffset;

window.onscroll = () => {
  if (window.pageYOffset > 120) {
    header.classList.add('scrolled');
  } 
  else {
    header.classList.remove('scrolled');
  }

  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector("header").style.top = "-1px";
  } 
  else {
    document.querySelector("header").style.top = "-104px";
  }
  
  prevScrollpos = currentScrollPos;
}
// ---------------------------------------------

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  
  if (navMenu.classList.contains("active")) {
    navLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add('fade-in');
      }, index * 250);
    });
  } else {
    navLinks.forEach((link) => {
      link.classList.remove('fade-in');
    });
  }
}

navLinks.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// -----------NAVIGATION ACTIVE CLASS---------------------
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section[data-section]');
  const navLinks = document.querySelectorAll('.nav-link');
  const offset = 150; // Adjust this value according to your header height

  function updateActiveNavLink() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('data-section');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection)) {
        link.classList.add('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      navLinks.forEach(link => link.classList.remove('active'));
      event.currentTarget.classList.add('active');
      const targetSection = document.querySelector(event.currentTarget.getAttribute('href'));
      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // $('.nav-menu a').click(function(e) {
  //   e.preventDefault();
  //   var $scroll_to_id = $($(this).attr('href'));
  //   $('html, body').stop(true).animate({
  //     scrollTop: ($scroll_to_id.offset().top - $('.navbar').outerHeight())
  //   }, 800);
  // });
});


// -----------------HOME TYPE & ERASE ANIMATION------------------
document.addEventListener('DOMContentLoaded', () => {
  const titles = ["Front-End Developer", "UX/UI Designer"];
  let currentIndex = 0;
  const titleElement = document.querySelector('.animated-title');
  const homeSection = document.querySelector('#home');

  const typeSpeed = 110;
  const eraseSpeed = 60;
  const delayBetweenWords = 1000;

  const updatePseudoElement = (text) => {
    homeSection.style.setProperty('--pseudo-content', `"${text}"`);
  };

  const eraseText = (text, callback) => {
    let currentText = text;
    homeSection.classList.add('erasing');
    const erasing = setInterval(() => {
      currentText = currentText.slice(0, -1);
      titleElement.textContent = currentText;
      updatePseudoElement(currentText);
      if (currentText.length === 0) {
        clearInterval(erasing);
        setTimeout(() => {
          homeSection.classList.remove('erasing'); // Remove erasing class after completion
          callback();
        }, 50);
      }
    }, eraseSpeed);
  };

  const typeText = (text, callback) => {
    let currentText = '';
    homeSection.classList.add('typing'); // Add typing class
    let charIndex = 0;
    const typing = setInterval(() => {
      currentText += text[charIndex];
      titleElement.textContent = currentText;
      updatePseudoElement(currentText);
      charIndex++;
      if (charIndex === text.length) {
        clearInterval(typing);
        setTimeout(() => {
          homeSection.classList.remove('typing'); // Remove typing class after completion
          callback();
        }, delayBetweenWords); // Adjust this timeout to match the CSS transition duration
      }
    }, typeSpeed);
  };

  const changeTitle = () => {
    eraseText(titles[currentIndex], () => {
      currentIndex = (currentIndex + 1) % titles.length;
      typeText(titles[currentIndex], changeTitle);
    });
  };

  setTimeout(changeTitle, delayBetweenWords);
});

// ---------------Reveal Animations-----------------
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        element.classList.add('active', element.dataset.animation);
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  const imgContainer = document.querySelector('.img_container');
  const infoContainer = document.querySelector('.info');

  const options = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(imgContainer);
  observer.observe(infoContainer);
});

// Skill Bar Animation
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('#skills');
  const skills = {
    "html": "100%",
    "css": "90%",
    "javascript": "80%",
    "php": "75%",
    "bootstrap": "90%",
    "tailwind": "65%"
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };

  const animateSkills = () => {
    let delay = 700;
    for (const [language, percentage] of Object.entries(skills)) {
      setTimeout(() => {
        document.getElementById(`${language}-pourcent`).innerHTML = percentage;
        document.getElementById(`progress-${language}`).style.width = percentage;
      }, delay);
      delay += 700;
    }
  };

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillsObserver.observe(skillsSection);
});


// Quick'n'dirty - remove :hover styles using JS-------------------
// ---------------stack overflow------
function hasTouch() {
  return 'ontouchstart' in document.documentElement
         || navigator.maxTouchPoints > 0
         || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all the :hover stylesheets
  try { // prevent exception on browsers not supporting DOM styleSheets properly
    for (var si in document.styleSheets) {
      var styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (ex) {}
}

// --------------------EMAILJS---------------------
document.getElementById('contact-form').addEventListener('submit', function(event) {
	event.preventDefault();

	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const message = document.getElementById('message').value;

	emailjs.send("service_59z1gkq", "template_pp34gnv", {
		Portfolio: "Portfolio | Contact Me",
		to_name: "Franklin Oliveros",
		from_name: name,
		message: message,
		reply_to: email
	})
	.then(() => {
		alert('Message sent successfully!');
		document.getElementById('contact-form').reset();
	}, (err) => {
		alert('Failed to send the message. Please try again later.');
		console.log('Failed to send the message:', err);
	});
});

window.addEventListener('scroll', function() {
  const activeLinks = document.querySelectorAll('.nav-link.active');
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');

  activeLinks.forEach(link => {
    link.classList.remove('active');
  });

  if (navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }

  if (hamburger && hamburger.classList.contains('active')) {
    hamburger.classList.remove('active');
  }
});